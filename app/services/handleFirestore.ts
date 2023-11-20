/*
  OVERVIEW:
  This file contains most things that have to do with reading and writing to the Firestore database.
  Available functions and their parameters and descriptsions are as follows:

  createNewUserWithDefaultValues
      - Creates a new user in db with userID of the provided email address 
      - Adds all fields with default values

  updateUserFields = (email, objToUpdate)
      - Validates and merges the object you provide with the data of user with the provided email
      - You can include 1 to all fields that you want to update in the object

  addTask = (email, taskToAdd)
  addChallenge = (email, challengeToAdd)
  addNotification = (email, notificationToAdd)
  addSleepLog = (email, sleepLogToAdd)
      - all add functions validate your object and add a NEW item to the list of the user with the provided email
      - Object you provide must include ALL necessary fields (it'll tell you if it's missing something)
      - DOES NOT create duplicates for two tasks(/challenges) with the same title. 
         -> If there's already an entry with the given title, it updates that entry with the new values and does not add a new one (TODO: change this?)
  
  updateTask = (email, taskTitle, taskObjToUpdate)
  updateChallenge = (email, challengeTitle, challengeObjToUpdate)
  updateNotification = (email, notificationTitle, notificationObjToUpdate)
  updateSleepLog = (email, sleepLogTitle, sleepLogObjToUpdate)
      - all update fns validate your object and merge the provided data object with the item data that has the provided title (belonging to user with the provided email)
      - You can include between 1 & ALL fields that you want to update in the object
      - invalid fields will be rejected, and it'll tell u what's wrong

  deleteTask = (email, taskTitle)
  deleteChallenge = (email, challengeTitle)
  deleteNotification = (email, notificationTitle)
  deleteSleepLog = (email, sleepLogTitle)
      - All delete functions attempt to delete the item with the given title.
*/

import { User } from "../types/indexTypes";
import { FIREBASE_DB } from "./FirebaseConfig";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  userFieldsReference,
  taskReference,
  challengeReference,
  notificationReference,
  sleepLogReference,
  validateObjToUpdate,
  validateObjToAdd,
} from "./dataValidation";

const db = FIREBASE_DB;

/***********************************
 *    USEABLE FUNCTIONS            *
 ***********************************/
export const createNewUserWithDefaultValues = async (username: string, email: string) => {
  /* 
    Creates a new user with a userID of their email address. Fills in default values. 
  */
  try {
    await setDoc(doc(db, "users", email.toLowerCase()), {
      username: username,
      email: email.toLowerCase(),
      birthday: "01 1990",
      enableNotifications: true,
      sleepStreak: 0,
      sleepReminderOffset: 20,
      soundChoice: "",
      soundOn: true,
      vibrationOn: true,
      userIsNew: true,
      sleepDurationGoal: 8,
      lastKnownBrightness: 0.5,
      generalSleepTime: "10 00 PM",
      generalWakeTime: "06 00 AM",
      sundaySleepTime: "10 00 PM",
      mondaySleepTime: "10 00 PM",
      tuesdaySleepTime: "10 00 PM",
      wednesdaySleepTime: "10 00 PM",
      thursdaySleepTime: "10 00 PM",
      fridaySleepTime: "10 00 PM",
      saturdaySleepTime: "10 00 PM",
    } as User);
  } catch (error) {
    console.error("Error Creating New User: ", error);
  }
};

export const updateUserFields = async (email: string, fieldsToUpdate) => {
  /* 
    Calls a validation before attempting.  
    Attempts to MERGE the given object to the existing user data
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(fieldsToUpdate, userFieldsReference);
  if (validationError) {
    console.error(validationError);
    return Promise.reject(validationError); // Reject promise if validation fails
  } else {
    try {
      const ref = doc(db, "users", email);
      await setDoc(ref, fieldsToUpdate, { merge: true }); // Note the return here
      console.log("Successfully updated db");
    } catch (error) {
      console.error(error);
      return Promise.reject(error); // Reject promise if Firestore operation fails
    }
  }
};

// all add[List] functions attempt to append the new item to the existing list.
export const addTask = async (email: string, taskToAdd) => {
  addToSubcollection(email, taskToAdd, "task");
};

export const addChallenge = async (email: string, challengeToAdd) => {
  addToSubcollection(email, challengeToAdd, "challenge");
};

export const addNotification = async (email: string, notificationToAdd) => {
  addToSubcollection(email, notificationToAdd, "notification");
};

export const addSleepLog = async (email: string, sleepLogToAdd) => {
  addToSubcollection(email, sleepLogToAdd, "sleepLog");
};

const addToSubcollection = async (email: string, objToAdd, subcollection: string) => {
  /*
      Handles all adding to subcollection one step in from user profile
  */
  const validationError = validateObjToAdd(objToAdd, subcollection);
  if (validationError) {
    console.error(validationError);
  } else {
    const userDocRef = doc(
      db,
      "users",
      email,
      `${subcollection}s`, // enters the provided subcollection
      objToAdd[`${subcollection}${subcollection === "sleepLog" ? "Date" : "Title"}`]
    );
    try {
      await setDoc(userDocRef, objToAdd, { merge: false });
      console.log(`${subcollection} added successfully!`);
    } catch (error) {
      console.error(`Error adding ${subcollection}: `, error);
    }
  }
};

// all update[List] functions attempt to MERGE the given with the existing list
export const updateTask = (email: string, taskTitle: string, taskFieldsToUpdate) => {
  updateSubCollection(email, taskTitle, taskFieldsToUpdate, taskReference, "task");
};

export const updateChallenge = (
  email: string,
  challengeTitle: string,
  challengeFieldsToUpdate
) => {
  updateSubCollection(
    email,
    challengeTitle,
    challengeFieldsToUpdate,
    challengeReference,
    "challenge"
  );
};
export const updateNotification = (
  email: string,
  notificationTitle: string,
  notificationFieldsToUpdate
) => {
  updateSubCollection(
    email,
    notificationTitle,
    notificationFieldsToUpdate,
    notificationReference,
    "notification"
  );
};

const updateSubCollection = (
  email: string,
  objTitle: string,
  objToUpdate,
  reference,
  subcollection: string
) => {
  /* 
    Attempts to MERGE the given object to the existing subcollection
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(objToUpdate, reference);
  if (validationError) {
    console.error(validationError);
  } else {
    try {
      const ref = doc(db, "users", email, `${subcollection}s`, objTitle);
      updateDoc(ref, objToUpdate);
      console.log(`Successfully updated ${subcollection}`);
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteTask = (email: string, taskTitle: string) => {
  deleteValFromSubCollection(email, taskTitle, "task");
};

export const deleteChallenge = (email: string, challengeTitle: string) => {
  deleteValFromSubCollection(email, challengeTitle, "challenge");
};
export const deleteNotification = (email: string, notificationTitle: string) => {
  deleteValFromSubCollection(email, notificationTitle, "notification");
};

const deleteValFromSubCollection = async (
  email: string,
  objTitle: string,
  subcollection: string
) => {
  /* 
    Attempts to DELETE the document with given title in the given subcollection
  */
  try {
    const ref = doc(db, "users", email, `${subcollection}s`, objTitle);
    await deleteDoc(ref);
    console.log(`Successfully deleted ${subcollection}`);
  } catch (error) {
    console.error(error);
  }
};
