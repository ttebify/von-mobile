import { arrayUnique } from "../../utils";
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

const initialState = {
  "categories-0": {
    isFetching: false,
    offset: 16,
    data: [
      { id: 8, name: "Africa", slug: "africa" },
      {
        id: 10,
        name: "Agric/Environment",
        slug: "agric-environment",
      },
      {
        id: 33,
        name: "Blog",
        slug: "blog-posts",
      },
      {
        id: 5,
        name: "Business",
        slug: "business",
      },
      {
        id: 11,
        name: "Entertainment/Tourism",
        slug: "entertainment-tourism",
      },
      {
        id: 2,
        name: "Featured",
        slug: "featured",
      },
      {
        id: 7,
        name: "Health",
        slug: "health",
      },
      {
        id: 12,
        name: "News Commentary",
        slug: "news-commentary",
      },
      {
        id: 3,
        name: "Nigeria",
        slug: "nigeria",
      },
      {
        id: 4,
        name: "Politics",
        slug: "politics",
      },
      {
        id: 8117,
        name: "Special Event",
        slug: "special-event",
      },
      {
        id: 6,
        name: "Sports",
        slug: "sports",
      },
      {
        id: 10826,
        name: "Tech World",
        slug: "tech-world",
      },
      {
        id: 34,
        name: "Trending",
        slug: "trending",
      },
      {
        id: 1,
        name: "Uncategorized",
        slug: "uncategorized",
      },
      {
        id: 9,
        name: "World",
        slug: "world",
      },
    ],
  },
};

const reducer = (
  state = initialState,
  action: { id: any; type: any; payload: any }
) => {
  const { id, type, payload } = action;

  var oldData: any[] =
    state && state[id] && state[id].data ? state[id].data : [];
  var halfOldData = oldData.length > 90 ? oldData.slice(0, 50) : oldData;
  var oldOffset = state && state[id] && state[id].offset ? state[id].offset : 0;

  switch (type) {
    case FETCH_API_REQUEST:
      if (id === "searched-posts") {
        return {
          ...state,
          [id]: {
            isFetching: true,
            data: [],
            offset: 0,
          },
        };
      }

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

      if (id === "searched-posts") {
        return {
          ...state,
          [id]: {
            isFetching: false,
            data: [...newData],
            offset: oldOffset + count,
          },
        };
      }

      return {
        ...state,
        [id]: {
          isFetching: false,
          data: arrayUnique([...halfOldData, ...newData]),
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
          data: arrayUnique([...oldData, ...newData]),
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
          data: arrayUnique([...newData, ...oldData]),
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
