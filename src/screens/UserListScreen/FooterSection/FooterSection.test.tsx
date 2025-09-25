import { render, screen } from "@testing-library/react-native";
import React from "react";
import { FooterSection } from "./FooterSection";
jest.mock("../../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("FooterSection", () => {
  it("should render loading indicator when isLoadingMore is true", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={true}
        hasMore={true}
        dataLength={10}
        isDark={false}
      />
    );

    expect(screen.getByText("Loading more users...")).toBeTruthy();
  });

  it("should render max users message when hasMore is false and dataLength >= 100", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={100}
        isDark={false}
      />
    );

    expect(
      screen.getByText("You've reached the maximum of 100 users")
    ).toBeTruthy();
  });

  it("should render max users message when dataLength > 100", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={150}
        isDark={false}
      />
    );

    expect(
      screen.getByText("You've reached the maximum of 100 users")
    ).toBeTruthy();
  });

  it("should render nothing when isLoadingMore is false and hasMore is true", () => {
    const { queryByText } = renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={true}
        dataLength={10}
        isDark={false}
      />
    );

    expect(queryByText("Loading more users...")).toBeNull();
    expect(queryByText("You've reached the maximum of 100 users")).toBeNull();
  });

  it("should render nothing when isLoadingMore is false, hasMore is false but dataLength < 100", () => {
    const { queryByText } = renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={50}
        isDark={false}
      />
    );

    expect(queryByText("Loading more users...")).toBeNull();
    expect(queryByText("You've reached the maximum of 100 users")).toBeNull();
  });

  it("should render with light theme", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={true}
        hasMore={true}
        dataLength={10}
        isDark={false}
      />
    );

    expect(screen.getByText("Loading more users...")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={true}
        hasMore={true}
        dataLength={10}
        isDark={true}
      />
    );

    expect(screen.getByText("Loading more users...")).toBeTruthy();
  });

  it("should render max users message with light theme", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={100}
        isDark={false}
      />
    );

    expect(
      screen.getByText("You've reached the maximum of 100 users")
    ).toBeTruthy();
  });

  it("should render max users message with dark theme", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={100}
        isDark={true}
      />
    );

    expect(
      screen.getByText("You've reached the maximum of 100 users")
    ).toBeTruthy();
  });

  it("should handle edge case with exactly 100 users", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={100}
        isDark={false}
      />
    );

    expect(
      screen.getByText("You've reached the maximum of 100 users")
    ).toBeTruthy();
  });

  it("should handle edge case with 99 users", () => {
    const { queryByText } = renderWithProviders(
      <FooterSection
        isLoadingMore={false}
        hasMore={false}
        dataLength={99}
        isDark={false}
      />
    );

    expect(queryByText("Loading more users...")).toBeNull();
    expect(queryByText("You've reached the maximum of 100 users")).toBeNull();
  });

  it("should prioritize loading state over max users message", () => {
    renderWithProviders(
      <FooterSection
        isLoadingMore={true}
        hasMore={false}
        dataLength={100}
        isDark={false}
      />
    );

    expect(screen.getByText("Loading more users...")).toBeTruthy();
    expect(
      screen.queryByText("You've reached the maximum of 100 users")
    ).toBeNull();
  });
});
