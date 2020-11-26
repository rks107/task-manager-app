
export default function getDateAndDayInFormate(day) {
  let dd = day.getDate();
  let mm = day.getMonth() + 1;
  let yyyy = day.getFullYear();
  let date = mm + "/" + dd + "/" + yyyy;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


 const temp = {
    day,
    date,
    dayName: getDay(day),
    month: monthNames[day.getMonth()],
 };

  return temp;
}


function getDay(day) {
     const count = day.getDay();
  
  if(count === 0){
    return "Sunday";
  } else if(count === 1){
    return "Monday";
  } else if(count === 2){
      return "Tuesday"
  } else if(count === 3){
      return "Wednesday"
  } else if(count === 4){
      return "Thursday"
  } else if(count === 5){
      return "Friday"
  } else if(count === 6){
      return "Saturday"
  }
}