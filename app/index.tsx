import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Home from "./(tabs)/Home";
import Login from "./(onboarding)/Login";
import LoadingScreen from "./(onboarding)/LoadingScreen";
import TabLayout from "./(tabs)/_layout";
import OB1SignUp from "./(onboarding)/OB1SignUp";
import TaskForm from "./TaskForm";
import OB2Birthday from "./(onboarding)/OB2Birthday";
import OB3SleepDurationGoal from "./(onboarding)/OB3SleepDurationGoal";
import OB4SleepTime from "./(onboarding)/SleepTime";
import OB5Alarm from "./(onboarding)/OB4Alarm";

const Stack = createStackNavigator();

const Index: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState<boolean | null>(null); // Initialize as null to act as a tri-state
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    console.log("currentUser is null?: ", currentUser === null ? "true" : "false");
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      checkIfUserIsOnboarded(currentUser.email)
        .then((isNew) => {
          setCurrentUserIsNew(isNew);
          console.log("user is new?:", isNew);
        })
        .catch((err) => {
          console.warn("Error checking if user is onboarded: ", err);
        });
    }
  }, [currentUser]);

  async function checkIfUserIsOnboarded(userId: string): Promise<boolean | null> {
    console.log("Checking if user is onboarded for userId: ", userId);
    try {
      console.log("FIREBASE_DB inside App.js:", FIREBASE_DB);

      const userDoc = await getDoc(doc(db, "users", userId));
      console.log("Fetched user doc: ", userDoc);
      const userData = userDoc.data();
      console.log("User data: ", userData);
      return userData ? userData.userIsNew : null;
    } catch (error) {
      console.error("There was an error fetching user data: ", error);
      return null;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {currentUser === null ? (
        // user does not exist. Login
        <Login />
      ) : currentUserIsNew ? (
        // user exists and user is new. Onboard.
        <OB2Birthday />
      ) : (
        // user exists and user is not new. Home Screen
        <Home />
      )}
    </View>
  );
};

export default Index;
