import { useThemeStore } from "@store/themeStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { message?: string; onRetry: () => void };

export default function RetryMessage({ message, onRetry }: Props) {
  const effective = useThemeStore((s) => s.effective);

  const styles = StyleSheet.create({
    container: {
      padding: 24,
      alignItems: "center",
    },
    message: {
      color: effective === "dark" ? "#f87171" : "#dc2626",
      marginBottom: 12,
      textAlign: "center",
    },
    button: {
      backgroundColor: effective === "dark" ? "#2563eb" : "#3b82f6",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message ?? "Something went wrong."}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}
