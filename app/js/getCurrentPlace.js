import fetchWeather from "./fetchWeather.js";
import getCurrentWeather from "./getCurrentWeather.js";

const API_KEY = "73202ffe9aac7743384f7d0efe072656"; 

export async function getCurrentPlaceByName(name) {
  try {
    const res = await fetchWeather(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`
    );

    if (!res || res.length === 0) {
      throw new Error(`City ${name} not found`);
    }

    await getCurrentWeather(
      res[0].lat,
      res[0].lon,
      `${res[0].name}, ${res[0].country}`
    );
    return true;
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return false;
  }
}

export async function getCurrentPlaceByGeo(lat, lon) {
  try {
    const res = await fetchWeather(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
    );

    if (!res || res.length === 0) {
      throw new Error("Location not found");
    }

    await getCurrentWeather(
      res[0].lat,
      res[0].lon,
      `${res[0].name}, ${res[0].country}`
    );
  } catch (error) {
    console.error(error.message);
    alert("Failed to fetch location data. Please try again.");
  }
}
