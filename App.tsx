import { useThemeStore } from "@store/themeStore";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  const effective = useThemeStore((s) => s.effective);
  return (
    <>
      <RootNavigator />
      <StatusBar style={effective === "dark" ? "light" : "dark"} />
    </>
  );
}
