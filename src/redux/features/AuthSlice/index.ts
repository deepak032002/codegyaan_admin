import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthProps, UserData } from "../../../types/authslice";

const initialState: AuthProps = {
  token: "",
  userData: {
    name: "",
    email: "",
    avtar: "",
    role: "",
  },
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

    setUserData: (store, action: PayloadAction<UserData>) => {
      store.userData = action.payload;
    },
  },
});

export const { setToken, removeToken, setUserData } = authSlice.actions;
export default authSlice.reducer;
