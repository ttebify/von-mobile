import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AppbarComp from "../components/AppbarComp";
import PostScreen from "../screens/PostScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoScreen from "../screens/VideoScreen";
import DrawerComp from "../components/DrawerComp";
import BottomTabBar from "../components/ButtomTabBar";
import RadioScreen from "../screens/RadioScreen";
import CategoryScreen from "../screens/CategoryScreen";
import PostScreenHeader from "../components/PostScreenHeader";
import VideosScreen from "../screens/VideosScreen";
import VideoScreenHeader from "../components/VideoScreenHeader";
import BookmarkScreen from "../screens/BookmarkScreen";
import BookmarkScreenHeader from "../components/BookmarkScreenHeader";
import SearchScreen from "../screens/SearchScreen";
import SearchScreenHeader from "../components/SearchScreenHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Animated, FlatList, TouchableOpacity, View } from "react-native";
import LatestPostScreen from "../screens/LatestPostScreen";
import CategoryViewScreen from "../screens/CategoryViewScreen";
import FrameBox from "../layouts/FrameBox";
import { Avatar } from "react-native-paper";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
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
        <AppbarComp navigation={navigation} route={route} options={options} />
      );
    },
  },
};

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
    tabBar={BottomTabBar}
    id="tabDrawer"
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Video" component={VideoNavigator} />
    <Tab.Screen name="Radio" component={RadioScreen} />
    <Tab.Screen name="Categories" component={CategoryScreen} />
  </Tab.Navigator>
);

const VideoNavigator = () => (
  <Stack.Navigator
    initialRouteName="VideoScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="VideoScreen" component={VideoScreen} />
  </Stack.Navigator>
);

function _renderTabBar({ state, descriptors, navigation, position }) {
  return (
    <View>
      <FlatList
        data={state.routes}
        style={{ backgroundColor: "#fff" }}
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: route, index }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved

              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.6)),
          });
          const barOpacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.name}
            >
              <Animated.Text
                style={{ opacity, paddingHorizontal: 18, paddingVertical: 16 }}
              >
                {label}
              </Animated.Text>
              <Animated.View
                style={{
                  opacity: barOpacity,
                  backgroundColor: "#5294d6",
                  height: 2,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

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

function HomeNavigator() {
  return (
    <TopTab.Navigator
      initialRouteName="Latest"
      id="TopTab"
      tabBar={_renderTabBar}
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
      <Drawer.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
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
          header: ({ navigation, options }: any) => {
            return (
              <SearchScreenHeader navigation={navigation} options={options} />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
