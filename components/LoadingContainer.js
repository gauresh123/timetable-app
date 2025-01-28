import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function LoadingContainer({ children, loading }) {
  return loading ? (
    <ActivityIndicator
      animating={true}
      size="large"
      color="#6200ee"
      style={{ marginTop: 50 }}
    />
  ) : (
    children
  );
}
