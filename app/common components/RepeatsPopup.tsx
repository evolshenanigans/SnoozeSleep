import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { RepeatsCustomPopup } from "./RepeatsCustomPopup";
import { text } from "../utils/text";
import { colors } from "../utils/colors";

export const RepeatsPopup = ({ popupOpen, setPopupOpen, choice, setChoice }) => {
  const [customPopupOpen, setCustomPopupOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(choice);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.popupBg}>
        <View style={styles.menuContainer}>
          {/* ROWS
          exit
          title
          Everyday --- checkmark
          Weekdays --- checkmark
          Weekend ---- checkmark
          Custom ----- RepeatsCustomPopup
        */}
          <Pressable onPress={() => setPopupOpen(false)}>
            <Text style={styles.exitBtn}>{"\u2715"}</Text>
          </Pressable>
          <Text style={[text.heroText, { paddingBottom: 20 }]}>Alarm Repeats</Text>
          <Pressable
            onPress={() => setSelected("Everyday")}
            style={[
              styles.repeatsOption,
              selected == "Everyday"
                ? styles.repeatsOptionTrue
                : styles.repeatsOptionFalse,
            ]}
          >
            <Text style={{ color: colors.themeWhite }}>Everyday</Text>
            {selected == "Everyday" && (
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkMark}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => setSelected("Weekdays")}
            style={[
              styles.repeatsOption,
              selected == "Weekdays"
                ? styles.repeatsOptionTrue
                : styles.repeatsOptionFalse,
            ]}
          >
            <Text style={{ color: colors.themeWhite }}>Weekdays (Mon-Fri)</Text>
            {selected == "Weekdays" && (
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkMark}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => setSelected("Weekends")}
            style={[
              styles.repeatsOption,
              selected == "Weekends"
                ? styles.repeatsOptionTrue
                : styles.repeatsOptionFalse,
            ]}
          >
            <Text style={{ color: colors.themeWhite }}>Weekends</Text>
            {selected == "Weekends" && (
              <Image
                source={require("../../assets/images/check.png")}
                style={styles.checkMark}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              setPopupOpen(false);
              setChoice(selected);
            }}
          >
            <Text style={styles.doneBtn}>Done</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkMark: {
    height: 20,
    width: 20,
    tintColor: colors.themeWhite,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopWidth: 1000,
    borderTopColor: "rgba(240, 240, 240, 0.60)",
  },
  doneBtn: {
    marginTop: 15,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: colors.themePrimary,
    borderRadius: 100,
    width: 300,
    alignSelf: "center",
  },
  exitBtn: {
    color: colors.themeWhite,
    fontWeight: "bold",
    padding: 20,
    paddingRight: 40,
    alignSelf: "flex-end", // why not work
  },
  menuContainer: {
    display: "flex",
    paddingBottom: 40,
    paddingTop: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    // alignItems: "center",
    bottom: 0,
    left: 0,
    backgroundColor: colors.themeBackground,
    width: "100%",
  },
  optionFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  popupBg: {
    backgroundColor: "rgba(240, 240, 240, 0.60)",
  },
  repeatsOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 6,
    width: 300,
    borderRadius: 100,
    borderWidth: 2,
  },
  repeatsOptionFalse: {
    backgroundColor: colors.themeAccent4,
    borderColor: colors.themeAccent4,
  },
  repeatsOptionTrue: {
    backgroundColor: colors.themeSecondary,
    borderColor: colors.themePrimary,
  },
  trueText: {
    color: colors.themeWhite,
  },
});
