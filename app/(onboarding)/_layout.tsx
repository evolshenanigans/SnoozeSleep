import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, header: () => null }}>
      <Stack.Screen name="Login" options={{ headerShown: false, header: () => null }} />
      <Stack.Screen
        name="OB1SignUp"
        options={{ headerShown: false, header: () => null }}
      />
      <Stack.Screen
        name="OB2Birthday"
        options={{ headerShown: false, header: () => null }}
      />
    </Stack>
  );
};

export default _layout;
