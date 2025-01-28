import React, { useActionState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./navigators/BottomNav";
import AuthNavigator from "./navigators/AuthNavigator";
import { useAuthContext } from "./contexts/authContext";

const Stack = createNativeStackNavigator();

function Route() {
  const { isLoggedIn } = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn() ? (
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
