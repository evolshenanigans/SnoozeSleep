import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Link, useRouter, Stack } from "expo-router";
import Home from "./(tabs)/Home";
import TabLayout from "./(tabs)/_layout";
import { colors } from "./utils/colors";

const index = () => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState<boolean>(true); // Initialize as null to act as a tri-state
  //   const router = useRouter();

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

  useEffect(() => {
    if (currentUser === null) {
      //   console.log("USER IS NULL, rerouting to onboarding.");
      //   router.replace("/screens/Login");
    }
  }, [currentUser]);

  const db = getFirestore();

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
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ padding: 50 }}>
        <Link
          href={{
            pathname: "/(onboarding)/Login",
            params: {},
          }}
        >
          <Text style={{ color: colors.themePrimary }}>Go To Onboarding</Text>
        </Link>
        <Link
          href={{
            pathname: "/(tabs)/Home",
            params: {},
          }}
        >
          <Text style={{ color: colors.themePrimary }}>Go To Home</Text>
        </Link>
      </View>
    </>
  );
};

export default index;
