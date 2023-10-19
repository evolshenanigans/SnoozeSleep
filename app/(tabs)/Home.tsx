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
import TaskList from "../screens/TaskList";
import { UserProps } from "../types/componentTypes";
import { colors } from "../utils/colors";
import * as Brightness from "expo-brightness";
import { Link } from "expo-router";

const getNext14Days: () => { day: string; date: number }[] = () => {
  const abbreviatedDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const today = new Date();
  return Array.from({ length: 14 }).map((_, index) => {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + index);
    return {
      day: abbreviatedDays[nextDate.getDay()],
      date: nextDate.getDate(), // Gets the day of the month
    };
  });
};

const todayDate = new Date().getDate(); //Current Date

const Home: React.FC<UserProps> = ({ currentUser }) => {
  const { userData } = useUserData(currentUser ? currentUser.email : null);
  const dayRef: string[] = ["sun", "mon", "tues", "wednes", "thurs", "fri", "satur"];
  const today = new Date();
  const dayOfWeek = dayRef[today.getDay()];

  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [bedtime, setBedtime] = useState<string>("");

  const [isWakeUpEnabled, setIsWakeUpEnabled] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState("7:00 AM");
  const days = getNext14Days();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  useEffect(() => {
    if (userData) {
      let time = userData[`generalSleepTime`];
      // calls calculateTime which converts the time stored in db to human readable 12H format
      // also accepts argument for # hours to add to the given time
      setBedtime(calculateTime(time) || "");
      setWakeUpTime(calculateTime(time, userData.sleepDurationGoal) || "");
    }
  }, [userData]);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsBedtimeEnabled((previousState) => {
      const newBrightness = previousState ? 1 : 0.1; // switch between 10% and 100% brightness
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
      <Text style={styles.currentMonthText}>{currentMonth}</Text>
      <FlatList
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.dayContainer,
              {
                backgroundColor: item.date === todayDate ? "#534992" : "#212121",
              },
            ]}
          >
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.sleepscheduletext}>Sleep Schedule</Text>
        <View style={styles.goalContainer}>
          <Image
            source={require("../../assets/images/sleep_white.png")}
            style={styles.icon}
          />
          <Text style={styles.goalText}>
            {userData
              ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} hours`
              : "Loading..."}
          </Text>
          <Image
            source={require("../../assets/images/editwhite.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.container}>
          <View style={[styles.switchContainer, styles.bedtimeContainer]}>
            <Image
              source={require("../../assets/images/blue_moon.png")}
              style={styles.icon}
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
          <View style={[styles.switchContainer, styles.wakeUpContainer]}>
            <Image
              source={require("../../assets/images/sunyellow.png")}
              style={styles.icon}
            />
            <Text style={styles.timeText}>Wake Up</Text>
            <Text style={styles.timetime}>{wakeUpTime}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#686868" }}
              thumbColor={isWakeUpEnabled ? "#9174D0" : "#f4f3f4"}
              onValueChange={() => setIsWakeUpEnabled(!isWakeUpEnabled)}
              value={isWakeUpEnabled}
              style={styles.switches}
            />
          </View>
        </View>
        <View style={styles.challengesContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Challenges</Text>
          </View>
          <Text style={styles.message}>You currently have no challenges</Text>
          <Link href="/Challenges" style={styles.button}>
            {/* <TouchableOpacity  onPress={() => {}}> */}
            <Text style={styles.buttonText}>Add a Challenge</Text>
            {/* </TouchableOpacity> */}
          </Link>
        </View>
        <View style={styles.challengesContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Night Routine</Text>
          </View>

          {/* TASKS COMPONENT */}
          <TaskList currentUser={currentUser} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: colors.background,
  },
  bedtimeContainer: {
    backgroundColor: "#252A49",
  },
  button: {
    backgroundColor: "#9174D0",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: 240,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  challengesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: colors.textWhite,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  dayContainer: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "#212121",
    marginHorizontal: 5,
    width: 54,
    height: 58,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    color: colors.textWhite,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  goalText: {
    fontSize: 20,
    textAlign: "center",
    color: colors.textWhite,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textWhite,
    textAlign: "left", // Align text to the left
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },
  switchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    margin: 20,
    backgroundColor: "#252A49",
  },
  timeText: {
    fontSize: 12,
    marginBottom: 10,
    color: colors.textWhite,
  },
  timetime: {
    fontSize: 16,
    color: colors.textWhite,
  },
  wakeUpContainer: {
    backgroundColor: "#252A49",
  },
  currentMonthText: {
    color: "#f2f2f2",
    // fontFamily: 'inter',
    fontSize: 18,
    textAlign: "left",
    marginBottom: 0,
    marginLeft: 7,
  },
  sleepscheduletext: {
    color: "#f2f2f2",
    // fontFamily: 'inter',
    fontSize: 18,
    textAlign: "left",
    marginBottom: 0,
    marginLeft: 7,
    marginTop: 30,
  },
  switches: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], // Scaling to 1.5 times the original size
  },
});

export default Home;
