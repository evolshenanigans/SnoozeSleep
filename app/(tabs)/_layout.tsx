import { Image, Text, View, useColorScheme, StyleSheet } from "react-native";
import { Link, Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import homeIcon from "../../assets/images/home.png";
import calendarIcon from "../../assets/images/calendar.png";
import challengesIcon from "../../assets/images/challenges.png";
import accountIcon from "../../assets/images/account.png";
import { colors } from "../utils/colors";
import { useUserContext } from "../services/Context";

type TabLayoutProps = {
  currentUser: any; // Replace 'any' with the actual type of currentUser, if known
};

const TabLabel = (focused: boolean, title: string) => {
  return (
    <Text
      style={[
        styles.tabLabel,
        { color: focused ? colors.themePrimary : colors.themeWhite },
      ]}
    >
      {title}
    </Text>
  );
};

const TabIcon = (focused: boolean, img: any) => {
  return (
    <Image
      source={img}
      style={[
        styles.tabIcon,
        {
          tintColor: focused ? colors.themePrimary : colors.themeWhite,
        },
      ]}
    />
  );
};

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const currentUser = useUserContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.themePrimary,
        tabBarInactiveTintColor: colors.themeWhite,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarItemStyle: styles.tabItemContainer,
          tabBarIcon: ({ focused }) => TabIcon(focused, homeIcon),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItemContainer,
          tabBarIcon: ({ focused }) => TabIcon(focused, calendarIcon),
        }}
      />
      <Tabs.Screen
        name="Challenges"
        options={{
          title: "Challenges",
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItemContainer,
          tabBarIcon: ({ focused }) => TabIcon(focused, challengesIcon),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItemContainer,
          tabBarIcon: ({ focused }) => TabIcon(focused, accountIcon),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    color: colors.themeWhite,
    fontSize: 12,
  },
  tabIcon: {
    height: 25,
    width: 25,
  },
  tabItemContainer: {
    height: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabBar: {
    backgroundColor: colors.themeNavbar,
    height: 70,
    borderColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
