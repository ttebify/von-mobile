/* import React from "react";
import { connect } from "react-redux";
import {
  addToBookmark,
  clearBookmark,
  removeFromBookmark,
} from "../redux/offline-state/action";

const NetworkStatusContainer = ({Comp}) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const props = this.props as any;

    return <Comp {...props} />;
  }
}

const mapStateToProps = (state) => {

  return {
    networkStatus: state.networkState.status,
  };
};

const OfflineData = connect(mapStateToProps, {
  removeFromBookmark,
  addToBookmark,
  clearBookmark,
})(NetworkStatusContainer);

export { NetworkStatusClass as OfflineDataClass };

export default OfflineData;
 */

export {};
