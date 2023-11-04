import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
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
