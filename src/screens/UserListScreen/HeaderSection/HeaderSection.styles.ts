import styled from "styled-components/native";

export const Header = styled.View`
  padding-horizontal: 16px;
  padding-top: 12px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text<{ isDark: boolean }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

export const ThemeButton = styled.Pressable<{ isDark: boolean }>`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 12px;
  background-color: ${(props) => (props.isDark ? "#1f2937" : "#e5e7eb")};
`;

export const ThemeButtonText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#e5e7eb" : "#374151")};
`;
