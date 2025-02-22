import React, { useState } from "react";
import { View, Platform, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

function DatePicker({ date, setDate, text, showFlag = false }) {
  const [datePicker, setDatePicker] = useState(false);
  const [flag, setFlag] = useState(showFlag);

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDatePicker(false);
    setDate(value);
    setFlag(true);
  }

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 3,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "black",
          height: 50,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={showDatePicker}>
          <Text variant="bodyLarge" style={{ color: "black" }}>
            {flag ? `${day}-${month}-${year}` : text}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker}>
          <Image source={require("../assets/date.png")} />
        </TouchableOpacity>
      </View>

      {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
        />
      )}
    </View>
  );
}

export default DatePicker;
