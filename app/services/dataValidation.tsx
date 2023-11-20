/***********************************
 *           VALIDATIONS            *
 ***********************************/

export const userFieldsReference = {
  username: "string",
  email: "string",
  birthday: "string",
  enableNotifications: "boolean",
  sleepStreak: "number",
  sleepReminderOffset: "number",
  soundChoice: "string",
  soundOn: "boolean",
  userIsNew: "boolean",
  vibrationOn: "boolean",
  sleepDurationGoal: "number",
  lastKnownBrightness: "number",
  generalSleepTime: "string",
  generalWakeTime: "string",
  sundaySleepTime: "string",
  mondaySleepTime: "string",
  tuesdaySleepTime: "string",
  wednesdaySleepTime: "string",
  thursdaySleepTime: "string",
  fridaySleepTime: "string",
  saturdaySleepTime: "string",
};

export const taskReference = {
  taskTitle: "string",
  taskStartTime: "string",
  repeats: "string",
  reminder: "string",
  isComplete: "boolean",
};

export const challengeReference = {
  challengeTitle: "string",
  challengeStartDate: "string", // can be empty string
  isComplete: "boolean",
  isCurrent: "boolean",
  isSaved: "boolean",
};

export const notificationReference = {
  notificationTitle: "string",
  notificationMessage: "string",
  triggerHour: "number",
  triggerMinute: "number",
  notificationType: "string",
};

export const sleepLogReference = {
  sleepLogDate: "string",
  userCompletedEverything: "boolean",
};

export const validateObjToUpdate = (objToUpdate, fieldsReference) => {
  /* 
      Validates that the field exists on the user object and is the correct data type.
    */

  for (const key in objToUpdate) {
    // check if key is in the available data
    if (key in fieldsReference) {
      // check if the data type is the same
      if (typeof objToUpdate[key] !== fieldsReference[key]) {
        return `Invalid data type for key "${key}". "${key}" is a ${fieldsReference[key]}.`;
      }
      // if you are trying to set a time, it should be formatted HH MM AA where HH is 1 or 2 numbers and AA is AM or PM
      if (key.endsWith("Time")) {
        const timeRegex = /^\d{1,2} \d{2} [apAP][mM]$/;
        if (!timeRegex.test(objToUpdate[key])) {
          return `Invalid value for key ${key}. ${key} should be a string of "HH MM AA" where HH is 1 or 2 numbers and AA is AM or PM`;
        }
      }
      if (key.endsWith("Date")) {
        const dateRegex = /^(0[1-9]|1[0-2]) (0[1-9]|[12][0-9]|3[01]) \d{4}$/;
        if (!dateRegex.test(objToUpdate[key])) {
          return `Invalid value for key ${key}. ${key} should be a string of "DD MM YYYY"`;
        }
      }
    } else {
      return `"${key}" field does not exist.`;
    }
  }
  return null;
};

export const validateObjToAdd = (objToAdd, subcollection) => {
  /* 
      Validates that ALL task fields exist.
    */
  let reference;
  if (subcollection === "task") {
    reference = taskReference;
  } else if (subcollection === "challenge") {
    reference = challengeReference;
  }
  const timeRegex = /^\d{1,2} \d{2} [apAP][mM]$/;
  for (const field of Object.keys(reference)) {
    if (!objToAdd.hasOwnProperty(field)) {
      return `${subcollection} to add is missing field: ${field}.`;
    } else if (field.endsWith("Time")) {
      // extra validation for time objects
      if (!timeRegex.test(objToAdd[field])) {
        return `Invalid value for field ${field}. ${field} should be a string of "HH MM AA" where HH is 1 or 2 numbers and AA is AM or PM`;
      }
    }

    if (typeof objToAdd[field] !== reference[field]) {
      return `Data type invalid for field ${field}. ${field} is a ${reference[field]}.`;
    }
  }
  return null;
};
