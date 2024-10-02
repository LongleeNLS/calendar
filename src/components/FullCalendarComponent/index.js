import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const FullCalendarComponent = ({
  events,
  handleEventClick,
  handleEventChange,
  handleSelect,
  calendarRef,
}) => {
  const calendar = useRef(null);

  return (
    <FullCalendar
      ref={(element) => {
        calendar.current = element;
        calendarRef.current = element;
      }}
      headerToolbar={{ start: "", center: "", end: "" }}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      selectable={true}
      initialView="timeGridWeek"
      dayMaxEventRows={true}
      views={
        {
          timeGrid: { dayMaxEventRows: 4 },
        }[("dayGridDay", "dayGridWeek", "dayGridMonth")]
      }
      events={events}
      eventClick={(arg) => handleEventClick(arg)}
      select={(arg) => handleSelect(arg)}
      eventChange={(arg) => handleEventChange(arg)}
      nowIndicator={true}
      businessHours={{
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:30",
        endTime: "18:00",
      }}
      height={"100vh"}
      navLinks={true}
      editable={true}
      allDaySlot={false}
    />
  );
};

export default FullCalendarComponent;
