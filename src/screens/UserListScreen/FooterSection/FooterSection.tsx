import { ActivityIndicator } from "react-native";
import type { FooterSectionProps } from "../../../types/shared-types";
import { FooterContainer, FooterText } from "./FooterSection.styles";

export const FooterSection: React.FC<FooterSectionProps> = ({
  isLoadingMore,
  hasMore,
  dataLength,
  isDark,
}) => {
  if (isLoadingMore) {
    return (
      <FooterContainer>
        <ActivityIndicator size="small" />
        <FooterText isDark={isDark}>Loading more users...</FooterText>
      </FooterContainer>
    );
  }

  if (!hasMore && dataLength >= 100) {
    return (
      <FooterContainer>
        <FooterText isDark={isDark}>
          You've reached the maximum of 100 users
        </FooterText>
      </FooterContainer>
    );
  }

  return null;
};
