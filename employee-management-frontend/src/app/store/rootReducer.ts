import { combineReducers } from "redux";
import employeesReducer from "./employeeSlice";
import adminsReducer from "./adminSlice";
import leavesReducer from "./leaveSlice";

const rootReducer = combineReducers({
  employees: employeesReducer,
  admins: adminsReducer,
  leaves: leavesReducer,
});

export default rootReducer;
