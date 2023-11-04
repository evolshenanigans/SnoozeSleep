/*
  OVERVIEW: 
  This file handles everything related to time and time conversion. Here are available fns,.
    
  formatTimeForDB = (time: string)
    - accepts time string and attempts to convert it to db-compatible format
    - namely, removes :, adds leading 0s if necessary, and converts am/pm to uppercase AM/PM
  
  calculateTime = ({ time: string, hoursToAdd?: number, minutesToAdd?: number, leadingZero?: bool })
    - accepts time in DB recieved format "HH MM PM"
    - optionally accepts hours and minutes to ADD to given time & option to leave out leading-0s
    - returns time in human-readable 12-h format "HH:MM PM" or "H:MM PM" 

  calculateTimeWithSubtraction = ({ time: string, hoursToSubtract?: number, minutesToSubtract?: number, leadingZero?: bool })
    - accepts time in DB recieved format "HH MM PM"
    - optionally accepts hours and minutes to SUBTRACT to given time & option to leave out leading-0s
    - returns time in human-readable 12-h format "HH:MM PM" or "H:MM PM" 
  
  calculateSecondsFromNow = ({ scheduledTime })
    - accepts a time in the future
    - returns the number of seconds from now to that time.

 */

type CalculateSubProps = {
  time: string;
  hoursToSubtract?: number;
  minutesToSubtract?: number;
  leadingZero?: boolean;
  whoCalls?: string;
};
type CalculateAddProps = {
  time: string;
  hoursToAdd?: number;
  minutesToAdd?: number;
  whoCalls?: string;
  leadingZero?: boolean;
};

export const formatTimeForDB = (time: string) => {
  const regex = /^(0[1-9]|1[0-2])\s[0-5][0-9]\s[APap][Mm]$/;

  if (regex.test(time)) {
    // The time is already in the correct format, return it.
    return time;
  } else {
    // Attempt to convert "HH:MM PM" or "H:MM PM" format to "HH MM PM" format.
    const match = time.match(/^(\d{1,2}):([0-5][0-9])\s([APap][Mm])$/i);

    if (match) {
      let hour = match[1];
      if (hour.length === 1) {
        hour = `0${hour}`; // Add a leading zero for single-digit hours.
      }
      const minute = match[2];
      const period = match[3].toUpperCase(); // Convert to uppercase (AM/PM).

      return `${hour} ${minute} ${period}`;
    }

    // Return null if the input format is not recognized.
    return null;
  }
};

export const calculateTime = ({
  time,
  hoursToAdd = 0,
  minutesToAdd = 0,
  leadingZero = true,
  whoCalls = "",
}: CalculateAddProps): string => {
  try {
    let [hours, minutes, period] = time.split(" ");
    // PLAN:
    // if there's hours to add, do that first
    //  -> add addHours to hours
    // if there are minutes to add, do that second
    //  -> add addMinutes to minutes
    //  -> if the resulting minutes are > 60, subtract 60 minutes & add 1 to hours
    // if the resulting hours are > 12, subtract 12 and swap AM & PM
    // if the original hours were 12 don't swap AM and PM
    const origHours = parseInt(hours);
    hours = hoursToAdd ? (parseInt(hours) + hoursToAdd).toString() : hours;
    if (minutesToAdd) {
      minutes = (parseInt(minutes) + minutesToAdd).toString();
      if (parseInt(minutes) >= 60) {
        minutes = (parseInt(minutes) - 60).toString();
        hours = (parseInt(hours) + 1).toString();
      }
    }
    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    }
    if (origHours !== 12 && hoursToAdd > 0) {
      period = period === "AM" ? "PM" : "AM";
    }
    if (parseInt(minutes) === 60) {
      minutes = "00";
    }

    return `${leadingZero ? hours.padStart(2, "0") : parseInt(hours)}:${minutes.padStart(
      2,
      "0"
    )} ${period}`;
  } catch (error) {
    console.log(`(${whoCalls})(handleTime) There was an error calculating time.`);
  }
};

export const calculateTimeWithSubtraction = ({
  time,
  hoursToSubtract = 0,
  minutesToSubtract = 0,
  leadingZero = true,
  whoCalls = "",
}: CalculateSubProps): string => {
  // PLAN:
  // if there are hours to subtract, do that first
  //  -> subtract the subHours from hours
  // if there are minutes to subtract, do that second
  //  -> subtract the subMinutes from minutes
  //  -> if the resulting minutes are < 0, add 60 to minutes & subtract 1 from hours
  // if hours result is less than 0, add 12 and swap AM and PM
  // if hours result is exactly 0, change it to 12.
  try {
    let [hours, minutes, period] = time.split(" ");
    hours = hoursToSubtract ? (parseInt(hours) - hoursToSubtract).toString() : hours;
    if (minutesToSubtract) {
      minutes = (parseInt(minutes) - minutesToSubtract).toString();
      if (parseInt(minutes) < 0) {
        minutes = (parseInt(minutes) + 60).toString();
        hours = (parseInt(hours) - 1).toString();
      }
    }
    if (parseInt(hours) < 0) {
      hours = (parseInt(hours) + 12).toString();
      period = period === "AM" ? "PM" : "AM";
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }
    if (parseInt(minutes) === 60) {
      minutes = "0";
    }

    return `${leadingZero ? hours.padStart(2, "0") : parseInt(hours)}:${minutes.padStart(
      2,
      "0"
    )} ${period}`;
  } catch (error) {
    console.log(`(${whoCalls})(handleTime) There was an error subtracting time.`);
  }
};

export const calculateSecondsFromNow = ({ scheduledTime }) => {
  // accepts scheduledTime in HH MM PM format only
  let [_, h, m, ampm] = scheduledTime.match(/^(\d{1,2})\s([0-5][0-9])\s([APap][Mm])$/i);
  if (ampm.toUpperCase() == "PM") {
    h += 12;
  }
  const scheduledTimeFormatted = `${h}:${m}:00`;
  const currentTime = new Date();
  const scheduledTimeDate = new Date(scheduledTimeFormatted);
  const timeDiff = scheduledTimeDate.getTime() - currentTime.getTime();

  if (timeDiff <= 0) {
    console.log("Scheduled time is in the past.");
    return;
  }
  return timeDiff;
};
