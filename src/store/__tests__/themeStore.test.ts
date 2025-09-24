import { useThemeStore } from "../themeStore";

// Mock NativeWindStyleSheet
jest.mock("nativewind", () => ({
  NativeWindStyleSheet: {
    setColorScheme: jest.fn(),
  },
}));

// Mock Appearance
jest.mock("react-native", () => ({
  Appearance: {
    getColorScheme: jest.fn(() => "light"),
    addChangeListener: jest.fn(),
  },
}));

describe("themeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({
      mode: "system",
      system: "light",
      effective: "light",
    });
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const state = useThemeStore.getState();

    expect(state.mode).toBe("system");
    expect(state.system).toBe("light");
    expect(state.effective).toBe("light");
  });

  it("should set mode correctly", () => {
    const { setMode } = useThemeStore.getState();

    setMode("dark");

    const state = useThemeStore.getState();
    expect(state.mode).toBe("dark");
    expect(state.effective).toBe("dark");
  });

  it("should handle system mode correctly", () => {
    const { setMode } = useThemeStore.getState();

    // Set system to dark
    useThemeStore.setState({ system: "dark" });
    setMode("system");

    const state = useThemeStore.getState();
    expect(state.mode).toBe("system");
    expect(state.effective).toBe("dark");
  });

  it("should toggle between light and dark modes", () => {
    const { setMode } = useThemeStore.getState();

    // Start with light
    setMode("light");
    expect(useThemeStore.getState().effective).toBe("light");

    // Toggle to dark
    setMode("dark");
    expect(useThemeStore.getState().effective).toBe("dark");

    // Toggle back to light
    setMode("light");
    expect(useThemeStore.getState().effective).toBe("light");
  });
});
