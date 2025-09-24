import type { RootStackParamList } from "@nav/RootNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useThemeStore } from "@store/themeStore";
import { useUserStore } from "@store/userStore";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetail">;

export default function UserDetailScreen({ route }: Props) {
  const { id } = route.params;
  const user = useUserStore((s) => s.users.find((u) => u.id === id));
  const effective = useThemeStore((s) => s.effective);

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: effective === "dark" ? "#000000" : "#f9fafb",
    },
    loadingText: {
      marginTop: 8,
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: effective === "dark" ? "#000000" : "#f9fafb",
    },
    card: {
      margin: 16,
      padding: 16,
      borderRadius: 16,
      backgroundColor: effective === "dark" ? "#111827" : "#ffffff",
      borderWidth: 1,
      borderColor: effective === "dark" ? "#374151" : "#e5e7eb",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: effective === "dark" ? "#f3f4f6" : "#111827",
    },
    email: {
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: effective === "dark" ? "#f3f4f6" : "#111827",
      marginBottom: 8,
    },
    sectionText: {
      color: effective === "dark" ? "#d1d5db" : "#374151",
      lineHeight: 20,
    },
    italicText: {
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
      fontStyle: "italic",
      marginTop: 4,
    },
  });

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={[styles.card, { marginVertical: 8 }]}>
        <Text style={styles.sectionTitle}>Phone</Text>
        <Text style={styles.sectionText}>{user.phone}</Text>
      </View>

      <View style={[styles.card, { marginVertical: 8 }]}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.sectionText}>
          {user.address.street}, {user.address.suite}
        </Text>
        <Text style={styles.sectionText}>
          {user.address.city} {user.address.zipcode}
        </Text>
      </View>

      <View style={[styles.card, { marginVertical: 8, marginBottom: 24 }]}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.sectionText}>{user.company.name}</Text>
        <Text style={styles.italicText}>{user.company.catchPhrase}</Text>
      </View>
    </ScrollView>
  );
}
