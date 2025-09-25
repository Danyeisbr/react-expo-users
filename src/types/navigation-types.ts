import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Users: undefined;
  UserDetail: { id: number };
};

export type UserListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Users"
>;
export type UserDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "UserDetail"
>;
