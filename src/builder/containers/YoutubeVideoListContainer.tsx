import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { cancelToken, getApi } from "../../redux/api/action";
import set from "../../redux/global-state/action";
import * as dotProp from "./_dotProp";
import purgeHtml from "./_purgeHtml";

class YoutubeVideoListClass extends React.Component<any> {
  MAX_RESULT = 15;
  CHANNEL_ID = "UCg-nS6NlLNLem_3reVzEYAg";
  API_KEY = "AIzaSyBGn-myMPW6x7kAxQ10muNCMqrkbcJFcPs";
  URL = "https://www.googleapis.com/youtube/v3";

  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchPlaylistData = () => {
    let { getApi, appIndex } = this.props;
    let apiId = `videos-${appIndex}`;
    const { CHANNEL_ID, MAX_RESULT, API_KEY, URL } = this;

    // TODO: add cancel token
    return getApi(
      `${URL}/playlists`,
      {
        channelId: CHANNEL_ID,
        maxResults: MAX_RESULT,
        part: "snippet,contentDetails",
        key: API_KEY,
      },
      apiId
    );
  };

  prepareVideo(video = {}, key = 0) {
    const itemCount = dotProp.get(video, "contentDetails.itemCount", 0);

    if (itemCount === 0) return null;
    const id = dotProp.get(video, "id", "no-id");
    const title = dotProp.get(video, "snippet.title", "");
    const date = dotProp.get(video, "snippet.publishedAt", new Date());
    const media = dotProp.get(video, "snippet.thumbnails", {});

    const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();

    const {
      default: defaultSize = { url: "https://picsum.photos/200" },
      medium = { url: "https://picsum.photos/500" },
      high = { url: "https://picsum.photos/700" },
      standard = { url: "https://picsum.photos/700" },
    } = media;

    return {
      key: `video-${key}-${id}`,
      id,
      title: purgeHtml(title),
      itemCount,
      date: dateFromNow,
      media: { defaultSize, medium, high, standard },
    };
  }

  prepareVideos(videos: any[], key = 0) {
    if (!videos || videos.length === 0) return [];
    return videos[0].items
      .map((video) => this.prepareVideo(video, key))
      .filter((v: any) => v !== null);
  }

  render() {
    const { navigation, videos } = this.props as any;

    var args = { navigation: {}, videos };

    args.videos =
      videos && Array.isArray(videos.data)
        ? this.prepareVideos(videos.data)
        : [];

    if (navigation) {
      args.navigation = navigation;
    }

    const Comp = this.props.children.type;

    return <Comp {...args} />;
  }
}

const mapStateToProps = (state: any) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    videos: state.api[`videos-${appIndex}`],
    appIndex,
  };
};

const AppVideos = connect(mapStateToProps, {
  set,
  getApi,
  cancelToken,
})(YoutubeVideoListClass);

export { YoutubeVideoListClass };

export default AppVideos;
