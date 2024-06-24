import { combineReducers } from "redux";
import { globalReducer } from "./global";
import { criteriaReducer } from "./criteria";
import { karyawanReducer } from "./karyawan";
import { scoreReducer } from "./score";
import { topsisReducer } from "./topsis";
import { authReducer } from "./auth";
import { userReducer } from "./user";

const reducers = combineReducers({
  globalReducer,
  criteriaReducer,
  karyawanReducer,
  scoreReducer,
  topsisReducer,
  authReducer,
  userReducer,
});

export default reducers;
