import React, { useState } from "react";
import firebase from "../firebase";
import Calendar from "react-calendar";
import getDateAndDayInFormate from "../helper/getDateAndDayInFormate";

const TaskForm = ({ value, tasks }) => {
  const [date, setDate] = useState(new Date());

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participant, setParticipant] = useState("");
  const [taskStartDate, setTaskStartDate] = useState(getDateAndDayInFormate(date));
  const [taskEndDate, setTaskEndDate] = useState(getDateAndDayInFormate(date));
  const [showCalendarForStartDate, setShowCalendarForStartDate] = useState(false);
  const [showCalendarForEndDate, setShowCalendarForEndDate] = useState(false);
  const [addParticipant, setAddParticipant] = useState(false);
  var [participantArray, setParticipantArray] = useState([]);

  const onChange = date => {
    setDate(date);
  };

  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  function handleTextarea(e) {
    setDescription(e.target.value);
  }
  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleParticipantName(e){
    setParticipant(e.target.value);
  }
  function handleTaskStartDate(e){
    setShowCalendarForStartDate(true);
  }
  function handleTaskEndDate(e){
    setShowCalendarForEndDate(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("Please Assign some title or description to Task...");
    } else {
      const task = {
        title: title,
        description: description,
        startDate: taskStartDate,
        endDate: taskEndDate,
        color: randomColor,
        participants: participantArray,
      };

      let obj = tasks.find((o) => o.title === title);
      if (obj) {
        task.color = obj.color;
      }

      var db = firebase.firestore();
      db.collection("tasks")
        .add(task)
        .then((docRef) => {
          console.log("Product Added: ", docRef);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

      setTitle("");
      setDescription("");
      setParticipant("");
      setParticipantArray([]);
    }
  }

  const handleShowCalendarForStartDay = (day) => {

    const temp = getDateAndDayInFormate(day);
    setTaskStartDate(temp);
    setShowCalendarForStartDate(false);

  };

   const handleShowCalendarForEndDay = (day) => {

     const temp = getDateAndDayInFormate(day);
     setTaskEndDate(temp);
     setShowCalendarForEndDate(false);

   };

   function handleAddParticipant(e){
     e.preventDefault();
     setAddParticipant(true);
   }

   function handleSaveParticipant(e){
     e.preventDefault();
     if(participant === ''){
       alert("Please enter participant");
       return;
     }

     setParticipantArray((participantArray) => [
       ...participantArray,
       participant,
     ]);
     setParticipant("");
    //  setAddParticipant(false);
   }

   function handleCancelParticipant(e){
     e.preventDefault();
     setAddParticipant(false);
   }
  function participantNumber(len){
    return "Add Participant - " + len;
  }
  function closeNav(e) {
    document.getElementById("myNav").style.height = "0%";
  }

  return (
    <div id='myNav' className='overlay'>
      <p className='closebtn' onClick={(e) => closeNav(e)}>
        &times;{" "}
      </p>
      {showCalendarForStartDate ? (
        <Calendar
          onChange={onChange}
          value={date}
          onClickDay={(day) => handleShowCalendarForStartDay(day)}
        />
      ) : null}

      {showCalendarForEndDate ? (
        <Calendar
          onChange={onChange}
          value={date}
          onClickDay={(day) => handleShowCalendarForEndDay(day)}
        />
      ) : null}

      <div>
        <p className='heading'> Event Form</p>
        <form className='overlay-content'>
          <input
            type='text'
            placeholder='Add title'
            onChange={(e) => handleInput(e)}
            value={title}
          />

          <div className='tasksDate'>
            <div>
              <p>
                {taskStartDate.dayName}, {taskStartDate.month}{" "}
                {taskStartDate.day.getDate()}
              </p>
              <img
                src='https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg'
                alt='calendar-icon'
                onClick={(e) => handleTaskStartDate(e)}
                height='30'
              />
            </div>
            <div>
              <p>
                {taskEndDate.dayName}, {taskEndDate.month}{" "}
                {taskEndDate.day.getDate()}
              </p>
              <img
                src='https://www.flaticon.com/svg/static/icons/svg/3078/3078971.svg'
                alt='calendar-icon'
                onClick={(e) => handleTaskEndDate(e)}
                height='30'
              />
            </div>
          </div>

          <textarea
            type='text'
            placeholder='Add Description...'
            onChange={(e) => handleTextarea(e)}
            value={description}
          />
          <div style={{ height: 70 }}>
            {addParticipant ? (
              <div style={{ marginTop: 10 }}>
                <input
                  type='text'
                  placeholder={participantNumber(participantArray.length+1)}
                  onChange={(e) => handleParticipantName(e)}
                  value={participant}
                />
                <img
                  onClick={(e) => handleSaveParticipant(e)}
                  src='https://www.flaticon.com/premium-icon/icons/svg/3082/3082407.svg'
                  alt='Add-Participant-icon'
                  height='40'
                  style={{ cursor: "pointer", color: "white", marginLeft: 10 }}
                />
                <img
                  onClick={(e) => handleCancelParticipant(e)}
                  src='https://www.flaticon.com/premium-icon/icons/svg/1008/1008927.svg'
                  alt='Add-Participant-icon'
                  height='40'
                  style={{ cursor: "pointer", color: "white", marginLeft: 10 }}
                />
              </div>
            ) : (
              <img
                onClick={(e) => handleAddParticipant(e)}
                src='https://www.flaticon.com/svg/static/icons/svg/3658/3658947.svg'
                alt='Add-Participant-icon'
                height='50'
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <button
            className='btn btn__submit'
            onClick={(e) => handleSubmit(e)}
            type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;