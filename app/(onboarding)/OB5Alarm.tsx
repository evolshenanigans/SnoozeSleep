import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateUserFields } from "../services/handleFirestore";
import { calculateTime } from "../services/handleTime";
import { colors } from "../utils/colors";
import { text } from "../utils/text";
import OnboardingHeader from "./OBHeader";
import ContinueButton from "./ContinueButton";
import useUserData from "../hooks/useUserData";
import { RepeatsPopup } from "../common components/RepeatsPopup";
import { commonStyles } from "../utils/commonStyles";
import { useRouter } from "expo-router";
import { useUserContext } from "../services/Context";

// START COMPONENT
const OB5Alarm = ({ setCurrentUserIsNew }) => {
  /**
   * This is onboarding for CREATE ALARM
   */
  const [repeats, setRepeats] = useState<string>("Everyday");
  const [bedtimeReminder, setBedtimeReminder] = useState<string>("15 minutes before");
  const [withSound, setWithSound] = useState<boolean>(true);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  // if bedTimeSelected is false, defaults to wake time is selected
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData();
  const router = useRouter();
  const currentUser = useUserContext();

  // TODO: I don't think this does what it's supposed to do.
  const handleSubmitAlarm = async () => {
    if (repeats !== "") {
      setLoading(true);
      try {
        if (repeats === "Everyday") {
          updateUserFields(currentUser.email, {
            sundaySleepTime: userData.generalSleepTime,
            mondaySleepTime: userData.generalSleepTime,
            tuesdaySleepTime: userData.generalSleepTime,
            wednesdaySleepTime: userData.generalSleepTime,
            thursdaySleepTime: userData.generalSleepTime,
            fridaySleepTime: userData.generalSleepTime,
            saturdaySleepTime: userData.generalSleepTime,
          });
        } else if (repeats === "Weekdays") {
          updateUserFields(currentUser.email, {
            mondaySleepTime: userData.generalSleepTime,
            tuesdaySleepTime: userData.generalSleepTime,
            wednesdaySleepTime: userData.generalSleepTime,
            thursdaySleepTime: userData.generalSleepTime,
            fridaySleepTime: userData.generalSleepTime,
          });
        } else if (repeats === "Weekends") {
          updateUserFields(currentUser.email, {
            sundaySleepTime: userData.generalSleepTime,
            saturdaySleepTime: userData.generalSleepTime,
          });
        }
        router.replace(`/(onboarding)/OB5Alarm`);
        // router.back()
      } catch (error) {
        console.error("Error submitting sleep schedule: ", error);
        alert("Whoa, " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRepeatsPress = () => {
    console.log("repeats presssed");
    setPopupOpen(true);
  };

  const handleBedTimeReminderPress = () => {
    console.log("bedtime presssed");
  };

  const handleNavigateHome = () => {
    updateUserFields(currentUser.email, { userIsNew: false })
      .then(() => {
        console.log("Successfully updated DB");
        // setCurrentUserIsNew(false); // Update the state
        router.replace(`/(tabs)/_layout`);
      })
      .catch((error) => {
        console.error("Error updating user onboarding status:", error);
        alert("Whoops, something went wrong when we tried to submit that.");
      });
  };

  useEffect(() => {
    setAllFieldsFilled(repeats !== "");
  }, [repeats]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.themeBackground }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={-50}
        style={{ display: "flex" }}
      >
        <ScrollView style={{ height: "100%" }}>
          {/* <ScrollView style={{ flex: 1 }}> */}
          <View style={commonStyles.onboardingContainer}>
            {/* HEADER */}
            <OnboardingHeader page={"5"} progressPercent={(5 / 6) * 100} />
            {/* ALARM FORM */}
            <View style={styles.formContainer}>
              <Text style={text.heroText}>{"\n"}Create Alarm</Text>
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

              {/* BED TIME AND WAKE UP TIME BOX */}
              <View style={[styles.bedOrWakeSelector, { paddingTop: 40 }]}>
                {/* Bedtime Box: */}
                <Pressable
                  style={styles.bedOrWakeBox}
                  onPress={() => router.replace(`/(onboarding)/OB4SleepTime`)}
                >
                  <Image
                    source={require("../../assets/images/blue_moon.png")}
                    style={styles.icon}
                  />
                  <Text style={[text.subtitle, { color: colors.themeWhite }]}>
                    {userData && calculateTime(userData.generalSleepTime)}
                  </Text>
                  <Text style={{ color: colors.themeWhite }}>Bed Time</Text>
                </Pressable>

                {/* Wake Up Box: */}
                <Pressable
                  style={styles.bedOrWakeBox}
                  onPress={() => router.replace(`/(onboarding)/OB4SleepTime`)}
                >
                  <Image
                    source={require("../../assets/images/yellow_sun.png")}
                    style={styles.icon}
                  />
                  <Text style={[text.subtitle, { color: colors.themeWhite }]}>
                    {userData && calculateTime(userData.generalWakeTime)}
                  </Text>
                  <Text style={{ color: colors.themeWhite }}>Wake Up</Text>
                </Pressable>
              </View>
              <View style={styles.tapToEditContainer}>
                <Text style={styles.tapToEdit}>Tap to edit</Text>
                <Text style={styles.tapToEdit}>Tap to edit</Text>
              </View>

              {/* TOGGLE TIME */}
              {/* <TimeSelector setGoalTime={setGoalTime} /> */}

              {/* ALARM SETTINGS */}
              {/* Row 1: Repeats -------------- Everyday > */}
              {/* Row 2: Bed Time Reminder -------- None > */}
              {/* Row 3: Sound ---------------------- On > */}
              <View style={styles.alarmSettingsContainer}>
                <Pressable style={styles.alarmSettingsRow} onPress={handleRepeatsPress}>
                  <Text style={styles.settingHeader}>Repeats</Text>
                  <Text style={styles.settingValue}>
                    {repeats} <Text style={styles.settingsArrow}> {`\u3009`}</Text>
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.alarmSettingsRow}
                  onPress={handleBedTimeReminderPress}
                >
                  <Text style={styles.settingHeader}>Bed Time Reminder</Text>
                  <Text style={styles.settingValue}>
                    {bedtimeReminder}{" "}
                    <Text style={styles.settingsArrow}> {`\u3009`}</Text>
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.alarmSettingsRow}
                  onPress={() => setWithSound((s) => !s)}
                >
                  <Text style={styles.settingHeader}>Sound</Text>
                  <Text style={styles.settingValue}>
                    {withSound ? "On" : "Off"}{" "}
                    <Text style={styles.settingsArrow}> {`\u3009`}</Text>
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* CONTINUE BUTTON OR LOADING INDICATOR */}
            <View style={styles.container}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <View style={styles.buttonContainer}>
                  <Pressable>
                    <View
                      style={[
                        styles.button,
                        {
                          backgroundColor: colors.themeSecondary,
                          marginVertical: 10,
                          marginTop: 50,
                        },
                      ]}
                    >
                      <Text style={{ color: colors.themeWhite }}>
                        Create Another Alarm
                      </Text>
                    </View>
                  </Pressable>
                  <ContinueButton
                    activeCondition={allFieldsFilled}
                    onPressFn={handleNavigateHome}
                  />
                </View>
              )}
            </View>
            {popupOpen && (
              <RepeatsPopup
                popupOpen={popupOpen}
                setPopupOpen={setPopupOpen}
                choice={repeats}
                setChoice={setRepeats}
              />
            )}
            {/* <RepeatsPopup popupOpen={popupOpen} setPopupOpen={setPopupOpen} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alarmSettingsContainer: {
    marginTop: 30,
  },
  alarmSettingsRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.themeAccent1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  bedOrWakeBox: {
    display: "flex",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: colors.themeSecondary,
  },
  bedOrWakeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 30,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    padding: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.themeBackground,
  },
  formContainer: {
    paddingHorizontal: 40,
    flex: 1,
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
  settingsArrow: {
    fontWeight: "bold",
  },
  settingHeader: {
    color: colors.themeWhite,
    fontSize: 12,
  },
  settingValue: {
    color: colors.themeWhite,
    fontWeight: "300",
    fontSize: 12,
  },
  tapToEdit: {
    color: colors.themeWhite,
    fontSize: 11,
  },
  tapToEditContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default OB5Alarm;
