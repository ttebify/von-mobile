import React from "react";
//import {TestForm} from '../builder/TestForm';
import AppMenus from "../builder/containers/AppMenusContainer";
import { IconButton } from "react-native-paper";

function SettingsScreen({ navigation }) {
  const isFocused = navigation.isFocused();

  if (isFocused) {
    return <AppMenus navigation={navigation} />;
  } else {
    return null;
  }
}

SettingsScreen.navigationOptions = {
  title: "Menus",
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <IconButton color={tintColor} icon="list" />;
  },
};

export default SettingsScreen;
