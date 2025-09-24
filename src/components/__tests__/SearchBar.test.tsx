import { fireEvent, render } from "@testing-library/react-native";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    expect(getByPlaceholderText("Search by name or email")).toBeTruthy();
  });

  it("renders with custom placeholder", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Custom placeholder"
      />
    );

    expect(getByPlaceholderText("Custom placeholder")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const mockOnChangeText = jest.fn();
    const { getByLabelText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );

    const input = getByLabelText("search-input");
    fireEvent.changeText(input, "test search");

    expect(mockOnChangeText).toHaveBeenCalledWith("test search");
  });

  it("displays the current value", () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <SearchBar value="current value" onChangeText={mockOnChangeText} />
    );

    expect(getByDisplayValue("current value")).toBeTruthy();
  });
});
