import {
  getCurrentPlaceByName,
  getCurrentPlaceByGeo,
} from "./getCurrentPlace.js";
import { getLastFind } from "./history.js";

function waitInitialInput() {
  return new Promise((resolve) => {
    const inputElement = document.querySelector(".overflow input");

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        inputElement.removeEventListener("keydown", handleKeyDown);
        resolve(e.target.value);
        e.target.value = "";
      }
    };

    inputElement.addEventListener("keydown", handleKeyDown);
  });
}

async function handleGeolocationError() {
  const inputContainer = document.querySelector(".overflow__input");
  inputContainer.classList.add("show");

  let isCompleted = false;

  while (!isCompleted) {
    try {
      const input = await waitInitialInput();
      isCompleted = await getCurrentPlaceByName(input);
      if (!isCompleted) {
        console.warn("Invalid location, please try again.");
      }
    } catch (error) {
      console.error("Error during manual location input:", error);
    }
  }
}

async function requestGeolocationPermission() {
  try {
    const { state } = await navigator.permissions.query({
      name: "geolocation",
    });
    return state;
  } catch (error) {
    console.error("Failed to query geolocation permissions:", error);
    return null;
  }
}

async function fetchUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default async function initializePage() {
  if (!("permissions" in navigator) || !("geolocation" in navigator)) {
    console.error("Geolocation is not available in this browser.");
    return;
  }

  try {
    const geolocationState = await requestGeolocationPermission();
    const lastFind = getLastFind();

    if (lastFind) {
      await getCurrentPlaceByName(lastFind.name);
      return;
    }

    if (geolocationState === "denied") {
      await handleGeolocationError();
      return;
    }

    const position = await fetchUserLocation();
    await getCurrentPlaceByGeo(
      position.coords.latitude,
      position.coords.longitude
    );
  } catch (error) {
    console.error("Geolocation error:", error);
    await handleGeolocationError();
  } finally {
    setTimeout(() => {
      document.querySelector(".wrapper").classList.add("show");
      document.querySelector(".overflow").classList.add("hidden");
    }, 1000);
  }
}
