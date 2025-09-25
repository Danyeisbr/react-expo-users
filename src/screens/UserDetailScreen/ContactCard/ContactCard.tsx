import type { ContactCardProps } from "../../../types/shared-types";
import { Card, SectionText, SectionTitle } from "./ContactCard.styles";

export const ContactCard: React.FC<ContactCardProps> = ({ user, isDark }) => (
  <Card isDark={isDark} marginVertical={8}>
    <SectionTitle isDark={isDark}>Phone</SectionTitle>
    <SectionText isDark={isDark}>{user.phone}</SectionText>
  </Card>
);
