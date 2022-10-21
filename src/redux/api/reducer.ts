import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
  FETCH_API_CLEAR,
  FETCH_API_DELETE,
  FETCH_API_ADD,
  FETCH_API_PREPEND,
  FETCH_API_EDIT,
} from "./action";

const initialState = {};

const reducer = (
  state = initialState,
  action: { id: any; type: any; payload: any }
) => {
  const { id, type, payload } = action;

  var oldData = state && state[id] && state[id].data ? state[id].data : [];
  var oldOffset = state && state[id] && state[id].offset ? state[id].offset : 0;

  switch (type) {
    case FETCH_API_REQUEST:
      return {
        ...state,
        [id]: {
          isFetching: true,
          data: [...oldData],
          offset: oldOffset,
        },
      };

    case FETCH_API_SUCCESS:
      let count, newData;

      if (Array.isArray(payload)) {
        count = payload.length;
        newData = payload;
      } else {
        count = 1;
        newData = [payload];
      }

      return {
        ...state,
        [id]: {
          isFetching: false,
          data: [...oldData, ...newData],
          offset: oldOffset + count,
        },
      };

    case FETCH_API_ADD:
      if (Array.isArray(payload)) {
        count = payload.length;
        newData = payload;
      } else {
        count = 1;
        newData = [payload];
      }

      return {
        ...state,
        [id]: {
          isFetching: false,
          data: [...oldData, ...newData],
          offset: oldOffset + count,
        },
      };

    case FETCH_API_PREPEND:
      if (Array.isArray(payload)) {
        count = payload.length;
        newData = payload;
      } else {
        count = 1;
        newData = [payload];
      }

      return {
        ...state,
        [id]: {
          isFetching: false,
          data: [...newData, ...oldData],
          offset: oldOffset + count,
        },
      };

    case FETCH_API_EDIT:
      let objIndex = oldData.findIndex(
        (data: { id: any }) => data.id === payload.id
      );

      if (objIndex > -1) {
        oldData[objIndex] = payload;
      }

      return {
        ...state,
        [id]: {
          data: [...oldData],
        },
      };

    case FETCH_API_FAILURE:
      return {
        ...state,
        [id]: {
          isFetching: false,
          error: payload,
          data: [...oldData],
          offset: oldOffset,
        },
      };

    case FETCH_API_CLEAR:
      return {
        ...state,
        [id]: {
          isFetching: false,
          data: [],
          offset: 0,
        },
      };

    case FETCH_API_DELETE:
      if (payload) {
        let value = payload.value ? payload.value : payload;
        let id = payload.id ? payload.id : "id";

        newData = oldData.filter(
          (item: { [x: string]: any }) => item[id] !== value
        );
      }

      return {
        ...state,
        [id]: {
          isFetching: false,
          data: [...newData],
          offset: oldOffset - 1,
        },
      };

    default:
      return state;
  }
};

export default reducer;
