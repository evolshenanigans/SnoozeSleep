import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import { colors } from "../utils/colors";
import TaskList from "../common components/TaskList";
import { text } from "../utils/text";
import SleepLogMaker from "../common components/SleepLogMaker";
import { useUserContext } from "../services/Context";

function MyCalendar() {
  const [selected, setSelected] = useState("");
  const currentUser = useUserContext();
  const { userData, tasks } = useUserData();

  const handleAddNewTask = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.calendarContainer}>
        <Text style={styles.titleText}>
          {/* {userData
              ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} Hours`
              : "Loading..."} */}
          Progress Calendar
        </Text>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          // markedDates={{
          //   [selected]: {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: colors.themePrimary, // ts says "selectedDotColor" doesn't exist
          //   },
          // }}
          // style={styles.calendar}
          theme={{
            backgroundColor: colors.themeRed,
            calendarBackground: colors.themeRed,
            textSectionTitleColor: colors.themeRed,
            selectedDayBackgroundColor: colors.themeRed,
            selectedDayTextColor: colors.themeRed,
            todayTextColor: colors.themeRed,
            dayTextColor: colors.themeRed,
            textDisabledColor: colors.themeRed,
          }}
        />

        <SleepLogMaker />
        <Pressable style={styles.plusSignContainer} onPress={handleAddNewTask}>
          {/* <Text style={styles.plusSign}>{`\u002B`}</Text> */}
          <Text style={[text.heroText, styles.addNewSleepLog]}>New Sleep Log</Text>
        </Pressable>

        <View>
          <Text style={styles.todaysTaskLabel}>
            {tasks
              ? tasks.length === 1
                ? "Today's Task"
                : "Today's Tasks"
              : "Loading..."}{" "}
          </Text>
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
    backgroundColor: colors.themeAccent4,
    borderRadius: 20,
  },
  calendarContainer: {
    backgroundColor: colors.themeBackground,
    color: colors.themeWhite,
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
  taskContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: 16,
    alignSelf: "flex-start",
    marginTop: 50,
    color: colors.themeWhite,
  },
  todaysTaskLabel: {
    color: colors.themeWhite,
    paddingLeft: 20,
    paddingTop: 20,
  },
});

export default MyCalendar;
