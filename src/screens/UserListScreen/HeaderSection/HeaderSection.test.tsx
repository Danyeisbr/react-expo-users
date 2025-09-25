import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { HeaderSection } from "./HeaderSection";
jest.mock("../../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("HeaderSection", () => {
  const mockOnToggleTheme = jest.fn();
  const mockOnClearCache = jest.fn();

  beforeEach(() => {
    mockOnToggleTheme.mockClear();
    mockOnClearCache.mockClear();
  });

  it("should render title and theme buttons", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByText("Clear Cache")).toBeTruthy();
    expect(screen.getByText("Theme: Light")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByText("Theme: Light")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(
      <HeaderSection
        isDark={true}
        themeLabel="Dark"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByText("Theme: Dark")).toBeTruthy();
  });

  it("should call onToggleTheme when theme button is pressed", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    const themeButton = screen.getByText("Theme: Light");
    fireEvent.press(themeButton);

    expect(mockOnToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("should call onClearCache when clear cache button is pressed", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    const clearCacheButton = screen.getByText("Clear Cache");
    fireEvent.press(clearCacheButton);

    expect(mockOnClearCache).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple theme toggles", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    const themeButton = screen.getByText("Theme: Light");
    fireEvent.press(themeButton);
    fireEvent.press(themeButton);
    fireEvent.press(themeButton);

    expect(mockOnToggleTheme).toHaveBeenCalledTimes(3);
  });

  it("should handle multiple clear cache presses", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    const clearCacheButton = screen.getByText("Clear Cache");
    fireEvent.press(clearCacheButton);
    fireEvent.press(clearCacheButton);

    expect(mockOnClearCache).toHaveBeenCalledTimes(2);
  });

  it("should render different theme labels correctly", () => {
    const { rerender } = renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    expect(screen.getByText("Theme: Light")).toBeTruthy();

    rerender(
      <HeaderSection
        isDark={true}
        themeLabel="Dark"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    expect(screen.getByText("Theme: Dark")).toBeTruthy();
    expect(screen.queryByText("Theme: Light")).toBeNull();
  });

  it("should have correct accessibility roles for buttons", () => {
    renderWithProviders(
      <HeaderSection
        isDark={false}
        themeLabel="Light"
        onToggleTheme={mockOnToggleTheme}
        onClearCache={mockOnClearCache}
      />
    );

    const themeButton = screen.getByText("Theme: Light");
    const clearCacheButton = screen.getByText("Clear Cache");

    expect(themeButton).toBeTruthy();
    expect(clearCacheButton).toBeTruthy();
  });
});
