import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <Button title="Sign Up" onPress={() => router.push("/(auth)/signUp")} />
    </View>
  );
};

export default SignUp;
