import styled from "styled-components/native";

export const FooterContainer = styled.View`
  padding-vertical: 16px;
  align-items: center;
`;

export const FooterText = styled.Text<{ isDark: boolean }>`
  margin-top: 8px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;
