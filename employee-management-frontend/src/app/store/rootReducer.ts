import { combineReducers } from "redux";
import employeesReducer from "./employeeSlice";

const rootReducer = combineReducers({
  employees: employeesReducer,
});

export default rootReducer;
