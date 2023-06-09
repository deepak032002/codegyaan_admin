import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface auth {
  token: string;
}

const initialState: auth = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (store, action: PayloadAction<{ token: string }>) => {
      store.token = action.payload.token;
    },
    removeToken: (store) => {
      store.token = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
