import { useState, useRef } from 'react';
import dayjs from 'dayjs';

const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [startDay, setStartDay] = useState(dayjs().startOf("week"));
  const [endDay, setEndDay] = useState(dayjs().endOf("week"));
  const calendarRef = useRef(null);

  const handleSelect = (arg) => {
    if (
      arg.view.type === "dayGridDay" ||
      arg.view.type === "timeGridWeek" ||
      arg.view.type === "timeGridDay"
    ) {
      const title = prompt("Enter task title");
      if (title) {
        const newEvent = { title, start: arg.start, end: arg.end };
        setEvents([...events, newEvent]);
      }
    }
  };

  const handleEventClick = (arg) => {
    console.log("Event clicked", arg);
  };

  const handleEventChange = (arg) => {
    const updatedEvents = events.map((event) => {
      if (event.id === arg.event.id) {
        return { ...event, start: arg.event.start, end: arg.event.end };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleRangeChange = (dates) => {
    if (dates) {
      const calendarApi = calendarRef.current.getApi();
      const [start, end] = dates;
      calendarApi.gotoDate(dayjs(start).toISOString());
    }
  };

  const nextDay = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const prevDay = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const today = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  const openDay = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridDay");
  };

  const openWeek = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek");
  };

  const openMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("dayGridMonth");
  };

  const handleChange = (value) => {
    switch (value) {
      case "day":
        openDay();
        break;
      case "week":
        openWeek();
        break;
      case "month":
        openMonth();
        break;
      default:
        break;
    }
  };

  return {
    events,
    setEvents,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    calendarRef,
    handleSelect,
    handleEventClick,
    handleEventChange,
    handleRangeChange,
    nextDay,
    prevDay,
    today,
    openDay,
    openWeek,
    openMonth,
    handleChange,
  };
};

export default useCalendar;