import styled from "styled-components/native";

export const Container = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

export const Input = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#1f2937" : "#f3f4f6")};
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
  border-radius: 12px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  font-size: 16px;
`;
