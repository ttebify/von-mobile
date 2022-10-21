import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getApi, cancelToken } from "../redux/api/action";
import { WordPressClass } from "../builder/containers/WordPressPostsContainer";

const SubMenuContainer = (Comp: any, rest = {}) =>
  class extends WordPressClass {
    offset = 0;
    per_page = 50;
    categories = 0;
    //author=0;
    search = "";
    orderby = "count";
    order = "desc";
    status = "publish";
    hide_empty = true;

    constructor(props: any) {
      super(props);

      this.state = {};

      //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
      //this.fetchMore = this.fetchMore.bind(this);
    }

    getAppMenu(target = "sub_menu") {
      const { currentApp, apps } = this.props.gState;
      const app = apps[currentApp] || {};

      return app.menus && app.menus[target] ? app.menus[target] : [];
    }

    //  super methods

    //  fetchMore()

    //fetchCategories(obj={})

    getMenuData() {
      const app = this.getAppMenu();
      var menu;

      if (app.length > 0) {
        menu = app;
      } else {
        let data = this.props.categories ? this.props.categories.data : [];

        menu = data.filter((cat: { parent: number; }) => cat.parent === 0);
        menu = this.prepareCategories(menu);
      }

      return this.prepareMenu(menu);
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
    }

    render() {
      
      const { navigation, theme } = this.props;

      //var categories = this.props.categories ? this.props.categories.data : [];

      const menu = this.getMenuData();

      const args = { menu, theme };

      if (navigation) {
        args.navigation = navigation;
      }

      return <Comp {...args} />;
    }
  };

const mapStateToProps = (state: { globalState: { currentApp: number; apps: never[]; url: any; }; api: { [x: string]: any; }; }) => {
  const appIndex = state.globalState.currentApp || 0;
  const apps = state.globalState.apps || [];
  const theme = apps && apps[appIndex] && apps[appIndex]["theme"];

  return {
    url: state.globalState.url,
    // posts:state.api[`posts-${appIndex}`],
    categories: state.api[`categories-${appIndex}`],
    gState: state.globalState,
    appIndex,
    theme,
  };
};

export default compose(
  connect(mapStateToProps, { getApi, cancelToken }),
  SubMenuContainer
);
