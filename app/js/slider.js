function createSlider(element) {
  element.style.left = 0;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let currentDay = 1;

  const points = [...document.querySelectorAll(`[data-order]`)].reverse();
  const prevButton = document.querySelector(".hourly__scroll-prev");
  const nextButton = document.querySelector(".hourly__scroll-next");

  const SLIDER_MARGIN = 20;
  const SCROLL_SPEED = 0.5;
  const ANIMATION_DURATION = 500;

  function checkButtons() {
    prevButton.classList.toggle("inactive", currentDay <= 1);
    nextButton.classList.toggle("inactive", currentDay >= points.length);
  }

  function scrollSlider(idx) {
    const targetPoint = document.querySelector(`[data-order='${idx}']`);
    if (!targetPoint) return;

    const rect = targetPoint.getBoundingClientRect();
    const targetDistance = rect.left;

    const startPosition = parseInt(element.style.left) || 0;
    let startTime = null;

    function animateScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - startTime) / ANIMATION_DURATION,
        1
      );

      element.style.left = `${startPosition - targetDistance * progress}px`;

      if (progress < 1) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
  }

  prevButton.addEventListener("click", () => {
    if (currentDay > 1) {
      currentDay--;
      scrollSlider(currentDay);
      checkButtons();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentDay < points.length) {
      currentDay++;
      scrollSlider(currentDay);
      checkButtons();
    }
  });

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = parseInt(element.style.left) || 0;
  });

  element.addEventListener("mouseleave", () => (isDragging = false));
  element.addEventListener("mouseup", () => (isDragging = false));

  element.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * SCROLL_SPEED;
    if (
      walk < 0 &&
      walk + scrollLeft <
        document.body.clientWidth -
          element.parentElement.clientWidth -
          SLIDER_MARGIN
    )
      return;
    if (walk > 0 && walk + scrollLeft > SLIDER_MARGIN) return;
    element.style.left = walk + scrollLeft + "px";

    points.forEach((point) => {
      const rect = point.getBoundingClientRect();
      if (rect.left > 0 && rect.left < window.innerWidth / 2) {
        currentDay = Number(point.getAttribute("data-order"));
      }
    });

    checkButtons();
  });

  checkButtons();
}

export default createSlider;
