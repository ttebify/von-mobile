import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar, Menu, Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FrameBox from "../layouts/FrameBox";

const AppbarComp = ({ navigation, route, options }: any) => {
  const [visible, setVisible] = React.useState(false);

  const title = route.params?.title ? route.params?.title : "Voice of Nigeria";
  const { navigate } = navigation;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <SafeAreaView>
      <View style={options.headerStyle}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
          color="white"
        />
        <View style={{ width: "70%" }}>
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
        <Provider>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Appbar.Action
                    icon="magnify"
                    onPress={() => navigate("SearchScreen")}
                    color="white"
                  />
                  <Appbar.Action
                    icon="dots-vertical"
                    onPress={openMenu}
                    color="white"
                  />
                </View>
              }
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  navigate("BookmarkScreen");
                }}
                title="My News"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  navigate("Live");
                }}
                title="Live"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  // navigate("SettingsScreen");
                }}
                title="Help"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  // navigate("SettingsScreen");
                }}
                title="Contact Us"
              />
            </Menu>
          </View>
        </Provider>
      </View>
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
