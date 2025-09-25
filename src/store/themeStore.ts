import { Appearance, ColorSchemeName } from "react-native";
import { create } from "zustand";
import type {
  ThemeEffective,
  ThemeMode,
  ThemeState,
} from "../types/shared-types";

const getEffective = (
  mode: ThemeMode,
  system: ColorSchemeName
): ThemeEffective => {
  if (mode === "system") return system === "dark" ? "dark" : "light";
  return mode;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "system",
  system: Appearance.getColorScheme() || null,
  effective: getEffective("system", Appearance.getColorScheme()),
  setMode: (mode) => {
    set({ mode, effective: getEffective(mode, get().system) });
  },
  _updateEffective: () => {
    const { mode } = get();
    const system = Appearance.getColorScheme() || null;
    const effective = getEffective(mode, system);
    set({ system, effective });
  },
}));

Appearance.addChangeListener(() => {
  useThemeStore.getState()._updateEffective();
});
