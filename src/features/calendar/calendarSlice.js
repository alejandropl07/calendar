import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
      {
        id: new Date().getTime(),
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
    updateEvent: (state, action) => {
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    },
    deleteEvent: (state) => {
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };
    },
  },
});

export const {
  setActiveEvent,
  addNewEvent,
  clearActiveEvent,
  updateEvent,
  deleteEvent,
} = calendarSlice.actions;
export default calendarSlice.reducer;
