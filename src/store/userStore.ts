import { ApiError, fetchMoreUsers, fetchUsers } from "@services/api";
import { getCache, setCache } from "@utils/cache";
import type { User } from "../types";
import { create } from "zustand";

type Status = "idle" | "loading" | "success" | "error";

type UserState = {
  users: User[];
  status: Status;
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
  setQuery: (q: string) => void;
  visibleUsers: () => User[];
  clear: () => void;
  clearCache: () => Promise<void>;
  retry: () => Promise<void>;
};

const CACHE_KEY = "users_cache_v1";
const CACHE_TTL = 1000 * 30; // 30 segundos para testing

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  status: "idle",
  error: null,
  errorCode: null,
  retryCount: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
  isLoadingMore: false,
  query: "",
  async init() {
    if (get().status === "loading") return;
    set({ status: "loading", error: null, currentPage: 1, hasMore: true });

    // Simular delay de carga inicial para mostrar skeleton loader
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const cached = await getCache<User[]>(CACHE_KEY, CACHE_TTL);
    if (cached && cached.length) {
      const pageSize = get().pageSize;
      set({
        users: cached,
        status: "success",
        currentPage: Math.floor(cached.length / pageSize),
      });
      return;
    }

    try {
      const controller = new AbortController();
      const data = await fetchUsers(controller.signal);
      await setCache(CACHE_KEY, data);
      const pageSize = get().pageSize;
      set({
        users: data,
        status: "success",
        currentPage: Math.floor(data.length / pageSize),
      });
    } catch (e: any) {
      const errorMessage =
        e instanceof ApiError
          ? e.message
          : "Error inesperado. Intenta nuevamente.";
      const errorCode = e instanceof ApiError ? e.code : "UNKNOWN";
      set({
        status: "error",
        error: errorMessage,
        errorCode: errorCode,
        retryCount: get().retryCount + 1,
      });
    }
  },
  async refresh() {
    set({ status: "loading", error: null, currentPage: 1, hasMore: true });
    try {
      const controller = new AbortController();
      const data = await fetchUsers(controller.signal);
      await setCache(CACHE_KEY, data);
      const pageSize = get().pageSize;
      set({
        users: data,
        status: "success",
        currentPage: Math.floor(data.length / pageSize),
      });
    } catch (e: any) {
      const errorMessage =
        e instanceof ApiError
          ? e.message
          : "Error inesperado. Intenta nuevamente.";
      const errorCode = e instanceof ApiError ? e.code : "UNKNOWN";
      set({
        status: "error",
        error: errorMessage,
        errorCode: errorCode,
        retryCount: get().retryCount + 1,
      });
    }
  },
  async loadMore() {
    const { hasMore, isLoadingMore, pageSize, users } = get();

    if (!hasMore || isLoadingMore) return;

    const maxUsers = 100;
    if (users.length >= maxUsers) {
      set({ hasMore: false, isLoadingMore: false });
      return;
    }

    set({ isLoadingMore: true });

    try {
      const controller = new AbortController();

      const currentPageForAPI = Math.floor((users.length - 10) / pageSize) + 1;

      const newUsers = await fetchMoreUsers(
        currentPageForAPI,
        pageSize,
        controller.signal
      );

      if (newUsers.length === 0) {
        set({ hasMore: false, isLoadingMore: false });
        return;
      }

      set((state) => {
        const existingIds = new Set(state.users.map((u) => u.id));
        const uniqueNewUsers = newUsers.filter((u) => !existingIds.has(u.id));

        const updatedUsers = [...state.users, ...uniqueNewUsers];
        const hasReachedLimit = updatedUsers.length >= maxUsers;

        return {
          users: updatedUsers,
          currentPage: Math.floor(updatedUsers.length / pageSize),
          isLoadingMore: false,
          hasMore: !hasReachedLimit && newUsers.length === pageSize,
        };
      });
    } catch (e: any) {
      const errorMessage =
        e instanceof ApiError ? e.message : "Error al cargar más usuarios.";
      const errorCode = e instanceof ApiError ? e.code : "UNKNOWN";
      set({
        isLoadingMore: false,
        error: errorMessage,
        errorCode: errorCode,
      });
    }
  },
  setQuery(q) {
    set({ query: q });
  },
  visibleUsers() {
    const { users, query, currentPage, pageSize } = get();

    if (!query) {
      return users;
    }

    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
  },
  clear() {
    set({
      users: [],
      currentPage: 1,
      query: "",
      status: "idle",
      error: null,
      errorCode: null,
      retryCount: 0,
      hasMore: true,
      isLoadingMore: false,
    });
  },
  async clearCache() {
    // Limpiar cache para probar errores
    await setCache(CACHE_KEY, null);
    set({
      users: [],
      currentPage: 1,
      query: "",
      status: "idle",
      error: null,
      errorCode: null,
      retryCount: 0,
      hasMore: true,
      isLoadingMore: false,
    });
  },
  async retry() {
    const { status, retryCount } = get();
    if (status === "loading" || retryCount >= 3) return;

    set({
      status: "loading",
      error: null,
      errorCode: null,
      currentPage: 1,
      hasMore: true,
    });

    try {
      const controller = new AbortController();
      const data = await fetchUsers(controller.signal);
      await setCache(CACHE_KEY, data);
      const pageSize = get().pageSize;
      set({
        users: data,
        status: "success",
        currentPage: Math.floor(data.length / pageSize),
        retryCount: 0, // Reset retry count on success
      });
    } catch (e: any) {
      const errorMessage =
        e instanceof ApiError
          ? e.message
          : "Error inesperado. Intenta nuevamente.";
      const errorCode = e instanceof ApiError ? e.code : "UNKNOWN";
      set({
        status: "error",
        error: errorMessage,
        errorCode: errorCode,
        retryCount: get().retryCount + 1,
      });
    }
  },
}));
