import { combineReducers } from "redux";
import employeesReducer from "./employeeSlice";
import adminsReducer from "./adminSlice";

const rootReducer = combineReducers({
  employees: employeesReducer,
  admins: adminsReducer,
});

export default rootReducer;
