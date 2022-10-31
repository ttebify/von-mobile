import React from "react";
import { connect } from "react-redux";
//import { DrawerItems, SafeAreaView } from 'react-navigation';
//import NavigationService from '../navigation/NavigationService.js';
import LoadingComp from "./LoadingComp";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../customTheme";
import { Avatar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Row } from "../layouts/FlexBox";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerComp = ({ categories, navigation }: any) => {
  const { navigate } = navigation;

  const data = categories && categories.data ? categories.data : [];
  const allowedLists = [
    "sports",
    "nigeria",
    "africa",
    "world",
    "special event",
    "politics",
    "health",
    "business",
  ];

  let root = data.filter(
    (cat: { parent: number; name: string }) =>
      cat.parent === 0 && allowedLists.includes(cat.name.toLowerCase())
  );

  var menu = root.map((n: { name: any; id: any }, i: any) => {
    const { name, id } = n;
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

    return (
      <DrawerItem
        key={`list-${i}`}
        label={name}
        {...contentOptions}
        onPress={() => {
          navigation.closeDrawer();
          navigate("PostsScreen", { title: name, categories: id });
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
        <Row style={{ marginLeft: 10, paddingVertical: 16 }}>
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
        {data.length === 0 ? <LoadingComp /> : menu}
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const mapState = (state: any) => {
  const appIndex = state.globalState.currentApp || 0;
  return {
    categories: state.api[`categories-${appIndex}`],
    gState: state.globalState,
  };
};

export default connect(mapState)(DrawerComp);

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
