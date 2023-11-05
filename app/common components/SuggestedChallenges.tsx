import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ChallengeCard from "./ChallengeCard";
import { colors } from "../utils/colors";
import { allChallenges } from "../utils/allChallenges";

const SuggestedChallenges = () => {
  return (
    <View style={styles.suggestedChallengesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(allChallenges).map((challenge, index) => (
          <View key={`suggested-${index}`}>
            <ChallengeCard challenge={allChallenges[challenge]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggestedChallenges;

const styles = StyleSheet.create({
  suggestedChallengesContainer: {
    padding: 10,
  },
});
