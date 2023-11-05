import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateUserFields } from "../services/handleFirestore";
import { colors } from "../utils/colors";
import { text } from "../utils/text";
import OnboardingHeader from "./OBHeader";
import ContinueButton from "../common components/ContinueButton";
import useUserData from "../hooks/useUserData";
import { commonStyles } from "../utils/commonStyles";
import { Stack, useRouter } from "expo-router";
import { useUserContext } from "../services/Context";
import SetupLaterModal from "../SetupLaterModal";

const calculateAgeBasedSleepGoal = (age: number) => {
  switch (true) {
    case age < 1:
      return "12";
    case age < 3:
      return "11";
    case age < 6:
      return "10";
    case age < 13:
      return "8";
    case age < 18:
      return "9";
    default:
      return "7";
  }
};

// START COMPONENT
const OB3SleepDurationGoal = () => {
  /**
   * This is onboarding for SLEEP DURATION GOAL
   */
  const [recommendedHours, setRecommendedHours] = useState<string>();
  const [goalHours, setGoalHours] = useState<string>();
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const { userData } = useUserData();
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const currentUser = useUserContext();

  useEffect(() => {
    if (userData) {
      let [_, birthYear] = userData.birthday.split(" ");
      console.log("age: ", currentYear - parseInt(birthYear));
      setGoalHours(calculateAgeBasedSleepGoal(currentYear - parseInt(birthYear)));
      setRecommendedHours(calculateAgeBasedSleepGoal(currentYear - parseInt(birthYear)));
    }
  }, [userData]);

  const handleSubmitGoalHours = async () => {
    if (goalHours !== "") {
      setLoading(true);
      try {
        if (parseFloat(goalHours) > 0 && parseFloat(goalHours) <= 24) {
          updateUserFields(currentUser.email, {
            sleepDurationGoal: parseFloat(goalHours),
          });
          router.replace(`/(onboarding)/OB4Alarm`);
        } else
          throw {
            message: `goal hours must be between 0 and 24.`,
          };
      } catch (error) {
        console.error("Error submitting goal hours: ", error);
        alert("Whoa, " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setAllFieldsFilled(goalHours !== "");
  }, [goalHours]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={-150}
      style={{ flex: 1 }}
    >
      <Stack.Screen options={{ headerShown: false, header: () => null }} />
      <View style={commonStyles.onboardingContainer}>
        {/* HEADER */}
        <OnboardingHeader
          page={"3"}
          backToWhere={"/(onboarding)/OB2Birthday"}
          isSignUp={false}
          setShowModal={setShowModal}
        />
        {/* SLEEP GOAL TITLE */}
        <View style={styles.formContainer}>
          <Text style={text.heroText}>
            Based on your age, you should be aiming for this much sleep:
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.tapToEditContainer}>
              {/* INPUT LABELS */}
              <Text style={styles.inputLabel}>{"\n"}Tap to Edit</Text>
              {/* INPUT OWN GOAL HOURS */}
              <TextInput
                style={[
                  styles.input,
                  parseFloat(recommendedHours) === parseFloat(goalHours)
                    ? styles.noBorder
                    : styles.yesBorder,
                ]}
                placeholder="00"
                autoCapitalize="none"
                value={goalHours}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text.length <= 3 && (parseFloat(text) <= 24 || text == "")) {
                    setGoalHours(text);
                  }
                }}
              />
            </View>
            <Text style={[{ color: colors.themeWhite, paddingTop: 30 }, text.heroText]}>
              Hours
            </Text>
          </View>
        </View>
        <View style={commonStyles.onboardingContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.buttonContainer}>
              <ContinueButton
                activeCondition={allFieldsFilled}
                onPressFn={handleSubmitGoalHours}
              />
            </View>
          )}
        </View>
      </View>
      {showModal && (
        <SetupLaterModal
          setShowModal={setShowModal}
          whereToNext={"/(onboarding)/OB4Alarm"}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 40,
  },
  formContainer: {
    padding: 40,
  },
  input: {
    color: colors.themeWhite,
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    marginVertical: 4,
    height: 40,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 50,
    marginHorizontal: 10,
    backgroundColor: colors.themeAccent4,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    // width: "50%",
    paddingVertical: 10,
  },
  inputLabel: {
    color: colors.themeWhite,
  },
  noBorder: {
    borderWidth: 0,
  },
  tapToEditContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  yesBorder: {
    borderWidth: 2,
    borderColor: colors.themePrimary,
  },
});

export default OB3SleepDurationGoal;
