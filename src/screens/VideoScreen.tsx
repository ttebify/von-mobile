import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
import VideosContainer from "../containers/VideosContainer";
import FrameBox from "../layouts/FrameBox";

function VideoScreen({ videos, isFetching, navigation }: any) {
  const { navigate } = navigation;

  if (typeof isFetching === "undefined" || isFetching) {
    <FrameBox>
      <LoadingComp />
    </FrameBox>;
  } else if (videos.length === 0) {
    return (
      <FrameBox>
        <Text>Nothing to load</Text>
      </FrameBox>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={videos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            key={item.key}
            style={{
              height: 300,
              width: "96%",
              marginHorizontal: "2%",
              marginVertical: 10,
              position: "relative",
              flex: 1,
            }}
          >
            <Card.Cover
              source={{ uri: item.media.medium.url }}
              style={{ flex: 1 }}
            />

            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.67)"]}
              locations={[0, 0.6]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <View style={{ paddingHorizontal: "7%", paddingVertical: "12%" }}>
                <Text
                  style={{
                    color: "white",
                    lineHeight: 21.78,
                    fontSize: 20,
                    marginBottom: "4%",
                    fontWeight: "600",
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Paragraph style={styles.heroSmallText}>
                    {item.itemCount} Videos in this playlist
                  </Paragraph>
                </View>
              </View>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => navigate("VideosScreen", { playlistId: item.id })}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flex: 1,
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default VideosContainer(VideoScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  demacate: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    borderRadius: 10,
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
  heroSmallText: {
    color: "white",
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400",
  },
});
