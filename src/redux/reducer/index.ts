import { combineReducers } from "redux";
import { globalReducer } from "./global";
import { criteriaReducer } from "./criteria";
import { karyawanReducer } from "./karyawan";
import { scoreReducer } from "./score";
import { topsisReducer } from "./topsis";

const reducers = combineReducers({
  globalReducer,
  criteriaReducer,
  karyawanReducer,
  scoreReducer,
  topsisReducer,
});

export default reducers;
