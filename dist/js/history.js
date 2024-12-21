export function updateHistory(city) {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  const indexOfCity = history.findIndex((elem) => elem.name === city.name);
  if (indexOfCity !== -1) {
    history.splice(indexOfCity, 1);
  }

  history.push(city);

  localStorage.setItem("history", JSON.stringify(history));

  showHistory();
}

export function getLastFind() {
  return (JSON.parse(localStorage.getItem("history")) || []).at(-1);
}

export function clearHistory() {
  localStorage.removeItem("history");

  showHistory();
}

export function showHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const list = document.querySelector(".history__list");

  list.textContent = "";

  if (history.length === 0) {
    list.textContent = "History is empty";
  }

  history.reverse().forEach((elem) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class="history__list-item">
    <div class="history__list-left">
      <p class="history__list-name">${elem.name}</p>
      <div>
        <p class="history__list-temperature">${elem.temperature}°С</p>
        <p class="history__list-type">${elem.type}</p>
      </div>
    </div>
    <div class="history__list-right">
      <p class="history__list-time">${elem.time}</p>
      <img src=${elem.icon} width="25" alt="" />
    </div>
  </li>`
    );
  });
}
