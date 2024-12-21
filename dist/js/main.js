import { getCurrentPlaceByName } from "./getCurrentPlace.js";
import initializePage from "./initializePage.js";
import { showHistory, clearHistory } from "./history.js";

initializePage();
showHistory();

function handleResize() {
  if (window.innerWidth <= 600) {
    const searchInput = document.querySelector(".header__left .search-input");
    const actionsContainer = document.querySelector(".history .actions");
    const desktopButton = document.querySelector(
      ".header__left .desktop-button"
    );

    if (searchInput && actionsContainer) {
      actionsContainer.prepend(searchInput);
    }
    if (desktopButton) {
      desktopButton.remove();
    }
  }
}
handleResize();
window.addEventListener("resize", handleResize);

const searchInput = document.querySelector(".search-input input");
if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      getCurrentPlaceByName(e.target.value);
      e.target.value = "";
    }
  });
}

const closeHistoryButton = document.querySelector(".history button");
if (closeHistoryButton) {
  closeHistoryButton.addEventListener("click", () => {
    document.querySelector(".history").classList.remove("show");
  });
}

const openHistoryButton = document.querySelector(".header__left button");
if (openHistoryButton) {
  openHistoryButton.addEventListener("click", () => {
    document.querySelector(".history").classList.add("show");
  });
}

const clearHistoryButton = document.querySelector(".history__clear");
if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", () => {
    clearHistory();
  });
}
