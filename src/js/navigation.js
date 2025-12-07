const hamburgerIcon = document.querySelector(".burger-menue");
const hamburgerNav = document.querySelector(".nav-overlay");
const menuLinks = hamburgerNav ? hamburgerNav.querySelectorAll("a") : [];

// ------------ INIT ------------
export function initNavigation() {
  updateHeaderHeight();

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

  window.addEventListener("load", updateHeaderHeight);
  window.addEventListener("resize", updateHeaderHeight);
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
function updateHeaderHeight() {
  const header = document.querySelector("header");
  const height = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", height + "px");
} 

