import { Dimensions, FlatList, Modal, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import axios from "axios";
import { BACKEND_URL } from "../constants/baseURL";
import { useAuthContext } from "../contexts/authContext";

const { width, height } = Dimensions.get("window");

const CreateTimeTable = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [date, setDate] = useState(new Date());
  const { setRefresh } = useAuthContext();

  const handleAddToTable = () => {
    let obj = {
      subject: subject,
      date: date,
      starttime: startTime,
      endtime: endTime,
      id: data?.length,
      name: title,
    };
    for (let [key, value] of Object.entries(obj)) {
      if (key !== "id" && !obj[key]) {
        alert(`${key} is required`);
        return;
      }
    }
    console.log(obj, "data");

    setData((prev) => [...prev, obj]);
    setSubject("");
    setStartTime("");
    setEndTime("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.subject}</Text>
      <Text style={styles.cell}>{item.starttime}</Text>
      <Text style={styles.cell}>{item.endtime}</Text>
    </View>
  );
  const handleCreateTable = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/addtable`, {
        name: title,
        timetable: data,
        date: date,
      });
      if (res?.data) {
        setRefresh((prev) => !prev);
        await navigation.navigate("Time Table");
      }
    } catch (err) {
      alert(err?.message);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={title}
            onChangeText={(val) => setTitle(val)}
            placeholder="Enter Name"
          />

          <TextInput
            mode="outlined"
            style={styles.input}
            value={subject}
            onChangeText={(val) => setSubject(val)}
            placeholder="Enter Subject"
          />

          <DatePicker date={date} setDate={setDate} showFlag={true} />

          <View style={styles.inputContainer}>
            <View style={styles.timeContainer}>
              <Text variant="bodySmall" style={styles.time}>
                Start Time
              </Text>
              <TextInput
                mode="outlined"
                style={[styles.input, { width: "100%" }]}
                value={startTime}
                onChangeText={(val) => setStartTime(val)}
                placeholder="Start Time"
              />
            </View>
            <View style={styles.timeContainer}>
              <Text variant="bodySmall" style={styles.time}>
                End Time
              </Text>
              <TextInput
                mode="outlined"
                style={[styles.input, { width: "100%" }]}
                value={endTime}
                onChangeText={(val) => setEndTime(val)}
                placeholder="End Time"
              />
            </View>
          </View>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={handleAddToTable}
          >
            Add to Table
          </Button>
        </View>
        {data?.length > 0 && (
          <View style={styles.headingContainer}>
            <Text style={styles.tableheading} variant="bodyMedium">
              {title}
            </Text>
            <Button
              style={styles.createBtn}
              mode="text"
              onPress={handleCreateTable}
            >
              Create table
            </Button>
          </View>
        )}
        {data?.length > 0 && (
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Subject</Text>
            <Text style={[styles.cell, styles.headerText]}>Start Time</Text>
            <Text style={[styles.cell, styles.headerText]}>End Time</Text>
          </View>
        )}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.tableBody}
        />
      </View>
    </>
  );
};

export default CreateTimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  content: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginBottom: 10,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  btn: {
    width: "100%",
    marginTop: 4,
  },
  text: {
    alignSelf: "center",
  },
  head: {
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  header: {
    backgroundColor: "#007bff",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
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
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  time: {
    fontWeight: "bold",
  },
  tableheading: {
    fontWeight: "bold",
  },
});
