import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
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
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
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
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
