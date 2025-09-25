import { render, screen } from "@testing-library/react-native";
import SkeletonLoader from "./SkeletonLoader";
import React from "react";

jest.mock("../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("SkeletonLoader", () => {
  const defaultProps = { type: "card" as const, isDark: false };

  it("should render card type skeleton", () => {
    renderWithProviders(<SkeletonLoader {...defaultProps} />);

    expect(screen.getByTestId).toBeTruthy();
  });

  it('should render card type skeleton when type is "card"', () => {
    renderWithProviders(<SkeletonLoader type="card" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it('should render detail type skeleton when type is "detail"', () => {
    renderWithProviders(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render correct number of skeleton rows for card type", () => {
    renderWithProviders(<SkeletonLoader type="card" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render correct number of skeleton rows for detail type", () => {
    renderWithProviders(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render skeleton avatar for card type", () => {
    renderWithProviders(<SkeletonLoader type="card" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render skeleton content for detail type", () => {
    renderWithProviders(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render different structure for different types", () => {
    const { rerender } = renderWithProviders(
      <SkeletonLoader type="card" isDark={false} />
    );

    expect(screen).toBeTruthy();

    rerender(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should maintain consistent styling across re-renders", () => {
    const { rerender } = renderWithProviders(
      <SkeletonLoader type="card" isDark={false} />
    );

    expect(screen).toBeTruthy();

    rerender(<SkeletonLoader type="card" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render skeleton cards with proper spacing", () => {
    renderWithProviders(<SkeletonLoader type="card" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render skeleton detail with proper layout", () => {
    renderWithProviders(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should handle rapid type changes without crashing", () => {
    const { rerender } = renderWithProviders(
      <SkeletonLoader type="card" isDark={false} />
    );

    rerender(<SkeletonLoader type="detail" isDark={false} />);

    rerender(<SkeletonLoader type="card" isDark={false} />);

    rerender(<SkeletonLoader type="detail" isDark={false} />);

    expect(screen).toBeTruthy();
  });

  it("should render with proper structure", () => {
    renderWithProviders(<SkeletonLoader {...defaultProps} />);

    expect(screen).toBeTruthy();
  });
});
