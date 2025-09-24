import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@nav/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import RetryMessage from "@components/RetryMessage";
import { useThemeStore } from "@store/themeStore";
import { useUserStore } from "@store/userStore";
import { useCallback, useEffect } from "react";
import SearchBar from "@components/SearchBar";
import UserCard from "@components/UserCard";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import styled from "styled-components/native";
import type { User } from "../types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Container = styled.View<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "#000000" : "#f9fafb")};
`;

const Header = styled.View`
  padding-horizontal: 16px;
  padding-top: 12px;
  padding-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

const ThemeButton = styled.Pressable<{ isDark: boolean }>`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 12px;
  background-color: ${(props) => (props.isDark ? "#1f2937" : "#e5e7eb")};
`;

const ThemeButtonText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#e5e7eb" : "#374151")};
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.Text<{ isDark: boolean }>`
  margin-top: 8px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

const FooterContainer = styled.View`
  padding-vertical: 16px;
  align-items: center;
`;

const FooterText = styled.Text<{ isDark: boolean }>`
  margin-top: 8px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

const EmptyContainer = styled.View`
  padding: 24px;
`;

const EmptyText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

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
  const isDark = effective === "dark";

  return (
    <Container isDark={isDark}>
      <Header>
        <Title isDark={isDark}>Users</Title>
        <ThemeButton
          onPress={toggleTheme}
          accessibilityRole="button"
          isDark={isDark}
        >
          <ThemeButtonText isDark={isDark}>Theme: {themeLabel}</ThemeButtonText>
        </ThemeButton>
      </Header>

      <SearchBar value={query} onChangeText={setQuery} />

      {status === "loading" && data.length === 0 ? (
        <LoadingContainer>
          <ActivityIndicator />
          <LoadingText isDark={isDark}>Loading users...</LoadingText>
        </LoadingContainer>
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
              <FooterContainer>
                <ActivityIndicator />
                <FooterText isDark={isDark}>Loading more...</FooterText>
              </FooterContainer>
            ) : null
          }
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyText isDark={isDark}>No results.</EmptyText>
            </EmptyContainer>
          }
          accessibilityLabel="user-list"
        />
      )}
    </Container>
  );
}
