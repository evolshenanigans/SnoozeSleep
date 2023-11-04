import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { text } from "../utils/text";
import { colors } from "../utils/colors";
import { calculateTime } from "../services/handleTime";

const TimeSelector = ({ time, setTime }) => {
  /**
   * This component lets you set a time
   */
  const [hours, setHours] = useState<string>(time.split(" ")[0]);
  const [minutes, setMinutes] = useState<string>(time.split(" ")[1]);
  const [AMOrPM, setAMOrPM] = useState<string>(time.split(" ")[2]);

  const changeHours = (plusOrMinus: string) => {
    let newH: number =
      plusOrMinus === "+" ? (parseInt(hours) + 1) % 12 : (parseInt(hours) - 1) % 12;
    const displayH = newH === 0 ? "12" : newH < 10 ? `0${newH}` : `${newH}`;
    setHours(displayH);
  };

  const changeMinutes = (plusOrMinus: string) => {
    let newM: number =
      plusOrMinus === "+"
        ? (parseInt(minutes) + 1) % 60
        : (parseInt(minutes) - 1 + 60) % 60;

    const displayM = newM < 10 ? `0${newM}` : `${newM}`;
    // console.log(newM);
    setMinutes(displayM);
  };

  useEffect(() => {
    setTime(`${hours} ${minutes} ${AMOrPM}`);
  }, [hours, minutes, AMOrPM]);

  return (
    <>
      <View style={styles.timeSelectorContainer}>
        {/* 4 columns: HOURS, colon, MINUTES, AM/PM */}

        {/* COL 1: HOURS (rows: inc, hours, dec) */}
        <View style={styles.timeCol}>
          <Pressable onPress={() => changeHours("+")}>
            {/* Up arrow Symbol */}
            <Image
              source={require("../../assets/images/up.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
          {/* <Text style={styles.timeDisplay}>{hours}</Text> */}
          <TextInput
            style={styles.timeDisplay}
            placeholder={"00"}
            autoCapitalize="none"
            value={hours}
            keyboardType="numeric"
            onChangeText={(h: string) => {
              if (h.length <= 2 && (parseFloat(h) <= 12 || h == "")) {
                setHours(h);
              }
            }}
            // when they are done typing, if they entered a single digit num, add a leading 0
            onBlur={() => {
              if (hours.length === 1) {
                setHours(`0${hours}`);
              }
            }}
          />
          <Pressable onPress={() => changeHours("-")}>
            {/* Down arrow Symbol */}
            <Image
              source={require("../../assets/images/down.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
        </View>

        {/* COL 2: colon :) */}
        <Text style={[styles.timeCol, styles.colon]}>:</Text>

        {/* COL 3: MINUTES (rows: inc, minutes, dec) */}
        <View style={styles.timeCol}>
          <Pressable onPress={() => changeMinutes("+")}>
            {/* Up arrow Symbol */}
            <Image
              source={require("../../assets/images/up.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
          <TextInput
            style={styles.timeDisplay}
            placeholder={"00"}
            autoCapitalize="none"
            value={minutes}
            keyboardType="numeric"
            onChangeText={(m: string) => {
              if (m.length <= 2 && (parseFloat(m) <= 59 || m == "")) {
                setMinutes(m);
              }
            }}
            // when they are done typing, if they entered a single digit num, add a leading 0
            onBlur={() => {
              if (minutes.length === 1) {
                setMinutes(`0${minutes}`);
              }
            }}
          />
          <Pressable onPress={() => changeMinutes("-")}>
            {/* Down arrow Symbol */}
            <Image
              source={require("../../assets/images/down.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
        </View>
        <Text> </Text>

        {/* COL 4: AM/PM (rows: toggle, AM/PM, toggle) */}
        <View style={styles.timeCol}>
          <Pressable onPress={() => setAMOrPM((a) => (a === "AM" ? "PM" : "AM"))}>
            {/* Up arrow Symbol */}
            <Image
              source={require("../../assets/images/up.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
          <Text style={styles.timeDisplay}>{AMOrPM}</Text>
          <Pressable onPress={() => setAMOrPM((a) => (a === "AM" ? "PM" : "AM"))}>
            {/* Down arrow Symbol */}
            <Image
              source={require("../../assets/images/down.png")}
              style={styles.arrowToggle}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default TimeSelector;

const styles = StyleSheet.create({
  arrowToggle: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  colon: {
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "bold",
  },
  timeCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timeDisplay: {
    fontSize: 20,
  },
  timeSelectorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.themeWhite,
    borderRadius: 20,
    padding: 10,
  },
});
