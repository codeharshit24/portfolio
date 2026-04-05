const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const year = document.querySelector("#year");
const brandButton = document.querySelector(".brand");
const popup = document.querySelector("#welcome-popup");
const popupClose = document.querySelector(".popup-close");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (brandButton && popup && popupClose) {
  brandButton.addEventListener("click", () => {
    popup.hidden = false;
  });

  popupClose.addEventListener("click", () => {
    popup.hidden = true;
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popup.hidden = true;
    }
  });
}
