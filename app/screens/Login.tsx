import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../utils/colors";
import { text } from "../utils/text";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const handleLogin = async () => {
    if (email + password !== "") {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
        router.replace("/(tabs)/_layout");
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
      <Image source={require("../../assets/images/logo.png")} style={styles.icon} />
      <Text style={text.heroText}>Welcome to SnoozeSense</Text>
      <Text style={[text.subtitle, styles.subtitle]}>
        Helping you reach your sleep goals
      </Text>
      <Text style={styles.inputLabel}>{"\n"}Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@snooze.com"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.inputLabel}>{"\n"}Password</Text>
      <TextInput
        style={styles.input}
        placeholder="******"
        autoCapitalize="none"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.forgotPw}>Forgot Password?{"\n"}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleLogin()}>
            <View style={[styles.button, styles.loginButton]}>
              <Text style={{ color: colors.mainButtonText }}>Sign In</Text>
            </View>
          </Pressable>
          <Link href="/screens/onboarding/OnboardingStep1" style={styles.signUpContainer}>
            <View style={styles.signUpContainer}>
              <Text style={styles.text}>
                {"\n\n"}Don't have an account?{" "}
                <Text style={styles.signUpButton}>Sign Up</Text>
              </Text>
            </View>
          </Link>
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
    backgroundColor: colors.background,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flex: 0.5,
    justifyContent: "flex-start",
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
    color: colors.textWhite,
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
    backgroundColor: colors.textWhite,
  },
  inputLabel: {
    alignSelf: "flex-start",
    color: colors.textWhite,
  },
  loginButton: {
    backgroundColor: colors.mainButton,
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
    color: colors.textWhite,
  },
});

export default Login;
