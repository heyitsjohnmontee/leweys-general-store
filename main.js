// Lewandowski's General Store — minimal vanilla JS, no dependencies.
(function () {
  "use strict";

  // Footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close the menu after following an in-page link
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Newsletter form — stub handler.
  // TODO: wire to a real provider (Squarespace campaign, Mailchimp, Buttondown, etc.)
  const form = document.querySelector("[data-newsletter]");
  const status = document.querySelector("[data-newsletter-status]");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value || !input.checkValidity()) {
        status.textContent = "Please enter a valid email address.";
        if (input) input.focus();
        return;
      }
      // No backend yet — acknowledge locally.
      status.textContent = "Thank you! We'll be in touch.";
      form.reset();
    });
  }
})();
