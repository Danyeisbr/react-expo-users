import { useMemo } from "react";
import { useThemeStore } from "../store/themeStore";
import type {
  UseUserCardProps,
  UseUserCardReturn,
} from "../types/shared-types";

export const useUserCard = ({ user }: UseUserCardProps): UseUserCardReturn => {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  const avatarUri = useMemo(
    () => `https://picsum.photos/seed/${user.id}/200`,
    [user.id]
  );

  const shadowStyle = useMemo(
    () => ({
      shadowColor: isDark ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 3,
    }),
    [isDark]
  );

  const avatarAccessibilityLabel = useMemo(
    () => `${user.name} avatar`,
    [user.name]
  );

  return {
    isDark,
    avatarUri,
    shadowStyle,
    avatarAccessibilityLabel,
  };
};
