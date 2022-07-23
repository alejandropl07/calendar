import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
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
    loadEvents: (state, action) => {
      return {
        ...state,
        events: [...action.payload],
      };
    },
    logoutCleaner: () => {
      return {
        events: [],
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
  loadEvents,
  logoutCleaner,
} = calendarSlice.actions;
export default calendarSlice.reducer;
