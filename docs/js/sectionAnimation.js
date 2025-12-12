export function sectionAnimation() {

  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );
    sections.forEach((section) => {
      observer.observe(section);
    });
  });
}
