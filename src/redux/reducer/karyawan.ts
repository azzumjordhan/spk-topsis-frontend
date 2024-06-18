const initStateKaryawan = {
  listKaryawan: "",
  postKaryawan: "",
  deleteKaryawan: "",
  deleteAllKaryawan: "",
};

export const karyawanReducer = (state = initStateKaryawan, action: any) => {
  switch (action.type) {
    case "GET_LIST_KARYAWAN": {
      return { ...state, listKaryawan: action.value };
    }
    case "POST_KARYAWAN_SUCCESS": {
      return { ...state, postKaryawan: action.value };
    }
    case "POST_KARYAWAN_ERROR": {
      return { ...state, postKaryawan: action.value };
    }
    case "DELETE_KARYAWAN_SUCCESS": {
      return { ...state, deleteKaryawan: action.value };
    }
    case "DELETE_KARYAWAN_ERROR": {
      return { ...state, deleteKaryawan: action.value };
    }
    case "DELETE_ALL_KARYAWAN_SUCCESS": {
      return { ...state, deleteAllKaryawan: action.value };
    }
    case "DELETE_ALL_KARYAWAN_ERROR": {
      return { ...state, deleteAllKaryawan: action.value };
    }
  }
  return state;
};
