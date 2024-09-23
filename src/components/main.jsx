






import React, { useState, useEffect } from 'react';
import './main.css';

const Main = () => {
  const [tasks, settask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/product");
        const data = await response.json();
        if (response.ok) {
          settask(data.data);
        } else {
          console.error("Failed to fetch tasks:", data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    
  }, []);

  const handleStartClick = () => {
    setIsTaskStarted(true);
    const now = new Date();
    setStartTime(now);
    setElapsedTime(0);

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
    setIsTaskStarted(false);
    setStartTime(null);
    setElapsedTime(0);
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const handleEndTask = async () => {
    const now = new Date();
    const final = {
      _id: currentTask._id,
      title: currentTask.title,
      starttime: startTime.toLocaleTimeString(),
      endtime: now.toLocaleTimeString(),
      completed: true,
    };

    try {
      const response = await fetch("http://localhost:4000/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(final),
      });

      if (response.ok) {
        console.log("Task completed successfully");
        settask(prevTasks =>
          prevTasks.map(task =>
            task._id === currentTask._id ? { ...task, completed: true,starttime:startTime.toLocaleTimeString(), endtime: now.toLocaleTimeString() } : task
          )
        );
      }
    } catch (err) {
      console.error("Failed to update task:", err);
    }

    handleCloseModal();
  };

  if (!tasks.length) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className='main'>
      <h2>Task List</h2>
      <table className='task-table'>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Action</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>
                <button
                  onClick={() => {
                    setCurrentTask(task);
                    setIsModalOpen(true);
                  }}
                  disabled={task.completed}
                >
                  {task.completed ? "Completed" : "Start"}
                </button>
              </td>
              <td>{task.starttime}</td>
              <td>{task.endtime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Task: {currentTask?.title}</h3>
            <p>Task Timer: {elapsedTime} seconds</p>
            <p>Start Time: {startTime ? startTime.toLocaleTimeString() : 'N/A'}</p>
            <p>End Time: {currentTask?.endtime ? currentTask.endtime : 'N/A'}</p>
            <button onClick={handleStartClick} disabled={isTaskStarted || currentTask?.completed}>
              {isTaskStarted ? "Task Started" : "Start Task"}
            </button>
            <button onClick={handleEndTask}>End Task</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
