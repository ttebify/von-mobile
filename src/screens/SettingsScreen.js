import React from "react";
import AppSettings from "../builder/containers/AppSettingsContainer";
import { IconButton } from "react-native-paper";

function SettingsScreen({ navigation }) {
  const isFocused = navigation.isFocused();
  if (isFocused) {
    return <AppSettings navigation={navigation} isFocused={isFocused} />;
  } else {
    return null;
  }
}

SettingsScreen.navigationOptions = {
  title: "Settings",
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <IconButton color={tintColor} icon="settings" />;
  },
};

export default SettingsScreen;
