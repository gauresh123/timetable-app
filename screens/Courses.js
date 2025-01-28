import axios from "axios";
import React, { useActionState, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";
import LoadingContainer from "../components/LoadingContainer";

const { height } = Dimensions.get("window");

export default function Courses({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, refresh } = useAuthContext();

  const getCouses = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/courses`);
      console.log(res.data.data, "datas");

      setCourses(res?.data?.data);
    } catch (err) {
      alert(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCouses();
  }, [refresh]);

  const renderCourse = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.courseName}>{item.coursename}</Text>
        {user?.role == "Teacher" && (
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() =>
              navigation.navigate("Edit Course", {
                item: item,
              })
            }
          >
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[styles.courseDescription, { fontWeight: "600", width: "80%" }]}
      >
        {item.des}
      </Text>
      <Text style={styles.teacherName}>Instructor: {item.instructor}</Text>
      <Text
        style={[
          styles.courseDescription,
          { paddingBottom: 10, fontWeight: "700" },
        ]}
      >
        {item.start_date} To {item.end_date}
      </Text>
    </View>
  );

  return (
    <LoadingContainer loading={loading}>
      <View style={styles.container}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item?.courseid}
          renderItem={renderCourse}
          contentContainerStyle={styles.list}
        />

        {user?.role == "Teacher" && (
          <TouchableOpacity
            style={styles.floatingButtonContainer}
            onPress={() => navigation.navigate("Add Course")}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </LoadingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
    gap: 5,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 5,
    width: "75%",
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4c28fe",
    borderRadius: 5,
    width: "15%",
    height: (height * 4) / 100,
  },
  floatingButtonContainer: {
    backgroundColor: "#4c28fe",
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: "absolute",
    bottom: 10,
    right: 16,
    borderRadius: 5,
  },
  plus: {
    color: "white",
    fontSize: 20,
  },
});
