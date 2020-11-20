import React from 'react';
import buildCalendar from '../helper/buildCalendar';
import filterTasks from "../helper/filterTasks";

const Task = ({ value, tasks }) => {

    const calender = buildCalendar(value);
    const events = filterTasks(tasks);
    
    function findStartDay(startDay){
      const monthStart = value.clone().startOf("month").format("MM/DD/YYYY");
      var d = Date.parse(startDay);
      var d2 = Date.parse(monthStart);
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var y = Math.round(d / days);
      var z = Math.round(d2 / days);
      // console.log(y-z);
      return y-z;
    }

  return (
    <div>
      <div className='months'>
        {calender.map((week, wi) => (
          <div className='weeks' key={wi}>
            {week.map((day, di) => (
              <div className='days' key={di}>
                {day.format("D").toString()}
              </div>
            ))}
          </div>
        ))}
        {events.map((event, ei) => (
          <div
            
            className='event'
            style={{
              top: ei * 80,
              minWidth: 110 * event.range + 100,
              left: findStartDay(event.startDate) * 90 - 5960,
            }}>
            <div
              className='event__colorCode'
              style={{ backgroundColor: event.color }}></div>
            <div className='event__detail'>
              <span className='event__detail_title'>{event.title}</span>
              <br />
              <span>
                {value.format("MMMM").substring(0, 3)}{" "}
                {event.startDate.substring(3, 5)} -{" "}
                {value.format("MMMM").substring(0, 3)}{" "}
                {event.endDate.substring(3, 5)}
              </span>
            </div>
            <div>
              <img
                src='https://lh3.googleusercontent.com/ogw/ADGmqu-MDYaezdVbDkNNg76rZUx8ld3U7ErQMw7C8ORxgA=s32-c-mo'
                alt='profile-image'
                style={{ borderRadius: 50, height: 50, marginRight: 10 }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div className='task' style={{ backgroundColor: color }}>
        <p className='task__name'>{task.title}</p>
        <p className='task__name'>{task.description}</p>
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
      </div> */}
    </div>
  );
};

export default Task;