export function getCurrentTime(timestamp, timezoneOffsetInSeconds) {
  const localTimeInMs = (timestamp + timezoneOffsetInSeconds) * 1000;

  const localDate = new Date(localTimeInMs);

  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export function getFormattedDate(
  timestamp,
  timezoneOffsetInSeconds = 0,
  isFull = true
) {
  const localTimeInMs = (timestamp + timezoneOffsetInSeconds) * 1000;

  const date = new Date(localTimeInMs);

  if (!isFull) {
    return `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  const dayOfWeek = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const suffix = (n) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayOfWeek} ${dayOfMonth}${suffix(dayOfMonth)} ${month}, ${year}`;
}

export function getDay(timestamp, timezoneOffsetInSeconds = 0) {
  const localTimeInMs = (timestamp + timezoneOffsetInSeconds) * 1000;

  const date = new Date(localTimeInMs);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getUTCDay()];
}
