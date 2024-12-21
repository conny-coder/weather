import fetchWeather from "./fetchWeather.js";
import { getCurrentTime, getFormattedDate, getDay } from "./date.js";
import createSlider from "./slider.js";

const KELVIN_TO_CELSIUS = 273.15;
const API_KEY = "73202ffe9aac7743384f7d0efe072656";

export default async function fetchWeatherForecast(lat, lon, timezone) {
  const hourlyList = document.querySelector(".hourly__list");

  const res = await fetchWeather(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  hourlyList.textContent = "";
  let prevDay = null;
  let currDay = null;
  let dayCounter = 1;

  res.list.forEach((item) => {
    const temperature = Math.round(item.main.temp - KELVIN_TO_CELSIUS);

    prevDay = currDay;
    currDay = getDay(item.dt, timezone);

    hourlyList.insertAdjacentHTML(
      "beforeend",
      generateWeatherItemHTML(
        item,
        currDay,
        currDay !== prevDay ? dayCounter++ : "",
        temperature,
        timezone
      )
    );
  });

  createSlider(hourlyList);
}

function generateWeatherItemHTML(
  item,
  currDay,
  dayOrder,
  temperature,
  timezone
) {
  return `
    <li ${dayOrder ? `data-order=${dayOrder}` : ""} class="hourly__item">
      <p class="hourly__item-day">${currDay}</p>
      <p class="hourly__item-date">${getFormattedDate(
        item.dt,
        timezone,
        false
      )}</p>
      <p class="hourly__item-time">${getCurrentTime(item.dt, timezone)}</p>
      <img
        class="hourly__item-img bright"
        src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
        width="100"
        draggable="false"
        alt="${item.weather[0].description}"
      />
      <p class="hourly__item-temperature">${
        temperature > 0 ? `+${temperature}` : `${temperature}`
      }°C</p>
      <p class="hourly__item-type">${item.weather[0].main}</p>
    </li>`;
}
