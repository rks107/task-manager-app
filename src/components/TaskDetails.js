import React from 'react';

const TaskDetails = ({event, tasks, value}) => {

    console.log(event);
    function closeNav(e) {
      document.getElementById("eventDetails").style.height = "0%";
    }

    return (
      <div id='eventDetails' className='overlay'>
        <p className='closebtn' onClick={(e) => closeNav(e)}>
          &times;{" "}
        </p>
        <p className='heading'> Event Details</p>
        {event ? (
          <div className='details' style={{ backgroundColor: event.color }}>
            <p>{event.title}</p>
            <p>
              {value.format("MMMM").substring(0, 3)}{" "}
              {event.startDate.substring(3, 5)} -{" "}
              {value.format("MMMM").substring(0, 3)}{" "}
              {event.endDate.substring(3, 5)}
            </p>
          </div>
        ) : null}
      </div>
    );
};

export default TaskDetails;