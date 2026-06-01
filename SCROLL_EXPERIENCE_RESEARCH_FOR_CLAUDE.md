# Scroll Experience Research For Claude

Research date: 2026-06-01

Goal: create a polished scrolling experience where sections become active as they
enter the viewport, previous content softly recedes, and new content fades/pops in
without making the page feel gimmicky or hard to read.

## Source Guidance Used

- MDN Intersection Observer API:
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN `prefers-reduced-motion`:
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- MDN CSS scroll-driven animations:
  https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- Chrome / web.dev scroll-driven animations guide:
  https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- GSAP ScrollTrigger docs:
  https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Scrollama docs:
  https://github.com/russellsamora/scrollama
- AOS docs:
  https://michalsnik.github.io/aos/

## Recommendation

Use native `IntersectionObserver` plus CSS transitions as the primary
implementation. It is the right fit for this site because:

- The site is plain HTML/CSS/JS with no build step.
- We only need section reveals/highlights, not a complex pinned scrollytelling
  article.
- It can be progressive: all content remains visible if JS fails.
- It can respect `prefers-reduced-motion`.
- It avoids adding a dependency just for fades.

Avoid full scroll-jacking. Let normal browser scrolling work. The effect should
feel like the page is breathing: current section sharpens and lifts; adjacent
sections become slightly quieter.

## Pattern To Build

Use two states:

- `.scroll-reveal`: base class on elements/sections that can animate.
- `.is-visible`: applied when an element enters the viewport.
- `.is-active`: applied to the current major section, useful for stronger
  highlighting.

Recommended targets:

- Hero content: already visible; do not delay the H1/CTA.
- `#find`: category cards stagger in.
- `#feed`: gallery items fade/scale in.
- `#vibe`: image and copy slide/fade in from opposite sides.
- `#visit`: directions copy, storefront photo, and map fade in.
- `#newsletter`: simple fade up.

## UX Rules

- Keep motion subtle: opacity + translateY + tiny scale only.
- Use durations around `450ms` to `700ms`.
- Stagger children by `60ms` to `100ms`.
- Do not animate layout dimensions.
- Do not blur text during animation.
- Do not hide critical content permanently before JS runs.
- Do not animate the OSM iframe itself in a way that causes interaction issues;
  animate its wrapper only.
- Disable transitions under `prefers-reduced-motion: reduce`.

## CSS Sketch

Add near the end of `styles.css`, before the existing reduced-motion block if
possible.

```css
/* Scroll polish: progressive enhancement. JS adds .has-scroll-effects. */
.has-scroll-effects .scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity .6s ease,
    transform .6s ease,
    filter .6s ease;
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}

.has-scroll-effects .scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.has-scroll-effects .section[data-scroll-section] {
  transition: opacity .5s ease, transform .5s ease;
}

.has-scroll-effects .section[data-scroll-section]:not(.is-active) {
  opacity: .72;
}

.has-scroll-effects .section[data-scroll-section].is-active {
  opacity: 1;
}

.has-scroll-effects .category.scroll-reveal,
.has-scroll-effects .gallery__item.scroll-reveal {
  transform: translateY(18px) scale(.98);
}

.has-scroll-effects .category.scroll-reveal.is-visible,
.has-scroll-effects .gallery__item.scroll-reveal.is-visible {
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .has-scroll-effects .scroll-reveal,
  .has-scroll-effects .section[data-scroll-section] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    filter: none !important;
  }
}
```

Optional: If the inactive section opacity feels too dim, use `.84` instead of
`.72`. For a retail site, err on readable.

## JS Sketch

Add this in `main.js` after existing setup. Keep it small.

```js
// Scroll reveal / active section highlighting.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("has-scroll-effects");

  const revealItems = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });

  const sections = document.querySelectorAll("[data-scroll-section]");
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { threshold: 0.42, rootMargin: "-12% 0px -28% 0px" }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}
```

Important: Because active sections can overlap around thresholds, this simple
version may briefly mark two sections active. That is acceptable for subtle
opacity. If Claude wants exactly one active section, compute the entry closest to
viewport center instead.

## Markup Changes

Add `data-scroll-section` to major sections:

```html
<section class="find section" id="find" data-scroll-section>
```

Add `data-reveal` and `.scroll-reveal` to elements that should animate:

```html
<h2 class="section__heading scroll-reveal" data-reveal>What you'll find</h2>
<p class="section__lede scroll-reveal" data-reveal>...</p>
```

For repeated children, add delays inline or from JS:

```html
<li class="category scroll-reveal" data-reveal style="--reveal-delay: 80ms">
```

Better: let JS assign stagger delays so the HTML stays cleaner:

```js
document.querySelectorAll(".categories .scroll-reveal, .gallery .scroll-reveal")
  .forEach(function (item, index) {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });
```

## Stronger Alternative: CSS Scroll-Driven Animations

CSS `animation-timeline: view()` can create scroll-linked progress effects without
JS in supported browsers. This is promising, but browser support and authoring
complexity make it better as progressive enhancement, not the base behavior.

Example:

```css
@supports (animation-timeline: view()) {
  .scroll-reveal {
    animation: reveal-by-scroll both;
    animation-timeline: view();
    animation-range: entry 12% cover 35%;
  }

  @keyframes reveal-by-scroll {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

For this repo, do not start here. Use IntersectionObserver first because it is
easier to control, test, and disable.

## When To Use GSAP ScrollTrigger

Use GSAP ScrollTrigger only if John wants a true scrollytelling sequence, such as:

- pinning a photo while text panels move over it
- scrubbed animation tied to exact scroll progress
- complex timeline coordination

Do not add it for simple fades. It would add dependency weight and move the site
away from the current framework-free style.

## When To Use Scrollama

Scrollama is useful for article-style scrollytelling: sticky graphic on one side,
step text on the other. It is overkill for the current homepage unless we build a
dedicated "how to find us / shop vibe" narrative.

## When To Use AOS

AOS is easy for simple reveal-on-scroll effects, but native IntersectionObserver
is small enough that this repo does not need the dependency.

## Best Fit For This Site

Recommended effect by section:

- `What you'll find`: heading fades up, then category cards pop in with a tiny
  upward movement.
- `New on the shelves`: gallery items stagger in; hover/lightbox behavior remains
  unchanged.
- `Why stop in`: image fades in from left, copy from right.
- `Find us downtown`: copy appears first, then storefront photo, then map wrapper.
- `Newsletter`: single calm fade up.

Do not animate the hero wordmark on page load beyond maybe a very small fade. The
hero must feel fast and stable.

## Implementation Checklist For Claude

1. Add `data-scroll-section` to each major non-hero section.
2. Add `.scroll-reveal` + `data-reveal` to headings, leads, category cards,
   gallery items, vibe media/text, findus media/text, and newsletter block.
3. Add CSS for reveal states and active-section dimming.
4. Add JS using `IntersectionObserver`.
5. Add stagger delay assignment in JS for category/gallery children.
6. Verify `prefers-reduced-motion` disables animation.
7. Verify content remains visible if JS fails by ensuring hidden states only apply
   under `.has-scroll-effects`.
8. Preview desktop and mobile. Watch for:
   - text feeling too dim
   - animation triggering too late
   - OSM iframe interaction issues
   - gallery/lightbox focus behavior unchanged

## Suggested Thresholds

Reveal observer:

```js
{ threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
```

Active section observer:

```js
{ threshold: 0.42, rootMargin: "-12% 0px -28% 0px" }
```

If sections activate too late on mobile, reduce active threshold to `.28`.

## Do Not Do

- Do not hide content without JS.
- Do not block scrolling.
- Do not pin long sections unless John explicitly asks for a stronger editorial
  scrollytelling experience.
- Do not animate every paragraph individually; it will feel fussy.
- Do not dim inactive sections so much that users have trouble reading while
  scrolling slowly.
- Do not add GSAP/AOS/Scrollama unless the native approach is insufficient.
