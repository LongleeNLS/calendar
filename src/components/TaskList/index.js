import React, { useState, useEffect, memo } from "react";

const TaskList = memo(({ events }) => {
  const [taskColors, setTaskColors] = useState([]);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const generateColorForNewTask = () => ({
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
  });

  useEffect(() => {
    if (events.length > taskColors.length) {
      const newColors = Array.from(
        { length: events.length - taskColors.length },
        generateColorForNewTask
      );
      setTaskColors((prevColors) => [...prevColors, ...newColors]);
    }
  }, [events]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul id="exportEvent">
        {events.map(({ title }, index) => {
          const { backgroundColor, borderColor } =
            taskColors[index] || generateColorForNewTask();
          return (
            <li
              key={index}
              style={{
                backgroundColor,
                borderLeft: `5px solid ${borderColor}`,
              }}
              className="exportEventItem"
            >
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default TaskList;
