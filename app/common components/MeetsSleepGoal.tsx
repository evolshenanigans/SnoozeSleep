import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import useUserData from "../hooks/useUserData";
import { calculateLengthOfRange } from "../services/handleTime";
import { colors } from "../utils/colors";

const MeetsSleepGoal = () => {
  const [meetsSleepGoal, setMeetsSleepGoal] = useState<boolean>(true);
  const { userData } = useUserData();

  useEffect(() => {
    if (userData) {
      let diff = calculateLengthOfRange({
        startTime: userData.generalSleepTime,
        endTime: userData.generalWakeTime,
      });
      setMeetsSleepGoal(diff >= userData.sleepDurationGoal);
    }
  }, [userData]);
  return (
    <View style={styles.meetsSleepGoalContainer}>
      {/* SCHEDULE MEETS SLEEP GOAL OR NOT */}
      {meetsSleepGoal ? (
        <>
          <Image
            source={require("../../assets/images/check.png")}
            style={{ height: 20, width: 20, tintColor: colors.themeGreen }}
          />
          <Text style={{ color: colors.themeWhite, fontSize: 12 }}>
            This schedule meets your sleep goal
          </Text>
        </>
      ) : (
        <>
          <Image
            source={require("../../assets/images/cancel.png")}
            style={{ height: 20, width: 20, tintColor: colors.themeRed }}
          />
          <Text style={{ color: colors.themeWhite, fontSize: 12 }}>
            This schedule does NOT meet your sleep goal
          </Text>
        </>
      )}
    </View>
  );
};

export default MeetsSleepGoal;
const styles = StyleSheet.create({
  meetsSleepGoalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
});
