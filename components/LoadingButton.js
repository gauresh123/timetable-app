import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function LoadingButton({ children, loading, ...props }) {
  return (
    <Button {...props}>
      {loading ? (
        <Text style={{ color: "white" }}>{"loading.."}</Text>
      ) : (
        children
      )}
    </Button>
  );
}
