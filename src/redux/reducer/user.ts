const initStateUser = {
  postUser: "",
  listUser: "",
  detailUser: "",
  putUser: "",
  putStatusUser: "",
};
export const userReducer = (state = initStateUser, action: any) => {
  switch (action.type) {
    case "GET_LIST_USER": {
      return { ...state, listUser: action.value };
    }
    case "GET_DETAIL_USER_SUCCESS": {
      return { ...state, detailUser: action.value };
    }
    case "GET_DETAIL_USER_ERROR": {
      return { ...state, detailUser: action.value };
    }
    case "PUT_USER_SUCCESS": {
      return { ...state, putUser: action.value };
    }
    case "PUT_USER_ERROR": {
      return { ...state, putUser: action.value };
    }
    case "PUT_STATUS_USER_SUCCESS": {
      return { ...state, putStatusUser: action.value };
    }
    case "PUT_STATUS_USER_ERROR": {
      return { ...state, putStatusUser: action.value };
    }
    case "POST_USER_SUCCESS": {
      return { ...state, postUser: action.value };
    }
    case "POST_USER_ERROR": {
      return { ...state, postUser: action.value };
    }
  }
  return state;
};
