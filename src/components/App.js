import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, TaskForm, Task, DateByTasks, Navbar } from "./";
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
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }

  function openNav(e) {
    document.getElementById("myNav").style.height = "100%";
  }
    return (
      <div className='App'>
        <TaskForm value={selectedDate} tasks={tasks} />

        <Navbar />

        <div className='container'>
          <div className='container__calendar'>
            <button onClick={(e) => openNav(e)} className='btn'>
              Create +
            </button>

            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tasks={tasks}
            />

            <div className='container__projects'>
              <DateByTasks tasks={tasks} value={selectedDate} />
            </div>
          </div>

          <div className='availabeTask'>
            <Task
              tasks={tasks}
              value={selectedDate}
              handleDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    );
}


export default App;