import type { NetworkStatus } from "./types";

export const SET_NETWORK_STATUS = "SET_NETWORK_STATUS";

const _setNetworkStatus = (status: NetworkStatus) => ({
  type: SET_NETWORK_STATUS,
  id: status,
});

export const setNetworkStatus = (status: NetworkStatus) => (dispatch: any) => {
  dispatch(_setNetworkStatus(status));

  return Promise.resolve();
};
