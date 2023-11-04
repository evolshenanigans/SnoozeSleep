import React, { useEffect, useState } from "react";
import {
  View,
  Switch,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../services/handleTime";
import TaskList from "../common components/TaskList";
import { colors } from "../utils/colors";
import * as Brightness from "expo-brightness";
import { Link, Stack } from "expo-router";
import TabLayout from "./_layout";
import {
  cancelScheduledNotifications,
  getAllNotifications,
  reinstateCurrentUserNotifications,
  setupRecurringNotification,
} from "../services/NotificationsService";
import { updateUserFields } from "../services/handleFirestore";
import { useUserContext } from "../services/Context";
import { useReceiveLocalNotifications } from "../hooks/useReceiveLocalNotifications";
import TaskModal from "../common components/TaskModal";
import { UserNotification } from "../types/indexTypes";

const Home: React.FC = () => {
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [isWakeUpEnabled, setIsWakeUpEnabled] = useState(false);
  const [bedtime, setBedtime] = useState<string>("8:00 PM");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const [wakeUpTime, setWakeUpTime] = useState<string>("7:00 AM");
  const { userData, notifications } = useUserData();
  const currentUser = useUserContext();
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

  useEffect(() => {
    if (notification !== undefined) {
      console.log("(home) notification recieved", notification);
      setShowNotification(true);
    }
  }, [notification]);

  useEffect(() => {
    if (userData) {
      // handle sleep times
      let time = userData[`generalSleepTime`];
      // calls calculateTime which converts the time stored in db to human readable 12H format
      // also accepts argument for # hours to add to the given time
      setBedtime(
        calculateTime({ time: time, leadingZero: false, whoCalls: "homeBedtime" }) || ""
      );
      setWakeUpTime(
        calculateTime({
          time: time,
          hoursToAdd: userData.sleepDurationGoal,
          leadingZero: false,
          whoCalls: "homeWakeup",
        }) || ""
      );

      // cancel & reinstate all notifications
      if (notifications && notifications.length > 0) {
        reinstateCurrentUserNotifications(notifications);
        console.log("==");
      }
    }
  }, [userData]);

  const toggleSwitch = async () => {
    if (!isBedtimeEnabled) {
      // IF SWTICH IS OFF, YOU'RE TOGGLING IT ON. ACTIVATE SCREEN DARKENING
      const lastKnownBrightness = await getBrightness();
      // STORING THE LAST KNOWN BRIGHTNESS SO WE STOP BLINDING PEOPLE
      updateUserFields(currentUser.email, {
        // for some reason mine has max brightness of 32 instead of 100 or 1 idk
        lastKnownBrightness: lastKnownBrightness / 32.12156677246094,
      });
      setIsBedtimeEnabled((prev) => {
        toggleBrightness(0.1);
        return !prev;
      });
    } else {
      // IF SWITCH WAS ON, YOU'RE TOGGLING IT OFF. REVERT TO LAST KNOWN BRIGHTNESS
      setIsBedtimeEnabled((prev) => {
        toggleBrightness(userData.lastKnownBrightness);
        return !prev;
      });
    }
  };

  const toggleBrightness = async (newBrightness: number): Promise<void> => {
    const { status } = await Brightness.requestPermissionsAsync();
    if (status === "granted") {
      // SYSTEM brightness changes whole phone so it stays the same when you leave the app
      // NORMAL brightness only changes brightness within the app.
      Brightness.setSystemBrightnessAsync(newBrightness);
      Brightness.setBrightnessAsync(newBrightness);
    }
  };

  const getBrightness = async (): Promise<number> => {
    const { status } = await Brightness.requestPermissionsAsync();
    if (status === "granted") {
      const brightness = await Brightness.getSystemBrightnessAsync();
      console.log("last brightness", brightness);
      return brightness;
    }
    return -1;
  };

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
          <Link
            href={"/(tabs)/Challenges"}
            style={{ alignSelf: "center", paddingVertical: 20 }}
          >
            <Text style={styles.message}>Browse for challenges!</Text>
          </Link>

          {/* CURRENT SCHEDULE */}
          <View style={styles.subtitleContainer}>
            <View style={styles.sleepAndEditContainer}>
              <Text style={styles.subtitleText}>Sleep Schedule</Text>
              <Image
                source={require("../../assets/images/editwhite.png")}
                style={styles.editIcon}
              />
            </View>
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

          {/* SCHEDULE BOXES */}
          <View style={styles.scheduleBoxesContainer}>
            <View style={styles.switchBox}>
              <Image
                source={require("../../assets/images/blue_moon.png")}
                style={styles.scheduleIcon}
              />
              <Text style={styles.timeText}>Bedtime</Text>
              <Text style={styles.timetime}>{bedtime}</Text>
              <Switch
                trackColor={{ false: colors.themeGray2, true: colors.themeGray2 }}
                thumbColor={isBedtimeEnabled ? colors.themePrimary : colors.themeGray}
                onValueChange={toggleSwitch}
                value={isBedtimeEnabled}
                style={styles.switches}
              />
            </View>
            <View style={[styles.switchBox]}>
              <Image
                source={require("../../assets/images/sunyellow.png")}
                style={styles.scheduleIcon}
              />
              <Text style={styles.timeText}>Wake Up</Text>
              <Text style={styles.timetime}>{wakeUpTime}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#686868" }}
                thumbColor={isWakeUpEnabled ? colors.themePrimary : colors.themeGray}
                onValueChange={() => setIsWakeUpEnabled(!isWakeUpEnabled)}
                value={isWakeUpEnabled}
                style={styles.switches}
              />
            </View>
          </View>
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
      {showNotification && (
        <TaskModal notif={notification} setOpenModal={setShowNotification} />
      )}
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
  scheduleBoxesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  scheduleIcon: {
    position: "absolute",
    top: -18,
    width: 33,
    height: 33,
    resizeMode: "contain",
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
  switchBox: {
    display: "flex",
    alignItems: "center",
    width: 120,
    height: 120,
    // paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.themeAccent4,
  },
  timeText: {
    fontSize: 12,
    marginBottom: 7,
    color: colors.themeWhite,
  },
  timetime: {
    fontSize: 16,
    color: colors.themeWhite,
  },
  switches: {
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }], // Scaling to 1.5 times the original size
  },
  viewAllText: {
    color: colors.themeWhite,
    textAlign: "left",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default Home;
