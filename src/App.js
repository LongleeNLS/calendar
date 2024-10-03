import { Draggable } from "@fullcalendar/interaction";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Calendar from "./components/Calendar";
import CalenderHeader from "./components/CalendarHeader";
import DropDown from "./components/DropDown";
import TaskList from "./components/TaskList";

const demoData = [
  {
    id: "0",
    title: "Task Demo 0",
    start: new Date("2024-10-04T09:00:00"),
    end: new Date("2024-10-04T10:00:00"),
  },
  {
    id: "1",
    title: "Task Demo 1",
    start: new Date("2024-10-03T09:00:00"),
    end: new Date("2024-10-03T10:00:00"),
  },
  {
    id: "2",
    title: "Task Demo 2",
    start: new Date("2024-10-08T09:00:00"),
    end: new Date("2024-10-08T10:00:00"),
  },
  {
    id: "3",
    title: "Task AllDay Demo 0",
    start: new Date("2024-10-03T09:00:00"),
    end: new Date("2024-10-03T10:00:00"),
    allDay: true,
  },
  {
    id: "4",
    title: "Task AllDay Demo 1",
    start: new Date("2024-10-07T09:00:00"),
    end: new Date("2024-10-10T10:00:00"),
    allDay: true,
  },
];

export default function App() {
  const [events, setEvents] = useState(demoData);
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
    setSelectedDate(date);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };

  const handleSelect = (arg) => {
    setSelectedBox({
      start: new Date(arg.start),
      end: new Date(arg.end),
    });
    if (["dayGridDay", "timeGridWeek", "timeGridDay"].includes(arg.view.type)) {
      setDropdownPosition({
        top: arg.jsEvent.clientY,
        left: arg.jsEvent.clientX,
      });
      setDropdownVisible(!dropdownVisible);
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
          ? { ...event, start: new Date(arg.event.start), end: new Date(arg.event.end), allDay: arg.event.allDay }
          : event
      )
    );
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(arg.date);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };

  const handleNavigationClick = (direction) => {
    const calendarApi = calendarRef.current.getApi();
    let newDate = new Date(selectedDate);
    newDate.setDate(
      newDate.getDate() + (direction === 'next' ? 1 : -1) * (selectedView === "day" ? 1 : selectedView === "week" ? 7 : 30)
    );

    setSelectedDate(newDate);
    calendarApi.gotoDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };

  const isTodaySelected = () => {
    return new Date().toDateString() === selectedDate.toDateString();
  };

  const ExampleCustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const handleEventReceive = (info) => {
    // const newEvent = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   title: info.event.title,
    //   start: info.event.start,
    //   end: info.event.end || info.event.start,
    //   allDay: info.event.allDay,
    // };
    // setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  return (
    <div className="container">
      <div className="calendar-container">
        <CalenderHeader
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handlePrevClick={() => handleNavigationClick('prev')}
          handleNextClick={() => handleNavigationClick('next')}
          handleTodayClick={handleTodayClick}
          isTodaySelected={isTodaySelected}
          ExampleCustomInput={ExampleCustomInput}
          selectedView={selectedView}
          selectedDate={selectedDate}
          calendarTitle={calendarTitle}
        />

        <Calendar
          calendarRef={calendarRef}
          events={events}
          handleSelect={handleSelect}
          handleEventChange={handleEventChange}
          handleDateClick={handleDateClick}
          handleEventReceive={handleEventReceive}
        />
        {dropdownVisible && (
          <DropDown
            dropdownPosition={dropdownPosition}
            handleOptionClicker={handleOptionClicker}
          />
        )}
      </div>
      <div className="other-element">
        <TaskList events={events} />
      </div>
    </div>
  );
}
