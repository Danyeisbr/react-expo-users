import { fetchUsers } from "../api";

// Mock fetch globally
global.fetch = jest.fn();

describe("api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users successfully", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        username: "johndoe",
        website: "johndoe.com",
        address: {
          street: "123 Main St",
          suite: "Apt 1",
          city: "New York",
          zipcode: "10001",
        },
        company: {
          name: "Test Company",
          catchPhrase: "Test catch phrase",
          bs: "Test bs",
        },
      },
    ];

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    const result = await fetchUsers();

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      {}
    );
    expect(result).toEqual(mockUsers);
  });

  it("should handle API errors", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchUsers()).rejects.toThrow("API_ERROR_500");
  });

  it("should handle network errors", async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(fetchUsers()).rejects.toThrow("Network error");
  });

  it("should support abort signal", async () => {
    const controller = new AbortController();

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    await fetchUsers(controller.signal);

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      { signal: controller.signal }
    );
  });

  it("should handle aborted requests", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(fetchUsers(controller.signal)).rejects.toThrow();
  });
});
