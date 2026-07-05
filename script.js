/* الهنيني — interactions: sticky header, scroll reveal, menu accent.
   Motion is transform/opacity only and fully skipped for
   prefers-reduced-motion users. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header condense ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Scroll reveal ---- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".menu-group"));

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    groups.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

  revealEls.forEach(function (el) { io.observe(el); });
  groups.forEach(function (el) { io.observe(el); });
})();
