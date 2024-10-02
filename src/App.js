import React from 'react';
import './App.css';
import CalendarHeader from './components/CalendarHeader';
import FullCalendarComponent from './components/FullCalendarComponent';
import TaskList from './components/TaskList';
import useCalendar from './components/useCalendar';

function App() {
  const {
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
  } = useCalendar();

  return (
    <div className="container">
      <div className="calendar-container">
        <CalendarHeader
          startDay={startDay}
          endDay={endDay}
          handleRangeChange={handleRangeChange}
          prevDay={prevDay}
          today={today}
          nextDay={nextDay}
          handleChange={handleChange}
        />
        <FullCalendarComponent
          events={events}
          handleEventClick={handleEventClick}
          handleEventChange={handleEventChange}
          handleSelect={handleSelect}
          calendarRef={calendarRef}
        />
      </div>
      <div className="other-element">
        <TaskList events={events} />
      </div>
    </div>
  );
}

export default App;