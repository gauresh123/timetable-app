import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";

const ChatStackNavigator = createNativeStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: true }}
      />
    </ChatStackNavigator.Navigator>
  );
};

export default ChatNavigator;
