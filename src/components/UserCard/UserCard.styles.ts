import styled from "styled-components/native";

export const Container = styled.Pressable<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 16px;
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-right: 12px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Name = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

export const Email = styled.Text<{ isDark: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

export const Chevron = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.isDark ? "#2563eb" : "#3b82f6")};
  margin-left: 8px;
`;
