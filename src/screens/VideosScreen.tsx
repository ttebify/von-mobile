import React from "react";
import { View } from "react-native";
import VideoComp from "../components/VideoComp";

function VideosScreen({ navigation, route }) {
  const isFocused = navigation.isFocused();
  const playlistId = route.params?.playlistId ? route.params.playlistId : 0;

  const args = { navigation, isFocused, playlistId };

  return (
    <View style={{ flex: 1 }}>
      <VideoComp {...args} />
    </View>
  );
}

export default VideosScreen;
