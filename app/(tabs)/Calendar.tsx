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
import TaskList from "../TaskList";
import { text } from "../utils/text";
import SleepLogMaker from "../screens/SleepLogMaker";

function MyCalendar({ currentUser }) {
  const [selected, setSelected] = useState("");
  const { userData, tasks } = useUserData(currentUser ? currentUser.email : null);

  const handleAddNewTask = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.calendarContainer}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            {userData
              ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} Hours`
              : "Loading..."}
          </Text>
        </View>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "orange", // ts says "selectedDotColor" doesn't exist
            },
          }}
        />

        <SleepLogMaker currentUser={currentUser} />
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
                <TaskList currentUser={currentUser} />
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
    backgroundColor: colors.mainButton,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "60%",
    color: colors.mainButtonText,
    fontSize: 20,
  },
  calendarContainer: {
    backgroundColor: colors.background,
    color: colors.textWhite,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: 40,
  },
  goalText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    color: colors.textWhite,
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
  todaysTaskLabel: {
    color: colors.textWhite,
    paddingLeft: 20,
    paddingTop: 20,
  },
});

export default MyCalendar;
