/**
 * Funzioni condivise: selettori DOM, accessibilità del movimento e disponibilità GSAP.
 * I percorsi delle immagini sono relativi a index.html.
 */

var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var hasG =
  typeof window.gsap !== "undefined" &&
  typeof window.ScrollTrigger !== "undefined";
if (hasG) gsap.registerPlugin(ScrollTrigger);
var imageRefresh = 0;
document.addEventListener(
  "load",
  function (e) {
    if (hasG && e.target.tagName === "IMG") {
      clearTimeout(imageRefresh);
      imageRefresh = setTimeout(function () {
        ScrollTrigger.refresh();
      }, 150);
    }
  },
  true,
);
var $ = function (s, c) {
  return (c || document).querySelector(s);
};
var $$ = function (s, c) {
  return Array.prototype.slice.call((c || document).querySelectorAll(s));
};
/** Converte i caratteri riservati prima di inserirli in HTML dinamico. */
function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
}

export { $, $$, esc, RM, hasG };
