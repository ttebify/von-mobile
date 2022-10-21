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
    per_page = 10;
    //categories=0;
    //author=0;
    search = "";
    orderby = "date";
    order = "desc";
    status = "publish";

    constructor(props) {
      super(props, { per_page: 1 });

      this.state = {};
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
      /* if (this.cancelToken) {
        this.cancelToken.cancel("ComponenetWillUnmount");
      } */
    }

    render() {
      const { fetchMore } = this;

      const { navigation, appIndex, posts } = this.props;

      var args = { fetchMore };

      args.posts =
        posts && Array.isArray(posts.data)
          ? this.preparePosts(posts.data, appIndex)
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
    categories: state.api[`categories-${appIndex}`],
    gState: state.globalState,
    appIndex,
  };
};

export default compose(
  connect(mapStateToProps, { set, getApi, cancelToken }),
  HomeContainer
);
