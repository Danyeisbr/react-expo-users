import { useThemeStore } from "@store/themeStore";
import type { User } from "../types";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  user: User;
  onPress?: () => void;
};

export default function UserCard({ user, onPress }: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const effective = useThemeStore((s) => s.effective);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const avatarUri = `https://picsum.photos/seed/${user.id}/200`;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 12,
      borderRadius: 16,
      backgroundColor: effective === "dark" ? "#111827" : "#ffffff",
      borderWidth: 1,
      borderColor: effective === "dark" ? "#374151" : "#e5e7eb",
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: effective === "dark" ? "#f3f4f6" : "#111827",
    },
    email: {
      fontSize: 14,
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
    },
    chevron: {
      fontSize: 18,
      color: effective === "dark" ? "#2563eb" : "#3b82f6",
      marginLeft: 8,
    },
  });

  return (
    <Animated.View style={{ opacity: fade }}>
      <Pressable onPress={onPress} style={styles.container}>
        <Image
          source={{ uri: avatarUri }}
          style={styles.avatar}
          accessibilityLabel={`${user.name} avatar`}
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {user.email}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
    </Animated.View>
  );
}
