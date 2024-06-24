import { combineReducers } from "redux";
import { globalReducer } from "./global";
import { criteriaReducer } from "./criteria";
import { karyawanReducer } from "./karyawan";
import { scoreReducer } from "./score";
import { topsisReducer } from "./topsis";
import { authReducer } from "./auth";

const reducers = combineReducers({
  globalReducer,
  criteriaReducer,
  karyawanReducer,
  scoreReducer,
  topsisReducer,
  authReducer,
});

export default reducers;
