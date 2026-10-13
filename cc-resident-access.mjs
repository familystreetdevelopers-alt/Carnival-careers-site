import fs from "node:fs";
import path from "node:path";

// Resident portal public entry point. It never collects private resident credentials.
// Source Home copy remains unchanged; inject only into generated dist.
const dist=path.resolve("dist");
const index=path.join(dist,"index.html");
if(!fs.existsSync(index))throw new Error("Canonical site must be built first");
fs.copyFileSync(path.resolve("my-cc-life.html"),path.join(dist,"my-cc-life.html"));
fs.copyFileSync(path.resolve("rights-recovery.html"),path.join(dist,"rights-recovery.html"));
fs.copyFileSync(path.resolve("driver-data-income.html"),path.join(dist,"driver-data-income.html"));
fs.copyFileSync(path.resolve("product-testing.html"),path.join(dist,"product-testing.html"));
fs.copyFileSync(path.resolve("finance-instruments.html"),path.join(dist,"finance-instruments.html"));
fs.copyFileSync(path.resolve("fare-savings.html"),path.join(dist,"fare-savings.html"));
const injection=fs.readFileSync(path.resolve("cc-resident-access-hook.html"),"utf8");
let html=fs.readFileSync(index,"utf8");
if(!html.includes('id="cc-resident-gateway-script"')){
 if(!html.includes("</body>"))throw new Error("Missing closing body");
 html=html.replace("</body>",injection+"\n</body>");
 fs.writeFileSync(index,html);
}
if(!html.includes("The mas brings us together."))throw new Error("Canonical Home copy marker missing");
console.log("CC_RESIDENT_GATEWAY_READY");

const productLabHook = `
<style id="cc-product-lab-link-style">
[data-cc-lab-entry]{border:1px solid rgba(231,191,126,.4);background:linear-gradient(120deg,#20141a,#4a1a2d);border-radius:16px;padding:18px 20px;margin:16px 0 20px;color:#fff}
[data-cc-lab-entry] h3{margin:0 0 6px;color:#fff;font-size:1.5rem}
[data-cc-lab-entry] p{margin:0 0 13px;color:#e3d7dc;line-height:1.45}
[data-cc-lab-entry] a{display:inline-block;background:#e7bf7e;color:#17121a!important;padding:10px 15px;border-radius:24px;text-decoration:none!important;font-weight:900}
</style>
<script id="cc-product-lab-link-script">
(() => {
 const activate=() => {
  const primary=document.querySelector('nav[aria-label="Primary"]');
  if(primary && !primary.querySelector("[data-cc-product-lab-nav]")){
   const node=document.createElement("div");node.className="nav-item";node.setAttribute("data-cc-product-lab-nav","");
   node.innerHTML='<a class="nav-link" href="/product-testing.html">Product Lab</a>';
   const items=[...primary.querySelectorAll(".nav-item")];
   const commerce=items.find(el => /commerce|shop|store|marketplace/i.test(el.textContent||""));
   if(commerce)commerce.insertAdjacentElement("afterend",node); else primary.appendChild(node);
  }
  const potential=["page-store","page-shop","page-commerce","page-merch","page-marketplace","page-project"];
  const host=potential.map(id=>document.getElementById(id)).find(Boolean)
   ||document.querySelector('[data-page="store"],[data-page="shop"],[data-page="commerce"],[data-page="project"]');
  if(host && !document.getElementById("cc-product-lab-entry")){
   const node=document.createElement("section");node.id="cc-product-lab-entry";node.setAttribute("data-cc-lab-entry","");
   node.innerHTML='<small>COMMERCE + FAMILY WEALTH</small><h3>CC Product Lab</h3><p>Commerce handles paid product research, original brand video and photography, optional adult creator work, and lawful inventory resale. No incentivized Amazon reviews or resale of restricted samples.</p><a href="/product-testing.html">Explore Product Lab →</a>';
   (host.querySelector(".wrap,.container,.page-inner,.section-inner")||host).insertAdjacentElement("afterbegin",node);
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",activate,{once:true});else activate();
 window.addEventListener("load",activate,{once:true});
})();
</script>`;
let productLabHtml=fs.readFileSync(index,"utf8");
if(!productLabHtml.includes('id="cc-product-lab-link-script"')){
 if(!productLabHtml.includes("</body>"))throw new Error("Missing closing body for Product Lab entry");
 productLabHtml=productLabHtml.replace("</body>",productLabHook+"\n</body>");
 fs.writeFileSync(index,productLabHtml);
}
if(!productLabHtml.includes("The mas brings us together."))throw new Error("Canonical Home copy marker missing after Product Lab integration");
console.log("CC_PRODUCT_LAB_ENTRY_READY");


// CC Travel fare-savings integration: preserve canonical Home copy, add on generated site only.
const fareSavingsHook = "\n<style id=\"cc-fare-savings-style\">\n#cc-fare-savings-entry{border:1px solid rgba(240,195,124,.4);background:linear-gradient(125deg,#24151a,#591c36);border-radius:17px;padding:18px 21px;margin:18px 0 22px;color:#fff;max-width:1100px}\n#cc-fare-savings-entry h3{color:#fff;font-size:1.5rem;margin:4px 0 8px}#cc-fare-savings-entry p{color:#e7d6df;line-height:1.5;margin:0 0 13px}\n#cc-fare-savings-entry a{display:inline-block;background:#f0c37c;padding:10px 16px;border-radius:30px;color:#1d141b!important;text-decoration:none!important;font-weight:900}\n</style>\n<script id=\"cc-fare-savings-link-script\">\n(() => {\n const activate=() => {\n  const primary=document.querySelector('nav[aria-label=\"Primary\"]');\n  if(primary && !primary.querySelector('[data-cc-fare-savings-nav]')){\n   const box=document.createElement('div');box.className='nav-item';box.setAttribute('data-cc-fare-savings-nav','');\n   box.innerHTML='<a class=\"nav-link\" href=\"/fare-savings.html\">Flight Savings</a>';\n   const candidates=[...primary.querySelectorAll('.nav-item')];\n   const travel=candidates.find(node=>/plane|travel|flight|boat|cruise/i.test(node.textContent||''));\n   if(travel)travel.insertAdjacentElement('afterend',box); else primary.appendChild(box);\n  }\n  const parent=document.getElementById('page-plane')||document.getElementById('page-travel')||document.querySelector('[data-page=\"plane\"],[data-page=\"travel\"]');\n  if(parent && !document.getElementById('cc-fare-savings-entry')){\n   const entry=document.createElement('section');entry.id='cc-fare-savings-entry';\n   entry.innerHTML='<small>CC TRAVEL · FAMILY SAVINGS</small><h3>Flight Savings &amp; Fare Recovery</h3><p>Track prices, compare all-in fares and check actual airline credit eligibility after booking. No magic booking hour and no guaranteed refund.</p><a href=\"/fare-savings.html\">Check a fare →</a>';\n   (parent.querySelector('.wrap,.container,.page-inner,.section-inner')||parent).insertAdjacentElement('afterbegin',entry);\n  }\n };\n if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',activate,{once:true});else activate();\n window.addEventListener('load',activate,{once:true});\n})();\n</script>";
let fareSavingsIndex=fs.readFileSync(index,"utf8");
if(!fareSavingsIndex.includes('id="cc-fare-savings-link-script"')){
 if(!fareSavingsIndex.includes("</body>"))throw new Error("No </body> for Fare Savings link");
 fareSavingsIndex=fareSavingsIndex.replace("</body>",fareSavingsHook+"\n</body>");
 fs.writeFileSync(index,fareSavingsIndex);
}
if(!fareSavingsIndex.includes("The mas brings us together."))throw new Error("Home copy changed during fare savings integration");
console.log("CC_FARE_SAVINGS_READY");
