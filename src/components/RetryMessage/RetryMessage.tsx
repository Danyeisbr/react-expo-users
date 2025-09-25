import { useRetryMessage } from "../../hooks/useRetryMessage";
import type { RetryMessageProps } from "../../types/shared-types";
import {
  Button,
  ButtonText,
  Container,
  Message,
  RetryCount,
  SubMessage,
} from "./RetryMessage.styles";

export default function RetryMessage({
  message,
  errorCode,
  retryCount = 0,
  onRetry,
}: RetryMessageProps) {
  const {
    isDark,
    subMessage,
    isMaxRetries,
    buttonText,
    showRetryCount,
    retryCountText,
  } = useRetryMessage({
    errorCode,
    retryCount,
  });

  return (
    <Container>
      <Message isDark={isDark}>{message ?? "Algo salió mal."}</Message>
      <SubMessage isDark={isDark}>{subMessage}</SubMessage>
      <Button
        accessibilityRole="button"
        onPress={onRetry}
        isDark={isDark}
        disabled={isMaxRetries}
      >
        <ButtonText disabled={isMaxRetries}>{buttonText}</ButtonText>
      </Button>
      {showRetryCount && (
        <RetryCount isDark={isDark}>{retryCountText}</RetryCount>
      )}
    </Container>
  );
}
