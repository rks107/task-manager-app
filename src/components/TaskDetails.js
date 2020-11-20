import React from 'react';

const TaskDetails = ({ event, tasks, value, handleDeleteTask }) => {
  
    function handleDeleteTaskClick(eventDes) {
      
        handleDeleteTask(eventDes.id);
    }

    const eventDescriptionWithSameTitle = function(tasks,event){

        var arr = [];

        tasks.forEach((task) => {
            if(task.title === event.title){
                const temp = {
                  description: task.description,
                  id: task.id,
                  participant: task.participant,
                };
                arr.push(temp)
            }
        });
        
    return arr;
    };
    

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
          <div>
            <p className="eventTitle">{event.title}</p>
            <p>
              ( {value.format("MMMM").substring(0, 3)}{" "}
              {event.startDate.substring(3, 5)} -{" "}
              {value.format("MMMM").substring(0, 3)}{" "}
              {event.endDate.substring(3, 5)} )
            </p>
          </div>
          <div>
            <div className='description__participant'>
              <p> Event Description</p>
              <p>Participant</p>
            </div>
            {eventDescriptionWithSameTitle(tasks, event).map((eventDes, di) => (
              <div className='description' key={di}>
                <spn>{di + 1}.</spn> &nbsp;
                <div className='description___text'>
                  <span>{eventDes.description}</span>
                  <span>{eventDes.participant}</span>
                  <span>
                    <img
                      alt='Delete'
                      className='action-icons'
                      src='https://www.flaticon.com/svg/static/icons/svg/3096/3096750.svg'
                      onClick={() => handleDeleteTaskClick(eventDes)}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskDetails;