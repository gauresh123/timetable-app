import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import EditCourse from "../components/EditCourse";

export default function EditCourseScreen({ navigation, route }) {
  const { item } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    setStartDate(new Date(item?.start_date));
    setEndDate(new Date(item?.end_date));
    setDescription(item?.des);
    setTeacher(item?.instructor);
    setCourseName(item?.coursename);
  }, []);

  return (
    <View style={styles.container}>
      <EditCourse
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
        item={item}
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
