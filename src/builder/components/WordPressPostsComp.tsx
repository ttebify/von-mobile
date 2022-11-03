import React, { Fragment } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Card, Paragraph, TouchableRipple } from "react-native-paper";
import LoadingComp from "../../components/LoadingComp";
import FrameBox from "../../layouts/FrameBox";
import { Row } from "../../layouts/FlexBox";

const Wrapper = ({ children }) => {
  return <View>{children}</View>;
};

export const WordPressThumbnailList = ({
  posts,
  navigation,
  categories,
  offset = 0,
}) => {
  const { navigate } = navigation;

  const { data } = categories;
  const slice = (data: any[]) => {
    if (offset === 0) return data;
    else return data.slice(11);
  };

  const showPosts = slice(posts).map((post: any) => {
    const cats = data.filter(
      (cat: { parent: number; name: string; id: number }) =>
        cat.parent === 0 && post.categories.includes(cat.id)
    );

    return (
      <Card
        key={post.key}
        style={{
          height: 150,
          marginVertical: 5,
          marginHorizontal: "4%",
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={() =>
            navigate("PostScreen", { title: post.title, id: post.id })
          }
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
                fontWeight: "200",
                color: "rgba(0, 0, 0, 0.88)",
                fontSize: 15,
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
              <Paragraph style={styles.date}>{post.author}</Paragraph>
              <Paragraph style={styles.date}>{post.date}</Paragraph>
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

  if (posts.length === 0) {
    return (
      <FrameBox style={{ marginTop: 20 }}>
        <LoadingComp />
      </FrameBox>
    );
  }

  return <Wrapper>{showPosts}</Wrapper>;
};

export const WordPressCard = ({
  posts,
  navigation,
  categories,
  offset = 0,
}) => {
  const { navigate } = navigation;

  const { data } = categories;
  const slice = (data: any[]) => {
    if (offset === 0) return data;
    else return data.slice(5, 11);
  };

  const showPosts = slice(posts).map((post) => {
    const cats = data.filter(
      (cat: { parent: number; name: string; id: number }) =>
        cat.parent === 0 && post.categories.includes(cat.id)
    );

    return (
      <TouchableRipple
        key={post.id}
        onPress={() =>
          navigate("PostScreen", { title: post.title, id: post.id })
        }
        style={{
          borderRadius: 3,
          marginHorizontal: "3%",
          marginVertical: "3%",
          elevation: 2,
          backgroundColor: "white",
        }}
        rippleColor="#CDDCDB"
      >
        <Fragment>
          <Card.Cover
            source={{ uri: post.media.full.source_url }}
            style={{ height: 192 }}
          />
          <Card.Content style={styles.container}>
            <Row style={{ marginBottom: 10 }}>
              {cats.map((c: any) => (
                <View
                  key={c.id}
                  style={{
                    backgroundColor: "rgba(4, 146, 220, 1)",
                    width: "auto",
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 3,
                    marginRight: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {c.name}
                  </Text>
                </View>
              ))}
            </Row>
            <Paragraph style={styles.cardHeading}>{post.title}</Paragraph>
            <Paragraph style={styles.date}>{post.date}</Paragraph>
          </Card.Content>
        </Fragment>
      </TouchableRipple>
    );
  });

  return <View>{showPosts}</View>;
};

const styles = StyleSheet.create({
  cardHeading: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16.94,
    color: "rgba(0, 0, 0, 0.9)",
  },
  date: {
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
  },
  container: {
    padding: "5%",
  },
});
