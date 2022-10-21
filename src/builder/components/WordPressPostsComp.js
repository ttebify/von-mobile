import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Avatar,
  TextInput,
  Divider,
  Switch,
  RadioButton,
  Checkbox,
  List,
  IconButton,
} from "react-native-paper";
//import NavigationService from '../../navigation/NavigationService.js';
//import WordPressPostsContainer from '../containers/WordPressPostsContainer';
import HomeContainer from "../../containers/HomeContainer";
//import MainMenu from '../../components/MainMenuComp';
import Carousel from "react-native-reanimated-carousel";
import { height, width } from "../../layouts/dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LinearGradient } from "expo-linear-gradient";
import LoadingComp from "../../components/LoadingComp";

export const PostsRegister = [
  { name: "Thumbnail List", comp: WordPressThumbnailList },
  { name: "Card", comp: WordPressCard },
  { name: "Card Slide", comp: WordPressCardSlide },
];

const Wrapper = ({ title, children }) => {
  return <View>{children}</View>;
};

export const WordPressThumbnailList = ({ posts, navigation }) => {
  const { navigate } = navigation;

  const showPosts = posts.map((post) => (
    <Card
      key={post.key}
      style={{
        height: 150,
        marginVertical: 5,
        marginHorizontal: "4%",
        elevation: 2,
      }}
      onPress={() => navigate("PostScreen", { title: post.title, id: post.id })}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            margin: 2,
            padding: "2%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "rgba(4, 146, 220, 1)" }}>#tag</Text>
          <Text
            style={{
              fontWeight: "200",
              color: "rgba(0, 0, 0, 0.88)",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            {post.title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Paragraph style={styles.date}>Nnenna Okoronkwo</Paragraph>
            <Paragraph style={styles.date}>{post.date}</Paragraph>
          </View>
        </View>
        <View style={{ width: "45%", margin: 2 }}>
          <Card.Cover
            style={{ flex: 1 }}
            source={{ uri: post.media.full.source_url }}
          />
        </View>
      </View>
    </Card>
  ));

  if (posts.length === 0) {
    return <LoadingComp />;
  }

  return <Wrapper>{showPosts}</Wrapper>;
};

export const WordPressCardSlide = ({ posts, navigation }) => {
  const { navigate } = navigation;

  const showPosts = posts.map((post) => (
    <View
      key={post.key}
      style={{ height: 300, width, position: "relative", flex: 1 }}
    >
      <Card.Cover
        source={{ uri: post.media.full.source_url }}
        style={{ flex: 1 }}
      />

      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.67)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ padding: "8%" }}>
          <Text
            style={{
              color: "white",
              lineHeight: 21.78,
              fontSize: 20,
              marginBottom: "4%",
              fontWeight: "600",
            }}
          >
            {post.title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Paragraph style={styles.heroSmallText}>Nnenna Okoronkwo</Paragraph>
            <Paragraph style={[styles.heroSmallText, { marginLeft: 10 }]}>
              {post.date}
            </Paragraph>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        onPress={() =>
          navigate("PostScreen", { title: post.title, id: post.id })
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
        }}
      />
    </View>
  ));

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {showPosts}
    </ScrollView>
  );
};

export const WordPressCard = ({ posts, navigation }) => {
  const { navigate } = navigation;

  const showPosts = posts.map((post) => (
    <Card
      key={post.key}
      onPress={() => navigate("PostScreen", { title: post.title, id: post.id })}
      style={{
        borderRadius: 10,
        marginHorizontal: "4%",
        marginVertical: "3%",
        elevation: 2,
      }}
    >
      <Card.Cover
        source={{ uri: post.media.full.source_url }}
        style={{ height: 192 }}
      />
      <Card.Content style={styles.container}>
        <Paragraph style={styles.cardHeading}>{post.title}</Paragraph>
        <Paragraph style={styles.date}>{post.date}</Paragraph>
      </Card.Content>
    </Card>
  ));

  return <View>{showPosts}</View>;
};

const TestingAllComp = ({ posts, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Home", title: "Home" },
    { key: "Nigeria", title: "Nigeria" },
    { key: "Africa", title: "Africa" },
    { key: "World", title: "World" },
    { key: "Sports", title: "Sports" },
    { key: "Live", title: "Live" },
    { key: "SpacialDayEvents", title: "Events" },
    // { key: "Entertainment", title: "Entertainment" },
    // { key: "Technology", title: "Technology" },
  ]);

  const args = { posts, navigation };
  const tabBarHeight = useMemo(() => (posts.length > 0 ? 4920 : 100), [posts]);

  const HomeRoute = () =>
    useMemo(
      () => (
        <Fragment>
          <WordPressCardSlide {...args} />
          <WordPressCard {...args} />
          <WordPressThumbnailList {...args} />
        </Fragment>
      ),
      [args]
    );

  const NigeriaRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>Nigeria</Text>
    </View>
  );
  const AfricaRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>Africa</Text>
    </View>
  );
  const WorldRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>World</Text>
    </View>
  );
  const SportsRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>Sports</Text>
    </View>
  );
  const LiveRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>Live</Text>
    </View>
  );
  const SpacialDayEventsRoute = () => (
    <View style={{ flex: 1 }}>
      <Text>Spacial Day Events</Text>
    </View>
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        Home: HomeRoute,
        Nigeria: NigeriaRoute,
        Africa: AfricaRoute,
        World: WorldRoute,
        Sports: SportsRoute,
        Live: LiveRoute,
        SpacialDayEvents: SpacialDayEventsRoute,
      }),
    [HomeRoute]
  );

  const _renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "rgba(4, 146, 220, 1)" }}
      style={{ backgroundColor: "white" }}
      activeColor="rgba(0, 0, 0, 0.87)"
      inactiveColor="rgba(0, 0, 0, 0.69)"
      labelStyle={{ textTransform: "capitalize" }}
      tabStyle={{ width: 100 }}
      scrollEnabled
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ width: width, height: tabBarHeight }}
      renderTabBar={_renderTabBar}
      swipeEnabled={false}
    />
  );
};

export default HomeContainer(TestingAllComp);

const styles = StyleSheet.create({
  cardHeading: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.94,
    color: "rgba(0, 0, 0, 0.9)",
  },
  date: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
  container: {
    padding: "5%",
  },
  heroSmallText: {
    color: "white",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
