import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { commonStyles } from "../utils/commonStyles";
import TimeSelector from "../(onboarding)/TimeSelector";
import { colors } from "../utils/colors";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../services/handleTime";
import { useUserContext } from "../services/Context";
import { updateUserFields } from "../services/handleFirestore";

const SetWakeUpTimeModal = ({ wakeTime, setWakeTime, setShowModal }) => {
  const { userData } = useUserData();
  const currentUser = useUserContext();
  const handleSubmitSleepTime = () => {
    updateUserFields(currentUser.email, { generalWakeTime: wakeTime });
  };
  return (
    <View style={commonStyles.modalPositioning}>
      <View style={commonStyles.modalOverlay}>
        <View style={styles.timeSelectorModal}>
          <Pressable onPress={() => setShowModal("")}>
            <Image
              source={require("../../assets/images/cancel.png")}
              style={styles.cancelIcon}
            />
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/yellow_sun.png")}
              style={[styles.icon, { tintColor: colors.themeAccent2 }]}
            />
            <Text style={styles.waketimeModalText}>{"  "}Wake Up</Text>
          </View>
          <Text style={styles.sleepGoalReminder}>
            Based on your sleep goal, you should wake up
            <Text style={{ color: colors.themePrimary }}>
              {" "}
              no sooner than{" "}
              {userData &&
                calculateTime({
                  time: userData.generalSleepTime,
                  hoursToAdd: Math.floor(userData.sleepDurationGoal),
                  minutesToAdd: Math.floor(
                    (userData.sleepDurationGoal -
                      Math.floor(userData.sleepDurationGoal)) *
                      60
                  ),
                  leadingZero: false,
                })}
              .
            </Text>
          </Text>
          <View style={{ paddingHorizontal: 30 }}>
            <TimeSelector time={wakeTime} setTime={setWakeTime} />
          </View>
          <Pressable
            style={styles.btn}
            onPress={() => {
              handleSubmitSleepTime();
              setShowModal("");
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SetWakeUpTimeModal;
const styles = StyleSheet.create({
  waketimeModalText: {
    color: colors.themeWhite,
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 20,
  },
  btn: {
    marginTop: 30,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.themePrimary,
  },
  cancelIcon: {
    tintColor: colors.themeWhite,
    alignSelf: "flex-end",
    margin: 10,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: colors.themeWhite,
  },
  sleepGoalReminder: {
    color: colors.themeWhite,
    paddingHorizontal: 30,
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 20,
  },
  timeSelectorModal: {
    paddingBottom: 30,
    width: "80%",
    backgroundColor: colors.themeBackground,
    borderRadius: 20,
  },
});
