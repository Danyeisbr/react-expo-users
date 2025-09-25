import type { User } from "./shared-types";

export type StoreStatus = "idle" | "loading" | "success" | "error";

export type ThemeMode = "system" | "light" | "dark";
export type ThemeEffective = "light" | "dark";

export interface UserState {
  users: User[];
  status: StoreStatus;
  error?: string | null;
  errorCode?: string | null;
  retryCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  query: string;
  init: () => Promise<void>;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  setQuery: (query: string) => void;
  visibleUsers: () => User[];
  clear: () => void;
  clearCache: () => Promise<void>;
  retry: () => Promise<void>;
}

export interface ThemeState {
  mode: ThemeMode;
  system: "light" | "dark" | null;
  effective: ThemeEffective;
  setMode: (mode: ThemeMode) => void;
  _updateEffective: () => void;
}
