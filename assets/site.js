
(function(){
"use strict";
var IMG=["assets/image-06.webp","assets/image-07.webp","assets/image-08.webp","assets/image-09.webp","assets/image-10.webp","assets/image-11.webp","assets/image-12.webp","assets/image-13.webp"];
var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var hasG = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
if(hasG) gsap.registerPlugin(ScrollTrigger);
var imageRefresh=0;document.addEventListener("load",function(e){if(hasG&&e.target.tagName==="IMG"){clearTimeout(imageRefresh);imageRefresh=setTimeout(function(){ScrollTrigger.refresh()},150)}},true);
var $ = function(s,c){return (c||document).querySelector(s)};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

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
WORKS.forEach(function(w,i){
  var b=document.createElement("button");
  b.type="button"; b.className="work "+w.size+" "+(w.cls||""); b.dataset.i=i; b.dataset.tag=w.tag; b.dataset.cursor="EXPLORE";
  b.setAttribute("aria-label","Apri la mostra: "+w.club+", "+w.title);
  b.innerHTML=kitFrame(w)+
    '<div class="label"><span class="mono muted">'+w.n+' / '+String(WORKS.length).padStart(2,"0")+'</span>'+(i===0||WORKS[i-1].club!==w.club?'<span class="c">'+w.club+'</span>':'<span class="c">'+w.club+'</span>')+'<span class="t">'+w.title+'</span><span class="note" style="margin-top:8px">'+w.phrase+'</span></div>';
  track.appendChild(b);
});

/* Navigazione essenziale, senza statistiche o percorso obbligato. */
var nav=$("#nav"), plan=$("#plan"), planBtn=$("#planBtn");
window.addEventListener("scroll",function(){nav.classList.toggle("solid",window.scrollY>60)},{passive:true});
function openPlan(){plan.classList.add("open");setInert(true);planBtn.setAttribute("aria-expanded","true");document.documentElement.style.overflow="hidden";var first=$("a",plan);if(first)first.focus()}
function closePlan(){plan.classList.remove("open");setInert(false);planBtn.setAttribute("aria-expanded","false");document.documentElement.style.overflow="";planBtn.focus()}
planBtn.addEventListener("click",openPlan);
$("#planClose").addEventListener("click",closePlan);
$$("#plan a[href^='#']").forEach(function(a){a.addEventListener("click",function(e){var target=$(a.getAttribute("href"));if(!target)return;e.preventDefault();closePlan();target.scrollIntoView({behavior:RM?"auto":"smooth"});target.setAttribute("tabindex","-1");target.focus({preventScroll:true})})});
if("IntersectionObserver" in window){var navIO=new IntersectionObserver(function(entries){entries.forEach(function(e){if(!e.isIntersecting)return;var id=e.target.dataset.navSection;$$("[data-nav-link]").forEach(function(a){var active=a.dataset.navLink===id;a.classList.toggle("on",active);if(active)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")})})},{rootMargin:"-15% 0px -55% 0px"});$$("[data-nav-section]").forEach(function(section){navIO.observe(section)})}


/* ===================== DIALOGHI ===================== */
var bgEls=[$("#nav"),$("main"),$("#uscita")];
function setInert(on){bgEls.forEach(function(el){if(!el)return;if(on){el.setAttribute("inert","");el.setAttribute("aria-hidden","true")}else{el.removeAttribute("inert");el.removeAttribute("aria-hidden")}})}
function trapTab(e,box){if(e.key!=="Tab")return;var f=$$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea',box).filter(function(x){return x.offsetParent!==null});if(!f.length)return;var a=f[0],z=f[f.length-1];
  if(e.shiftKey&&(document.activeElement===a||document.activeElement===box)){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
$("#plan").addEventListener("keydown",function(e){trapTab(e,this)});
$("#expo").addEventListener("keydown",function(e){trapTab(e,this)});
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
  var w=WORKS[i];
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

/* Filtri della collezione: nessuno spostamento forzato della pagina. */
$$("[data-f]").forEach(function(b){b.addEventListener("click",function(){
  $$("[data-f]").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
  $$(".work").forEach(function(w){w.hidden=!(b.dataset.f==="all"||(" "+w.dataset.tag+" ").indexOf(" "+b.dataset.f+" ")>-1)});
  if(hasG)ScrollTrigger.refresh();
})});

/* Ingresso diretto: animazione hero senza schermata o attesa iniziale. */
if(hasG&&!RM){ heroIn(0) }

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

/* Lo scorrimento resta nativo: nessuna sezione viene fissata da ScrollTrigger. */
tapOn();
$$(".work").forEach(function(work){work.classList.add("lit")});
if(hasG&&!RM){
  ScrollTrigger.config({ignoreMobileResize:true});
  $$(".room-head,.studio-intro,.phase,.work,.canvas-copy,.contact-grid").forEach(function(el){
    gsap.from(el,{y:28,opacity:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true}});
  });
  addEventListener("load",function(){ScrollTrigger.refresh()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ScrollTrigger.refresh()});
}
})();
