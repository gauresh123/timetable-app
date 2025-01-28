import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Courses from "../screens/Courses";
import EditCourseScreen from "../screens/EditCourseScreen";
import AddCourseScreen from "../screens/AddCourseScreen";

const CourseStackNavigator = createNativeStackNavigator();

const CourseNavigator = () => {
  return (
    <CourseStackNavigator.Navigator>
      <CourseStackNavigator.Screen
        name="Courses"
        component={Courses}
        options={{ headerShown: true }}
      />

      <CourseStackNavigator.Screen
        name="Edit Course"
        component={EditCourseScreen}
        options={{ headerShown: true }}
      />

      <CourseStackNavigator.Screen
        name="Add Course"
        component={AddCourseScreen}
        options={{ headerShown: true }}
      />
    </CourseStackNavigator.Navigator>
  );
};

export default CourseNavigator;
