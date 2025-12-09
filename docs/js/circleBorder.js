const MOBILE_COUNT = 5; // < 576px
const SM_COUNT = 10;    // >= 576px
const LG_COUNT = 20;    // >= 992px
const RADIUS = 1;
const svg = document.querySelector(".circle-row");

export function initCircleBorder() {
  if (!svg) return;

  // einmal initial zeichnen
  makeCircles();

  // bei Resize neu berechnen
  window.addEventListener("resize", makeCircles);
}

function makeCircles() {
  const width = window.innerWidth;
  const count = getCircleCount(width);

  const viewWidth = count * 2;
  const viewHeight = 1;

  svg.setAttribute("viewBox", `0 0 ${viewWidth} ${viewHeight}`);
  svg.setAttribute("preserveAspectRatio", "none");

  svg.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const cx = 2 * i + 1;
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", 0);
    circle.setAttribute("r", RADIUS);
    svg.appendChild(circle);
  }
}

function getCircleCount(width) {
  if (width >= 992) return LG_COUNT;
  if (width >= 576) return SM_COUNT;
  return MOBILE_COUNT;
}