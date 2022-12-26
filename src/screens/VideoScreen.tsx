import { LinearGradient } from "expo-linear-gradient";
import React, { Fragment } from "react";
import {
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, Paragraph, Title, TouchableRipple } from "react-native-paper";
import LoadingComp from "../components/LoadingComp";
import VideosContainer from "../containers/VideosContainer";
import YoutubePlayer from "react-native-youtube-iframe";

function VideoScreen({
  videos,
  latestVideos,
  fetchingLatestVideos,
  fetchLatestVideos,
  isFetching,
  navigation,
}: any) {
  const { navigate } = navigation;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ paddingHorizontal: "4%" }}
        refreshControl={
          <RefreshControl
            refreshing={fetchingLatestVideos}
            onRefresh={fetchLatestVideos}
          />
        }
      >
        <Title style={{ marginVertical: 20 }}>Latest Videos</Title>

        {fetchingLatestVideos ? (
          <View>
            <Text>
              <LoadingComp /> Fetching Latest Videos...
            </Text>
          </View>
        ) : (
          <Fragment>
            {latestVideos.length === 0 ? (
              <View>
                <Text>No latest videos</Text>
              </View>
            ) : (
              latestVideos.map((item) => (
                <Card
                  key={item.id}
                  style={{
                    borderRadius: 3,
                    marginVertical: "3%",
                    elevation: 2,
                    backgroundColor: "white",
                  }}
                >
                  <Fragment>
                    <ImageBackground
                      source={{ uri: item.media.high.url }}
                      resizeMode="cover"
                      style={styles.image}
                    >
                      <LoadingComp
                        style={{
                          position: "absolute",
                          top: "40%",
                          marginHorizontal: "50%",
                        }}
                      />
                      <YoutubePlayer
                        height={185}
                        videoId={item.id}
                        webViewStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0)",
                        }}
                        webViewProps={{
                          renderToHardwareTextureAndroid: true,
                          androidLayerType:
                            Platform.OS === "android" && Platform.Version <= 22
                              ? "hardware"
                              : "none",
                        }}
                        initialPlayerParams={{
                          modestbranding: true,
                        }}
                      />
                    </ImageBackground>
                    <Card.Content style={styles.container}>
                      <Paragraph style={styles.cardHeading}>
                        {item.title}
                      </Paragraph>
                      <Paragraph style={styles.date}>{item.date}</Paragraph>
                    </Card.Content>
                  </Fragment>
                </Card>
              ))
            )}
          </Fragment>
        )}
        <Title style={{ marginVertical: 20 }}>Our Playlists</Title>
        {typeof isFetching === "undefined" || isFetching ? (
          <View>
            <Text>Fetching Latest Videos...</Text>
          </View>
        ) : (
          <Fragment>
            {videos.length === 0 ? (
              <View>
                <Text>No latest videos</Text>
              </View>
            ) : (
              videos.reverse().map((item) => (
                <Card
                  key={item.key}
                  style={{
                    height: 180,
                    width: "100%",
                    marginVertical: 10,
                    position: "relative",
                    flex: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    elevation: 4,
                  }}
                >
                  <Card.Cover
                    source={{ uri: item.media.standard.url }}
                    style={{ flex: 1 }}
                  />
                  <TouchableRipple
                    onPress={() =>
                      navigate("VideosScreen", { playlistId: item.id })
                    }
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      flex: 1,
                    }}
                  >
                    <LinearGradient
                      colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.67)"]}
                      locations={[0, 0.8]}
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
                      <View
                        style={{
                          paddingHorizontal: "7%",
                          paddingVertical: "12%",
                        }}
                      >
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
                  </TouchableRipple>
                </Card>
              ))
            )}
          </Fragment>
        )}
      </ScrollView>
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
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.89,
  },
  container: { padding: "1%" },
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
});
