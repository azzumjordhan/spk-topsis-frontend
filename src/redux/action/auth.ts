import { login } from "@/api/auth";
import { setLoading } from "./global";

export const postLogin = (payload: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await login(payload);
    console.log(response.data);
    dispatch(setLoading(false));
    dispatch({ type: "LOGIN", value: response?.data?.data });
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "LOGIN", value: data });
    dispatch(setLoading(false));
  }
};
