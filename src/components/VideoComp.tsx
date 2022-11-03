import React, { Fragment, useEffect, useState } from "react";
import { Card, Paragraph, TouchableRipple } from "react-native-paper";
import VideosContainer from "../containers/VideosContainer";
import axios from "axios";
import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { Row } from "../layouts/FlexBox";
import YoutubePlayer from "react-native-youtube-iframe";
import LoadingComp from "./LoadingComp";
import moment from "moment";
import FrameBox from "../layouts/FrameBox";

const api = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
});
const API_KEY = "AIzaSyBGn-myMPW6x7kAxQ10muNCMqrkbcJFcPs";

const Videos = ({ isFetching, playlistId }: any) => {
  const [videos, setVideo] = useState<any[]>([]);
  //   const [like, setLike] = useState<any>([]);
  //   const [comment, setComment] = useState<any>([]);
  const [view, setView] = useState([]);

  async function videoAPI() {
    const { data: items } = await api.get("/playlistItems", {
      params: {
        part: "snippet",
        playlistId: playlistId,
        maxResults: "10",
        key: API_KEY,
      },
    });

    setVideo(items.items);
  }

  async function detailAPI() {
    const showVideoID = videos.map((video) => video.snippet.resourceId.videoId);

    const { data: items } = await api.get("/videos", {
      params: {
        part: "statistics",
        id: `${showVideoID}`,
        key: API_KEY,
      },
    });

    // setLike(items.items.map((item) => item.statistics.likeCount));
    // setComment(items.items.map((item) => item.statistics.commentCount));
    setView(items.items.map((item) => item.statistics.viewCount));
  }

  useEffect(() => {
    videoAPI();
  }, [playlistId]);

  useEffect(() => {
    detailAPI();
  }, [videos]);

  if (isFetching) {
    return (
      <FrameBox>
        <LoadingComp />
        <Text>Fetching Videos</Text>
      </FrameBox>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(video) => video.id}
      showsHorizontalScrollIndicator={false}
      extraData={view}
      renderItem={({ item, index }) => (
        <TouchableRipple
          key={item.id}
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
            <ImageBackground
              source={{ uri: item.snippet.thumbnails.high.url }}
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
                videoId={item.snippet.resourceId.videoId}
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
                {item.snippet.title}
              </Paragraph>
              <Row style={{ justifyContent: "space-between", marginTop: 15 }}>
                <Paragraph>{view[index]} views</Paragraph>
                {
                  <Paragraph>
                    {moment(
                      item.snippet.publishedAt,
                      "YYYY-MM-DD HH:mm:ss"
                    ).fromNow()}
                  </Paragraph>
                }
              </Row>
            </Card.Content>
          </Fragment>
        </TouchableRipple>
      )}
    />
  );
};

export default VideosContainer(Videos);

const styles = StyleSheet.create({
  container: { padding: "5%" },
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
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.89,
  },
});
