import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils/colors";
import useUserData from "../hooks/useUserData";
import moment from "moment";

const TimeTilBedtime = () => {
  const [bedtimeH, setBedtimeH] = useState<number>(0);
  const [bedtimeM, setBedtimeM] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const today = new Date();
  const { userData } = useUserData();

  useEffect(() => {
    if (userData) {
      // this is the only part of this component that rlly matters.
      // calculates the number of seconds between now and the next sleep time.
      let [h, m, p] = userData.generalSleepTime.split(" ");
      setBedtimeH(p === "PM" ? (parseInt(h) + 12).toString() : h);
      setBedtimeM(m);

      let a = moment();
      let b = moment([
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        bedtimeH,
        bedtimeM,
      ]);
      setDiff(Math.abs(a.diff(b, "seconds")));
    }
  }, [userData]);

  return (
    <View>
      <Text style={styles.timeText}>
        Bedtime starts{" "}
        {moment([
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          bedtimeH,
          bedtimeM,
        ]).fromNow()}{" "}
        (which is {diff} seconds)
      </Text>
    </View>
  );
};

export default TimeTilBedtime;

const styles = StyleSheet.create({
  timeText: {
    fontSize: 12,
    marginBottom: 10,
    color: colors.themeWhite,
    alignSelf: "center",
  },
});
