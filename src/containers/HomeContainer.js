import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import set from "../redux/global-state";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";

const HomeContainer = (Comp, rest = {}) =>
  class extends WordPressClass {
    apiId = "posts";
    offset = 0;
    per_page = 20;
    search = "";
    orderby = "date";
    order = "desc";
    status = "publish";

    constructor(props) {
      super(props, { per_page: 1 });

      this.state = {};
      this.fetchMoreByCategory = this.fetchMoreByCategory.bind(this);
    }

    UNSAFE_componentWillMount() {
      this._isMounted = false;
    }

    init() {
      const { appIndex, url, posts } = this.props;

      if (posts && posts.data) {
      } else {
        super.generateHome();
      }
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
      if (this.cancelToken) {
        this.cancelToken.cancel("ComponenetWillUnmount");
      }
    }

    fetchMoreByCategory(cat) {
      this.fetchPosts({ categories: cat });
    }

    render() {
      const { fetchMoreByCategory } = this;

      const {
        navigation,
        appIndex,
        posts,
        categories = [],
        ...rest
      } = this.props;

      var args = { fetchMoreByCategory, categories, ...rest };
      args.posts =
        posts && Array.isArray(posts.data)
          ? this.preparePosts(posts.data, appIndex)
          : [];

      if (navigation) {
        args.navigation = navigation;
      }
      if (posts) {
        args.isFetching = posts.isFetching;
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    categories: state.api[`categories-${appIndex}`],
    gState: state.globalState,
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, { set, getApi, cancelToken }),
  HomeContainer
);
