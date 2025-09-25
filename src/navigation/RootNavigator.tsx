import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDetailScreen from "@screens/UserDetailScreen/UserDetailScreen";
import UserListScreen from "@screens/UserListScreen/UserListScreen";
import { useThemeStore } from "@store/themeStore";
import type { RootStackParamList } from "../types/shared-types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const lightNav: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "white" },
};
const darkNav: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: "#0a0a0a" },
};

export default function RootNavigator() {
  const effective = useThemeStore((s) => s.effective);

  return (
    <NavigationContainer theme={effective === "dark" ? darkNav : lightNav}>
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={UserListScreen}
          options={{ title: "Users" }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
