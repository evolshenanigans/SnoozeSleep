import { View, Text, Image, Pressable, Switch, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "./utils/colors";
import useUserData from "./hooks/useUserData";
import * as Brightness from "expo-brightness";
import { updateUserFields } from "./services/handleFirestore";
import { useUserContext } from "./services/Context";
import { calculateLengthOfRange, calculateTime } from "./services/handleTime";
import { reinstateCurrentUserNotifications } from "./services/NotificationsService";
import { Link, useRouter } from "expo-router";
import SetBedtimeModal from "./common components/SetBedtimeModal";

const BedAndWakeBox = () => {
  const [bedtime, setBedtime] = useState<string>("8:00 PM");
  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [isWakeUpEnabled, setIsWakeUpEnabled] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState<string>("7:00 AM");
  const { userData, notifications } = useUserData();
  const currentUser = useUserContext();
  const router = useRouter();

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
          time: userData.generalWakeTime,
          leadingZero: false,
          whoCalls: "homeWakeup",
        }) || ""
      );
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
      <View style={styles.scheduleBoxesContainer}>
        <Pressable style={styles.switchBox} onPress={() => router.push("/AlarmDetails")}>
          <Image
            source={require("../assets/images/blue_moon.png")}
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
        </Pressable>
        <Pressable style={styles.switchBox} onPress={() => router.push("/AlarmDetails")}>
          <Image
            source={require("../assets/images/sunyellow.png")}
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
        </Pressable>
      </View>
    </>
  );
};

export default BedAndWakeBox;

const styles = StyleSheet.create({
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
  switchBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: 120,
    height: 120,
    // paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.themeAccent4,
  },
  switches: {
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }], // Scaling to 1.5 times the original size
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
});
