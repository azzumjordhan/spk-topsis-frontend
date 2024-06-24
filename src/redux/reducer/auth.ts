const initStateAuth = {
  login: "",
};

export const authReducer = (state = initStateAuth, action: any) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, login: action.value };
    }
    // case "STATUS_LOGIN": {
    //   return { ...state, statusLogin: action.value };
    // }
  }
  return state;
};
