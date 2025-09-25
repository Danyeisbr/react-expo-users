import type { CompanyCardProps } from "../../../types/shared-types";
import {
  Card,
  ItalicText,
  SectionText,
  SectionTitle,
} from "./CompanyCard.styles";

export const CompanyCard: React.FC<CompanyCardProps> = ({ user, isDark }) => (
  <Card isDark={isDark} marginVertical={8} marginBottom={24}>
    <SectionTitle isDark={isDark}>Company</SectionTitle>
    <SectionText isDark={isDark}>{user.company.name}</SectionText>
    <ItalicText isDark={isDark}>{user.company.catchPhrase}</ItalicText>
  </Card>
);
