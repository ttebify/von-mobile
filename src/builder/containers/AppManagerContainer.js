import React, { Component } from "react";
import { connect } from "react-redux";
import AppManagerComp from "../components/AppManagerComp";
import set from "../../redux/global-state";
import * as dotProp from "./_dotProp";

class AppManagerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: {},
      errors: [],
    };

    this.creactAppFormAction = this.creactAppFormAction.bind(this);
    this.enterApp = this.enterApp.bind(this);
    this.enterSettings = this.enterSettings.bind(this);
  }

  getApps() {
    const { apps } = this.props.gState;

    return apps || [];
  }

  creactAppFormAction({ inputs, errors }, callback) {
    const oldState = this.props.gState || {};

    const newState = dotProp.set(oldState, "apps", (apps) => [
      ...apps,
      { ...inputs },
    ]);

    this.props.set(newState);

    callback({ success: true });
  }

  enterSettings(appIndex) {
    const { navigation } = this.props;

    var args = { currentApp: appIndex };

    //this will set the default app to enter
    this.props.set(args).then(() => {
      navigation.navigate("Settings", { ...args });
    });
  }

  enterApp(appIndex) {
    const { navigation } = this.props;

    //set current app
    const apps = this.getApps();

    const currentApp = apps[appIndex];

    const { name, title, url } = currentApp;

    var args = { currentApp: appIndex };

    if (name) {
      args.name = name;
    }

    if (title) {
      args.title = title;
    }

    if (url) {
      args.url = url;
    }

    //this will set the default app to enter
    this.props.set(args).then(() => {
      
      navigation.push("Home", { ...args });
    });
  }

  componentDidMount() {
    this._isMounted = true;

    const { gState } = this.props;
    //Validator.test();
  }

  UNSAFE_UNSAFE_componentWillMount() {
    this._isMounted = false;
  }

  render() {
    const apps = this.getApps();
    const action = this.creactAppFormAction;
    const { enterApp, enterSettings } = this;

    const args = { apps, action, enterApp, enterSettings };

    return <AppManagerComp {...args} />;
  }
}

const mapState = (state) => ({ gState: state.globalState });

export default connect(mapState, { set })(AppManagerContainer);
