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

