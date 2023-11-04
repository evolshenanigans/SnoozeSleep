interface NotificationOptions {
  title: string;
  message: string;
  hour: number;
  minute: number;
  weekday: number;
  relevantData?: Record<string, any>;
  subtitle?: string;
}
