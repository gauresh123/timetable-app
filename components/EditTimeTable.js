import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import DatePicker from "./DatePicker";
import { format, parseISO } from "date-fns";

const EditTimeTable = ({
  openModal,
  closeMoadal,
  data,
  currentVal,
  setData,
}) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [date, setDate] = useState(new Date(data?.tabledate));

  const handleEdit = () => {
    let newObj = {
      starttime: startTime,
      endtime: endTime,
      subject: subject,
      id: currentVal?.id,
      name: title,
      date: format(new Date(date), "dd MMM yyyy"),
    };

    for (let [key, value] of Object.entries(newObj)) {
      if (key !== "id" && !newObj[key]) {
        alert(`${key} is required`);
        return;
      }
    }

    setData((prev) =>
      prev?.map((val) => (val.id === currentVal?.id ? { ...newObj } : val))
    );

    closeMoadal();
  };

  useEffect(() => {
    setTitle(data?.p_name);
    setSubject(currentVal?.subject);
    setStartTime(currentVal?.starttime);
    setEndTime(currentVal?.endtime);
    setDate(new Date(data?.tabledate));
  }, [currentVal]);

  console.log(currentVal, "currentval");

  return (
    <Modal
      visible={openModal}
      onDismiss={closeMoadal}
      animationType="none"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.head}>Edit</Text>
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
          <View style={styles.btnContainer}>
            <Button mode="contained" style={styles.btn} onPress={handleEdit}>
              Edit
            </Button>

            <Button mode="contained" style={styles.btn} onPress={closeMoadal}>
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  btn: {
    width: "30%",
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
    height: 50,
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 10,
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-end",
  },
});
