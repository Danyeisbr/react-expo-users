import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import { useUserDetail } from "../../hooks/useUserDetail";
import { useThemeStore } from "../../store/themeStore";
import type { UserDetailScreenProps } from "../../types/shared-types";
import { AddressCard } from "./AddressCard/AddressCard";
import { CompanyCard } from "./CompanyCard/CompanyCard";
import { ContactCard } from "./ContactCard/ContactCard";
import { ScrollContainer } from "./UserDetailScreen.styles";
import { UserInfoCard } from "./UserInfoCard/UserInfoCard";

export default function UserDetailScreen({ route }: UserDetailScreenProps) {
  const { id } = route.params;
  const { user, isLoading } = useUserDetail({ userId: id });
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  if (!user || isLoading) {
    return (
      <ScrollContainer isDark={isDark}>
        <SkeletonLoader type="detail" isDark={isDark} />
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer isDark={isDark}>
      <UserInfoCard user={user} isDark={isDark} />
      <ContactCard user={user} isDark={isDark} />
      <AddressCard user={user} isDark={isDark} />
      <CompanyCard user={user} isDark={isDark} />
    </ScrollContainer>
  );
}
