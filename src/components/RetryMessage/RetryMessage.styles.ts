import styled from "styled-components/native";

export const Container = styled.View`
  padding: 24px;
  align-items: center;
`;

export const Message = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#f87171" : "#dc2626")};
  margin-bottom: 8px;
  text-align: center;
  font-size: 16px;
  line-height: 22px;
`;

export const SubMessage = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
`;

export const Button = styled.Pressable<{ isDark: boolean; disabled?: boolean }>`
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

export const ButtonText = styled.Text<{ disabled?: boolean }>`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
`;

export const RetryCount = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#6b7280" : "#9ca3af")};
  margin-top: 8px;
  font-size: 12px;
`;
