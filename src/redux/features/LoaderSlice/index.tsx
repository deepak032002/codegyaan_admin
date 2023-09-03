import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoaderProps } from "../../../types/loaderslice";

const initialState: LoaderProps = {
  isLoad: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIsLoad: (store, action: PayloadAction<boolean>) => {
      store.isLoad = action.payload;
    },
  },
});

export const { setIsLoad } = loaderSlice.actions;
export default loaderSlice.reducer;
