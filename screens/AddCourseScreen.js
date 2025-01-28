import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AddCourse from "../components/AddCourse";

export default function AddCourseScreen({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  return (
    <View style={styles.container}>
      <AddCourse
        startDate={startDate}
        setStartDate={(val) => setStartDate(val)}
        endDate={endDate}
        setEndDate={(val) => setEndDate(val)}
        courseName={courseName}
        setCourseName={(val) => setCourseName(val)}
        description={description}
        setDescription={(val) => setDescription(val)}
        teacher={teacher}
        setTeacher={(val) => setTeacher(val)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
