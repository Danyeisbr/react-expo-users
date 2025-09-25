import type { EmptyStateProps } from "../../../types/shared-types";
import { EmptyContainer, EmptyText } from "./EmptyState.styles";

export const EmptyState: React.FC<EmptyStateProps> = ({ isDark }) => (
  <EmptyContainer>
    <EmptyText isDark={isDark}>No results.</EmptyText>
  </EmptyContainer>
);
