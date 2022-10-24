import React from "react";
import { View } from "react-native";
import PostContainer from "../containers/PostContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Card, Title, Paragraph } from "react-native-paper";
//import Loading from './LoadingComp';
import HTML from "react-native-render-html";
import { width } from "../layouts/dimensions";
import theme from "../customTheme";
import { Row } from "../layouts/FlexBox";

const tagsStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "400" as const,
  },
};

const Post = ({ post = {} }) => {
  const {
    title = "Post not found",
    content,
    date,
    media,
    author,
  } = post as any;
  const { colors } = theme();

  return (
    <View>
      <Card theme={{ roundness: 0 }}>
        {media && <Card.Cover source={{ uri: media.full.source_url }} />}
        <Card.Content style={{ backgroundColor: colors.background }}>
          <Title>{title}</Title>
          <Row style={{ justifyContent: "space-between", marginTop: 15 }}>
            <Paragraph>{author}</Paragraph>
            {date && <Paragraph>{date}</Paragraph>}
          </Row>
        </Card.Content>
      </Card>
      <Box style={{ pMarginLeft: 5, pMarginRight: 5 }}>
        {content && (
          <HTML
            contentWidth={width}
            source={{ html: content }}
            tagsStyles={tagsStyles}
          />
        )}
      </Box>
    </View>
  );
};

export default PostContainer(Post);
