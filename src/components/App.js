import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, TaskForm, Task, DateByTasks } from "./";
import firebase from "../firebase";


function App() {

  const [selectedDate, setSelectedDate] = useState(moment());
  const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
      
      var db = firebase.firestore();
      db.collection("tasks").orderBy("date").onSnapshot((snapshot) => {
        const tasks = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        setTasks(tasks);
      });
        
    }, []);

    function handleDeleteTask(id) {
      
      const db = firebase.firestore();
      db.collection("tasks")
        .doc(id)
        .delete()
        .then(function () {
          // console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }

  return (
    <div className='App'>
      <div className='container'>
        <div className='container__calendar'>
          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            tasks={tasks}
          />

          <TaskForm value={selectedDate} tasks={tasks} />
        </div>
        <div className='container__DateByTasks'>
          <p className='heading'>Available Tasks Categories by Dates</p>
          <DateByTasks tasks={tasks} />
        </div>
      </div>

      <div className='availabeTask'>
        <h3 className='heading'>Available Tasks</h3>
        {tasks.length === 0 ? (
          <p>0 Tasks Available</p>
        ) : (
          tasks.map((task, index) => (
            <Task task={task} key={index} handleDeleteTask={handleDeleteTask} />
          ))
        )}
      </div>
    </div>
  );
}


export default App;