import React, { useState, useEffect } from "react";

const TaskList = ({ events }) => {
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [colors, setColors] = useState([]);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  useEffect(() => {
    const shuffleIndexes = () =>
      Array.from({ length: events.length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
    setShuffledIndexes(shuffleIndexes());

    const newColors = events.map(() => getRandomColor());
    setColors(newColors);
  }, [events]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {shuffledIndexes.map((index) => (
          <li
            key={index}
            style={{
              backgroundColor: colors[index],
              borderLeft: `5px solid ${colors[index]}`,
            }}
          >
            <p>
              <strong>Tiêu đề:</strong> {events[index].title}
            </p>
            <p>
              <strong>Ngày tháng:</strong>{" "}
              {events[index].start.toLocaleDateString()}
            </p>
            <p>
              <strong>Giờ bắt đầu:</strong>{" "}
              {events[index].start.toLocaleTimeString()}
            </p>
            <p>
              <strong>Giờ kết thúc:</strong>{" "}
              {events[index].end.toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
