import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";

const PostContainer = (Comp, rest = {}) =>
  class extends WordPressClass {
    constructor(props) {
      super(props);
      this.fetchPostsByCategory = this.fetchPostsByCategory.bind(this);
    }

    componentDidMount() {
      const { id } = this.props;

      const postIndex = this.findPostIndex({ id });

      //post not found in store, will attempt to download it
      if (postIndex === -1) {
        this.fetchPosts({ id });
      }
    }

    render() {
      const { id, posts, appIndex, ...rest } = this.props;

      const data = this.getSinglePost({ id });

      const post = data ? this.preparePost(data) : {};

      var args = {
        id,
        post,
        posts,
        fetchPostsByCategory: this.fetchPostsByCategory,
        ...rest,
      };

      if (posts) {
        const { data = [] } = posts;

        //prepare post for render
        args.posts = Array.isArray(data)
          ? this.preparePosts(data, appIndex)
          : [];
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken }),
  PostContainer
);
