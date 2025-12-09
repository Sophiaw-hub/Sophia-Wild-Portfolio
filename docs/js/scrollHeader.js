export function initScrollHeader() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10 && window.innerWidth<576) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}