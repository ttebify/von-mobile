import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { width } from "../layouts/dimensions";

const deviceWidth = width;
const FIXED_BAR_WIDTH = width;
const BAR_SPACE = 5;

export const WordPressCardSlide = ({ posts, navigation }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { navigate } = navigation;
  const sliderRef = useRef<ScrollView>(null);

  const numItems = 5;
  const itemWidth = FIXED_BAR_WIDTH / numItems - (numItems - 2) * BAR_SPACE;
  const animVal = new Animated.Value(0);

  useEffect(() => {
    const handler = setInterval(() => {
      if (scrollIndex >= deviceWidth * (numItems - 1)) {
        setScrollIndex(0);
      } else {
        setScrollIndex((index) => (index += deviceWidth));
      }
      sliderRef.current?.scrollTo({ x: scrollIndex, y: 0, animated: true });
    }, 4000);

    return () => clearTimeout(handler);
  }, [scrollIndex]);

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
            <Paragraph style={styles.heroSmallText}>{post.author}</Paragraph>
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
        ref={sliderRef}
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
      {posts.length > 0 && (
        <Image
          source={{
            uri: "https://von.gov.ng/wp-content/uploads/2022/10/media-literacy-week-scaled.jpg",
          }}
          style={{ width, height: 62, marginVertical: 8 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    backgroundColor: "#cccccc",
    overflow: "hidden",
    height: 4,
    borderRadius: 4,
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
    bottom: 100,
    flexDirection: "row",
  },

  bar: {
    backgroundColor: "#5294d6",
    height: 4,
    position: "absolute",
    left: 0,
    top: 0,
  },
});
