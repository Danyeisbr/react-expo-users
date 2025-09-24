import { useThemeStore } from "@store/themeStore";
import styled from "styled-components/native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { User } from "../types";

const Container = styled.Pressable<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 16px;
  margin-vertical: 8px;
  padding: 12px;
  border-radius: 16px;
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-right: 12px;
`;

const Content = styled.View`
  flex: 1;
`;

const Name = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

const Email = styled.Text<{ isDark: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

const Chevron = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.isDark ? "#2563eb" : "#3b82f6")};
  margin-left: 8px;
`;

type Props = {
  user: User;
  onPress?: () => void;
};

export default function UserCard({ user, onPress }: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const avatarUri = `https://picsum.photos/seed/${user.id}/200`;

  return (
    <Animated.View style={{ opacity: fade }}>
      <Container onPress={onPress} isDark={isDark}>
        <Avatar
          source={{ uri: avatarUri }}
          accessibilityLabel={`${user.name} avatar`}
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
    </Animated.View>
  );
}
