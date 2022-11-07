import { createDrawerNavigator } from "@react-navigation/drawer";
import AppbarComp from "../components/AppbarComp";
import PostScreen from "../screens/PostScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoScreen from "../screens/VideoScreen";
import DrawerComp from "../components/DrawerComp";
import BottomTabBar from "../components/ButtomTabBar";
import CategoryScreen from "../screens/CategoryScreen";
import PostScreenHeader from "../components/PostScreenHeader";
import BookmarkScreen from "../screens/BookmarkScreen";
import BookmarkScreenHeader from "../components/BookmarkScreenHeader";
import SearchScreen from "../screens/SearchScreen";
import SearchScreenHeader from "../components/SearchScreenHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LatestPostScreen from "../screens/LatestPostScreen";
import CategoryViewScreen from "../screens/CategoryViewScreen";
import FrameBox from "../layouts/FrameBox";
import { Appbar, Avatar } from "react-native-paper";
import { NewsTabBar } from "../components/NewsTabBar";
import RadioChannelScreen from "../screens/RadioChannel";
import EyeWitnessScreen from "../screens/EyeWitnessScreen";
import EyeWitnessScreenHeader from "../components/EyeWitnessScreenHeader";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const drawerViewConfig = {
  drawerContent: (props: any) => <DrawerComp {...props} />,
  drawerWidth: 300,
  drawerType: "front", // 'front' | 'back' | 'slide';
  drawerLockMode: "locked-closed", //'unlocked' | 'locked-closed' | 'locked-open';
  edgeWidth: 1,
  drawerPosition: "left",
  id: "DrawerNavigator",
  screenOptions: {
    headerShown: false,
    headerStyle: {
      backgroundColor: "rgb(4, 98, 171)",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 0,
    },
  },
};

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBar={BottomTabBar}
    id="tabDrawer"
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "rgb(4, 98, 171)",
      },

      headerTitleStyle: { color: "white" },
      headerLeft: () => (
        <Appbar.Action
          icon="chevron-left"
          onPress={() => navigation.goBack()}
          color="white"
          size={30}
        />
      ),
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        headerStyle: {
          height: 64,
          backgroundColor: "rgb(4, 98, 171)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
        },
        header: ({ navigation, route, options }: any) => {
          return (
            <AppbarComp
              navigation={navigation}
              route={route}
              options={options}
            />
          );
        },
      }}
    />
    <Tab.Screen name="Live" component={RadioChannelScreen} />
    <Tab.Screen name="Video" component={VideoScreen} />
    <Tab.Screen name="Categories" component={CategoryScreen} />
  </Tab.Navigator>
);

const NigeriaRoute = (props) => (
  <CategoryViewScreen catName="nigeria" {...props} />
);
const AfricaRoute = (props) => (
  <CategoryViewScreen catName="africa" {...props} />
);
const WorldRoute = (props) => <CategoryViewScreen catName="world" {...props} />;
const SportsRoute = (props) => (
  <CategoryViewScreen catName="sports" {...props} />
);
const SpacialDayEventsRoute = (props) => (
  <CategoryViewScreen catName="special event" {...props} />
);
// const OtherCate

function HomeNavigator() {
  return (
    <TopTab.Navigator
      initialRouteName="Latest"
      id="TopTab"
      tabBar={NewsTabBar}
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => (
          <FrameBox>
            <Avatar.Image
              size={30}
              source={require("../../assets/von-small-logo.png")}
            />
          </FrameBox>
        ),
      }}
    >
      <TopTab.Screen name="Latest" component={LatestPostScreen} />
      <TopTab.Screen name="Nigeria" component={NigeriaRoute} />
      <TopTab.Screen name="Africa" component={AfricaRoute} />
      <TopTab.Screen name="World" component={WorldRoute} />
      <TopTab.Screen name="Sports" component={SportsRoute} />
      <TopTab.Screen name="Events" component={SpacialDayEventsRoute} />
      {/* <TopTab.Screen name="Others" component={} */}
    </TopTab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="App" {...drawerViewConfig}>
      <Drawer.Screen name="App" component={AppNavigator} />
      <Drawer.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          headerShown: true,
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
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
          headerShown: true,
          header: ({ navigation, options }: any) => {
            return (
              <BookmarkScreenHeader navigation={navigation} options={options} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: true,
          header: ({ navigation, options }: any) => {
            return (
              <SearchScreenHeader navigation={navigation} options={options} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="EyeWitnessScreen"
        component={EyeWitnessScreen}
        options={{
          headerShown: true,
          header: ({ navigation, options }: any) => {
            return (
              <EyeWitnessScreenHeader
                navigation={navigation}
                options={options}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
