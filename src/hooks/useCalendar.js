import { useEffect, useRef, useState } from "react";
import { Draggable } from "@fullcalendar/interaction";

const dataCalendar = [
  {
    "id": "0",
    "title": "Task Demo Calendar 0",
    "start": "2024-10-04T02:00:00.000Z",
    "end": "2024-10-04T03:00:00.000Z"
  },
  {
    "id": "1",
    "title": "Task Demo Calendar 1",
    "start": "2024-10-03T02:00:00.000Z",
    "end": "2024-10-03T03:00:00.000Z"
  },
  {
    "id": "2",
    "title": "Task Demo Calendar 2",
    "start": "2024-10-08T02:00:00.000Z",
    "end": "2024-10-08T03:00:00.000Z"
  },
  {
    "id": "3",
    "title": "Task Demo Calendar 3",
    "start": "2024-10-03T02:00:00.000Z",
    "end": "2024-10-03T03:00:00.000Z",
    "allDay": true
  },
  {
    "id": "4",
    "title": "Task Demo Calendar 4",
    "start": "2024-10-07T02:00:00.000Z",
    "end": "2024-10-10T03:00:00.000Z",
    "allDay": true
  }
]
const dataTaskList = [
  {
    "id": "5",
    "title": "Task Demo TaskList 0",
    "start": "2024-10-04T02:00:00.000Z",
    "end": "2024-10-04T03:00:00.000Z"
  },
  {
    "id": "6",
    "title": "Task Demo TaskList 1",
    "start": "2024-10-03T02:00:00.000Z",
    "end": "2024-10-03T03:00:00.000Z"
  },
  {
    "id": "7",
    "title": "Task Demo TaskList 2",
    "start": "2024-10-08T02:00:00.000Z",
    "end": "2024-10-08T03:00:00.000Z"
  },
  {
    "id": "8",
    "title": "Task Demo TaskList 3",
    "start": "2024-10-03T02:00:00.000Z",
    "end": "2024-10-03T03:00:00.000Z",
    "allDay": true
  },
  {
    "id": "9",
    "title": "Task Demo TaskList 4",
    "start": "2024-10-07T02:00:00.000Z",
    "end": "2024-10-10T03:00:00.000Z",
    "allDay": true
  }
]

const useCalendar = () => {
  const [events, setEvents] = useState(dataCalendar);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const calendarRef = useRef(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [calendarTitle, setCalendarTitle] = useState("");
  const [taskList, setTaskList] = useState(dataTaskList);

  const handleEventReceive = (info) => {
    const { id } = info.draggedEl.dataset;

    const newEvent = {
      id: id,
      title: info.draggedEl.innerText,
      start: info.event.start,
      end: info.event.end,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEventDrop = (info) => {
    const { id } = info.event;

    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

    const droppedTask = {
      id: id,
      title: info.event.title,
    };

    setTaskList((prevTasks) => [...prevTasks, droppedTask]);
  };
  
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
          setDropdownVisible(!dropdownVisible);
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
      setDropdownVisible(!dropdownVisible);
    }
  };

  // const handleOptionClicker = (title) => {
  //   const newEvent = {
  //     id: Math.random().toString(36).substr(2, 9),
  //     title,
  //     start: selectedBox.start,
  //     end: selectedBox.end,
  //   };

  //   setEvents((prevEvents) => [...prevEvents, newEvent]);
  //   setDropdownVisible(false);
  // };

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
    // handleOptionClicker,
    handleEventChange,
    handleDateClick,
    handleNavigation,
    isTodaySelected,
    taskList,
    setTaskList,
    handleEventReceive,
    handleEventDrop,
  };
};

export default useCalendar;
