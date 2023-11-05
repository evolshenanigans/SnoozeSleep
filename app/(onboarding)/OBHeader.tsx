import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { colors } from "../utils/colors";
import { Stack, useRouter } from "expo-router";

const OBHeader = ({ page, backToWhere, isSignUp, setShowModal }) => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <Image source={require("../../assets/images/logo.png")} style={styles.icon} />
          <Text style={{ color: colors.themeWhite }}>Step {page} of 5</Text>
        </View>
        <View style={styles.progressView}>
          <ProgressBar isHomepage={false} progress={(page / 5) * 100} />
        </View>
        <View style={styles.backAndForwardBtns}>
          {backToWhere ? (
            <Pressable onPress={() => router.replace(backToWhere)}>
              <Text style={styles.backButton}>{"\n<"} Back</Text>
            </Pressable>
          ) : (
            <Text> </Text>
          )}
          {!isSignUp && (
            <Pressable onPress={() => setShowModal(true)}>
              <Text style={{ textDecorationLine: "underline", color: colors.themeWhite }}>
                {"\n"}Set Up Later
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default OBHeader;

const styles = StyleSheet.create({
  backAndForwardBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    color: colors.themeWhite,
  },
  container: {
    paddingTop: 50,
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
