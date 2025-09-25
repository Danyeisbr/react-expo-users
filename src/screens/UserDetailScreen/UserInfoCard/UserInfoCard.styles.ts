import styled from "styled-components/native";

export const Card = styled.View<{ isDark: boolean }>`
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

export const Title = styled.Text<{ isDark: boolean }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

export const Email = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
  margin-top: 4px;
`;
