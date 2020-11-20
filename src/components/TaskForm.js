import React, { useState } from "react";
import firebase from "../firebase";

const TaskForm = ({ value, tasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participant, setParticipant] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("Please Assign some title or description to Task...");
    } else {
      const task = {
        title: title,
        description: description,
        date: value.format("MM/DD/YYYY"),
        color: randomColor,
        participant: participant,
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
    }
  }
  
  function closeNav(e) {
    document.getElementById("myNav").style.height = "0%";
  }

  return (
    <div id='myNav' className='overlay'>
      <p className='closebtn' onClick={(e) => closeNav(e)}>
        &times;{" "}
      </p>
      <p className='heading'>About Event</p>
      <form className='overlay-content'>
        <input
          type='text'
          placeholder='Title'
          onChange={(e) => handleInput(e)}
          value={title}
        />
        <textarea
          type='text'
          placeholder='Description...'
          onChange={(e) => handleTextarea(e)}
          value={description}
        />
        <input
          type='text'
          placeholder='Participant'
          onChange={(e) => handleParticipantName(e)}
          value={participant}
        />
        <input
          className='date'
          placeholder='Select task initial date'
          value={value.format("MM/DD/YYYY")}
        />
        <button
          className='btn btn__submit'
          onClick={(e) => handleSubmit(e)}
          type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;