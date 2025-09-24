import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCache, setCache } from "../cache";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("cache", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should set cache correctly", async () => {
    const key = "test-key";
    const value = { test: "data" };

    await setCache(key, value);

    expect(mockAsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const [calledKey, calledValue] = mockAsyncStorage.setItem.mock.calls[0];
    expect(calledKey).toBe(key);

    const parsedValue = JSON.parse(calledValue);
    expect(parsedValue.value).toEqual(value);
    expect(typeof parsedValue.timestamp).toBe("number");
  });

  it("should get valid cache", async () => {
    const key = "test-key";
    const value = { test: "data" };
    const timestamp = Date.now();

    mockAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify({ timestamp, value })
    );

    const result = await getCache(key, 60000); // 1 minute TTL

    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it("should return null for expired cache", async () => {
    const key = "test-key";
    const value = { test: "data" };
    const timestamp = Date.now() - 120000; // 2 minutes ago

    mockAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify({ timestamp, value })
    );

    const result = await getCache(key, 60000); // 1 minute TTL

    expect(result).toBeNull();
  });

  it("should return null for non-existent cache", async () => {
    const key = "test-key";

    mockAsyncStorage.getItem.mockResolvedValueOnce(null);

    const result = await getCache(key, 60000);

    expect(result).toBeNull();
  });

  it("should return null for invalid cache data", async () => {
    const key = "test-key";

    mockAsyncStorage.getItem.mockResolvedValueOnce("invalid-json");

    const result = await getCache(key, 60000);

    expect(result).toBeNull();
  });

  it("should handle complex data types", async () => {
    const key = "test-key";
    const value = {
      users: [{ id: 1, name: "John" }],
      metadata: { count: 1 },
    };

    await setCache(key, value);

    expect(mockAsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const [calledKey, calledValue] = mockAsyncStorage.setItem.mock.calls[0];
    expect(calledKey).toBe(key);

    const parsedValue = JSON.parse(calledValue);
    expect(parsedValue.value).toEqual(value);
    expect(typeof parsedValue.timestamp).toBe("number");
  });
});
