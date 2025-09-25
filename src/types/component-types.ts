import type { User } from "./shared-types";

export interface UserCardProps {
  user: User;
  onPress?: () => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export interface RetryMessageProps {
  message?: string;
  errorCode?: string | null;
  retryCount?: number;
  onRetry: () => void;
}

export interface SkeletonLoaderProps {
  type: "card" | "detail";
  isDark: boolean;
}

export interface UserInfoCardProps {
  user: User;
  isDark: boolean;
}

export interface ContactCardProps {
  user: User;
  isDark: boolean;
}

export interface AddressCardProps {
  user: User;
  isDark: boolean;
}

export interface CompanyCardProps {
  user: User;
  isDark: boolean;
}

export interface HeaderSectionProps {
  isDark: boolean;
  themeLabel: string;
  onToggleTheme: () => void;
  onClearCache: () => void;
}

export interface FooterSectionProps {
  isLoadingMore: boolean;
  hasMore: boolean;
  dataLength: number;
  isDark: boolean;
}

export interface EmptyStateProps {
  isDark: boolean;
}
