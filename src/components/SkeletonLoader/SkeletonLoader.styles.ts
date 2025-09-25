import styled from "styled-components/native";

export const SkeletonContainer = styled.View<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-radius: 16px;
  margin: 8px 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

export const SkeletonRow = styled.View<{
  isDark: boolean;
  width: string;
  height: number;
}>`
  background-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
  border-radius: 4px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width};
  margin-bottom: 8px;
`;

export const SkeletonAvatar = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
  margin-right: 12px;
`;

export const SkeletonCard = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
`;

export const SkeletonContent = styled.View`
  flex: 1;
`;

export const SkeletonSpacer = styled.View<{ height: number }>`
  height: ${(props) => props.height}px;
`;
