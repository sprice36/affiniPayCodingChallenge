import {combineReducers} from "redux";
import global_reducer from "./global_reducer.js";

const rootReducer = combineReducers({ global_reducer });

export default rootReducer;