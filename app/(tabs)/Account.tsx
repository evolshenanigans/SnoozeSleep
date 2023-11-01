import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../utils/colors";
import { useUserContext } from "../services/Context";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../services/handleTime";
// import React, { useState } from "react";

const Account = () => {
  const router = useRouter();
  const currentUser = useUserContext();
  const { userData } = useUserData();

  return (
    <ScrollView style={styles.container}>
      {/* HERO IMAGE */}
      <Image
        source={require("../../assets/images/accountSplash.png")}
        style={styles.homeImage}
      />
      <Text style={styles.header1}>Account Settings</Text>

      <View style={styles.allTextContainer}>
        <View style={styles.section}>
          <Text style={[styles.section, styles.profileInfoHeader]}>
            Profile Information
          </Text>
          {renderCard("Username", userData?.username)}
          {renderCard("Email", userData?.email)}
          <View style={styles.separator} />
          {renderCard(
            "Birthday",
            `${userData?.birthday.split(" ")[0]} / ${userData?.birthday.split(" ")[1]}`
          )}
          {renderCard("Password", "we actually can't change this")}
          {renderCard(
            "Alarm",
            calculateTime({ time: userData?.generalSleepTime, leadingZero: false })
          )}
        </View>
        <View style={styles.separator} />
        {renderLogOut("Sign Out", () => {
          FIREBASE_AUTH.signOut();
          console.log("tried to sign you out.");
          router.replace("/Login");
        })}
      </View>
    </ScrollView>
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
          placeholderTextColor={colors.themeGray2}
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
    <View style={{ paddingBottom: 40 }}>
      <TouchableOpacity onPress={handlePress} style={styles.logoutContainer}>
        <Image
          source={require("../../assets/images/logout.png")}
          style={{ tintColor: colors.themeWhite }}
        />
        <Text style={styles.cardTitle}>
          {"  "}
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  allTextContainer: {
    paddingHorizontal: 30,
  },
  arrow: {
    fontSize: 20,
    marginRight: 10,
    color: colors.themeWhite,
  },
  card: {
    width: "100%",
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
    color: colors.themeWhite,
    backgroundColor: colors.themeAccent4,
  },
  cardTitle: {
    color: colors.themeWhite,
    alignSelf: "flex-start",
    paddingVertical: 5,
  },
  container: {
    backgroundColor: colors.themeBackground,
  },
  header1: {
    position: "absolute",
    top: 130,
    left: 30,
    color: colors.themeWhite,
    fontSize: 20,
    textAlign: "left",
  },
  homeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  logoutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileInfoHeader: {
    color: colors.themeWhite,
    fontSize: 14,
    paddingTop: 30,
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
