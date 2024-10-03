import { Select } from "antd";
import DatePicker from "react-datepicker";

export default function CalenderHeader({
  handleChange,
  handleDateChange,
  handlePrevClick,
  handleNextClick,
  handleTodayClick,
  isTodaySelected,
  ExampleCustomInput,
  selectedView,
  selectedDate,
  calendarTitle,
}) {
  return (
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
          customInput={<ExampleCustomInput className="example-custom-input" />}
          value={calendarTitle}
        />
        <button onClick={handleNextClick} className="changeButton">
          {">"}
        </button>
      </div>
    </div>
  );
}
