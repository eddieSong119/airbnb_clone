import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  bookings: bookingReducer,
});

export default rootReducer;
