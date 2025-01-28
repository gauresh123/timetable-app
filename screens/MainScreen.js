import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, update } from "../slices/todoSlice";
import TodoItem from "../components/TodoItem";
import IdModal from "../components/IdModal";
import EditModal from "../components/EditModal";
const { height, width } = Dimensions.get("screen");

export default function MainScreen({ navigation }) {
  const data = useSelector((state) => state.todo.val);
  const [currentFilterVal, setCurrentFilterVal] = useState("All");

  const dispatch = useDispatch();
  const [info, setInfo] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editVal, setEditVal] = useState(null);

  const fetchTodos = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
      if (res?.data?.length > 0) {
        const uniqueData = res?.data?.filter(
          (newItem) =>
            !data.some((existingItem) => existingItem.id === newItem.id)
        );

        dispatch(add(uniqueData));
      }
    } catch (error) {
      Alert.alert("Error fetching todo");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (data) {
      setInfo(data);
      setCurrentFilterVal("All");
    }
  }, [data]);

  const handleCheck = (index) => {
    setInfo((prevInfo) => {
      const updatedInfo = prevInfo?.map((item, idx) =>
        idx === index ? { ...item, completed: !item?.completed } : item
      );

      dispatch(update(updatedInfo));
      return updatedInfo;
    });
  };

  const handleDelete = (item) => {
    try {
      dispatch(remove(item?.id));
    } finally {
      Alert.alert(`${item.title} is deleted!`);
    }
  };
  const renderTodo = useCallback(({ item, index }) => {
    return (
      <TodoItem
        item={item}
        height={height}
        index={index}
        handleDelete={(val) => handleDelete(val)}
        handleCheck={(val) => handleCheck(val)}
        setEditVal={(val) => setEditVal(val)}
        width={width}
      />
    );
  }, []);

  return (
    <>
      {!isLoading ? (
        <View style={[styles.container, { flex: info?.length > 5 ? 1 : null }]}>
          <Filters
            info={info}
            data={data}
            setInfo={(val) => setInfo(val)}
            openModal={() => setOpenModal(true)}
            currentFilterVal={currentFilterVal}
            setCurrentFilterVal={(val) => setCurrentFilterVal(val)}
          />
          <FlatList
            style={styles.list}
            data={info}
            keyboardShouldPersistTaps={"handled"}
            renderItem={renderTodo}
            keyExtractor={(item, index) => `${item?.id}-${index}`}
          />
          {info && (
            <TouchableOpacity
              style={styles.floatButton}
              onPress={() => navigation.navigate("Add Todo")}
            >
              <Image
                source={require("../assets/plus.png")}
                width={(width * 1) / 100}
                height={(height * 1) / 100}
              />
            </TouchableOpacity>
          )}
          {info && (
            <View style={styles.totaltodo}>
              <Text style={styles.totaltext}>Total: {info?.length}</Text>
            </View>
          )}
          {info && (
            <View style={[styles.totaltodo, { bottom: (height * 18) / 100 }]}>
              <Text style={styles.totaltext}>
                Completed:{" "}
                {info?.filter((val) => val?.completed == true)?.length}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator
          size={"large"}
          color={"blue"}
          style={styles.loader}
        />
      )}

      {/*modal for id filter*/}
      <IdModal
        open={openModal}
        setInfo={(val) => setInfo(val)}
        closeModal={() => setOpenModal(false)}
      />
      {/*modal for edit todo*/}
      <EditModal
        openModal={editVal && true}
        closeMoadal={!editVal && false}
        editVal={editVal}
        setEditVal={(val) => setEditVal(val)}
        setInfo={(val) => setInfo(val)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#f8f8f8",
  },

  text: {
    fontWeight: "500",
    marginLeft: 10,
    alignSelf: "center",
    width: "72%",
  },
  item: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  list: {
    //flex: 1,
    width: "100%",
  },
  floatButton: {
    position: "absolute",
    bottom: (height * 2) / 100,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#674fa3",
    borderRadius: 8,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  textParentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
    width: "72%",
  },
  totaltodo: {
    position: "absolute",
    right: 10,
    bottom: (height * 10) / 100,
    justifyContent: "center",
    backgroundColor: "#674fa3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  totaltext: {
    color: "white",
    fontWeight: "500",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
