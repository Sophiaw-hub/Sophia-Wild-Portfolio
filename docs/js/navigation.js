const hamburgerIcon = document.querySelector(".burger-menue");
const hamburgerNav = document.querySelector(".nav-overlay");
const menuLinks = hamburgerNav ? hamburgerNav.querySelectorAll("a") : [];
const DESKTOP_BREAKPOINT = 992;

// ------------ INIT ------------
export function initNavigation() {
  if (!hamburgerNav) return; // Sicherheits-Guard

  // Initial Setup
  updateOverlayPosition();
  updateNav();

  // Standard: Links im Mobile erstmal nicht fokussierbar
  if (!isDesktop()) {
    menuLinks.forEach((link) => {
      link.tabIndex = -1;
    });
  }

  // Burger: Menü öffnen/schließen (nur wirklich relevant auf Mobile)
  if (hamburgerIcon) {
    hamburgerIcon.addEventListener("click", () => {
      const isOpen = hamburgerNav.classList.contains("isOpen");
      if (isOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    // Anfangszustand ARIA
    hamburgerIcon.setAttribute("aria-expanded", "false");
  }

  // ESC schließt das Menü (nur sinnvoll im Mobile)
  window.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !isDesktop() &&
      hamburgerNav.classList.contains("isOpen")
    ) {
      closeMenu(true);
    }
  });

  // Klick auf Menüpunkt schließt nur im Mobile das Overlay
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!isDesktop()) {
        closeMenu(true);
      }
      // im Desktop: ganz normaler Link-Klick, kein closeMenu()
    });
  });

  // Layout-Updates
  window.addEventListener("load", () => {
    updateOverlayPosition();
    updateNav();
  });

  window.addEventListener("resize", () => {
    updateOverlayPosition();
    updateNav();
  });

  window.addEventListener("scroll", () => {
    updateOverlayPosition();
  });
}

// ---------------- HELFER ----------------
function isDesktop() {
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

// ---------------- MENÜ LOGIK ----------------
function openMenu() {
  if (!hamburgerNav || !hamburgerIcon) return;
  if (isDesktop()) return; // Im Desktop gibt es kein Overlay-Menü

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
  if (!hamburgerNav || !hamburgerIcon) return;

  hamburgerIcon.classList.remove("checked");
  hamburgerNav.classList.remove("isOpen");

  if (isDesktop()) {
    // ❗ Desktop: Navigation bleibt immer nutzbar
    hamburgerIcon.setAttribute("aria-expanded", "false");
    hamburgerNav.removeAttribute("aria-hidden");
    hamburgerNav.removeAttribute("inert");
    menuLinks.forEach((link) => {
      link.tabIndex = 0;
    });
  } else {
    // 📱 Mobile: Overlay wieder “wegschließen”
    hamburgerIcon.setAttribute("aria-expanded", "false");
    hamburgerNav.setAttribute("aria-hidden", "true");
    hamburgerNav.setAttribute("inert", "");

    menuLinks.forEach((link) => {
      link.tabIndex = -1;
    });
  }

  if (focusBurger) {
    hamburgerIcon.focus();
  }
}

// ---------------- NAV-MODUS (MOBILE / DESKTOP) ---------------
function updateNav() {
  if (!hamburgerNav) return;

  if (isDesktop()) {
    // 🖥️ DESKTOP: Normale Navigation
    hamburgerNav.classList.remove("isOpen");
    hamburgerNav.removeAttribute("inert");
    hamburgerNav.removeAttribute("aria-hidden");

    if (hamburgerIcon) {
      hamburgerIcon.setAttribute("aria-expanded", "false");
    }

    menuLinks.forEach((link) => {
      link.tabIndex = 0;
    });
  } else {
    // 📱 MOBILE: Standardzustand = Menü zu
    hamburgerNav.classList.remove("isOpen");
    hamburgerNav.setAttribute("inert", "");
    hamburgerNav.setAttribute("aria-hidden", "true");

    if (hamburgerIcon) {
      hamburgerIcon.setAttribute("aria-expanded", "false");
    }

    menuLinks.forEach((link) => {
      link.tabIndex = -1;
    });
  }
}

// ---------------- HEADERHÖHE / OVERLAY-POSITION ---------------
function updateOverlayPosition() {
  if (!hamburgerNav) return;

  if (isDesktop()) {
    // Im Desktop keine spezielle Positionierung nötig
    hamburgerNav.style.top = "";
    hamburgerNav.style.height = "";
    return;
  }

  const header = document.querySelector("header");
  if (!header) return;

  const rect = header.getBoundingClientRect();
  const headerBottom = rect.bottom;

  hamburgerNav.style.top = headerBottom + "px";
  hamburgerNav.style.height = `calc(100vh - ${headerBottom}px)`;
}
