import { Fragment, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, Card, Paragraph, TouchableRipple } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
import HomeContainer from "../containers/HomeContainer";
import { Box } from "../layouts/FlexBox";
import FrameBox from "../layouts/FrameBox";

export type Categories =
  | "sports"
  | "nigeria"
  | "africa"
  | "world"
  | "special event";

const CategoryViewScreen = ({
  catName,
  categories,
  posts,
  isFetching: fetchingPosts,
  fetchMoreByCategory,
  navigation,
}: {
  catName: Categories;
  [index: string]: any;
}) => {
  const { isFetching, data } = categories;

  if (isFetching || !data || data.length === 0) {
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
    return post.categories.includes(selectedCat?.id);
  });

  useEffect(() => {
    if (selectedCat && !isFetching) {
      fetchMoreByCategory(selectedCat?.id);
    }
  }, [selectedCat, isFetching]);

  if (filteredPost.length === 0) {
    return (
      <FrameBox>
        {fetchingPosts ? (
          <Text>Please wait...</Text>
        ) : (
          <Text>Try to reload</Text>
        )}
        <Box style={{ pMarginLeft: 30, pMarginRight: 30, marginVertical: 10 }}>
          {fetchingPosts ? (
            <LoadingComp />
          ) : (
            <Box
              style={{
                pMarginLeft: 30,
                pMarginRight: 30,
                marginVertical: 10,
              }}
            >
              <Button
                icon="refresh"
                mode="text"
                onPress={() => fetchMoreByCategory(selectedCat.id)}
              >
                Reload
              </Button>
            </Box>
          )}
        </Box>
      </FrameBox>
    );
  }

  const { navigate } = navigation;
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {filteredPost.map((post) => (
        <TouchableRipple
          key={post.key}
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
              pMarginLeft: 30,
              pMarginRight: 30,
              marginVertical: 10,
            }}
          >
            <Button
              icon="refresh"
              mode="text"
              onPress={() => fetchMoreByCategory(selectedCat.id)}
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
