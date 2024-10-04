import React, { useState, useEffect, memo } from "react";

const TaskList = memo(({ taskList }) => {
  const [taskColors, setTaskColors] = useState([]);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const generateColorForNewTask = () => ({
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
  });

  useEffect(() => {
    if (taskList.length > taskColors.length) {
      const newColors = Array.from(
        { length: taskList.length - taskColors.length },
        generateColorForNewTask
      );
      setTaskColors((prevColors) => [...prevColors, ...newColors]);
    }
  }, [taskList]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul id="exportEvent">
        {taskList.map(({ id, title }, index) => {
          const { backgroundColor, borderColor } =
            taskColors[index] || generateColorForNewTask();
          return (
            <li
            key={id}
            data-id={id}
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
