import RetryMessage from "@components/RetryMessage";
import SearchBar from "@components/SearchBar";
import UserCard from "@components/UserCard";
import type { RootStackParamList } from "@nav/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useThemeStore } from "@store/themeStore";
import { useUserStore } from "@store/userStore";
import type { User } from "../types";
import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<RootStackParamList, "Users">;

export default function UserListScreen({}: Props) {
  const navigation = useNavigation();
  const {
    status,
    error,
    init,
    refresh,
    visibleUsers,
    loadMore,
    query,
    setQuery,
  } = useUserStore();
  const { mode, effective, setMode } = useThemeStore();

  useEffect(() => {
    init();
  }, [init]);

  const data = visibleUsers();

  const onEndReached = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    loadMore();
  }, [loadMore]);

  const renderItem = ({ item }: { item: User }) => (
    <UserCard
      user={item}
      onPress={() => {
        // Subtle feedback on press is handled by UserCard; navigation transition is handled by stack
        // Show spinner in next screen if needed (we pass id and fetch details from store list)
        // Since all fields are already present, we only show loader while pushing screen.
        // Navigation includes default platform transition.
        // For extra UX, you could add shared element, but not required here.
        // @ts-ignore
        navigation.navigate("UserDetail", { id: item.id });
      }}
    />
  );

  const toggleTheme = () => {
    if (mode === "system") setMode(effective === "dark" ? "light" : "dark");
    else setMode(mode === "dark" ? "light" : "dark");
  };

  const themeLabel = mode === "system" ? `System (${effective})` : mode;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: effective === "dark" ? "#000000" : "#f9fafb",
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: effective === "dark" ? "#f3f4f6" : "#111827",
    },
    themeButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: effective === "dark" ? "#1f2937" : "#e5e7eb",
    },
    themeButtonText: {
      color: effective === "dark" ? "#e5e7eb" : "#374151",
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      marginTop: 8,
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
    },
    footerContainer: {
      paddingVertical: 16,
      alignItems: "center",
    },
    footerText: {
      marginTop: 8,
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
    },
    emptyContainer: {
      padding: 24,
    },
    emptyText: {
      color: effective === "dark" ? "#9ca3af" : "#6b7280",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <Pressable
          onPress={toggleTheme}
          accessibilityRole="button"
          style={styles.themeButton}
        >
          <Text style={styles.themeButtonText}>Theme: {themeLabel}</Text>
        </Pressable>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      {status === "loading" && data.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : status === "error" ? (
        <RetryMessage message={error ?? "Failed to load"} onRetry={refresh} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          onEndReachedThreshold={0.4}
          onEndReached={onEndReached}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListFooterComponent={
            data.length > 0 && data.length < 100 ? (
              <View style={styles.footerContainer}>
                <ActivityIndicator />
                <Text style={styles.footerText}>Loading more...</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results.</Text>
            </View>
          }
          accessibilityLabel="user-list"
        />
      )}
    </View>
  );
}
