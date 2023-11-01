import * as Notifications from "expo-notifications";

export async function setupLocalNotifications(
  title: string,
  message: string,
  scheduledTime: number
): Promise<void> {
  // Request permissions to display local notifications
  const { granted } = await Notifications.requestPermissionsAsync();
  if (!granted) {
    console.log("Notification permissions denied.");
    return;
  }

  // Schedule local notifications
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
    },
    trigger: {
      seconds: scheduledTime,
      // trigger MUST be in seconds from now. Convert all scheduled times to seconds from now
    },
  });
  console.log(`Scheduled notification ${title} with ID: ${notificationId}`);
}
