import { useCallback, useMemo } from "react";
import { useThemeStore } from "../store/themeStore";
import type {
  UseSearchBarProps,
  UseSearchBarReturn,
} from "../types/shared-types";

export const useSearchBar = ({
  value,
  onChangeText,
  placeholder = "Search by name or email",
  debounceMs = 300,
}: UseSearchBarProps): UseSearchBarReturn => {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  const placeholderTextColor = useMemo(
    () => (isDark ? "#9ca3af" : "#6b7280"),
    [isDark]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
    },
    [onChangeText]
  );

  return {
    isDark,
    placeholder,
    placeholderTextColor,
    handleChangeText,
    accessibilityLabel: "search-input",
  };
};
