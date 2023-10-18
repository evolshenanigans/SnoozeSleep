// import { View, Text, Image, ImageSourcePropType } from "react-native";
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import HomeScreen from "./Home";
// // import CalendarScreen from "./Calendar";
// // import ChallengesScreen from "./Challenges";
// // import AccountScreen from "./Account";
// import { Calendar } from "react-native-calendars";
// // import Challenges from "./Challenges";

// const Tab = createBottomTabNavigator();

// const Tabs = ({ currentUser }) => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarStyle: { backgroundColor: "#121524" },
//         tabBarIconStyle: { color: "#C6C6C6" },
//         tabBarIcon: ({ focused }) => {
//           let iconName: ImageSourcePropType;

//           if (route.name === "Home") {
//             iconName = require("../../assets/images/home.png");
//           } else if (route.name === "Calendar") {
//             iconName = require("../../assets/images/calendar.png");
//           } else if (route.name === "Challenges") {
//             iconName = require("../../assets/images/challenges.png");
//           } else if (route.name === "Account") {
//             iconName = require("../../assets/images/account.png");
//           }
//           const tintColor = focused ? "#9174D0" : "#C6C6C6";
//           return (
//             <Image
//               source={iconName}
//               style={{ width: 24, height: 24, tintColor: tintColor }}
//             />
//           );
//         },
//       })}
//     >
//       <Tab.Screen name="Home" options={{ headerShown: false }}>
//         {(props) => <HomeScreen {...props} {...{ currentUser: currentUser }} />}
//       </Tab.Screen>
//       <Tab.Screen name="Calendar" options={{ headerShown: false }}>
//         {(props) => <CalendarScreen {...props} {...{ currentUser: currentUser }} />}
//       </Tab.Screen>
//       <Tab.Screen name="Challenges" options={{ headerShown: false }}>
//         {(props) => <ChallengesScreen {...props} {...{ currentUser: currentUser }} />}
//       </Tab.Screen>
//       <Tab.Screen name="Account" options={{ headerShown: false }}>
//         {(props) => <AccountScreen {...props} {...{ currentUser: currentUser }} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// };

// export default Tabs;
