import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken, postApi, addApi } from "../redux/api/action";
import { addComment } from "../redux/offline-state/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";
import { arrayUnique } from "../utils";

const PostContainer = (Comp, rest = {}) =>
  class extends WordPressClass {
    constructor(props) {
      super(props);
      this.fetchPostsByCategory = this.fetchPostsByCategory.bind(this);
      this.fetchPostComments = this.fetchPostComments.bind(this);
      this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
      const { id } = this.props;

      const postIndex = this.findPostIndex({ id });

      //post not found in store, will attempt to download it
      if (postIndex === -1) {
        this.fetchPosts({ id });
      }

      this.fetchPostComments(id);
    }

    async postComment(data) {
      const { postApi, url } = this.props;

      return postApi(`${url}/wp-json/wp/v2/comments`, { data });
    }

    render() {
      const { id, posts, appIndex, comments, offlineCommentMap, ...rest } =
        this.props;

      const data = this.getSinglePost({ id });

      const post = data ? this.preparePost(data) : {};

      // Get offline comments first
      const offlineComments = offlineCommentMap[id]
        ? offlineCommentMap[id]
        : [];

      const preparedOfflineComments = offlineComments
        ? this.prepareComments(offlineComments)
        : [];

      const postComments =
        comments && Array.isArray(comments)
          ? this.prepareComments(
              comments.data.filter((comment) => comment.post === id)
            )
          : [];

      const isFetchingComments = comments ? comments.isFetching : false;

      const finalComments = arrayUnique(
        preparedOfflineComments.concat(postComments)
      );

      var args = {
        id,
        post,
        posts,
        fetchPostsByCategory: this.fetchPostsByCategory,
        fetchPostComments: this.fetchPostComments,
        postComment: this.postComment,
        isFetchingComments,
        comments: finalComments,
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
    comments: state.api.comments,
    offlineCommentMap: state.offlineData.comments,
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, {
    getApi,
    postApi,
    addApi,
    cancelToken,
    addComment,
  }),
  PostContainer
);
