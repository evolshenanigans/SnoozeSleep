import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { KEYS } from "../key";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.APIKEY,
  authDomain: Constants.expoConfig.extra.AUTHDOMAIN,
  projectId: Constants.expoConfig.extra.PROJECTID,
  storageBucket: Constants.expoConfig.extra.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig.extra.MESSAGESENDERID,
  appId: Constants.expoConfig.extra.APPID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_AUTH = auth;
const db = getFirestore(FIREBASE_APP);
export const FIREBASE_DB = db;

console.log("Is Firestore initialized?", FIREBASE_DB ? "Yes" : "No");
