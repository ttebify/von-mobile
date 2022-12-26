import axios from "axios";

export const FETCH_API_REQUEST = "FETCH_API_REQUEST";
export const FETCH_API_SUCCESS = "FETCH_API_SUCCESS";
export const FETCH_API_FAILURE = "FETCH_API_FAILURE";
export const FETCH_API_DELETE = "FETCH_API_DELETE";
export const FETCH_API_CLEAR = "FETCH_API_CLEAR";
export const FETCH_API_ADD = "FETCH_API_ADD";
export const FETCH_API_PREPEND = "FETCH_API_PREPEND";
export const FETCH_API_EDIT = "FETCH_API_EDIT";

export const fetchApiEdit = (id: any, json: any) => ({
  id: id,
  type: FETCH_API_EDIT,
  payload: json,
});

export const fetchApiAdd = (id: any, json: any) => ({
  id: id,
  type: FETCH_API_ADD,
  payload: json,
});

export const fetchApiPrepend = (id: any, json: any) => ({
  id: id,
  type: FETCH_API_PREPEND,
  payload: json,
});

export const fetchApiClear = (id: any) => ({
  id: id,
  type: FETCH_API_CLEAR,
});

export const fetchApiRequest = (id: string) => ({
  id,
  type: FETCH_API_REQUEST,
});

export const fetchApiSuccess = (id: string, json: any) => ({
  id: id,
  type: FETCH_API_SUCCESS,
  payload: json,
});

export const fetchApiFailure = (id: string, error: any) => ({
  id: id,
  type: FETCH_API_FAILURE,
  payload: error,
});

export const fetchApiDelete = (id: any, payload: any) => ({
  id,
  type: FETCH_API_DELETE,
  payload,
});

const argsSerialize = (args: { [x: string]: string }) => {
  var params = "";
  var i = 0;

  for (let key in args) {
    //add & to the string
    if (i > 0) {
      params += "&";
    }

    //check if key has a value
    if (args[key] === "") {
      params += key;
    } else {
      params += key + "=" + args[key];
    }

    i++;
  }

  return params;
};

export const clearApi =
  (id: any) => (dispatch: (arg0: { id: any; type: string }) => any) =>
    dispatch(fetchApiClear(id));

export const fetchApi = (url = "", args = {}, id = "one") => {
  var params = argsSerialize(args);

  //async
  return (
    dispatch: (arg0: { id: any; type: string; payload?: any }) => void
  ) => {
    var link = `${url}?${params}`;
    dispatch(fetchApiRequest(id));

    return fetch(link)
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchApiSuccess(id, res));
        return res;
      })
      .catch((error) => {
        dispatch(fetchApiFailure(id, error.message));
        return error;
      });
  };
};

export const postApi = (url = "", obj = {}, id = "postApi") => {
  let headers = !!obj.headers ? obj.headers : {};
  let data = !!obj.data ? obj.data : {};

  return (
    dispatch: (arg0: { id: any; type: string; payload?: any }) => void
  ) => {
    dispatch(fetchApiRequest(id));

    return axios
      .post(url, { ...data }, { headers })
      .then((res) => {
        dispatch(fetchApiSuccess(id, res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchApiFailure(id, error.message));
        return error;
      });
  };
};

export const addApi =
  (id: any, json: any) =>
  (dispatch: (arg0: { id: any; type: string; payload: any }) => any) =>
    Promise.resolve(dispatch(fetchApiAdd(id, json)));

export const prependApi =
  (id: any, json: any) =>
  (dispatch: (arg0: { id: any; type: string; payload: any }) => any) =>
    dispatch(fetchApiPrepend(id, json));

export const editApi =
  (id: any, json: any) =>
  (dispatch: (arg0: { id: any; type: string; payload: any }) => any) =>
    dispatch(fetchApiEdit(id, json));

export const deleteApi =
  (id: any, json: any) =>
  (dispatch: (arg0: { id: any; type: string; payload: any }) => any) =>
    dispatch(fetchApiDelete(id, json));

export const getApi = (
  url = "",
  obj = {},
  id = null,
  cancel: { token: any }
) => {
  const headers = obj.headers || {};

  let data = obj.data || obj;

  let params = argsSerialize(data);

  return (
    dispatch: (arg0: { id: any; type: string; payload?: any }) => any
  ) => {
    id === null || dispatch(fetchApiRequest(id));

    //check for cancelToken
    let args = cancel ? { cancelToken: cancel.token } : {};

    args.headers = headers;

    // console.log(`${url}?${params}`);

    return axios
      .get(`${url}?${params}`, args)
      .then((res) => {
        id === null || dispatch(fetchApiSuccess(id, res.data));

        return res;
      })
      .catch((error) => {
        id === null || dispatch(fetchApiFailure(id, error.message));
        return error;
      });
  };
};

export const cancelToken = () => {
  return (dispatch: any) => {
    //create axios cancelToken
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    return source;
  };
};
