import type { User } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch(API_URL, { signal });
  if (!res.ok) {
    throw new Error(`API_ERROR_${res.status}`);
  }
  const data: User[] = await res.json();
  return data;
}
