import { Appearance, ColorSchemeName } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { create } from "zustand";

type ThemeMode = "system" | "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  system: ColorSchemeName;
  effective: "light" | "dark";
  setMode: (m: ThemeMode) => void;
  _updateEffective: () => void;
};

const getEffective = (
  mode: ThemeMode,
  system: ColorSchemeName
): "light" | "dark" => {
  if (mode === "system") return system === "dark" ? "dark" : "light";
  return mode;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "system",
  system: Appearance.getColorScheme(),
  effective: getEffective("system", Appearance.getColorScheme()),
  setMode: (mode) => {
    set({ mode, effective: getEffective(mode, get().system) });
    NativeWindStyleSheet.setColorScheme(get().effective);
  },
  _updateEffective: () => {
    const { mode } = get();
    const system = Appearance.getColorScheme();
    const effective = getEffective(mode, system);
    set({ system, effective });
    NativeWindStyleSheet.setColorScheme(effective);
  },
}));

Appearance.addChangeListener(() => {
  useThemeStore.getState()._updateEffective();
});
