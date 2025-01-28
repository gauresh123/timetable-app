import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";

const AuthStackNavigator = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
