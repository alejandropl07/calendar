import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { checking: true },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
