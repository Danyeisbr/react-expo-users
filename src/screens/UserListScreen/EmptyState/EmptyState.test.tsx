import { render, screen } from "@testing-library/react-native";
import React from "react";
import { EmptyState } from "./EmptyState";
jest.mock("../../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("EmptyState", () => {
  it("should render no results message", () => {
    renderWithProviders(<EmptyState isDark={false} />);

    expect(screen.getByText("No results.")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(<EmptyState isDark={false} />);

    expect(screen.getByText("No results.")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(<EmptyState isDark={true} />);

    expect(screen.getByText("No results.")).toBeTruthy();
  });

  it("should maintain consistent message across theme changes", () => {
    const { rerender } = renderWithProviders(<EmptyState isDark={false} />);

    expect(screen.getByText("No results.")).toBeTruthy();

    rerender(<EmptyState isDark={true} />);

    expect(screen.getByText("No results.")).toBeTruthy();
  });

  it("should render without crashing when isDark is undefined", () => {
    expect(() => {
      renderWithProviders(<EmptyState isDark={undefined as any} />);
    }).not.toThrow();
  });

  it("should render without crashing when isDark is null", () => {
    expect(() => {
      renderWithProviders(<EmptyState isDark={null as any} />);
    }).not.toThrow();
  });

  it("should have consistent styling across multiple renders", () => {
    const { rerender } = renderWithProviders(<EmptyState isDark={false} />);

    expect(screen.getByText("No results.")).toBeTruthy();

    rerender(<EmptyState isDark={false} />);

    expect(screen.getByText("No results.")).toBeTruthy();
  });
});
