export interface ApiConfig {
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

export type ErrorCode =
  | "TIMEOUT"
  | "NO_INTERNET"
  | "SERVER_ERROR"
  | "CLIENT_ERROR"
  | "UNKNOWN";

export interface ApiErrorConfig {
  message: string;
  status?: number;
  code?: ErrorCode;
  retryable?: boolean;
}

export interface FetchUsersParams {
  signal?: AbortSignal;
}

export interface FetchMoreUsersParams {
  page: number;
  pageSize: number;
  signal?: AbortSignal;
}

export interface CacheConfig {
  key: string;
  ttl: number;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
