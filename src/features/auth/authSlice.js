import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { checking: true },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    },
    checkingFinish: (state) => {
      return {
        ...state,
        checking: false,
      };
    },
  },
});

export const { login, checkingFinish } = authSlice.actions;
export default authSlice.reducer;
