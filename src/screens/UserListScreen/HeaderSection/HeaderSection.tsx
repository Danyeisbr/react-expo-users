import type { HeaderSectionProps } from "../../../types/shared-types";
import {
  Header,
  ThemeButton,
  ThemeButtonText,
  Title,
} from "./HeaderSection.styles";

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  isDark,
  themeLabel,
  onToggleTheme,
  onClearCache,
}) => (
  <Header>
    <Title isDark={isDark}>Users</Title>
    <ThemeButton
      onPress={onClearCache}
      accessibilityRole="button"
      isDark={isDark}
      style={{ marginRight: 8 }}
    >
      <ThemeButtonText isDark={isDark}>Clear Cache</ThemeButtonText>
    </ThemeButton>
    <ThemeButton
      onPress={onToggleTheme}
      accessibilityRole="button"
      isDark={isDark}
    >
      <ThemeButtonText isDark={isDark}>Theme: {themeLabel}</ThemeButtonText>
    </ThemeButton>
  </Header>
);
