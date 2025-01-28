import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { update } from "../slices/todoSlice";

const EditModal = ({
  openModal,
  closeMoadal,
  editVal,
  setEditVal,
  setInfo,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editVal?.title);

  useEffect(() => {
    setTitle(editVal?.title);
  }, [editVal]);

  const handleEdit = () => {
    try {
      setInfo((prevInfo) => {
        const updatedInfo = prevInfo?.map((item, idx) =>
          item?.id === editVal?.id ? { ...item, title: title } : item
        );
        dispatch(update(updatedInfo));
        return updatedInfo;
      });
    } finally {
      setEditVal(null);
      setTitle("");
      closeMoadal;
    }
  };
  return (
    <Modal visible={openModal} animationType="none" transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.head}>Edit Todo</Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={title}
            onChangeText={(val) => setTitle(val)}
            placeholder="Enter Title"
          />
          <Button mode="contained" style={styles.btn} onPress={handleEdit}>
            Edit
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

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
});
