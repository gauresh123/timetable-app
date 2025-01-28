import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleTodo } from "../slices/todoSlice";

export default function AddTodoScreen({ navigation }) {
  const dispatch = useDispatch();
  const [title, setTitel] = useState("");
  const data = useSelector((state) => state.todo.val);

  const todo = {
    title: title,
    id: data.length + 1,
    userId: 10,
    completed: false,
  };

  const handleAddTodo = async () => {
    if (!title) {
      Alert.alert("Please add title!");
      return;
    }
    try {
      dispatch(addSingleTodo(todo));
      Keyboard.dismiss();
    } finally {
      navigation.navigate("Home");
    }
  };

  console.log(title);
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-end" }}></View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="flat"
          placeholder="Enter Title"
          value={title}
          onChangeText={(val) => setTitel(val)}
        />
        <Button mode="contained" style={styles.btn} onPress={handleAddTodo}>
          Add To Do
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    borderRadius: 10,
  },
  btn: {
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
  },
});
