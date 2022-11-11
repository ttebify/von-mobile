import type { Comment } from "../../types";

export const ADD_TO_BOOKMARK = "ADD_TO_BOOKMARK";
export const REMOVE_FROM_BOOKMARK = "REMOVE_FROM_BOOKMARK";
export const CLEAR_BOOKMARK = "CLEAR_BOOKMARK";
export const ADD_COMMENT = "ADD_COMMENT";

const _addToBookmark = (id: number) => ({
  type: ADD_TO_BOOKMARK,
  id,
});

const _removeFromBookmark = (id: number) => ({
  type: REMOVE_FROM_BOOKMARK,
  id,
});

const _clearBookmark = () => ({
  type: CLEAR_BOOKMARK,
});

const _addComment = (data: { postId: number; comment: Comment }) => ({
  type: ADD_COMMENT,
  payload: data,
});

export const clearBookmark = () => (dispatch: any) =>
  dispatch(_clearBookmark());

export const removeFromBookmark = (id: number) => (dispatch: any) => {
  dispatch(_removeFromBookmark(id));

  return Promise.resolve();
};

export const addToBookmark = (id: number) => (dispatch: any) => {
  dispatch(_addToBookmark(id));

  return Promise.resolve();
};

export const addComment =
  (data: { postId: number; comment: Comment }) => (dispatch: any) => {
    dispatch(_addComment(data));
  };
