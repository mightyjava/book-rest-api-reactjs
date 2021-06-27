import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import bookReducer from "./book/bookReducer";

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  auth: authReducer,
});

export default rootReducer;
