//import * as WebBrowser from 'expo-web-browser';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MenuButton from "../components/MenuButton";
import WpPageComp from "../components/WpPageComp";

export default class WpPageScreen extends React.Component {
  static navigationOptions = ({ navigation, route }) => {
    return {
      headerTitle: route.params?.title ? route.params?.title : "Wordpress App",
      headerLeft: ({ scene }) => {
        var { navigation } = scene.descriptor;
        return <MenuButton onPress={() => navigation.toggleDrawer()} />;
      },
    };
  };

  render() {
    const { navigation, route } = this.props;

    var id = route.params?.title ? route.params?.id : 0;

    var args = { navigation, id };

    return <WpPageComp {...args} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
