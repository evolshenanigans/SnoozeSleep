import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../utils/colors";
import { text } from "../utils/text";
import { Link, Stack, useRouter } from "expo-router";
import { useUserContext } from "../services/Context";
import useUserData from "../hooks/useUserData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwHidden, setIsPwHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const handleLogin = async () => {
    if (email + password !== "") {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
        router.replace("/Home");
        // nav to home
      } catch (err) {
        console.log(err);
        if (err.message === "Firebase: Error (auth/invalid-login-credentials).") {
          alert('Invalid Login Credentials. Click "Create Account" if you are new!');
        } else {
          alert("Sign In failed!" + err);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require("../../assets/images/logo.png")} style={styles.icon} />
      <Text style={text.heroText}>Welcome to SnoozeSense</Text>
      <Text style={[text.subtitle, styles.subtitle]}>
        Helping you reach your sleep goals
      </Text>
      <Text style={styles.inputLabel}>{"\n"}Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@snooze.com"
        placeholderTextColor={colors.themeGray2}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.inputLabel}>{"\n"}Password</Text>
      <View style={[styles.input, styles.pwInput]}>
        <TextInput
          style={{ width: "90%" }}
          placeholder="Enter Password"
          placeholderTextColor={colors.themeGray2}
          autoCapitalize="none"
          value={password}
          secureTextEntry={isPwHidden}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable onPress={() => setIsPwHidden((prev) => !prev)}>
          {isPwHidden ? (
            <Image
              source={require("../../assets/images/passwordshow.png")}
              style={styles.pwIcon}
            />
          ) : (
            <Image
              source={require("../../assets/images/passwordhide.png")}
              style={styles.pwIcon}
            />
          )}
        </Pressable>
      </View>
      <Text style={styles.forgotPw}>Forgot Password?{"\n"}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleLogin()}>
            <View style={[styles.button, styles.loginButton]}>
              <Text style={{ color: colors.themeBlack }}>Sign In</Text>
            </View>
          </Pressable>
          {/* <Link href="/(onboarding)/OB1SignUp" style={styles.signUpContainer}> */}
          <Pressable
            onPress={() => router.replace("/(onboarding)/OB1SignUp")}
            style={styles.signUpContainer}
          >
            <View style={styles.signUpContainer}>
              <Text style={styles.text}>
                {"\n\n"}Don't have an account?{" "}
                <Text style={styles.signUpButton}>Sign Up</Text>
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: colors.themeBackground,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flex: 0.5,
    justifyContent: "flex-start",
    height: 50,
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 30,
    width: "100%",
  },
  forgotPw: {
    alignSelf: "flex-end",
    color: colors.themeWhite,
    textDecorationLine: "underline",
    fontSize: 12,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  input: {
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "transparent",
    color: colors.themeWhite,
    backgroundColor: colors.themeAccent4,
  },
  inputLabel: {
    alignSelf: "flex-start",
    color: colors.themeWhite,
  },
  loginButton: {
    backgroundColor: colors.themePrimary,
  },
  pwIcon: {
    height: 20,
    width: 20,
    tintColor: colors.themeWhite,
  },
  pwInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpButton: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  signUpContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    width: "100%",
  },
  subtitle: {
    paddingBottom: 50,
  },
  text: {
    alignSelf: "center",
    color: colors.themeWhite,
  },
});

export default Login;
