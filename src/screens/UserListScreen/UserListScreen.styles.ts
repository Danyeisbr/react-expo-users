import styled from "styled-components/native";

export const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "#000000" : "#f9fafb")};
`;
