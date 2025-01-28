import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";

export default function TodoItem({
  item,
  height,
  handleCheck,
  handleDelete,
  setEditVal,
  index,
  width,
}) {
  const handleEdit = (item) => {
    setEditVal(item);
  };
  return (
    <View style={styles.item}>
      <View style={styles.textParentContainer}>
        <Pressable onPress={() => handleCheck(index)}>
          <View style={styles.textContainer}>
            <Checkbox
              value={item?.completed}
              onValueChange={() => handleCheck(index)}
              color={item?.completed ? "#674fa3" : null}
              style={{ alignSelf: "center" }}
            />
            <Text style={[styles.text, item?.completed && styles.completed]}>
              {item?.title}
            </Text>
          </View>
        </Pressable>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Image
              source={require("../assets/delete.png")}
              width={(width * 1) / 100}
              height={(height * 1) / 100}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Image
              source={require("../assets/edit.png")}
              width={(width * 1) / 100}
              height={(height * 1) / 100}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    marginLeft: 10,
    alignSelf: "center",
    width: "70%",
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
    width: "70%",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  icons: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    justifyContent: "center",
    borderWidth: 1,
  },
});
