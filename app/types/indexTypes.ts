export type User = {
  username: string;
  email: string;
  birthday: string;
  enableNotifications: boolean;
  sleepStreak: number;
  sleepReminderOffset: number;
  soundChoice: string;
  soundOn: boolean;
  userIsNew: boolean;
  vibrationOn: boolean;
  sleepDurationGoal: number;
  generalSleepTime: string;
  generalWakeTime: string;
  sundaySleepTime: string;
  mondaySleepTime: string;
  tuesdaySleepTime: string;
  wednesdaySleepTime: string;
  thursdaySleepTime: string;
  fridaySleepTime: string;
  saturdaySleepTime: string;
};

export type UserFields = {
  username?: string;
  email?: string;
  birthday?: string;
  enableNotifications?: boolean;
  sleepStreak?: number;
  sleepReminderOffset?: number;
  soundChoice?: string;
  soundOn?: boolean;
  userIsNew?: boolean;
  vibrationOn?: boolean;
  sleepDurationGoal?: number;
  generalSleepTime?: string;
  generalWakeTime?: string;
  sundaySleepTime?: string;
  mondaySleepTime?: string;
  tuesdaySleepTime?: string;
  wednesdaySleepTime?: string;
  thursdaySleepTime?: string;
  fridaySleepTime?: string;
  saturdaySleepTime?: string;
};

export type Task = {
  taskTitle: string;
  taskStartTime: string;
  taskDuration: number;
  enableNotification: boolean;
  isComplete: boolean;
};

export type Challenge = {
  challengeTitle: string;
  challengeStartDate: string;
  isComplete: boolean;
  isCurrent: boolean;
  isSaved: boolean;
};

export type AppNavProps = {
  currentUser: any;
  setCurrentUserIsNew: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserDataResponse = {
  userData: User | any;
  tasks: Task[] | any;
  challenges: Challenge[] | any;
};
