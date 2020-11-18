import React from 'react';

const DateByTasks = ({tasks}) => {
    const counter = {};

    tasks.forEach(function (obj) {
      var key = JSON.stringify(obj.date);
      counter[key] = (counter[key] || 0) + 1;
    });
    
    const counterTask = [];

    for (const item in counter) {
        const temp = {
          date: item.substring(1, item.length-1),
          count: counter[item],
          color: findColor(item)
        };

        counterTask.push(temp);
    }

    function findColor(day) {
        const daya = day.substring(1, day.length-1);
        // console.log(daya);
      let obj = tasks.find((o) => o.date === daya);
      if (obj) {
        const color = "#" + obj.color;
        return color;
      }
      return null;
    }

     return (
       <div>
         {counterTask.map((item) => (
           <div className='counter' style={{ backgroundColor: item.color }}>
             Date: <span> {item.date}</span> &nbsp; 
             Tasks:<span> {item.count}</span>
           </div>
         ))}
       </div>
     );
    
};

export default DateByTasks;