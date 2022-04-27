import { combineReducers } from "redux";

import { State } from "../interfaces/state";
import commons from "./commons";

export default combineReducers<State>({
  commons,
});
