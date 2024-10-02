import React, { useState } from 'react';

const TaskList = ({ events }) => {
  const [shuffledIndexes, setShuffledIndexes] = useState([]);

  const getRandomColor = (index) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const shuffleIndexes = () => {
    const indexes = Array.from(Array(events.length).keys());
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    setShuffledIndexes(indexes);
  };

  React.useEffect(() => {
    shuffleIndexes();
  }, [events]);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {shuffledIndexes.map((index) => (
          <li key={index} style={{ backgroundColor: getRandomColor(index), borderLeft: `5px solid ${getRandomColor(index)}` }}>
            <p>
              <strong>Tiêu đề:</strong> {events[index].title}
            </p>
            <p>
              <strong>Ngày tháng:</strong> {events[index].start.toLocaleDateString()}
            </p>
            <p>
              <strong>Giờ bắt đầu:</strong> {events[index].start.toLocaleTimeString()}
            </p>
            <p>
              <strong>Giờ kết thúc:</strong> {events[index].end.toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;