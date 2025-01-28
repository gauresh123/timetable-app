import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Route from "./Route";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import AuthContextProvider from "./contexts/authContext";
import * as Notifications from "expo-notifications";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import LoadingContainer from "./components/LoadingContainer";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notification, setNotification] = useState();
  const notificationListener = useRef();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (fontsLoaded) return;

    async function loadFonts() {
      setFontsLoaded(true);
      await Font.loadAsync({
        ...Ionicons.font,
      })
        .catch((val) => console.log(val))
        .finally(() => {
          setFontsLoaded(false);
        });
    }

    loadFonts();
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthContextProvider>
        <LoadingContainer loading={fontsLoaded}>
          <Route />
        </LoadingContainer>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
