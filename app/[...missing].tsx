import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "./utils/colors";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <Image source={require("../assets/images/loadingStar.png")} style={styles.icon} />

      <Text style={styles.bigText}>Well that's awkward</Text>
      <Text style={styles.text}>This screen is broken</Text>
      <Link href="/" style={styles.link}>
        <Text style={[styles.text, { color: colors.themePrimary, fontWeight: "normal" }]}>
          Go back home {` \u3009`}
        </Text>
      </Link>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  bigText: {
    color: colors.themeWhite,
    fontSize: 20,
    textAlign: "center",
  },
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
    transform: [{ scaleX: -1 }, { scaleY: -1 }],
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
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
