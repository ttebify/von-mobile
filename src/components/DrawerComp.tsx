import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../customTheme";
import { Avatar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Row } from "../layouts/FlexBox";
import { SafeAreaView } from "react-native-safe-area-context";

export const allowedCategoryLists = [
  { name: "Nigeria", label: "Nigeria" },
  { label: "Africa", name: "Africa" },
  { label: "World", name: "World" },
  { label: "Sports", name: "Sports" },
  { label: "Special Events", name: "Events" },
];

const DrawerComp = ({ navigation }: any) => {
  const { navigate } = navigation;

  const { colors } = theme();
  const contentOptions = {
    activeTintColor: colors.primary,
    activeBackgroundColor: "transparent",
    inactiveTintColor: "white",
    inactiveBackgroundColor: "transparent",
    labelStyle: {
      fontSize: 15,
      marginLeft: 10,
    },
  };

  var menu = allowedCategoryLists.map((cat) => {
    return (
      <DrawerItem
        key={`list-${cat.name}`}
        label={cat.label}
        {...contentOptions}
        onPress={() => {
          navigation.closeDrawer();
          navigate(cat.name);
        }}
      />
    );
  });

  return (
    <LinearGradient
      colors={["rgba(4, 86, 149, 1)", "rgba(4, 146, 220, 1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      style={[{ backgroundColor: "white", flex: 1 }]}
    >
      <SafeAreaView style={styles.appBarHeader}>
        <Row
          style={{
            marginLeft: "10%",
            paddingVertical: 16.5,
            alignItems: "center",
          }}
        >
          <Avatar.Image
            size={30}
            source={require("../../assets/von-small-logo.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>Voice of Nigeria</Text>
          </View>
        </Row>
      </SafeAreaView>
      <DrawerContentScrollView>
        <DrawerItem
          label="My News"
          onPress={() => {
            navigation.closeDrawer();
            navigate("BookmarkScreen");
          }}
          {...contentOptions}
        />
        {menu}
        <View
          style={{
            borderColor: "rgba(4, 80, 139, 0.19)",
            borderBottomWidth: 2,
            marginVertical: 5,
          }}
        />
        <DrawerItem
          label="Eye Witness Report"
          onPress={() => {
            navigation.closeDrawer();
            navigate("EyeWitnessScreen");
          }}
          {...contentOptions}
        />
        {/* <DrawerItem
          label="Settings"
          onPress={() => {
            navigation.closeDrawer();
            // navigate("SettingsPage");
          }}
          {...contentOptions}
        /> */}
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default DrawerComp;

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
  appBarHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(207, 207, 207, 0.27)",
  },
});
