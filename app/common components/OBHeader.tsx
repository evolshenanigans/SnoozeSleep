import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";
import { colors } from "../utils/colors";
import { Stack, useRouter } from "expo-router";

const OBHeader = ({ progressPercent, page }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Image source={require("../../assets/images/logo.png")} style={styles.icon} />
        <Text style={{ color: colors.themeWhite }}>Step {page} of 6</Text>
      </View>
      <View style={styles.progressView}>
        <ProgressBar isHomepage={false} progress={progressPercent} />
      </View>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backButton}>{"\n<<"} Back</Text>
      </Pressable>
    </View>
  );
};

export default OBHeader;

const styles = StyleSheet.create({
  backButton: {
    color: colors.themeWhite,
    paddingLeft: 20,
  },
  container: {
    // paddingTop: 50,
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.themeBackground,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
  },
  icon: {
    height: 50,
    width: 50,
  },
  progressView: {
    backgroundColor: colors.themeBackground,
    width: "90%",
    alignSelf: "center",
  },
});
