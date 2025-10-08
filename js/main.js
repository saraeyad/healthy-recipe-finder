// Toggle button

export function initMenu() {
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuBtn = document.getElementById("menu-btn");
  const menuIcon = document.getElementById("humburger");

  function toggleMenu(show) {
    const method = show ? "remove" : "add";
    navMenu.classList[method](
      "opacity-0",
      "-translate-y-5",
      "pointer-events-none"
    );
    navMenu.classList[show ? "add" : "remove"](
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto"
    );
    menuIcon.src = show
      ? "./assets/images/icon-close-menu.svg"
      : "./assets/images/icon-hamburger-menu.svg";
    menuBtn.setAttribute("aria-expanded", show);

    if (show) navLinks[0].focus();
  }

  menuBtn.addEventListener("click", () => {
    const isHidden = navMenu.classList.contains("opacity-0");
    toggleMenu(isHidden);
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => toggleMenu(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });
}
