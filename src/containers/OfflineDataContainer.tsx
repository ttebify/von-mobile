import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { OfflineDataClass } from "../builder/containers/OfflineDataContainer";
import {
  addToBookmark,
  clearBookmark,
  removeFromBookmark,
} from "../redux/offline-state/action";
import { getApi } from "../redux/api/action";

export interface Post {
  key: string;
  id: number;
  title: string;
  author: any;
  link: string;
  content: any;
  categories: number[];
  excerpt: string;
  date: string;
  media: {
    thumbnail: { source_url: string };
    medium: { source_url: string };
    full: { source_url: string };
  };
}

const OfflineDataContainer = (Comp) =>
  class extends OfflineDataClass {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const { offlinePosts } = this.props;

      if (offlinePosts) {
        this.loadSavedPosts();
      }
    }

    render() {
      const { navigation, posts, offlinePosts, ...rest } = this.props as any;

      var args = {
        navigation: {},
        posts,
        offlinePosts,
        isFetching: true,
        bookMarkedPosts: [] as Post[],
        ...rest,
      };

      const collection: Post[] =
        posts && Array.isArray(posts.data) ? this.preparePosts(posts.data) : [];

      args.posts = collection;
      args.isFetching = posts ? posts.isFetching : true;

      const saved = collection.filter((post) => offlinePosts.includes(post.id));

      args.bookMarkedPosts = saved;

      if (navigation) {
        args.navigation = navigation;
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    offlinePosts: state.offlineData.postIds,
  };
};

export default compose(
  connect(mapStateToProps, {
    removeFromBookmark,
    addToBookmark,
    clearBookmark,
    getApi,
  }),
  OfflineDataContainer
);
