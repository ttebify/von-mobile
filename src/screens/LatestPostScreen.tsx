import React, { useEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import {
  WordPressCard,
  WordPressThumbnailList,
} from "../builder/components/WordPressPostsComp";
import { WordPressCardSlide } from "../components/WordPressCardSlide";
import HomeContainer from "../containers/HomeContainer";

const LatestPostScreen = ({
  posts,
  navigation,
  isFetching,
  categories,
  refreshPost,
}) => {
  const args = { navigation, categories };

  useEffect(() => {
    const unsubscribe = navigation
      .getParent()
      .addListener("tabPress", (e: { target: string }) => {
        // Prevent default behavior
        if (e.target.startsWith("Home")) {
          navigation.navigate("Latest");
        }
      });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refreshPost} />
      }
    >
      <WordPressCardSlide posts={posts.slice(0, 5)} {...args} />
      <WordPressCard posts={posts} offset={1} {...args} />
      <WordPressThumbnailList posts={posts} offset={1} {...args} />
    </ScrollView>
  );
};

export default HomeContainer(LatestPostScreen);
