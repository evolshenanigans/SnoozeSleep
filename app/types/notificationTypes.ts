interface NotificationOptions {
  notificationTitle: string;
  notificationMessage: string;
  triggerHour: number;
  triggerMinute: number;
  weekday?: number;
  relevantData?: Record<string, any>;
  subtitle?: string;
}
