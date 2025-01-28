import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";

export default function LogOut() {
  const { logoutUser } = useAuthContext();

  useEffect(() => {
    logoutUser();
  }, []);

  return null;
}
