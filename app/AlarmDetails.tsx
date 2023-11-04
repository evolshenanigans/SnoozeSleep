import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import useUserData from "./hooks/useUserData";
import { calculateTime } from "./services/handleTime";
import TaskList from "./common components/TaskList";
import { colors } from "./utils/colors";
import { Link, Stack } from "expo-router";
import {
  reinstateCurrentUserNotifications,
  setupRecurringNotification,
} from "./services/NotificationsService";
import { useUserContext } from "./services/Context";
import { useReceiveLocalNotifications } from "./hooks/useReceiveLocalNotifications";
import TaskModal from "./common components/TaskModal";
import BedAndWakeBox from "./BedAndWakeBox";

const AlarmDetails: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { userData } = useUserData();
  const dayRef = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };
  const [weekday, month, dateNum] = new Date().toDateString().split(" ");
  const today = `${dayRef[weekday]}, ${month} ${dateNum}`;

  useEffect(() => {
    console.log("we are at alarm details");
  }, []);

  return (
    <>
      <ScrollView style={[{ flex: 1 }, styles.backgroundContainer]}>
        {/* Back and View All Header */}
        <View style={styles.headerContainer}>
          <Pressable>
            <Text style={{ color: colors.themeWhite }}>{"< "}Back</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("scheduling notification");
              // omg it worked
              setupRecurringNotification({
                notificationTitle: "Timed Notification",
                notificationMessage: "This is a timed notif!",
                triggerHour: 20,
                triggerMinute: 15,
                notificationType: "task",
              });
            }}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        {/* Calendar Icon & Date */}
        <View style={styles.calendarAndDate}>
          <Image
            source={require("../assets/images/calendar.png")}
            style={styles.calendarIcon}
          />
          <Text style={styles.currentDateHeader}>{today}</Text>
        </View>

        {/* main container */}
        <View style={styles.mainContainer}>
          {/* CURRENT SCHEDULE */}

          {/* SCHEDULE BOXES (contains Bedtime and Wake Up time and switches) */}
          <BedAndWakeBox />

          <View style={styles.goalContainer}>
            <Image
              source={require("../assets/images/sleep_white.png")}
              style={styles.goalIcon}
            />
            <Text style={styles.goalText}>
              {userData
                ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} hours`
                : "Sleep Goal: Loading..."}
            </Text>
          </View>
        </View>
      </ScrollView>
      {showNotification && <TaskModal setOpenModal={setShowNotification} />}
    </>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    height: 25,
    width: 25,
    tintColor: colors.themeWhite,
  },
  backgroundContainer: {
    backgroundColor: colors.themeBackground,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  calendarAndDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  calendarIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: colors.themeWhite,
  },
  challengesContainer: {
    alignItems: "center",
  },
  currentDateHeader: {
    color: colors.themeWhite,
    fontSize: 18,
    textAlign: "left",
    marginTop: 50,
    paddingBottom: 20,
  },
  dayText: {
    fontSize: 12,
    color: colors.themeWhite,
  },
  editIcon: {
    height: 15,
    width: 15,
    marginLeft: 10,
    tintColor: colors.themePrimary,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  goalIcon: {
    tintColor: colors.themeBlue,
    height: 15,
    width: 15,
    marginHorizontal: 10,
  },
  goalText: {
    fontSize: 12,
    textAlign: "center",
    color: colors.themeWhite,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  mainContainer: {
    flex: 1,
  },
  message: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },
  sleepAndEditContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleText: {
    fontSize: 14,
    color: colors.themeWhite,
    textAlign: "left", // Align text to the left
  },
  viewAllText: {
    color: colors.themeWhite,
    textAlign: "left",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default AlarmDetails;
