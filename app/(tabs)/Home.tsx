import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../services/handleTime";
import TaskList from "../common components/TaskList";
import { colors } from "../utils/colors";
import { Link, useRouter } from "expo-router";
import TabLayout from "./_layout";
import {
  reinstateCurrentUserNotifications,
  setupRecurringNotification,
} from "../services/NotificationsService";
import { useUserContext } from "../services/Context";
import { useReceiveLocalNotifications } from "../hooks/useReceiveLocalNotifications";
import TaskModal from "../common components/TaskModal";
import BedAndWakeBox from "../BedAndWakeBox";
import SuggestedChallenges from "../common components/SuggestedChallenges";

const Home: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const { userData, notifications } = useUserData();
  const { notification } = useReceiveLocalNotifications();
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
  const router = useRouter();

  useEffect(() => {
    if (notification !== undefined) {
      console.log("(home) notification recieved", notification);
      setShowNotification(true);
    }
  }, [notification]);

  useEffect(() => {
    if (userData) {
      // cancel & reinstate all notifications
      if (notifications && notifications.length > 0) {
        reinstateCurrentUserNotifications(notifications);
        console.log("==");
      }
    }
  }, [userData]);

  return (
    <>
      <ScrollView style={[{ flex: 1 }, styles.backgroundContainer]}>
        {/* <Stack.Screen options={{ headerShown: false }} /> */}
        <TabLayout />
        {/* HERO IMAGE */}
        <Image
          source={require("../../assets/images/homeImg.png")}
          style={styles.homeImage}
        />
        <Text style={styles.currentDateHeader}>{today}</Text>

        {/* main container */}
        <View style={styles.mainContainer}>
          {/* CHALLENGES (HORIZONTAL SCROLLING) */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>Challenges</Text>
            <Link href="/Challenges" style={{ paddingBottom: 20 }}>
              <Image
                source={require("../../assets/images/add.png")}
                style={styles.addIcon}
              />
            </Link>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <SuggestedChallenges />
          </View>

          {/* CURRENT SCHEDULE */}
          <View style={styles.subtitleContainer}>
            <View style={styles.sleepAndEditContainer}>
              <Text style={styles.subtitleText}>Sleep Schedule</Text>
              <Pressable onPress={() => router.push("/AlarmDetails")}>
                <Image
                  source={require("../../assets/images/editwhite.png")}
                  style={styles.editIcon}
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                console.log("scheduling notification");
                // omg it worked
                // setupRecurringNotification({
                //   notificationTitle: "Timed Notification",
                //   notificationMessage: "This is a timed notif!",
                //   triggerHour: 20,
                //   triggerMinute: 17,
                //   notificationType: "task",
                // });
              }}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>

          {/* SCHEDULE BOXES (contains Bedtime and Wake Up time and switches) */}
          <BedAndWakeBox />

          <View style={styles.goalContainer}>
            <Image
              source={require("../../assets/images/sleep_white.png")}
              style={styles.goalIcon}
            />
            <Text style={styles.goalText}>
              {userData
                ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} hours`
                : "Sleep Goal: Loading..."}
            </Text>
          </View>

          {/* TASKS COMPONENT */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>Night Routine</Text>
            <Link href="/TaskForm" style={{ paddingBottom: 20 }}>
              <Image
                source={require("../../assets/images/add.png")}
                style={styles.addIcon}
              />
            </Link>
          </View>
          <View style={{ alignSelf: "center", paddingHorizontal: 20 }}>
            <TaskList />
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
  challengesContainer: {
    alignItems: "center",
  },
  currentDateHeader: {
    marginTop: 80,
    color: colors.themeWhite,
    fontSize: 18,
    textAlign: "left",
    marginBottom: 40,
    marginLeft: 30,
  },
  dateText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
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
  homeImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 136,
    resizeMode: "contain",
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
  subtitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
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

export default Home;
