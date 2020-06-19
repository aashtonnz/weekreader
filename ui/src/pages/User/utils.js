const HOURS_IN_DAY = 24;
const DAYS = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

export const displayHour = (hour) => {
  if (hour === 0) {
    return "12 am";
  }
  if (hour === 12) {
    return "12 pm";
  }
  const period = hour < 12 ? "am" : "pm";
  return `${hour % 12} ${period}`;
};

export const hoursArray = Array(HOURS_IN_DAY)
  .fill(0)
  .map((_, index) => displayHour(index));

export const daysArray = DAYS;
