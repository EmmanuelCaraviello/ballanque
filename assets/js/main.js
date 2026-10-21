/**
 * Punto di ingresso del sito. I moduli dichiarano esplicitamente le loro dipendenze.
 * GSAP e ScrollTrigger sono caricati prima di questo modulo da index.html.
 * Usare un server locale (Go Live): i moduli ES non vanno aperti tramite file://.
 */
import "./navigation.js";
import "./cursor.js";
import "./collection.js";
import "./exhibition.js";
import "./lens.js";
import "./animations.js";
import "./studio.js";
