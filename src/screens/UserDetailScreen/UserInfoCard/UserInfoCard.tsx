import React from "react";
import type { UserInfoCardProps } from "../../../types/shared-types";
import { Card, Email, Title } from "./UserInfoCard.styles";

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, isDark }) => (
  <Card isDark={isDark}>
    <Title isDark={isDark}>{user.name}</Title>
    <Email isDark={isDark}>{user.email}</Email>
  </Card>
);
