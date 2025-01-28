import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import CourseNavigator from "./CourseNavigator";
import TimeTableNavigator from "./TimetableNavigator";
import ChatNavigator from "./ChatNavigator";
import { useAuthContext } from "../contexts/authContext";
import LogOut from "../components/LogOut";

const Tab = createBottomTabNavigator();

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
          tabBarIcon: (props) => <BottomIconContainer name="home" {...props} />,
          ...defaultTabOptions,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Time Table"
        component={TimeTableNavigator}
        options={{
          tabBarIcon: (props) => <BottomIconContainer name="book" {...props} />,
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
          tabBarIcon: (props) => (
            <BottomIconContainer name="wechat" {...props} />
          ),
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
          tabBarIcon: (props) => (
            <BottomIconContainer name="logout" {...props} />
          ),
          ...defaultTabOptions,
          title: "Log Out",
          headerShown: false,
          headerTitleStyle: { marginLeft: "3%" },
        }}
      />
    </Tab.Navigator>
  );
}

const BottomIconContainer = ({ name, focused, color = "black" }) => {
  const theme = useTheme();
  return (
    <AntDesign
      name={name}
      size={25}
      color={focused ? theme.colors.primary : "black"}
    />
  );
};
