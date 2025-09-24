import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@nav/RootNavigator";
import { useThemeStore } from "@store/themeStore";
import { ActivityIndicator } from "react-native";
import { useUserStore } from "@store/userStore";
import styled from "styled-components/native";

const LoadingContainer = styled.View<{ isDark: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? "#000000" : "#f9fafb")};
`;

const LoadingText = styled.Text<{ isDark: boolean }>`
  margin-top: 8px;
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
`;

const ScrollContainer = styled.ScrollView<{ isDark: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.isDark ? "#000000" : "#f9fafb")};
`;

const Card = styled.View<{
  isDark: boolean;
  marginVertical?: number;
  marginBottom?: number;
}>`
  margin: ${(props) =>
    props.marginVertical ? `${props.marginVertical}px 16px` : "16px"};
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`}
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
`;

const Email = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
  margin-top: 4px;
`;

const SectionTitle = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "#f3f4f6" : "#111827")};
  margin-bottom: 8px;
`;

const SectionText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#d1d5db" : "#374151")};
  line-height: 20px;
`;

const ItalicText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "#9ca3af" : "#6b7280")};
  font-style: italic;
  margin-top: 4px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "UserDetail">;

export default function UserDetailScreen({ route }: Props) {
  const { id } = route.params;
  const user = useUserStore((s) => s.users.find((u) => u.id === id));
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  if (!user) {
    return (
      <LoadingContainer isDark={isDark}>
        <ActivityIndicator />
        <LoadingText isDark={isDark}>Loading details...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <ScrollContainer isDark={isDark}>
      <Card isDark={isDark}>
        <Title isDark={isDark}>{user.name}</Title>
        <Email isDark={isDark}>{user.email}</Email>
      </Card>

      <Card isDark={isDark} marginVertical={8}>
        <SectionTitle isDark={isDark}>Phone</SectionTitle>
        <SectionText isDark={isDark}>{user.phone}</SectionText>
      </Card>

      <Card isDark={isDark} marginVertical={8}>
        <SectionTitle isDark={isDark}>Address</SectionTitle>
        <SectionText isDark={isDark}>
          {user.address.street}, {user.address.suite}
        </SectionText>
        <SectionText isDark={isDark}>
          {user.address.city} {user.address.zipcode}
        </SectionText>
      </Card>

      <Card isDark={isDark} marginVertical={8} marginBottom={24}>
        <SectionTitle isDark={isDark}>Company</SectionTitle>
        <SectionText isDark={isDark}>{user.company.name}</SectionText>
        <ItalicText isDark={isDark}>{user.company.catchPhrase}</ItalicText>
      </Card>
    </ScrollContainer>
  );
}
