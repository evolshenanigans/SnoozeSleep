import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../utils/colors";
import { useUserContext } from "../services/Context";
// import React, { useState } from "react";

const Account = () => {
  // const [username, setUsername] = useState<string>("");

  // const Account = ({ currentUser }) => {
  const router = useRouter();
  // const { currentUser } = useLocalSearchParams<{ currentUser: any }>();
  const currentUser = useUserContext();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account Settings</Text>
      <View style={styles.section}>
        <Text style={styles.section}>Profile Information</Text>
        {renderCard("Username", currentUser?.username)}
        {renderCard("Email", currentUser?.email)}
        <View style={styles.separator} />
        {renderCard("Birthday")}
        {renderCard("Password Settings")}
        {renderCard("Alarm Settings")}
      </View>
      <View style={styles.separator} />
      {renderLogOut("Sign Out", () => {
        FIREBASE_AUTH.signOut();
        console.log("tried to sign you out.");
        router.replace("/Login");
      })}
    </SafeAreaView>
  );
};

function renderCard(text: string, val?: any) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{text}</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.cardText}
          placeholder={text}
          autoCapitalize="none"
          value={val}
          // onChangeText={(text) => setEmail(text)}
        />
        {/* <TouchableOpacity onPress={handlePress}>
          <Image source={require("../../assets/images/right.png")} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

function renderLogOut(text: string, handlePress) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{text}</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require("../../assets/images/right.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 20,
    marginRight: 10,
    color: colors.themeWhite,
  },
  card: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // backgroundColor: colors.themeAccent4,
    // borderRadius: 25,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  cardText: {
    // fontSize: 16,
    // color: colors.themeWhite,
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: "transparent",
    backgroundColor: colors.themeWhite,
  },
  cardTitle: {
    color: colors.themeWhite,
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.themeBackground,
    padding: 8,
  },
  header: {
    paddingTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.themeWhite,
  },
  section: {
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 4,
    borderBottomColor: colors.themeGray2,
    marginVertical: 30,
  },
});

export default Account;
