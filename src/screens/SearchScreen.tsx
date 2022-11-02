import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Paragraph } from "react-native-paper";
import Divider from "../components/Divider";
import { allowedCategoryLists } from "../components/DrawerComp";
import LoadingComp from "../components/LoadingComp";
import CategoriesContainer from "../containers/CategoriesContainer";
import { Row } from "../layouts/FlexBox";

function SearchScreen({
  navigation,
  searchTerm,
  categories,
  isFetching,
  posts,
}: any) {
  const { navigate } = navigation;

  const root = categories.filter(
    (cat: { parent: number; name: string }) =>
      cat.parent === 0 && allowedCategoryLists.includes(cat.name.toLowerCase())
  );

  const filteredPosts = posts.filter((post) => {
    return (
      searchTerm.length > 3 &&
      post.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  const showPosts = filteredPosts.map((post: any) => {
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
        </View>
      </Card>
    );
  });

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: "5%" }}>
      {isFetching ? (
        <Row style={{ justifyContent: "center", paddingVertical: 10 }}>
          <LoadingComp />
          <Text> Grouping categories...</Text>
        </Row>
      ) : (
        <Row style={{ flexWrap: "wrap" }}>
          {root.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={{
                padding: 5,
                backgroundColor: "#fff",
                borderRadius: 2,
                margin: 6,
              }}
              onPress={() =>
                navigate("PostsScreen", { title: cat.name, categories: cat.id })
              }
            >
              <Text>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </Row>
      )}
      <Divider />
      {showPosts}
    </ScrollView>
  );
}

export default CategoriesContainer(SearchScreen);

const styles = StyleSheet.create({
  text: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
});
