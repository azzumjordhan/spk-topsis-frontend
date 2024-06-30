import {
  addUser,
  getDetailUser,
  getListUser,
  updateStatus,
  updateUser,
} from "@/api/user";
import { setLoading } from "./global";

export const createUser = (payload: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch({ type: "POST_USER_SUCCESS", value: "" });
  dispatch({ type: "POST_USER_ERROR", value: "" });
  try {
    const response = await addUser(payload);
    dispatch(setLoading(false));
    dispatch({ type: "POST_USER_SUCCESS", value: response?.data });
    return response?.data;
  } catch (error: any) {
    dispatch(setLoading(false));
    const data = error?.response?.data;
    dispatch({ type: "POST_USER_ERROR", value: data });
    return error;
  }
};

export const fetchListUser = (params: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getListUser(params);
    dispatch(setLoading(false));
    dispatch({ type: "GET_LIST_USER", value: response?.data?.data });
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "GET_LIST_USER", value: data });
  }
};

export const fetchDetailUser = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch({ type: "GET_DETAIL_USER_SUCCESS", value: "" });
  dispatch({ type: "GET_DETAIL_USER_ERROR", value: "" });
  try {
    const response = await getDetailUser(id);
    dispatch(setLoading(false));
    dispatch({ type: "GET_DETAIL_USER_SUCCESS", value: response?.data?.data });
    return response?.data?.data;
  } catch (error: any) {
    dispatch(setLoading(false));
    const data = error?.response?.data;
    dispatch({ type: "GET_DETAIL_USER_ERROR", value: data });
    return error;
  }
};

export const editUser = (id: string, payload: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch({ type: "PUT_USER_SUCCESS", value: "" });
  dispatch({ type: "PUT_USER_ERROR", value: "" });
  try {
    const response = await updateUser(id, payload);
    dispatch(setLoading(false));
    dispatch({ type: "PUT_USER_SUCCESS", value: response?.data });
    return response?.data;
  } catch (error: any) {
    dispatch(setLoading(false));
    const data = error?.response?.data;
    dispatch({ type: "PUT_USER_ERROR", value: data });
    return error;
  }
};

export const editStatusUser =
  (id: string, payload: any) => async (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch({ type: "PUT_STATUS_USER_SUCCESS", value: "" });
    dispatch({ type: "PUT_STATUS_USER_ERROR", value: "" });
    try {
      const response = await updateStatus(id, payload);
      dispatch(setLoading(false));
      dispatch({
        type: "PUT_STATUS_USER_SUCCESS",
        value: response?.data,
      });
      return response?.data;
    } catch (error: any) {
      dispatch(setLoading(false));
      const data = error?.response?.data;
      dispatch({ type: "PUT_STATUS_USER_ERROR", value: data });
      return error;
    }
  };
