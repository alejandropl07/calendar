import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { openModal } from "../../features/ui/uiSlice";
import {
  clearActiveEvent,
  setActiveEvent,
} from "../../features/calendar/calendarSlice";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import { startLoadEvents } from "../../features/calendar/thunks";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startLoadEvents());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(openModal());
  };

  const onSelectEvent = (e) => {
    dispatch(setActiveEvent(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(clearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      color: "white",
      display: "block",
      opacity: 0.8,
    };
    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable={true}
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
      </div>
      {activeEvent && <DeleteEventFab />}
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
