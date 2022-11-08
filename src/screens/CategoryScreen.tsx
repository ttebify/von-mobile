import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { allowedCategoryLists } from "../components/DrawerComp";
import LoadingComp from "../components/LoadingComp";
import HomeContainer from "../containers/HomeContainer";
import theme from "../customTheme";
import FrameBox from "../layouts/FrameBox";

const { colors } = theme();

const CategoryThumbnailList = ({ posts, navigation, categories }: any) => {
  const { navigate } = navigation;

  const showFirstPosts = categories.data.map((category: any, index) => {
    const post = posts.find((p: any) => p.categories.includes(category.id));

    const route = category.name;
    const screenName = allowedCategoryLists.includes(route) ? route : "Others";

    if (!post) return null;

    return (
      <TouchableOpacity
        key={`${post.id}-${index}`}
        style={{
          height: 130,
          marginVertical: 8,
          marginHorizontal: "3%",
          elevation: 8,
          shadowColor: "rgba(0, 0, 0, 0.04)",
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 8,
          overflow: "hidden",
        }}
        onPress={() => navigate(screenName, { categoryName: route })}
        activeOpacity={0.8}
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
              <Text key={category.id} style={{ color: "rgba(4, 146, 220, 1)" }}>
                {category.name}
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "400",
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
          <View style={{ width: "45%" }}>
            <Card.Cover
              style={{ flex: 1 }}
              source={{ uri: post.media.full.source_url }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return <View style={{ backgroundColor: "#F5F5F5" }}>{showFirstPosts}</View>;
};

function CategoryScreen({ categories, posts, isFetching, navigation }: any) {
  const args = { posts, navigation, categories };
  return (
    <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
      {isFetching || posts.length === 0 ? (
        <FrameBox style={{ marginTop: 20 }}>
          <LoadingComp />
          <Text>Please wait...</Text>
        </FrameBox>
      ) : (
        <CategoryThumbnailList {...args} />
      )}
    </ScrollView>
  );
}

export default HomeContainer(CategoryScreen);

const styles = StyleSheet.create({
  date: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
