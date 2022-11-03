import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken, addApi } from "../redux/api/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";

const CategoriesContainer = (Comp) =>
  class extends WordPressClass {
    per_page = 10;

    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidUpdate(prevProps) {
      const search = this.props.searchTerm;
      if (prevProps.searchTerm !== search && search.length > 3) {
        this.searchPosts({ search });
      }
    }

    render() {
      const { navigation, searchedPosts, searchTerm, categories, ...rest } =
        this.props;

      const isFetching = searchedPosts ? searchedPosts.isFetching : false;

      const args = {
        isFetching,
        navigation,
        searchedPosts,
        rawPostsBody: searchedPosts,
        searchTerm,
        categories,
        ...rest,
      };
      args.categories = categories ? categories.data : [];
      args.searchedPosts = searchedPosts
        ? this.preparePosts(searchedPosts.data)
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
    searchedPosts: state.api["searched-posts"],
    searchTerm: state.globalState.search,
    categories: state.api[`categories-${appIndex}`],
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken, addApi }),
  CategoriesContainer
);
