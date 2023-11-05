import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import useUserData from "./hooks/useUserData";
import { calculateTime } from "./services/handleTime";
import TaskList from "./common components/TaskList";
import { colors } from "./utils/colors";
import { Link, Stack, useRouter } from "expo-router";
import {
  reinstateCurrentUserNotifications,
  setupRecurringNotification,
} from "./services/NotificationsService";
import { useUserContext } from "./services/Context";
import { useReceiveLocalNotifications } from "./hooks/useReceiveLocalNotifications";
import TaskModal from "./common components/TaskModal";
import BedAndWakeBox from "./BedAndWakeBox";
import SetBedtimeModal from "./common components/SetBedtimeModal";
import { updateUserFields } from "./services/handleFirestore";
import SetWakeUpTimeModal from "./common components/SetWakeUpTimeModal";
import RepeatsButton from "./common components/RepeatsButton";
import MeetsSleepGoal from "./common components/MeetsSleepGoal";

const AlarmDetails: React.FC = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<string>("");
  const [bedtime, setBedtime] = useState<string>("");
  const [wakeTime, setWakeTime] = useState<string>("");

  const { userData } = useUserData();
  const currentUser = useUserContext();
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
    if (userData) {
      setBedtime(userData.generalSleepTime);
      setWakeTime(userData.generalWakeTime);
    }
  }, []);

  return (
    <>
      <ScrollView style={[{ flex: 1 }, styles.backgroundContainer]}>
        {/* Back and View All Header */}
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.replace("/(tabs)/Home")}>
            <Text style={{ color: colors.themeWhite }}>{"< "}Back</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        {/* Calendar Icon & Date */}
        <View style={styles.calendarAndDate}>
          <Image
            source={require("../assets/images/calendar.png")}
            style={styles.calendarIcon}
          />
          <Text style={styles.currentDateHeader}>
            {"  "}
            {today}
          </Text>
        </View>

        {/* main container */}
        <View style={styles.mainContainer}>
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
          <MeetsSleepGoal />
        </View>
        <View style={{ padding: 40 }}>
          <RepeatsButton
            setPopupOpen={setShowModal}
            repeats={"Every Day"}
            reminder={"5 minutes before"}
            editTimes={true}
            setShowModal={setShowModal}
          />
        </View>
      </ScrollView>
      {showNotification && <TaskModal setOpenModal={setShowNotification} />}

      {showModal === "set bed time" && (
        <SetBedtimeModal
          bedtime={bedtime}
          setBedTime={setBedtime}
          setShowModal={setShowModal}
        />
      )}
      {showModal === "set wake up time" && (
        <SetWakeUpTimeModal
          wakeTime={wakeTime}
          setWakeTime={setWakeTime}
          setShowModal={setShowModal}
        />
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
    marginTop: 20,
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
  tapToEditContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tapToEditText: {
    color: colors.themeWhite,
    fontSize: 12,
  },
  viewAllText: {
    color: colors.themeWhite,
    textAlign: "left",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default AlarmDetails;
