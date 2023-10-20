import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { text } from "../utils/text";

const SleepLogMaker = ({ currentUser }) => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const handlePress = () => {
    console.log("new sleep log pressed");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.formContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SleepLogMaker;
const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
