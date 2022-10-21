import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FrameBox from "../layouts/FrameBox";
import MainMenu from "./MainMenuComp";

const AppbarComp = ({ navigation, route, options }: any) => {
  const title = route.params?.title ? route.params?.title : "Voice of Nigeria";
  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <SafeAreaView>
      <View style={options.headerStyle}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
          color="white"
        />
        <View>
          <FrameBox style={{ flexDirection: "row" }}>
            <Avatar.Image
              size={30}
              source={require("../../assets/von-small-logo.png")}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </FrameBox>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Appbar.Action icon="magnify" onPress={_handleSearch} color="white" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={_handleMore}
            color="white"
          />
        </View>
      </View>
      <MainMenu navigation={navigation} />
    </SafeAreaView>
  );
};

export default AppbarComp;

const styles = StyleSheet.create({
  text: {
    fontWeight: "900",
    fontSize: 18,
    color: "white",
  },
});
