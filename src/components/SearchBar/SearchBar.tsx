import { memo } from "react";
import { useSearchBar } from "../../hooks/useSearchBar";
import type { SearchBarProps } from "../../types/shared-types";
import { Container, Input } from "./SearchBar.styles";

const SearchBar = memo(
  ({ value, onChangeText, placeholder }: SearchBarProps) => {
    const {
      isDark,
      placeholder: finalPlaceholder,
      placeholderTextColor,
      handleChangeText,
      accessibilityLabel,
    } = useSearchBar({
      value,
      onChangeText,
      placeholder,
    });

    return (
      <Container>
        <Input
          value={value}
          onChangeText={handleChangeText}
          placeholder={finalPlaceholder}
          placeholderTextColor={placeholderTextColor}
          accessibilityLabel={accessibilityLabel}
          isDark={isDark}
        />
      </Container>
    );
  }
);

export default SearchBar;
