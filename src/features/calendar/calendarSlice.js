import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
      {
        title: "My birthday",
        start: moment().toDate(),
        end: moment().add(2, "hours").toDate(),
        notes: "Party",
        user: {
          _id: "123",
          name: "Alejandro",
        },
      },
    ],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    addNewEvent: (state, action) => {
      state.events.push(action.payload);
    },
    clearActiveEvent: (state) => {
      state.activeEvent = null;
    },
  },
});

export const { setActiveEvent, addNewEvent, clearActiveEvent } =
  calendarSlice.actions;
export default calendarSlice.reducer;
