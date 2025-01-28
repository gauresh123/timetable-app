import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthContext } from "../contexts/authContext";

const SignIn = ({ navigation }) => {
  const [id, setId] = useState("");
  const { loginUser, user, isLoggedIn } = useAuthContext();
  console.log(user, "user");
  console.log(isLoggedIn());

  const handleLogin = () => {
    if (!id) {
      alert("Please Enter a ID");
      return;
    }

    if (id == "Teacher123") {
      let user = {
        id: "Teacher123",
        role: "Teacher",
        name: "Test Teacher",
      };
      loginUser(user);
      return;
    }

    if (id == "Student123") {
      let user = {
        id: "Student123",
        role: "Student",
        name: "Test Student",
      };
      loginUser(user);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputParent}>
          <Text style={styles.inputlabel}>Enter ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your ID here..."
            value={id}
            onChangeText={(val) => setId(val)}
          />
        </View>

        <LinearGradient
          colors={["#f97794", "#623AA2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Button
            mode="contained"
            textColor="white"
            onPress={handleLogin}
            style={styles.button}
          >
            Sign In
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
  },

  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  input: {
    backgroundColor: "white",
  },
  inputParent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  inputlabel: {
    fontWeight: "600",
  },
  gradient: {
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "transparent", // Keep the background transparent to see the gradient
  },
});
