import { useThemeStore } from "@store/themeStore";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 24px;
  align-items: center;
`;

const Message = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#f87171" : "#dc2626")};
  margin-bottom: 12px;
  text-align: center;
`;

const Button = styled.Pressable<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#2563eb" : "#3b82f6")};
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 12px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 500;
`;

type Props = { message?: string; onRetry: () => void };

export default function RetryMessage({ message, onRetry }: Props) {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  return (
    <Container>
      <Message isDark={isDark}>{message ?? "Something went wrong."}</Message>
      <Button accessibilityRole="button" onPress={onRetry} isDark={isDark}>
        <ButtonText>Retry</ButtonText>
      </Button>
    </Container>
  );
}
