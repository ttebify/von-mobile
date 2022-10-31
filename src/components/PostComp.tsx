import React, { useCallback, useState } from "react";
import { Share, StyleSheet, Text, View } from "react-native";
import PostContainer from "../containers/PostContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Card, Title, Paragraph, Button } from "react-native-paper";
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

interface CommentProps {
  comments: any[];
}
const PostComments = ({ comments }: CommentProps) => {
  const coms = [
    {
      id: "uyuidk",
      user: "edr4ze@gmail.com",
      time: "45sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
    {
      id: "u33idk",
      user: "ezesd3@gmail.com",
      time: "3sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
    {
      id: "uy5idk",
      user: "eze@gmail.com",
      time: "38sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
  ];

  comments = coms;
  return (
    <View>
      <Text
        style={{
          marginVertical: 30,
          fontSize: 20,
          textAlign: "center",
          fontWeight: "300",
        }}
      >
        Comment Section
      </Text>
      {comments.map((comment) => (
        <Card key={comment.id} style={{ marginBottom: 20 }}>
          <Card.Title
            title={comment.user}
            subtitle={comment.time}
            titleStyle={{ fontWeight: "400", color: "rgba(0, 0, 0, 0.78)" }}
          />
          <Card.Content>
            <Paragraph>{comment.comment}</Paragraph>
            <Row>
              <Button
                icon="reply"
                mode="text"
                onPress={() => {}}
                style={styles.actionButtons}
                labelStyle={{ fontSize: 14 }}
                uppercase={false}
              >
                Reply
              </Button>
            </Row>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};
const Post = ({ post = {} }) => {
  const [liked, setLiked] = useState(false);

  const {
    title = "Post not found",
    content,
    date,
    media,
    author,
    link,
  } = post as any;
  const { colors } = theme();

  const _handleShare = useCallback(async () => {
    const template = `${title} ${link}`;

    try {
      await Share.share({
        message: template,
        url: link,
        title: title,
      });
    } catch (error) {
      console.error(error);
    }
  }, [title]);

  const likePost = () => {
    setLiked((p) => !p);
  };

  return (
    <View>
      <Card theme={{ roundness: 0 }}>
        {media && <Card.Cover source={{ uri: media.full.source_url }} />}
        <Card.Content style={{ backgroundColor: colors.background }}>
          <Title>{title}</Title>
          <Row style={{ justifyContent: "space-between", marginTop: 15 }}>
            <Paragraph style={{ color: "rgba(174, 174, 174, 1)" }}>
              {author}
            </Paragraph>
            <Paragraph style={{ color: "rgba(174, 174, 174, 1)" }}>
              {date}
            </Paragraph>
          </Row>
          <Row style={{ paddingVertical: 20 }}>
            <Button
              icon={liked ? "thumb-up" : "thumb-up-outline"}
              mode={liked ? "contained" : "outlined"}
              style={styles.actionButtons}
              contentStyle={{ flexDirection: "row-reverse" }}
              labelStyle={{ fontSize: 14 }}
              uppercase={false}
              color={liked ? "rgba(4, 98, 171, 1)" : "rgba(174, 174, 174, 1)"}
              onPress={likePost}
            >
              Like
            </Button>
            <Button
              icon="comment-text-outline"
              mode="outlined"
              style={styles.actionButtons}
              contentStyle={{ flexDirection: "row-reverse" }}
              labelStyle={{ fontSize: 14 }}
              uppercase={false}
              color="rgba(174, 174, 174, 1)"
            >
              Comment
            </Button>
            <Button
              icon="share-variant"
              mode="text"
              onPress={_handleShare}
              style={styles.actionButtons}
              contentStyle={{ flexDirection: "row-reverse" }}
              labelStyle={{ fontSize: 16 }}
              uppercase={false}
            >
              Share
            </Button>
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
      <PostComments comments={[]} />
    </View>
  );
};

export default PostContainer(Post);

const styles = StyleSheet.create({
  actionButtons: {
    margin: 6,
    borderWidth: 2,
    borderRadius: 20,
  },
});
