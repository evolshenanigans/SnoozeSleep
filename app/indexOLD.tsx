/**
 * TO RUN THIS APP ON EXPO GO ON ANDROID SIMULATOR:
 *
 * 1. download the APK from this link to your computer:
 * https://expo.dev/accounts/mariapan0330/projects/snoozesense/builds/8a981c9c-e7ca-4385-9b05-e5de28b857e4
 *
 * 2. Move that APK file into the folder of the Android Simulator.
 * 3. Start the simulator and find the Expo Go app in the app locker
 *
 * 4. Dev starts the project with npx expo start --tunnel
 * 5. Dev presses 's' to switch to Expo Go mode
 * 6. Dev shares the link that starts with 'Metro waiting on exp://etc'
 *
 * 7. Enter that link into the Expo Go "Enter URL Manually" input box
 *
 * from this:
 * https://github.com/expo/expo/issues/16360
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import OnboardingStep1 from "./screens/onboarding/OnboardingStep1";
import OnboardingStep2 from "./screens/onboarding/OnboardingStep2";
import OnboardingStep3 from "./screens/onboarding/OnboardingStep3";
import OnboardingStep4 from "./screens/onboarding/OnboardingStep4";
import OnboardingStep5 from "./screens/onboarding/OnboardingStep5";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig";
// import Tabs from "../screens/tabs";
import TabLayout from "./(tabs)/_layout";

import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { AppNavProps } from "./types/indexTypes";
import LoadingScreen from "./screens/LoadingScreen";

const db = getFirestore();

const AuthenticationStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function OnboardingLayout({ currentUser, setCurrentUserIsNew }: AppNavProps) {
  return (
    <OnboardingStack.Navigator initialRouteName="Step2">
      <OnboardingStack.Screen name="Step2" options={{ headerShown: false }}>
        {(props) => <OnboardingStep2 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step3" options={{ headerShown: false }}>
        {(props) => <OnboardingStep3 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step4" options={{ headerShown: false }}>
        {(props) => <OnboardingStep4 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step5" options={{ headerShown: false }}>
        {(props) => (
          <OnboardingStep5
            {...props}
            currentUser={currentUser}
            setCurrentUserIsNew={setCurrentUserIsNew}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
}

function AuthenticationLayout({ currentUser, setCurrentUserIsNew }: AppNavProps) {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthenticationStack.Screen name="SignUp" options={{ headerShown: false }}>
        {(props) => <OnboardingStep1 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step2">
        {(props) => (
          <OnboardingLayout
            {...props}
            {...{ currentUser: currentUser, setCurrentUserIsNew: setCurrentUserIsNew }}
          />
        )}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
}

async function checkIfUserIsOnboarded(userId: string) {
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

export default function index() {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState<boolean>(true); // Initialize as null to act as a tri-state

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      checkIfUserIsOnboarded(currentUser.email)
        .then((isNew) => {
          setCurrentUserIsNew(isNew);
        })
        .catch((err) => {
          console.warn("Error checking if user is onboarded: ", err);
        });
    }
  }, [currentUser]);

  return (
    <NavigationContainer independent={true}>
      {currentUser === null || !currentUser ? (
        <AuthenticationLayout
          currentUser={currentUser}
          setCurrentUserIsNew={setCurrentUserIsNew}
        />
      ) : currentUserIsNew === null || !currentUser ? (
        <LoadingScreen />
      ) : currentUserIsNew ? (
        <OnboardingLayout
          currentUser={currentUser}
          setCurrentUserIsNew={setCurrentUserIsNew}
        />
      ) : (
        // <TabLayout currentUser={currentUser} />
        <></>
      )}
    </NavigationContainer>
  );
}
