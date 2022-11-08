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
      this.refreshPost = super.generateHome.bind(this);
    }

    UNSAFE_componentWillMount() {
      this._isMounted = false;
    }

    async init() {
      const { appIndex, url, posts } = this.props;

      if (posts && posts.data) {
      } else {
        super.generateHome();
      }
    }

    async componentDidMount() {
      await this.init();
      this._isMounted = true;
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

    async fetchMoreByCategory(cat) {
      this.fetchPosts({ categories: cat, per_page: 10 });
    }

    render() {
      const { fetchMoreByCategory, refreshPost } = this;

      const {
        navigation,
        appIndex,
        posts,
        categories = [],
        ...rest
      } = this.props;

      var args = { fetchMoreByCategory, refreshPost, categories, ...rest };
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
