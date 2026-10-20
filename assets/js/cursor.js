/**
 * Cursore decorativo: attivo soltanto con puntatore preciso e movimento consentito.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, RM } from "./core.js";

/* ===================== CURSORE ===================== */
var cur = $(".cursor");
if (!RM && window.matchMedia("(pointer:fine)").matches) {
  var cx = innerWidth / 2,
    cy = innerHeight / 2,
    tx2 = cx,
    ty2 = cy,
    cursorFrame = 0;
  /** Interpola la posizione e interrompe i frame quando il puntatore si ferma. */
  function moveCursor() {
    cursorFrame = 0;
    cx += (tx2 - cx) * 0.2;
    cy += (ty2 - cy) * 0.2;
    cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
    if (Math.abs(tx2 - cx) + Math.abs(ty2 - cy) > 0.1 && !document.hidden)
      cursorFrame = requestAnimationFrame(moveCursor);
  }
  addEventListener(
    "mousemove",
    function (e) {
      tx2 = e.clientX;
      ty2 = e.clientY;
      if (!cursorFrame) cursorFrame = requestAnimationFrame(moveCursor);
      var el = e.target.closest && e.target.closest("[data-cursor]");
      if (el) {
        cur.classList.add("big");
        $("b", cur).textContent = el.dataset.cursor;
      } else {
        cur.classList.remove("big");
      }
    },
    { passive: true },
  );
  cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && cursorFrame) {
      cancelAnimationFrame(cursorFrame);
      cursorFrame = 0;
    }
  });
}
