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
import { updateUserFields } from "../../services/handleFirestore";
import { colors } from "../../utils/colors";
import { text } from "../../utils/text";
import OnboardingHeader from "./OnboardingHeader";
import ContinueButton from "./ContinueButton";
import useUserData from "../../hooks/useUserData";
import { commonStyles } from "../../utils/commonStyles";
import { useRouter } from "expo-router";

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
    // default:
    //   return "7";
  }
};

// START COMPONENT
const OnboardingStep3 = ({ currentUser }) => {
  /**
   * This is onboarding for SLEEP DURATION GOAL
   */
  const [goalHours, setGoalHours] = useState<string>();
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData(currentUser.email);
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      let [_, birthYear] = userData.birthday.split(" ");
      console.log("age: ", currentYear - birthYear);
      setGoalHours(calculateAgeBasedSleepGoal(currentYear - birthYear));
    }
  }, []);

  const handleSubmitGoalHours = async () => {
    if (goalHours !== "") {
      setLoading(true);
      try {
        if (parseFloat(goalHours) > 0 && parseFloat(goalHours) <= 24) {
          updateUserFields(currentUser.email, {
            sleepDurationGoal: parseFloat(goalHours),
          });
          router.replace(
            `/screens/onboarding/OnboardingStep4?currentUser=${currentUser}`
          );
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
      <View style={commonStyles.onboardingContainer}>
        {/* HEADER */}
        <OnboardingHeader page={"3"} progressPercent={(3 / 6) * 100} />
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
                style={styles.input}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 40,
  },
  input: {
    color: colors.textWhite,
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
    color: colors.textWhite,
  },
  formContainer: {
    padding: 40,
  },
  tapToEditContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingStep3;
