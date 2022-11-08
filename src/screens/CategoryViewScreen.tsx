import { Fragment, useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Card, Paragraph, TouchableRipple } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
import HomeContainer from "../containers/HomeContainer";
import { Box } from "../layouts/FlexBox";

export type Categories =
  | "sports"
  | "nigeria"
  | "africa"
  | "world"
  | "special event";

/* export const categoryBaseLists = [
  { id: 8, name: "Africa", slug: "africa" },
  {
    id: 10,
    name: "Agric/Environment",
    slug: "agric-environment",
  },
  {
    id: 33,
    name: "Blog",
    slug: "blog-posts",
  },
  {
    id: 5,
    name: "Business",
    slug: "business",
  },
  {
    id: 11,
    name: "Entertainment/Tourism",
    slug: "entertainment-tourism",
  },
  {
    id: 2,
    name: "Featured",
    slug: "featured",
  },
  {
    id: 7,
    name: "Health",
    slug: "health",
  },
  {
    id: 12,
    name: "News Commentary",
    slug: "news-commentary",
  },
  {
    id: 3,
    name: "Nigeria",
    slug: "nigeria",
  },
  {
    id: 4,
    name: "Politics",
    slug: "politics",
  },
  {
    id: 8117,
    name: "Special Event",
    slug: "special-event",
  },
  {
    id: 6,
    name: "Sports",
    slug: "sports",
  },
  {
    id: 10826,
    name: "Tech World",
    slug: "tech-world",
  },
  {
    id: 34,
    name: "Trending",
    slug: "trending",
  },
  {
    id: 1,
    name: "Uncategorized",
    slug: "uncategorized",
  },
  {
    id: 9,
    name: "World",
    slug: "world",
  },
]; */

const CategoryViewScreen = ({
  catName,
  categories,
  posts,
  isFetching: fetchingPosts,
  fetchMoreByCategory,
  navigation,
}: {
  catName: string;
  [index: string]: any;
}) => {
  const { data } = categories;

  const selectedCat = data.find(
    (cat) => cat.name.toLowerCase() === catName.toLowerCase()
  );

  const filteredPost = posts.filter((post: any) => {
    return post.categories.includes(selectedCat?.id);
  });

  useEffect(() => {
    if (selectedCat) {
      fetchMoreByCategory(selectedCat.id);
    }
  }, [selectedCat]); // fetching post

  if (filteredPost.length === 0) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={fetchingPosts}
            onRefresh={() => fetchMoreByCategory(selectedCat.id)}
          />
        }
      >
        <Box style={{ pMarginLeft: 30, pMarginRight: 30, marginVertical: 10 }}>
          {!fetchingPosts && (
            <Text style={{ textAlign: "center" }}>
              Sorry, there was a problem loading the news; pull to refresh this
              page
            </Text>
          )}
        </Box>
      </ScrollView>
    );
  }

  const { navigate } = navigation;
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={fetchingPosts}
          onRefresh={() => fetchMoreByCategory(selectedCat.id)}
        />
      }
    >
      {filteredPost.map((post, index) => (
        <TouchableRipple
          key={`${post.key}-${index}`}
          onPress={() =>
            navigate("PostScreen", { title: post.title, id: post.id })
          }
          style={{
            borderRadius: 3,
            marginHorizontal: "3%",
            marginVertical: "2%",
            elevation: 2,
            backgroundColor: "white",
          }}
          rippleColor="#CDDCDB"
        >
          <Fragment>
            <Card.Cover
              source={{ uri: post.media.full.source_url }}
              style={{ height: 192 }}
            />
            <Card.Content style={styles.container}>
              <Paragraph style={styles.cardHeading}>{post.title}</Paragraph>
              <Paragraph style={styles.date}>{post.date}</Paragraph>
            </Card.Content>
          </Fragment>
        </TouchableRipple>
      ))}
      <Box style={{ pMarginLeft: 30, pMarginRight: 30, marginVertical: 10 }}>
        {fetchingPosts ? (
          <LoadingComp />
        ) : (
          <Box
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
            }}
          >
            <Button
              icon="refresh"
              mode="text"
              onPress={() => selectedCat && fetchMoreByCategory(selectedCat.id)}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default HomeContainer(CategoryViewScreen);

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
});
