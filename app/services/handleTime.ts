export const calculateTime = (
  time: string,
  hoursToAdd?: number,
  minutesToAdd?: number
) => {
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

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${period}`;
  } catch (error) {
    console.log("There was an error calculating time.");
  }
};

export const calculateTimeWithSubtraction = (
  time: string,
  hoursToSubtract?: number,
  minutesToSubtract?: number
) => {
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

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${period}`;
  } catch (error) {
    console.log("There was an error subtracting time.");
  }
};
