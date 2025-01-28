import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Filters({
  setInfo,
  openModal,
  currentFilterVal,
  setCurrentFilterVal,
}) {
  const data = useSelector((state) => state.todo.val);

  const handlePressed = (val) => {
    if (val == "All") {
      setInfo(data);
      setCurrentFilterVal(val);
      return;
    }
    if (val == "Active") {
      let value = data?.filter((ele) => ele?.completed == false);
      setInfo(value);
      setCurrentFilterVal(val);
      return;
    }
    if (val == "Done") {
      let value = data?.filter((ele) => ele?.completed == true);
      setInfo(value);
      setCurrentFilterVal(val);
      return;
    }
  };

  const handleId = () => {
    openModal();
    setCurrentFilterVal("All");
    setInfo(data);
  };

  return (
    <ScrollView
      horizontal
      style={styles.parent}
      keyboardShouldPersistTaps="always"
    >
      <TouchableOpacity
        style={[
          styles.items,
          { backgroundColor: currentFilterVal == "All" ? "#674fa3" : "white" },
        ]}
        onPress={() => handlePressed("All")}
      >
        <Text
          style={[
            styles.filtertext,
            { color: currentFilterVal == "All" ? "white" : "black" },
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.items,
          {
            backgroundColor: currentFilterVal == "Active" ? "#674fa3" : "white",
          },
        ]}
        onPress={() => handlePressed("Active")}
      >
        <Text
          style={[
            styles.filtertext,
            { color: currentFilterVal == "Active" ? "white" : "black" },
          ]}
        >
          Active
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.items,
          { backgroundColor: currentFilterVal == "Done" ? "#674fa3" : "white" },
        ]}
        onPress={() => handlePressed("Done")}
      >
        <Text
          style={[
            styles.filtertext,
            { color: currentFilterVal == "Done" ? "white" : "black" },
          ]}
        >
          Done
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.items} onPress={handleId}>
        <Text style={styles.filtertext}>Id</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    marginLeft: 10,
  },

  items: {
    // marginRight: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 8,
    marginRight: 10,
  },

  filtertext: {
    fontWeight: "500",
  },
});
