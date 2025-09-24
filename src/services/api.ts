import type { User } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const REQUEST_TIMEOUT = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Tipos de error personalizados
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public retryable: boolean = true
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error") {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message: string = "Request timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}

// Función para crear timeout
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError()), ms);
  });
}

// Función para delay con backoff exponencial
function delay(ms: number, attempt: number): Promise<void> {
  const backoffDelay = ms * Math.pow(2, attempt - 1);
  return new Promise((resolve) => setTimeout(resolve, backoffDelay));
}

// Función principal con retry automático
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  maxRetries: number = MAX_RETRIES,
  signal?: AbortSignal
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const timeoutPromise = createTimeout(REQUEST_TIMEOUT);
      const fetchPromise = fetch(url, {
        ...options,
        signal: signal,
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        const error = new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.status >= 500 ? "SERVER_ERROR" : "CLIENT_ERROR",
          response.status >= 500 
        );
        throw error;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      if (error instanceof ApiError && !error.retryable) {
        break;
      }

      if (error instanceof Error && error.name === "AbortError") {
        break;
      }

      await delay(RETRY_DELAY, attempt);
    }
  }

  throw lastError!;
}

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  try {
    return await fetchWithRetry<User[]>(
      API_URL,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      MAX_RETRIES,
      signal
    );
  } catch (error) {
    if (error instanceof TimeoutError) {
      throw new ApiError(
        "La conexión tardó demasiado. Verifica tu internet.",
        undefined,
        "TIMEOUT"
      );
    } else if (error instanceof NetworkError) {
      throw new ApiError(
        "Sin conexión a internet. Verifica tu red.",
        undefined,
        "NO_INTERNET"
      );
    } else if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(
        "Error inesperado. Intenta nuevamente.",
        undefined,
        "UNKNOWN"
      );
    }
  }
}

// Función para generar usuarios adicionales para simular paginación
export async function fetchMoreUsers(
  page: number,
  pageSize: number,
  signal?: AbortSignal
): Promise<User[]> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const startId = 10 + (page - 1) * pageSize + 1;
  const maxUsers = 100;
  const maxId = 10 + maxUsers;

  if (startId > maxId) {
    return [];
  }

  const users: User[] = [];
  const actualPageSize = Math.min(pageSize, maxId - startId + 1);

  for (let i = 0; i < actualPageSize; i++) {
    const id = startId + i;

    if (id > maxId) break;

    users.push({
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      phone: `+1-555-${String(id).padStart(4, "0")}`,
      username: `user${id}`,
      website: `user${id}.com`,
      address: {
        street: `${id} Main St`,
        suite: `Apt ${id}`,
        city: "New York",
        zipcode: "10001",
      },
      company: {
        name: `Company ${id}`,
        catchPhrase: `Making the world a better place ${id}`,
        bs: `harness real-time e-markets`,
      },
    });
  }

  return users;
}
