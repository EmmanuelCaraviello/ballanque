/**
 * Controlli statici senza dipendenze: sintassi JavaScript e percorsi locali.
 * Non sostituisce i test visivi o di interazione nel browser.
 * Eseguire dalla radice con npm run check.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

/** Verifica una risorsa locale rispetto al file che la usa. */
function checkReference(reference, directory, source) {
  if (!reference || /^(https?:|data:|mailto:|#|\/\/)/.test(reference)) return;
  const target = path.resolve(directory, reference.split(/[?#]/)[0]);
  if (!fs.existsSync(target))
    errors.push(`${source}: risorsa assente ${reference}`);
}

for (const name of fs
  .readdirSync(root)
  .filter((name) => name.endsWith(".html"))) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (ids.length !== new Set(ids).size) errors.push(name + ": ID duplicati");
  for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (reference.startsWith("#") && !ids.includes(reference.slice(1)))
      errors.push(name + ": ancora assente " + reference);
    checkReference(reference, root, name);
    const crossPage = reference.match(/^([\w-]+\.html)#(.+)$/);
    if (crossPage && fs.existsSync(path.join(root, crossPage[1]))) {
      const target = fs.readFileSync(path.join(root, crossPage[1]), "utf8");
      if (!target.includes('id="' + crossPage[2] + '"'))
        errors.push(name + ": ancora assente " + reference);
    }
  }
}

for (const name of fs.readdirSync(path.join(root, "assets/js"))) {
  if (!name.endsWith(".js")) continue;
  const file = path.join(root, "assets/js", name);
  const check = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
  });
  if (check.status !== 0)
    errors.push(`${name}: ${check.stderr || check.error}`);
  const code = fs.readFileSync(file, "utf8");
  for (const [, reference] of code.matchAll(
    /(?:from\s*|import\s*)['"]([^'"]+)['"]/g,
  )) {
    checkReference(reference, path.dirname(file), name);
  }
  for (const [reference] of code.matchAll(/assets\/images\/[\w.-]+/g)) {
    checkReference(reference, root, name);
  }
}

for (const name of fs.readdirSync(path.join(root, "assets/css"))) {
  if (!name.endsWith(".css")) continue;
  const file = path.join(root, "assets/css", name);
  // Gli SVG incorporati possono contenere url(#filtro), che non sono file su disco.
  const code = fs
    .readFileSync(file, "utf8")
    .replace(/url\((["'])data:[\s\S]*?\1\)/g, "");
  for (const [, reference] of code.matchAll(
    /url\(\s*["']?([^\s"')]+)["']?\s*\)/g,
  )) {
    checkReference(reference, path.dirname(file), name);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "OK: sintassi JavaScript, import, immagini, CSS, ID e ancore locali.",
  );
}
