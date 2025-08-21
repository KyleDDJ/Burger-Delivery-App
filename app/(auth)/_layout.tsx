import { Slot } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function _layout() {
  return (
    <SafeAreaView>
      <Text>AuthLayout</Text>
      <Slot />
    </SafeAreaView>
  );
}
