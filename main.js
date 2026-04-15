function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const storageKey = "site-theme";

  if (!toggle) {
    return;
  }

  const applyTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    toggle.textContent = theme === "dark" ? "Light" : "Dark";
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  };

  const storedTheme = localStorage.getItem(storageKey);
  const initialTheme = storedTheme === "light" ? "light" : "dark";
  applyTheme(initialTheme);

  toggle.addEventListener("click", () => {
    const nextTheme =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}

function setYear() {
  document.querySelectorAll("#current-year").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTheme();
  initReveal();
  setYear();
});
