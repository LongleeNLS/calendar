import React, { useState, useEffect } from "react";

const TaskList = ({ events }) => {
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [borderColors, setBorderColors] = useState([]);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  useEffect(() => {
    const shuffleIndexes = () =>
      Array.from({ length: events.length }, (_, i) => i).sort(
        () => Math.random() - 0.5
      );
    setShuffledIndexes(shuffleIndexes());

    const newBackgroundColors = events.map(() => getRandomColor());
    const newBorderColors = events.map(() => getRandomColor());

    // Ensure border color is not the same as background color
    const finalBorderColors = newBorderColors.map((borderColor, index) => {
      while (borderColor === newBackgroundColors[index]) {
        borderColor = getRandomColor();
      }
      return borderColor;
    });

    setBackgroundColors(newBackgroundColors);
    setBorderColors(finalBorderColors);
  }, [events]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul id="exportEvent">
        <li className="exportEventItem">
          <p>
            <strong>Tiêu đề:</strong> Item Demo
          </p>
        </li>

        {shuffledIndexes.map((index) => (
          <li
            key={index}
            style={{
              backgroundColor: backgroundColors[index],
              borderLeft: `5px solid ${borderColors[index]}`,
            }}
            className="exportEventItem"
          >
            <p>
              <strong>Tiêu đề:</strong> {events[index].title}
            </p>
            <p>
              <strong>Ngày tháng:</strong>
              {events[index].start.toLocaleDateString()}
            </p>
            <p>
              <strong>Giờ bắt đầu:</strong>
              {events[index].start.toLocaleTimeString()}
            </p>
            <p>
              <strong>Giờ kết thúc:</strong>
              {events[index].end.toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
