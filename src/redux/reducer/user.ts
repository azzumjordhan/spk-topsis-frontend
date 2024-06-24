const initStateUser = {
  postUser: "",
  listUser: "",
  detailUser: "",
  editUser: "",
  editStatusUser: "",
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
      return { ...state, editUser: action.value };
    }
    case "PUT_USER_ERROR": {
      return { ...state, editUser: action.value };
    }
    case "PUT_STATUS_USER_SUCCESS": {
      return { ...state, editUser: action.value };
    }
    case "PUT_STATUS_USER_ERROR": {
      return { ...state, editUser: action.value };
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
