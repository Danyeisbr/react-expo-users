import styled from "styled-components/native";

export const EmptyContainer = styled.View`
  padding: 24px;
`;

export const EmptyText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;
