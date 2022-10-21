import React from "react";
//import {TestForm} from '../builder/TestForm';
import AppPages from "../builder/containers/AppPagesContainer";
import { IconButton } from "react-native-paper";

function PagesScreen({ navigation }) {
  const isFocused = navigation.isFocused();

  if (isFocused) {
    return <AppPages navigation={navigation} isFocused={isFocused} />;
  } else {
    return null;
  }
}

PagesScreen.navigationOptions = {
  title: "Pages",
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    return <IconButton color={tintColor} icon="description" />;
  },
};

export default PagesScreen;
