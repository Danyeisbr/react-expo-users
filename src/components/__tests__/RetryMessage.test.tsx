import { fireEvent, render } from "@testing-library/react-native";
import RetryMessage from "../RetryMessage";

describe("RetryMessage", () => {
  it("renders default error message", () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(<RetryMessage onRetry={mockOnRetry} />);

    expect(getByText("Something went wrong.")).toBeTruthy();
  });

  it("renders custom error message", () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(
      <RetryMessage message="Custom error" onRetry={mockOnRetry} />
    );

    expect(getByText("Custom error")).toBeTruthy();
  });

  it("calls onRetry when retry button is pressed", () => {
    const mockOnRetry = jest.fn();
    const { getByText } = render(<RetryMessage onRetry={mockOnRetry} />);

    fireEvent.press(getByText("Retry"));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("renders retry button with correct accessibility role", () => {
    const mockOnRetry = jest.fn();
    const { getByRole } = render(<RetryMessage onRetry={mockOnRetry} />);

    const button = getByRole("button");
    expect(button).toBeTruthy();
  });
});
