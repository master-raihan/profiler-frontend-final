import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducer";
import fileReducer from "./file/fileReducer";
import userReducer from "./user/userReducer";

export default combineReducers({
    adminReducer,
    fileReducer,
    userReducer
});