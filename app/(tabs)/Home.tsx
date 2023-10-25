import React, { useEffect, useState } from "react";
import {
  View,
  Switch,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../services/handleTime";
import TaskList from "../common components/TaskList";
import { UserProps } from "../types/componentTypes";
import { colors } from "../utils/colors";
import * as Brightness from "expo-brightness";
import { Link, Stack } from "expo-router";
import { useUserContext } from "../services/Context";
import TabLayout from "./_layout";
import Noti from "../notifications/Notifications";

const Home: React.FC<UserProps> = () => {
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [isWakeUpEnabled, setIsWakeUpEnabled] = useState(false);
  const [bedtime, setBedtime] = useState<string>("8:00 PM");

  const [wakeUpTime, setWakeUpTime] = useState<string>("7:00 AM");
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
    if (userData) {
      let time = userData[`generalSleepTime`];
      // calls calculateTime which converts the time stored in db to human readable 12H format
      // also accepts argument for # hours to add to the given time
      setBedtime(calculateTime({ time: time }) || "");
      setWakeUpTime(
        calculateTime({
          time: time,
          hoursToAdd: userData.sleepDurationGoal,
          leadingZero: false,
        }) || ""
      );
    }
  }, [userData]);

  const toggleSwitch = () => {
    setIsBedtimeEnabled((previousState) => {
      const newBrightness = previousState ? 0.8 : 0.1; // switch between 10% and 100% brightness
      toggleBrightness(newBrightness);
      return !previousState;
    });
  };

  const toggleBrightness = async (newBrightness: number): Promise<void> => {
    const { status } = await Brightness.requestPermissionsAsync();
    if (status === "granted") {
      Brightness.setSystemBrightnessAsync(newBrightness);
    }
  };

  return (
    <ScrollView style={[{ flex: 1 }, styles.backgroundContainer]}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* TABS */}
      <TabLayout />
      {/* HERO IMAGE */}
      <Image
        source={require("../../assets/images/homeImg.png")}
        style={styles.homeImage}
      />
      <Text style={styles.currentMonthText}>{today}</Text>

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
        <Text style={styles.message}>You currently have no challenges</Text>

        {/* CURRENT SCHEDULE */}
        <View style={styles.subtitleContainer}>
          <View style={styles.sleepAndEditContainer}>
            <Text style={styles.subtitleText}>Sleep Schedule</Text>
            <Image
              source={require("../../assets/images/editwhite.png")}
              style={styles.editIcon}
            />
          </View>
          <Text style={styles.viewAllText}>View All</Text>
        </View>

        {/* SCHEDULE BOXES */}
        <View style={styles.scheduleBoxesContainer}>
          <View style={styles.switchContainer}>
            <Image
              source={require("../../assets/images/blue_moon.png")}
              style={styles.scheduleIcon}
            />
            <Text style={styles.timeText}>Bedtime</Text>
            <Text style={styles.timetime}>{bedtime}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#686868" }}
              thumbColor={isBedtimeEnabled ? "#9174D0" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isBedtimeEnabled}
              style={styles.switches}
            />
          </View>
          <View style={[styles.switchContainer]}>
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
        <Noti />
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
  scheduleBoxesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  subtitleText: {
    fontSize: 14,
    color: colors.themeWhite,
    textAlign: "left", // Align text to the left
  },
  homeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  scheduleIcon: {
    position: "absolute",
    top: -15,
    width: 33,
    height: 33,
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
  subtitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sleepAndEditContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    margin: 20,
    backgroundColor: colors.themeAccent4,
  },
  timeText: {
    fontSize: 12,
    marginBottom: 10,
    color: colors.themeWhite,
  },
  timetime: {
    fontSize: 16,
    color: colors.themeWhite,
  },
  currentMonthText: {
    position: "absolute",
    top: 130,
    left: 20,
    color: "#f2f2f2",
    // fontFamily: 'inter',
    fontSize: 20,
    textAlign: "left",
    marginBottom: 0,
    marginLeft: 7,
  },
  switches: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Scaling to 1.5 times the original size
  },
  viewAllText: {
    color: "#f2f2f2",
    textAlign: "left",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default Home;
