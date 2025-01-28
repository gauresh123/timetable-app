import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Menu, Button, TextInput } from "react-native-paper";
import DatePicker from "./DatePicker";
import axios from "axios";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";

export default function EditCourse({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  courseName,
  setCourseName,
  description,
  setDescription,
  teacher,
  setTeacher,
  item,
  navigation,
}) {
  const { setRefresh } = useAuthContext();

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/${item?.courseid}/updatecourse`,
        {
          courseid: item?.courseid,
          coursename: courseName,
          description: description,
          startdate: startDate,
          enddate: endDate,
          teacher: teacher,
        }
      );
      if (res?.data) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      alert(err?.message);
    } finally {
      navigation.navigate("Courses");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Course Name"
        value={courseName}
        onChangeText={(val) => setCourseName(val)}
        mode="outlined"
      />
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Description..."
        value={description}
        onChangeText={(val) => setDescription(val)}
        mode="outlined"
      />
      <TextInput
        placeholder="Teacher Name"
        value={teacher}
        onChangeText={(val) => setTeacher(val)}
        mode="outlined"
      />
      <DatePicker date={startDate} setDate={setStartDate} showFlag={true} />
      <DatePicker date={endDate} setDate={setEndDate} showFlag={true} />
      <Button mode="contained" onPress={handleUpdate}>
        Edit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});
