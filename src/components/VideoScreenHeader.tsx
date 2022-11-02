import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MainMenu from "./MainMenuComp";

const VideoScreenHeader = ({ navigation, options }: any) => {
  return (
    <SafeAreaView>
      <View style={options.headerStyle}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Appbar.Action
            icon="chevron-left"
            onPress={() => navigation.goBack()}
            color="white"
            size={30}
          />
          <Text style={styles.text}>Videos</Text>
        </View>
      </View>
      <MainMenu navigation={navigation} />
    </SafeAreaView>
  );
};

export default VideoScreenHeader;

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
