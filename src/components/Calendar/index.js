import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
export default function Calendar({
  calendarRef,
  events,
  handleSelect,
  handleEventChange,
  handleDateClick,
  handleEventReceive
}) {
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        headerToolbar={{ start: "", center: "", end: "" }}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        selectable={true}
        initialView="dayGridMonth"
        dayMaxEventRows={true}
        events={events}
        select={handleSelect}
        eventChange={handleEventChange}
        nowIndicator={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "08:30",
          endTime: "18:00",
        }}
        height="100vh"
        navLinks={true}
        editable={true}
        dateClick={handleDateClick}
        droppable
        handleEventReceive={handleEventReceive}
      />
    </>
  );
}
