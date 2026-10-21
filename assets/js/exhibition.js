/**
 * Schede progetto del Museo: galleria, foto, stemma, colori, navigazione e ritorno alla collezione.
 * I percorsi delle immagini sono relativi a index.html.
 */
import { $, $$, RM } from "./core.js";
import { PH, WORKS } from "./projects.js";
import { track } from "./collection.js";
import { setInert } from "./dialogs.js";
import { closePlan } from "./navigation.js";
import { initMuseumMotion } from "./museum-motion.js";

/* ===================== MOSTRA MONOGRAFICA ===================== */
var expo = $("#expo"),
  lastOpener = null;
/** Apre il progetto richiesto e costruisce i capitoli della scheda. */
function openExpo(i) {
  // Una nuova scheda deve scollegare l'osservatore della galleria precedente.
  if (expo._cleanup) expo._cleanup();
  if (expo._stopMotion) expo._stopMotion();
  var w = WORKS[i];
  var prev = (i - 1 + WORKS.length) % WORKS.length,
    next = (i + 1) % WORKS.length;
  expo.innerHTML =
    '<div class="expo-bar"><span class="mono muted">Mostra Nº ' +
    w.n +
    " — " +
    w.club +
    '</span><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pill mono" data-go="' +
    prev +
    '">← Precedente</button><button class="pill mono" data-go="' +
    next +
    '">Successiva →</button><button class="pill solid mono" data-close aria-label="Chiudi il progetto e torna alla collezione">Chiudi ✕</button></div></div>' +
    '<div class="expo-hero"><div><span class="mono muted">' +
    w.n +
    " / " +
    String(WORKS.length).padStart(2, "0") +
    ' — Football / Identity / Culture</span><h2 id="expoTitle" style="margin-top:18px">' +
    w.club +
    '</h2><p class="t">' +
    w.title +
    '</p><p class="muted" style="margin-top:22px;max-width:40ch;font-size:17px">' +
    w.phrase +
    '</p></div><div class="viewer">' +
    viewerHTML(w) +
    "</div></div>" +
    chap(
      "01",
      "The story",
      "La storia dietro il design",
      "<p>" + w.story + "</p>",
    ) +
    chap(
      "02",
      "The colors",
      "I colori dell’opera",
      '<div class="swatches">' +
        w.colors
          .map(function (c) {
            return (
              '<div class="sw"><i style="background:' +
              c[1] +
              '"></i><div><strong class="c" style="font-family:var(--f-display);font-size:13px;letter-spacing:.06em;text-transform:uppercase">' +
              c[0] +
              '</strong><p style="font-size:15px">' +
              c[2] +
              "</p></div></div>"
            );
          })
          .join("") +
        "</div>",
    ) +
    chap(
      "03",
      "The symbol",
      "Lo stemma sul cuore",
      '<div style="display:grid;gap:20px">' +
        crestHTML(w) +
        "<p>" +
        (w.symbol ||
          "Lo stemma del club è sul cuore. Dall’altra parte del petto, il marchio Ballanqué.") +
        "</p></div>",
    ) +
    chap(
      "04",
      "The kit",
      "La divisa",
      "<p>" +
        w.kit +
        "</p>" +
        (w.views.length > 2
          ? '<p class="mono muted" style="margin-top:14px">Maglia e pantaloncino, fronte e retro: scorrete il visore in alto.</p>'
          : ""),
    ) +
    photoChap(w) +
    '<div class="expo-end"><h3>This is<br>their identity.</h3><div class="expo-nav"><button class="pill mono" data-go="' +
    next +
    '">Mostra successiva: ' +
    WORKS[next].title +
    ' →</button><a class="pill solid mono" href="index.html#commissiona">Contattaci →</a></div></div>';
  expo.classList.add("open");
  setInert(true);
  document.documentElement.style.overflow = "hidden";
  expo.scrollTop = 0;
  initViewer(w);
  setTimeout(function () {
    expo.focus();
  }, 50);
  // Il dialogo è il contenitore di scorrimento delle sue animazioni.
  expo._stopMotion = initMuseumMotion(expo, expo);
}
/** Unisce viste della divisa e fotografie in un unico elenco ordinato. */
function allSlides(w) {
  var v = w.views.map(function (x) {
    return { src: x[0], a: x[1], b: x[2], p: x[3] === "p" };
  });
  (w.photos || []).forEach(function (p) {
    v.push({ src: PH[p[0]], a: "Foto", b: p[1], p: true });
  });
  return v;
}
/** Genera le miniature che rimandano alla relativa vista nella galleria. */
function photoChap(w) {
  var v = allSlides(w),
    items = [];
  v.forEach(function (x, k) {
    if (x.p)
      items.push(
        '<button type="button" class="pthumb" data-slide="' +
          k +
          '" aria-label="Mostra nel visore: ' +
          x.b +
          '"><img src="' +
          x.src +
          '" alt="' +
          w.club +
          ", " +
          x.b +
          '" loading="lazy" decoding="async"><span class="mono">' +
          x.b +
          "</span></button>",
      );
  });
  if (!items.length) return "";
  return chap(
    "05",
    "On the pitch",
    "Le foto in campo",
    '<div class="pgrid">' + items.join("") + "</div>",
  );
}
/** Crea il visore con didascalia, frecce e indicatori accessibili. */
function viewerHTML(w) {
  var v = allSlides(w),
    many = v.length > 1;
  return (
    '<div class="vtrack" tabindex="0" aria-roledescription="carosello" aria-label="Viste della divisa: usate le frecce per scorrere">' +
    v
      .map(function (x, k) {
        return (
          '<figure class="vslide' +
          (x.p ? " photo" : "") +
          '" aria-label="' +
          (k + 1) +
          " di " +
          v.length +
          ": " +
          x.a +
          ", " +
          x.b +
          '"><img src="' +
          x.src +
          '" alt="' +
          w.club +
          ", " +
          w.title +
          ": " +
          x.a.toLowerCase() +
          ", " +
          x.b.toLowerCase() +
          '" draggable="false" decoding="async"' +
          (k > 1 ? ' loading="lazy"' : "") +
          "></figure>"
        );
      })
      .join("") +
    "</div>" +
    '<div class="vbar"><div class="vcap"><b class="vname">' +
    v[0].a +
    " — " +
    v[0].b +
    '</b><span class="mono muted vcount">1 / ' +
    v.length +
    "</span></div>" +
    (many
      ? '<div class="vctrl"><button class="varr vprev" type="button" aria-label="Vista precedente">←</button><div class="vdots' +
        (v.length > 6 ? " many" : "") +
        '">' +
        v
          .map(function (x, k) {
            return (
              '<button type="button" aria-label="' +
              x.a +
              " " +
              x.b +
              '" aria-current="' +
              (k === 0) +
              '" data-v="' +
              k +
              '"></button>'
            );
          })
          .join("") +
        '</div><button class="varr vnext" type="button" aria-label="Vista successiva">→</button></div>'
      : "") +
    "</div>"
  );
}
/** Collega scorrimento, tastiera, frecce e trascinamento alla galleria. */
function initViewer(w) {
  var tr = $(".vtrack", expo);
  if (!tr) return;
  var data = allSlides(w),
    slides = $$(".vslide", tr),
    dots = $$(".vdots button", expo),
    prev = $(".vprev", expo),
    next = $(".vnext", expo),
    cur = 0;
  /** Ricava la vista corrente dalla posizione orizzontale del visore. */
  function idx() {
    // Safari può superare temporaneamente i limiti durante il rimbalzo o la rotazione.
    return Math.max(
      0,
      Math.min(
        slides.length - 1,
        Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth)),
      ),
    );
  }
  /** Porta il visore alla vista richiesta rispettando il movimento ridotto. */
  function show(k) {
    k = Math.max(0, Math.min(slides.length - 1, k));
    tr.scrollTo({ left: k * tr.clientWidth, behavior: RM ? "auto" : "smooth" });
  }
  /** Aggiorna didascalia, indicatori e stato delle frecce. */
  function upd() {
    var k = idx();
    if (k === cur && tr.dataset.ready) return;
    cur = k;
    tr.dataset.ready = 1;
    var v = data[k];
    $(".vname", expo).textContent = v.a + " — " + v.b;
    $(".vcount", expo).textContent = k + 1 + " / " + data.length;
    dots.forEach(function (d, j) {
      d.setAttribute("aria-current", j === k);
    });
    // Centra solo la fila dei selettori, senza spostare la pagina o il dialogo.
    var activeDot = dots[k];
    var dotRow = $(".vdots", expo);
    if (activeDot && dotRow) {
      dotRow.scrollTo({
        left:
          activeDot.offsetLeft -
          dotRow.offsetLeft -
          dotRow.clientWidth / 2 +
          activeDot.offsetWidth / 2,
        behavior: RM ? "auto" : "smooth",
      });
    }
    if (prev) prev.disabled = k === 0;
    if (next) next.disabled = k === slides.length - 1;
  }
  tr.addEventListener(
    "scroll",
    function () {
      clearTimeout(tr._t);
      tr._t = setTimeout(upd, 60);
    },
    { passive: true },
  );
  if (prev)
    prev.addEventListener("click", function () {
      show(cur - 1);
    });
  if (next)
    next.addEventListener("click", function () {
      show(cur + 1);
    });
  dots.forEach(function (d) {
    d.addEventListener("click", function () {
      show(+d.dataset.v);
    });
  });
  tr.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      show(cur + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(cur - 1);
    }
  });
  /* trascinamento col mouse */
  var down = false,
    sx = 0,
    sl = 0,
    moved = false;
  tr.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    down = true;
    moved = false;
    sx = e.clientX;
    sl = tr.scrollLeft;
    tr.classList.add("drag");
    tr.setPointerCapture(e.pointerId);
  });
  tr.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (Math.abs(dx) > 3) moved = true;
    tr.scrollLeft = sl - dx;
  });
  /** Conclude il trascinamento del mouse e allinea la vista più vicina. */
  function end(e) {
    if (!down) return;
    down = false;
    tr.classList.remove("drag");
    var dx = e.clientX - sx;
    var k = Math.round(sl / tr.clientWidth);
    if (dx < -60) k++;
    else if (dx > 60) k--;
    show(k);
  }
  tr.addEventListener("pointerup", end);
  tr.addEventListener("pointercancel", end);
  /** Mantiene la stessa foto quando il tablet ruota o cambia la larghezza. */
  var lastWidth = tr.clientWidth;
  var resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(function () {
          var width = tr.clientWidth;
          if (!width || width === lastWidth) return;
          lastWidth = width;
          // Aspetta che lo scroll-snap nativo abbia assestato il nuovo layout.
          var selected = cur;
          clearTimeout(tr._t);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              if (!tr.isConnected) return;
              tr.scrollTo({
                left: selected * tr.clientWidth,
                behavior: "instant",
              });
            });
          });
        })
      : null;
  if (resizeObserver) resizeObserver.observe(tr);
  expo._cleanup = function () {
    clearTimeout(tr._t);
    if (resizeObserver) resizeObserver.disconnect();
  };
  expo._show = show;
  upd();
}
/** Mostra lo stemma originale o un ritaglio della maglia. */
function crestHTML(w) {
  if (w.crestImg && !w.crestPos)
    return (
      '<img class="crest-photo' +
      (w.crestCut ? " cut" : "") +
      '" src="' +
      PH[w.crestImg] +
      '" alt="Stemma: ' +
      w.club +
      '" loading="lazy" decoding="async">'
    );
  if (w.crestImg)
    return (
      '<div class="crest-zoom" role="img" aria-label="Dettaglio dello stemma: ' +
      w.club +
      '" style="background-image:url(' +
      PH[w.crestImg] +
      ");background-size:260%;background-position:" +
      w.crestPos +
      '"></div>'
    );
  return (
    '<div class="crest-zoom" role="img" aria-label="Dettaglio dello stemma: ' +
    w.club +
    '" style="background-image:url(' +
    w.front +
    ");background-size:500%;background-position:" +
    w.crest[0] +
    "% " +
    w.crest[1] +
    '%"></div>'
  );
}
/** Compone un capitolo riutilizzabile della scheda progetto. */
function chap(n, t, s, body) {
  return (
    '<section class="chap"><span class="mono" style="color:var(--ocher)">' +
    n +
    "</span><div><h3>" +
    t +
    '</h3><p class="mono muted" style="margin-top:10px">' +
    s +
    "</p></div><div>" +
    body +
    "</div></section>"
  );
}
/** Chiude la scheda e restituisce il focus all’opera di provenienza. */
function closeExpo() {
  if (expo._cleanup) expo._cleanup();
  if (expo._stopMotion) expo._stopMotion();
  expo.classList.remove("open");
  setInert(false);
  document.documentElement.style.overflow = "";
  if (lastOpener) lastOpener.focus({ preventScroll: true });
}
expo.addEventListener("click", function (e) {
  var g = e.target.closest("[data-go]");
  if (g) {
    openExpo(+g.dataset.go);
    return;
  }
  var ps = e.target.closest("[data-slide]");
  if (ps) {
    var k = +ps.dataset.slide;
    expo.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
    setTimeout(
      function () {
        expo._show && expo._show(k);
      },
      RM ? 0 : 350,
    );
    return;
  }
  if (e.target.closest("[data-close]")) {
    closeExpo();
    return;
  }
  var ct = e.target.closest("[data-close-to]");
  if (ct) {
    e.preventDefault();
    closeExpo();
    setTimeout(function () {
      $("#" + ct.dataset.closeTo).scrollIntoView({
        behavior: RM ? "auto" : "smooth",
      });
    }, 300);
  }
});
track.addEventListener("click", function (e) {
  var w = e.target.closest(".work");
  if (w) {
    lastOpener = w;
    openExpo(+w.dataset.i);
  }
});
addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (expo.classList.contains("open")) closeExpo();
    else if ($("#plan").classList.contains("open")) closePlan();
  }
});
