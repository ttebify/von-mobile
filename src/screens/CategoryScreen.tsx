import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
// import CategoriesContainer from "../containers/CategoriesContainer";
import HomeContainer from "../containers/HomeContainer";
import theme from "../customTheme";
import FrameBox from "../layouts/FrameBox";

const { colors } = theme();

const CategoryThumbnailList = ({ posts, navigation, categories }: any) => {
  const { navigate } = navigation;

  const showFirstPosts = categories.data.map((category: any) => {
    const post = posts.find(
      (p: any) => category.parent === 0 && p.categories.includes(category.id)
    );

    if (!post) return null;

    return (
      <Card
        key={post.id}
        style={{
          height: 150,
          marginVertical: 5,
          marginHorizontal: "4%",
          elevation: 2,
        }}
        onPress={() =>
          navigate("PostsScreen", {
            title: category.name,
            categories: category.id,
          })
        }
      >
        <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}>
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
                <Text
                  key={category.id}
                  style={{ color: "rgba(4, 146, 220, 1)" }}
                >
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
            <View style={{ width: "45%", margin: 2 }}>
              <Card.Cover
                style={{ flex: 1 }}
                source={{ uri: post.media.full.source_url }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  });

  return <View>{showFirstPosts}</View>;
};

function CategoryScreen({ categories, posts, isFetching, navigation }: any) {
  const args = { posts, navigation, categories, offset: 5 };

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
