import React, { useCallback, useEffect, useState } from "react";
import { Share, StyleSheet, Text, View } from "react-native";
import PostContainer from "../containers/PostContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  IconButton,
} from "react-native-paper";
import HTML from "react-native-render-html";
import { width } from "../layouts/dimensions";
import theme from "../customTheme";
import { Row } from "../layouts/FlexBox";
import ModalBottom from "./ModalButtom";

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
      user: "john@gmail.com",
      time: "45sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
    {
      id: "u33idk",
      user: "amos@gmail.com",
      time: "3sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
    {
      id: "uy5idk",
      user: "ttebify@gmail.com",
      time: "38sec ago",
      comment:
        "The President was received on arrival by his Chief of Staff, Professor Ibrahim Gambari and Minister of the Federal Capital Territory, Mohammed Bello as well as heads of security agencies.",
    },
  ];

  comments = coms;
  return (
    <View>
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

let checker = (arr: any[], target: any[]) =>
  target.some((v) => arr.includes(v));

const Post = ({ post = {}, posts, fetchPostsByCategory, navigation }) => {
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [request, setRequest] = useState(0);
  const [commentModalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState("");

  const { navigate } = navigation;

  const {
    title = "Post not found",
    content,
    date,
    media,
    author,
    link,
    id: postId,
    categories,
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

  const toggleModal = () => {
    setModalVisible((p) => !p);
  };

  useEffect(() => {
    const findOrFetchPostsByCategory = async () => {
      if (posts.length === 0) return [];

      const filtered = posts.filter(
        (post) => checker(categories, post.categories) && post.id !== postId
      );

      setRelatedPosts(filtered);

      if (filtered.length < 5) {
        // fetch more
        setRequest((c) => c + 1);
        if (request < 1) {
          fetchPostsByCategory(categories);
        }
      }
    };

    findOrFetchPostsByCategory();
  }, [categories, postId, posts]);

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
              onPress={toggleModal}
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
      <ModalBottom
        visible={commentModalVisible}
        setVisible={setModalVisible}
        containerStyle={{
          padding: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        modalTitle={`Comments ${title}`}
        modalFooter={
          <Row style={{ position: "relative" }}>
            <TextInput
              mode="outlined"
              label="Add your comment"
              value={text}
              onChangeText={(text) => setText(text)}
              multiline
              numberOfLines={4}
              style={{ width: "100%" }}
            />
            <IconButton
              icon="send"
              size={30}
              style={{ position: "absolute", top: "25%", right: 10 }}
              onPress={() => {}}
              color="#5F6368"
            />
          </Row>
        }
      >
        <PostComments comments={[]} />
      </ModalBottom>

      <View>
        <Text
          style={{
            margin: 10,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          You Might Also Like
        </Text>
        {relatedPosts.map((post) => (
          <Card
            key={post.key}
            style={{
              height: 120,
              marginVertical: 5,
              marginHorizontal: "4%",
              elevation: 2,
            }}
            onPress={() =>
              navigate("PostScreen", { title: post.title, id: post.id })
            }
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
                <Text
                  style={{
                    fontWeight: "400",
                    color: "rgba(0, 0, 0, 0.88)",
                    fontSize: 12,
                    lineHeight: 20,
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
              <View style={{ width: "40%", margin: 2 }}>
                <Card.Cover
                  style={{ flex: 1 }}
                  source={{ uri: post.media.full.source_url }}
                />
              </View>
            </View>
          </Card>
        ))}
      </View>
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
  date: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
