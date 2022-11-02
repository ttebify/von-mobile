import { combineReducers } from "redux";
import { reducer as api } from "./api";
import { reducer as globalState } from "./global-state";
import { reducer as offlineData } from "./offline-state";
import { reducer as networkState } from "./network";

//imported reducers comes here
var obj = {
  api,
  globalState,
  offlineData,
  networkState,
};

export default combineReducers({ ...obj });
