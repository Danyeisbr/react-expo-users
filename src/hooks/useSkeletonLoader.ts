import { useMemo } from "react";
import type {
  SkeletonRowConfig,
  UseSkeletonLoaderProps,
  UseSkeletonLoaderReturn,
} from "../types/shared-types";

export const useSkeletonLoader = ({
  type,
  isDark,
}: UseSkeletonLoaderProps): UseSkeletonLoaderReturn => {
  const cardRows = useMemo<SkeletonRowConfig[]>(
    () => [
      { width: "70%", height: 16 },
      { width: "50%", height: 14 },
    ],
    []
  );

  const detailRows = useMemo<SkeletonRowConfig[]>(
    () => [
      { width: "80%", height: 24 },
      { width: "60%", height: 16 },
      { width: "40%", height: 18 },
      { width: "90%", height: 16 },
      { width: "50%", height: 18 },
      { width: "85%", height: 16 },
      { width: "75%", height: 16 },
      { width: "45%", height: 18 },
      { width: "70%", height: 16 },
      { width: "60%", height: 14 },
    ],
    []
  );

  const detailSpacers = useMemo<number[]>(() => [16, 16, 16], []);

  const currentRows = useMemo(
    () => (type === "card" ? cardRows : detailRows),
    [type, cardRows, detailRows]
  );

  const currentSpacers = useMemo(
    () => (type === "detail" ? detailSpacers : []),
    [type, detailSpacers]
  );

  const shouldShowCardLayout = useMemo(() => type === "card", [type]);

  return {
    isDark,
    currentRows,
    currentSpacers,
    shouldShowCardLayout,
  };
};
