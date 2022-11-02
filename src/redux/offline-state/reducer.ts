import {
  ADD_TO_BOOKMARK,
  CLEAR_BOOKMARK,
  REMOVE_FROM_BOOKMARK,
} from "./action";

export const initialState = {
  postIds: [],
};

const reducer = (state = initialState, action: { type: any; id?: number }) => {
  const { type, id } = action;

  switch (type) {
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
