import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import set from "../redux/global-state";
import { YoutubeVideoListClass } from "../builder/containers/YoutubeVideoListContainer";

const VideosContainer = (Comp: any) =>
  class extends YoutubeVideoListClass {
    _isMounted = false;

    constructor(props) {
      super(props);

      this.state = {};
      this.fetchLatestVideos = this.fetchLatestVideos.bind(this);
    }

    init() {
      const { videos, latestVideos } = this.props;

      if (videos && videos.data) {
      } else {
        this.fetchPlaylistData();
      }
      if (latestVideos && latestVideos.data) {
      } else {
        this.fetchLatestVideos();
      }
    }

    UNSAFE_componentWillMount() {
      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
      this.init();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.isFocused !== this.props.isFocused) {
        this.init();
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
      /* if (this.cancelToken) {
        this.cancelToken.cancel("ComponenetWillUnmount");
      } */
    }

    render() {
      const { fetchLatestVideos } = this;
      const {
        navigation,
        videos = [],
        latestVideos = [],
        ...rest
      } = this.props;

      var args = { ...rest, isFetching: true, fetchLatestVideos };

      args.videos =
        videos && Array.isArray(videos.data)
          ? this.prepareVideos(videos.data)
          : [];

      args.latestVideos =
        latestVideos && Array.isArray(latestVideos.data)
          ? this.prepareLatestVideos(latestVideos.data)
          : [];

      if (navigation) {
        args.navigation = navigation;
      }
      if (videos) {
        args.isFetching = videos.isFetching;
      }
      if (latestVideos) {
        args.fetchingLatestVideos = latestVideos.isFetching;
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state: any) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    videos: state.api[`videos-${appIndex}`],
    latestVideos: state.api["latest-videos"],
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, { set, getApi, cancelToken }),
  VideosContainer
);
