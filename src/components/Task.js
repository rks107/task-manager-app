import React from 'react';

const Task = ({ task, handleDeleteTask }) => {
   
    function handleDeleteTaskClick(){
        console.log(task.id);
        handleDeleteTask(task.id);
    }

    const color = '#' + task.color;
  return (
    <div>
      <div className='task' style={{ backgroundColor: color }}>
        <p className='task__name'>{task.name}</p>
        <p>
          <span className='task__date'>{task.date.toString()}</span>
          <span className='task__deleteIcon'>
            <img
              alt='Delete'
              className='action-icons'
              src='https://www.flaticon.com/svg/static/icons/svg/3096/3096750.svg'
              onClick={() => handleDeleteTaskClick()}
            />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Task;