import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AppbarComp from "../components/AppbarComp";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import PostsScreen from "../screens/PostsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoScreen from "../screens/VideoScreen";
import DrawerComp from "../components/DrawerComp";
import BottomTabBar from "../components/ButtomTabBar";
import RadioScreen from "../screens/RadioScreen";
import CategoryScreen from "../screens/CategoryScreen";
import PostScreenHeader from "../components/PostScreenHeader";
import VideosScreen from "../screens/VideosScreen";
import VideoScreenHeader from "../components/VideoScreenHeader";

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
  id: "DrawerNavigator",
  screenOptions: {
    headerStyle: {
      height: 64,
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

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="HomeScreen"
    tabBar={BottomTabBar}
    id="tabDrawer"
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Video" component={VideoNavigator} />
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
  </Stack.Navigator>
);

const VideoNavigator = () => (
  <Stack.Navigator
    initialRouteName="VideoScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="VideoScreen" component={VideoScreen} />
  </Stack.Navigator>
);

export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="App" {...drawerViewConfig}>
      <Drawer.Screen name="App" component={AppNavigator} />
      <Drawer.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          header: ({ navigation, route, options }: any) => {
            return (
              <PostScreenHeader
                navigation={navigation}
                route={route}
                options={options}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="VideosScreen"
        component={VideosScreen}
        options={{
          header: ({ navigation, route, options }: any) => {
            return (
              <VideoScreenHeader
                navigation={navigation}
                route={route}
                options={options}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
