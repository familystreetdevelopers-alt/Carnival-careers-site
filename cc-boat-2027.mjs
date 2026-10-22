import fs from "node:fs";
import path from "node:path";

// Boat-only CC Universe update. Preserve canonical Home, music, approved Houses and other pages.
const root=path.resolve(".");
const dist=path.join(root,"dist");
const src=path.join(root,"boat-2027.html");
const dest=path.join(dist,"boat-2027.html");
const index=path.join(dist,"index.html");
if(!fs.existsSync(src)||!fs.existsSync(index))throw Error("Boat page or site build missing");
const boat=fs.readFileSync(src,"utf8");
if(!boat.includes("THE <em>CARIBBEAN</em> CORRIDOR")||!boat.includes("No vessel, departure"))throw Error("Boat 2027 content not verified");
let html=fs.readFileSync(index,"utf8");
if(!html.includes("The mas brings us together.")||!html.includes('id="page-music"'))throw Error("Canonical Home/Music marker missing");
fs.copyFileSync(src,dest);
const hook=`
<style id="cc-boat-corridor-style">
.cc-boat-corridor-entry{padding:clamp(22px,3.5vw,38px);margin:24px 0;border:1px solid rgba(227,184,118,.58);border-left:5px solid #d44847;background:linear-gradient(115deg,#0b1720,#361725);border-radius:14px;color:#fff}
.cc-boat-corridor-entry small{color:#e3b876;font-size:11px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
.cc-boat-corridor-entry h3{color:#fff!important;font-size:clamp(1.5rem,3.1vw,2.3rem)!important;line-height:1.12!important;margin:12px 0!important}
.cc-boat-corridor-entry p{max-width:760px;color:#e8ddcf;font-size:.98rem;line-height:1.58}
.cc-boat-corridor-entry a{display:inline-flex;margin:14px 0 0;background:#e3b876;padding:11px 17px;border-radius:5px;text-decoration:none!important;color:#161313!important;font-weight:900}
.cc-boat-corridor-nav{border-left:2px solid #e3b876!important;padding-left:14px!important}
</style>
<script id="cc-boat-corridor-script">
(()=>{
 const target="/boat-2027.html";
 const add=(root,sel)=>{if(!root||root.querySelector('a[href="'+target+'"]'))return;const a=document.createElement("a");a.href=target;a.textContent="Boat · 2027 Caribbean Corridor";a.className="cc-boat-corridor-nav";root.appendChild(a)};
 const install=()=>{
  const boat=document.getElementById("page-boat")||document.querySelector('[data-page="boat"]');
  const travel=document.getElementById("page-travel")||document.querySelector('[data-page="travel"]');
  for(const page of [boat,travel].filter(Boolean)){
   if(!page.querySelector(".cc-boat-corridor-entry")){
    const box=document.createElement("section");box.className="cc-boat-corridor-entry";
    box.innerHTML='<small>BOAT / CORRECTED MAY 2027 CONTROL</small><h3>The Caribbean Corridor</h3><p>Toronto → Montréal → Miami → Caribbean islands → return Toronto is the operator procurement brief, not a confirmed vessel itinerary. The 170-guest Rasta Fest cultural sailing targets May 2027. No cabins or vendor spaces can be sold until the vessel and licensed travel seller are contracted.</p><a href="/boat-2027.html">Explore the boat plan / join priority list →</a>';
    (page.querySelector(".page-inner,.wrap,.container,.section-inner")||page).insertAdjacentElement("afterbegin",box);
   }
  }
  // Replace boat-only premature booking CTAs with the compliant interest route.
  if(boat){
   boat.querySelectorAll("a,button").forEach(el=>{
    if(!/boat tickets now|book (?:a )?boat|book cruise|buy cruise|reserve (?:cabin|your cabin)|cruise tickets now/i.test((el.textContent||"").trim()))return;
    if(el.tagName==="A"){el.href=target;el.textContent="Boat priority list · no payment";}
    else{const a=document.createElement("a");a.href=target;a.textContent="Boat priority list · no payment";a.className=el.className;el.replaceWith(a);}
   });
  }
  const nav=document.querySelector('nav[aria-label="Primary"]');
  if(nav){
   const nodes=[...nav.querySelectorAll(":scope > .nav-item")];
   const tr=nodes.find(item=>/travel|plane|boat|cruise/i.test(item.querySelector(":scope > .nav-link")?.textContent||""));
   if(tr) add(tr.querySelector(".drop")||tr,"Boat");
   else if(!nav.querySelector('a[href="'+target+'"]')){
    const box=document.createElement("div");box.className="nav-item";add(box,"Boat");nav.appendChild(box);
   }
  }
  const mobile=document.getElementById("mobilePanel");
  if(mobile&&!mobile.querySelector('a[href="'+target+'"]')){
   const a=document.createElement("a");a.href=target;a.textContent="Boat · 2027 Caribbean Corridor";a.style.cssText="display:block;padding:12px 18px;color:#e3b876;font-size:13px;font-weight:900;text-decoration:none";
   const anchor=[...mobile.querySelectorAll("a,summary")].find(el=>/boat|travel|plane/i.test(el.textContent||""));
   const container=anchor?.closest("details")||anchor?.parentElement;
   if(container?.insertAdjacentElement)container.insertAdjacentElement("afterend",a);else mobile.appendChild(a);
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
 window.addEventListener("load",install,{once:true});
})();
</script>`;
if(!html.includes('id="cc-boat-corridor-script"'))html=html.replace("</body>",hook+"\n</body>");
if(!html.includes("The mas brings us together.")||!html.includes('id="page-music"'))throw Error("Boat build modified canonical Home or music unexpectedly");
fs.writeFileSync(index,html,"utf8");
console.log("CC_BOAT_2027_ROUTE_AND_FULFILLMENT_PAGE_READY; no public sale");
