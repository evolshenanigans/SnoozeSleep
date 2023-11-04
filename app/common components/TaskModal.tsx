import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { commonStyles } from "../utils/commonStyles";
import { colors } from "../utils/colors";
import * as Notifications from "expo-notifications";
import { updateTask } from "../services/handleFirestore";
import { useUserContext } from "../services/Context";

type NotifModalProps = {
  notif: Notifications.Notification;
  setOpenModal: Function;
};

const TaskModal: React.FC<NotifModalProps> = ({ notif, setOpenModal }) => {
  const currentUser = useUserContext();
  const title = notif.request.content.title;
  const handleYes = () => {
    updateTask(currentUser.email, title, { isComplete: true });
    setOpenModal(false);
  };
  const handleNo = () => {
    setOpenModal(false);
  };
  return (
    <View style={commonStyles.modalPositioning}>
      <View style={commonStyles.modalOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Did you start your task '{title}'?</Text>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themeSecondary }]}
            onPress={handleNo}
          >
            <Text style={{ color: colors.themeWhite }}>Start in 5 minutes</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themePrimary }]}
            onPress={handleYes}
          >
            <Text>Yes, I did</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TaskModal;

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
