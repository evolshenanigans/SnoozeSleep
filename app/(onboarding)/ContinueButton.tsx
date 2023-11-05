import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { colors } from "../utils/colors";

const ContinueButton = ({ activeCondition, onPressFn }) => {
  return (
    <Pressable onPress={onPressFn}>
      <View
        style={{
          ...styles.button,
          backgroundColor: activeCondition ? colors.themePrimary : colors.themeInactive,
        }}
      >
        <Text style={{ color: colors.themeBlack }}>Continue</Text>
      </View>
    </Pressable>
  );
};

export default ContinueButton;
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 30,
  },
});
