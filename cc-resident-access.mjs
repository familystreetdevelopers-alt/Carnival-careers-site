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
fs.copyFileSync(path.resolve("capital-execution.html"),path.join(dist,"capital-execution.html"));
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

// CC Capital execution: inject into generated build only; do not replace canonical Home copy.
const ccCapitalHook="<style id=\"cc-capital-execution-style\">#cc-capital-execution-cta{padding:17px 21px;margin:15px 0;border:1px solid rgba(240,187,107,.5);background:linear-gradient(120deg,#28131b,#532030);border-radius:17px;color:#fff}#cc-capital-execution-cta a{display:inline-flex;border-radius:25px;padding:9px 15px;background:#efbb6b;color:#170e16!important;text-decoration:none!important;font-weight:900}#cc-capital-execution-cta h3{color:#fff;margin:5px 0;font-size:1.4rem}</style>\n<script id=\"cc-capital-execution-script\">(()=>{const run=()=>{const parent=document.getElementById('page-project')||document.querySelector('[data-page=\"project\"]');if(parent&&!document.querySelector('#cc-capital-execution-cta')){const n=document.createElement('section');n.id='cc-capital-execution-cta';n.innerHTML='<small>CAPITAL · DEBT · DELIVERY</small><h3>CC Capital Execution</h3><p>Real property mortgages, seller take-back notes, contracted receivables, film finance and completion controls. No investment securities offered.</p><a href=\"/capital-execution.html\">Review funding routes →</a>';(parent.querySelector('.wrap,.container,.page-inner')||parent).insertAdjacentElement('afterbegin',n)}const nav=document.querySelector('nav[aria-label=\"Primary\"]');if(nav&&!nav.querySelector('[data-cc-capital-execution]')){const e=document.createElement('div');e.className='nav-item';e.setAttribute('data-cc-capital-execution','');e.innerHTML='<a class=\"nav-link\" href=\"/capital-execution.html\">Funding Routes</a>';const pr=[...nav.querySelectorAll('.nav-item')].find(v=>/project|capital|houses/i.test(v.textContent||''));if(pr)pr.insertAdjacentElement('afterend',e);else nav.appendChild(e)}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();window.addEventListener('load',run,{once:true})})();</script>";
let ccCapitalIndex=fs.readFileSync(index,"utf8");
if(!ccCapitalIndex.includes('id="cc-capital-execution-script"')){ccCapitalIndex=ccCapitalIndex.replace("</body>",ccCapitalHook+"\n</body>");fs.writeFileSync(index,ccCapitalIndex);}
if(!ccCapitalIndex.includes("The mas brings us together."))throw new Error("Home copy marker changed during capital integration");
console.log("CC_CAPITAL_EXECUTION_READY");


// Organize existing standalone links under their parent navbar sections.
// This runs AFTER the individual feature integrations above, affecting only
// the generated navigation and not the canonical homepage content.
const groupedNavigationHook = \`
<style id="cc-navigation-grouping-style">
nav[aria-label="Primary"] .drop a.cc-nested-feature{border-left:2px solid rgba(231,191,126,.65);padding-left:14px}
#mobilePanel a.cc-mobile-sub-link{border-left:3px solid #e7bf7e;padding-left:17px;background:rgba(231,191,126,.12);font-size:12px}
#mobilePanel a.cc-mobile-sub-link:focus-visible{outline:2px solid #e7bf7e;outline-offset:2px}
</style>
<script id="cc-navigation-grouping-script">
(() => {
 const links = [
  {section:"families",label:"My CC Life",href:"/my-cc-life.html"},
  {section:"commerce",label:"Funding Routes",href:"/capital-execution.html"},
  {section:"commerce",label:"Product Lab",href:"/product-testing.html"},
  {section:"travel",label:"Flight Savings",href:"/fare-savings.html"}
 ];
 const run=()=>{
  const nav=document.querySelector('nav[aria-label="Primary"]');
  if(nav){
   const navItems=[...nav.querySelectorAll(":scope > .nav-item")];
   const parent={
    families:navItems.find(item=>item.querySelector(':scope > a[href="#childcare"],:scope > a[href="#families"]')),
    commerce:navItems.find(item=>/commerce/i.test(item.querySelector(":scope > .nav-link")?.textContent||"")),
    travel:navItems.find(item=>item.querySelector(':scope > a[href="#plane"]'))
   };
   for(const link of links){
    const item=parent[link.section];
    const dropdown=item?.querySelector(":scope > .drop");
    if(!dropdown)continue;
    // Older integrations created standalone desktop nav buttons. Fold them in.
    nav.querySelectorAll('.nav-item > a.nav-link[href="'+link.href+'"]').forEach(a=>{
     if(a.parentElement?.classList.contains("nav-item"))a.parentElement.remove();
    });
    nav.querySelectorAll('.drop a[href="'+link.href+'"]').forEach(a=>{
     if(a.parentElement!==dropdown)a.remove();
    });
    let a=dropdown.querySelector('a[href="'+link.href+'"]');
    if(!a){
     a=document.createElement("a");
     a.href=link.href;
     dropdown.appendChild(a);
    }
    a.classList.add("cc-nested-feature");
    a.textContent=link.label;
   }
  }
  const mobile=document.getElementById("mobilePanel");
  if(mobile){
   // Retain the existing mobile navigation; add each child immediately after
   // the matching parent instead of putting it among unrelated top-level pages.
   links.forEach(link=>mobile.querySelectorAll('a[href="'+link.href+'"]').forEach(a=>a.remove()));
   const selectors={
    families:'a[href="#childcare"],a[href="#families"]',
    commerce:'a[href="#store"]',
    travel:'a[href="#plane"]'
   };
   for(const section of ["families","commerce","travel"]){
    let previous=mobile.querySelector(selectors[section]);
    if(!previous)continue;
    for(const link of links.filter(x=>x.section===section)){
     const child=document.createElement("a");
     child.href=link.href;
     child.className="cc-mobile-sub-link";
     child.textContent=link.label;
     child.setAttribute("aria-label",section.charAt(0).toUpperCase()+section.slice(1)+": "+link.label);
     previous.insertAdjacentElement("afterend",child);
     previous=child;
    }
   }
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});
 else run();
 window.addEventListener("load",run,{once:true});
})();
</script>\`;
let groupedNavigationHtml=fs.readFileSync(index,"utf8");
if(!groupedNavigationHtml.includes('id="cc-navigation-grouping-script"')){
 if(!groupedNavigationHtml.includes("</body>"))throw new Error("Missing closing body for navigation grouping");
 groupedNavigationHtml=groupedNavigationHtml.replace("</body>",groupedNavigationHook+"\n</body>");
 fs.writeFileSync(index,groupedNavigationHtml);
}
if(!groupedNavigationHtml.includes("The mas brings us together."))throw new Error("Canonical Home copy marker missing after navigation grouping");
console.log("CC_NAVIGATION_GROUPING_READY");
