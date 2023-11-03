import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
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

export async function setupLocalNotifications(
  title: string,
  message: string,
  scheduledTime: number,
  // data: Record<string, any>,
  subtitle?: string
): Promise<void> {
  // Request permissions to display local notifications
  const { granted } = await Notifications.requestPermissionsAsync();
  if (!granted) {
    console.log("(NotificationsService) Notification permissions denied.");
    return;
  }

  // Schedule local notifications
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      subtitle: subtitle || "SnoozeSense",
      // data: data,
      color: "#9174D0",
    },
    trigger: {
      seconds: scheduledTime,
      // trigger MUST be in seconds from now. Convert all scheduled times to seconds from now
    },
  });
  console.log(
    `(NotificationsService) Scheduled notification ${title} with ID: ${notificationId}`
  );
}
