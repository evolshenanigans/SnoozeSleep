import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable, StyleSheet, ScrollView } from "react-native";
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
          <Text style={text.heroText}>Alarm Repeats</Text>
          <Pressable onPress={() => setSelected("Everyday")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "Everyday"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Everyday{selected === "Everyday" && ` \u2713`}
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("Weekdays")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "Weekdays"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Weekdays{selected === "Weekdays" && ` \u2713`}
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("Weekends")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "Weekends"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Weekends{selected === "Weekends" ? ` \u2713` : "  "}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCustomPopupOpen(true);
              setSelected("custom");
            }}
          >
            <Text
              style={[
                styles.repeatsOption,
                selected == "custom"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Custom {`\u3009`}
            </Text>
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
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopWidth: 1000,
    borderTopColor: "rgba(240, 240, 240, 0.60)",
  },
  doneBtn: {
    marginTop: 10,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: colors.mainButton,
    borderRadius: 100,
    width: 300,
  },
  exitBtn: {
    color: colors.textWhite,
    fontWeight: "bold",
    paddingBottom: 20,
    alignSelf: "flex-end", // why not work
  },
  menuContainer: {
    display: "flex",
    paddingBottom: 40,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    left: 0,
    backgroundColor: colors.background,
    width: "100%",
  },
  popupBg: {
    backgroundColor: "rgba(240, 240, 240, 0.60)",
  },
  repeatsOption: {
    color: colors.textWhite,
    padding: 10,
    marginVertical: 8,
    width: 300,
    borderRadius: 100,
    borderWidth: 2,
  },
  repeatsOptionFalse: {
    backgroundColor: colors.themeAccent4,
    borderColor: colors.themeAccent4,
  },
  repeatsOptionTrue: {
    backgroundColor: colors.secondaryButton,
    borderColor: colors.mainButton,
  },
});
