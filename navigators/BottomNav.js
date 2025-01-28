import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import CourseNavigator from "./CourseNavigator";
import TimeTableNavigator from "./TimetableNavigator";
import ChatNavigator from "./ChatNavigator";
import { useAuthContext } from "../contexts/authContext";
import LogOut from "../components/LogOut";
import { Dimensions, Image } from "react-native";

const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get("window");

export default function BottomNav({ navigation }) {
  const { logoutUser } = useAuthContext();
  const theme = useTheme();

  const defaultTabOptions = {
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: "#4c28fe",
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={"Courses"}
        component={CourseNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("../assets/home.png")}
              width={(width * 1) / 100}
              height={(height * 1) / 100}
            />
          ),
          ...defaultTabOptions,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Time Table"
        component={TimeTableNavigator}
        options={{
          tabBarIcon: () => <Image source={require("../assets/table.png")} />,
          ...defaultTabOptions,
          title: "Time Table",
          headerShown: false,
          headerTitleStyle: { marginLeft: "3%" },
        }}
      />
      <Tab.Screen
        name="AI Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: () => <Image source={require("../assets/chat.png")} />,
          ...defaultTabOptions,
          title: "AI Chat",
          headerShown: false,
          headerTitleStyle: { marginLeft: "3%" },
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogOut}
        options={{
          tabBarIcon: () => <Image source={require("../assets/logout.png")} />,
          ...defaultTabOptions,
          title: "Log Out",
          headerShown: false,
          headerTitleStyle: { marginLeft: "3%" },
        }}
      />
    </Tab.Navigator>
  );
}
