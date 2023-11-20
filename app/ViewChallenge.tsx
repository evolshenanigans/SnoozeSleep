import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "./utils/colors";
import { useLocalSearchParams } from "expo-router";

const ViewChallenge = () => {
  // const challenge = useLocalSearchParams();
  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: colors.themeWhite }}>{"challenge.title"}</Text>
    </ScrollView>
  );
};

export default ViewChallenge;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
