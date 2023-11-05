import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/colors";

const RepeatsButton = ({
  setPopupOpen,
  repeats,
  reminder,
  editTimes = false,
  setShowModal = (e) => {},
}) => {
  const handleRepeatsPress = () => {
    console.log("repeats presssed");
    setPopupOpen(true);
  };

  const handleReminderPress = () => {
    console.log("reminder presssed");
  };

  return (
    <>
      {editTimes && (
        <Pressable
          style={styles.alarmSettingsRow}
          onPress={() => setShowModal("set bed time")}
        >
          <Text style={styles.settingHeader}>Edit Times</Text>
          <Text style={styles.settingValue}>
            <Text style={styles.settingsArrow}> {`\u3009`}</Text>
          </Text>
        </Pressable>
      )}
      <Pressable style={styles.alarmSettingsRow} onPress={handleReminderPress}>
        <Text style={styles.settingHeader}>Reminder</Text>
        <Text style={styles.settingValue}>
          {reminder} <Text style={styles.settingsArrow}> {`\u3009`}</Text>
        </Text>
      </Pressable>
      <Pressable style={styles.alarmSettingsRow} onPress={handleRepeatsPress}>
        <Text style={styles.settingHeader}>Repeats</Text>
        <Text style={styles.settingValue}>
          {repeats} <Text style={styles.settingsArrow}> {`\u3009`}</Text>
        </Text>
      </Pressable>
    </>
  );
};

export default RepeatsButton;
const styles = StyleSheet.create({
  alarmSettingsRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.themeAccent4,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 12,
    marginVertical: 10,
    paddingHorizontal: 20,
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
});
