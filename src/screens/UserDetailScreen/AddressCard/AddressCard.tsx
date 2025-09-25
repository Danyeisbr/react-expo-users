import type { AddressCardProps } from "../../../types/shared-types";
import { Card, SectionText, SectionTitle } from "./AddressCard.styles";

export const AddressCard: React.FC<AddressCardProps> = ({ user, isDark }) => (
  <Card isDark={isDark} marginVertical={8}>
    <SectionTitle isDark={isDark}>Address</SectionTitle>
    <SectionText isDark={isDark}>
      {user.address.street}, {user.address.suite}
    </SectionText>
    <SectionText isDark={isDark}>
      {user.address.city} {user.address.zipcode}
    </SectionText>
  </Card>
);
