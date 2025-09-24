import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@nav/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "@components/SkeletonLoader";
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
    errorCode,
    retryCount,
    init,
    refresh,
    retry,
    clearCache,
    visibleUsers,
    loadMore,
    query,
    setQuery,
    hasMore,
    isLoadingMore,
  } = useUserStore();
  const { mode, effective, setMode } = useThemeStore();

  useEffect(() => {
    init();
  }, [init]);

  const data = visibleUsers();
  const isDark = effective === "dark";

  const onEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      loadMore();
    }
  }, [loadMore, hasMore, isLoadingMore]);

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserCard
        user={item}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("UserDetail", { id: item.id });
        }}
      />
    ),
    [navigation]
  );

  const renderFooter = useCallback(() => {
    if (isLoadingMore) {
      return (
        <FooterContainer>
          <ActivityIndicator size="small" />
          <FooterText isDark={isDark}>Loading more users...</FooterText>
        </FooterContainer>
      );
    }

    if (!hasMore && data.length >= 100) {
      return (
        <FooterContainer>
          <FooterText isDark={isDark}>
            You've reached the maximum of 100 users
          </FooterText>
        </FooterContainer>
      );
    }

    return null;
  }, [isLoadingMore, hasMore, data.length, isDark]);

  const toggleTheme = () => {
    if (mode === "system") setMode(effective === "dark" ? "light" : "dark");
    else setMode(mode === "dark" ? "light" : "dark");
  };

  const handleClearCache = async () => {
    await clearCache();
    init();
  };

  const themeLabel = mode === "system" ? `System (${effective})` : mode;

  return (
    <Container isDark={isDark}>
      <Header>
        <Title isDark={isDark}>Users</Title>
        <ThemeButton
          onPress={handleClearCache}
          accessibilityRole="button"
          isDark={isDark}
          style={{ marginRight: 8 }}
        >
          <ThemeButtonText isDark={isDark}>Clear Cache</ThemeButtonText>
        </ThemeButton>
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
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonLoader key={index} type="card" isDark={isDark} />
          ))}
        </>
      ) : status === "error" ? (
        <RetryMessage
          message={error ?? "Failed to load"}
          errorCode={errorCode}
          retryCount={retryCount}
          onRetry={retry}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          onEndReachedThreshold={0.4}
          onEndReached={onEndReached}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          updateCellsBatchingPeriod={50}
          getItemLayout={(data, index) => ({
            length: 88,
            offset: 88 * index,
            index,
          })}
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
