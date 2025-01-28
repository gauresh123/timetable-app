import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import axios from "axios";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";
import LoadingContainer from "../components/LoadingContainer";

const { width, height } = Dimensions.get("window");

export default function TimeTable({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, refresh } = useAuthContext();

  const getData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/timetables`);
      console.log(res.data.data, "data");
      setData(res?.data?.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios?.post(`${BACKEND_URL}/deletetable`, {
        id: id,
      });
    } catch (err) {
      console.log(err);

      alert(err?.message);
    } finally {
      getData();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Preview", {
          item: item,
        })
      }
    >
      <View style={styles.nameContainer}>
        <Text style={styles.courseName}>{item.p_name}</Text>
        <View style={styles.btnContainer}>
          {user?.role == "Teacher" && (
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => handleDelete(item?.p_id)}
            >
              <Image
                source={require("../assets/delete.png")}
                width={(width * 1) / 100}
                height={(height * 1) / 100}
              />
            </TouchableOpacity>
          )}
          {user?.role == "Teacher" && (
            <TouchableOpacity
              style={styles.editContainer}
              onPress={() => navigation.navigate("Preview", { item: item })}
            >
              <Image
                source={require("../assets/edit.png")}
                width={(width * 1) / 100}
                height={(height * 1) / 100}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.teacherName}>Date: {item.tabledate}</Text>
    </TouchableOpacity>
  );

  return (
    <LoadingContainer loading={loading}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item?.p_id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity
          style={styles.floatingButtonContainer}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
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
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
