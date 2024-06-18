const initStateScores = {
  listScore: "",
  postScore: "",
  detailScore: "",
  editScore: "",
  deleteScore: "",
  deleteAllScore: "",
};

export const scoreReducer = (state = initStateScores, action: any) => {
  switch (action.type) {
    case "POST_SCORE_SUCCESS": {
      return { ...state, postScore: action.value };
    }
    case "POST_SCORE_ERROR": {
      return { ...state, postScore: action.value };
    }
    case "GET_LIST_SCORE_OF_EMPLOYEES": {
      return { ...state, listScore: action.value };
    }
    case "GET_EMPLOYEE_DETAIL_SCORE_SUCCESS": {
      return { ...state, detailScore: action.value };
    }
    case "GET_EMPLOYEE_DETAIL_SCORE_ERROR": {
      return { ...state, detailScore: action.value };
    }
    case "PUT_EMPLOYEE_SCORE_SUCCESS": {
      return { ...state, editScore: action.value };
    }
    case "PUT_EMPLOYEE_SCORE_ERROR": {
      return { ...state, editScore: action.value };
    }
    case "DELETE_SCORE_SUCCESS": {
      return { ...state, deleteScore: action.value };
    }
    case "DELETE_SCORE_ERROR": {
      return { ...state, deleteScore: action.value };
    }
    case "DELETE_ALL_SCORE_SUCCESS": {
      return { ...state, deleteAllScore: action.value };
    }
    case "DELETE_ALL_SCORE_ERROR": {
      return { ...state, deleteAllScore: action.value };
    }
  }
  return state;
};
