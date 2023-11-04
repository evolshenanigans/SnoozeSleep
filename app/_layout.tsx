import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext, useUserContext } from "./services/Context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(onboarding)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState<boolean>(true); // Initialize as null to act as a tri-state
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
      if (user == null) {
        console.log("user is null");
      } else {
        console.log("we have a user, repeat we have a user");
      }
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

  // useEffect(() => {
  //   if (currentUser === null) {
  //     console.log("USER IS NULL, rerouting to onboarding.");
  //   }
  // }, [currentUser]);

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
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav currentUser={currentUser} />;
}

function RootLayoutNav({ currentUser }) {
  const colorScheme = useColorScheme();
  // const currentUser = useUserContext();

  return (
    <UserContext.Provider value={currentUser}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="TaskForm" options={{ headerShown: false }} />
          <Stack.Screen name="AddChallenge" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="SetupLaterModal"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
