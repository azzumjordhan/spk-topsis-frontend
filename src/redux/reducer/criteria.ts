const initStateCriteria = {
  listCriteria: "",
  postCriteria: "",
  deleteCriteria: "",
  deleteAllCriteria: ""
};

export const criteriaReducer = (state = initStateCriteria, action: any) => {
  switch (action.type) {
    case "GET_LIST_CRITERIA": {
      return { ...state, listCriteria: action.value };
    }
    case "POST_CRITERIA_SUCCESS": {
      return { ...state, postCriteria: action.value };
    }
    case "POST_CRITERIA_ERROR": {
      return { ...state, postCriteria: action.value };
    }
    case "DELETE_CRITERIA_SUCCESS": {
      return { ...state, deleteCriteria: action.value };
    }
    case "DELETE_CRITERIA_ERROR": {
      return { ...state, deleteCriteria: action.value };
    }
    case "DELETE_ALL_CRITERIA_SUCCESS": {
      return { ...state, deleteAllCriteria: action.value };
    }
    case "DELETE_ALL_CRITERIA_ERROR": {
      return { ...state, deleteAllCriteria: action.value };
    }
  }
  return state;
};
