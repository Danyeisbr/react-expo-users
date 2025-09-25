import { useCallback } from "react";
import { FlatList, Platform, UIManager } from "react-native";
import RetryMessage from "../../components/RetryMessage/RetryMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import UserCard from "../../components/UserCard/UserCard";
import { useUserList } from "../../hooks/useUserList";
import type { User, UserListScreenProps } from "../../types/shared-types";
import { EmptyState } from "./EmptyState/EmptyState";
import { FooterSection } from "./FooterSection/FooterSection";
import { HeaderSection } from "./HeaderSection/HeaderSection";
import { Container } from "./UserListScreen.styles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function UserListScreen({}: UserListScreenProps) {
  const {
    status,
    error,
    errorCode,
    retryCount,
    data,
    query,
    hasMore,
    isLoadingMore,
    isDark,
    themeLabel,
    setQuery,
    retry,
    toggleTheme,
    handleClearCache,
    onEndReached,
    navigateToUserDetail,
  } = useUserList();

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserCard user={item} onPress={() => navigateToUserDetail(item.id)} />
    ),
    [navigateToUserDetail]
  );

  return (
    <Container isDark={isDark}>
      <HeaderSection
        isDark={isDark}
        themeLabel={themeLabel}
        onToggleTheme={toggleTheme}
        onClearCache={handleClearCache}
      />

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
          ListFooterComponent={() => (
            <FooterSection
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              dataLength={data.length}
              isDark={isDark}
            />
          )}
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
          ListEmptyComponent={<EmptyState isDark={isDark} />}
          accessibilityLabel="user-list"
        />
      )}
    </Container>
  );
}
