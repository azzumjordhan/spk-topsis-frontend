const initStateTopsis = {
  resultTopsis: "",
};

export const topsisReducer = (state = initStateTopsis, action: any) => {
  switch (action.type) {
    case "GET_RESULT_TOPSIS": {
      return { ...state, resultTopsis: action.value };
    }
  }
  return state;
};
