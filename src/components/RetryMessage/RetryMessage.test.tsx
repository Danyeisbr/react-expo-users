import { fireEvent, render, screen } from "@testing-library/react-native";
import RetryMessage from "./RetryMessage";

jest.mock("../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

describe("RetryMessage", () => {
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    mockOnRetry.mockClear();
  });

  it("should render default message when no message provided", () => {
    renderWithProviders(<RetryMessage onRetry={mockOnRetry} />);

    expect(screen.getByText("Algo salió mal.")).toBeTruthy();
  });

  it("should render custom message when provided", () => {
    const customMessage = "Error personalizado";
    renderWithProviders(
      <RetryMessage message={customMessage} onRetry={mockOnRetry} />
    );

    expect(screen.getByText(customMessage)).toBeTruthy();
  });

  it("should render correct sub-message for TIMEOUT error", () => {
    renderWithProviders(
      <RetryMessage errorCode="TIMEOUT" onRetry={mockOnRetry} />
    );

    expect(
      screen.getByText(
        "La conexión tardó más de 10 segundos. Verifica tu conexión a internet."
      )
    ).toBeTruthy();
  });

  it("should render correct sub-message for NO_INTERNET error", () => {
    renderWithProviders(
      <RetryMessage errorCode="NO_INTERNET" onRetry={mockOnRetry} />
    );

    expect(
      screen.getByText(
        "No hay conexión a internet. Verifica tu red WiFi o datos móviles."
      )
    ).toBeTruthy();
  });

  it("should render correct sub-message for SERVER_ERROR error", () => {
    renderWithProviders(
      <RetryMessage errorCode="SERVER_ERROR" onRetry={mockOnRetry} />
    );

    expect(
      screen.getByText(
        "El servidor está experimentando problemas. Intenta en unos minutos."
      )
    ).toBeTruthy();
  });

  it("should render correct sub-message for CLIENT_ERROR error", () => {
    renderWithProviders(
      <RetryMessage errorCode="CLIENT_ERROR" onRetry={mockOnRetry} />
    );

    expect(
      screen.getByText("Error en la solicitud. Verifica tu conexión.")
    ).toBeTruthy();
  });

  it("should render default sub-message for unknown error", () => {
    renderWithProviders(
      <RetryMessage errorCode="UNKNOWN_ERROR" onRetry={mockOnRetry} />
    );

    expect(
      screen.getByText("Verifica tu conexión a internet e intenta nuevamente.")
    ).toBeTruthy();
  });

  it("should show retry button with correct text", () => {
    renderWithProviders(<RetryMessage onRetry={mockOnRetry} />);

    expect(screen.getByText("Reintentar")).toBeTruthy();
  });

  it("should call onRetry when retry button is pressed", () => {
    renderWithProviders(<RetryMessage onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Reintentar");
    fireEvent.press(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("should show retry count when retryCount > 0", () => {
    renderWithProviders(<RetryMessage retryCount={2} onRetry={mockOnRetry} />);

    expect(screen.getByText("Reintentos: 2/3")).toBeTruthy();
  });

  it("should not show retry count when retryCount is 0", () => {
    renderWithProviders(<RetryMessage retryCount={0} onRetry={mockOnRetry} />);

    expect(screen.queryByText(/Reintentos:/)).toBeNull();
  });

  it("should disable button and show max retries message when retryCount >= 3", () => {
    renderWithProviders(<RetryMessage retryCount={3} onRetry={mockOnRetry} />);

    expect(screen.getByText("Máximo de reintentos alcanzado")).toBeTruthy();
    expect(screen.getByText("Reintentos: 3/3")).toBeTruthy();
  });

  it("should not call onRetry when button is disabled", () => {
    renderWithProviders(<RetryMessage retryCount={3} onRetry={mockOnRetry} />);

    const disabledButton = screen.getByText("Máximo de reintentos alcanzado");
    fireEvent.press(disabledButton);

    expect(mockOnRetry).not.toHaveBeenCalled();
  });

  it("should have correct accessibility role for button", () => {
    renderWithProviders(<RetryMessage onRetry={mockOnRetry} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });
});
