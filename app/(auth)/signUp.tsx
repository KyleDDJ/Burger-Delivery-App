import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Button title="Sign In" onPress={() => router.push("/(auth)/signIn")} />
    </View>
  );
};

export default SignUp;
