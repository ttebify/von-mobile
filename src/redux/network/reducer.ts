import { SET_NETWORK_STATUS } from "./action";
import type { NetworkStatus } from "./types";

export const initialState: { status: NetworkStatus } = {
  status: "online",
};

const reducer = (
  state = initialState,
  action: { type: any; status: NetworkStatus }
) => {
  const { type, status } = action;

  switch (type) {
    case SET_NETWORK_STATUS:
      return {
        ...state,
        status,
      };

    default:
      return state;
  }
};

export default reducer;
