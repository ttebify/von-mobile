import React from "react";
import { View } from "react-native";
import PostContainer from "../containers/PostContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Card, Title, Paragraph } from "react-native-paper";
//import Loading from './LoadingComp';
import HTML from "react-native-render-html";
import { width } from "../layouts/dimensions";
import theme from "../customTheme";

const Post = ({ post = {} }) => {
  const { title = "Post not found", content, date, media } = post as any;
  const { colors } = theme();
  return (
    <View>
      <Card theme={{ roundness: 0 }}>
        {media && <Card.Cover source={{ uri: media.full.source_url }} />}
        <Card.Content style={{ backgroundColor: colors.background }}>
          <Title>{title}</Title>
          {date && <Paragraph>{date}</Paragraph>}
        </Card.Content>
      </Card>
      <Box style={{ pMarginLeft: 5, pMarginRight: 5 }}>
        {content && <HTML contentWidth={width} source={{ html: content }} />}
      </Box>
    </View>
  );
};

export default PostContainer(Post);
