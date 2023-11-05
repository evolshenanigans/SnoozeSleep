import React, { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useReceiveLocalNotifications = () => {
  const [notification, setNotification] = useState<Notifications.Notification | null>();

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notif) => {
      setNotification(notif);
    });
    return () => {
      subscription.remove();
    };
  }, [setNotification]);
  return { notification };
};
