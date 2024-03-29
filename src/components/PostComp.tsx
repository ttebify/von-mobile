import React, { useCallback, useEffect, useState } from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostContainer from "../containers/PostContainer";
import { default as Box } from "../layouts/ResponsiveBox";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import HTML from "react-native-render-html";
import { width } from "../layouts/dimensions";
import theme from "../customTheme";
import { Row } from "../layouts/FlexBox";
import ModalBottom from "./ModalButtom";
import PostComments from "./comments/PostCommentComp";
import CommentTextBox from "./comments/CommentTextBox";

const tagsStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "400" as const,
  },
};

let checker = (arr: any[], target: any[]) =>
  target.some((v) => arr.includes(v));

const Post = ({
  post = {},
  posts,
  fetchPostsByCategory,
  fetchPostComments,
  isFetchingComments,
  postComment,
  addComment,
  navigation,
  comments,
}) => {
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [request, setRequest] = useState(0);
  const [commentModalVisible, setModalVisible] = useState(false);

  const { navigate } = navigation;

  const {
    title = "Post not found",
    content,
    date,
    media,
    author,
    link,
    id: postId = 0,
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
        console.log(request, "request");
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
        {media && (
          <Card.Cover
            source={{ uri: media.full.source_url }}
            theme={{ roundness: 0 }}
          />
        )}
        <Card.Content style={{ backgroundColor: colors.background }}>
          <Title style={{ fontSize: 28, marginVertical: 20, lineHeight: 36 }}>
            {title}
          </Title>
          <Row style={{ justifyContent: "space-between", marginTop: 15 }}>
            <Paragraph style={{ color: "rgba(174, 174, 174, 1)" }}>
              {author}
            </Paragraph>
            <Paragraph style={{ color: "rgba(174, 174, 174, 1)" }}>
              {date}
            </Paragraph>
          </Row>
          <Row style={{ paddingVertical: 20, justifyContent: "space-between" }}>
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
              Comments
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
        modalTitle={`Comments on: ${title}`}
        modalFooter={
          <CommentTextBox
            postCommtentHandler={postComment}
            postId={postId}
            addToOfflineComment={addComment}
          />
        }
        fetchingComments={isFetchingComments}
        refreshComments={() => fetchPostComments(postId)}
      >
        <PostComments
          comments={comments}
          fetching={isFetchingComments}
          fetchCommentsHandler={() => fetchPostComments(postId)}
        />
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
        {relatedPosts.map((post, index) => (
          <TouchableOpacity
            key={`${post.key}-${index}`}
            style={{
              height: 120,
              marginVertical: 5,
              marginHorizontal: "4%",
              elevation: 2,
              backgroundColor: "white",
            }}
            activeOpacity={0.8}
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
              <View style={{ width: "40%" }}>
                <Card.Cover
                  style={{ flex: 1 }}
                  source={{ uri: post.media.full.source_url }}
                />
              </View>
            </View>
          </TouchableOpacity>
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
