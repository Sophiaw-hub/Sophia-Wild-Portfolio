export function aeHoverAnimation() {
  const containers = document.querySelectorAll(".ae-animation");

  containers.forEach((container) => {
    const path = container.dataset.src;
    const mode = container.dataset.mode || "normal";

    const animation = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: path,
    });

    container.addEventListener("mouseenter", () => {
      animation.setDirection(1);
      animation.play();
    });

    container.addEventListener("mouseleave", () => {
      if (mode != "hold-end") {
        animation.setDirection(-1);
        animation.play();
      } else {
        animation.stop();
        animation.goToAndStop(0, true);
      }
    });
  });
}
