import AsyncStorage from "@react-native-async-storage/async-storage";

type CacheEntry<T> = { timestamp: number; value: T };

export async function setCache<T>(key: string, value: T) {
  const entry: CacheEntry<T> = { timestamp: Date.now(), value };
  await AsyncStorage.setItem(key, JSON.stringify(entry));
}

export async function getCache<T>(
  key: string,
  maxAgeMs: number
): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.timestamp <= maxAgeMs) {
      return entry.value;
    }
  } catch {}
  return null;
}
