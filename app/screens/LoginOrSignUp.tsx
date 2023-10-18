import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import React from "react";

const LoginOrSignUp = ({ navigation }) => {
  /*
    LOGIN SCREEN: allows the user to enter their username and password and login.
  */

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <View style={[styles.button, styles.loginButton]}>
            <Text style={{ color: "black" }}>Login</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <View style={[styles.button, styles.signUpButton]}>
            <Text style={{ color: "white" }}>Create Account</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 30,
    borderWidth: 2,
  },
  loginButton: {
    backgroundColor: "white",
  },
  signUpButton: {
    backgroundColor: "black",
  },
});

export default LoginOrSignUp;
