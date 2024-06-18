import { getResultTopsis } from "@/api/topsis";
import { setLoading } from "./global";

export const fetchTopsisResult = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getResultTopsis();
    dispatch(setLoading(false));
    dispatch({ type: "GET_RESULT_TOPSIS", value: response.data });

    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    dispatch({ type: "GET_RESULT_TOPSIS", value: data });
  }
};
