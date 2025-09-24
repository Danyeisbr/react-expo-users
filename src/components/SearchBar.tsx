import { useThemeStore } from "@store/themeStore";
import styled from "styled-components/native";
import { memo } from "react";

const Container = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

const Input = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#1f2937" : "#f3f4f6")};
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
  border-radius: 12px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  font-size: 16px;
`;

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

const SearchBar = memo(({ value, onChangeText, placeholder }: Props) => {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  return (
    <Container>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? "Search by name or email"}
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        accessibilityLabel="search-input"
        isDark={isDark}
      />
    </Container>
  );
});
export default SearchBar;
