// App.js
import React, { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Calendar from "./components/Calendar";
import CalenderHeader from "./components/CalendarHeader";
import DropDown from "./components/DropDown";
import TaskList from "./components/TaskList";
import useCalendar from "./hooks/useCalendar";

export default function App({ data }) {
  const {
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
  } = useCalendar(data);

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );

  return (
    <div className="container">
      <div className="calendar-container">
        <CalenderHeader
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handlePrevClick={() => handleNavigation("prev")}
          handleNextClick={() => handleNavigation("next")}
          handleTodayClick={() => handleNavigation("today")}
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
