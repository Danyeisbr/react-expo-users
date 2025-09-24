import { fetchUsers } from "@services/api";
import { getCache, setCache } from "@utils/cache";
import { create } from "zustand";
import type { User } from "../types";

type Status = "idle" | "loading" | "success" | "error";

type UserState = {
  users: User[];
  status: Status;
  error?: string | null;
  pageSize: number;
  page: number;
  query: string;
  init: () => Promise<void>;
  refresh: () => Promise<void>;
  loadMore: () => void;
  setQuery: (q: string) => void;
  visibleUsers: () => User[];
  clear: () => void;
};

const CACHE_KEY = "users_cache_v1";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  status: "idle",
  error: null,
  pageSize: 5,
  page: 1,
  query: "",
  async init() {
    if (get().status === "loading") return;
    set({ status: "loading", error: null });
    // try cache first
    const cached = await getCache<User[]>(CACHE_KEY, CACHE_TTL);
    if (cached && cached.length) {
      set({ users: cached, status: "success" });
      return;
    }
    // fetch fresh
    try {
      const controller = new AbortController();
      const data = await fetchUsers(controller.signal);
      await setCache(CACHE_KEY, data);
      set({ users: data, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Unknown error" });
    }
  },
  async refresh() {
    set({ status: "loading", error: null, page: 1 });
    try {
      const controller = new AbortController();
      const data = await fetchUsers(controller.signal);
      await setCache(CACHE_KEY, data);
      set({ users: data, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e?.message ?? "Unknown error" });
    }
  },
  loadMore() {
    const { page, users, query, pageSize } = get();
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (page < totalPages) set({ page: page + 1 });
  },
  setQuery(q) {
    set({ query: q, page: 1 });
  },
  visibleUsers() {
    const { users, page, pageSize, query } = get();
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.slice(0, page * pageSize);
  },
  clear() {
    set({ users: [], page: 1, query: "", status: "idle", error: null });
  },
}));
