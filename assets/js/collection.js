/**
 * Parete espositiva: un progetto per ambiente, con accesso alla scheda completa.
 * Dati e fotografie rimangono nell'archivio projects.js. Nessun controllo dello scroll.
 */
import { $, $$, hasG } from "./core.js";
import { WORKS, PH } from "./projects.js";

const track = $("#track");
const status = document.createElement("p");
status.className = "museum-status mono";
status.setAttribute("role", "status");
status.setAttribute("aria-live", "polite");
$("#filters").after(status);

/** Protegge gli attributi e il testo quando i progetti vengono aggiornati in futuro. */
function escape(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

WORKS.forEach(function (work, index) {
  const button = document.createElement("button");
  const photo = work.photos?.[0];
  button.type = "button";
  button.className = "work museum-exhibit";
  button.dataset.i = index;
  button.dataset.tag = work.tag;
  button.setAttribute(
    "aria-label",
    "Esplora il progetto: " + work.club + ", " + work.title,
  );
  button.innerHTML = `
    <span class="museum-index mono" aria-hidden="true">${escape(work.n)} / ${String(WORKS.length).padStart(2, "0")} <span>Ballanqué · Archivio dei progetti</span></span>
    <span class="museum-composition">
      <span class="museum-echo" aria-hidden="true">${escape(work.n)}</span>
      <span class="museum-piece"><img class="museum-silhouette" aria-hidden="true" src="${escape(work.front)}" alt="" loading="lazy" decoding="async"><img class="museum-underpaint" aria-hidden="true" src="${escape(work.front)}" alt="" loading="lazy" decoding="async"><img class="museum-finished" src="${escape(work.front)}" alt="${escape(work.club + ", " + work.title + ", fronte")}" loading="lazy" decoding="async"></span>
      ${photo && PH[photo[0]] ? `<span class="museum-detail" aria-hidden="true"><img src="${escape(PH[photo[0]])}" alt="" loading="lazy" decoding="async"><span class="mono">Dal campo</span></span>` : ""}
    </span>
    <span class="museum-caption">
      <span class="museum-category mono">${escape(work.title)}</span>
      <span class="museum-club">${escape(work.club)}</span>
      <span class="museum-phrase">${escape(work.phrase)}</span>
      <span class="museum-story">${escape(work.story)}</span>
      <span class="museum-open mono">Esplora il progetto <span aria-hidden="true">↗</span></span>
    </span>`;
  track.appendChild(button);
});

/** Filtra gli ambienti senza cambiare ordine, indice originale o posizione dello scroll. */
function updateStatus() {
  const count = $$(".work:not([hidden])", track).length;
  status.textContent =
    count + (count === 1 ? " progetto esposto" : " progetti esposti");
}
$$("[data-f]").forEach(function (button) {
  button.addEventListener("click", function () {
    $$("[data-f]").forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    $$(".work", track).forEach(function (work) {
      work.hidden = !(
        button.dataset.f === "all" ||
        work.dataset.tag.split(" ").includes(button.dataset.f)
      );
    });
    updateStatus();
    if (hasG) ScrollTrigger.refresh();
  });
});
updateStatus();
export { track };
