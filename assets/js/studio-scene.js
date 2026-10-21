/**
 * Scena illustrata dello Studio, separata dal timer e dai controlli.
 * Il corpo e il braccio provengono da un atlas originale approvato nello stile.
 * Il pennello segue lo stesso punto che rivela la pittura: niente comparsa improvvisa.
 */
export function createStudioScene(surface) {
  const ctx = surface.getContext("2d");
  const paths = {
    artist: "assets/images/jaguar-artist-atlas-v1.png",
    shirt: "assets/images/image-06.webp",
    logo: "assets/images/image-03.webp",
  };
  const pictures = {};
  const shape = [
    [0.36, 0.02],
    [0.2, 0.07],
    [0.02, 0.25],
    [0.12, 0.43],
    [0.22, 0.38],
    [0.21, 0.98],
    [0.79, 0.98],
    [0.78, 0.38],
    [0.88, 0.43],
    [0.98, 0.25],
    [0.8, 0.07],
    [0.64, 0.02],
    [0.61, 0.09],
    [0.5, 0.14],
    [0.39, 0.09],
    [0.36, 0.02],
  ];
  const box = { x: 568, y: 148, w: 330, h: 430 };
  let logoLayer;

  /** Carica solo immagini locali e mantiene il codice di animazione indipendente dall'HTML. */
  const ready = Promise.all(
    Object.entries(paths).map(
      ([key, src]) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            pictures[key] = image;
            resolve();
          };
          image.onerror = () =>
            reject(new Error("Immagine della scena assente: " + src));
          image.src = src;
        }),
    ),
  ).then(() => {
    logoLayer = document.createElement("canvas");
    logoLayer.width = pictures.logo.naturalWidth;
    logoLayer.height = pictures.logo.naturalHeight;
    const ink = logoLayer.getContext("2d");
    ink.drawImage(pictures.logo, 0, 0);
    ink.globalCompositeOperation = "source-in";
    ink.fillStyle = "#1b2150";
    ink.fillRect(0, 0, logoLayer.width, logoLayer.height);
  });

  /** Converte una fase della storia in un avanzamento continuo e limitato. */
  function phase(progress, start, end) {
    return Math.max(0, Math.min(1, (progress - start) / (end - start)));
  }
  /** Traccia una curva fino al punto raggiunto e restituisce la punta del pennello. */
  function trace(points, amount, color, width) {
    const lengths = points
      .slice(1)
      .map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
    let remaining =
        lengths.reduce((a, b) => a + b, 0) * Math.max(0, Math.min(1, amount)),
      tip = points[0];
    ctx.beginPath();
    ctx.moveTo(...tip);
    for (let i = 1; i < points.length && remaining > 0; i++) {
      const ratio = Math.min(1, remaining / Math.max(0.001, lengths[i - 1]));
      tip = [
        points[i - 1][0] + (points[i][0] - points[i - 1][0]) * ratio,
        points[i - 1][1] + (points[i][1] - points[i - 1][1]) * ratio,
      ];
      ctx.lineTo(...tip);
      remaining -= lengths[i - 1];
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (amount > 0) ctx.stroke();
    return tip;
  }
  /** Definisce la sagoma bianca, senza usare alcuna velatura della foto finale. */
  function shirtPath() {
    ctx.beginPath();
    shape.forEach(([x, y], i) => {
      const p = [box.x + x * box.w, box.y + y * box.h];
      if (!i) ctx.moveTo(...p);
      else ctx.lineTo(...p);
    });
    ctx.closePath();
  }
  /** Disegna tela e cavalletto: il personaggio dipinge sulla carta, non su una maglia sospesa. */
  function easel() {
    ctx.strokeStyle = "#8A3226";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    [
      [530, 610, 490, 715],
      [904, 610, 942, 715],
      [716, 66, 716, 655],
    ].forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p[0], p[1]);
      ctx.lineTo(p[2], p[3]);
      ctx.stroke();
    });
    ctx.save();
    ctx.shadowColor = "rgba(38,29,24,.13)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = "#EBDAC0";
    ctx.fillRect(480, 110, 470, 500);
    ctx.restore();
    ctx.fillStyle = "#F4F4F4";
    ctx.fillRect(488, 118, 454, 484);
    ctx.strokeStyle = "rgba(197,137,75,.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(488, 118, 454, 484);
    ctx.fillStyle = "#C5894B";
    ctx.fillRect(466, 605, 499, 14);
    ctx.fillRect(690, 87, 52, 30);
  }
  /** Disegna corpo, respiro e braccio articolato; la punta coincide con il tratto corrente. */
  function artist(tip, progress) {
    const arriving = phase(progress, 0, 0.09),
      entry = 1 - Math.pow(1 - arriving, 3);
    const painterX =
      Math.max(25, Math.min(230, tip[0] - 520)) - (1 - entry) * 470;
    const bob = progress > 0.94 ? 0 : Math.sin(progress * Math.PI * 30) * 1.7;
    const painterY = 225 + bob,
      bodyW = 398,
      bodyH = 453;
    ctx.save();
    ctx.globalAlpha = Math.min(1, arriving * 2);
    ctx.drawImage(
      pictures.artist,
      0,
      0,
      900,
      1024,
      painterX,
      painterY,
      bodyW,
      bodyH,
    );
    const shoulder = [
      painterX + (696 / 900) * bodyW,
      painterY + (334 / 1024) * bodyH,
    ];
    const dx = tip[0] - shoulder[0],
      dy = tip[1] - shoulder[1];
    const scale = Math.hypot(dx, dy) / Math.hypot(590, -135);
    ctx.translate(...shoulder);
    ctx.rotate(Math.atan2(dy, dx) - Math.atan2(-135, 590));
    ctx.drawImage(
      pictures.artist,
      916,
      240,
      620,
      245,
      -2 * scale,
      -155 * scale,
      620 * scale,
      245 * scale,
    );
    ctx.restore();
  }
  /** Rende un fotogramma deterministico: pausa e ridimensionamento conservano la stessa scena. */
  function render(progress) {
    const bounds = surface.getBoundingClientRect();
    if (!bounds.width || !bounds.height || !pictures.artist) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(bounds.width * dpr),
      height = Math.round(bounds.height * dpr);
    if (surface.width !== width || surface.height !== height) {
      surface.width = width;
      surface.height = height;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, bounds.width, bounds.height);
    const scale = Math.min(bounds.width / 1000, bounds.height / 750);
    ctx.save();
    ctx.translate(
      (bounds.width - 1000 * scale) / 2,
      (bounds.height - 750 * scale) / 2,
    );
    ctx.scale(scale, scale);
    easel();
    // Il quadro finale usa solo la foto originale: niente residui della sagoma illustrata.
    if (progress >= 0.96) {
      ctx.drawImage(pictures.shirt, box.x, box.y, box.w, box.h);
      artist([540, 575], progress);
      ctx.restore();
      return;
    }
    let tip = [535, 390];
    const outline = shape.map(([x, y]) => [
      box.x + x * box.w,
      box.y + y * box.h,
    ]);
    if (progress > 0.1) {
      tip = trace(outline, phase(progress, 0.1, 0.31), "#261D18", 2.2);
    }
    if (progress >= 0.31) {
      shirtPath();
      ctx.fillStyle = "#F4F4F4";
      ctx.fill();
      trace(outline, 1, "rgba(38,29,24,.45)", 1.5);
    }
    const stripes = phase(progress, 0.35, 0.62) * 6;
    if (stripes > 0) {
      ctx.save();
      shirtPath();
      ctx.clip();
      for (let row = 0; row < 6; row++) {
        const amount = Math.max(0, Math.min(1, stripes - row)),
          points = [];
        for (let i = 0; i <= 60; i++) {
          const x = i / 60;
          points.push([
            box.x + x * box.w,
            box.y +
              (0.26 +
                row * 0.11 +
                Math.sin(x * Math.PI * 2 + row * 0.17) * 0.035) *
                box.h,
          ]);
        }
        if (row % 2) points.reverse();
        const end = trace(points, amount, "#1b2150", box.h * 0.052);
        if (amount > 0 && amount < 1) tip = end;
      }
      ctx.restore();
    }
    const logo = phase(progress, 0.63, 0.68);
    if (logo > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(box.x + box.w * 0.24, box.y + box.h * 0.19, 25, logo * 49);
      ctx.clip();
      ctx.drawImage(
        logoLayer,
        box.x + box.w * 0.24,
        box.y + box.h * 0.19,
        22,
        46,
      );
      ctx.restore();
      tip = [box.x + box.w * 0.28, box.y + box.h * 0.19 + logo * 46];
    }
    const paint = phase(progress, 0.71, 0.96) * 8;
    if (paint > 0) {
      for (let row = 0; row < 8; row++) {
        const amount = Math.max(0, Math.min(1, paint - row));
        if (!amount) continue;
        const rowY = box.y + (row * box.h) / 8,
          rowH = box.h / 8 + 1;
        const fromRight = Boolean(row % 2);
        const inkWidth = box.w * amount;
        ctx.save();
        ctx.beginPath();
        ctx.rect(
          fromRight ? box.x + box.w - inkWidth : box.x,
          rowY,
          inkWidth,
          rowH,
        );
        ctx.clip();
        ctx.drawImage(pictures.shirt, box.x, box.y, box.w, box.h);
        ctx.restore();
        if (amount < 1)
          tip = [
            fromRight ? box.x + box.w - inkWidth : box.x + inkWidth,
            rowY + rowH * 0.5,
          ];
      }
    }
    if (progress >= 0.96) {
      ctx.drawImage(pictures.shirt, box.x, box.y, box.w, box.h);
      tip = [540, 575];
    }
    artist(tip, progress);
    ctx.restore();
  }
  return { ready, render };
}
