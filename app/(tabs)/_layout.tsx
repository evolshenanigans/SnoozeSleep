import { Image, useColorScheme } from "react-native";
import { Link, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import homeIcon from "../../assets/images/home.png";
import calendarIcon from "../../assets/images/calendar.png";
import challengesIcon from "../../assets/images/challenges.png";
import accountIcon from "../../assets/images/account.png";

type TabLayoutProps = {
  currentUser: any; // Replace 'any' with the actual type of currentUser, if known
};

export default function TabLayout({ currentUser }: TabLayoutProps) {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? Colors[colorScheme ?? "light"].tint : undefined,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={calendarIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? Colors[colorScheme ?? "light"].tint : undefined,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Challenges"
        options={{
          title: "Challenges",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={challengesIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? Colors[colorScheme ?? "light"].tint : undefined,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={accountIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? Colors[colorScheme ?? "light"].tint : undefined,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
