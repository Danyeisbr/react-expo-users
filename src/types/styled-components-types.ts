import type { ReactNode } from "react";

export interface StyledProps {
  isDark: boolean;
}

export interface StyledWithChildren extends StyledProps {
  children: ReactNode;
}

export interface StyledWithMargins extends StyledProps {
  marginVertical?: number;
  marginBottom?: number;
}

export interface StyledButtonProps extends StyledProps {
  disabled?: boolean;
  onPress?: () => void;
  accessibilityRole?: "button";
  style?: any;
}

export interface StyledTextProps extends StyledProps {
  numberOfLines?: number;
  children: ReactNode;
}

export interface StyledImageProps {
  source: { uri: string };
  accessibilityLabel: string;
}

export interface StyledContainerProps extends StyledProps {
  children: ReactNode;
  onPress?: () => void;
  style?: any;
}
