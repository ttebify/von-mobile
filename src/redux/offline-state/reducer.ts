import {
  ADD_TO_BOOKMARK,
  CLEAR_BOOKMARK,
  REMOVE_FROM_BOOKMARK,
  ADD_COMMENT,
} from "./action";
import type { Comment } from "../../types";

export const initialState = {
  postIds: [],
  comments: {},
};

const reducer = (
  state = initialState,
  action: {
    type: any;
    id?: number;
    payload: { postId: number; comment: Comment };
  }
) => {
  const { type, id, payload } = action;

  switch (type) {
    case ADD_COMMENT:
      const olderComments = state.comments[payload.postId]
        ? state.comments[payload.postId]
        : [];

      return {
        ...state,
        comments: {
          ...state.comments,
          [payload.postId]: [...olderComments, payload.comment],
        },
      };
      break;
    case ADD_TO_BOOKMARK:
      return {
        ...state,
        postIds: [...state.postIds, id],
      };

    case REMOVE_FROM_BOOKMARK:
      const newData = state.postIds.filter((postId) => postId !== id);
      return {
        ...state,
        postIds: newData,
      };

    case CLEAR_BOOKMARK:
      return {
        ...state,
        postIds: [],
      };
    default:
      return state;
  }
};

export default reducer;
