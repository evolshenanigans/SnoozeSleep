import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../utils/colors";
import ProgressBar from "./ProgressBar";
import { useRouter } from "expo-router";

const LoadingScreen = () => {
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingPercent < 100) {
        setLoadingPercent(loadingPercent + 5);
      } else {
        clearInterval(interval);
        router.replace("/(tabs)/Home");
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
        <ProgressBar isHomepage={false} progress={loadingPercent} />
      </View>
      <Text style={styles.text}>
        Just one moment, we are getting your sleep schedule ready!
      </Text>
      {/* <Pressable onPress={() => router.replace("/(tabs)/Home")}>
        <Text style={styles.homeBtn}>Go Home</Text>
      </Pressable> */}
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
    width: "100%",
  },
  homeBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    width: "100%",
    backgroundColor: colors.themePrimary,
    color: colors.themeWhite,
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
