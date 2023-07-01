import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/AuthSlice";
import { authServices } from "../services/apiSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [authServices.reducerPath]: authServices.reducer
});

export default rootReducer;
