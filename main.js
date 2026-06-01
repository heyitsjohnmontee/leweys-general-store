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

  // Gallery lightbox
  const gallery = document.querySelector("[data-gallery]");
  const lightbox = document.querySelector("[data-lightbox]");
  if (gallery && lightbox) {
    const lbImg = lightbox.querySelector("[data-lightbox-img]");
    const lbCaption = lightbox.querySelector("[data-lightbox-caption]");
    const btnPrev = lightbox.querySelector("[data-lightbox-prev]");
    const btnNext = lightbox.querySelector("[data-lightbox-next]");
    const buttons = Array.from(gallery.querySelectorAll(".gallery__btn"));
    let current = 0;
    let lastFocused = null;

    function show(index) {
      current = (index + buttons.length) % buttons.length;
      const trigger = buttons[current];
      const img = trigger.querySelector("img");
      lbImg.src = trigger.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = img.alt;
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      // Focus a control so keyboard users land inside the dialog
      (buttons.length > 1 ? btnNext : lightbox.querySelector("[data-lightbox-close]")).focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.src = "";
      if (lastFocused) lastFocused.focus();
    }

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { open(i); });
    });
    btnPrev.addEventListener("click", function () { show(current - 1); });
    btnNext.addEventListener("click", function () { show(current + 1); });

    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowLeft") { show(current - 1); return; }
      if (e.key === "ArrowRight") { show(current + 1); return; }
      if (e.key === "Tab") {
        // Trap focus among the dialog's visible controls
        const focusable = Array.from(
          lightbox.querySelectorAll("button:not([hidden])")
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!lightbox.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Hide prev/next when there's only one image
    if (buttons.length < 2) {
      btnPrev.hidden = true;
      btnNext.hidden = true;
    }
  }

  // Scroll reveal + active-section highlighting (progressive enhancement).
  // All hiding lives behind .has-scroll-effects, which is only added here — so if
  // this code or IntersectionObserver is unavailable, the page stays fully visible.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-scroll-effects");

    // Major non-hero sections get the active-state dimming.
    var sections = document.querySelectorAll("main .section[id]");
    sections.forEach(function (s) { s.setAttribute("data-scroll-section", ""); });

    // Elements that fade/pop in as they enter the viewport.
    var revealEls = document.querySelectorAll(
      "#find .section__heading, #find .section__lede, #find .category, " +
      "#feed .section__heading, #feed .section__lede, #feed .gallery__item, " +
      "#vibe .vibe__media, #vibe .vibe__text, " +
      "#visit .findus__info, #visit .findus__media, " +
      "#newsletter .newsletter__inner"
    );
    revealEls.forEach(function (el) { el.classList.add("scroll-reveal"); });

    // Directional reveals for the vibe section (image from left, copy from right).
    var setDelay = function (sel, ms) {
      var el = document.querySelector(sel);
      if (el) el.style.setProperty("--reveal-delay", ms + "ms");
    };
    var vibeMedia = document.querySelector("#vibe .vibe__media");
    var vibeText = document.querySelector("#vibe .vibe__text");
    if (vibeMedia) vibeMedia.classList.add("scroll-reveal--left");
    if (vibeText) vibeText.classList.add("scroll-reveal--right");
    // Copy-then-photo / image cascade.
    setDelay("#vibe .vibe__text", 120);
    setDelay("#visit .findus__media", 140);

    // Stagger the category cards and gallery items.
    [".categories", ".gallery"].forEach(function (sel) {
      document.querySelectorAll(sel + " .scroll-reveal").forEach(function (item, i) {
        item.style.setProperty("--reveal-delay", Math.min(i * 70, 420) + "ms");
      });
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    }, { threshold: 0.42, rootMargin: "-12% 0px -28% 0px" });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }
})();
