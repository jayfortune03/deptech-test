import { combineReducers } from "redux";
import usersReducer from "./userSlice";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
