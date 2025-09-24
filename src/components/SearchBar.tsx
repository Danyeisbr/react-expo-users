import { useThemeStore } from "@store/themeStore";
import { memo } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
};

const SearchBar = memo(({ value, onChangeText, placeholder }: Props) => {
  const effective = useThemeStore((s) => s.effective);

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    input: {
      backgroundColor: effective === "dark" ? "#1f2937" : "#f3f4f6",
      color: effective === "dark" ? "#f3f4f6" : "#111827",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? "Search by name or email"}
        placeholderTextColor={effective === "dark" ? "#9ca3af" : "#6b7280"}
        accessibilityLabel="search-input"
        style={styles.input}
      />
    </View>
  );
});
export default SearchBar;
