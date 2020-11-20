function isSelected(day, value) {
  return value.isSame(day, "day");
}

export function beforeAndAfterCurrentMonth(day, value) {
  
  return (
    day.isBefore(value.clone().startOf("month"), "day") ||
    day.isAfter(value.clone().endOf("month"), "day")
  );
}

function isToday(day) {
  return day.isSame(new Date(), "day");
}

export default function dayStyles(day, value) {
  if (beforeAndAfterCurrentMonth(day, value)) return "before";
  if (isSelected(day, value)) return "selected";
  if (isToday(day)) return "today";
  return "";
}
