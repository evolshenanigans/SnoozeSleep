import React, { useState } from "react";
import { View, Text, Button, Pressable, StyleSheet, ScrollView } from "react-native";
import { text } from "../utils/text";
import { colors } from "../utils/colors";

export const RepeatsCustomPopup = ({ popupOpen, setPopupOpen }) => {
  const [customPopupOpen, setCustomPopupOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
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
          <Pressable onPress={() => setSelected("everyday")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "everyday"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Everyday{selected === "everyday" && ` \u2713`}
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("weekday")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "weekday"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Weekday{selected === "weekday" && ` \u2713`}
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("weekend")}>
            <Text
              style={[
                styles.repeatsOption,
                selected == "weekend"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse,
              ]}
            >
              Weekend{selected === "weekend" ? ` \u2713` : "  "}
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
    // borderTopWidth: 1000,
    // borderTopColor: "rgba(240, 240, 240, 0.76)",
    // borderWidth: 1000,
    // backgroundColor: "red",
    // backgroundColor: "rgba(240, 240, 240, 0.76)",
  },
  doneBtn: {
    paddingVertical: 10,
    paddingHorizontal: 100,
    backgroundColor: colors.mainButton,
    borderRadius: 100,
  },
  exitBtn: {
    color: colors.textWhite,
    alignItems: "flex-end",
    fontWeight: "bold",
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
    backgroundColor: "rgba(240, 240, 240, 0.76)",
  },
  repeatsOption: {
    color: colors.textWhite,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    borderRadius: 100,
    borderWidth: 2,
  },
  repeatsOptionFalse: {
    backgroundColor: colors.themeAccent4,
    borderColor: "transparent",
  },
  repeatsOptionTrue: {
    backgroundColor: colors.secondaryButton,
    borderColor: colors.mainButton,
  },
});
