import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { AppNavigatorList } from "./types";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator<AppNavigatorList>();
const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
