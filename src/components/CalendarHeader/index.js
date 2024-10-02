import React from "react";
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
const CalendarHeader = ({
  startDay,
  endDay,
  handleRangeChange,
  prevDay,
  today,
  nextDay,
  handleChange,
}) => {
  return (
    <div className="calenderHeader">
      <Select
        defaultValue="week"
        style={{ width: 120, height: 40 }}
        onChange={handleChange}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <div className="rangerPicker">
        <div onClick={prevDay}>{"<"}</div>
        <div onClick={today}>Today</div>
        <RangePicker
          defaultValue={[startDay, endDay]}
          format={"DD/MM/YYYY"}
          onChange={handleRangeChange}
          className="rounded-none"
        />
        <div onClick={nextDay}>{">"}</div>
      </div>
    </div>
  );
};

export default CalendarHeader;
