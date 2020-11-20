import React, { useState } from 'react';
import filterTasks from '../helper/filterTasks'
import { TaskDetails } from "./";

const DateByTasks = ({ tasks, value, handleDeleteTask }) => {
  const countTask = filterTasks(tasks);
  const [event, setEvent] = useState();

  function openNav(e, item) {
    document.getElementById("eventDetails").style.height = "100%";
    setEvent(item);
  }

  return (
    <div>
      <TaskDetails
        event={event}
        tasks={tasks}
        value={value}
        handleDeleteTask={handleDeleteTask}
      />

      {countTask.map((item) => (
        <div onClick={(e) => openNav(e, item)} className='counter'>
          <div
            className='colorCode'
            style={{ backgroundColor: item.color }}></div>
          <div className='counter__details'>
            <span className='title'> {item.title}</span> <br />
            <span className='count'> {item.count} Tasks</span>
          </div>
          <div className='counter__info'>...</div>
        </div>
      ))}
    </div>
  );
};

export default DateByTasks;