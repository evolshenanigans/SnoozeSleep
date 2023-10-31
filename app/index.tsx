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
import OB4SleepTime from "./(onboarding)/OB4SleepTime";
import OB5Alarm from "./(onboarding)/OB5Alarm";

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
    // <Stack.Navigator
    //   initialRouteName="Loading"
    //   screenOptions={{ headerShown: false, header: () => null }}
    // >
    <View style={{ flex: 1 }}>
      {currentUser === null ? (
        // <Stack.Screen
        //   name="Loading"
        //   component={LoadingScreen}
        //   options={{ headerShown: false }}
        // /> // Assuming you have a Loading component
        // <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Login />
      ) : currentUserIsNew ? (
        // <>
        //   {/* <Stack.Screen name="OnboardingStack" component={OBLayout} /> */}
        //   <Stack.Screen
        //     name="OB2Birthday"
        //     component={OB2Birthday}
        //     options={{ headerShown: false, header: () => null }}
        //   />
        //   <Stack.Screen
        //     name="OB3SleepDurationGoal"
        //     component={OB3SleepDurationGoal}
        //     options={{ headerShown: false, header: () => null }}
        //   />
        //   <Stack.Screen
        //     name="OB4SleepTime"
        //     component={OB4SleepTime}
        //     options={{ headerShown: false, header: () => null }}
        //   />
        //   <Stack.Screen
        //     name="OB5Alarm"
        //     component={OB5Alarm}
        //     options={{ headerShown: false, header: () => null }}
        //   />
        // </>
        <OB2Birthday />
      ) : (
        // <>
        //   <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        //   {/* <TabLayout /> */}
        //   <Stack.Screen
        //     name="TabLayout"
        //     component={TabLayout}
        //     options={{ headerShown: false }}
        //   />
        //   <Stack.Screen
        //     name="TaskForm"
        //     component={TaskForm}
        //     options={{ headerShown: false }}
        //   />
        //   {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
        // </>
        <Home />
      )}
      {/* </Stack.Navigator> */}
    </View>
  );
};

export default Index;
