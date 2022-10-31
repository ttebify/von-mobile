import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { getApi, cancelToken } from "../redux/api/action";

const CategoriesContainer = (Comp, rest = {}) =>
  class extends Component {
    offset = 0;
    per_page = 50;
    categories = 0;
    search = "";
    orderby = "count";
    order = "desc";
    status = "publish";
    hide_empty = true;

    constructor(props) {
      super(props);

      this.state = {};

      //this.fetchMore = this.fetchMore.bind(this);
    }

    fetchMore() {
      let { per_page, orderby, order, hide_empty } = this;
      let { getApi, url } = this.props;
      getApi(
        `${url}/wp-json/wp/v2/categories`,
        { per_page, orderby, order, hide_empty },
        "categories"
      );
    }

    UNSAFE_componentWillMount() {
      this._isMounted = false;
      //set cancelToken
      //this.cancelToken = this.props.cancelToken();
    }

    componentWillUnmount() {
      this._isMounted = false;

      //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
    }

    componentDidMount() {
      this._isMounted = true;

      const { categories } = this.props;

      if (categories) {
      } else {
        this.fetchMore();
      }
    }

    render() {
      const { navigation } = this.props;

      var categories = this.props.categories ? this.props.categories.data : [];
      const isFetching = this.props.categories
        ? this.props.categories.isFetching
        : true;
      const posts = this.props.posts ? this.props.posts.data : [];

      const args = { categories, posts, isFetching };

      if (navigation) {
        args.navigation = navigation;
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;
  return {
    categories: state.api[`categories-${appIndex}`],
    posts: state.api[`categories-${appIndex}`],
    url: state.globalState.url,
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken }),
  CategoriesContainer
);
