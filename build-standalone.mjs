import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dist = path.resolve("dist");
const canonicalIndexPath = path.resolve("index.html");
const pressKitPath = path.resolve("pet-picks-press.html");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

if (!fs.existsSync(canonicalIndexPath)) throw new Error("Canonical GitHub index.html is missing.");
if (!fs.existsSync(pressKitPath)) throw new Error("Pet Picks press kit is missing.");

const canonicalHtml = fs.readFileSync(canonicalIndexPath, "utf8");
const requiredCanonicalMarkers = ["The mas brings us together.", "Tell me who you are.", 'id="page-music"'];
for (const marker of requiredCanonicalMarkers) {
  if (!canonicalHtml.includes(marker)) throw new Error(`Canonical HTML marker missing: ${marker}`);
}

const shopUrl = "https://wase0y-fi.myshopify.com/collections/trending-pet-picks?utm_source=carnivalcareers&utm_medium=website&utm_campaign=trending_pet_picks";

const trafficFunnel = `
<style id="cc-shopify-traffic-style">
  #cc-shopify-traffic{position:fixed;right:18px;bottom:18px;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 20px;border-radius:999px;background:#e30613;color:#fff!important;font:800 14px/1.1 Arial,Helvetica,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-decoration:none!important;box-shadow:0 10px 30px rgba(0,0,0,.35);border:2px solid rgba(255,255,255,.88)}
  #cc-shopify-traffic:hover,#cc-shopify-traffic:focus{transform:translateY(-1px);filter:brightness(1.06);outline:none}
  @media (max-width:640px){#cc-shopify-traffic{right:12px;bottom:12px;min-height:46px;padding:0 16px;font-size:12px}}
</style>
<a id="cc-shopify-traffic" href="${shopUrl}" target="_blank" rel="noopener noreferrer" aria-label="Shop Trending Pet Picks">Shop Trending Pet Picks</a>`;

const contrastGuard = `
<style id="cc-legibility-guard-style">
  [data-cc-contrast-fixed="1"]{color:#161616!important;text-shadow:none!important}
</style>
<script id="cc-legibility-guard-script">
(() => {
  const candidates = "h1,h2,h3,h4,h5,h6,p,a,span,li,dt,dd,label,strong,em,small,button,summary,figcaption,blockquote,td,th,div";
  const isCard = el => el instanceof Element && (el.matches(".project-pro,.project-lane,.project-step") || Array.from(el.classList).some(n => n === "card" || /-card$/.test(n)));
  const parse = v => { const m=String(v||"").match(/rgba?\\(([^)]+)\\)/i); if(!m)return null; const p=m[1].split(",").map(x=>Number.parseFloat(x)); if(p.length<3)return null; return {r:p[0],g:p[1],b:p[2],a:Number.isFinite(p[3])?p[3]:1}; };
  const lum = c => [c.r,c.g,c.b].map(v=>{v/=255; return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
  const bg = el => { let n=el; while(n && n.nodeType===1){ const c=parse(getComputedStyle(n).backgroundColor); if(c && c.a>.5)return c; n=n.parentElement; } return {r:255,g:255,b:255,a:1}; };
  const ownText = el => Array.from(el.childNodes).some(n=>n.nodeType===Node.TEXT_NODE && String(n.textContent||"").trim());
  const run = () => {
    document.querySelectorAll('[data-cc-contrast-fixed="1"]').forEach(el=>el.removeAttribute("data-cc-contrast-fixed"));
    Array.from(document.querySelectorAll("[class]")).filter(isCard).forEach(root=>{
      [root,...root.querySelectorAll(candidates)].forEach(el=>{
        if(el.closest("svg,canvas,video,picture"))return; if(el.matches("div")&&!ownText(el)&&el!==root)return;
        const fg=parse(getComputedStyle(el).color), back=bg(el); if(!fg||!back)return;
        const ratio=(Math.max(lum(fg),lum(back))+.05)/(Math.min(lum(fg),lum(back))+.05);
        if(lum(fg)>=.55 && lum(back)>=.72 && ratio<3.15)el.setAttribute("data-cc-contrast-fixed","1");
      });
    });
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
  window.addEventListener("load",run,{once:true}); window.addEventListener("hashchange",run); window.addEventListener("resize",run,{passive:true});
  if("MutationObserver" in window)new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","hidden","aria-hidden"]});
})();
</script>`;

const projectCopy = `
<style id="cc-eat-you-keep-style">
  .cc-plain-core{margin:22px 0 4px;padding:20px;border-radius:18px;border:1px solid rgba(112,72,232,.24);background:linear-gradient(135deg,rgba(112,72,232,.10),rgba(237,56,161,.08));color:inherit}
  .cc-plain-core h3{margin:0 0 8px;font-size:clamp(1.22rem,2vw,1.55rem);line-height:1.12}
  .cc-plain-core p{margin:7px 0;max-width:72ch}
  .cc-plain-core strong{font-weight:850}
  .cc-plain-core .cc-kicker{font-size:.78rem;font-weight:850;letter-spacing:.12em;text-transform:uppercase;opacity:.78;margin-bottom:6px}
</style>
<script id="cc-eat-you-keep-script">
(() => {
  const findPage = (...ids) => ids.map(id => document.getElementById(id)).find(Boolean) || null;
  const place = (root, key, html) => {
    if(!root) return;
    const inner = root.querySelector(".page-inner,.content,.section-inner,.container,main") || root;
    let box = inner.querySelector('[data-cc-core="' + key + '"]');
    if(!box){ box=document.createElement("div"); box.className="cc-plain-core"; box.setAttribute("data-cc-core", key); inner.appendChild(box); }
    box.innerHTML = html;
  };
  const home = findPage("page-home") || document.querySelector('[data-page="home"]');
  const families = findPage("page-families","page-childcare") || document.querySelector('[data-page="families"],[data-page="childcare"]');
  const project = findPage("page-project") || document.querySelector('[data-page="project"]');
  const show = findPage("page-show") || document.querySelector('[data-page="show"]');
  const capital = findPage("page-capital") || document.querySelector('[data-page="capital"]');
  const store = findPage("page-store","page-shop","page-commerce") || document.querySelector('[data-page="store"],[data-page="shop"],[data-page="commerce"]');

  place(home,"core-home",'<div class="cc-kicker">Toronto story</div><h3>Work. Eat. Own.</h3><p><strong>Hopeton LaTouche is the featured Toronto family / tenant-owner.</strong> <strong>Michie Mee is the host.</strong> The family earns real project income, buys groceries from our store, uses project mobility and childcare, and the spending builds the Carnival Careers ecosystem.</p>');
  place(families,"core-families",'<div class="cc-kicker">Families</div><h3>The C$105K job supports the whole household.</h3><p>The money is not just a paycheque. It helps cover housing, groceries, SweetEVRides mobility and childcare. A small activation slice connects more people to paid opportunities. The wider community earns mostly from real sales, referrals, vendors, sponsors and project work.</p>');
  place(project,"core-project",'<div class="cc-kicker">Project</div><h3>One family proves the model.</h3><p>Toronto follows Hopeton\'s family from work and home into groceries, mobility, childcare, community activation and the arena finale. The point is simple: the show leaves behind an operating household, customers, partners and ownership pathways.</p>');
  place(show,"core-show",'<div class="cc-kicker">The show</div><h3>Michie Mee hosts the journey.</h3><p>The host guides the audience. Hopeton\'s family lives the story. The episode shows how regular spending - food, transport, childcare and entertainment - can help build owned community businesses.</p>');
  place(capital,"core-capital",'<div class="cc-kicker">Capital</div><h3>Eat Your Keep turns grocery spending into member ownership.</h3><p>Customers who join the grocery ownership program do not just buy food. Eligible purchases build member equity in the grocery store, subject to the final co-op or share structure. Investor returns still need signed agreements and real collected revenue.</p>');
  place(store,"core-store",'<div class="cc-kicker">Eat Your Keep</div><h3>Buy groceries. Build ownership.</h3><p>Every eligible grocery run can add to a member-owner account instead of disappearing as ordinary spending. The store earns revenue, the family gets food, and the customer builds a stake in the place feeding the community.</p>');
})();
</script>`;

let renderedHtml = canonicalHtml;
for (const block of [trafficFunnel, projectCopy, contrastGuard]) {
  if (!renderedHtml.includes("</body>")) throw new Error("Canonical HTML is missing </body>.");
  renderedHtml = renderedHtml.replace("</body>", `${block}\n</body>`);
}

fs.writeFileSync(path.join(dist, "index.html"), renderedHtml);
fs.copyFileSync(pressKitPath, path.join(dist, "pet-picks-press.html"));
fs.writeFileSync(path.join(dist, "CANONICAL-BUILD-VERIFIED.json"), JSON.stringify({
  canonical_html_from_github: true,
  canonical_html_bytes: Buffer.byteLength(canonicalHtml),
  canonical_html_sha256: crypto.createHash("sha256").update(canonicalHtml).digest("hex"),
  rendered_html_bytes: Buffer.byteLength(renderedHtml),
  rendered_html_sha256: crypto.createHash("sha256").update(renderedHtml).digest("hex"),
  shopify_traffic_funnel: true,
  pet_picks_press_kit: true,
  legibility_guard_card_light_on_light_only: true,
  toronto_featured_family: "Hopeton LaTouche",
  toronto_host: "Michie Mee",
  grocery_ownership_program: "Eat Your Keep",
  plain_language_refactor: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOU_KEEP=ON", "PLAIN_LANGUAGE=ON");
