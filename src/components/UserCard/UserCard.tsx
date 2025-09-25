import { memo } from "react";
import { useUserCard } from "../../hooks/useUserCard";
import type { UserCardProps } from "../../types/shared-types";
import {
  Avatar,
  Chevron,
  Container,
  Content,
  Email,
  Name,
} from "./UserCard.styles";

function UserCard({ user, onPress }: UserCardProps) {
  const { isDark, avatarUri, shadowStyle, avatarAccessibilityLabel } =
    useUserCard({ user });

  return (
    <Container onPress={onPress} isDark={isDark} style={shadowStyle}>
      <Avatar
        source={{ uri: avatarUri }}
        accessibilityLabel={avatarAccessibilityLabel}
      />
      <Content>
        <Name isDark={isDark} numberOfLines={1}>
          {user.name}
        </Name>
        <Email isDark={isDark} numberOfLines={1}>
          {user.email}
        </Email>
      </Content>
      <Chevron isDark={isDark}>›</Chevron>
    </Container>
  );
}

export default memo(UserCard);
