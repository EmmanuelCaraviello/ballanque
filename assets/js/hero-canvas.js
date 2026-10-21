/**
 * Dipinge le righe del titolo sulla tela senza duplicare il testo o bloccare la pagina.
 * I bordi irregolari della maschera simulano il passaggio della pennellata.
 * Senza Web Animations o con movimento ridotto il testo rimane subito completo.
 */
export function initHeroCanvas() {
  const canvas = document.querySelector(".hero-canvas");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!canvas || preference.matches || !Element.prototype.animate) return;
  const running = new Set();

  /** Registra solo ingressi finiti e rende possibile cancellarli in modo coerente. */
  function paint(element, frames, delay, duration) {
    const animation = element.animate(frames, {
      delay,
      duration,
      easing: "cubic-bezier(.42,0,.24,1)",
      fill: "backwards",
    });
    running.add(animation);
    animation.finished.then(() => running.delete(animation)).catch(() => {});
  }

  /** Il fronte della pennellata alterna piccole sporgenze, senza muovere le lettere. */
  function edge(percent, reverse) {
    const x = reverse ? 100 - percent : percent;
    const outer = reverse ? 100 : 0;
    const rough = (offset) =>
      Math.max(0, Math.min(100, x + (reverse ? -offset : offset)));
    return `polygon(${outer}% 0%, ${rough(0)}% 0%, ${rough(2)}% 12%, ${rough(-1)}% 25%, ${rough(1.5)}% 42%, ${rough(-2)}% 60%, ${rough(1)}% 79%, ${rough(0)}% 100%, ${outer}% 100%)`;
  }
  canvas
    .querySelectorAll("#heroTitle .row > span")
    .forEach(function (line, index) {
      const reverse = index === 1;
      const frames = [0, 18, 42, 68, 100].map(function (percent) {
        return {
          clipPath: edge(percent * 1.06 - 3, reverse),
          offset: percent / 100,
        };
      });
      paint(line, frames, 180 + index * 920, 1950);
    });
  paint(
    canvas.querySelector(".hero-signature"),
    [
      { opacity: 0, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, clipPath: "inset(0)" },
    ],
    3500,
    1050,
  );

  /** Il cambio di preferenza mostra immediatamente testo e firma definitivi. */
  function stop(event) {
    if (!event.matches) return;
    running.forEach((animation) => animation.cancel());
    running.clear();
    preference.removeEventListener("change", stop);
  }
  preference.addEventListener("change", stop);
}
