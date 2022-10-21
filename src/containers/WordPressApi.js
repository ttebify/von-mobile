import React, { Component } from "react";
//import PropTypes from 'prop-types';
//import {compose} from 'redux';
import { connect } from "react-redux";

import { getApi, cancelToken } from "../redux/api/action";
import set from "../redux/global-state";

class WordpressApi extends Component {
  apiId = "home";
  offset = 0;
  per_page = 1;
  //categories=0;
  //author=0;
  search = "";
  orderby = "date";
  order = "desc";
  status = "publish";
  //hide_empty=true

  constructor(props) {
    this.props;
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

  fetchMore() {
    let { per_page, orderby, order, apiId } = this;
    let { getApi, url } = this.props;
    var offset =
      this.props.api && this.props.api[apiId] && this.props.api[apiId].offset
        ? this.props.api[apiId].offset
        : 0;
    getApi(
      `${url}/wp-json/wp/v2/posts`,
      { per_page, orderby, offset, order, _embed: "" },
      apiId
    );
  }

  fetchCategories(obj = {}) {
    var {
      per_page = 50,
      orderby = "count",
      order = "desc",
      hide_empty = true,
    } = obj;
    let { getApi, url } = this.props;
    return getApi(
      `${url}/wp-json/wp/v2/categories`,
      { per_page, orderby, order, hide_empty },
      "categories"
    ).then((res) => res.data);
  }

  fetchPosts(obj = {}) {
    let { per_page, orderby, order } = this;
    let { getApi, url } = this.props;

    //get already fetch posts
    return this.getAvailablePostsId().then((ids) => {
      if (ids.length > 0) {
        obj.exclude = ids.join();
      }

      return getApi(
        `${url}/wp-json/wp/v2/posts`,
        { per_page, orderby, order, ...obj, _embed: "" },
        "posts"
      );
    });
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
          return new Promise((resolve) => {
            let categories = categoryObj.id;

            return this.fetchPosts({ categories }).then((res) => {
              index++;
              resolve(res);
            });
          });
        };

        //fetch latests stories if available
        this.fetchPosts().then((res) => {
          let CategoryList = data.slice(0, 5);

          this.oneByOne(CategoryList, fetchPostsIter);
        });
      });
    }
  }

  generateHome() {
    const { gState } = this.props;

    //check if current_site exists
    if (gState.current_site) {
      const index = gState.current_site;
      const config = gState.sites[index];

      if (
        config &&
        config.home &&
        config.home.categories &&
        Array.isArray(config.home.categories)
      ) {
        const ids = config.home.categories.map((cat) => cat.id);

        this.fetchPostsByCategory(ids);
      } else {
        this.fetchPostsByCategory();
      }
    } else {
      this.fetchPostsByCategory();
    }
  }
}

const mapStateToProps = (state) => ({
  url: state.globalState.url,
  posts: state.api.posts,
  categories: state.api.categories,
  gState: state.globalState,
});

export default WordpressApi;
