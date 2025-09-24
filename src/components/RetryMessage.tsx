import { useThemeStore } from "@store/themeStore";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 24px;
  align-items: center;
`;

const Message = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#f87171" : "#dc2626")};
  margin-bottom: 8px;
  text-align: center;
  font-size: 16px;
  line-height: 22px;
`;

const SubMessage = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;

const Button = styled.Pressable<{ isDark: boolean; disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled
      ? props.isDark
        ? "#374151"
        : "#d1d5db"
      : props.isDark
      ? "#2563eb"
      : "#3b82f6"};
  padding-horizontal: 20px;
  padding-vertical: 12px;
  border-radius: 12px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text<{ disabled?: boolean }>`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
`;

const RetryCount = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#6b7280" : "#9ca3af")};
  margin-top: 8px;
  font-size: 12px;
`;

type Props = {
  message?: string;
  errorCode?: string | null;
  retryCount?: number;
  onRetry: () => void;
};

export default function RetryMessage({
  message,
  errorCode,
  retryCount = 0,
  onRetry,
}: Props) {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  const getSubMessage = (code?: string | null) => {
    switch (code) {
      case "TIMEOUT":
        return "La conexión tardó más de 10 segundos. Verifica tu conexión a internet.";
      case "NO_INTERNET":
        return "No hay conexión a internet. Verifica tu red WiFi o datos móviles.";
      case "SERVER_ERROR":
        return "El servidor está experimentando problemas. Intenta en unos minutos.";
      case "CLIENT_ERROR":
        return "Error en la solicitud. Verifica tu conexión.";
      default:
        return "Verifica tu conexión a internet e intenta nuevamente.";
    }
  };

  const isMaxRetries = retryCount >= 3;
  const buttonText = isMaxRetries
    ? "Máximo de reintentos alcanzado"
    : "Reintentar";

  return (
    <Container>
      <Message isDark={isDark}>{message ?? "Algo salió mal."}</Message>
      <SubMessage isDark={isDark}>{getSubMessage(errorCode)}</SubMessage>
      <Button
        accessibilityRole="button"
        onPress={onRetry}
        isDark={isDark}
        disabled={isMaxRetries}
      >
        <ButtonText disabled={isMaxRetries}>{buttonText}</ButtonText>
      </Button>
      {retryCount > 0 && (
        <RetryCount isDark={isDark}>Reintentos: {retryCount}/3</RetryCount>
      )}
    </Container>
  );
}
