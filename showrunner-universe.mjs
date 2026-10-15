import fs from "node:fs";
import path from "node:path";
const dist = path.resolve("dist");
const index = path.join(dist,"index.html");
for (const p of ["the-story.html","team-desk.html","pembroke-acquisition.html"]) {
 const from=path.resolve(p);
 if(!fs.existsSync(from))throw new Error("Required unified Story source missing: "+p);
 fs.copyFileSync(from,path.join(dist,p));
}
if(!fs.existsSync(index))throw new Error("Canonical site missing");
let html=fs.readFileSync(index,"utf8");
const css='<style id="cc-one-story-style">'+
'#page-project #project-story,#page-project #project-partners{display:none!important}'+
'#page-project .cc-one-story-in-project{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between;padding:25px 28px;margin:24px 0;border:1px solid rgba(255,196,77,.45);border-left:4px solid #ffc44d;border-radius:16px;background:linear-gradient(115deg,rgba(108,26,45,.62),rgba(12,17,31,.94));color:#fff}'+
'#page-project .cc-one-story-in-project h2{font-size:clamp(22px,3vw,36px);line-height:1.1;margin:0 0 9px;font-weight:900;color:#ffc44d}'+
'#page-project .cc-one-story-in-project p{font-size:14px;max-width:660px;line-height:1.5;margin:0;color:#f0dfe3}'+
'#page-project .cc-one-story-in-project a{background:#e54153;color:#fff;font-size:13px;font-weight:900;text-decoration:none;padding:13px 17px;border-radius:8px;white-space:nowrap}'+
'</style>';
if(!html.includes("</head>")||!html.includes("</body>"))throw new Error("Cannot attach unified Story navigation");
html=html.replace("</head>",css+"\n</head>");
const hook=[
'<script id="cc-one-story-nav">',
'(()=>{',
' const run=()=>{',
'  const primary=document.querySelector("nav[aria-label=Primary]");',
'  const p=primary?.querySelector("a.nav-link[href=\'#project\']")?.closest(".nav-item");',
'  if(p){',
'   const old=p.querySelector(".drop");',
'   old?.querySelectorAll("a").forEach(a=>{const href=a.getAttribute("href");const label=(a.textContent||"").toLowerCase();if(href==="#project-story"||href==="#project-partners"||href==="/production-universe.html"||label.includes("production universe")||label.includes("story + economic engine")||label.includes("partner lanes"))a.remove()});',
'   for(const info of [{url:"https://carnival-careers-os.floot.app/coordination",label:"Development Calendar"},{url:"/team-desk.html",label:"Private Team Desk"}]){if(old&&!old.querySelector("a[href=\'"+info.url+"\']")){const x=document.createElement("a");x.href=info.url;x.textContent=info.label;old.appendChild(x)}}',
'   if(!primary.querySelector("[data-cc-one-story]")){const div=document.createElement("div");div.className="nav-item";div.setAttribute("data-cc-one-story","");const a=document.createElement("a");a.className="nav-link";a.href="/the-story.html";a.textContent="Story";div.appendChild(a);p.insertAdjacentElement("beforebegin",div)}',
'  }',
'  const mobile=document.getElementById("mobilePanel");',
'  if(mobile){',
'   [...mobile.querySelectorAll("a")].filter(a=>{const h=a.getAttribute("href");const t=(a.textContent||"").toLowerCase();return h==="/production-universe.html"||h==="#project-story"||h==="#project-partners"||t==="the production universe"||t==="story + economic engine"||t==="partner lanes"}).forEach(a=>a.remove());',
'   if(!mobile.querySelector("[data-cc-one-story-mobile]")){const p=mobile.querySelector("a[href=\'#project\']");if(p){const a=document.createElement("a");a.href="/the-story.html";a.textContent="Story";a.setAttribute("data-cc-one-story-mobile","");p.insertAdjacentElement("beforebegin",a)}}',
'  }',
'  const project=document.querySelector("#page-project main.project-wrap");',
'  if(project&&!project.querySelector(".cc-one-story-in-project")){project.insertAdjacentHTML("afterbegin",\'<section class="cc-one-story-in-project"><div><h2>One story. Every industry.</h2><p>Follow the featured woman, family, development, commerce, filming, music, travel and economics in one smooth journey.</p></div><a href="/the-story.html">Read the full story ↗</a></section>\')}',
' };',
' if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});else run();',
'})();',
'</script>'
].join("\n");
html=html.replace("</body>",hook+"\n</body>");
// Final public financial-packet reconciliation for the Pembroke swap.\n// A C$860K acquisition-price difference does not prove any NOI or refinancing increase.\nhtml=html.replaceAll("2422 Queen","109 Pembroke");\nhtml=html.replaceAll("C$22,467,050","C$21,607,050");\nhtml=html.replaceAll("C$26,781,320","C$25,921,320");\nhtml=html.replaceAll("C$24,805,551","C$23,945,551");\nhtml=html.replace("current working control. Current named components include 109 Pembroke","illustrative carryover after a C$860,000 purchase-price reduction, pending re-underwriting. Current named components include 109 Pembroke");\nhtml=html.replace("For Queen to cover the entire Tournament subsidy independently, its annual debt payments and additional reserves would need to fit within the remaining C$67,849. Otherwise the PATH, East Bayfront or other verified portfolio income must supply the difference.","Pembroke has no verified NOI or independent Tournament subsidy capacity. Require rent roll, T12, DSCR and approved financing before allocating any operating surplus.");\nfs.writeFileSync(index,html);
const redirect='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Story | Carnival Careers</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://carnival-careers-live-current.vercel.app/the-story.html"><meta http-equiv="refresh" content="0;url=/the-story.html"></head><body><p>Continue to <a href="/the-story.html">Story</a>.</p></body></html>';
fs.writeFileSync(path.join(dist,"production-universe.html"),redirect);
console.log("CC_ONE_STORY_READY",fs.statSync(path.join(dist,"the-story.html")).size);
