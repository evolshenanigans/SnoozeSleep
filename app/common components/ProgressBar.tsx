import React from "react";
import { View, StyleSheet } from "react-native";
import { ProgressBarProps } from "../types/componentTypes";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#525B82",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#9174D0",
  },
});

export default ProgressBar;
