import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import { colors } from "../utils/colors";
import TaskList from "../common components/TaskList";
import { text } from "../utils/text";
import SleepLogMaker from "../common components/SleepLogMaker";
import { useUserContext } from "../services/Context";
import { calculateTime } from "../services/handleTime";

function MyCalendar() {
  const [selected, setSelected] = useState("");
  const currentUser = useUserContext();
  const { userData, tasks } = useUserData();
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleAddNewTask = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.calendarContainer}>
        <Image
          source={require("../../assets/images/CalendarHeader.png")}
          style={styles.homeImage}
        />
        <Text style={styles.titleText}>Calendar</Text>
        <View style={styles.calendarTileContainer}>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [getCurrentDate()]: {
                selected: true,
              },
            }}
            theme={{
              backgroundColor: colors.themeAccent4,
              calendarBackground: colors.themeAccent4,
              textSectionTitleColor: colors.themeWhite,
              todayTextColor: colors.themeBlack,
              dayTextColor: colors.themeWhite,
              textDisabledColor: colors.themeGrey2,
              selectedDayBackgroundColor: colors.themeSecondary,
            }}
          />
        </View>

        <SleepLogMaker />

        <View>
          <Text style={styles.todaysTaskLabel}>Sleep Goal</Text>
          <View style={styles.sleepGoalContainer}>
            <View style={styles.sleepGoalBox}>
              <Text style={styles.sleepGoalText}>
                <Image
                  source={require("../../assets/images/blue_moon.png")}
                  style={styles.sleepGoalIcon}
                />
                {"  "}Bedtime
              </Text>
              <Text style={styles.sleepGoalText}>
                {userData &&
                  calculateTime({
                    time: userData.generalSleepTime,
                    whoCalls: "calendar",
                  })}
              </Text>
            </View>
            <View style={styles.sleepGoalBox}>
              <Text style={styles.sleepGoalText}>
                <Image
                  source={require("../../assets/images/yellow_sun.png")}
                  style={styles.sleepGoalIcon}
                />
                {"  "}Wake Up
              </Text>
              <Text style={styles.sleepGoalText}>
                {userData &&
                  calculateTime({ time: userData.generalWakeTime, whoCalls: "calendar" })}
              </Text>
            </View>
          </View>
        </View>

        {/* NIGHT ROUTINE TASK LIST */}
        <View>
          <Text style={styles.todaysTaskLabel}>Today's Night Routine</Text>
        </View>
        <View style={styles.container}>
          {tasks ? (
            tasks.length > 0 && (
              <View style={styles.taskContainer}>
                <TaskList />
              </View>
            )
          ) : (
            <Text style={text.subtitle}>Loading...</Text>
          )}
        </View>
      </ScrollView>
      {/* <SleepLogMaker currentUser={currentUser} /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  addNewSleepLog: {
    borderRadius: 30,
    backgroundColor: colors.themePrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "60%",
    color: colors.themeBlack,
    fontSize: 20,
  },
  calendar: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  calendarContainer: {
    backgroundColor: colors.themeBackground,
    color: colors.themeWhite,
  },
  calendarTileContainer: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  plusSignContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  sleepGoalBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: colors.themeAccent4,
    borderRadius: 10,
  },
  sleepGoalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  sleepGoalIcon: {
    height: 15,
    width: 15,
  },
  sleepGoalText: {
    fontSize: 12,
    color: colors.themeWhite,
    paddingHorizontal: 10,
  },
  taskContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors.themeWhite,
    fontSize: 20,
    textAlign: "left",
    marginTop: 100,
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  todaysTaskLabel: {
    color: colors.themeWhite,
    paddingLeft: 20,
    paddingTop: 20,
  },
  homeImage: {
    position: "absolute",
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
});

export default MyCalendar;
