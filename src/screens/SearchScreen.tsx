import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Divider from "../components/Divider";
import { allowedCategoryLists } from "../components/DrawerComp";
import LoadingComp from "../components/LoadingComp";
import SearchContainer from "../containers/SearchContainer";
import { Row } from "../layouts/FlexBox";

function SearchScreen({
  navigation,
  categories,
  isFetching,
  searchedPosts,
  rawPostsBody,
  addApi,
  searchTerm,
}: any) {
  const [loading, setLoading] = useState(false);
  const { navigate } = navigation;

  const showPosts = searchedPosts.map((post: any) => {
    const cats = categories.filter(
      (cat: { parent: number; name: string; id: number }) =>
        cat.parent === 0 && post.categories.includes(cat.id)
    );

    return (
      <Card
        key={post.key}
        style={{
          height: 150,
          marginVertical: 5,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            opacity: loading ? 0.6 : 1,
          }}
          onPress={() => {
            // Add to post
            const rawPost = rawPostsBody.data.find((p) => p.id === post.id);
            if (rawPost) {
              setLoading(true);
              addApi("posts-0", rawPost).then(() => {
                setLoading(false);
                navigate("PostScreen", { title: post.title, id: post.id });
              });
            }
          }}
          disabled={loading}
        >
          <View
            style={{
              flex: 1,
              margin: 2,
              padding: "2%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View>
              {cats.map((c: any) => (
                <Text key={c.id} style={{ color: "rgba(4, 146, 220, 1)" }}>
                  {c.name}
                </Text>
              ))}
            </View>
            <Text
              style={{
                fontWeight: "300",
                color: "rgba(0, 0, 0, 0.88)",
                fontSize: 14,
                lineHeight: 22,
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
              <Paragraph style={styles.text}>{post.author}</Paragraph>
              <Paragraph style={styles.text}>{post.date}</Paragraph>
            </View>
          </View>
          <View style={{ width: "45%", margin: 2 }}>
            <Card.Cover
              style={{ flex: 1 }}
              source={{ uri: post.media.full.source_url }}
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  });

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: "3%" }}>
      <Row style={{ flexWrap: "wrap", marginTop: 10 }}>
        {allowedCategoryLists.map(({ name, label }) => (
          <TouchableOpacity
            key={name}
            style={{
              padding: 5,
              backgroundColor: "#fff",
              borderRadius: 2,
              margin: 6,
            }}
            onPress={() => navigate(name)}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </Row>

      <Divider />
      {isFetching ? (
        <Row style={{ justifyContent: "center", paddingVertical: 10 }}>
          <LoadingComp />
          <Text> Searching...</Text>
        </Row>
      ) : (
        <View>
          <Text
            style={{
              marginVertical: 10,
              opacity: 0.6,
              fontWeight: "300",
              textDecorationLine: "underline",
            }}
          >
            {searchTerm.length === 0
              ? "Look for trending news, topics, events, and everything going on around you, etc."
              : `Showing ${showPosts.length} results for (${searchTerm})`}
          </Text>
          {showPosts}
        </View>
      )}
    </ScrollView>
  );
}

export default SearchContainer(SearchScreen);

const styles = StyleSheet.create({
  text: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
