import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import * as dotProp from "../builder/containers/_dotProp";
import purgeHtml from "../builder/containers/_purgeHtml";
const moment = require("moment");

const CategoriesContainer = (Comp, rest = {}) =>
  class extends Component {
    offset = 0;
    per_page = 30;
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

    preparePost(post = {}, key = 0) {
      const id = dotProp.get(post, "id", 0);
      const title = dotProp.get(post, "title.rendered", "");
      const content = dotProp.get(post, "content.rendered", "");
      const excerpt = dotProp.get(post, "excerpt.rendered", "");
      const link = dotProp.get(post, "link", "https://von.gov.ng/");
      const categories = dotProp.get(post, "categories", []);
      const date = dotProp.get(post, "date", new Date());
      const media = dotProp.get(
        post,
        "_embedded.wp:featuredmedia.0.media_details.sizes",
        {}
      );
      const author = dotProp.get(post, "_embedded.author.0.name", "");

      const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();

      const {
        thumbnail = { source_url: "https://picsum.photos/200" },
        medium = { source_url: "https://picsum.photos/500" },
        full = { source_url: "https://picsum.photos/700" },
      } = media;

      return {
        key: `post-${key}-${id}`,
        id,
        title: purgeHtml(title),
        author,
        link,
        content,
        categories,
        excerpt: purgeHtml(excerpt),
        date: dateFromNow,
        media: { thumbnail, medium, full },
      };
    }

    preparePosts(posts, key = 0) {
      return posts.map((post) => this.preparePost(post, key));
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
      const { navigation, posts, categories, ...rest } = this.props;

      const args = { ...rest };
      args.categories = categories ? categories.data : [];

      const isFetching = categories ? categories.isFetching : true;

      args.posts = posts ? this.preparePosts(posts.data) : [];

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
    posts: state.api[`posts-${appIndex}`],
    url: state.globalState.url,
    searchTerm: state.globalState.search,
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken }),
  CategoriesContainer
);
