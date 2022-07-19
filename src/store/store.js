import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
