interface NotificationOptions {
  notificationTitle: string;
  notificationMessage: string;
  triggerHour: number;
  triggerMinute: number;
  notificationType: string;
  weekday?: number;
  relevantData?: Record<string, any>;
  subtitle?: string;
}
