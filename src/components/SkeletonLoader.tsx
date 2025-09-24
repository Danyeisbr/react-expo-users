import styled from "styled-components/native";
import { View } from "react-native";

const SkeletonContainer = styled.View<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#111827" : "#ffffff")};
  border-radius: 16px;
  margin: 8px 16px;
  padding: 16px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
`;

const SkeletonRow = styled.View<{
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

const SkeletonAvatar = styled.View<{ isDark: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) => (props.isDark ? "#374151" : "#e5e7eb")};
  margin-right: 12px;
`;

const SkeletonCard = styled.View<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
`;

const SkeletonContent = styled.View`
  flex: 1;
`;

type SkeletonLoaderProps = {
  type: "card" | "detail";
  isDark: boolean;
};

export default function SkeletonLoader({ type, isDark }: SkeletonLoaderProps) {
  if (type === "card") {
    return (
      <SkeletonContainer isDark={isDark}>
        <SkeletonCard isDark={isDark}>
          <SkeletonAvatar isDark={isDark} />
          <SkeletonContent>
            <SkeletonRow isDark={isDark} width="70%" height={16} />
            <SkeletonRow isDark={isDark} width="50%" height={14} />
          </SkeletonContent>
        </SkeletonCard>
      </SkeletonContainer>
    );
  }

  if (type === "detail") {
    return (
      <SkeletonContainer isDark={isDark}>
        <SkeletonRow isDark={isDark} width="80%" height={24} />
        <SkeletonRow isDark={isDark} width="60%" height={16} />
        <View style={{ height: 16 }} />
        <SkeletonRow isDark={isDark} width="40%" height={18} />
        <SkeletonRow isDark={isDark} width="90%" height={16} />
        <View style={{ height: 16 }} />
        <SkeletonRow isDark={isDark} width="50%" height={18} />
        <SkeletonRow isDark={isDark} width="85%" height={16} />
        <SkeletonRow isDark={isDark} width="75%" height={16} />
        <View style={{ height: 16 }} />
        <SkeletonRow isDark={isDark} width="45%" height={18} />
        <SkeletonRow isDark={isDark} width="70%" height={16} />
        <SkeletonRow isDark={isDark} width="60%" height={14} />
      </SkeletonContainer>
    );
  }

  return null;
}
