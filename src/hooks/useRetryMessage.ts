import { useMemo } from "react";
import { useThemeStore } from "../store/themeStore";
import type {
  UseRetryMessageProps,
  UseRetryMessageReturn,
} from "../types/shared-types";

export const useRetryMessage = ({
  errorCode,
  retryCount = 0,
}: UseRetryMessageProps): UseRetryMessageReturn => {
  const effective = useThemeStore((s) => s.effective);
  const isDark = effective === "dark";

  const getSubMessage = useMemo(() => {
    switch (errorCode) {
      case "TIMEOUT":
        return "La conexión tardó más de 10 segundos. Verifica tu conexión a internet.";
      case "NO_INTERNET":
        return "No hay conexión a internet. Verifica tu red WiFi o datos móviles.";
      case "SERVER_ERROR":
        return "El servidor está experimentando problemas. Intenta en unos minutos.";
      case "CLIENT_ERROR":
        return "Error en la solicitud. Verifica tu conexión.";
      default:
        return "Verifica tu conexión a internet e intenta nuevamente.";
    }
  }, [errorCode]);

  const isMaxRetries = useMemo(() => retryCount >= 3, [retryCount]);

  const buttonText = useMemo(
    () => (isMaxRetries ? "Máximo de reintentos alcanzado" : "Reintentar"),
    [isMaxRetries]
  );

  const showRetryCount = useMemo(() => retryCount > 0, [retryCount]);

  const retryCountText = useMemo(
    () => `Reintentos: ${retryCount}/3`,
    [retryCount]
  );

  return {
    isDark,
    subMessage: getSubMessage,
    isMaxRetries,
    buttonText,
    showRetryCount,
    retryCountText,
  };
};
