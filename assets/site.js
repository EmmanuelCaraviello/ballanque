
(function(){
"use strict";
var IMG=["assets/image-06.webp","assets/image-07.webp","assets/image-08.webp","assets/image-09.webp","assets/image-10.webp","assets/image-11.webp","assets/image-12.webp","assets/image-13.webp"];
var CONTACT_EMAIL = "collab@ballanque.com"; /* destinatario delle richieste dal form */
var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var hasG = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
if(hasG) gsap.registerPlugin(ScrollTrigger);
var imageRefresh=0;document.addEventListener("load",function(e){if(hasG&&e.target.tagName==="IMG"){clearTimeout(imageRefresh);imageRefresh=setTimeout(function(){ScrollTrigger.refresh()},150)}},true);
var $ = function(s,c){return (c||document).querySelector(s)};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var uid = 0;

/* ===================== MAGLIA (SVG) ===================== */
var BODY = "M140 30 Q200 74 260 30 L332 54 L396 142 L346 182 L320 160 L322 420 Q200 434 78 420 L80 160 L54 182 L4 142 L68 54 Z";
function patternDef(id,type,c){
  var a=c.accent, t=c.trim;
  switch(type){
    case "chain": return '<pattern id="'+id+'" width="34" height="22" patternUnits="userSpaceOnUse"><ellipse cx="9" cy="11" rx="8" ry="5" fill="none" stroke="'+t+'" stroke-width="2.2"/><ellipse cx="26" cy="11" rx="8" ry="5" fill="none" stroke="'+t+'" stroke-width="2.2"/><circle cx="9" cy="11" r="1.6" fill="'+t+'"/><circle cx="26" cy="11" r="1.6" fill="'+t+'"/></pattern>';
    case "greca": return '<pattern id="'+id+'" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 34 H30 V6 H10 V26 H22 V14" fill="none" stroke="'+t+'" stroke-width="3"/></pattern>';
    case "diag": return '<pattern id="'+id+'" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><rect width="9" height="28" fill="'+t+'"/><rect x="13" width="2" height="28" fill="'+a+'"/></pattern>';
    case "glyph": return '<pattern id="'+id+'" width="44" height="44" patternUnits="userSpaceOnUse"><rect x="4" y="4" width="36" height="36" rx="7" fill="none" stroke="'+t+'" stroke-width="2"/><circle cx="14" cy="14" r="2.6" fill="'+t+'"/><circle cx="22" cy="14" r="2.6" fill="'+t+'"/><circle cx="30" cy="14" r="2.6" fill="'+t+'"/><rect x="11" y="22" width="22" height="4" fill="'+t+'"/><rect x="11" y="30" width="22" height="4" fill="'+t+'"/></pattern>';
    case "spots": return '<pattern id="'+id+'" width="60" height="56" patternUnits="userSpaceOnUse"><g fill="none" stroke="'+t+'" stroke-width="3.2" stroke-linecap="round"><path d="M10 14 q6 -8 13 -1 M8 22 q2 7 9 6 M26 18 q3 6 -3 10"/><path d="M38 40 q6 -8 13 -1 M36 48 q2 7 9 6 M54 44 q3 6 -3 10"/></g><circle cx="16" cy="20" r="2.4" fill="'+t+'"/><circle cx="44" cy="46" r="2.4" fill="'+t+'"/></pattern>';
  }
  return "";
}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function shirt(o){
  var id="s"+(++uid), p=id+"p", cl=id+"c", tx=id+"t";
  var initials=esc((o.crest||"").slice(0,3).toUpperCase());
  var bandY = o.pattern==="chain"||o.pattern==="greca" ? true : false;
  var patFill = bandY
    ? '<rect x="0" y="190" width="400" height="120" fill="url(#'+p+')" opacity=".95"/>'
    : '<rect x="0" y="0" width="400" height="440" fill="url(#'+p+')" opacity="'+(o.pattern==="spots"?.55:.75)+'"/>';
  return '<svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Maglia '+esc(o.club)+'">'+
  '<defs>'+patternDef(p,o.pattern,o)+
  '<clipPath id="'+cl+'"><path d="'+BODY+'"/></clipPath>'+
  '<filter id="'+tx+'" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>'+
  '<linearGradient id="'+id+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>'+
  '</defs>'+
  '<path d="'+BODY+'" fill="'+o.base+'"/>'+
  '<g clip-path="url(#'+cl+')">'+patFill+
    '<rect width="400" height="440" fill="url(#'+id+'g)"/>'+
    '<rect width="400" height="440" fill="#000" filter="url(#'+tx+')"/>'+
    '<path d="M54 182 L4 142 L68 54 L80 160 Z" fill="'+o.base+'"/><path d="M346 182 L396 142 L332 54 L320 160 Z" fill="'+o.base+'"/>'+
    '<path d="M10 150 L50 178" stroke="'+o.trim+'" stroke-width="9"/><path d="M390 150 L350 178" stroke="'+o.trim+'" stroke-width="9"/>'+
    '<path d="M78 412 Q200 426 322 412" stroke="'+o.trim+'" stroke-width="6" fill="none"/>'+
    '<path d="M80 160 L78 420 M320 160 L322 420" stroke="#000" stroke-opacity=".25" stroke-width="1.4" stroke-dasharray="3 4"/>'+
    '<path d="M68 54 L80 160 M332 54 L320 160" stroke="#000" stroke-opacity=".22" stroke-width="1.2" stroke-dasharray="3 4"/>'+
  '</g>'+
  '<path d="M140 30 Q200 74 260 30 Q248 26 238 24 Q200 52 162 24 Q152 26 140 30 Z" fill="'+o.trim+'"/>'+
  '<path d="M162 24 Q200 52 238 24" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.2"/>'+
  '<g transform="translate(250 118)"><path d="M0 0 H40 V26 Q40 44 20 52 Q0 44 0 26 Z" fill="'+o.accent+'" stroke="'+o.trim+'" stroke-width="2.4"/>'+
  '<text x="20" y="31" text-anchor="middle" font-family="Unbounded, Arial Black, sans-serif" font-weight="800" font-size="'+(initials.length>2?10:13)+'" fill="'+o.base+'">'+initials+'</text></g>'+
  '<text x="200" y="404" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" letter-spacing="2" fill="'+o.trim+'" opacity=".8">'+esc((o.motto||"").slice(0,40))+'</text>'+
  '</svg>';
}

/* ===================== COLLEZIONE: DATI ===================== */
var PH={CRC:"assets/image-14.webp",CR:"assets/image-15.webp",B1:"assets/image-16.webp",B2:"assets/image-17.webp",B3:"assets/image-18.webp",B4:"assets/image-19.webp",B5:"assets/image-20.webp",B6:"assets/image-21.webp",C1:"assets/image-22.webp",C2:"assets/image-23.webp",C3:"assets/image-24.webp",C4:"assets/image-25.webp",C5:"assets/image-26.webp",C6:"assets/image-27.webp",C7:"assets/image-28.webp",C8:"assets/image-29.webp",A1:"assets/image-30.webp",A2:"assets/image-31.webp",L47:"assets/image-32.webp",L48:"assets/image-33.webp",L49:"assets/image-34.webp",L50:"assets/image-35.webp",L51:"assets/image-36.webp",L52:"assets/image-37.webp",L53:"assets/image-38.webp",L54:"assets/image-39.webp",L55:"assets/image-40.webp",L56:"assets/image-41.webp",L57:"assets/image-42.webp",L58:"assets/image-43.webp",L59:"assets/image-44.webp",L60:"assets/image-45.webp",L61:"assets/image-46.webp",L65:"assets/image-47.webp",O1:"assets/image-48.webp",O2:"assets/image-49.webp",O3:"assets/image-50.webp"};
var CREM=$("#zoomer img").getAttribute("src");
var WORKS=[
 {n:"01",club:"Atletico BMG",title:"Home — Giocatore",front:IMG[0],back:IMG[1],views:[[IMG[0],"Maglia","Fronte"],[IMG[1],"Maglia","Retro"],["assets/image-51.webp","Pantaloncino","Fronte"],["assets/image-52.webp","Pantaloncino","Retro"]],size:"xl",tag:"home giocatore",crest:[68.7,19.5],crestImg:"CR",crestCut:true,photos:[["L59","In campo"],["L57","Dettaglio — stemma"],["L54","Dettaglio — marchio Ballanqué"],["L52","Ingresso in campo"],["L53","Retro — numero 10"],["L61","Retro — numero 3"],["L55","Rimessa laterale"],["L56","In partita"],["L58","In partita"],["L60","Ritratto"],["L65","La maglia in tribuna"],["L47","La squadra"],["L48","Home e away"]],
  phrase:"Onde verdi che attraversano il blu, da una spalla all'altra.",
  story:"Sul blu notte corrono onde verdi che sfumano nel bianco. Il motivo continua sul retro e scende sui fianchi dei pantaloncini.",
  colors:[["Blu notte","#1b2150","Il fondo della maglia."],["Verde","#1f9a4f","Le onde."],["Bianco","#ffffff","Colletto, polsini e profili."]],
  kit:"Colletto a polo bianco con apertura a V, polsini bianchi. Sul petto lo stemma del club e il marchio Ballanqué; sul retro gli sponsor."},
 {n:"02",club:"Atletico BMG",title:"Home — Portiere",front:IMG[2],back:IMG[3],views:[[IMG[2],"Maglia","Fronte"],[IMG[3],"Maglia","Retro"],["assets/image-53.webp","Pantaloncino","Fronte"],["assets/image-54.webp","Pantaloncino","Retro"]],size:"l",cls:"lift",tag:"home portiere",crest:[76.6,19.2],crestImg:"CR",crestCut:true,photos:[["L49","In campo"]],
  phrase:"La stessa onda del giocatore, tradotta in blu e azzurro polvere.",
  story:"Il portiere indossa lo stesso disegno della squadra, in una variante tono su tono: le onde diventano azzurro polvere sul blu notte.",
  colors:[["Blu notte","#1b2150","Il fondo della maglia."],["Azzurro polvere","#8fa9c9","Le onde."],["Bianco","#ffffff","Colletto e polsini."]],
  kit:"Stesso taglio della divisa giocatore: colletto a polo bianco, polsini bianchi, onde su tutto il corpo."},
 {n:"03",club:"Atletico BMG",title:"Away — Giocatore",front:IMG[4],back:IMG[5],views:[[IMG[4],"Maglia","Fronte"],[IMG[5],"Maglia","Retro"],["assets/image-55.webp","Pantaloncino","Fronte"],["assets/image-56.webp","Pantaloncino","Retro"]],size:"xl",cls:"drop",tag:"away giocatore",crest:[72.2,21.8],crestImg:"CR",crestCut:true,photos:[["L48","In campo"],["L51","Dettaglio — stemma e trama"]],
  phrase:"Linee bianche sottili su fondo fucsia, come le strade di una mappa.",
  story:"Sul davanti, una trama di linee bianche si dirama su tutto il petto. Il retro resta fucsia pieno, attraversato solo da due profili bianchi.",
  colors:[["Fucsia","#e5157a","Il fondo della maglia."],["Bianco","#ffffff","La trama di linee, colletto e polsini."]],
  kit:"Colletto a polo bianco, polsini bianchi. Pantaloncino bianco con inserti fucsia sui fianchi."},
 {n:"04",club:"Atletico BMG",title:"Away — Portiere",front:IMG[6],back:IMG[7],views:[[IMG[6],"Maglia","Fronte"],[IMG[7],"Maglia","Retro"],["assets/image-57.webp","Pantaloncino","Fronte"],["assets/image-58.webp","Pantaloncino","Retro"]],size:"l",cls:"lift",tag:"away portiere",crest:[75.2,17.3],crestImg:"CR",crestCut:true,photos:[["L50","In campo"],["L47","Con la squadra"]],
  phrase:"La stessa trama di linee, su un azzurro chiaro.",
  story:"La divisa del portiere riprende la trama della trasferta e la porta su un azzurro chiaro, con un tessuto a rilievo visibile sulle maniche.",
  colors:[["Azzurro","#a9cbe9","Il fondo della maglia."],["Bianco","#ffffff","La trama di linee, colletto e polsini."]],
  kit:"Colletto a polo bianco, polsini bianchi. Pantaloncino bianco con inserti azzurri sui fianchi."},
 {n:"05",club:"Cremonese",title:"Prima maglia, 2026",front:CREM,back:"",views:[[CREM,"Maglia","Fronte"]],size:"m",tag:"giocatore",crest:[69.4,31],crestImg:"CRC",crestCut:true,photos:[["A1","Indossata"],["A2","Retro — numero 1"]],
  phrase:"Case a gradoni, una sopra l'altra, disegnano una V sul petto.",
  story:"Il pattern è fatto di case a gradoni che scendono verso il centro del petto e formano una V. Sui fianchi, la trama di muri prosegue fino all'orlo.",
  colors:[["Azzurro","#0aa9d6","Il fondo della maglia."],["Rosso","#e8262b","Colletto e polsini."],["Oro","#d9b35f","Il profilo delle cuciture."]],
  kit:"Girocollo rosso con profilo oro, maniche raglan segnate da un filo d'oro, polsini rossi. Lo stemma sul cuore, il marchio Ballanqué sull'altro lato del petto."},
 {n:"06",club:"Le Mie Gambe Bologna",title:"BFL 2024 — Edizione speciale",front:PH.O1,back:PH.O2,isPhoto:true,views:[[PH.O1,"Maglia","Fronte","p"],[PH.O2,"Maglia","Retro","p"]],size:"l",cls:"drop",tag:"speciale",crest:[71,12],crestImg:"B1",
  photos:[["O3","Indossata"],["B1","Dettaglio — BFL 2024 ricamato"],["B3","Dettaglio — marchio Ballanqué in oro"],["B2","Dettaglio — la figura tono su tono"],["B5","La squadra"],["B6","La squadra, con il portiere"],["B4","Portiere — lo stemma BFL 2024"]],
  phrase:"Nero profondo, oro e un tridente: Bologna cucita sul colletto.",
  story:"Sul fondo nero, una grande figura tono su tono emerge tra le onde nella parte bassa della maglia. Sul retro, sopra il numero, un tridente d'oro e la scritta Le Mie Gambe Bologna.",
  colors:[["Nero","#141414","Il fondo della maglia e la figura tono su tono."],["Oro","#c9a24a","Il marchio Ballanqué, il tridente e il profilo dei numeri."],["Rosso e blu","#c8323a","Le righe di colletto e polsini, con il filo d'oro."]],
  symbol:"Sul cuore, la scritta BFL 2024 ricamata in bianco. Dall'altra parte del petto, il marchio Ballanqué in oro.",
  kit:"Girocollo e polsini a righe rosse, blu e oro. Numeri bianchi con profilo oro; sul retro, il tridente e il nome della squadra."}
, {n:"07",club:"Cremonese",title:"Maglia a righe, 2026",front:PH.C1,back:PH.C2,isPhoto:true,views:[[PH.C1,"Maglia","Fronte","p"],[PH.C2,"Maglia","Retro","p"]],size:"l",cls:"lift",tag:"giocatore",crest:[67.5,26],crestImg:"CRC",crestCut:true,
  photos:[["C5","Dettaglio — stemma e marchio"],["C3","Dettaglio — la trama di pietra"],["C4","Retro — numero 10"],["C6","Indossata"],["C7","Indossata"],["C8","La squadra in campo"]],
  phrase:"Righe rosse e grigie, e dentro il grigio un muro di pietra.",
  story:"Righe verticali rosse e grigie. Nelle righe grigie corre una trama di pietre, come un muro antico. Sul retro, sopra il numero, la frase «Amarti ancora, perdutamente!» scritta in corsivo oro.",
  colors:[["Rosso","#e8382a","Le righe principali."],["Grigio pietra","#8d8b90","Le righe con la trama di pietra."],["Ocra","#e0a960","Colletto e polsini."]],
  symbol:"Sul cuore, lo stemma Cremonese 2026. Dall'altra parte del petto, il marchio Ballanqué ricamato in bianco.",
  kit:"Girocollo e polsini ocra, maniche raglan. Numeri bianchi a gradini con profilo oro e il piccolo stemma; sul retro la frase in corsivo oro."}
];

/* collezione */
var track=$("#track");
function kitFrame(w){return '<div class="frame"><div class="kit'+(w.isPhoto?' ph':'')+'"><img class="f'+(w.back?' has-b':'')+'" src="'+w.front+'" alt="'+w.club+', '+w.title+', fronte" loading="lazy" decoding="async">'+(w.back?'<img class="b" src="'+w.back+'" alt="'+w.club+', '+w.title+', retro" loading="lazy" decoding="async">':'')+'</div></div>'}
function chipEl(src,pos,size){var c=document.createElement("div");c.className="detail-chip";c.setAttribute("aria-hidden","true");c.style.backgroundImage="url("+src+")";c.style.backgroundPosition=pos;c.style.backgroundSize=size;return c}
function wallPhoto(k,cap){var f=document.createElement("figure");f.className="wall-photo";f.setAttribute("aria-hidden","true");f.innerHTML='<img src="'+PH[k]+'" alt="" decoding="async"><figcaption class="mono muted">'+cap+'</figcaption>';return f}
function noteEl(t,al){var p=document.createElement("p");p.className="wall-note";p.style.position="relative";p.style.flex="none";p.style.alignSelf=al;p.textContent=t;return p}
WORKS.forEach(function(w,i){
  var b=document.createElement("button");
  b.type="button"; b.className="work "+w.size+" "+(w.cls||""); b.dataset.i=i; b.dataset.tag=w.tag; b.dataset.cursor="EXPLORE";
  b.setAttribute("aria-label","Apri la mostra: "+w.club+", "+w.title);
  b.innerHTML=kitFrame(w)+
    '<div class="label"><span class="mono muted">'+w.n+' / '+String(WORKS.length).padStart(2,"0")+'</span>'+(i===0||WORKS[i-1].club!==w.club?'<span class="c">'+w.club+'</span>':'<span class="sr-only">'+w.club+'</span>')+'<span class="t">'+w.title+'</span><span class="note" style="margin-top:8px">'+w.phrase+'</span></div>';
  track.appendChild(b);
  if(i===0){track.appendChild(noteEl("«Ogni maglia nasce da una domanda: chi siete?»","flex-end"));var c0=chipEl(PH.L54,"50% 50%","cover");c0.classList.add("photo");track.appendChild(c0)}
  if(i===2){var c2=chipEl(PH.L51,"50% 50%","cover");c2.classList.add("photo");track.appendChild(c2);track.appendChild(noteEl("«Da vicino, il tessuto racconta più del nome.»","flex-start"))}
  if(i===3){track.appendChild(wallPhoto("L47","Atletico BMG — home e away, sullo stesso campo"))}
  if(i===4){track.appendChild(noteEl("«Il territorio entra nella trama.»","flex-end"))}
});

/* ===================== STATO VISITA ===================== */
var visitedRooms=new Set(), seenWorks=new Set();
var ticket=String(Math.floor(10000+Math.random()*89999));
var d=new Date();
$("#ticket").textContent="Visitatore Nº "+ticket+" · "+d.toLocaleDateString("it-IT",{day:"2-digit",month:"long",year:"numeric"});
$("#statTicket").textContent=ticket;
var rooms=$$("[data-room]");
function updStats(){
  $("#statRooms").textContent=visitedRooms.size+" / "+rooms.length;
  $("#statWorks").textContent=seenWorks.size+" / "+WORKS.length;
  $("#planFoot").textContent="Sale visitate: "+visitedRooms.size+" di "+rooms.length;
  $$(".rm").forEach(function(g){g.classList.toggle("visited",visitedRooms.has(g.dataset.room))});
}
var current="00";
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){
      var r=e.target; current=r.dataset.room; visitedRooms.add(current);
      $("#roomNo").textContent=current; $("#roomName").textContent=r.dataset.name;
      $("#planHere").textContent="Siete qui — Sala "+current+", "+r.dataset.name;
      $$("[data-room-link]").forEach(function(l){l.classList.toggle("on",l.dataset.roomLink===current)});
      $$("#planList a").forEach(function(l){l.classList.toggle("here",l.dataset.room===current)});
      $$(".rm").forEach(function(g){g.classList.toggle("here",g.dataset.room===current)});
      updStats();
    }
  });
},{rootMargin:"-45% 0px -45% 0px"});
rooms.forEach(function(r){io.observe(r)});

/* nav solida */
var nav=$("#nav");
window.addEventListener("scroll",function(){nav.classList.toggle("solid",window.scrollY>60)},{passive:true});

/* ===================== PIANTA ===================== */
/* coordinate della pianta orizzontale (420×300); su telefono la pianta ruota in verticale */
var PLAN=[["00",10,10,90,90,"Ingresso"],["01",100,10,80,90,"Foyer"],["02",180,10,90,90,"Tela"],["03",270,10,140,140,"Collezione"],
 ["04",180,100,90,100,"Manifesto"],["05",100,100,80,100,"Studio"],["06",10,100,90,100,"Archivio"],["07",10,200,90,90,"People"],
 ["08",100,200,170,90,"Curatore"],["09",270,150,140,60,"Sala vuota"],["10",270,210,140,45,"Dal campo"],["11",270,255,140,40,"Uscita"]];
var svg=$("#planSvg"), list=$("#planList"), route=$("#planRoute"), NS="http://www.w3.org/2000/svg";
PLAN.forEach(function(p){
  var r=rooms.find(function(x){return x.dataset.room===p[0]}); if(!r)return;
  var g=document.createElementNS(NS,"g");
  g.setAttribute("class","rm"); g.dataset.room=p[0];
  g.innerHTML='<rect/><text class="n">'+p[0]+'</text><text class="t">'+p[5].toUpperCase()+'</text>';
  g.addEventListener("click",function(){go(r)});
  svg.appendChild(g);
  var a=document.createElement("a"); a.href="#"+r.id; a.dataset.room=p[0]; a.innerHTML='<span class="mono">'+p[0]+'</span><span>'+r.dataset.name+'</span>';
  a.addEventListener("click",function(ev){ev.preventDefault();go(r)});
  list.appendChild(a);
});
var portraitMQ=matchMedia("(max-width: 820px)");
function drawPlan(){
  var pr=portraitMQ.matches, pts=[];
  svg.setAttribute("viewBox",pr?"0 0 300 420":"0 0 420 300");
  PLAN.forEach(function(p){
    var x=p[1],y=p[2],w=p[3],h=p[4],t;
    if(pr){t=x;x=y;y=t;t=w;w=h;h=t}
    var g=svg.querySelector('.rm[data-room="'+p[0]+'"]'); if(!g)return;
    var rc=g.querySelector("rect"); rc.setAttribute("x",x+2);rc.setAttribute("y",y+2);rc.setAttribute("width",w-4);rc.setAttribute("height",h-4);
    var n=g.querySelector(".n"); n.setAttribute("x",x+9); n.setAttribute("y",y+(pr?19:17));
    var tt=g.querySelector(".t"); tt.setAttribute("x",x+9); tt.setAttribute("y",y+h-11);
    pts.push((x+w/2)+","+(y+h/2));
  });
  route.setAttribute("points",pts.join(" "));
}
drawPlan();
if(portraitMQ.addEventListener)portraitMQ.addEventListener("change",drawPlan);
var plan=$("#plan"), planBtn=$("#planBtn");
function openPlan(){plan.classList.add("open");setInert(true);$("#planGuide").setAttribute("aria-pressed",document.body.classList.contains("guide"));document.documentElement.style.overflow="hidden";var cu=$(".cursor");if(cu)cu.classList.remove("big");updStats();setTimeout(function(){var f=$("a.here",list)||$("a",list);f&&f.focus({preventScroll:true});if(f&&f.scrollIntoView)f.scrollIntoView({block:"nearest"})},80)}
function closePlan(){plan.classList.remove("open");setInert(false);document.documentElement.style.overflow="";planBtn.focus()}
function go(r){plan.classList.remove("open");setInert(false);document.documentElement.style.overflow="";r.scrollIntoView({behavior:RM?"auto":"smooth"});r.setAttribute("tabindex","-1");r.focus({preventScroll:true})}
planBtn.addEventListener("click",openPlan);
$("#planClose").addEventListener("click",closePlan);

/* ===================== GUIDA ===================== */
var gb=$("#guideBtn");
try{ if(localStorage.getItem("bq-guide")==="1"){document.body.classList.add("guide");gb.setAttribute("aria-pressed","true")} }catch(e){}
gb.addEventListener("click",function(){
  var on=document.body.classList.toggle("guide"); gb.setAttribute("aria-pressed",on);
  toast(on?"Note del curatore attivate":"Note del curatore disattivate");
  try{localStorage.setItem("bq-guide",on?"1":"0")}catch(e){}
  if(hasG) ScrollTrigger.refresh();
});

/* ===================== DIALOGHI ===================== */
var bgEls=[$("#nav"),$("main"),$("#uscita")];
function setInert(on){bgEls.forEach(function(el){if(!el)return;if(on){el.setAttribute("inert","");el.setAttribute("aria-hidden","true")}else{el.removeAttribute("inert");el.removeAttribute("aria-hidden")}})}
function trapTab(e,box){if(e.key!=="Tab")return;var f=$$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea',box).filter(function(x){return x.offsetParent!==null});if(!f.length)return;var a=f[0],z=f[f.length-1];
  if(e.shiftKey&&(document.activeElement===a||document.activeElement===box)){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
$("#plan").addEventListener("keydown",function(e){trapTab(e,this)});
$("#expo").addEventListener("keydown",function(e){trapTab(e,this)});
var pg=$("#planGuide");
pg.addEventListener("click",function(){$("#guideBtn").click();pg.setAttribute("aria-pressed",document.body.classList.contains("guide"))});

/* ===================== TOAST ===================== */
var tt;
function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("show")},2200)}

/* ===================== CURSORE ===================== */
var cur=$(".cursor");
if(!RM && window.matchMedia("(pointer:fine)").matches){
  var cx=innerWidth/2,cy=innerHeight/2,tx2=cx,ty2=cy,cursorFrame=0;
  function moveCursor(){cursorFrame=0;cx+=(tx2-cx)*.2;cy+=(ty2-cy)*.2;cur.style.transform="translate3d("+cx+"px,"+cy+"px,0)";if(Math.abs(tx2-cx)+Math.abs(ty2-cy)>.1&&!document.hidden)cursorFrame=requestAnimationFrame(moveCursor)}
  addEventListener("mousemove",function(e){tx2=e.clientX;ty2=e.clientY;if(!cursorFrame)cursorFrame=requestAnimationFrame(moveCursor);
    var el=e.target.closest&&e.target.closest("[data-cursor]");
    if(el){cur.classList.add("big");$("b",cur).textContent=el.dataset.cursor}else{cur.classList.remove("big")}
  },{passive:true});
  cur.style.transform="translate3d("+cx+"px,"+cy+"px,0)";
  document.addEventListener("visibilitychange",function(){if(document.hidden&&cursorFrame){cancelAnimationFrame(cursorFrame);cursorFrame=0}});
}

/* ===================== MOSTRA MONOGRAFICA ===================== */
var expo=$("#expo"), lastOpener=null;
function openExpo(i){
  var w=WORKS[i]; seenWorks.add(i); updStats();
  var prev=(i-1+WORKS.length)%WORKS.length, next=(i+1)%WORKS.length;
  expo.innerHTML=
  '<div class="expo-bar"><span class="mono muted">Mostra Nº '+w.n+' — '+w.club+'</span><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pill mono" data-go="'+prev+'">← Precedente</button><button class="pill mono" data-go="'+next+'">Successiva →</button><button class="pill solid mono" data-close>Torna alla collezione ✕</button></div></div>'+
  '<div class="expo-hero"><div><span class="mono muted">'+w.n+' / '+String(WORKS.length).padStart(2,"0")+' — Football / Identity / Culture</span><h2 id="expoTitle" style="margin-top:18px">'+w.club+'</h2><p class="t">'+w.title+'</p><p class="muted" style="margin-top:22px;max-width:40ch;font-size:17px">'+w.phrase+'</p></div><div class="viewer">'+viewerHTML(w)+'</div></div>'+
  chap("01","The story","La storia dietro il design",'<p>'+w.story+'</p>')+
  chap("02","The colors","I colori dell’opera",'<div class="swatches">'+w.colors.map(function(c){return '<div class="sw"><i style="background:'+c[1]+'"></i><div><strong class="c" style="font-family:var(--f-display);font-size:13px;letter-spacing:.06em;text-transform:uppercase">'+c[0]+'</strong><p style="font-size:15px">'+c[2]+'</p></div></div>'}).join("")+'</div>')+
  chap("03","The symbol","Lo stemma sul cuore",'<div style="display:grid;gap:20px">'+crestHTML(w)+'<p>'+(w.symbol||'Lo stemma del club è sul cuore. Dall’altra parte del petto, il marchio Ballanqué.')+'</p></div>')+
  chap("04","The kit","La divisa",'<p>'+w.kit+'</p>'+(w.views.length>2?'<p class="mono muted" style="margin-top:14px">Maglia e pantaloncino, fronte e retro: scorrete il visore in alto.</p>':''))+
  photoChap(w)+
  '<div class="expo-end"><h3>This is<br>their identity.</h3><div class="expo-nav"><button class="pill mono" data-go="'+next+'">Mostra successiva: '+WORKS[next].title+' →</button><a class="pill solid mono" href="#commissiona" data-close-to="commissiona">Start a project →</a></div></div>';
  expo.classList.add("open"); setInert(true); document.documentElement.style.overflow="hidden"; expo.scrollTop=0;
  initViewer(w);
  setTimeout(function(){expo.focus()},50);
  if(hasG&&!RM){ gsap.from($$(".expo-hero > *",expo),{y:40,opacity:0,duration:1.1,stagger:.12,ease:"power3.out",delay:.45}); }
}
function allSlides(w){
  var v=w.views.map(function(x){return {src:x[0],a:x[1],b:x[2],p:x[3]==="p"}});
  (w.photos||[]).forEach(function(p){v.push({src:PH[p[0]],a:"Foto",b:p[1],p:true})});
  return v;
}
function photoChap(w){
  var v=allSlides(w), items=[];
  v.forEach(function(x,k){if(x.p)items.push('<button type="button" class="pthumb" data-slide="'+k+'" aria-label="Mostra nel visore: '+x.b+'"><img src="'+x.src+'" alt="'+w.club+', '+x.b+'" loading="lazy" decoding="async"><span class="mono">'+x.b+'</span></button>')});
  if(!items.length)return "";
  return chap("05","On the pitch","Le foto in campo",'<div class="pgrid">'+items.join("")+'</div>');
}
function viewerHTML(w){
  var v=allSlides(w), many=v.length>1;
  return '<div class="vtrack" tabindex="0" aria-roledescription="carosello" aria-label="Viste della divisa: usate le frecce per scorrere">'+
    v.map(function(x,k){return '<figure class="vslide'+(x.p?' photo':'')+'" aria-label="'+(k+1)+' di '+v.length+': '+x.a+', '+x.b+'"><img src="'+x.src+'" alt="'+w.club+', '+w.title+': '+x.a.toLowerCase()+', '+x.b.toLowerCase()+'" draggable="false" decoding="async"'+(k>1?' loading="lazy"':'')+'></figure>'}).join("")+'</div>'+
    '<div class="vbar"><div class="vcap"><b class="vname">'+v[0].a+' — '+v[0].b+'</b><span class="mono muted vcount">1 / '+v.length+'</span></div>'+
    (many?'<div class="vctrl"><button class="varr vprev" type="button" aria-label="Vista precedente">←</button><div class="vdots'+(v.length>6?' many':'')+'">'+v.map(function(x,k){return '<button type="button" aria-label="'+x.a+' '+x.b+'" aria-current="'+(k===0)+'" data-v="'+k+'"></button>'}).join("")+'</div><button class="varr vnext" type="button" aria-label="Vista successiva">→</button></div>':'')+'</div>';
}
function initViewer(w){
  var tr=$(".vtrack",expo); if(!tr)return;
  var data=allSlides(w), slides=$$(".vslide",tr), dots=$$(".vdots button",expo), prev=$(".vprev",expo), next=$(".vnext",expo), cur=0;
  function idx(){return Math.round(tr.scrollLeft/Math.max(1,tr.clientWidth))}
  function show(k){k=Math.max(0,Math.min(slides.length-1,k));tr.scrollTo({left:k*tr.clientWidth,behavior:RM?"auto":"smooth"})}
  function upd(){var k=idx();if(k===cur&&tr.dataset.ready)return;cur=k;tr.dataset.ready=1;var v=data[k];
    $(".vname",expo).textContent=v.a+" — "+v.b;$(".vcount",expo).textContent=(k+1)+" / "+data.length;
    dots.forEach(function(d,j){d.setAttribute("aria-current",j===k)});
    if(prev)prev.disabled=k===0; if(next)next.disabled=k===slides.length-1;}
  tr.addEventListener("scroll",function(){clearTimeout(tr._t);tr._t=setTimeout(upd,60)},{passive:true});
  if(prev)prev.addEventListener("click",function(){show(cur-1)});
  if(next)next.addEventListener("click",function(){show(cur+1)});
  dots.forEach(function(d){d.addEventListener("click",function(){show(+d.dataset.v)})});
  tr.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){e.preventDefault();show(cur+1)}if(e.key==="ArrowLeft"){e.preventDefault();show(cur-1)}});
  /* trascinamento col mouse */
  var down=false,sx=0,sl=0,moved=false;
  tr.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")return;down=true;moved=false;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add("drag");tr.setPointerCapture(e.pointerId)});
  tr.addEventListener("pointermove",function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>3)moved=true;tr.scrollLeft=sl-dx});
  function end(e){if(!down)return;down=false;tr.classList.remove("drag");var dx=e.clientX-sx;var k=Math.round(sl/tr.clientWidth);if(dx<-60)k++;else if(dx>60)k--;show(k)}
  tr.addEventListener("pointerup",end);tr.addEventListener("pointercancel",end);
  expo._show=show;
  upd();
}
function crestHTML(w){
  if(w.crestImg&&!w.crestPos)return '<img class="crest-photo'+(w.crestCut?' cut':'')+'" src="'+PH[w.crestImg]+'" alt="Stemma: '+w.club+'" loading="lazy" decoding="async">';
  if(w.crestImg)return '<div class="crest-zoom" role="img" aria-label="Dettaglio dello stemma: '+w.club+'" style="background-image:url('+PH[w.crestImg]+');background-size:260%;background-position:'+w.crestPos+'"></div>';
  return '<div class="crest-zoom" role="img" aria-label="Dettaglio dello stemma: '+w.club+'" style="background-image:url('+w.front+');background-size:500%;background-position:'+w.crest[0]+'% '+w.crest[1]+'%"></div>';
}
function chap(n,t,s,body){return '<section class="chap"><span class="mono" style="color:var(--ocher)">'+n+'</span><div><h3>'+t+'</h3><p class="mono muted" style="margin-top:10px">'+s+'</p></div><div>'+body+'</div></section>'}
function closeExpo(){expo.classList.remove("open");setInert(false);document.documentElement.style.overflow="";if(lastOpener)lastOpener.focus({preventScroll:true})}
expo.addEventListener("click",function(e){
  var g=e.target.closest("[data-go]"); if(g){openExpo(+g.dataset.go);return}
  var ps=e.target.closest("[data-slide]"); if(ps){var k=+ps.dataset.slide;expo.scrollTo({top:0,behavior:RM?"auto":"smooth"});setTimeout(function(){expo._show&&expo._show(k)},RM?0:350);return}
  if(e.target.closest("[data-close]")){closeExpo();return}
  var ct=e.target.closest("[data-close-to]"); if(ct){e.preventDefault();closeExpo();setTimeout(function(){$("#"+ct.dataset.closeTo).scrollIntoView({behavior:RM?"auto":"smooth"})},300)}
});
track.addEventListener("click",function(e){var w=e.target.closest(".work");if(w){lastOpener=w;openExpo(+w.dataset.i)}});
addEventListener("keydown",function(e){if(e.key==="Escape"){if(expo.classList.contains("open"))closeExpo();else if(plan.classList.contains("open"))closePlan()}});

/* ===================== MODALITÀ COLLEZIONE ===================== */
var coll=$("#collezione"), hTween=null, hSubs=[];
$$("[data-mode]").forEach(function(b){b.addEventListener("click",function(){
  var arch=b.dataset.mode==="archive";
  $$("[data-mode]").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  coll.classList.toggle("archive",arch);
  if(hasG){ setupHorizontal(); ScrollTrigger.sort(); ScrollTrigger.refresh(); }
  if(arch) $$(".work").forEach(function(w){w.classList.add("lit")});
})});
$$("[data-f]").forEach(function(b){b.addEventListener("click",function(){
  $$("[data-f]").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  $$(".work").forEach(function(w){w.hidden=!(b.dataset.f==="all"||(" "+w.dataset.tag+" ").indexOf(" "+b.dataset.f+" ")>-1)});
  if(hasG&&!RM){setupHorizontal();ScrollTrigger.refresh()}
  else{$$(".work:not([hidden])").forEach(function(w){w.classList.add("lit")})}
})});

/* ===================== PEOPLE: stampe ===================== */
var PR=[["L59","Prima del fischio","Atletico BMG, divisa home","50% 30%",0],["L60","Il profilo","Onde verdi e colletto bianco","50% 40%",0],["L55","La rimessa","Il numero 3, dalle spalle","50% 45%",0],["L56","In partita","Atletico BMG contro la maglia gialla","50% 72%",0],["L48","Home e away","Fucsia e onde verdi, fianco a fianco","50% 40%",2]];
var prints=$("#prints");
PR.forEach(function(p,i){
  var f=document.createElement("figure"); f.className="print"; f.style.margin="0"; f.dataset.w=p[4]; f.tabIndex=0; f.setAttribute("role","button"); f.setAttribute("aria-label","Apri la mostra: "+WORKS[p[4]].club+", "+WORKS[p[4]].title);
  f.innerHTML='<div class="ph" data-cursor="EXPLORE"><img src="'+PH[p[0]]+'" alt="'+p[1]+': '+p[2]+'" loading="lazy" decoding="async" style="object-position:'+p[3]+'"><span class="stamp mono">Foto '+(i+1)+'</span></div><figcaption><span class="c" style="font-family:var(--f-display);font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;display:block">'+p[1]+'</span><span class="t" style="font-family:var(--f-title);font-style:italic;font-size:18px">'+p[2]+'</span></figcaption>';
  f.addEventListener("click",function(){lastOpener=f;openExpo(+f.dataset.w)});
  f.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();lastOpener=f;openExpo(+f.dataset.w)}});
  prints.appendChild(f);
});
function paintPrints(){
  $$(".print canvas").forEach(function(c,i){
    var r=c.parentNode.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2);
    c.width=Math.max(1,r.width*dpr); c.height=Math.max(1,r.height*dpr); c.style.height=r.height+"px";
    var x=c.getContext("2d"), W=c.width, H=c.height;
    var tones=[["#2a1d18","#8a3324"],["#1d2421","#0e6b5d"],["#2a2118","#c98a4b"],["#221815","#8a3324"],["#1c201d","#0e6b5d"]][i%5];
    var g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,tones[1]); g.addColorStop(1,tones[0]);
    x.fillStyle=g; x.fillRect(0,0,W,H);
    x.globalAlpha=.18; for(var k=0;k<9;k++){x.fillStyle=k%2?"#000":"#ead9bd";x.beginPath();x.ellipse(W*(.2+.6*Math.sin(k*3.1+i)),H*(.3+.5*Math.cos(k*1.7+i)),W*.35,H*.12,k,0,7);x.fill()}
    x.globalAlpha=1; var id=x.getImageData(0,0,W,H),d2=id.data;
    for(var q=0;q<d2.length;q+=4){var n=(Math.random()-.5)*34;d2[q]+=n;d2[q+1]+=n;d2[q+2]+=n}
    x.putImageData(id,0,0);
  });
}

/* ===================== ARCHIVIO ===================== */
var TILES=[["Clubs","I club, le loro origini e ciò che rappresentano.","#collezione","Vai alla collezione"],["People","Giocatori, allenatori, tifosi: chi tiene in vita il club.","#persone","Vai alla sala People"],["Territories","Luoghi, paesaggi e architetture che entrano nelle maglie.",2,"Apri la mostra Away"],["Design","Colori, pattern e stemmi: come nasce il linguaggio visivo.","#studio","Vai allo Studio"],["Stories","Le storie dietro ogni progetto.",0,"Apri la mostra Home"],["Culture","Il calcio come cultura, oltre il risultato.","#manifesto","Vai al manifesto"]];
var tilesEl=$("#tiles");
TILES.forEach(function(t,i){var b=document.createElement(typeof t[2]==="string"?"a":"button");b.className="tile";b.dataset.cursor="VIEW";
  if(typeof t[2]==="string"){b.href=t[2]}else{b.type="button";b.addEventListener("click",function(){lastOpener=b;openExpo(t[2])})}
  b.innerHTML='<span class="mono">'+String(i+1).padStart(2,"0")+'</span><span class="tile-body"><h3>'+t[0]+'</h3><p>'+t[1]+'</p></span><span class="go">'+t[3]+' →</span>';
  tilesEl.appendChild(b)});



/* ===================== SALA 10: DAL CAMPO ===================== */
var GAL=[[6,"Cremonese","Maglia a righe, 2026",["C1","C2","C5","C3","C4","C6","C7","C8"]],
         [4,"Cremonese","Maglia azzurra, 2026",["A1","A2"]],
         [5,"Le Mie Gambe Bologna","BFL 2024 — Edizione speciale",["O1","O2","O3","B1","B3","B2","B5","B6","B4"]]];
var galEl=$("#gal");
function slideOf(w,key){var v=allSlides(WORKS[w]);for(var k=0;k<v.length;k++){if(v[k].src===PH[key])return k}return 0}
function capOf(w,key){var v=allSlides(WORKS[w]),k=slideOf(w,key);return v[k].a==="Foto"?v[k].b:v[k].a+" — "+v[k].b}
GAL.forEach(function(g){
  var sec=document.createElement("div");sec.className="gal-group";
  sec.innerHTML='<div class="gal-head"><h3><span class="mono">'+esc(g[1])+'</span>'+esc(g[2])+'</h3><button type="button" class="pill mono" data-open="'+g[0]+'">Apri la mostra →</button></div><div class="gal-grid">'+
    g[3].map(function(key){var c=capOf(g[0],key);return '<button type="button" class="gal-item" data-w="'+g[0]+'" data-k="'+key+'" aria-label="Apri nella mostra: '+esc(g[1])+', '+esc(c)+'"><img src="'+PH[key]+'" alt="'+esc(g[1])+', '+esc(g[2])+': '+esc(c)+'" loading="lazy" decoding="async"><span class="mono">'+esc(c)+'</span></button>'}).join("")+'</div>';
  galEl.appendChild(sec);
});
galEl.addEventListener("click",function(e){
  var o=e.target.closest("[data-open]");if(o){lastOpener=o;openExpo(+o.dataset.open);return}
  var it=e.target.closest(".gal-item");if(!it)return;
  lastOpener=it;var w=+it.dataset.w,k=slideOf(w,it.dataset.k);openExpo(w);
  setTimeout(function(){expo._show&&expo._show(k)},120);
});

/* ===================== STUDIO: la fase al centro si illumina ===================== */
var phaseIO=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("on",e.isIntersecting)})},{rootMargin:"-38% 0px -38% 0px"});
$$(".phase").forEach(function(p){phaseIO.observe(p)});

/* ===================== SOGLIE TRA LE SALE ===================== */
[["collezione","03","The Collection"],["persone","07","People"],["curatore","08","Il Curatore"],["commissiona","09","La sala vuota"],["campo","10","Dal campo"]].forEach(function(d){
  var sec=$("#"+d[0]); if(!sec)return;
  var el=document.createElement("div"); el.className="door wrap"; el.setAttribute("aria-hidden","true");
  el.innerHTML='<i></i>';
  sec.parentNode.insertBefore(el,sec);
});
var doorIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");doorIO.unobserve(e.target)}})},{rootMargin:"0px 0px -12% 0px"});
$$(".door").forEach(function(d){RM?d.classList.add("in"):doorIO.observe(d)});

/* ===================== STUDIO: visual ===================== */
$("#vis5").innerHTML='<img src="'+PH.L52+'" alt="Giocatori dell\'Atletico BMG entrano in campo" loading="lazy" decoding="async">';
$("#vis2").innerHTML='<svg viewBox="0 0 200 120"><g fill="none" stroke="#8a3324" stroke-width="1.2">'+[0,1,2,3,4,5,6].map(function(k){return '<path d="M0 '+(20+k*14)+' C 50 '+(5+k*14)+', 80 '+(40+k*12)+', 120 '+(18+k*14)+' S 180 '+(30+k*13)+', 200 '+(14+k*14)+'"/>'}).join("")+'</g><circle cx="122" cy="52" r="5" fill="#0e6b5d"/><text x="130" y="48" font-family="IBM Plex Mono" font-size="7" fill="#1a1311">IL CAMPO</text></svg>';
$("#vis4").innerHTML=shirt({base:"#0e6b5d",trim:"#c98a4b",accent:"#c98a4b",pattern:"greca",crest:"…",motto:"PROVA 03"}).replace('<svg ','<svg style="filter:drop-shadow(0 18px 24px rgba(26,19,17,.25))" ');


/* ===================== COMMISSIONA ===================== */
var f={club:$("#fClub"),city:$("#fCity"),year:$("#fYear"),c1:$("#fC1"),c2:$("#fC2"),pat:$("#fPat"),story:$("#fStory"),contact:$("#fContact")};
var titles={chain:"Il legame",greca:"Pietra e confine",diag:"Il corso del fiume",glyph:"Numeri antichi",spots:"Istinto"};
function hexOk(h){return /^#[0-9a-f]{6}$/i.test(h)?h:"#0e6b5d"}
function hexA(h,a){var v=parseInt(h.slice(1),16);return "rgba("+(v>>16&255)+","+(v>>8&255)+","+(v&255)+","+a+")"}
function initialsOf(s){return s.split(/\s+/).filter(function(w){return w.length>2||/^[A-Z]/.test(w)}).map(function(w){return w[0]}).join("").slice(0,3)||s.slice(0,2)}
var rT;
function renderYours(){
  var club=f.club.value.trim();
  $("#lbClub").textContent=club||"Il tuo club";
  $("#lbTitle").textContent=titles[f.pat.value]+", "+(new Date().getFullYear()+1);
  $("#lbMeta").textContent=(f.city.value.trim()||"Città")+" — "+(f.year.value.trim()?"Fondato nel "+f.year.value.trim():"Anno di fondazione");
  $("#emptyRoom").style.setProperty("--glow",hexA(f.c2.value,.3));
  clearTimeout(rT); rT=setTimeout(function(){
    var y=$("#yourShirt");
    y.innerHTML=shirt({club:club,base:hexOk(f.c1.value),trim:hexOk(f.c2.value),accent:hexOk(f.c2.value),pattern:f.pat.value,crest:club?initialsOf(club).toUpperCase():"?",motto:(f.city.value||"").toUpperCase()});
    y.firstChild.style.width="72%";
    var any=club||f.city.value||f.year.value||f.story.value;
    y.style.opacity=any?1:0; $("#wait").style.opacity=any?0:1;
  },120);
}
Object.keys(f).forEach(function(k){f[k].addEventListener("input",renderYours)});
f.year.addEventListener("input",function(){f.year.value=f.year.value.replace(/\D/g,"").slice(0,4)});
renderYours();
$("#comForm").addEventListener("submit",function(e){
  e.preventDefault();
  var err=$("#formErr");
  f.club.removeAttribute("aria-invalid");f.contact.removeAttribute("aria-invalid");
  if(!f.club.value.trim()){err.textContent="Scrivete il nome del club: è il titolo dell'opera.";f.club.setAttribute("aria-invalid","true");f.club.focus();return}
  var ct=f.contact.value.trim();
  var okMail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ct), okTel=/^\+?[\d\s().-]{7,20}$/.test(ct)&&ct.replace(/\D/g,"").length>=7;
  if(!ct){err.textContent="Lasciate un contatto, così possiamo rispondervi.";f.contact.setAttribute("aria-invalid","true");f.contact.focus();return}
  if(!okMail&&!okTel){err.textContent="Il contatto non sembra un'email o un numero di telefono valido.";f.contact.setAttribute("aria-invalid","true");f.contact.focus();return}
  err.textContent="";
  $("#sheet").textContent=
"SCHEDA OPERA — BALLANQUÉ\n"+
"Club: "+f.club.value.trim()+"\n"+
"Città / territorio: "+(f.city.value.trim()||"—")+"\n"+
"Fondazione: "+(f.year.value.trim()||"—")+"\n"+
"Colori: "+f.c1.value+" + "+f.c2.value+"\n"+
"Segno del territorio: "+f.pat.options[f.pat.selectedIndex].text+"\n"+
"La nostra storia: "+(f.story.value.trim()||"—")+"\n"+
"Contatto: "+f.contact.value.trim()+"\n"+
"Biglietto visitatore: "+ticket;
  $("#mailBtn").href="mailto:"+CONTACT_EMAIL+"?subject="+encodeURIComponent("Nuovo progetto — "+f.club.value.trim())+"&body="+encodeURIComponent($("#sheet").textContent);
  $("#comForm").hidden=true; $("#done").hidden=false; $("#done").setAttribute("tabindex","-1"); $("#done").focus({preventScroll:false});
  if(hasG&&!RM) gsap.fromTo("#yourShirt",{scale:.94},{scale:1,duration:1.2,ease:"power3.out"});
  if($("#lbTitle").textContent.indexOf("scheda pronta")<0)$("#lbTitle").textContent=$("#lbTitle").textContent+" — scheda pronta";
});
$("#editBtn").addEventListener("click",function(){$("#done").hidden=true;$("#comForm").hidden=false;renderYours();f.club.focus()});
$("#mailBtn").addEventListener("click",function(){toast("Si apre il vostro programma di posta: premete Invia per completare")});
$("#copyBtn").addEventListener("click",function(){
  var txt=$("#sheet").textContent;
  try{navigator.clipboard.writeText(txt).then(function(){toast("Scheda copiata")},sel)}catch(e){sel()}
  function sel(){var r=document.createRange();r.selectNodeContents($("#sheet"));var s=getSelection();s.removeAllRanges();s.addRange(r);toast("Testo selezionato: copiatelo con Ctrl/Cmd + C")}
});

/* ===================== PORTE D'INGRESSO ===================== */
var seen=false; try{seen=sessionStorage.getItem("bq-in")==="1"}catch(e){}
if(!RM&&hasG&&!seen){
  var doors=document.createElement("div"); doors.className="doors"; doors.setAttribute("role","button"); doors.setAttribute("aria-label","Entra nel museo"); doors.tabIndex=0;
  doors.innerHTML='<div class="leaf"></div><div class="leaf"></div><div class="seal"><i class="logo lit"></i><span class="mono muted">Ballanqué™ Museum</span><span class="mono" style="color:var(--ocher)">Entra →</span><button class="mono" id="skip" style="pointer-events:auto;background:none;border:0;color:var(--muted);cursor:pointer;margin-top:30px;text-decoration:underline">Salta l\'introduzione</button></div>';
  document.body.appendChild(doors);
  var opened=false;
  var openDoors=function(){ if(opened)return; opened=true;
    try{sessionStorage.setItem("bq-in","1")}catch(e){}
    var l=$$(".leaf",doors);
    gsap.timeline({onComplete:function(){doors.remove()}})
      .to(".doors .seal",{opacity:0,duration:.4})
      .to(l[0],{xPercent:-100,duration:1.4,ease:"power4.inOut"},.2)
      .to(l[1],{xPercent:100,duration:1.4,ease:"power4.inOut"},.2);
    heroIn(.7);
  };
  doors.addEventListener("click",openDoors);
  doors.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openDoors()}});
  setTimeout(openDoors,2600);
}else if(hasG&&!RM){ heroIn(.1) }

function heroIn(delay){
  var img="#heroShirt", rows="#heroTitle .row > span";
  gsap.set(img,{opacity:0,scale:1.14,filter:"brightness(1) saturate(1)"});
  gsap.set(rows,{yPercent:110});
  gsap.set(".hero-logo,.hero-foot",{opacity:0});
  gsap.timeline({delay:delay})
    .to(img,{opacity:1,scale:1,duration:1.8,ease:"power3.out"})
    .to(img,{filter:"brightness(.42) saturate(.85)",duration:1.4,ease:"power2.inOut"},"+=.5")
    .to(rows,{yPercent:0,duration:1.1,stagger:.38,ease:"power4.out"},"<.15")
    .to(".hero-logo",{opacity:1,duration:1},"-=.6")
    .to(".hero-foot",{opacity:1,duration:.8},"<.2");
}

/* ===================== SALA 02: LENTE ===================== */
/* punti focali in pixel dell'immagine 1695×1385: x, y, ingrandimento */
var IW=1695, IH=1385;
var FOCI=[[847,692,1],[840,640,1.7],[1111,482,4],[550,480,4.8],[850,135,2.6],[575,255,5.5],[1575,430,3.2]];
var Z=FOCI.map(function(f){var s2=f[2],u=f[0]/IW-.5,v=f[1]/IH-.5;return {s:s2,x:-s2*u*100,y:-s2*v*100}});
var steps=$$("#steps li"), N=Z.length, lcIdx=0, tapMode=false;
var zoomerEl=$("#zoomer"), lensEl=$(".lens"), chipRow=$("#lensChips"), chips=$$("#lensChips button");
function markStep(k){
  steps.forEach(function(li,j){li.classList.toggle("cur",j===k)});
  var sn=$("#stepNo"); if(sn)sn.textContent=String(k+1).padStart(2,"0")+" / "+String(N).padStart(2,"0");
  chips.forEach(function(c,j){c.setAttribute("aria-current",j===k)});
  var c=chips[k]; if(c&&tapMode){chipRow.scrollTo({left:c.offsetLeft-chipRow.clientWidth/2+c.offsetWidth/2,behavior:RM?"auto":"smooth"})}
}
function goStep(k){
  lcIdx=(k+N)%N; var z=Z[lcIdx];
  zoomerEl.style.transform="translate("+z.x+"%,"+z.y+"%) scale("+z.s+")";
  $("#mag").textContent="× "+z.s.toFixed(1);
  markStep(lcIdx);
}
function tapOn(){tapMode=true;document.body.classList.add("lens-tap");goStep(lcIdx)}
function tapOff(){tapMode=false;document.body.classList.remove("lens-tap");zoomerEl.style.transform=""}
$("#lensPrev").addEventListener("click",function(){goStep(lcIdx-1)});
$("#lensNext").addEventListener("click",function(){goStep(lcIdx+1)});
chips.forEach(function(c){c.addEventListener("click",function(){goStep(+c.dataset.k)})});
(function(){
  var sx=0,sy=0,on=false;
  lensEl.addEventListener("pointerdown",function(e){if(!tapMode)return;on=true;sx=e.clientX;sy=e.clientY});
  lensEl.addEventListener("pointerup",function(e){if(!tapMode||!on)return;on=false;var dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.2){goStep(lcIdx+(dx<0?1:-1))}
    else if(Math.abs(dx)<10&&Math.abs(dy)<10){goStep(lcIdx+1)}});
  lensEl.addEventListener("pointercancel",function(){on=false});
})();

/* ===================== SCROLL: MOTION ===================== */
if(hasG&&!RM){
  var mm=gsap.matchMedia();
  ScrollTrigger.config({ignoreMobileResize:true});

  /* ingresso: la camera arretra */
  gsap.to(".hero-art",{yPercent:10,scale:.9,ease:"none",scrollTrigger:{trigger:".threshold",start:"top top",end:"bottom top",scrub:true}});
  gsap.to(".hero-type",{yPercent:-30,opacity:0,ease:"none",scrollTrigger:{trigger:".threshold",start:"top top",end:"bottom top",scrub:true}});

  /* foyer: manifesto a tutto schermo, una frase alla volta */
  var kin=$("#kin"), words=$$(".ml",kin), kinIdx=0;
  gsap.set(words,{opacity:0});
  gsap.set(words[0],{opacity:1});
  function showWord(i,dir){
    var old=words[kinIdx], nw=words[i]; kinIdx=i;
    words.forEach(function(w){if(w!==old&&w!==nw){gsap.killTweensOf(w);gsap.set(w,{opacity:0,scale:1,filter:"blur(0px)"})}});
    gsap.killTweensOf([old,nw]);
    words.forEach(function(w){w.classList.toggle("cur",w===nw)});
    gsap.to(old,{opacity:0,scale:dir>0?1.08:.94,filter:"blur(8px)",duration:.4,ease:"power2.in"});
    gsap.fromTo(nw,{opacity:0,scale:dir>0?.94:1.08,filter:"blur(8px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:.6,delay:.15,ease:"power3.out"});
  }
  ScrollTrigger.create({trigger:"#foyer",start:"top top",end:"+="+(words.length*55)+"%",pin:true,scrub:true,anticipatePin:1,refreshPriority:3,
    onUpdate:function(s2){var i=Math.min(words.length-1,Math.floor(s2.progress*words.length*.999));if(i!==kinIdx)showWord(i,i>kinIdx?1:-1)}});

  /* sala I: su computer e su telefono la lente segue lo scroll */
  mm.add("(min-width: 0px)",function(){
    tapOff();
    var SEG=1.6;
    gsap.set("#zoomer",{scale:1,xPercent:0,yPercent:0});
    var ztl=gsap.timeline({scrollTrigger:{trigger:"#canvasStage",start:"top top",end:"+="+(N*(innerWidth<821?55:70))+"%",pin:true,scrub:1,refreshPriority:2,invalidateOnRefresh:true,
      onUpdate:function(){var t=ztl.time(),i=t<.5?0:(Math.floor((t-.5)/SEG)+1)%N;markStep(i)}}});
    Z.slice(1).concat([Z[0]]).forEach(function(z){ztl.to("#zoomer",{scale:z.s,xPercent:z.x,yPercent:z.y,duration:1,ease:"power2.inOut",onUpdate:function(){$("#mag").textContent="× "+gsap.getProperty("#zoomer","scale").toFixed(1)}}).to({},{duration:SEG-1})});
    return function(){ztl.scrollTrigger&&ztl.scrollTrigger.kill();ztl.kill();gsap.set("#zoomer",{clearProps:"all"})};
  });
  ScrollTrigger.sort();

  /* collezione */
  mm.add("(min-width: 821px)",function(){ setupHorizontal(); return function(){ hSubs.forEach(function(t){t.kill()}); hSubs=[]; if(hTween){hTween.scrollTrigger&&hTween.scrollTrigger.kill();hTween.kill();hTween=null} gsap.set(track,{x:0}) } });
  mm.add("(max-width: 820px)",function(){
    var wall=$("#wall");
    var onS=function(){var mid=wall.scrollLeft+wall.clientWidth/2;var ws=$$(".work");var best=0,bd=1e9;ws.forEach(function(w,i){var c=w.offsetLeft+w.offsetWidth/2,d5=Math.abs(c-mid);if(d5<bd){bd=d5;best=i}});ws.forEach(function(w,i){w.classList.toggle("lit",i===best)});seenWorks.add(best);setCount(best)};
    wall.addEventListener("scroll",onS,{passive:true}); onS();
    return function(){wall.removeEventListener("scroll",onS)};
  });


  /* studio: la linea si disegna */
  gsap.fromTo("#spine",{"--p":0},{"--p":1,ease:"none",scrollTrigger:{trigger:"#phases",start:"top 70%",end:"bottom 60%",scrub:true}});

  /* people: stampe che entrano */
  $$(".print").forEach(function(p,i){gsap.from(p,{y:80+i*12,opacity:0,duration:1.3,ease:"power3.out",scrollTrigger:{trigger:p,start:"top 90%"}})});
  $$(".print .ph").forEach(function(p){gsap.to(p,{yPercent:-6,ease:"none",scrollTrigger:{trigger:p,scrub:true}})});

  /* archivio */
  gsap.from(".tile",{opacity:0,y:24,stagger:.06,duration:.8,ease:"power3.out",scrollTrigger:{trigger:"#tiles",start:"top 85%"}});


  fitFinale();

  /* commissione: magnetismo della CTA */
  var cta=$(".cta");
  if(matchMedia("(pointer:fine)").matches){
    cta.addEventListener("mousemove",function(e){var r=cta.getBoundingClientRect();gsap.to(cta,{x:(e.clientX-r.left-r.width/2)*.08,y:(e.clientY-r.top-r.height/2)*.25,duration:.4})});
    cta.addEventListener("mouseleave",function(){gsap.to(cta,{x:0,y:0,duration:.6,ease:"elastic.out(1,.5)"})});
  }

  /* sezioni generiche */
  $$(".room-head").forEach(function(h){gsap.from(h,{opacity:0,y:20,duration:.9,scrollTrigger:{trigger:h,start:"top 88%"}})});

  addEventListener("load",function(){ScrollTrigger.refresh();paintPrints()});
}else{
  $$(".work").forEach(function(w){w.classList.add("lit")});
  tapOn();
  $("#kin").classList.add("static");
  document.body.classList.add("no-anim");
}

function fitFinale(){
  var fl=$("#finaleLines"); if(!fl)return;
  var lines=$$(":scope > span",fl), avail=fl.clientWidth*.94;
  lines.forEach(function(l){l.style.fontSize="";var base=parseFloat(getComputedStyle(l).fontSize),w=l.scrollWidth;if(w>avail)l.style.fontSize=Math.floor(base*avail/w)+"px"});
}
function setCount(i){$("#cnt").textContent=String(i+1).padStart(2,"0")+" / "+String(WORKS.length).padStart(2,"0");$("#cntBar").style.width=((i+1)/WORKS.length*100)+"%";updStats()}
function setupHorizontal(){
  if(!hasG||RM)return;
  hSubs.forEach(function(t){t.kill()}); hSubs=[];
  if(hTween){hTween.scrollTrigger&&hTween.scrollTrigger.kill();hTween.kill();hTween=null;gsap.set(track,{x:0})}
  if(coll.classList.contains("archive")||!matchMedia("(min-width: 821px)").matches)return;
  var dist=function(){return Math.max(0,track.scrollWidth-innerWidth)};
  hTween=gsap.to(track,{x:function(){return -dist()},ease:"none",scrollTrigger:{trigger:"#wallStage",start:"top top",end:function(){return "+="+dist()},pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1,refreshPriority:1}});
  var ws=$$(".work:not([hidden])");
  ws.forEach(function(w){var i=+w.dataset.i;
    hSubs.push(ScrollTrigger.create({trigger:w,containerAnimation:hTween,start:"left 72%",end:"right 28%",
      onToggle:function(s){w.classList.toggle("lit",s.isActive);if(s.isActive){seenWorks.add(i);setCount(i)}}}));
    var pt2=gsap.fromTo($(".kit",w),{rotate:-4,yPercent:6},{rotate:2,yPercent:-4,ease:"none",scrollTrigger:{trigger:w,containerAnimation:hTween,start:"left right",end:"right left",scrub:true}});
    hSubs.push(pt2.scrollTrigger);
  });
  ScrollTrigger.sort();
}

if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){fitFinale();if(hasG)ScrollTrigger.refresh()});
addEventListener("resize",function(){fitFinale()});
if(!hasG||RM) paintPrints();
setTimeout(paintPrints,400);
updStats();
})();
