import React from "react";
import { connect } from "react-redux";
import {
  addToBookmark,
  clearBookmark,
  removeFromBookmark,
} from "../../redux/offline-state/action";
import { WordPressClass } from "./WordPressPostsContainer";

class OfflineDataClass extends WordPressClass {
  constructor(props) {
    super(props);

    this.state = {};
  }

  savePostOffline = (postId: number) => {
    // TODO: add cancel token
    return addToBookmark(postId);
  };

  loadSavedPosts = () => {
    const { offlinePosts } = this.props;
    this.fetchMorePosts({ include: offlinePosts });
  };

  render() {
    const { navigation, posts, offlinePosts } = this.props as any;

    var args = { navigation: {}, posts, offlinePosts };

    args.posts =
      posts && Array.isArray(posts.data) ? this.preparePost(posts.data) : [];

    if (navigation) {
      args.navigation = navigation;
    }

    const Comp = this.props.children.type;

    return <Comp {...args} />;
  }
}

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    offlinePosts: state.offlineData.postIds,
  };
};

const OfflineData = connect(mapStateToProps, {
  removeFromBookmark,
  addToBookmark,
  clearBookmark,
})(OfflineDataClass);

export { OfflineDataClass };

export default OfflineData;
