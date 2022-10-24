import React from "react";
import PostsContainer from "../containers/PostsContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Button } from "react-native-paper";
import Loading from "./LoadingComp";
import { WordPressCard } from "../builder/components/WordPressPostsComp";

const Posts = ({
  posts = [],
  fetchMore,
  isFetching,
  navigation,
  categories,
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
        <Loading />
      ) : (
        <Box style={{ pMarginLeft: 30, pMarginRight: 30, marginVertical: 10 }}>
          <Button icon="refresh" mode="text" onPress={() => fetchMore()}>
            More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PostsContainer(Posts);
