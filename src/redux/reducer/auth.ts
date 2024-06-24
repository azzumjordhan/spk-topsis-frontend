const initStateAuth = {
  login: "",
};

export const authReducer = (state = initStateAuth, action: any) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, login: action.value };
    }
  }
  return state;
};
