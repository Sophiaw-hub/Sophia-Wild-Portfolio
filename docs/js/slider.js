export function initSlider() {
  document.querySelectorAll(".slider").forEach((slider) => {
    const track = slider.querySelector(".slider-container");
    const prev = slider.querySelector(".slider-btn-prev");
    const next = slider.querySelector(".slider-btn-next");

    const getStep = () => {
      const card = track.querySelector(".slider-card");
      if (!card) return 300;
      const cardW = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
      return cardW + gap;
    };

    const updateButtons = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };

    prev.addEventListener("click", () => track.scrollBy({ left: -getStep(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: getStep(), behavior: "smooth" }));

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    // Tastatur: Pfeiltasten wie “Carousel”
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });

    updateButtons();
  });
}