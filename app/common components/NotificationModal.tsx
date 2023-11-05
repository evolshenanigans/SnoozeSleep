import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { commonStyles } from "../utils/commonStyles";
import { colors } from "../utils/colors";
import * as Notifications from "expo-notifications";

type NotifModalProps = {
  notif: Notifications.Notification;
  setOpenModal: Function;
};

const NotificationModal: React.FC<NotifModalProps> = ({ notif, setOpenModal }) => {
  const notifType = notif.request.content.data.notificationType;
  const title = notif.request.content.title;
  return (
    <View style={commonStyles.modalPositioning}>
      <View style={commonStyles.modalOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>
            {notifType === "task" && `Did you start your task '${title}'?`}
            {notifType === "bedtime" && `Time to sleep!`}
            {notifType === "wake" && `Rise and Shine!`}
          </Text>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themeSecondary }]}
            onPress={() => setOpenModal(false)}
          >
            <Text style={{ color: colors.themeWhite }}>
              {notifType === "task" && `Start in 5 minutes`}
              {notifType === "bedtime" && `5 more minutes`}
              {notifType === "wake" && `5 more minutes`}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: colors.themePrimary }]}
            onPress={() => setOpenModal(false)}
          >
            {notifType === "task" && <Text>Yes, I did</Text>}
            {notifType === "bedtime" && <Text>I will sleep now</Text>}
            {notifType === "wake" && <Text>I am awake</Text>}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NotificationModal;

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
