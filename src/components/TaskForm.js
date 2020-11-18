import React, { useState } from "react";
import firebase from "../firebase";

const TaskForm = ({ value, tasks }) => {
  const [taskName, setTaskName] = useState("");

  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  function handleInput(e) {
    setTaskName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (taskName === "") {
      alert("Please Assign some name to Task...");
    } else {
      const task = {
        name: taskName,
        date: value.format("MM/DD/YYYY"),
        color: randomColor,
      };

      let obj = tasks.find((o) => o.date === value.format("MM/DD/YYYY"));
      if(obj){
        task.color = obj.color;
      }
      

      var db = firebase.firestore();
      db.collection("tasks")
        .add(task)
        .then((docRef) => {
          // console.log("Product Added: ", docRef);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

      setTaskName("");
    }
  }

  return (
    <div>
      <form>
        <textarea
          type='text'
          placeholder='Task name'
          onChange={(e) => handleInput(e)}
          value={taskName}
        />
        <input
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