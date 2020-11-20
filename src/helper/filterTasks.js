export default function filterTasks(tasks){
const counter = {};

tasks.forEach(function (obj) {
  var key = JSON.stringify(obj.title);
  counter[key] = (counter[key] || 0) + 1;
});

const countTask = [];

for (const title in counter) {
  const cropTitle = title.substring(1, title.length - 1);

  const temp = {
    title: cropTitle,
    count: counter[title],
    color: findColor(cropTitle),
    startDate: findStartDate(cropTitle),
    endDate: findEndDate(cropTitle),
  };

  temp["range"] = findEventDateRange(temp.startDate, temp.endDate);

  countTask.push(temp);
}
function findColor(title) {
  let obj = tasks.find((o) => o.title === title);
  if (obj) {
    const color = "#" + obj.color;
    return color;
  }
  return null;
}


function findStartDate(title) {
  let obj = tasks.find((o) => o.title === title);
  
  let sd = obj.date;
  tasks.forEach((task) => {
    if (task.title === title && task.date < sd) {
      sd = task.date;
    }
  })
  
  return sd;
}

function findEndDate(title) {
  let obj = tasks.find((o) => o.title === title);

  let ed = obj.date;
  tasks.forEach((task) => {
    if (task.title === title && task.date > ed) {
      ed = task.date;
    }
  });

  return ed;
}

function findEventDateRange(startDay, endDay) {
  var d = Date.parse(startDay);
  var d2 = Date.parse(endDay);
  var minutes = 1000 * 60;
  var hours = minutes * 60;
  var days = hours * 24;
  var y = Math.round(d / days);
  var z = Math.round(d2 / days);
  
  return z-y+1;
}

return countTask;
}