import { useEffect, useRef, useState } from "react";
import { Draggable } from "@fullcalendar/interaction";

const useCalendar = (data) => {
  const [events, setEvents] = useState(data);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const calendarRef = useRef(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [calendarTitle, setCalendarTitle] = useState("");

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    setCalendarTitle(calendarApi.currentData.viewTitle);
  }, [selectedDate, selectedView]);

  useEffect(() => {
    const containerEl = document.querySelector("#exportEvent");
    new Draggable(containerEl, {
      itemSelector: ".exportEventItem",
      eventData: (eventEl) => ({
        title: eventEl.innerText,
        allDay: true,
      }),
    });
  }, []);

  useEffect(() => {
    if (dropdownVisible) {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".popOvers")) {
          setDropdownVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownVisible]);

  const changeView = (viewType) => {
    calendarRef.current.getApi().changeView(viewType);
  };

  const handleChange = (value) => {
    setSelectedView(value);
    const viewMap = {
      day: "timeGridDay",
      week: "timeGridWeek",
      month: "dayGridMonth",
    };
    changeView(viewMap[value]);
  };

  const handleDateChange = (date) => {
    const calendarApi = calendarRef.current.getApi();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const currentWeekStart = new Date(selectedDate);
    currentWeekStart.setDate(
      currentWeekStart.getDate() - currentWeekStart.getDay()
    );
    const currentWeekEnd = new Date(selectedDate);
    currentWeekEnd.setDate(
      currentWeekEnd.getDate() + (6 - currentWeekEnd.getDay())
    );

    const isMonthChanged =
      selectedView === "month" &&
      (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear);

    const isWeekChanged =
      selectedView === "week" &&
      (date < currentWeekStart || date > currentWeekEnd);

    if (isMonthChanged || isWeekChanged) {
      setSelectedDate(date);
      calendarApi.gotoDate(date);
    } else if (selectedView === "day") {
      setSelectedDate(date);
      calendarApi.gotoDate(date);
      calendarApi.changeView("timeGridDay");
    }
  };

  const handleSelect = (arg) => {
    setSelectedBox({
      start: new Date(arg.start),
      end: new Date(arg.end),
    });
    if (["dayGridDay", "timeGridWeek", "timeGridDay"].includes(arg.view.type)) {
      setDropdownPosition({
        top: arg.jsEvent.pageY,
        left: arg.jsEvent.pageX,
      });
      setDropdownVisible(true);
    }
  };

  const handleOptionClicker = (title) => {
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      start: selectedBox.start,
      end: selectedBox.end,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setDropdownVisible(false);
  };

  const handleEventChange = (arg) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === arg.event.id
          ? {
              ...event,
              allDay: arg.event.allDay,
            }
          : event
      )
    );
  };

  const handleDateClick = (arg) => {
    const calendarApi = calendarRef.current.getApi();
    if (selectedView === "month") {
      setSelectedDate(arg.date);
      calendarApi.gotoDate(arg.date);
      calendarApi.changeView("timeGridDay");
      setSelectedView("day");
    } else if (selectedView === "week") {
      setSelectedDate(arg.date);
      calendarApi.gotoDate(arg.date);
    }
  };

  const handleNavigation = (direction) => {
    const calendarApi = calendarRef.current.getApi();
    let newDate = new Date(selectedDate);

    if (direction === "today") {
      newDate = new Date();
      setSelectedView("day");
      calendarApi.changeView("timeGridDay");
    } else {
      const increment =
        selectedView === "day" ? 1 : selectedView === "week" ? 7 : 30;
      newDate.setDate(
        newDate.getDate() + (direction === "next" ? increment : -increment)
      );
    }

    setSelectedDate(newDate);
    calendarApi.gotoDate(newDate);
  };

  const isTodaySelected = () => {
    return new Date().toDateString() === selectedDate.toDateString();
  };

  return {
    events,
    setEvents,
    selectedDate,
    setSelectedDate,
    selectedView,
    setSelectedView,
    calendarRef,
    selectedBox,
    setSelectedBox,
    dropdownVisible,
    setDropdownVisible,
    dropdownPosition,
    setDropdownPosition,
    calendarTitle,
    handleChange,
    handleDateChange,
    handleSelect,
    handleOptionClicker,
    handleEventChange,
    handleDateClick,
    handleNavigation,
    isTodaySelected,
  };
};

export default useCalendar;
