import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "#000000" : "#f9fafb")};
`;
