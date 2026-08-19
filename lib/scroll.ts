// Smooth-scrolls to an element, but falls back to an instant jump when the
// user has requested reduced motion — shared by the side-nav dots and the
// scroll-to-top button (native <a href="#…"> anchors rely on the CSS
// `scroll-behavior` override in globals.css instead).
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
}

export function scrollToTop() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
}
