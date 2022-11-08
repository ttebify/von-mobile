import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, IconButton, Paragraph } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
import OfflineDataContainer from "../containers/OfflineDataContainer";
import FrameBox from "../layouts/FrameBox";

function BookmarkScreen({
  bookMarkedPosts,
  isFetching,
  navigation,
  removeFromBookmark,
}) {
  const { navigate } = navigation;

  if (isFetching) {
    return (
      <FrameBox>
        <LoadingComp />
        <Text>Loading your bookmarks...</Text>
      </FrameBox>
    );
  }

  if (bookMarkedPosts.length === 0) {
    return (
      <FrameBox style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "300", textAlign: "center" }}>
          There is nothing saved here; go to a post you like and save to your
          news.
        </Text>
      </FrameBox>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {bookMarkedPosts.map((post, index) => (
        <Card
          key={`${post.key}-${index}`}
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
            <View style={{ width: "40%", margin: 2, position: "relative" }}>
              <Card.Cover
                style={{ flex: 1 }}
                source={{ uri: post.media.full.source_url }}
              />
              <IconButton
                icon="close-circle"
                color="#E62B34"
                size={30}
                onPress={() => removeFromBookmark(post.id)}
                style={{ position: "absolute", top: 2, right: 2 }}
              />
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

export default OfflineDataContainer(BookmarkScreen);

const styles = StyleSheet.create({
  date: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
