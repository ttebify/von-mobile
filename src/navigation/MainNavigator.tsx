import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AppbarComp from "../components/AppbarComp";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import PostsScreen from "../screens/PostsScreen";
// import PostScreen from "../screens/PostScreen";
// import PostsScreen from "../screens/PostsScreen";
// import WpPageScreen from "../screens/WpPageScreen";
// import WpPageScreen from "../screens/WpPageScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import PagesScreen from "../screens/PagesScreen";
// import ThemeScreen from "../screens/ThemeScreen";
// import MenusScreen from "../screens/MenusScreen";
// import SettingsScreen from "../screens/SettingsScreen";
import VideoScreen from "../screens/VideoScreen";
import DrawerComp from "../components/DrawerComp";
import BottomTabBar from "../components/ButtomTabBar";
import RadioScreen from "../screens/RadioScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const drawerViewConfig = {
  drawerContent: (props: any) => <DrawerComp {...props} />,
  drawerWidth: 300,
  drawerType: "front", // 'front' | 'back' | 'slide';
  drawerLockMode: "locked-closed", //'unlocked' | 'locked-closed' | 'locked-open';
  edgeWidth: 1,
  drawerPosition: "left",
  screenOptions: {
    headerStyle: {
      height: 74,
      backgroundColor: "rgb(4, 98, 171)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 0,
    },
    tabBarStyle: [
      {
        display: "flex",
      },
    ],
    header: ({ navigation, route, options }: any) => {
      return (
        <AppbarComp navigation={navigation} route={route} options={options} />
      );
    },
  },
};

/* const stackConfig = {
  presentation: "card", //modal| 'card'
  headerBackTitleVisible: false,
  headerLayoutPreset: "center",
  cardOverlayEnabled: false,

  defaultNavigationOptions: ({ navigation }: any) => {
    return {
      header: <AppbarComp navigation={navigation} />,
    };
  },
}; */

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="HomeScreen"
    tabBar={BottomTabBar}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Video" component={VideoScreen} />
    <Tab.Screen name="Radio" component={RadioScreen} />
    <Tab.Screen name="Categories" component={CategoryScreen} />
  </Tab.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PostsScreen" component={PostsScreen} />
    <Stack.Screen name="PostScreen" component={PostScreen} />
  </Stack.Navigator>
);

/* function SettingsNavigator() {
  return (
    <Tab.Navigator {...tabConfig}>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Menus" component={MenusScreen} />
      <Tab.Screen name="Pages" component={PagesScreen} />
      <Tab.Screen name="Theme" component={ThemeScreen} />
    </Tab.Navigator>
  );
} */

export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="App" {...drawerViewConfig}>
      <Drawer.Screen name="App" component={AppNavigator} />
      {/* <Drawer.Screen name="Setting" component={SettingsNavigator} /> */}
      {/* <Drawer.Screen name="Editor" component={Editor} /> */}
    </Drawer.Navigator>
  );
}
