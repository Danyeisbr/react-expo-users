import { fireEvent, render, screen } from "@testing-library/react-native";
import SearchBar from "./SearchBar";
import React from "react";

jest.mock("../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("SearchBar", () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  it("should render with default placeholder", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    expect(screen.getByPlaceholderText("Search by name or email")).toBeTruthy();
  });

  it("should render with custom placeholder", () => {
    const customPlaceholder = "Buscar usuarios...";
    renderWithProviders(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder={customPlaceholder}
      />
    );

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeTruthy();
  });

  it("should display the provided value", () => {
    const testValue = "test search";
    renderWithProviders(
      <SearchBar value={testValue} onChangeText={mockOnChangeText} />
    );

    expect(screen.getByDisplayValue(testValue)).toBeTruthy();
  });

  it("should call onChangeText when text is entered", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText("Search by name or email");
    fireEvent.changeText(input, "new search");

    expect(mockOnChangeText).toHaveBeenCalledWith("new search");
  });

  it("should call onChangeText multiple times for multiple changes", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText("Search by name or email");
    fireEvent.changeText(input, "first");
    fireEvent.changeText(input, "second");
    fireEvent.changeText(input, "third");

    expect(mockOnChangeText).toHaveBeenCalledTimes(3);
    expect(mockOnChangeText).toHaveBeenNthCalledWith(1, "first");
    expect(mockOnChangeText).toHaveBeenNthCalledWith(2, "second");
    expect(mockOnChangeText).toHaveBeenNthCalledWith(3, "third");
  });

  it("should handle empty string input", () => {
    renderWithProviders(
      <SearchBar value="initial" onChangeText={mockOnChangeText} />
    );

    const input = screen.getByDisplayValue("initial");
    fireEvent.changeText(input, "");

    expect(mockOnChangeText).toHaveBeenCalledWith("");
  });

  it("should handle special characters in input", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText("Search by name or email");
    const specialText = "test@email.com #special $chars";
    fireEvent.changeText(input, specialText);

    expect(mockOnChangeText).toHaveBeenCalledWith(specialText);
  });

  it("should have correct accessibility label", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByLabelText("search-input");
    expect(input).toBeTruthy();
  });

  it("should be focusable and editable", () => {
    renderWithProviders(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText("Search by name or email");
    expect(input).toBeTruthy();
  });

  it("should maintain value when re-rendered", () => {
    const testValue = "persistent value";
    const { rerender } = renderWithProviders(
      <SearchBar value={testValue} onChangeText={mockOnChangeText} />
    );

    expect(screen.getByDisplayValue(testValue)).toBeTruthy();

    rerender(<SearchBar value={testValue} onChangeText={mockOnChangeText} />);

    expect(screen.getByDisplayValue(testValue)).toBeTruthy();
  });

  it("should update value when prop changes", () => {
    const { rerender } = renderWithProviders(
      <SearchBar value="initial" onChangeText={mockOnChangeText} />
    );

    expect(screen.getByDisplayValue("initial")).toBeTruthy();

    rerender(<SearchBar value="updated" onChangeText={mockOnChangeText} />);

    expect(screen.getByDisplayValue("updated")).toBeTruthy();
    expect(screen.queryByDisplayValue("initial")).toBeNull();
  });
});
