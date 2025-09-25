import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { LayoutAnimation } from "react-native";
import { useThemeStore } from "../store/themeStore";
import { useUserStore } from "../store/userStore";
import type { RootStackParamList } from "../types/shared-types";

export const useUserList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const navigateToUserDetail = useCallback(
    (userId: number) => {
      navigation.navigate("UserDetail", { id: userId });
    },
    [navigation]
  );

  const toggleTheme = useCallback(() => {
    if (mode === "system") setMode(effective === "dark" ? "light" : "dark");
    else setMode(mode === "dark" ? "light" : "dark");
  }, [mode, effective, setMode]);

  const handleClearCache = useCallback(async () => {
    await clearCache();
    init();
  }, [clearCache, init]);

  const themeLabel = mode === "system" ? `System (${effective})` : mode;

  return {
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
  };
};
