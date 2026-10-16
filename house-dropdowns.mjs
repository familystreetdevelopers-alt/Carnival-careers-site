import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const houses = path.join(dist, "houses.html");
const homepage = path.join(dist, "index.html");
const ironmanSource = path.resolve("iron-man-house.html");
const ironmanDist = path.join(dist, "iron-man-house.html");

for (const p of [houses, homepage, ironmanSource]) {
  if (!fs.existsSync(p)) throw new Error("Houses navigation source missing: " + p);
}
const originalHouses = fs.readFileSync(houses, "utf8");
const originalHomepage = fs.readFileSync(homepage, "utf8");
const originalIronMan = fs.readFileSync(ironmanSource, "utf8");

const marker = '<a class="active" href="/houses.html">The Houses</a>';
const styleClose = '</style></head>';
if (!originalHouses.includes(marker) || !originalHouses.includes(styleClose) || !originalHouses.includes('id="autoTour"')) {
  throw new Error("The approved CaveMansion walkthrough changed; refusing to overwrite.");
}
if (!originalHomepage.includes('cc-houses-nav-patch')) {
  throw new Error("Home navigation structure changed; refusing unsafe modification.");
}
if (!originalIronMan.includes('<title>Iron Man House') || !originalIronMan.includes('id="view-main"')) {
  throw new Error("Iron Man House source incomplete.");
}

const links = '<a href="/houses.html">CaveMansion</a><a href="/iron-man-house.html">Iron Man House</a>';
const housesCss = [
  '.cc-houses-parent{position:relative;display:inline-flex;align-items:center}',
  '.cc-houses-parent>a{white-space:nowrap}',
  '.cc-houses-toggle{padding:9px 9px 9px 2px;border:0;background:none;color:#ffbd48;font-size:18px;cursor:pointer}',
  '.cc-houses-popover{display:none;position:absolute;left:0;top:100%;min-width:205px;padding:7px;border:1px solid #44414b;border-radius:15px;background:#191921;box-shadow:0 14px 42px #000b;z-index:90}',
  '.cc-houses-popover a{display:block!important;text-decoration:none!important;padding:12px!important;border-radius:10px!important;color:#fff!important;font-size:13px!important;font-weight:850!important}',
  '.cc-houses-popover a:hover{background:#48222d!important}',
  '.cc-houses-parent:hover .cc-houses-popover,.cc-houses-parent:focus-within .cc-houses-popover,.cc-houses-parent[data-open=true] .cc-houses-popover{display:block}',
  '@media(max-width:620px){.cc-houses-popover{right:0;left:auto}.cc-houses-popover a{display:block!important}}'
].join('\n');
const housesMenu = '<div class="cc-houses-parent" data-cc-houses-menu>' + marker + '<button type="button" class="cc-houses-toggle" aria-label="Show house pages" aria-expanded="false">⌄</button><div class="cc-houses-popover">' + links + '</div></div>';
const toggleScript = '<script id="cc-houses-two-dropdown-controls">(() => {' +
  'const menu=document.querySelector("[data-cc-houses-menu]");if(!menu)return;' +
  'const toggle=menu.querySelector(".cc-houses-toggle");if(!toggle)return;' +
  'toggle.addEventListener("click",()=>{const open=menu.getAttribute("data-open")==="true";menu.setAttribute("data-open",String(!open));toggle.setAttribute("aria-expanded",String(!open))});' +
  'document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.removeAttribute("data-open");toggle.setAttribute("aria-expanded","false")}});' +
  'document.addEventListener("click",e=>{if(!menu.contains(e.target)){menu.removeAttribute("data-open");toggle.setAttribute("aria-expanded","false")}});' +
  '})();</script>';

const updatedHouses = originalHouses
  .replace(styleClose, housesCss + '\n' + styleClose)
  .replace(marker, housesMenu)
  .replace('</body>', toggleScript + '</body>');

const homeStyle = '<style id="cc-houses-two-dropdown-style">' +
  '[data-cc-houses-nav]>.drop{min-width:205px}' +
  '.cc-houses-mobile-dropdown{background:rgba(255,255,255,.08);border-radius:12px;padding:0;color:#e8eef7;font-weight:700;font-size:13px}' +
  '.cc-houses-mobile-dropdown summary{cursor:pointer;padding:12px}' +
  '.cc-houses-mobile-dropdown a{display:block;background:transparent!important;padding:10px 18px!important}' +
  '</style>';
const homeScript = '<script id="cc-houses-two-dropdown-navigation">(() => {' +
  'const install=()=>{' +
  'const nav=document.querySelector("nav[aria-label=Primary]");' +
  'const house=nav&&nav.querySelector("[data-cc-houses-nav]");' +
  'if(house&&!house.querySelector(".cc-houses-drop")){' +
  'const drop=document.createElement("div");drop.className="drop cc-houses-drop";' +
  'drop.innerHTML=' + JSON.stringify(links) + ';house.appendChild(drop);' +
  '}' +
  'document.querySelectorAll("[data-cc-houses-mobile]").forEach(a=>{' +
  'const details=document.createElement("details");details.className="cc-houses-mobile-dropdown";' +
  'details.innerHTML="<summary>The Houses ▾</summary>"+' + JSON.stringify(links) + ';a.replaceWith(details);' +
  '});' +
  '};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();' +
  '})();</script>';
if (!originalHomepage.includes("</head>") || !originalHomepage.includes("</body>")) {
  throw new Error("Home page document changed; refusing unsafe modification.");
}
const updatedHome = originalHomepage
  .replace("</head>", homeStyle + "\n</head>")
  .replace("</body>", homeScript + "\n</body>");

const validation = [
  updatedHouses.includes('id="autoTour"'),
  updatedHouses.includes('class="cc-houses-parent"'),
  updatedHouses.includes('>CaveMansion</a><a href="/iron-man-house.html">Iron Man House'),
  updatedHome.includes('cc-houses-two-dropdown-navigation'),
  originalIronMan.includes('35 Tournament Drive'),
];
if (validation.some(v => !v)) throw new Error("Houses dropdown verification failed.");
fs.writeFileSync(houses, updatedHouses, "utf8");
fs.writeFileSync(homepage, updatedHome, "utf8");
fs.writeFileSync(ironmanDist, originalIronMan, "utf8");
console.log("HOUSES_TWO_DROPDOWNS_VERIFIED; CaveMansion preserved; Iron Man House copied.");
