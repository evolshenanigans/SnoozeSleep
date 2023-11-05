/**
 * OVERVIEW:
 * This file contains all functions relating to scheduling recurring notifications.
 * Note that it is possible to make one-off notifications, but this file doesn't do that (yet)
 * Available functions:
 *
 * setupRecurringNotification ({ title, message, hour, minute, weekday?, relevantData?, subtitle?} )
 *    - Sets up a notification that recurs weekly at the specified time and on the specified day.
 *    - Day is a number from 1 - 7 with 1 being Sunday.
 *    - relevantData object will not be presented to the user
 *
 * cancelScheduledNotifications()
 *    - cancels ALL scheduled notifications
 *
 * getAllNotifications()
 *    - console.logs a list of all notifications. Also returns that list.
 *
 * registerForPushNotificationsAsync()
 *    - asks user for notif permission and acquires token etc.
 *
 */

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { colors } from "../utils/colors";
import { UserNotification } from "../types/indexTypes";

export async function setupRecurringNotification(
  options: NotificationOptions
): Promise<string> {
  /**
   * This function sets up a notification at a specified time
   */

  // Schedule local notifications
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: options.notificationTitle,
      body: options.notificationMessage,
      subtitle: options.subtitle || "SnoozeSense",
      data: { notificationType: options.notificationType },
      color: colors.themePrimary,
      sound: "custom",
      // sound didn't work this way.
      categoryIdentifier: "action 1",
    },
    trigger: {
      hour: options.triggerHour,
      minute: options.triggerMinute,
      repeats: true, // if repeats are true and no type is specified, it goes daily.
      // type: "weekly",
      // weekday: options.weekday,
    },
  });
  console.log(
    `(NotificationsService) Notification '${options.notificationTitle}' scheduled for ${options.triggerHour}:${options.triggerMinute} every day.`
  );
  // await Notifications.setNotificationCategoryAsync("action 1", [
  //   { buttonTitle: "Button 1", identifier: "Which action" },
  // ]);
  return notificationId;
}

export async function cancelScheduledNotifications() {
  console.log("(NotificationService) Cancelling all scheduled notifs.");
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function reinstateCurrentUserNotifications(notifications) {
  await cancelScheduledNotifications();
  notifications.map((n: UserNotification) => {
    setupRecurringNotification({
      notificationMessage: n.notificationMessage,
      notificationTitle: n.notificationTitle,
      triggerHour: n.triggerHour,
      triggerMinute: n.triggerMinute,
      notificationType: n.notificationType,
    });
  });
}

export async function getAllNotifications() {
  Notifications.getAllScheduledNotificationsAsync().then((notifs) => {
    if (notifs.length > 0) {
      notifs.forEach((notif) =>
        // console.log(notif.identifier, notif.content.title, notif.trigger)
        console.log(notif.content.title, notif.trigger)
      );
      return notifs;
    } else {
      console.log("(NotificationsService) No notifications scheduled!");
      return null;
    }
  });
}

export async function setNotificationCategory(identifier, actions, options?) {
  await Notifications.setNotificationCategoryAsync(identifier, actions, options || {});
}

export async function registerForPushNotificationsAsync() {
  /**
   * This function sets up registration for notifications, asking permission & generating
   * a new push notification token etc
   */
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#9174D0",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    // console.log("(NotificationsService) token:", token);
  } else {
    alert("(NotificationsService) Must use physical device for Push Notifications");
  }

  return token;
}
