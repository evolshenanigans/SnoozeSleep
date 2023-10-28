import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateUserFields } from "../services/handleFirestore";
import { calculateTime, calculateTimeWithSubtraction } from "../services/handleTime";
import { colors } from "../utils/colors";
import { text } from "../utils/text";
import OnboardingHeader from "./OBHeader";
import ContinueButton from "./ContinueButton";
import useUserData from "../hooks/useUserData";
import TimeSelector from "./TimeSelector";
import { commonStyles } from "../utils/commonStyles";
import { useRouter } from "expo-router";
import { useUserContext } from "../services/Context";

// START COMPONENT
const OB4SleepTime = () => {
  /**
   * This is onboarding for SLEEP SCHEDULE
   */
  const [goalTime, setGoalTime] = useState<string>();
  const [bedTime, setBedTime] = useState<string>();
  const [wakeTime, setWakeTime] = useState<string>();

  // if bedTimeSelected is false, defaults to wake time is selected
  const [bedTimeSelected, setBedTimeSelected] = useState<boolean>(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData();
  const router = useRouter();
  const currentUser = useUserContext();

  const handleSubmitSleepSchedule = async () => {
    if (goalTime !== "") {
      setLoading(true);
      try {
        updateUserFields(currentUser.email, {
          generalSleepTime: `${bedTime[0]}${bedTime[1]} ${bedTime[3]}${bedTime[4]} ${bedTime[6]}${bedTime[7]}`,
          generalWakeTime: `${wakeTime[0]}${wakeTime[1]} ${wakeTime[3]}${wakeTime[4]} ${wakeTime[6]}${wakeTime[7]}`,
        });
        router.replace(`/(onboarding)/OB5Alarm`);
      } catch (error) {
        console.error("Error submitting sleep schedule: ", error);
        alert("Whoa, " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (bedTimeSelected) {
      setBedTime(calculateTime({ time: goalTime }));
      const wake = userData
        ? calculateTime({
            time: goalTime,
            hoursToAdd: Math.floor(userData.sleepDurationGoal),
            minutesToAdd: Math.floor(
              (userData.sleepDurationGoal - Math.floor(userData.sleepDurationGoal)) * 60
            ),
          })
        : "";
      setWakeTime(wake);
    } else {
      setWakeTime(calculateTime({ time: goalTime }));
      const sleep = userData
        ? calculateTimeWithSubtraction({
            time: goalTime,
            hoursToSubtract: Math.floor(userData.sleepDurationGoal),
            minutesToSubtract: Math.floor(
              (userData.sleepDurationGoal - Math.floor(userData.sleepDurationGoal)) * 60
            ),
          })
        : "";
      setBedTime(sleep);
    }
  });

  useEffect(() => {
    setAllFieldsFilled(goalTime !== "");
  }, [goalTime]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, backgroundColor: colors.themeBackground }}
    >
      <ScrollView style={{ height: "100%" }}>
        <View style={commonStyles.onboardingContainer}>
          {/* HEADER */}
          <OnboardingHeader page={"4"} progressPercent={(4 / 6) * 100} />
          {/* LOGIN FORM */}
          <View style={styles.formContainer}>
            <Text style={text.heroText}>{"\n"}Create Sleep Schedule</Text>
            <View style={styles.hoursRecommendation}>
              <Image
                source={require("../../assets/images/white_clock.png")}
                style={styles.icon}
              />
              <Text style={text.subtitle}>
                {"\t"}
                {userData && userData.sleepDurationGoal} Hours
              </Text>
            </View>

            {/* BED TIME OR WAKE UP TIME SELECTOR */}
            <Text
              style={[
                text.subtitle,
                { textAlign: "left", fontWeight: "bold", paddingTop: 20 },
              ]}
            >
              1. Select One {"\n"}
            </Text>
            <View style={styles.bedOrWakeSelector}>
              {/* Bedtime Box: */}
              <Pressable
                style={[
                  styles.bedOrWakeBox,
                  bedTimeSelected ? styles.bedOrWakeTrue : styles.bedOrWakeFalse,
                ]}
                onPress={() => setBedTimeSelected((prev) => !prev)}
              >
                <Image
                  source={require("../../assets/images/blue_moon.png")}
                  style={styles.icon}
                />
                <Text style={{ color: colors.themeWhite }}>Bed Time At</Text>
              </Pressable>

              {/* Wake Up Box: */}
              <Pressable
                style={[
                  styles.bedOrWakeBox,
                  bedTimeSelected ? styles.bedOrWakeFalse : styles.bedOrWakeTrue,
                ]}
                onPress={() => setBedTimeSelected((prev) => !prev)}
              >
                <Image
                  source={require("../../assets/images/yellow_sun.png")}
                  style={styles.icon}
                />
                <Text style={{ color: colors.themeWhite }}>Wake Up At</Text>
              </Pressable>
            </View>

            {/* TOGGLE TIME */}

            <Text style={[text.subtitle, { textAlign: "left", fontWeight: "bold" }]}>
              {"\n\n"}2. Select Time {"\n"}
            </Text>
            <TimeSelector setGoalTime={setGoalTime} includeTimeZone={true} />
            {/* CALCULATE WAKE HOURS */}
            {bedTimeSelected ? (
              <Text style={styles.calculateOtherTime}>
                Calculated Wake Up Time:{" "}
                {/* calculate the wake up time by the hours + durationgoal */}
                {wakeTime}.
              </Text>
            ) : (
              <Text style={styles.calculateOtherTime}>
                Calculated Bed Time:{" "}
                {/* calculate bed time by the hours - durationgoal */}
                {bedTime}.
              </Text>
            )}
          </View>

          {/* CONTINUE BUTTON OR LOADING INDICATOR */}
          <View style={commonStyles.onboardingContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <View style={styles.buttonContainer}>
                <ContinueButton
                  activeCondition={allFieldsFilled}
                  onPressFn={handleSubmitSleepSchedule}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bedOrWakeBox: {
    display: "flex",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  bedOrWakeTrue: {
    backgroundColor: colors.themeSecondary,
    borderWidth: 5,
    borderColor: colors.themePrimary,
  },
  bedOrWakeFalse: {
    backgroundColor: colors.themeAccent1,
    borderWidth: 0,
    borderColor: "transparent",
  },
  bedOrWakeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 40,
  },
  calculateOtherTime: {
    color: colors.themeWhite,
    textAlign: "center",
    width: "150%",
    alignSelf: "center",
  },
  formContainer: {
    paddingHorizontal: 70,
  },
  heroText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    color: colors.themeWhite,
  },
  hoursRecommendation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default OB4SleepTime;
