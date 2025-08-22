import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Slot /> : <Redirect href="/signIn" />;
}
