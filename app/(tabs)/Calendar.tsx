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
        <Calendar
          style={{borderRadius: 20,
          overflow: 'hidden',
        position:'relative'}}
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

        <SleepLogMaker />
        <Pressable style={styles.plusSignContainer} onPress={handleAddNewTask}>
          {/* <Text style={styles.plusSign}>{`\u002B`}</Text> */}
          <Text style={[text.heroText, styles.addNewSleepLog]}>
            New Sleep Log
          </Text>
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
    backgroundColor: colors.themeAccent1,
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
    position: "absolute",
    top: 130,
    left: 20,
    color: colors.themeWhite,
    fontSize: 20,
    textAlign: "left",
    marginBottom: 0,
    marginLeft: 7,
  },
  todaysTaskLabel: {
    color: colors.themeWhite,
    paddingLeft: 20,
    paddingTop: 20,
  },
  homeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
});

export default MyCalendar;
