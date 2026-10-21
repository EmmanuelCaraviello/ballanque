/**
 * Ingresso condiviso: carica solo i moduli della pagina corrente.
 * Le schede e la lente appartengono al Museo; la home mantiene Studio e invito.
 */
import "./navigation.js";
import "./studio.js";
if (document.getElementById("track")) await import("./exhibition.js");
if (document.getElementById("zoomer")) await import("./lens.js");
await import("./animations.js");
