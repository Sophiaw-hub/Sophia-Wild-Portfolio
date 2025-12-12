export function aeHoverAnimation() {
  const containers = document.querySelectorAll(".ae-animation");

  containers.forEach((container) => {
    const path = container.dataset.src; // JSON-URL aus dem HTML lesen

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
      animation.setDirection(-1);
      animation.play();
    });
  });
}
