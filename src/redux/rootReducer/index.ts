import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '../features/AuthSlice'
import { authServices, categoryServices, tagServices, blogServices } from '../services/apiSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  [authServices.reducerPath]: authServices.reducer,
  [categoryServices.reducerPath]: categoryServices.reducer,
  [tagServices.reducerPath]: tagServices.reducer,
  [blogServices.reducerPath]: blogServices.reducer
})

export default rootReducer
