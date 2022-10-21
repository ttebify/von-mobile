import React from "react";
import { View } from "react-native";
import HomeContainer from "../containers/HomeContainer";

import MainMenu from "./MainMenuComp";

const HomeComp = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainMenu />
    </View>
  );
};

export default HomeContainer(HomeComp);
