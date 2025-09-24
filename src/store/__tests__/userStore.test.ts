import { fetchUsers } from "@services/api";
import { useUserStore } from "../userStore";

// Mock the API
jest.mock("@services/api");
jest.mock("@utils/cache");

const mockFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;

describe("userStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useUserStore.setState({
      users: [],
      status: "idle",
      error: null,
      pageSize: 5,
      page: 1,
      query: "",
    });
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const state = useUserStore.getState();

    expect(state.users).toEqual([]);
    expect(state.status).toBe("idle");
    expect(state.error).toBeNull();
    expect(state.pageSize).toBe(5);
    expect(state.page).toBe(1);
    expect(state.query).toBe("");
  });

  it("should set query correctly", () => {
    const { setQuery } = useUserStore.getState();

    setQuery("test query");

    const state = useUserStore.getState();
    expect(state.query).toBe("test query");
    expect(state.page).toBe(1); // Should reset page when query changes
  });

  it("should filter users correctly", () => {
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
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "098-765-4321",
        username: "janesmith",
        website: "janesmith.com",
        address: {
          street: "456 Oak Ave",
          suite: "Suite 2",
          city: "Los Angeles",
          zipcode: "90210",
        },
        company: {
          name: "Another Company",
          catchPhrase: "Another catch phrase",
          bs: "Another bs",
        },
      },
    ];

    useUserStore.setState({ users: mockUsers, query: "john" });

    const { visibleUsers } = useUserStore.getState();
    const filtered = visibleUsers();

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe("John Doe");
  });

  it("should handle pagination correctly", () => {
    const mockUsers = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: "123-456-7890",
      username: `user${i + 1}`,
      website: `user${i + 1}.com`,
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
    }));

    useUserStore.setState({ users: mockUsers, pageSize: 5 });

    const { visibleUsers, loadMore } = useUserStore.getState();

    // First page should show 5 users
    let visible = visibleUsers();
    expect(visible).toHaveLength(5);

    // Load more should increase page
    loadMore();
    visible = visibleUsers();
    expect(visible).toHaveLength(10);

    // Load more again
    loadMore();
    visible = visibleUsers();
    expect(visible).toHaveLength(12); // All users
  });

  it("should clear state correctly", () => {
    useUserStore.setState({
      users: [{ id: 1, name: "Test", email: "test@test.com" } as any],
      status: "success",
      error: "Some error",
      page: 3,
      query: "test",
    });

    const { clear } = useUserStore.getState();
    clear();

    const state = useUserStore.getState();
    expect(state.users).toEqual([]);
    expect(state.status).toBe("idle");
    expect(state.error).toBeNull();
    expect(state.page).toBe(1);
    expect(state.query).toBe("");
  });
});
