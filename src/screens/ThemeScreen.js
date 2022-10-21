import React from "react";
//import {TestForm} from '../builder/TestForm';
import AppTheme from "../builder/containers/AppThemeContainer";
//import AppThemeComp from '../builder/components/AppThemeComp';
import { IconButton } from "react-native-paper";

function ThemeScreen({ navigation }) {
  if (navigation.isFocused()) {
    return (
      <AppTheme navigation={navigation} isFocused={navigation.isFocused()} />
    );
  } else {
    return null;
  }
}

ThemeScreen.navigationOptions = {
  title: "Theme",
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <IconButton color={tintColor} icon="format-paint" />;
  },
};

export default ThemeScreen;
