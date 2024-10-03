import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import TaskList from "./components/TaskList";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const calendarRef = useRef(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Tạo hàm nhận lấy viewType đại diện cho loại hiển thị mà nó nhận được
  const changeView = (viewType) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewType);
  };
  // Tạo hàm để tạo chức năng dropdown, gán các thông tin của calendar vào chữ cái ngắn hơn để dễ thao tác
  const handleChange = (value) => {
    setSelectedView(value);
    const viewMap = {
      day: "timeGridDay",
      week: "timeGridWeek",
      month: "dayGridMonth",
    };
    changeView(viewMap[value]);
  };
  // Chức năng kéo bên ngoài vào calendar
  useEffect(() => {
    const containerEl = document.querySelector("#exportEvent");
    new Draggable(containerEl, {
      itemSelector: ".exportEventItem",
      eventData: (eventEl) => {
        return {
          title: eventEl.innerText,
        };
      },
    });
  }, []);
  // Sự kiện đồng bộ hóa ở calendar header và fullcalendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };
  // Sự kiện tạo popup với 3 option tại vị trí click với top và left, sẽ tắt đi nếu double click
  const handleSelect = (arg) => {
    setSelectedBox(new Date(arg.start));
    if (["dayGridDay", "timeGridWeek", "timeGridDay"].includes(arg.view.type)) {
      setDropdownPosition({
        top: arg.jsEvent.clientY,
        left: arg.jsEvent.clientX,
      });
      setDropdownVisible(!dropdownVisible);
    }
  };
  // Tạo sự kiện để thêm task vào siddebar và tên task random ngẫu nhiên từ 1 - 100
  const handleOptionClicker = (title) => {
    const newEvent = { title, start: selectedBox, end: selectedBox };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setDropdownVisible(!dropdownVisible);
  };
  // Sự kiện sẽ thay đổi này giờ task khi có sự kiện kéo thả hoặc thay đổi
  const handleEventChange = (arg) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === arg.event.id
          ? { ...event, start: arg.event.start, end: arg.event.end }
          : event
      )
    );
  };
  // Hàm sẽ chuyển đến ngày khi click ở month
  const handleDateClick = (arg) => {
    const calendarApi = calendarRef.current.getApi();
    setSelectedDate(arg.date);
    calendarApi.gotoDate(arg.date);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };
  // Thay đổi định dạng ngày tháng năm ở datePicker
  const formatDatePicker = () => {
    if (selectedView === "day") {
      return "MMMM, d, YYYY";
    } else if (selectedView === "week") {
      return "MMMM, d, YYYY";
    } else if (selectedView === "month") {
      return "MMMM YYYY";
    }
  };
  // Hàm chuyển đến ngày hôm trước ở day, tuần trước ở week, và 30 ngày trước ở month
  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi();
    let newDate;

    if (selectedView === "day") {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
    } else if (selectedView === "week") {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 7);
    } else if (selectedView === "month") {
      newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() - 1,
        1
      );
    }

    setSelectedDate(newDate);
    calendarApi.gotoDate(newDate);
  };
  // Hàm chuyển đến ngày hôm sau ở day, tuần sau ở week, và 30 ngày sau ở month
  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi();
    let newDate;

    if (selectedView === "day") {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
    } else if (selectedView === "week") {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 7);
    } else if (selectedView === "month") {
      newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        1
      );
    }

    setSelectedDate(newDate);
    calendarApi.gotoDate(newDate);
  };
  // Hàm khi chọn sẽ đồng bộ với fullcalendar để chuyển đến giao diện day của ngày hôm nay
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(today);
    calendarApi.changeView("timeGridDay");
    setSelectedView("day");
  };
  // Hàm để kiểm tra hôm nay là ngày bao nhiêu
  const isTodaySelected = () => {
    const today = new Date();
    return (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    );
  };
  // Biến custom input thành button của datepicker
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );
  // Biến tạo dữ liệu mẫu bên trong fullcalendar
  const INITIAL_EVENTS = [
    {
      title: "Task 0 - First task",
      date: new Date().toISOString().substr(0, 10),
    },
  ];

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="calenderHeader ">
          <Select
            value={selectedView}
            style={{ width: 120, height: 40 }}
            onChange={handleChange}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
          <div className="navigation-buttons">
            <button onClick={handlePrevClick} className="changeButton">
              {"<"}
            </button>
            <button
              onClick={handleTodayClick}
              className={`today ${isTodaySelected() ? "active" : ""}`}
            >
              Today
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              monthsShown={2}
              customInput={
                <ExampleCustomInput className="example-custom-input" />
              }
              dateFormat={formatDatePicker()}
            />
            <button onClick={handleNextClick} className="changeButton">
              {">"}
            </button>
          </div>
        </div>

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
          allDaySlot={false}
          dateClick={handleDateClick}
          initialEvents={INITIAL_EVENTS}
          droppable
        />

        <div onSelect={handleSelect}>
          {dropdownVisible && (
            <div
              style={{
                position: "absolute",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
              className="popOvers"
            >
              {["New Job", "Add Time Off", "Add Custom Event"].map((index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleOptionClicker(
                        `Task ${Math.floor(Math.random() * 100) + 1}`
                      )
                    }
                  >
                    {index}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="other-element">
        <TaskList events={events} />
      </div>
    </div>
  );
}
