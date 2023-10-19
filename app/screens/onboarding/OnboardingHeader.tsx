import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ProgressBar from "../ProgressBar";
import { colors } from "../../utils/colors";
import { useRouter } from "expo-router";

const OnboardingHeader = ({ progressPercent, page }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/images/logo.png")} style={styles.icon} />
        <Text style={{ color: colors.textWhite }}>Step {page} of 6</Text>
      </View>
      <View style={styles.progressView}>
        <ProgressBar progress={progressPercent} />
      </View>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backButton}>{"\n<<"} Back</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
  backButton: {
    color: colors.textWhite,
    paddingLeft: 20,
  },
  container: {
    // paddingTop: 50,
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
    width: "90%",
    alignSelf: "center",
  },
});
