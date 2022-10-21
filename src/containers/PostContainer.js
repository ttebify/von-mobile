import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";

const PostContainer = (Comp, rest = {}) =>
  class extends WordPressClass {
    componentDidMount() {
      const { id } = this.props;

      const postIndex = this.findPostIndex({ id });

      //post not found in store, will attempt to download it
      if (postIndex === -1) {
        this.fetchPosts({ id });
      }
    }

    render() {
      const { id } = this.props;

      const data = this.getSinglePost({ id });

      const post = data ? this.preparePost(data) : {};

      var args = { id, post };

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
