import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../utils/colors";
import ProgressBar from "./ProgressBar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const LoadingScreen = () => {
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [loadingVisible, setLoadingVisible] = useState(true);
  // const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingPercent < 100) {
        setLoadingPercent(loadingPercent + 2);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, [loadingPercent]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/loadingStar.png")}
        style={styles.icon}
      />

      <View style={styles.progressView}>
        <ProgressBar progress={loadingPercent} />
      </View>
      <Text style={styles.text}>
        Just one moment, we are getting your sleep schedule ready!
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.themeBackground,
    paddingHorizontal: 40,
  },
  icon: {
    height: 110,
    width: 100,
  },
  text: {
    color: colors.themeWhite,
    fontSize: 17,
    fontWeight: "300",
    textAlign: "center",
  },
  progressView: {
    backgroundColor: colors.themeBackground,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 30,
  },
});
