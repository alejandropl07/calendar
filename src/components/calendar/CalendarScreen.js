import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { openModal } from "../../features/ui/uiSlice";
import { setActiveEvent } from "../../features/calendar/calendarSlice";
import AddNewFab from "../ui/AddNewFab";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { events } = useSelector((state) => state.calendar);

  const onDoubleClick = (e) => {
    dispatch(openModal());
    console.log(e);
  };

  const onSelectEvent = (e) => {
    dispatch(setActiveEvent(e));
    dispatch(openModal());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
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
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
      </div>
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
