import fetchWeather from "./fetchWeather.js";
import fetchWeatherForecast from "./fetchWeatherForecast.js";
import { getCurrentTime, getFormattedDate } from "./date.js";
import { updateHistory } from "./history.js";

const API_KEY = "73202ffe9aac7743384f7d0efe072656";
export default async function getCurrentWeather(lat, lon, name) {
  try {
    const res = await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!res || !res.main || !res.weather) {
      throw new Error("Failed to fetch weather data.");
    }

    const temperature = Math.round(res.main.temp - 273.15);
    const weatherType =
      res.weather[0].description.charAt(0).toUpperCase() +
      res.weather[0].description.slice(1);
    const image = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    const wind = res.wind.speed;
    const humidity = res.main.humidity;
    const currentTime = getCurrentTime(res.dt, res.timezone);

    await fetchWeatherForecast(lat, lon, res.timezone);

    updateCurrentWeatherDOM({
      name,
      date: getFormattedDate(res.dt, res.timezone),
      temperature,
      weatherType,
      image,
      wind,
      humidity,
      currentTime,
    });

    const historyItem = {
      name,
      time: currentTime,
      temperature: temperature > 0 ? `+${temperature}` : `${temperature}`,
      icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`,
      type: weatherType,
    };

    updateHistory(historyItem);
  } catch (error) {
    console.error(error.message);
    alert("Failed to fetch current weather data. Please try again.");
  }
}

function updateCurrentWeatherDOM({
  name,
  date,
  temperature,
  weatherType,
  image,
  wind,
  humidity,
  currentTime,
}) {
  document.querySelector(".top__location-name").textContent = name;
  document.querySelector(".header__date").textContent = date;
  document.querySelector(".top__temperature span").textContent =
    temperature > 0 ? `+${temperature}` : `${temperature}`;
  document.querySelector(".top__weather-type").textContent = weatherType;
  document.querySelector(".top__image").src = image;
  document.querySelector(".top__indicators_temperature").textContent =
    temperature > 0 ? `+${temperature}` : `${temperature}`;
  document.querySelector(".top__indicators_wind").textContent = wind;
  document.querySelector(".top__indicators_humidity").textContent = humidity;
  document.querySelector(".top__time").textContent = currentTime;
}
