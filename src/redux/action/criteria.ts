import {
  deleteAllCriteria,
  deleteCriteria,
  getListCriteria,
  postCriteria,
} from "@/api/criteria";
import { setLoading } from "./global";

export const fetchCriteria = (params: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getListCriteria(params);
    dispatch(setLoading(false));
    dispatch({ type: "GET_LIST_CRITERIA", value: response.data.data });
  } catch (error: any) {
    const data = error.response.data;
    dispatch({ type: "GET_LIST_CRITERIA", value: data });
  }
};

export const addCriteria = (payload: any) => async (dispatch: any) => {
  await dispatch({ type: "POST_CRITERIA_SUCCESS", value: "" });
  await dispatch({ type: "POST_CRITERIA_ERROR", value: "" });
  try {
    const response = await postCriteria(payload);
    dispatch({ type: "POST_CRITERIA_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error.response.data;
    dispatch({ type: "POST_CRITERIA_ERROR", value: data });
    return error;
  }
};

export const removeCriteria = (id: string) => async (dispatch: any) => {
  await dispatch({ type: "DELETE_CRITERIA_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_CRITERIA_ERROR", value: "" });
  try {
    const response = await deleteCriteria(id);
    dispatch({ type: "DELETE_CRITERIA_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_CRITERIA_ERROR", value: data });
    return error;
  }
};

export const removeAllCriteria = () => async (dispatch: any) => {
  await dispatch({ type: "DELETE_ALL_CRITERIA_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_ALL_CRITERIA_ERROR", value: "" });
  try {
    const response = await deleteAllCriteria();
    dispatch({ type: "DELETE_ALL_CRITERIA_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_ALL_CRITERIA_ERROR", value: data });
    return error;
  }
};
