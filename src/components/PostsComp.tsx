import React from "react";
import PostsContainer from "../containers/PostsContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Button } from "react-native-paper";
import Loading from "./LoadingComp";
import { WordPressCard } from "../builder/components/WordPressPostsComp";
import { Row } from "../layouts/FlexBox";
import { Text } from "react-native";

const Posts = ({
  posts = [],
  fetchMore,
  isFetching,
  navigation,
  categories,
  categoryName,
}: any) => {
  const args = {
    posts,
    isFetching,
    navigation,
    categories: { data: [categories] },
    offset: 0,
  };

  return (
    <Box>
      <WordPressCard {...args} />
      {isFetching ? (
        <Row style={{ justifyContent: "center", paddingVertical: 10 }}>
          <Loading />
          <Text> Fetching news in {categoryName.toLowerCase()}</Text>
        </Row>
      ) : (
        <Box style={{ marginVertical: 10 }}>
          <Text style={{ textAlign: "center" }}>
            Nothing to show, try to load more content
          </Text>
          <Button icon="refresh" mode="text" onPress={() => fetchMore()}>
            Reload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PostsContainer(Posts);
