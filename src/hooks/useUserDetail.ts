import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import type {
  UseUserDetailProps,
  UseUserDetailReturn,
} from "../types/shared-types";

export const useUserDetail = ({
  userId,
}: UseUserDetailProps): UseUserDetailReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserStore((s) => s.users.find((u) => u.id === userId));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    isLoading,
  };
};
