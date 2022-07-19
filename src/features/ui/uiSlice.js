import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: { modalOpen: false },
  reducers: {
    openModal: (state) => {
    },
    closeModal: (state) => {
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
