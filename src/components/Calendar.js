import React, { useState, useEffect } from "react";
import moment from "moment";
import {Header} from "./";
import dayStyles from '../helper/dayStyles'
import buildCalendar from "../helper/buildCalendar";

function App({ value, onChange, tasks }) {
  
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);


  function findColor(day){
    let obj = tasks.find(
      (o) =>
        Date.parse(o.startDate.date) <= Date.parse(day.format("MM/DD/YYYY")) &&
        Date.parse(o.endDate.date) >= Date.parse(day.format("MM/DD/YYYY"))
    );

      if(obj){
        // console.log("obj", day.format("MM/DD/YYYY"), obj.color);
        const color = "#" + obj.color;
        return color;
      }
      return null;
  }

  return (
    <div className='calendar'>
      <Header value={value} onChange={onChange} />

      <div className='body'>
        <div className='day-names'>
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
            <div className='week'>{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => (
              <div
                key={di}
                className='day'
                onClick={() => {
                  // if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);
                }}>
                <div style={{backgroundColor:findColor(day)}} className={dayStyles(day, value)}>
                  {day.format("D").toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
