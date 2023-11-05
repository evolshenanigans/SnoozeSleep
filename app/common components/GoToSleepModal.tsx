import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { commonStyles } from "../utils/commonStyles";
import { colors } from "../utils/colors";
import * as Notifications from "expo-notifications";
import { updateTask } from "../services/handleFirestore";
import { useUserContext } from "../services/Context";
import { useReceiveLocalNotifications } from "../hooks/useReceiveLocalNotifications";

type NotifModalProps = {
  setOpenModal: Function;
};

const GoToSleepModal: React.FC<NotifModalProps> = ({ setOpenModal }) => {
  const currentUser = useUserContext();
  const { notification: notif } = useReceiveLocalNotifications();
  const title = notif.request.content.title;
  const handleYes = () => {
    setOpenModal("");
  };
  const handleNo = () => {
    setOpenModal("");
  };
  return (
    <View style={commonStyles.modalPositioning}>
      <View style={commonStyles.modalOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Are you about to go to sleep?</Text>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themeSecondary }]}
            onPress={handleNo}
          >
            <Text style={{ color: colors.themeWhite }}>Sleep in 5 minutes</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themePrimary }]}
            onPress={handleYes}
          >
            <Text>Yes, I am!</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GoToSleepModal;

const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.themeBackground,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: colors.themeSecondary,
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    paddingHorizontal: 40,
    color: colors.themeWhite,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 20,
  },
});
