import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import EditTimeTable from "../components/EditTimeTable";
import { Button } from "react-native-paper";
import axios from "axios";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";
import LoadingButton from "../components/LoadingButton";

const ViewTimeTable = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [currentVal, setCurrentVal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { item } = route.params;

  const [data, setData] = useState([]);
  const { setRefresh, user } = useAuthContext();

  const handleEdit = (val) => {
    const { name, ...rest } = val;

    setCurrentVal((prev) => ({
      name: prev?.name || item?.p_name,
      ...rest,
    }));

    setOpen(true);
  };

  const handleEditTable = async () => {
    let obj = {
      name: currentVal?.name || item?.p_name,
      timetable: data,
      date: currentVal?.date || item?.tabledate,
    };

    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/${item?.p_id}/updatetable`,
        obj
      );
      if (res?.data) {
        setRefresh((prev) => !prev);
        await navigation.navigate("Time Table");
      }
    } catch (err) {
      alert(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(item?.time_table);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { textAlign: "left", paddingLeft: 5 }]}>
        {item.subject}
      </Text>
      <Text style={styles.cell}>{item.starttime}</Text>
      <Text style={styles.cell}>{item.endtime}</Text>
      {user?.role == "Teacher" && (
        <TouchableOpacity style={styles.cell} onPress={() => handleEdit(item)}>
          <Image
            source={require("../assets/edit.png")}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tableHead}>
          <Text style={styles.tableheading}>
            {currentVal?.name || item?.p_name}
          </Text>
          <LoadingButton
            mode="contained"
            onPress={handleEditTable}
            disabled={user?.role == "Student" && true}
            loading={loading}
          >
            Save
          </LoadingButton>
        </View>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerText]}>Subject</Text>
          <Text style={[styles.cell, styles.headerText]}>Start</Text>
          <Text style={[styles.cell, styles.headerText]}>End</Text>
          {user?.role == "Teacher" && (
            <Text style={[styles.cell, styles.headerText]}>Edit</Text>
          )}
        </View>

        {/* Table Body */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.tableBody}
        />
      </View>
      <EditTimeTable
        openModal={open}
        closeMoadal={() => setOpen(false)}
        mode="View"
        data={data}
        currentVal={currentVal}
        setCurrentVal={(val) => setCurrentVal(val)}
        setData={(val) => setData(val)}
        item={item}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007bff",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  tableHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  tableheading: {
    fontWeight: "600",
    fontSize: 16,
    width: "70%",
  },
});

export default ViewTimeTable;
