import {
  deleteAllKaryawan,
  deleteKaryawan,
  getListKaryawan,
  postKaryawan,
} from "@/api/karyawan";
import { setLoading } from "./global";

export const fetchListKaryawan = (params: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getListKaryawan(params);
    dispatch(setLoading(false));
    dispatch({ type: "GET_LIST_KARYAWAN", value: response.data.data });
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "GET_LIST_KARYAWAN", value: data });
  }
};

export const addKaryawan = (payload: any) => async (dispatch: any) => {
  dispatch({ type: "POST_KARYAWAN_SUCCESS", value: "" });
  dispatch({ type: "POST_KARYAWAN_ERROR", value: "" });
  try {
    const response = await postKaryawan(payload);
    dispatch({ type: "POST_KARYAWAN_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error.response.data;
    dispatch({ type: "POST_KARYAWAN_ERROR", value: data });
    return error;
  }
};

export const removeKaryawan = (id: string) => async (dispatch: any) => {
  await dispatch({ type: "DELETE_KARYAWAN_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_KARYAWAN_ERROR", value: "" });
  try {
    const response = await deleteKaryawan(id);
    dispatch({ type: "DELETE_KARYAWAN_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_KARYAWAN_ERROR", value: data });
    return error;
  }
};

export const removeAllKaryawan = () => async (dispatch: any) => {
  await dispatch({ type: "DELETE_ALL_KARYAWAN_SUCCESS", value: "" });
  await dispatch({ type: "DELETE_ALL_KARYAWAN_ERROR", value: "" });
  try {
    const response = await deleteAllKaryawan();
    dispatch({ type: "DELETE_ALL_KARYAWAN_SUCCESS", value: response.data });
    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "DELETE_ALL_KARYAWAN_ERROR", value: data });
    return error;
  }
};
