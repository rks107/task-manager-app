import React from 'react';
import buildCalendar from '../helper/buildCalendar';

const Task = ({ value, tasks }) => {

    const calender = buildCalendar(value);
    
    function findStartDay(startDay){
      const monthStart = value.clone().startOf("month").format("MM/DD/YYYY");
      var d = Date.parse(startDay);
      var d2 = Date.parse(monthStart);
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var y = Math.round(d / days);
      var z = Math.round(d2 / days);
      console.log(y-z);
      return y-z;
    }

    const range = (event) => {
      const startDay = event.startDate.date;
      const endDay = event.endDate.date;
      var d = Date.parse(startDay);
      var d2 = Date.parse(endDay);
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var y = Math.round(d / days);
      var z = Math.round(d2 / days);

      return z - y + 1;
    };

    const color = (color) => {
      return ("#"+color);
    };

  return (
    <div>
      <div className='months' style={{ position: "fixed", right: 0 }}>
        {calender.map((week, wi) => (
          <div className='weeks' key={wi}>
            {week.map((day, di) => (
              <div className='days' key={di}>
                {day.format("D").toString()}
              </div>
            ))}
          </div>
        ))}
        {tasks.map((event, ei) => (
          <div
            className='event'
            style={{
              position: "relative",
              top: ei * 80,
              minWidth: 110 * range(event) + 100,
              right: 5900 - findStartDay(event.startDate.date) * 72,
              // left: 500 + findStartDay(event.startDate.date) * 150,
              //  -
              // (200 * range(event) + 100),
              // findStartDay(event.startDate.date) * 2000 +
              // findStartDay(event.startDate.date)*100,
              // right: findStartDay(event.startDate.date) * 90 + 900,
            }}>
            <div
              className='event__colorCode'
              style={{ backgroundColor: color(event.color) }}></div>
            <div className='event__detail'>
              <span
                className='event__detail_title'
                style={{
                  backgroundColor: color(event.color),
                  padding: "2px 5px",
                  borderRadius: 4,
                  color: "white",
                }}>
                {event.title}
              </span>
              <br />
              <span>
                {event.startDate.month.substring(0, 3)}{" "}
                {parseInt(event.startDate.date.substring(3, 5)) < 10
                  ? event.startDate.date.substring(3, 4)
                  : event.startDate.date.substring(3, 5)}{" "}
                - {event.endDate.month.substring(0, 3)}{" "}
                {parseInt(event.endDate.date.substring(3, 5)) < 10
                  ? event.endDate.date.substring(3, 4)
                  : event.endDate.date.substring(3, 5)}
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              {event.participants.map((participant) => (
                <span>{participant}, &nbsp;</span>
              ))}
              {/* <img
                src='https://lh3.googleusercontent.com/ogw/ADGmqu-MDYaezdVbDkNNg76rZUx8ld3U7ErQMw7C8ORxgA=s32-c-mo'
                alt='profile-image'
                style={{ borderRadius: 50, height: 50, marginRight: 10 }}
              /> */}
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