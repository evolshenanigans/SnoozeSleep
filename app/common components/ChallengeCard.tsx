import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import useUserData from "../hooks/useUserData";
import { useRouter } from "expo-router";

const ChallengeCard = ({ challenge }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { userData } = useUserData();
  const router = useRouter();
  return (
    // todo: add a way for them to view the expanded challenge
    <Pressable
      style={styles.challengeItem}
      // onPress={() => {
      //   // router.setParams({ challenge: challenge });
      //   router.push(`/ViewChallenge`);
      // }}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/images/streak.png")}
          style={styles.fireIcon}
        />
        <Image
          source={require("../../assets/images/bookmarkinactive.png")}
          style={styles.saveIcon}
        />
      </View>
      <Text style={styles.challengeTitle}>{challenge.title}</Text>
      {!isSaved && <Text style={styles.detailsText}>Tap for Details</Text>}
    </Pressable>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  challengeItem: {
    backgroundColor: colors.themeAccent4,
    borderRadius: 10,
    padding: 20,
    width: 150,
    marginRight: 10,
  },
  challengeTitle: {
    color: colors.themeWhite,
    paddingTop: 5,
    fontSize: 12,
  },
  detailsLink: {
    paddingTop: 10,
  },
  detailsText: {
    fontSize: 10,
    color: colors.themeGray,
    paddingTop: 15,
  },
  fireIcon: {
    tintColor: colors.themeAccent2,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveIcon: {
    tintColor: colors.themeWhite,
  },
});
