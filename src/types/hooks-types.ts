import type { SkeletonLoaderProps } from "./component-types";
import type { User } from "./shared-types";
export interface UseUserDetailProps {
  userId: number;
}

export interface UseUserCardProps {
  user: User;
}

export interface UseSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export interface UseRetryMessageProps {
  errorCode?: string | null;
  retryCount?: number;
}

export interface UseSkeletonLoaderProps {
  type: SkeletonLoaderProps["type"];
  isDark: boolean;
}

export interface SkeletonRowConfig {
  width: string;
  height: number;
}

export interface UseUserDetailReturn {
  user: User | null;
  isLoading: boolean;
}

export interface UseUserCardReturn {
  isDark: boolean;
  avatarUri: string;
  shadowStyle: any;
  avatarAccessibilityLabel: string;
}

export interface UseSearchBarReturn {
  isDark: boolean;
  placeholder: string;
  placeholderTextColor: string;
  handleChangeText: (text: string) => void;
  accessibilityLabel: string;
}

export interface UseRetryMessageReturn {
  isDark: boolean;
  subMessage: string;
  isMaxRetries: boolean;
  buttonText: string;
  showRetryCount: boolean;
  retryCountText: string;
}

export interface UseSkeletonLoaderReturn {
  isDark: boolean;
  currentRows: SkeletonRowConfig[];
  currentSpacers: number[];
  shouldShowCardLayout: boolean;
}
