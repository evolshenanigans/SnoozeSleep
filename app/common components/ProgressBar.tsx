import React from "react";
import { View, StyleSheet } from "react-native";
import { ProgressBarProps } from "../types/componentTypes";
import { colors } from "../utils/colors";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isHomepage }) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: isHomepage ? 5 : 10,
          backgroundColor: isHomepage ? colors.themeGray : colors.themeAccent1,
        },
      ]}
    >
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.themePrimary,
  },
});

export default ProgressBar;
