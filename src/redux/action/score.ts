import {
  deleteAllScore,
  deleteScore,
  getDetailScore,
  getListEmployeeScores,
  postScores,
  updateEmployeeScore,
} from "@/api/score";
import { setLoading } from "./global";

export const addScore = (payload: any) => async (dispatch: any) => {
  dispatch({ type: "POST_SCORE_SUCCESS", value: "" });
  dispatch({ type: "POST_SCORE_ERROR", value: "" });
  try {
    const response = await postScores(payload);
    dispatch({ type: "POST_SCORE_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error.response.data;
    dispatch({ type: "POST_SCORE_ERROR", value: data });
    return error;
  }
};

export const fetchListScore = (params: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getListEmployeeScores(params);
    dispatch(setLoading(false));
    dispatch({
      type: "GET_LIST_SCORE_OF_EMPLOYEES",
      value: response?.data?.data,
    });
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "GET_LIST_SCORE_OF_EMPLOYEES", value: data });
  }
};

export const getEmployeeDetailScore = (id: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getDetailScore(id);
    dispatch(setLoading(false));
    dispatch({
      type: "GET_EMPLOYEE_DETAIL_SCORE_SUCCESS",
      value: response.data.data,
    });
    return response.data.data;
  } catch (error: any) {
    dispatch(setLoading(false));
    const data = error?.response?.data;
    dispatch({ type: "GET_EMPLOYEE_DETAIL_SCORE_ERROR", value: data });
    return error;
  }
};

export const editEmployeeScore =
  (id: any, payload: any) => async (dispatch: any) => {
    await dispatch(setLoading(true));
    await dispatch({ type: "PUT_EMPLOYEE_SCORE_SUCCESS", value: "" });
    await dispatch({ type: "PUT_EMPLOYEE_SCORE_ERROR", value: "" });
    try {
      const response = await updateEmployeeScore(id, payload);
      dispatch(setLoading(false));
      dispatch({
        type: "PUT_EMPLOYEE_SCORE_SUCCESS",
        value: response.data,
      });
      return response?.data;
    } catch (error: any) {
      dispatch(setLoading(false));
      const data = error?.response?.data;
      dispatch({ type: "PUT_EMPLOYEE_SCORE_ERROR", value: data });
      return error;
    }
  };

export const removeScore = (id: string) => async (dispatch: any) => {
  await dispatch({ type: "DELETE_SCORE_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_SCORE_ERROR", value: "" });
  try {
    const response = await deleteScore(id);
    dispatch({ type: "DELETE_SCORE_SUCCESS", value: response.data });
    return response?.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_SCORE_ERROR", value: data });
    return error;
  }
};

export const removeAllScore = () => async (dispatch: any) => {
  await dispatch({ type: "DELETE_ALL_SCORE_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_ALL_SCORE_ERROR", value: "" });
  try {
    const response = await deleteAllScore();
    console.log(response);
    dispatch({ type: "DELETE_ALL_SCORE_SUCCESS", value: response.data });
    return response?.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_ALL_SCORE_ERROR", value: data });
    return error;
  }
}
