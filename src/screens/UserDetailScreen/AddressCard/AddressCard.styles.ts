import styled from "styled-components/native";

export const Card = styled.View<{ isDark: boolean }>`
  margin: 8px 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

export const SectionTitle = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
  margin-bottom: 8px;
`;

export const SectionText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#d1d5db" : "#374151")};
  line-height: 20px;
`;
