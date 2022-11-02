export const SET_GLOBAL_STATE = "SET_GLOBAL_STATE";
export const CLEAR_GLOBAL_STATE = "CLEAR_GLOBAL_STATE";
export const ENTER_SEARCH_TERM = "ENTER_SEARCH_TERM";

export const setState = (obj: any) => ({
  type: SET_GLOBAL_STATE,
  obj,
});

export const clearState = () => ({
  type: CLEAR_GLOBAL_STATE,
});

export const _search = (search: string) => ({
  type: ENTER_SEARCH_TERM,
  obj: { search },
});

export const clear = () => (dispatch: any) => dispatch(clearState());

const set = (obj: any) => (dispatch: any) => {
  dispatch(setState(obj));

  return Promise.resolve();
};

export const enterSearch = (search: string) => (dispatch: any) => {
  dispatch(_search(search));
};

export default set;
