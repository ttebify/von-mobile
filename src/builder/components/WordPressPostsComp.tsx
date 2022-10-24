import React, { useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, Card, Paragraph } from "react-native-paper";
import HomeContainer from "../../containers/HomeContainer";
import { width } from "../../layouts/dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LinearGradient } from "expo-linear-gradient";
import LoadingComp from "../../components/LoadingComp";
import FrameBox from "../../layouts/FrameBox";
import { Row } from "../../layouts/FlexBox";

export type Categories =
  | "sports"
  | "nigeria"
  | "africa"
  | "world"
  | "special event";

const Wrapper = ({ children }) => {
  return <View>{children}</View>;
};

const deviceWidth = Dimensions.get("window").width;
const FIXED_BAR_WIDTH = width;
const BAR_SPACE = 5;

export const WordPressCardSlide = ({ posts, navigation }) => {
  const { navigate } = navigation;

  const numItems = 5;
  const itemWidth = FIXED_BAR_WIDTH / numItems - (numItems - 2) * BAR_SPACE;
  const animVal = new Animated.Value(0);

  const barArray = new Array(5).fill("").map((_e, i: number) => {
    const scrollBarVal = animVal.interpolate({
      inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: "clamp",
    });

    return (
      <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            width: itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              width: itemWidth,
              transform: [{ translateX: scrollBarVal }],
            },
          ]}
        />
      </View>
    );
  });

  const showPosts = posts.slice(0, 5).map((post) => (
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
        locations={[0, 0.6]}
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
        <View style={{ paddingHorizontal: "7%", paddingVertical: "12%" }}>
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
    <View
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={10}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animVal } } }],
          { useNativeDriver: false }
        )}
      >
        {showPosts}
      </ScrollView>
      <View style={styles.barContainer}>{barArray}</View>
    </View>
  );
};

export const WordPressThumbnailList = ({ posts, navigation, categories }) => {
  const { navigate } = navigation;

  const { data } = categories;

  const showPosts = posts.slice(11).map((post: any) => {
    const cats = data.filter(
      (cat: { parent: number; name: string; id: number }) =>
        cat.parent === 0 && post.categories.includes(cat.id)
    );

    return (
      <Card
        key={post.key}
        style={{
          height: 150,
          marginVertical: 5,
          marginHorizontal: "4%",
          elevation: 2,
        }}
        onPress={() =>
          navigate("PostScreen", { title: post.title, id: post.id })
        }
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
            <View>
              {cats.map((c: any) => (
                <Text key={c.id} style={{ color: "rgba(4, 146, 220, 1)" }}>
                  #{c.name}
                </Text>
              ))}
            </View>
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
              <Paragraph style={styles.date}>{post.author}</Paragraph>
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
    );
  });

  if (posts.length === 0) {
    return (
      <FrameBox>
        <LoadingComp />
      </FrameBox>
    );
  }

  return <Wrapper>{showPosts}</Wrapper>;
};

export const WordPressCard = ({
  posts,
  navigation,
  categories,
  offset = 0,
}) => {
  const { navigate } = navigation;

  const { data } = categories;
  const slice = (data: any[]) => {
    if (offset === 0) return data;
    else return data.slice(5, 15);
  };

  const showPosts = slice(posts).map((post) => {
    const cats = data.filter(
      (cat: { parent: number; name: string; id: number }) =>
        cat.parent === 0 && post.categories.includes(cat.id)
    );

    return (
      <Card
        key={post.key}
        onPress={() =>
          navigate("PostScreen", { title: post.title, id: post.id })
        }
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
          <Row style={{ marginBottom: 10 }}>
            {cats.map((c: any) => (
              <View
                key={c.id}
                style={{
                  backgroundColor: "rgba(4, 146, 220, 1)",
                  width: "auto",
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {c.name}
                </Text>
              </View>
            ))}
          </Row>
          <Paragraph style={styles.cardHeading}>{post.title}</Paragraph>
          <Paragraph style={styles.date}>{post.date}</Paragraph>
        </Card.Content>
      </Card>
    );
  });

  return <View>{showPosts}</View>;
};

const TestingAllComp = ({ posts, navigation, categories }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TopStory", title: "Top Stories" },
    { key: "Nigeria", title: "Nigeria" },
    { key: "Africa", title: "Africa" },
    { key: "World", title: "World" },
    { key: "Sports", title: "Sports" },
    { key: "SpacialDayEvents", title: "Events" },
    { key: "Live", title: "Live" },
  ]);

  const args = { posts, navigation, categories, offset: 5 };
  const initialLayout = {
    width: Dimensions.get("window").width,
  };

  const TopStoryRoute = () =>
    useMemo(
      () => (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <WordPressCardSlide {...args} />
          <WordPressCard {...args} />
          <WordPressThumbnailList {...args} />
        </ScrollView>
      ),
      [args]
    );

  const CategoryView = ({ catName }: { catName: Categories }) => {
    const { isFetching, data } = categories;

    if (isFetching || data.length === 0) {
      return (
        <FrameBox>
          <LoadingComp />
        </FrameBox>
      );
    }

    const selectedCat = data.find(
      (cat: { parent: number; name: string }) =>
        cat.parent === 0 && cat.name.toLowerCase() === catName
    );

    const filteredPost = posts.filter((post: any) => {
      return post.categories.includes(selectedCat.id);
    });

    if (filteredPost.length === 0) {
      return (
        <FrameBox>
          <Text>No news</Text>
        </FrameBox>
      );
    }

    const { navigate } = navigation;
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {filteredPost.map((post) => (
          <Card
            key={post.key}
            onPress={() =>
              navigate("PostScreen", { title: post.title, id: post.id })
            }
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
        ))}
      </ScrollView>
    );
  };
  const NigeriaRoute = () => <CategoryView catName="nigeria" />;
  const AfricaRoute = () => <CategoryView catName="africa" />;
  const WorldRoute = () => <CategoryView catName="world" />;
  const SportsRoute = () => <CategoryView catName="sports" />;
  const SpacialDayEventsRoute = () => <CategoryView catName="special event" />;
  const LiveRoute = () => (
    <FrameBox>
      <Text>Live</Text>
    </FrameBox>
  );

  const renderScene = useMemo(
    () =>
      SceneMap({
        TopStory: TopStoryRoute,
        Nigeria: NigeriaRoute,
        Africa: AfricaRoute,
        World: WorldRoute,
        Sports: SportsRoute,
        SpacialDayEvents: SpacialDayEventsRoute,
        Live: LiveRoute,
      }),
    [TopStoryRoute]
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
      style={{ width: width }}
      renderTabBar={_renderTabBar}
      swipeEnabled={false}
      initialLayout={initialLayout}
    />
  );
};

export default HomeContainer(TestingAllComp);

export const PostsRegister = [
  { name: "Thumbnail List", comp: WordPressThumbnailList },
  { name: "Card", comp: WordPressCard },
  { name: "Card Slide", comp: WordPressCardSlide },
];

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
  barContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 25,
    flexDirection: "row",
  },
  track: {
    backgroundColor: "#cccccc",
    overflow: "hidden",
    height: 4,
    borderRadius: 4,
  },
  bar: {
    backgroundColor: "#5294d6",
    height: 4,
    position: "absolute",
    left: 0,
    top: 0,
  },
});
