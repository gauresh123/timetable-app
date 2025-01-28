import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Menu, Button, TextInput } from "react-native-paper";
import DatePicker from "./DatePicker";
import axios from "axios";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";
import LoadingButton from "./LoadingButton";

export default function AddCourse({
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
  navigation,
}) {
  const { setRefresh } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/addcourse`, {
        coursename: courseName,
        description: description,
        startdate: startDate,
        enddate: endDate,
        teacher: teacher,
      });
      if (res?.data) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.log(err, "error");
    } finally {
      setLoading(false);
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
      <View>
        <Text style={styles.date}>Start Date</Text>
        <DatePicker date={startDate} setDate={setStartDate} showFlag={true} />
      </View>
      <View>
        <Text style={styles.date}>End Date</Text>
        <DatePicker date={endDate} setDate={setEndDate} showFlag={true} />
      </View>
      <LoadingButton loading={loading} mode="contained" onPress={handleAdd}>
        Add
      </LoadingButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  date: {
    fontWeight: "600",
  },
});
