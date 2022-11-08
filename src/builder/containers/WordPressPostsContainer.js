import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from "react-redux";
import purgeHtml from "./_purgeHtml";
import { getApi, cancelToken } from "../../redux/api/action";
import set from "../../redux/global-state";
import * as dotProp from "./_dotProp";

const moment = require("moment");

class WordPressClass extends React.Component {
  apiId = "posts";
  offset = 0;
  per_page = 15;
  search = "";
  orderby = "date";
  order = "desc";
  status = "publish";

  constructor(props) {
    super(props);

    this.state = {};

    this.fetchMorePosts = this.fetchMorePosts.bind(this);
  }

  isEmptyObj(obj) {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  findPageIndex(obj = {}) {
    const { pages = {} } = this.props;
    const { data = [] } = pages;

    let index = data.findIndex((page) => {
      //if obj isEmpty
      if (this.isEmptyObj(obj)) {
        return false;
      }

      for (key in obj) {
        if (page[key] !== obj[key]) {
          return false;
        }
      }

      return true;
    });

    return index;
  }

  getSinglePage(obj = {}) {
    const { pages = {} } = this.props;
    const { data = [] } = pages;

    let index = this.findPageIndex(obj);

    return index > -1 && data[index] ? data[index] : {};
  }

  findPostIndex(obj = {}) {
    const { posts = {} } = this.props;
    const { data = [] } = posts;

    let index = data.findIndex((post) => {
      //if obj isEmpty
      if (this.isEmptyObj(obj)) {
        return false;
      }

      for (key in obj) {
        if (post[key] !== obj[key]) {
          return false;
        }
      }

      return true;
    });

    return index;
  }

  getSinglePost(obj = {}) {
    const { posts = {} } = this.props;
    const { data = [] } = posts;
    const index = this.findPostIndex(obj);

    return index > -1 && data[index] ? data[index] : {};
  }

  getPostsById(ids) {}

  getAvailableCommentsId() {
    const { comments } = this.props;

    return new Promise((resolve) => {
      if (comments && comments.data && Array.isArray(comments.data)) {
        var ids = comments.data.map((comment) => comment.id);
        resolve(ids);
      } else {
        resolve([]);
      }
    });
  }

  //here we will get id of all the posts that have been previously fetched in order to exclude the from future fetches
  getAvailablePostsId() {
    const { posts } = this.props;

    return new Promise((resolve) => {
      if (posts && posts.data && Array.isArray(posts.data)) {
        var ids = posts.data.map((post) => post.id);
        resolve(ids);
      } else {
        resolve([]);
      }
    });
  }

  getAvailablePagesId() {
    const { pages } = this.props;

    return new Promise((resolve) => {
      if (pages && pages.data && Array.isArray(pages.data)) {
        var ids = pages.data.map((pages) => pages.id);
        resolve(ids);
      } else {
        resolve([]);
      }
    });
  }

  fetchCategories(obj = {}) {
    var {
      per_page = 30,
      orderby = "count",
      order = "desc",
      hide_empty = true,
    } = obj;
    let { getApi, url, appIndex } = this.props;
    let apiId = `categories-${appIndex}`;
    return getApi(
      `${url}/wp-json/wp/v2/categories`,
      { per_page, orderby, order, hide_empty },
      apiId
    ).then((res) => res.data);
  }

  fetchMorePosts(obj = {}) {
    const offset =
      this.props.posts && this.props.posts.offset ? this.props.posts.offset : 0;
    return this.fetchPosts({ offset, ...obj });
  }

  fetchPostComments(postId) {
    return this.fetchComments({ post: postId });
  }

  async fetchComments(obj = {}) {
    let { per_page, orderby, order } = this;
    let { getApi, url } = this.props;
    let apiId = "comments";

    //get already fetch comments
    const ids = await this.getAvailableCommentsId();
    if (ids.length > 0) {
      obj.exclude = ids.join();
    }
    return getApi(
      `${url}/wp-json/wp/v2/comments`,
      { per_page, orderby, order, ...obj, _embed: "" },
      apiId
    );
  }

  async fetchPosts(obj = {}) {
    let { per_page, orderby, order } = this;
    let { getApi, url, appIndex } = this.props;
    let apiId = `posts-${appIndex}`;

    //get already fetch posts
    const ids = await this.getAvailablePostsId();
    if (ids.length > 0) {
      obj.exclude = ids.join();
    }

    return getApi(
      `${url}/wp-json/wp/v2/posts`,
      { per_page, orderby, order, ...obj, _embed: "" },
      apiId
    );
  }

  async searchPosts(obj = {}) {
    let { per_page, orderby, order } = this;
    let { getApi, url } = this.props;
    let apiId = "searched-posts";

    return getApi(
      `${url}/wp-json/wp/v2/posts`,
      { per_page, orderby, order, ...obj, _embed: "" },
      apiId
    );
  }

  async fetchPages(obj = {}) {
    let { per_page, orderby, order } = this;
    let { getApi, url, appIndex } = this.props;
    let apiId = `pages-${appIndex}`;

    //get already fetch pages
    const ids = await this.getAvailablePagesId();
    if (ids.length > 0) {
      obj.exclude = ids.join();
    }
    return getApi(
      `${url}/wp-json/wp/v2/pages`,
      { per_page, orderby, order, ...obj, _embed: "" },
      apiId
    );
  }

  getCategories() {
    const { categories } = this.props;

    //use from store if available
    if (categories) {
      return categories.data;
    } //fetch from rest api
    else {
      return this.fetchCategories().then((res) => {
        if (Array.isArray(res)) {
          //return only root categories
          return res.filter((cat) => cat.parent === 0);
        } else {
          return [];
        }
      });
    }
  }

  oneByOne(objects_array, iterator, callback) {
    var start_promise = objects_array.reduce(function (prom, object) {
      return prom.then(function () {
        return iterator(object);
      });
    }, Promise.resolve()); // initial
    if (callback) {
      start_promise.then(callback);
    } else {
      return start_promise;
    }
  }

  fetchPostsByCategory(ids = []) {
    if (ids.length > 0) {
      ids.forEach((category) => {
        this.fetchPosts({ category });
      });
    } else {
      var index = 0;

      this.getCategories().then((data) => {
        const fetchPostsIter = (categoryObj) => {
          return new Promise(async (resolve) => {
            let categories = categoryObj.id;

            const res = await this.fetchPosts({ categories });
            console.log(`Home ${index} done fetching: `, categoryObj.id);
            if (res.data) {
              console.log(res.data.length);
            }
            index++;
            resolve(res);
          });
        };

        //fetch latests stories if available
        this.fetchPosts().then((res) => {
          let CategoryList = data.slice(0, 5);

          this.oneByOne(CategoryList, fetchPostsIter, (res) =>
            console.log("done")
          );
        });
      });
    }
  }

  prepareCategories(data) {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((category) => {
      var { name, ...rest } = category;
      name = purgeHtml(name);
      return { name, ...rest };
    });
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

  preparePostOld(post, key = 0) {
    const {
      id = 0,
      title: { rendered: t = "" },
      content: { rendered: c = "" },
      excerpt: { rendered: e = "" },
      link = "https://von.gov.ng/",
      author = "",
      categories = [],
      date = new Date(),
      _embedded = {},
    } = post;

    const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
    const media =
      _embedded &&
      _embedded["wp:featuredmedia"] &&
      _embedded["wp:featuredmedia"][0] &&
      _embedded["wp:featuredmedia"][0]["media_details"] &&
      _embedded["wp:featuredmedia"][0]["media_details"]["sizes"]
        ? _embedded["wp:featuredmedia"][0]["media_details"]["sizes"]
        : {};
    const {
      thumbnail = { source_url: "https://picsum.photos/200" },
      medium = { source_url: "https://picsum.photos/500" },
      full = { source_url: "https://picsum.photos/700" },
    } = media;

    return {
      key: `post-${key}-${id}`,
      id,
      title: purgeHtml(t),
      link,
      author,
      categories,
      content: c,
      excerpt: purgeHtml(e),
      date: dateFromNow,
      media: { thumbnail, medium, full },
    };
  }

  preparePosts(posts, key = 0) {
    return posts.map((post) => this.preparePost(post, key));
  }

  prepareComment(comment = {}, key = 0) {
    const id = dotProp.get(comment, "id", 0);
    const postId = dotProp.get(comment, "post", "");
    const parent = dotProp.get(comment, "parent", 0);
    const author = dotProp.get(comment, "author_name", "");
    const date = dotProp.get(comment, "date", new Date());
    const content = dotProp.get(comment, "content.rendered", "");
    const status = dotProp.get(comment, "status", "");
    const avatar = dotProp.get(comment, "author_avatar_urls", {});

    const {
      size24 = {
        source_url:
          "https://secure.gravatar.com/avatar/09e9857670e1c85b5d3fe5466dd47a76?s=24&d=mm&r=g",
      },
      size48 = {
        source_url:
          "https://secure.gravatar.com/avatar/09e9857670e1c85b5d3fe5466dd47a76?s=48&d=mm&r=g",
      },
      size96 = {
        source_url:
          "https://secure.gravatar.com/avatar/09e9857670e1c85b5d3fe5466dd47a76?s=96&d=mm&r=g",
      },
    } = avatar;

    const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();

    return {
      key: `comment-${key}-${id}`,
      id,
      postId,
      author,
      content,
      parent,
      date: dateFromNow,
      status,
      authorAvatar: { size24, size48, size96 },
    };
  }

  prepareComments(comments, key = 0) {
    return comments.map((comment) => this.prepareComment(comment, key));
  }

  prepareMenu(data) {
    //const {navigate} = NavigationService;
    const { navigation } = this.props;
    const { navigate } = navigation;

    return data.map((menu, index) => {
      var { title = "", icon, name, id = 0, ...rest } = menu;
      var onPress;

      if (!!menu.type) {
        if (menu.type === "wp_posts") {
          onPress = () => {
            navigate("Posts", { title: title || name, categories: id });
          };
        } else if (menu.type === "wp_post") {
          onPress = () => {
            navigate("Post", { title: title || name, id });
          };
        } else if (menu.type === "wp_page") {
          onPress = () => {
            navigate("WpPage", { title: title || name, id });
          };
        } else if (menu.type === "page") {
          onPress = () => {
            navigate("Page", { title: title || name, id });
          };
        }
      } else {
        onPress = () => {
          navigate("Posts", { title: title || name, categories: id });
        };
      }

      return { key: `menu-${index}`, icon, name, onPress, id };
    });
  }

  async generateHome() {
    const { gState, categories } = this.props;
    const ids = categories.data.map((cat) => cat.id);

    //check if current_site exists
    this.getCategories();
    await this.fetchPosts({ categories: ids });
  }

  UNSAFE_componentWillMount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    const { gState, posts } = this.props;

    if (posts) {
    } else {
      this.generateHome();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { fetchMorePosts } = this;

    const { navigation, posts, comments } = this.props;

    var args = { fetchMorePosts };

    args.posts =
      posts && Array.isArray(posts.data) ? this.preparePosts(posts.data) : [];

    args.comments =
      comments && Array.isArray(comments.data)
        ? this.prepareComments(comments.data)
        : [];

    if (navigation) {
      args.navigation = navigation;
    }

    const Comp = this.props.children.type;

    return <Comp {...args} />;
  }
}

const mapStateToProps = (state) => {
  const appIndex = state.globalState.currentApp || 0;

  return {
    url: state.globalState.url,
    posts: state.api[`posts-${appIndex}`],
    comments: state.api.comments,
    pages: state.api[`pages-${appIndex}`],
    categories: state.api[`categories-${appIndex}`],
    gState: state.globalState,
    appIndex,
  };
};

const WordPressPosts = connect(mapStateToProps, { set, getApi, cancelToken })(
  WordPressClass
);

export { WordPressClass };

export default WordPressPosts;
