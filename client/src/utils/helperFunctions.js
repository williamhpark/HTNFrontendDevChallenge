// Helper functions that are used throughout the application for different components.

// Takes a Unix Epoch and returns the corresponding month, day and year.
const epochToDate = (epochDate) => {
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
  const date = new Date(epochDate);
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

// Takes a Unix Epoch and returns the corresponding time (am/pm).
const epochToTime = (epochDate) => {
  const date = new Date(epochDate);
  let hours = date.getHours();
  let period = "am";
  if (hours > 12) {
    hours = hours - 12;
    period = "pm";
  } else if (hours === 0) {
    hours = 12;
  }
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}${period}`;
};

// Takes a string and returns the string in title case.
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

module.exports = {
  epochToDate: epochToDate,
  epochToTime: epochToTime,
  toTitleCase: toTitleCase,
};
