import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TimeTable from "../screens/TimeTable";
import ViewTimeTable from "../screens/ViewTimeTable";
import CreateTimeTable from "../screens/CreateTimeTable";

const TimeTableStackNavigator = createNativeStackNavigator();

const TimeTableNavigator = () => {
  return (
    <TimeTableStackNavigator.Navigator>
      <TimeTableStackNavigator.Screen
        name="Time Table"
        component={TimeTable}
        options={{ headerShown: true }}
      />

      <TimeTableStackNavigator.Screen
        name="Preview"
        component={ViewTimeTable}
        options={{ headerShown: true }}
      />
      <TimeTableStackNavigator.Screen
        name="Create"
        component={CreateTimeTable}
        options={{ headerShown: true }}
      />
    </TimeTableStackNavigator.Navigator>
  );
};

export default TimeTableNavigator;
