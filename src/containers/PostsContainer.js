import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";
import { enterSearch } from "../redux/global-state/action";

const PostsContainer = (Comp, rest = {}) =>
  class extends WordPressClass {
    apiId = !!rest.id ? rest.id : "posts";
    offset = 0;
    per_page = 15;
    //categories=0;
    //author=0;
    search = "";
    orderby = "date";
    order = "desc";
    status = "publish";
    //hide_empty=true

    constructor(props) {
      super(props);

      this.state = {};

      //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
    }

    UNSAFE_componentWillMount() {
      this._isMounted = false;
      //set cancelToken
      //this.cancelToken = this.props.cancelToken();
    }

    componentWillUnmount() {
      this._isMounted = false;
      if (this.cancelToken) {
        this.cancelToken.cancel("ComponenetWillUnmount");
      }
    }

    render() {
      const { navigation, posts, categories, appIndex, comments, ...rest } =
        this.props;

      const args = { ...rest };

      if (posts) {
        //args.posts = posts;
        const { data = [] } = posts;

        args.isFetching = posts.isFetching;

        var collection = [];

        if (categories) {
          args.categories = categories;
          collection = data.filter((post) => {
            return post.categories.includes(categories);
          });
        } else {
          collection = data;
        }

        //prepare post for render
        args.posts = Array.isArray(data)
          ? this.preparePosts(collection, appIndex)
          : [];
      }

      args.comments =
        comments && Array.isArray(comments.data)
          ? this.prepareComments(comments.data)
          : [];

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
    comments: state.api.comments,
    categories: state.api[`categories-${appIndex}`],
    searchTerm: state.globalState.search,
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken, enterSearch }),
  PostsContainer
);
