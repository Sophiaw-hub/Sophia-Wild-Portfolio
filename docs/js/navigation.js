const hamburgerIcon = document.querySelector(".burger-menue");
const hamburgerNav = document.querySelector(".nav-overlay");
const menuLinks = hamburgerNav ? hamburgerNav.querySelectorAll("a") : [];

// ------------ INIT ------------
export function initNavigation() {
  updateOverlayPosition();

  menuLinks.forEach((link) => {
    link.tabIndex = -1;
  });

  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", () => {
      const isOpen = hamburgerNav.classList.contains("isOpen");
       if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  // ESC schließt das Menü
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburgerNav.classList.contains("isOpen")) {
      closeMenu(true); 
    }
  });
  
   menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(true);
    });
  });

  window.addEventListener("load", updateOverlayPosition);
  window.addEventListener("resize", updateOverlayPosition);
  window.addEventListener("scroll", updateOverlayPosition);
}

// ---------------- MENÜ LOGIK ----------------
function openMenu() {
  hamburgerIcon.classList.add("checked");
  hamburgerNav.classList.add("isOpen");

  hamburgerIcon.setAttribute("aria-expanded", "true");
  hamburgerNav.setAttribute("aria-hidden", "false");
  hamburgerNav.removeAttribute("inert");

  menuLinks.forEach((link) => {
    link.tabIndex = 0; // wieder normal fokussierbar
  });
}

function closeMenu(focusBurger = false) {
  hamburgerIcon.classList.remove("checked");
  hamburgerNav.classList.remove("isOpen");

  hamburgerIcon.setAttribute("aria-expanded", "false");
  hamburgerNav.setAttribute("aria-hidden", "true");
  hamburgerNav.setAttribute("inert", "");

  menuLinks.forEach((link) => {
    link.tabIndex = -1; // nicht mehr fokussierbar
  });

  if (focusBurger) {
    hamburgerIcon.focus();
  }
}

// ---------------- HEADERHÖHE ---------------
function updateOverlayPosition() {
  const header = document.querySelector("header");

  const rect = header.getBoundingClientRect();
  const headerBottom = rect.bottom;

  hamburgerNav.style.top = headerBottom + "px";
  hamburgerNav.style.height = `calc(100vh - ${headerBottom}px)`;
} 

