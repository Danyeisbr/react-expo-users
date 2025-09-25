import { useSkeletonLoader } from "../../hooks/useSkeletonLoader";
import type { SkeletonLoaderProps } from "../../types/shared-types";
import {
  SkeletonAvatar,
  SkeletonCard,
  SkeletonContainer,
  SkeletonContent,
  SkeletonRow,
  SkeletonSpacer,
} from "./SkeletonLoader.styles";

export default function SkeletonLoader({ type, isDark }: SkeletonLoaderProps) {
  const { currentRows, currentSpacers, shouldShowCardLayout } =
    useSkeletonLoader({ type, isDark });

  if (shouldShowCardLayout) {
    return (
      <SkeletonContainer isDark={isDark}>
        <SkeletonCard isDark={isDark}>
          <SkeletonAvatar isDark={isDark} />
          <SkeletonContent>
            {currentRows.map((row, index) => (
              <SkeletonRow
                key={index}
                isDark={isDark}
                width={row.width}
                height={row.height}
              />
            ))}
          </SkeletonContent>
        </SkeletonCard>
      </SkeletonContainer>
    );
  }

  return (
    <SkeletonContainer isDark={isDark}>
      {currentRows.map((row, index) => (
        <SkeletonRow
          key={index}
          isDark={isDark}
          width={row.width}
          height={row.height}
        />
      ))}
      {currentSpacers.map((height, index) => (
        <SkeletonSpacer key={`spacer-${index}`} height={height} />
      ))}
    </SkeletonContainer>
  );
}
