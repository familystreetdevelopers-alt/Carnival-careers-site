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

  [data-cc-core="core-store"]{padding:0!important;border:0!important;background:transparent!important}
  .cc-eyk-shell{position:relative;overflow:hidden;border-radius:30px;padding:clamp(22px,4vw,48px);background:
    radial-gradient(circle at 8% 10%,rgba(255,190,32,.24),transparent 34%),
    radial-gradient(circle at 90% 12%,rgba(237,56,161,.30),transparent 31%),
    linear-gradient(135deg,#160d2b 0%,#25134b 46%,#0d1b28 100%);color:#fff;box-shadow:0 24px 70px rgba(19,10,44,.34);isolation:isolate}
  .cc-eyk-shell:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.24;background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);background-size:24px 24px;mask-image:linear-gradient(to bottom,black,transparent 78%)}
  .cc-eyk-shell>*{position:relative;z-index:1}
  .cc-eyk-top{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:clamp(20px,4vw,44px);align-items:start}
  .cc-eyk-kicker{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.09);backdrop-filter:blur(8px);font-size:.76rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
  .cc-eyk-kicker:before{content:"";width:9px;height:9px;border-radius:50%;background:#ffbe20;box-shadow:0 0 0 5px rgba(255,190,32,.14)}
  .cc-eyk-title{margin:16px 0 12px!important;max-width:13ch;font-size:clamp(2.35rem,6vw,5.6rem)!important;line-height:.93!important;letter-spacing:-.055em}
  .cc-eyk-lede{max-width:62ch;font-size:clamp(1rem,1.8vw,1.22rem);line-height:1.65;color:rgba(255,255,255,.82)}
  .cc-eyk-punch{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 0}
  .cc-eyk-punch span{padding:9px 12px;border-radius:999px;background:#fff;color:#1a1228;font-size:.86rem;font-weight:900}
  .cc-eyk-punch span:nth-child(2){background:#ffbe20}
  .cc-eyk-punch span:nth-child(3){background:#ef49a6;color:#fff}
  .cc-eyk-tracker{padding:20px;border-radius:22px;background:rgba(255,255,255,.96);color:#17131f;box-shadow:0 18px 50px rgba(0,0,0,.24)}
  .cc-eyk-tracker h4{margin:0 0 6px;font-size:1.2rem}
  .cc-eyk-subtle{margin:0 0 18px;font-size:.86rem;line-height:1.45;color:#655f6b}
  .cc-eyk-field{margin:18px 0}
  .cc-eyk-field-head{display:flex;justify-content:space-between;gap:12px;align-items:baseline;margin-bottom:8px}
  .cc-eyk-field-head label{font-weight:850}
  .cc-eyk-field-head output{font-weight:950;font-size:1.05rem}
  .cc-eyk-range{width:100%;accent-color:#6f48e8;cursor:pointer}
  .cc-eyk-results{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
  .cc-eyk-stat{padding:14px;border-radius:16px;background:#f4f0fb}
  .cc-eyk-stat small{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:#746c7e;font-weight:850}
  .cc-eyk-stat strong{display:block;margin-top:5px;font-size:1.35rem;line-height:1}
  .cc-eyk-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}
  .cc-eyk-btn{appearance:none;border:0;border-radius:999px;padding:11px 15px;font:850 .82rem/1 Arial,Helvetica,sans-serif;cursor:pointer}
  .cc-eyk-btn.primary{background:#1a1228;color:#fff}
  .cc-eyk-btn.ghost{background:#ece7f4;color:#251b32}
  .cc-eyk-saved{min-height:1.2em;margin:9px 0 0;font-size:.76rem;color:#5d5367}
  .cc-eyk-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:28px 0 12px}
  .cc-eyk-step{appearance:none;text-align:left;border:1px solid rgba(255,255,255,.17);border-radius:18px;padding:16px;background:rgba(255,255,255,.07);color:#fff;cursor:pointer;transition:.2s ease}
  .cc-eyk-step:hover,.cc-eyk-step[aria-selected="true"]{transform:translateY(-2px);background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.4)}
  .cc-eyk-step b{display:block;margin-bottom:4px;font-size:1rem}
  .cc-eyk-step span{font-size:.82rem;opacity:.7}
  .cc-eyk-panel{display:none;padding:18px 19px;border-radius:18px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)}
  .cc-eyk-panel.active{display:block}
  .cc-eyk-panel h4{margin:0 0 7px;font-size:1.12rem}
  .cc-eyk-panel p{margin:0;color:rgba(255,255,255,.78);line-height:1.55}
  .cc-eyk-bottom{display:grid;grid-template-columns:1fr minmax(280px,.7fr);gap:18px;margin-top:18px}
  .cc-eyk-value{padding:20px;border-radius:20px;background:linear-gradient(135deg,rgba(255,190,32,.14),rgba(237,56,161,.11));border:1px solid rgba(255,255,255,.16)}
  .cc-eyk-value h4{margin:0 0 8px;font-size:1.2rem}
  .cc-eyk-value p{margin:0;color:rgba(255,255,255,.78);line-height:1.55}
  .cc-eyk-guardrails{padding:20px;border-radius:20px;background:rgba(5,10,20,.34);border:1px solid rgba(255,255,255,.13)}
  .cc-eyk-guardrails strong{display:block;margin-bottom:7px}
  .cc-eyk-guardrails p{margin:0;font-size:.82rem;line-height:1.5;color:rgba(255,255,255,.7)}
  @media(max-width:820px){.cc-eyk-top,.cc-eyk-bottom{grid-template-columns:1fr}.cc-eyk-flow{grid-template-columns:1fr}.cc-eyk-step{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center}.cc-eyk-title{max-width:10ch}.cc-eyk-results{grid-template-columns:1fr 1fr}}
  @media(max-width:480px){.cc-eyk-shell{border-radius:22px;padding:20px}.cc-eyk-results{grid-template-columns:1fr}.cc-eyk-title{font-size:2.45rem!important}}
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

  const initEatYourKeep = root => {
    if(!root) return;
    const box = root.querySelector('[data-cc-core="core-store"]');
    if(!box) return;
    const spend = box.querySelector('[data-eyk-spend]');
    const eligible = box.querySelector('[data-eyk-eligible]');
    const spendOut = box.querySelector('[data-eyk-spend-out]');
    const eligibleOut = box.querySelector('[data-eyk-eligible-out]');
    const monthOut = box.querySelector('[data-eyk-month]');
    const yearOut = box.querySelector('[data-eyk-year]');
    const savedMsg = box.querySelector('[data-eyk-saved]');
    const saveBtn = box.querySelector('[data-eyk-save]');
    const resetBtn = box.querySelector('[data-eyk-reset]');
    const money = n => new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD",maximumFractionDigits:0}).format(n);
    const update = () => {
      const monthly = Math.max(0,Number(spend.value)||0);
      const pct = Math.min(100,Math.max(0,Number(eligible.value)||0));
      const eligibleMonthly = monthly * pct / 100;
      spendOut.textContent = money(monthly);
      eligibleOut.textContent = pct + "%";
      monthOut.textContent = money(eligibleMonthly);
      yearOut.textContent = money(eligibleMonthly * 12);
      savedMsg.textContent = "Preview only — this estimates eligible purchase volume, not shares, cash value or investment return.";
    };
    box.querySelectorAll('[data-eyk-tab]').forEach(btn => {
      btn.addEventListener("click",() => {
        const key = btn.getAttribute("data-eyk-tab");
        box.querySelectorAll('[data-eyk-tab]').forEach(x => x.setAttribute("aria-selected",String(x===btn)));
        box.querySelectorAll('[data-eyk-panel]').forEach(panel => panel.classList.toggle("active",panel.getAttribute("data-eyk-panel")===key));
      });
    });
    [spend,eligible].forEach(input => input && input.addEventListener("input",update));
    if(saveBtn) saveBtn.addEventListener("click",() => {
      try{
        localStorage.setItem("cc-eat-your-keep-preview",JSON.stringify({spend:spend.value,eligible:eligible.value}));
        savedMsg.textContent = "Saved on this device. No personal information was sent anywhere.";
      }catch(e){ savedMsg.textContent = "Your browser blocked local saving, but the preview still works."; }
    });
    if(resetBtn) resetBtn.addEventListener("click",() => {
      spend.value = "500";
      eligible.value = "80";
      try{ localStorage.removeItem("cc-eat-your-keep-preview"); }catch(e){}
      update();
    });
    try{
      const saved = JSON.parse(localStorage.getItem("cc-eat-your-keep-preview")||"null");
      if(saved){ if(saved.spend!=null) spend.value=saved.spend; if(saved.eligible!=null) eligible.value=saved.eligible; }
    }catch(e){}
    update();
  };

  const home = findPage("page-home") || document.querySelector('[data-page="home"]');
  const families = findPage("page-families","page-childcare") || document.querySelector('[data-page="families"],[data-page="childcare"]');
  const project = findPage("page-project") || document.querySelector('[data-page="project"]');
  const show = findPage("page-show") || document.querySelector('[data-page="show"]');
  const capital = findPage("page-capital") || document.querySelector('[data-page="capital"]');
  const store = findPage("page-store","page-shop","page-commerce") || document.querySelector('[data-page="store"],[data-page="shop"],[data-page="commerce"]');
  const sellBusiness = findPage("page-sell-business") || document.querySelector('[data-page="sell-business"]');

  place(home,"core-home",'<div class="cc-kicker">Toronto story</div><h3>Contribution. Stability. Ownership.</h3><p><strong>Hopeton LaTouche’s household is the featured Toronto family / tenant-owner story.</strong> <strong>Michie Mee is the episode host.</strong> Michie brings cultural memory, contribution and a public platform. Hopeton’s household brings work, caregiving, resilience, culture, local spending and a real ownership journey. Carnival Careers connects those contributions to tangible change, visible Carnival and mas parade attendance, and then the arena as the public victory lap.</p>');
  place(show,"core-show",'<div class="cc-kicker">The show</div><h3>Michie Mee carries the relationship and recognition.</h3><p>The episode follows recognition → relationship → tangible change → Carnival/mas parade visibility → public triumph. Michie Mee is the highlighted Toronto woman and host; Hopeton LaTouche is the featured family / tenant-owner. The parade shows the family and city inside the culture before the arena delivers the final emotional release.</p>');
  const eatYourKeepHtml = [
    '<section class="cc-eyk-shell" aria-labelledby="cc-eyk-title">',
    '<div class="cc-eyk-top">',
      '<div>',
        '<div class="cc-eyk-kicker">Eat Your Keep</div>',
        '<h3 class="cc-eyk-title" id="cc-eyk-title">Turn the grocery run into something you can build on.</h3>',
        '<p class="cc-eyk-lede">Buy groceries. Track the eligible part of the basket. Let the approved program rules turn ordinary household spending into measurable member value instead of another disposable points balance.</p>',
        '<div class="cc-eyk-punch"><span>Shop normally</span><span>Track eligible spend</span><span>Build community value</span></div>',
      '</div>',
      '<aside class="cc-eyk-tracker" aria-label="Eat Your Keep preview calculator">',
        '<h4>Try the ownership-path tracker</h4>',
        '<p class="cc-eyk-subtle">Move the sliders to preview how much of a household grocery budget could become eligible program activity once the final rules are approved.</p>',
        '<div class="cc-eyk-field"><div class="cc-eyk-field-head"><label for="eyk-spend">Monthly grocery spend</label><output data-eyk-spend-out>C$500</output></div><input class="cc-eyk-range" id="eyk-spend" data-eyk-spend type="range" min="50" max="1500" step="25" value="500"></div>',
        '<div class="cc-eyk-field"><div class="cc-eyk-field-head"><label for="eyk-eligible">Eligible share of basket</label><output data-eyk-eligible-out>80%</output></div><input class="cc-eyk-range" id="eyk-eligible" data-eyk-eligible type="range" min="0" max="100" step="5" value="80"></div>',
        '<div class="cc-eyk-results"><div class="cc-eyk-stat"><small>Eligible monthly activity</small><strong data-eyk-month>C$400</strong></div><div class="cc-eyk-stat"><small>Eligible annual activity</small><strong data-eyk-year>C$4,800</strong></div></div>',
        '<div class="cc-eyk-actions"><button class="cc-eyk-btn primary" type="button" data-eyk-save>Save this preview</button><button class="cc-eyk-btn ghost" type="button" data-eyk-reset>Reset</button></div>',
        '<p class="cc-eyk-saved" data-eyk-saved aria-live="polite"></p>',
      '</aside>',
    '</div>',
    '<div class="cc-eyk-flow" role="tablist" aria-label="How Eat Your Keep works">',
      '<button class="cc-eyk-step" type="button" role="tab" data-eyk-tab="shop" aria-selected="true"><b>01 · Shop</b><span>Groceries first, program second.</span></button>',
      '<button class="cc-eyk-step" type="button" role="tab" data-eyk-tab="track" aria-selected="false"><b>02 · Track</b><span>See eligible activity clearly.</span></button>',
      '<button class="cc-eyk-step" type="button" role="tab" data-eyk-tab="own" aria-selected="false"><b>03 · Build</b><span>Approved rules connect activity to member value.</span></button>',
    '</div>',
    '<div class="cc-eyk-panel active" data-eyk-panel="shop"><h4>Your normal grocery run stays normal.</h4><p>The point is not to invent another behaviour. Households buy the food they already need, while the system identifies which purchases qualify under the final approved structure.</p></div>',
    '<div class="cc-eyk-panel" data-eyk-panel="track"><h4>Make the value visible.</h4><p>A member-facing account can show eligible purchases, cumulative activity and the exact rule being applied, so people can see where the value came from instead of guessing what their points are worth.</p></div>',
    '<div class="cc-eyk-panel" data-eyk-panel="own"><h4>Move beyond ordinary loyalty points.</h4><p>The intended model is for eligible shopping to support a real member, share or co-operative stake in the grocery business once the legal, tax, accounting and redemption structure is approved.</p></div>',
    '<div class="cc-eyk-bottom">',
      '<div class="cc-eyk-value"><h4>Why this belongs inside Carnival Careers</h4><p>Food, family spending, local ownership and the public Carnival experience are not separate stories here. Eat Your Keep turns one of the most ordinary household expenses into a visible community-value lane inside the same family, commerce and city-activation ecosystem.</p></div>',
      '<div class="cc-eyk-guardrails"><strong>Launch guardrails</strong><p>The calculator is a design preview only. The final member/share/co-operative structure, eligibility rules, tax treatment, accounting, redemption mechanics and receipt wording must be approved before launch. No displayed amount is a promise of shares, cash value or investment return.</p></div>',
    '</div>',
    '</section>'
  ].join("");
  if (store) {
    const oldEatYourKeep = store.querySelector('[data-cc-core="core-store"], .cc-eyk-shell');
    if (oldEatYourKeep) oldEatYourKeep.remove();
  }
  if (sellBusiness) {
    sellBusiness.innerHTML = '<section class="section"><div class="wrap">'+eatYourKeepHtml+'</div></section>';
    initEatYourKeep(sellBusiness);
  }
  document.querySelectorAll('a[href="#sell-business"],a[href="#sell-a-business"]').forEach(a => {
    a.textContent = "Eat Your Keep";
    a.setAttribute("aria-label","Eat Your Keep");
  });
})();
</script>`;


const familiesWorkMergePatch = `
<script id="cc-families-work-merge">
(() => {
  const run = () => {
    const workPage = document.getElementById("page-families");
    const familiesPage = document.getElementById("page-childcare");

    if (workPage && familiesPage && !familiesPage.querySelector('[data-cc-family-work-top]')) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-cc-family-work-top","");
      wrapper.id = "family-work-pathway";

      while (workPage.firstChild) wrapper.appendChild(workPage.firstChild);
      familiesPage.insertAdjacentElement("afterbegin",wrapper);

      workPage.innerHTML = '<div class="wrap" style="padding:40px 20px"><a class="btn primary" href="#childcare">Open Families</a></div>';
    }

    const homeItem = document.querySelector('nav[aria-label="Primary"] .nav-item > a[href="#home"]')?.closest(".nav-item");
    homeItem?.querySelectorAll('.drop a[href="#families"]').forEach(a => {
      if ((a.textContent || "").trim().toLowerCase() === "families + work") a.remove();
    });

    document.querySelectorAll('a[href="#families"]').forEach(a => {
      if (!a.closest('nav[aria-label="Primary"] .nav-item > .drop')) a.setAttribute("href","#childcare");
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
})();
</script>`;

const showPageButtonPatch = `
<script id="cc-show-button-patch">
(() => {
  const run = () => {
    const start = "In each city, the hosts arrive as the audience’s guides into a complete Carnival Careers story:";
    const nodes = [...document.querySelectorAll("p,div")];
    const target = nodes.find(el => (el.textContent || "").trim().startsWith(start));
    if (target) {
      const parent = target.parentElement;
      const prior = target.previousElementSibling;
      if (prior && /^H[1-6]$/.test(prior.tagName) && (prior.textContent || "").trim().toUpperCase() === "THE SERVICE PROMISE") prior.remove();
      target.remove();
      if (parent) {
        const heading = [...parent.querySelectorAll("h1,h2,h3,h4,h5,h6")].find(h => (h.textContent || "").trim().toUpperCase() === "THE SERVICE PROMISE");
        if (heading) heading.remove();
      }
    }

    const oldShowSection = document.getElementById("home-host-experience");
    if (oldShowSection) oldShowSection.remove();

    const hero = document.getElementById("homeVideo");
    const heroSection = hero?.closest("section");
    const actions = heroSection?.querySelector(".actions") || document.querySelector("#page-home .actions");
    if (!actions) return;

    const home = document.getElementById("page-home") || document.querySelector('[data-page="home"]');
    if (home && heroSection) {
      const headings = [...home.querySelectorAll("h1,h2,h3,h4,h5,h6")];
      const tellHeading = headings.find(h => {
        const t = (h.textContent || "").trim().toLowerCase();
        return t === "tell me who you are." || t === "tell us who you are." || t === "tell me who you are" || t === "tell us who you are";
      });
      const nextStepHeading = headings.find(h => (h.textContent || "").trim().toLowerCase() === "choose your next step.");
      const tellSection = tellHeading?.closest("section");
      const nextStepSection = nextStepHeading?.closest("section");

      let anchor = heroSection;
      for (const section of [tellSection, nextStepSection]) {
        if (section && section !== heroSection) {
          anchor.insertAdjacentElement("afterend", section);
          anchor = section;
        }
      }
    }

    let btn = document.getElementById("homeShowOpen");
    if (!btn) {
      btn = document.createElement("a");
      btn.id = "homeShowOpen";
      btn.className = "btn";
      btn.href = "#show";
      btn.textContent = "See the Show";
    }
    if (actions.firstElementChild !== btn) actions.insertBefore(btn, actions.firstElementChild);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once:true });
  else run();
})();
</script>`;

const removeSmallClutterLabels = `
<script id="cc-remove-small-clutter-labels">
(() => {
  const unwanted = new Set(["MONEY ROUTES","FIND YOUR WAY IN","THE SERVICE PROMISE","HOW A REQUEST MOVES","FAMILY / PARENT / WORKER","CHILDCARE PROVIDER / AGENCY","EMPLOYER / SPONSOR / PRODUCTION","REQUEST STATUS"]);
  const run = () => {
    document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div,strong,small,label").forEach(el => {
      const t = (el.textContent || "").trim().replace(/\\s+/g," ").toUpperCase();
      if (unwanted.has(t)) el.remove();
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
})();
</script>`;

const projectStorySimplifyPatch = `
<style id="cc-project-story-simple-style">
  #project-story .project-inside{padding-top:10px}
  #project-story .cc-story-stage{position:relative;overflow:hidden;border-radius:30px;padding:clamp(26px,5vw,58px);background:
    radial-gradient(circle at 10% 8%,rgba(255,190,32,.30),transparent 28%),
    radial-gradient(circle at 92% 18%,rgba(237,56,161,.28),transparent 30%),
    linear-gradient(135deg,#21103c 0%,#35176a 48%,#101e33 100%);color:#fff;box-shadow:0 24px 70px rgba(17,8,40,.28)}
  #project-story .cc-story-stage:after{content:"";position:absolute;inset:auto -8% -36% 28%;height:62%;background:radial-gradient(circle,rgba(68,210,164,.20),transparent 62%);pointer-events:none}
  #project-story .cc-story-stage>*{position:relative;z-index:1}
  #project-story .cc-story-head{max-width:860px;margin-bottom:32px}
  #project-story .cc-story-head h2{margin:0 0 14px;font-size:clamp(2.6rem,6vw,5.4rem);line-height:.94;letter-spacing:-.055em;max-width:11ch}
  #project-story .cc-story-head p{margin:0;max-width:690px;font-size:clamp(1.02rem,1.7vw,1.24rem);line-height:1.62;color:rgba(255,255,255,.80)}
  #project-story .cc-story-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
  #project-story .cc-story-moment{min-height:250px;padding:22px;border-radius:22px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(10px);display:flex;flex-direction:column;justify-content:space-between}
  #project-story .cc-story-moment:nth-child(2){background:rgba(255,190,32,.16)}
  #project-story .cc-story-moment:nth-child(3){background:rgba(68,210,164,.14)}
  #project-story .cc-story-moment:nth-child(4){background:rgba(237,56,161,.16)}
  #project-story .cc-story-num{font-size:clamp(2rem,3vw,3.1rem);font-weight:950;line-height:1;opacity:.24}
  #project-story .cc-story-moment h3{margin:0 0 9px;font-size:clamp(1.18rem,1.8vw,1.5rem);line-height:1.08}
  #project-story .cc-story-moment p{margin:0;font-size:.96rem;line-height:1.55;color:rgba(255,255,255,.78)}
  #project-story .cc-story-result{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:18px;padding:19px 22px;border-radius:18px;background:#fff;color:#17131f}
  #project-story .cc-story-result strong{font-size:clamp(1.05rem,1.8vw,1.28rem)}
  #project-story .cc-story-result span{max-width:690px;font-size:.92rem;line-height:1.5;color:#5c5566}
  #project-story summary{font-size:clamp(1.3rem,2.4vw,2rem)!important;font-weight:900!important;line-height:1.1!important}
  @media(max-width:900px){#project-story .cc-story-flow{grid-template-columns:1fr 1fr}#project-story .cc-story-moment{min-height:220px}}
  @media(max-width:560px){#project-story .cc-story-flow{grid-template-columns:1fr}#project-story .cc-story-moment{min-height:0}#project-story .cc-story-result{align-items:flex-start;flex-direction:column}}
</style>
<script id="cc-project-story-simple-script">
(() => {
  const run = () => {
    const section = document.getElementById("project-story");
    if (!section) return;
    const summary = section.querySelector("summary");
    if (summary) summary.innerHTML = 'How one city works <span class="project-plus">+</span>';
    const inside = section.querySelector(".project-inside");
    if (!inside) return;
    inside.innerHTML = [
      '<div class="cc-story-stage">',
        '<div class="cc-story-head">',
          '<h2>A city story people can actually feel.</h2>',
          '<p>Carnival Careers starts with people, moves something real forward in their lives, brings the city into the journey, and saves the arena for the celebration.</p>',
        '</div>',
        '<div class="cc-story-flow">',
          '<article class="cc-story-moment"><div class="cc-story-num">01</div><div><h3>Meet the people</h3><p>A woman with a meaningful connection to the city introduces the family at the centre of the episode.</p></div></article>',
          '<article class="cc-story-moment"><div class="cc-story-num">02</div><div><h3>Understand what matters</h3><p>Dinner, conversation and time together reveal the family’s goals, pressures, history and what meaningful progress would look like.</p></div></article>',
          '<article class="cc-story-moment"><div class="cc-story-num">03</div><div><h3>Make something real happen</h3><p>Housing, work, food, mobility, childcare, local business and other practical needs move from conversation into visible action.</p></div></article>',
          '<article class="cc-story-moment"><div class="cc-story-num">04</div><div><h3>Let the city celebrate it</h3><p>Partners, culture, media and public activations carry the story outward. The arena concert comes last—after people understand what changed.</p></div></article>',
        '</div>',
      '</div>'
    ].join("");
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, {once:true});
  else run();
})();
</script>`;
const siteDedupePatch = `
<script id="cc-site-dedupe-script">
(() => {
  const norm = s => String(s || "").replace(/\\s+/g," ").trim();

  const findHeading = (pageId, text) => {
    const page = document.getElementById(pageId);
    if (!page) return null;
    return Array.from(page.querySelectorAll("h1,h2,h3,h4")).find(el => norm(el.textContent) === text) || null;
  };

  const removeClosest = (pageId, text, selector) => {
    const h = findHeading(pageId, text);
    const block = h?.closest(selector);
    if (block) block.remove();
  };

  // Project owns the overall city story. Investors should focus on investment choices.
  removeClosest("page-investors", "One repeatable city engine.", "section.partner-intro");
  removeClosest("page-investors", "There is real math behind the story.", "section.partner-section");

  // The hero and CTA already explain the city-to-city relationship.
  document.querySelector("#page-investors .world-band")?.remove();
  document.querySelector("#page-lenders .world-band")?.remove();
  document.querySelector("#page-professional-services .world-band")?.remove();

  // Professional Services should go straight from the promise to the actual service lanes.
  removeClosest("page-professional-services", "Recurring deal work, not a one-time favor.", "section.partner-intro");

  // Remove small explanatory labels when the large heading already says the same thing.
  document.querySelectorAll("#page-investors .partner-kicker,#page-lenders .partner-kicker,#page-professional-services .partner-kicker").forEach(el => el.remove());

  // Show owns viewing; Project owns the long explanation of how an episode works.
  const watchTitle = document.getElementById("show-watch-title");
  const watchHead = watchTitle?.parentElement;
  const watchIntro = watchHead ? Array.from(watchHead.children).find(el => el.tagName === "P") : null;
  if (watchIntro) watchIntro.remove();

  // Arena owns the finale details, not another recap of the full episode sequence.
  const arenaTitle = findHeading("page-arena", "The arena is the victory lap.");
  const arenaHead = arenaTitle?.closest(".head");
  const arenaIntro = arenaHead ? Array.from(arenaHead.children).find(el => el.tagName === "P") : null;
  if (arenaIntro) arenaIntro.remove();
})();
</script>`;

const lenderReadabilityPatch = `
<style id="cc-lender-readability-style">
  #page-lenders{font-size:18px}
  #page-lenders .page-hero h1{font-size:clamp(2.5rem,5vw,4.8rem)!important;line-height:1!important}
  #page-lenders h2{font-size:clamp(2rem,3.5vw,3rem)!important;line-height:1.08!important}
  #page-lenders h3{font-size:1.35rem!important;line-height:1.2!important}
  #page-lenders p,
  #page-lenders .partner-one-line,
  #page-lenders .lane-fit,
  #page-lenders .current-line span,
  #page-lenders .plain-note{font-size:1.08rem!important;line-height:1.65!important}
  #page-lenders .partner-kicker,
  #page-lenders .eyebrow,
  #page-lenders .lane-num{font-size:1rem!important;letter-spacing:.08em!important}
  #page-lenders .current-line strong{font-size:1.22rem!important}
  #page-lenders label{font-size:1.02rem!important;line-height:1.4!important}
  #page-lenders input,
  #page-lenders select,
  #page-lenders textarea,
  #page-lenders button{font-size:1rem!important}
  #page-lenders input,
  #page-lenders select{min-height:50px!important}
  #page-lenders textarea{min-height:150px!important;line-height:1.5!important}
  #page-lenders .partner-intro,
  #page-lenders .partner-section:not(.dark),
  #page-lenders .partner-cta,
  #page-lenders .world-band{color:#171717!important}
  #page-lenders .partner-intro p,
  #page-lenders .partner-section:not(.dark) p,
  #page-lenders .partner-cta p,
  #page-lenders .world-band p,
  #page-lenders .lane-fit,
  #page-lenders .plain-note{color:#38323f!important;opacity:1!important}
  #page-lenders .page-hero,
  #page-lenders .partner-section.dark{color:#fff!important}
  #page-lenders .page-hero p,
  #page-lenders .partner-section.dark p,
  #page-lenders .partner-section.dark span{color:rgba(255,255,255,.88)!important;opacity:1!important}
  #page-lenders .partner-section.dark strong,
  #page-lenders .partner-section.dark h2,
  #page-lenders .partner-section.dark h3{color:#fff!important}
  #page-lenders form,
  #page-lenders form h3,
  #page-lenders form label{color:#171717!important}
  #page-lenders input,
  #page-lenders select,
  #page-lenders textarea{color:#171717!important;background:#fff!important}
  #page-lenders input::placeholder,
  #page-lenders textarea::placeholder{color:#6a6370!important;opacity:1!important}
  #page-lenders .lane-row,
  #page-lenders .simple-point,
  #page-lenders .current-line{padding-top:20px!important;padding-bottom:20px!important}
  @media(max-width:640px){
    #page-lenders{font-size:17px}
    #page-lenders p,
    #page-lenders .partner-one-line,
    #page-lenders .lane-fit,
    #page-lenders .current-line span,
    #page-lenders .plain-note{font-size:1rem!important}
  }
</style>`;

const projectCapitalMergePatch = `
<style id="cc-project-capital-merge-style">
  #project-capital-merged{margin:34px 0 10px}
  #project-capital-merged .cc-whole-reconcile{font-size:1.14rem;padding:32px}
  #project-capital-merged .cc-whole-reconcile>h2{font-size:clamp(2.2rem,4.5vw,3.7rem);line-height:1.02;margin:0 0 20px}
  #project-capital-merged .cc-whole-card{font-size:1.12rem;line-height:1.5;padding:20px}
  #project-capital-merged .cc-whole-card b{font-size:1.55rem;line-height:1.12;margin-bottom:8px}
  #project-capital-merged .cc-whole-table{font-size:1.08rem;line-height:1.5}
  #project-capital-merged .cc-whole-table td,#project-capital-merged .cc-whole-table th{padding:13px 10px}
  #project-capital-merged .cc-whole-note{font-size:1.05rem;line-height:1.65;opacity:.94}
  @media(max-width:640px){
    #project-capital-merged .cc-whole-reconcile{padding:22px 18px}
    #project-capital-merged .cc-whole-table{font-size:1rem}
  }
</style>
<script id="cc-project-capital-merge-script">
(() => {
  const run = () => {
    const project = document.getElementById("page-project") || document.querySelector('[data-page="project"]');
    const capital = document.getElementById("page-capital") || document.querySelector('[data-page="capital"]');
    if (!project) return;

    if (capital) {
      const capitalBox = capital.querySelector(".cc-whole-reconcile");
      if (capitalBox && !document.getElementById("project-capital-merged")) {
        const merged = document.createElement("section");
        merged.id = "project-capital-merged";
        merged.className = "section";

        const wrap = document.createElement("div");
        wrap.className = "wrap";
        merged.appendChild(wrap);

        const kicker = capitalBox.querySelector(".cc-kicker");
        if (kicker) kicker.remove();

        const title = capitalBox.querySelector("h1");
        if (title) {
          const h2 = document.createElement("h2");
          h2.textContent = "Project funding";
          title.replaceWith(h2);
        }

        const firstP = capitalBox.querySelector(":scope > p");
        if (firstP) firstP.remove();

        wrap.appendChild(capitalBox);
        project.appendChild(merged);
      }

      capital.remove();
    }

    const isCapitalHref = a => {
      const href = String(a.getAttribute("href") || "").trim();
      return href === "#capital" || /#capital$/i.test(href);
    };

    document.querySelectorAll("nav a,header a").forEach(a => {
      if (!isCapitalHref(a)) return;
      if ((a.textContent || "").trim().toLowerCase() === "capital") {
        const li = a.closest("li");
        if (li && li.querySelectorAll("a").length === 1) li.remove();
        else a.remove();
      }
    });

    document.querySelectorAll("a").forEach(a => {
      if (isCapitalHref(a)) a.setAttribute("href","#project");
    });

    const rerouteOldCapitalHash = () => {
      if (String(location.hash || "").toLowerCase() !== "#capital") return;
      location.hash = "project";
    };
    window.addEventListener("hashchange", rerouteOldCapitalHash);
    rerouteOldCapitalHash();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
})();
</script>`;

const trailerExperience = `
<style id="cc-trailer-modal-style">
  #cc-trailer-modal{position:fixed;inset:0;z-index:2147483500;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(2,6,12,.86);backdrop-filter:blur(10px)}
  #cc-trailer-modal.open{display:flex}
  #cc-trailer-shell{position:relative;width:min(1100px,96vw);max-height:92vh;border-radius:24px;overflow:hidden;background:#03070d;border:1px solid rgba(255,255,255,.18);box-shadow:0 32px 100px rgba(0,0,0,.65)}
  #cc-trailer-video{display:block;width:100%;max-height:82vh;background:#000}
  #cc-trailer-close{position:absolute;right:14px;top:14px;z-index:2;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:rgba(3,7,13,.82);color:#fff;font-size:24px;cursor:pointer}
  #cc-trailer-label{padding:12px 18px;color:#dfe7f2;font-size:12px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
  #homeTrailerOpen{background:var(--pink)!important;color:#fff!important;border-color:var(--pink)!important}
</style>
<script id="cc-trailer-modal-script">
(() => {
  const init=()=>{
    const hero=document.getElementById("homeVideo");
    if(!hero)return;
    const actions=hero.closest("section")?.querySelector(".actions")||document.querySelector("#page-home .actions");
    if(!actions)return;
    let openBtn=document.getElementById("homeTrailerOpen");
    if(!openBtn){
      openBtn=document.createElement("button");
      openBtn.type="button";
      openBtn.id="homeTrailerOpen";
      openBtn.className="btn";
      openBtn.textContent="See trailer";
      const pauseBtn=document.getElementById("homeVideoToggle");
      if(pauseBtn)actions.insertBefore(openBtn,pauseBtn); else actions.appendChild(openBtn);
    }
    let modal=document.getElementById("cc-trailer-modal");
    if(!modal){
      modal=document.createElement("div");
      modal.id="cc-trailer-modal";
      modal.setAttribute("role","dialog");
      modal.setAttribute("aria-modal","true");
      modal.setAttribute("aria-label","Carnival Careers trailer");
      modal.innerHTML='<div id="cc-trailer-shell"><button id="cc-trailer-close" type="button" aria-label="Close trailer">×</button><video id="cc-trailer-video" controls playsinline preload="metadata"></video><div id="cc-trailer-label">Carnival Careers · trailer with sound</div></div>';
      document.body.appendChild(modal);
    }
    const player=modal.querySelector("#cc-trailer-video");
    const closeBtn=modal.querySelector("#cc-trailer-close");
    const source=hero.querySelector("source")?.getAttribute("src")||hero.getAttribute("src")||hero.currentSrc;
    let heroWasPlaying=false;
    const close=()=>{
      player.pause();
      try{player.currentTime=0;}catch(e){}
      modal.classList.remove("open");
      document.body.style.overflow="";
      if(heroWasPlaying){hero.muted=true;hero.play().catch(()=>{});}
      openBtn.focus();
    };
    openBtn.addEventListener("click",()=>{
      heroWasPlaying=!hero.paused;
      hero.pause();
      if(source && player.getAttribute("src")!==source){player.setAttribute("src",source);player.load();}
      player.muted=false;
      player.volume=1;
      modal.classList.add("open");
      document.body.style.overflow="hidden";
      player.play().catch(()=>{});
      closeBtn.focus();
    });
    closeBtn.addEventListener("click",close);
    modal.addEventListener("click",e=>{if(e.target===modal)close();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))close();});
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();
</script>`;


const vendorSponsorJourneyPatch = `
<style id="cc-vendor-sponsor-journey-style">
  .cc-partner-journey{margin:28px auto 44px;max-width:1180px;padding:clamp(22px,4vw,46px);border-radius:30px;color:#fff;position:relative;overflow:hidden;box-shadow:0 24px 70px rgba(19,10,44,.22)}
  .cc-partner-journey.vendor{background:radial-gradient(circle at 12% 10%,rgba(255,190,32,.30),transparent 30%),radial-gradient(circle at 90% 15%,rgba(68,210,164,.22),transparent 28%),linear-gradient(135deg,#1d1231 0%,#352063 52%,#10253b 100%)}
  .cc-partner-journey.sponsor{background:radial-gradient(circle at 8% 8%,rgba(237,56,161,.30),transparent 28%),radial-gradient(circle at 92% 12%,rgba(255,190,32,.24),transparent 30%),linear-gradient(135deg,#171026 0%,#3e195f 48%,#101f38 100%)}
  .cc-partner-journey:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.18;background-image:radial-gradient(rgba(255,255,255,.75) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(to bottom,black,transparent 82%)}
  .cc-partner-journey>*{position:relative;z-index:1}
  .cc-pj-kicker{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.08);font-size:.76rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
  .cc-pj-kicker:before{content:"";width:9px;height:9px;border-radius:50%;background:#ffbe20}
  .cc-pj-head{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:28px;align-items:end}
  .cc-pj-head h2{margin:14px 0 10px;font-size:clamp(2.4rem,5.5vw,5rem);line-height:.95;letter-spacing:-.05em;max-width:11ch}
  .cc-pj-head p{margin:0;max-width:720px;font-size:clamp(1rem,1.6vw,1.18rem);line-height:1.62;color:rgba(255,255,255,.80)}
  .cc-pj-summary{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
  .cc-pj-summary div{padding:15px;border-radius:18px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.16)}
  .cc-pj-summary strong{display:block;font-size:1.02rem;margin-bottom:4px}
  .cc-pj-summary span{font-size:.82rem;line-height:1.4;color:rgba(255,255,255,.7)}
  .cc-pj-paths{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:28px 0 16px}
  .cc-pj-path{appearance:none;text-align:left;padding:16px;border-radius:18px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:#fff;cursor:pointer;transition:.2s ease}
  .cc-pj-path:hover,.cc-pj-path[aria-selected="true"]{transform:translateY(-2px);background:#fff;color:#1b1425;border-color:#fff}
  .cc-pj-path b{display:block;font-size:1rem;margin-bottom:5px}
  .cc-pj-path span{display:block;font-size:.8rem;line-height:1.35;opacity:.72}
  .cc-pj-path-detail{padding:17px 19px;border-radius:18px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.15);margin-bottom:28px}
  .cc-pj-path-detail strong{display:block;margin-bottom:5px}
  .cc-pj-path-detail p{margin:0;color:rgba(255,255,255,.76);line-height:1.55}
  .cc-pj-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .cc-pj-step{position:relative;min-height:230px;padding:20px;border-radius:21px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);display:flex;flex-direction:column;justify-content:space-between}
  .cc-pj-step .num{font-size:2.4rem;font-weight:950;line-height:1;opacity:.22}
  .cc-pj-step h3{margin:0 0 8px;font-size:1.13rem;line-height:1.12}
  .cc-pj-step p{margin:0;font-size:.89rem;line-height:1.55;color:rgba(255,255,255,.74)}
  .cc-pj-step em{display:inline-block;margin-top:10px;font-size:.76rem;line-height:1.35;color:#ffdf7a;font-style:normal;font-weight:850}
  .cc-pj-tool{display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.72fr);gap:16px;margin-top:24px}
  .cc-pj-checklist,.cc-pj-cta{padding:21px;border-radius:21px;background:rgba(5,10,20,.32);border:1px solid rgba(255,255,255,.14)}
  .cc-pj-check-head{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:14px}
  .cc-pj-check-head h3,.cc-pj-cta h3{margin:0;font-size:1.22rem}
  .cc-pj-progress{font-size:.82rem;font-weight:900;padding:7px 10px;border-radius:999px;background:#fff;color:#21172c;white-space:nowrap}
  .cc-pj-checks{display:grid;grid-template-columns:1fr 1fr;gap:9px}
  .cc-pj-checks label{display:flex;gap:9px;align-items:flex-start;padding:10px 11px;border-radius:13px;background:rgba(255,255,255,.06);font-size:.84rem;line-height:1.35;cursor:pointer}
  .cc-pj-checks input{margin-top:2px;accent-color:#ffbe20}
  .cc-pj-note{margin:12px 0 0;font-size:.76rem;line-height:1.45;color:rgba(255,255,255,.61)}
  .cc-pj-cta p{margin:8px 0 16px;color:rgba(255,255,255,.74);line-height:1.5;font-size:.9rem}
  .cc-pj-actions{display:flex;flex-wrap:wrap;gap:9px}
  .cc-pj-action{display:inline-flex;align-items:center;justify-content:center;min-height:43px;padding:0 15px;border-radius:999px;text-decoration:none!important;font-size:.82rem;font-weight:900;border:1px solid rgba(255,255,255,.26)}
  .cc-pj-action.primary{background:#fff;color:#21172c!important}
  .cc-pj-action.secondary{background:transparent;color:#fff!important}
  .cc-pj-after{margin-top:14px;padding:15px;border-radius:16px;background:rgba(255,255,255,.07);font-size:.82rem;line-height:1.5;color:rgba(255,255,255,.72)}
  @media(max-width:940px){.cc-pj-head,.cc-pj-tool{grid-template-columns:1fr}.cc-pj-steps{grid-template-columns:1fr 1fr}.cc-pj-step{min-height:200px}}
  @media(max-width:620px){.cc-partner-journey{border-radius:22px;padding:20px}.cc-pj-paths,.cc-pj-steps,.cc-pj-checks,.cc-pj-summary{grid-template-columns:1fr}.cc-pj-step{min-height:0}.cc-pj-head h2{font-size:2.5rem}.cc-pj-check-head{align-items:flex-start;flex-direction:column}}
</style>
<script id="cc-vendor-sponsor-journey-script">
(() => {
  const byAny = (ids, pages) => {
    for (const id of ids) { const el=document.getElementById(id); if(el) return el; }
    for (const p of pages) { const el=document.querySelector('[data-page="'+p+'"]'); if(el) return el; }
    for (const id of ids) {
      const bare=id.replace(/^page-/,"");
      const link=document.querySelector('a[href="#'+bare+'"]');
      const target=link ? document.getElementById(bare) || document.getElementById("page-"+bare) : null;
      if(target) return target;
    }
    return null;
  };
  const pageHost = page => page && (page.querySelector(".page-inner,.content,.section-inner,.container,.wrap") || page);
  const findForm = page => page && page.querySelector("form");
  const ensureAnchor = (el,id) => { if(el && !el.id) el.id=id; return el ? "#"+el.id : null; };
  const addJourney = (page, kind) => {
    if(!page || page.querySelector('[data-cc-partner-journey="'+kind+'"]')) return;
    const host=pageHost(page);
    if(!host) return;
    const existingForm=findForm(page);
    const formHash=ensureAnchor(existingForm,"cc-"+kind+"-form");
    const existingSections=[...page.querySelectorAll("section,article,div")].filter(el => {
      const t=(el.textContent||"").trim().toLowerCase();
      return kind==="vendor" ? /vendor (tier|package|space)|marketplace|booth/.test(t) : /sponsor (tier|package)|rights fee|lounge|anchor/.test(t);
    });
    const packageHash=ensureAnchor(existingSections[0],"cc-"+kind+"-packages");

    const vendor = kind==="vendor";
    const data = vendor ? {
      title:"From first click to load-out — here is the whole vendor experience.",
      intro:"A vendor should never have to guess what happens next. You tell us what you want to sell, serve, demonstrate or supply; we confirm the fit; the agreement locks the details; then you get a clear plan for setup, event day and follow-up.",
      summaries:[
        ["One clear contact","Know who is handling your file and event-day questions."],
        ["One written scope","Space, services, fees, requirements and timing are confirmed before activation."],
        ["Event-day plan","Load-in, passes, power, placement, hours and breakdown are organized in advance."],
        ["Future-city path","Strong vendors can be considered again as Carnival Careers moves city to city."]
      ],
      paths:[
        ["Sell to guests","Food, products, retail or paid experiences for event attendees.","You are selling directly to guests. We focus on your category, footprint, power/water needs, permits, inventory, POS, signage and event-day sales setup."],
        ["Activate a brand/service","Sampling, demos, recruiting, community services or interactive booths.","You are creating an experience rather than simply selling inventory. We map the activity, staffing, guest flow, data capture, signage and any approval or safety requirements."],
        ["Supply Carnival Careers","Production, equipment, staffing, transport, food, services or other contracted supply.","Carnival Careers is the customer. Your quote, deliverables, timeline, insurance, invoicing and payment terms belong in the supplier agreement before work starts."]
      ],
      steps:[
        ["01","Tell us what you do","Choose the city and explain what you want to sell, activate or supply. Include your footprint, basic needs and any licences or permits you already have.","Outcome: we know whether there is a fit."],
        ["02","Fit + selection","We review category fit, space, conflicts, operational needs and the current city plan. If selected, we confirm the offer and next step in writing.","Outcome: no guessing about your lane."],
        ["03","Agreement + paperwork","The written agreement sets the space or deliverable, fee/payment terms, dates, insurance, permits, cancellation rules and responsibilities.","Outcome: both sides know the deal."],
        ["04","Build the activation plan","We lock load-in, placement, footprint, power, water, Wi-Fi, passes, staffing, signage, inventory, POS, parking and key contacts.","Outcome: a usable event-day plan."],
        ["05","Final readiness check","Before the event, required documents and creative are approved, the team receives arrival instructions, and open operational issues are closed.","Outcome: ready to arrive and work."],
        ["06","Event day","Check in, load in, operate during your assigned hours, follow safety/site rules, get support through the event contact, then break down on schedule.","Outcome: clean delivery on site."],
        ["07","Close-out","Any final invoices, settlement items, incident notes, lost-property issues or promised follow-up are completed after the event.","Outcome: the file is actually closed."],
        ["08","Next city","We record what worked. Vendors that fit the model can be invited or considered for another city instead of starting from zero each time.","Outcome: one event can become a relationship."]
      ],
      checks:["Business/contact information","City + event requested","What you sell or supply","Footprint / table / booth size","Power / water / Wi-Fi needs","Staff count + names","Insurance / COI if required","Permits / health documents if required","Pricing / menu / product list","Logo + signage files","Load-in vehicle details","Invoice / payment information"],
      ctaTitle:"Ready to move your vendor file forward?",
      ctaText:"Use the existing application on this page. The more complete the first submission is, the faster we can tell you what is missing and whether the current city has a place for you.",
      after:"Important: being considered is not the same as being confirmed. Space, category rights, sales expectations, audience size and revenue are not guaranteed unless they are specifically written into the final agreement.",
      primary:"Start / finish vendor application",
      secondary:"See vendor options"
    } : {
      title:"From first conversation to proof of delivery — here is the whole sponsor experience.",
      intro:"A sponsor should be able to see exactly how money turns into an activation. We start with the business goal, match it to the right part of Carnival Careers, lock the rights and deliverables in writing, build the activation, document what was delivered, and then decide what should continue.",
      summaries:[
        ["Business goal first","Awareness, customer access, hospitality, community impact, content or another measurable objective."],
        ["Rights in writing","Fee, category rights, placements, dates, approvals and deliverables are locked before launch."],
        ["One activation calendar","Creative, production, media, event and on-site deadlines live in one plan."],
        ["Proof after delivery","Sponsors receive a fulfillment record instead of relying on memory or promises."]
      ],
      paths:[
        ["Brand + visibility","Naming, signage, digital visibility, content integration or broad brand presence.","We map where the brand appears, which assets are included, approval deadlines, category rights and the exact period covered by the agreement."],
        ["Guest + VIP experience","Hospitality, lounges, sampling, on-site experiences, customer hosting or premium access.","We design the guest journey, capacities, credentials, staffing, signage, service requirements and who owns each operating detail."],
        ["Community + project activation","Support tied to family progress, local commerce, mobility, food, work, city activity or another real project component.","We connect the sponsorship to a defined program or activation with a clear use, deliverables and evidence of what was actually completed. Sponsorship does not buy editorial control."]
      ],
      steps:[
        ["01","Tell us the business goal","Start with who you need to reach, what you want people to do or feel, the city or cities you care about, timing and budget range.","Outcome: we solve for the objective, not just logo placement."],
        ["02","Match the package","We connect the goal to the sponsor opportunities already listed on this page and identify the rights and activation pieces that make sense.","Outcome: a package with a reason behind it."],
        ["03","Scope + agreement","The agreement locks the rights fee, payment schedule, category terms, deliverables, dates, approvals, cancellation terms and responsibilities.","Outcome: the commercial promise becomes specific."],
        ["04","Collect assets","We gather logos, brand rules, legal lines, product information, URLs, creative files, guest lists and named approvers.","Outcome: production can move without chasing basics."],
        ["05","Build the activation","Carnival Careers and the sponsor map signage, content, hospitality, on-site footprint, staffing, product, tech, guest flow and production deadlines.","Outcome: every deliverable has an owner and due date."],
        ["06","Pre-event launch","Approved assets go live on the agreed schedule. Open issues are tracked before the city activation and arena event begin.","Outcome: no last-minute mystery about what is running."],
        ["07","Live delivery","The sponsor receives its contracted on-site presence, hospitality and activation support. Event contacts manage issues against the signed scope.","Outcome: the plan becomes visible in the real event."],
        ["08","Proof + renewal","After delivery, we organize fulfillment evidence such as asset screenshots, photos, links, attendance/engagement data that is actually available, and a recap of contracted items delivered.","Outcome: decide what to repeat, improve or expand."]
      ],
      checks:["Company + main contact","City / cities of interest","Business objective","Budget / package interest","Category + competitor conflicts","Logo + brand guidelines","Required legal wording","Activation concept","Hospitality / guest needs","Named creative approver","Billing / PO information","Measurement priorities"],
      ctaTitle:"Ready to build the sponsor activation?",
      ctaText:"Use the sponsor form already on this page and tell us the business goal first. We can then line it up with the existing packages, rights and city plan.",
      after:"Important: sponsorship deliverables, audience numbers, media results, category exclusivity and measurement methods are only what the final signed agreement states. Sponsorship supports the project but does not purchase editorial control of the television story.",
      primary:"Start / finish sponsor inquiry",
      secondary:"See sponsor packages"
    };

    const root=document.createElement("section");
    root.className="cc-partner-journey "+kind;
    root.setAttribute("data-cc-partner-journey",kind);
    const summaryHtml=data.summaries.map(x=>'<div><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join("");
    const pathsHtml=data.paths.map((x,i)=>'<button type="button" class="cc-pj-path" data-pj-path="'+i+'" aria-selected="'+(i===0?'true':'false')+'"><b>'+x[0]+'</b><span>'+x[1]+'</span></button>').join("");
    const stepsHtml=data.steps.map(x=>'<article class="cc-pj-step"><div class="num">'+x[0]+'</div><div><h3>'+x[1]+'</h3><p>'+x[2]+'</p><em>'+x[3]+'</em></div></article>').join("");
    const checksHtml=data.checks.map((x,i)=>'<label><input type="checkbox" data-pj-check="'+i+'"><span>'+x+'</span></label>').join("");
    root.innerHTML=[
      '<div class="cc-pj-head"><div><div class="cc-pj-kicker">'+(vendor?'Vendor journey':'Sponsor journey')+'</div><h2>'+data.title+'</h2><p>'+data.intro+'</p></div><div class="cc-pj-summary">'+summaryHtml+'</div></div>',
      '<div class="cc-pj-paths" role="tablist" aria-label="'+(vendor?'Vendor types':'Sponsor activation types')+'">'+pathsHtml+'</div>',
      '<div class="cc-pj-path-detail" aria-live="polite"><strong>'+data.paths[0][0]+'</strong><p>'+data.paths[0][2]+'</p></div>',
      '<div class="cc-pj-steps">'+stepsHtml+'</div>',
      '<div class="cc-pj-tool">',
        '<div class="cc-pj-checklist"><div class="cc-pj-check-head"><h3>Your readiness checklist</h3><span class="cc-pj-progress">0 / '+data.checks.length+' ready</span></div><div class="cc-pj-checks">'+checksHtml+'</div><p class="cc-pj-note">Your checklist saves only in this browser. It does not submit information to Carnival Careers.</p></div>',
        '<div class="cc-pj-cta"><h3>'+data.ctaTitle+'</h3><p>'+data.ctaText+'</p><div class="cc-pj-actions">'+
          (formHash?'<a class="cc-pj-action primary" href="'+formHash+'">'+data.primary+'</a>':'')+
          (packageHash?'<a class="cc-pj-action secondary" href="'+packageHash+'">'+data.secondary+'</a>':'')+
          '</div><div class="cc-pj-after">'+data.after+'</div></div>',
      '</div>'
    ].join("");

    const hero=page.querySelector(".page-hero,.partner-hero,.hero");
    if(hero && hero.parentElement) hero.insertAdjacentElement("afterend",root);
    else host.insertAdjacentElement("afterbegin",root);

    const detail=root.querySelector(".cc-pj-path-detail");
    root.querySelectorAll(".cc-pj-path").forEach(btn=>btn.addEventListener("click",()=>{
      const i=Number(btn.getAttribute("data-pj-path"))||0;
      root.querySelectorAll(".cc-pj-path").forEach(x=>x.setAttribute("aria-selected",String(x===btn)));
      detail.innerHTML='<strong>'+data.paths[i][0]+'</strong><p>'+data.paths[i][2]+'</p>';
    }));

    const key="cc-"+kind+"-readiness";
    const boxes=[...root.querySelectorAll("[data-pj-check]")];
    const progress=root.querySelector(".cc-pj-progress");
    const update=()=>{
      const done=boxes.filter(x=>x.checked).length;
      progress.textContent=done+" / "+boxes.length+" ready";
      try{localStorage.setItem(key,JSON.stringify(boxes.map(x=>x.checked)));}catch(e){}
    };
    try{
      const saved=JSON.parse(localStorage.getItem(key)||"[]");
      boxes.forEach((x,i)=>{if(saved[i])x.checked=true;});
    }catch(e){}
    boxes.forEach(x=>x.addEventListener("change",update));
    update();
  };

  const run=()=>{
    const vendors=byAny(["page-vendors","page-vendor"],["vendors","vendor"]);
    const sponsors=byAny(["page-sponsors","page-sponsor"],["sponsors","sponsor"]);
    addJourney(vendors,"vendor");
    addJourney(sponsors,"sponsor");
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
})();
</script>`;


const audienceRoutingPatch = "\n<style id=\"cc-audience-routing-v2-style\">\n  #arena-artist-intake{background:linear-gradient(145deg,#120a22 0%,#261044 52%,#07121c 100%);color:#fff}\n  #arena-artist-intake .cc-artist-shell{display:grid;grid-template-columns:minmax(0,.9fr) minmax(320px,1.1fr);gap:28px;align-items:start}\n  #arena-artist-intake .cc-artist-copy h2{font-size:clamp(2rem,4vw,4rem);line-height:.98;margin:.18em 0 .35em}\n  #arena-artist-intake .cc-artist-copy p{color:rgba(255,255,255,.78);line-height:1.65}\n  #arena-artist-intake .cc-role-chips{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}\n  #arena-artist-intake .cc-role-chips span{padding:8px 11px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);font-weight:800;font-size:.8rem}\n  #arena-artist-intake .cc-artist-form{padding:22px;border-radius:22px;background:#fff;color:#14121a;box-shadow:0 20px 55px rgba(0,0,0,.32)}\n  #arena-artist-intake .cc-artist-form h3{margin-top:0;font-size:1.4rem}\n  #arena-artist-intake .cc-form-grid,#page-experiences .cc-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n  #arena-artist-intake label,#page-experiences label{display:grid;gap:6px;font-weight:800;font-size:.86rem}\n  #arena-artist-intake label.wide,#page-experiences label.wide{grid-column:1/-1}\n  #arena-artist-intake input,#arena-artist-intake select,#arena-artist-intake textarea,\n  #page-experiences input,#page-experiences select,#page-experiences textarea{width:100%;padding:12px;border-radius:11px;border:1px solid #cfd6df;background:#fff;color:#111827;font:inherit}\n  #arena-artist-intake textarea,#page-experiences textarea{min-height:104px;resize:vertical}\n  #arena-artist-intake .cc-check,#page-experiences .cc-check{display:flex;gap:9px;align-items:flex-start;font-weight:600}\n  #arena-artist-intake .cc-check input,#page-experiences .cc-check input{width:auto;margin-top:3px}\n  .cc-intake-result{margin-top:12px;padding:12px 14px;border-radius:12px;background:#eef7ff;color:#17324d;line-height:1.5}\n  .cc-intake-result:empty{display:none}\n\n  #page-experiences{background:#f7f2ff;color:#18131f}\n  #page-experiences .cc-media-hero{position:relative;overflow:hidden;padding:clamp(78px,10vw,140px) 0 86px;background:radial-gradient(circle at 8% 10%,rgba(255,196,38,.48),transparent 26%),radial-gradient(circle at 90% 8%,rgba(240,52,166,.46),transparent 28%),radial-gradient(circle at 75% 88%,rgba(40,211,170,.28),transparent 30%),linear-gradient(135deg,#120728 0%,#3d126d 47%,#071b2c 100%);color:#fff}\n  #page-experiences .cc-media-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 0 64%,rgba(255,255,255,.04) 64% 66%,transparent 66% 100%),linear-gradient(65deg,transparent 0 77%,rgba(255,255,255,.03) 77% 79%,transparent 79% 100%);pointer-events:none}\n  #page-experiences .cc-media-hero .wrap{position:relative;z-index:1}\n  #page-experiences .cc-media-hero .eyebrow{display:inline-flex;align-items:center;gap:8px;padding:9px 13px;border-radius:999px;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.18);font-size:.82rem;font-weight:900;letter-spacing:.08em}\n  #page-experiences .cc-media-hero h1{max-width:9ch;font-size:clamp(4rem,9vw,8.5rem);line-height:.82;letter-spacing:-.065em;margin:.18em 0 .18em;text-wrap:balance}\n  #page-experiences .cc-media-hero p{max-width:62ch;color:rgba(255,255,255,.84);font-size:clamp(1.1rem,1.9vw,1.34rem);line-height:1.62}\n  #page-experiences .cc-media-hero p:after{content:'Carnival  •  Mas  •  Arena  •  Parade  •  Festival';display:block;margin-top:24px;color:#ffd15d;font-weight:900;letter-spacing:.05em;font-size:.9rem}\n  #page-experiences .cc-media-main{padding:68px 0 78px;background:radial-gradient(circle at 5% 0%,rgba(112,72,232,.08),transparent 28%),linear-gradient(#faf8ff,#f5f0fb)}\n  #page-experiences .cc-media-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(360px,1.05fr);gap:34px;align-items:start}\n  #page-experiences .cc-media-form{padding:clamp(24px,3vw,34px);border-radius:30px;background:#fff;border:1px solid #ddd1ee;box-shadow:0 24px 70px rgba(48,21,82,.12);position:sticky;top:24px}\n  #page-experiences .cc-media-form h2{margin:0 0 8px;font-size:clamp(2rem,3.4vw,3rem);line-height:1}\n  #page-experiences .cc-media-form p{margin-top:0;color:#655e70;line-height:1.62;font-size:1.04rem}\n  #page-experiences .cc-media-form label{font-size:.96rem;line-height:1.35}\n  #page-experiences .cc-media-form input,#page-experiences .cc-media-form select,#page-experiences .cc-media-form textarea{padding:14px 15px;border-radius:13px;border:1px solid #cbc2d8;background:#fff;color:#17121c;font-size:1rem}\n  #page-experiences .cc-media-form textarea{min-height:132px}\n  #page-experiences .cc-media-form .btn{margin-top:4px;padding:14px 18px;border-radius:999px;font-size:1rem;font-weight:900}\n  #page-experiences .cc-media-grid>div>.darkey{display:inline-flex;padding:8px 11px;border-radius:999px;background:#ede5fa;color:#5e338f;font-size:.78rem;font-weight:950;letter-spacing:.09em}\n  #page-experiences .cc-media-grid>div>h2{margin:.25em 0 .55em;font-size:clamp(2rem,4vw,3.5rem);line-height:.98;letter-spacing:-.035em}\n  #page-experiences .cc-media-wall{display:grid;gap:16px}\n  #page-experiences .cc-media-card{position:relative;overflow:hidden;padding:24px;border-radius:24px;background:linear-gradient(145deg,#fff,#fbf8ff);border:1px solid #dfd3ed;box-shadow:0 16px 42px rgba(46,21,77,.08)}\n  #page-experiences .cc-media-card:before{content:'';position:absolute;inset:0 auto 0 0;width:6px;background:linear-gradient(#ffbf2c,#e63fa9,#6944e8)}\n  #page-experiences .cc-media-card small{display:block;color:#756487;font-weight:950;letter-spacing:.09em;text-transform:uppercase;font-size:.78rem}\n  #page-experiences .cc-media-card h3{margin:9px 0 10px;font-size:1.45rem;line-height:1.15}\n  #page-experiences .cc-media-card p{color:#595164;line-height:1.58;font-size:1rem}\n  #page-experiences .cc-media-card a{display:inline-flex;margin-top:5px;font-weight:950;color:#5a2aca;text-decoration:none}\n  #page-experiences .cc-empty-wall{padding:28px;border:1px dashed #b9a6db;border-radius:24px;background:rgba(255,255,255,.75);color:#62566f;font-size:1.03rem;line-height:1.6}\n  #page-experiences .cc-weekly{position:relative;overflow:hidden;padding:72px 0 88px;background:radial-gradient(circle at 10% 15%,rgba(255,195,39,.16),transparent 25%),radial-gradient(circle at 90% 14%,rgba(229,57,165,.18),transparent 25%),linear-gradient(135deg,#080d19,#15112b 50%,#211035);color:#fff}\n  #page-experiences .cc-weekly:after{content:'';position:absolute;right:-10%;bottom:-40%;width:52%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(55,221,176,.15),transparent 64%);pointer-events:none}\n  #page-experiences .cc-weekly .wrap{position:relative;z-index:1}\n  #page-experiences .cc-weekly-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:26px}\n  #page-experiences .cc-weekly-head .eyebrow{display:inline-flex;padding:8px 11px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.13);font-size:.78rem;font-weight:950;letter-spacing:.09em}\n  #page-experiences .cc-weekly-head h2{margin:.22em 0 0;font-size:clamp(2.8rem,5.5vw,5rem);line-height:.9;letter-spacing:-.05em;max-width:10ch}\n  #page-experiences .cc-carousel-actions{display:flex;gap:10px}\n  #page-experiences .cc-carousel-actions button{width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.10);color:#fff;font-size:26px;cursor:pointer;transition:transform .18s ease,background .18s ease}\n  #page-experiences .cc-carousel-actions button:hover{transform:translateY(-2px);background:rgba(255,255,255,.16)}\n  #page-experiences .cc-event-carousel{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(290px,32%);gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:5px 3px 20px;scrollbar-width:thin}\n  #page-experiences .cc-event-card{position:relative;overflow:hidden;scroll-snap-align:start;display:flex;flex-direction:column;min-height:300px;padding:26px;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025)),linear-gradient(145deg,#171d32,#281640);border:1px solid rgba(255,255,255,.14);text-decoration:none;box-shadow:0 20px 60px rgba(0,0,0,.22);transition:transform .2s ease,border-color .2s ease}\n  #page-experiences .cc-event-card:before{content:'';position:absolute;inset:0 0 auto 0;height:7px;background:linear-gradient(90deg,#ffbd28,#ef4fac,#6d4bf0,#32d6ae)}\n  #page-experiences .cc-event-card:hover{transform:translateY(-5px);border-color:rgba(255,255,255,.28)}\n  #page-experiences .cc-event-card small{font-weight:950;letter-spacing:.09em;text-transform:uppercase;color:#ffd15d;font-size:.78rem}\n  #page-experiences .cc-event-card h3{margin:18px 0 10px;font-size:clamp(1.5rem,2.2vw,2rem);line-height:1.08;color:#fff}\n  #page-experiences .cc-event-card p{color:#c2c7d3;line-height:1.58;margin:0 0 22px;font-size:1rem}\n  #page-experiences .cc-event-card b{margin-top:auto;color:#fff;font-size:1rem}\n  #page-experiences .cc-weekly-note{margin-top:16px;max-width:90ch;color:#aeb6c7;font-size:.93rem;line-height:1.62}\n  @media(max-width:850px){#arena-artist-intake .cc-artist-shell,#page-experiences .cc-media-grid{grid-template-columns:1fr}#page-experiences .cc-media-form{position:relative;top:auto}#page-experiences .cc-event-carousel{grid-auto-columns:minmax(280px,72%)}}\n  @media(max-width:560px){#arena-artist-intake .cc-form-grid,#page-experiences .cc-form-grid{grid-template-columns:1fr}#arena-artist-intake label.wide,#page-experiences label.wide{grid-column:auto}#page-experiences .cc-media-hero{padding:70px 0 62px}#page-experiences .cc-media-hero h1{font-size:clamp(3.3rem,17vw,5.1rem)}#page-experiences .cc-event-carousel{grid-auto-columns:88%}#page-experiences .cc-weekly-head{align-items:flex-start;flex-direction:column}}\n  </style>\n<script id=\"cc-audience-routing-v2-script\">\n(() => {\n  const EMAIL = \"familystreetdevelopers@gmail.com\";\n  const norm = v => String(v || \"\").trim().replace(/\\s+/g,\" \").toLowerCase();\n  const read = key => { try { return JSON.parse(localStorage.getItem(key) || \"[]\"); } catch(e){ return []; } };\n  const write = (key,val) => { try { localStorage.setItem(key,JSON.stringify(val)); } catch(e){} };\n  const addSubmission = record => {\n    const rows=read(\"cc_submissions_v3\");\n    rows.unshift(record);\n    write(\"cc_submissions_v3\",rows);\n  };\n  const ref = prefix => prefix+\"-\"+Date.now().toString(36).toUpperCase()+\"-\"+Math.random().toString(36).slice(2,6).toUpperCase();\n  const esc = v => String(v == null ? \"\" : v).replace(/[&<>\"']/g,m=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"\\\"\":\"&quot;\",\"'\":\"&#39;\"}[m]));\n\n  const removeCareers = () => {\n    const page=document.getElementById(\"page-careers\") || document.querySelector('[data-page=\"careers\"]');\n    if(page) page.remove();\n    document.querySelectorAll('a[href=\"#careers\"],a[href^=\"#careers?\"],[data-target=\"careers\"]').forEach(el=>el.remove());\n    if((location.hash||\"\").startsWith(\"#careers\")) location.hash=\"#home\";\n  };\n\n  const removeProfessionalFormLink = () => {\n    document.querySelectorAll('a[href=\"#project-professional\"]').forEach(el=>el.remove());\n    document.querySelectorAll('#page-project a,#page-project button,.menu .drop a').forEach(el=>{\n      if(norm(el.textContent)===\"professional forms\") el.remove();\n    });\n  };\n\n  const patchTellMe = () => {\n    const home=document.getElementById(\"page-home\");\n    if(!home) return;\n    const heading=[...home.querySelectorAll(\"h1,h2,h3,h4\")].find(h=>[\"tell me who you are.\",\"tell me who you are\"].includes(norm(h.textContent)));\n    const section=heading && heading.closest(\"section\");\n    if(!section) return;\n    [...section.querySelectorAll(\"a\")].forEach(a=>{\n      const h=a.querySelector(\"h3\");\n      const title=norm(h ? h.textContent : a.textContent);\n      const p=a.querySelector(\"p\");\n      if(title===\"the show.\" || title===\"the show\"){\n        a.remove();\n        return;\n      }\n      if(title===\"i make the room move.\" || title===\"i make the room move\"){\n        a.setAttribute(\"href\",\"#arena-artist-intake\");\n        if(p) p.textContent=\"Artists + creative leaders: submit for the arena, episode and tour.\";\n      }\n      if(title===\"i make culture.\" || title===\"i make culture\" || title===\"i create culture.\" || title===\"i create culture\"){\n        if(h) h.textContent=\"I create culture.\";\n        a.setAttribute(\"href\",\"#experiences\");\n        if(p) p.textContent=\"Share Carnival, festival, parade + arena-show video.\";\n      }\n      if(title===\"i carry the culture.\" || title===\"i carry the culture\"){\n        a.setAttribute(\"href\",\"#experiences\");\n        if(p) p.textContent=\"Carnival, festival, parade + city culture.\";\n      }\n    });\n  };\n\n  const patchArena = () => {\n    const page=document.getElementById(\"page-arena\");\n    if(!page || document.getElementById(\"arena-artist-intake\")) return;\n    const section=document.createElement(\"section\");\n    section.className=\"section\";\n    section.id=\"arena-artist-intake\";\n    section.innerHTML=\n      '<div class=\"wrap cc-artist-shell\">'+\n        '<div class=\"cc-artist-copy\">'+\n          '<span class=\"eyebrow\">ARENA FINALE / ARTIST + CREATIVE LEADERSHIP INTAKE</span>'+\n          '<h2>Want to be on the show or on the tour?</h2>'+\n          '<p>A-list, B-list and C-list artists can put themselves or their authorized team into the Carnival Careers arena and episode pipeline. Tell us where you can appear, what role you want, your routing and the links that show what you do.</p>'+\n          '<div class=\"cc-role-chips\"><span>Marquee / headliner</span><span>Featured artist</span><span>Guest appearance</span><span>Executive producer</span><span>Host</span><span>DJ / selector</span><span>Cultural collaborator</span></div>'+\n          '<p><strong>Submitting interest is not a booking.</strong> Dates, fees, rights, travel, production scope and city routing are only confirmed by written agreement.</p>'+\n        '</div>'+\n        '<form class=\"cc-artist-form\" id=\"arenaArtistForm\">'+\n          '<h3>Submit artist / producer interest</h3>'+\n          '<div class=\"cc-form-grid\">'+\n            '<label>Artist / stage name<input name=\"artistName\" required></label>'+\n            '<label>Contact email<input name=\"email\" type=\"email\" required></label>'+\n            '<label>Representation / company<input name=\"representation\" placeholder=\"Manager, agent, label, self-represented\"></label>'+\n            '<label>Artist tier<select name=\"artistTier\"><option>A-list</option><option>B-list</option><option>C-list</option><option>Emerging / developing</option><option>Other / not applicable</option></select></label>'+\n            '<label>Role interest<select name=\"role\"><option>Marquee / headliner</option><option>Featured artist</option><option>Guest appearance</option><option>Executive producer</option><option>Episode / tour host</option><option>DJ / selector</option><option>Music director</option><option>Cultural collaborator</option><option>Other creative leadership</option></select></label>'+\n            '<label>Primary city / region<input name=\"city\" value=\"Toronto\"></label>'+\n            '<label class=\"wide\">Tour cities / routing availability<input name=\"routing\" placeholder=\"Toronto only, Canada, North America, Caribbean, Europe, global...\"></label>'+\n            '<label class=\"wide\">Performance / music / press links<textarea name=\"links\" required placeholder=\"YouTube, Spotify, Apple Music, Instagram, EPK, live-performance links...\"></textarea></label>'+\n            '<label>Fee / deal framework<input name=\"fee\" placeholder=\"Quote, range, backend, production role, discuss\"></label>'+\n            '<label>Best contact / phone<input name=\"phone\"></label>'+\n            '<label class=\"wide\">What do you want to do with Carnival Careers?<textarea name=\"message\" placeholder=\"Arena performance, episode appearance, executive producer role, guest spot, host, tour routing, collaboration...\"></textarea></label>'+\n            '<label class=\"wide cc-check\"><input name=\"authority\" type=\"checkbox\" required value=\"yes\"> I am the artist or I am authorized to submit this opportunity on the artist / company’s behalf.</label>'+\n          '</div>'+\n          '<button class=\"btn primary\" type=\"submit\">Submit to Arena Finale</button>'+\n          '<div class=\"cc-intake-result\" id=\"arenaArtistResult\" aria-live=\"polite\"></div>'+\n        '</form>'+\n      '</div>';\n    const target=page.querySelector(\".arena-final-overview\") || page.firstElementChild;\n    if(target) target.insertAdjacentElement(\"beforebegin\",section); else page.appendChild(section);\n\n    const form=section.querySelector(\"#arenaArtistForm\");\n    form.addEventListener(\"submit\",e=>{\n      e.preventDefault();\n      if(!form.reportValidity()) return;\n      const data=Object.fromEntries(new FormData(form).entries());\n      const id=ref(\"ARENA\");\n      const record={id:id,kind:\"arena-artist\",status:\"new\",createdAt:new Date().toISOString(),...data};\n      addSubmission(record);\n      const subject=\"Carnival Careers Arena / Tour artist interest — \"+id;\n      const mail=\"mailto:\"+EMAIL+\"?subject=\"+encodeURIComponent(subject)+\"&body=\"+encodeURIComponent(JSON.stringify(record,null,2));\n      section.querySelector(\"#arenaArtistResult\").innerHTML='<strong>Artist file prepared: '+esc(id)+'</strong><br>Saved to this browser’s Carnival Careers intake. <a href=\"'+mail+'\">Email the submission packet to Carnival Careers →</a>';\n      form.reset();\n    });\n  };\n\n  const mediaPageMarkup = () =>\n    '<section class=\"cc-media-hero\"><div class=\"wrap\">'+\n      '<span class=\"eyebrow\">EVENTS / COMMUNITY MEDIA</span>'+\n      '<h1>Show us the culture.</h1>'+\n      '<p>Share the Carnival, arena-show, mas, parade and festival videos you think people should see. Add the link, the city and your comment. Carnival Careers can review it for the public media wall.</p>'+\n    '</div></section>'+\n    '<section class=\"cc-media-main\"><div class=\"wrap cc-media-grid\">'+\n      '<form class=\"cc-media-form\" id=\"cultureMediaForm\">'+\n        '<h2>Share a video link</h2>'+\n        '<p>Post the link and context. Do not upload copyrighted files here; link to the original public post or video.</p>'+\n        '<div class=\"cc-form-grid\">'+\n          '<label>Your name / credit<input name=\"name\" required></label>'+\n          '<label>Email<input name=\"email\" type=\"email\" required></label>'+\n          '<label>Video title<input name=\"title\" required></label>'+\n          '<label>City / festival<input name=\"city\" placeholder=\"Toronto, Miami, Trinidad, Notting Hill...\"></label>'+\n          '<label>Type<select name=\"category\"><option>Carnival / mas</option><option>Arena / concert</option><option>Festival</option><option>Parade</option><option>Backstage / rehearsal</option><option>Community / culture</option><option>Other</option></select></label>'+\n          '<label>Platform<select name=\"platform\"><option>YouTube</option><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>Vimeo</option><option>Other public link</option></select></label>'+\n          '<label class=\"wide\">Public video link<input name=\"url\" type=\"url\" required placeholder=\"https://\"></label>'+\n          '<label class=\"wide\">Your comment<textarea name=\"comment\" required placeholder=\"Why should people see this? What is happening in the clip?\"></textarea></label>'+\n          '<label class=\"wide cc-check\"><input name=\"permission\" type=\"checkbox\" required value=\"yes\"> I am sharing a public link and give Carnival Careers permission to review and feature the link, title, credit and comment on this site.</label>'+\n        '</div>'+\n        '<button class=\"btn primary\" type=\"submit\">Submit to the media wall</button>'+\n        '<div class=\"cc-intake-result\" id=\"cultureMediaResult\" aria-live=\"polite\"></div>'+\n      '</form>'+\n      '<div>'+\n        '<span class=\"eyebrow darkey\">COMMUNITY WALL</span>'+\n        '<h2>Links people want you to see.</h2>'+\n        '<div class=\"cc-media-wall\" id=\"cultureMediaWall\"></div>'+\n      '</div>'+\n    '</div></section>'+\n    '<section class=\"cc-weekly\"><div class=\"wrap\">'+\n      '<div class=\"cc-weekly-head\"><div><span class=\"eyebrow\">THIS WEEK / AFFILIATE EVENT ROUTES</span><h2>Events we are promoting now.</h2></div><div class=\"cc-carousel-actions\"><button type=\"button\" data-cc-prev aria-label=\"Previous events\">‹</button><button type=\"button\" data-cc-next aria-label=\"Next events\">›</button></div></div>'+\n      '<div class=\"cc-event-carousel\" id=\"weeklyAffiliateEvents\"></div>'+\n      '<p class=\"cc-weekly-note\">Ticket sellers and event operators remain seller of record. Prices, inventory, refunds and confirmations come from the provider. Affiliate/referral links are labeled and only earn revenue when the provider’s tracking rules are satisfied.</p>'+\n    '</div></section>';\n\n  const patchEvents = () => {\n    const page=document.getElementById(\"page-experiences\");\n    if(!page || page.dataset.ccMediaWall===\"1\") return;\n\n    const legacy=[...page.querySelectorAll(\"a.event-provider[href^='http'],a.outbound[href^='http']\")].map(a=>({\n      title:(a.querySelector(\"b\")?.textContent || a.textContent || \"Event partner\").trim().replace(/\\s+/g,\" \"),\n      vendor:(a.dataset.lane || \"ticket partner\").replace(/^event-provider-/,\"\"),\n      url:a.href,\n      note:(a.querySelector(\"span\")?.textContent || \"Find current events and ticket inventory\").trim()\n    })).filter((x,i,arr)=>x.url && arr.findIndex(y=>y.url===x.url)===i);\n\n    page.innerHTML=mediaPageMarkup();\n    page.dataset.ccMediaWall=\"1\";\n\n    const wall=page.querySelector(\"#cultureMediaWall\");\n    const renderWall=()=>{\n      const rows=read(\"cc_culture_media_v1\").slice(0,12);\n      wall.innerHTML=rows.length ? rows.map(row=>\n        '<article class=\"cc-media-card\">'+\n          '<small>'+esc(row.category || \"Community video\")+(row.city ? \" · \"+esc(row.city) : \"\")+'</small>'+\n          '<h3>'+esc(row.title || \"Shared video\")+'</h3>'+\n          '<p>'+esc(row.comment || \"\")+'</p>'+\n          '<p><strong>Shared by:</strong> '+esc(row.name || \"Community member\")+'</p>'+\n          '<a href=\"'+esc(row.url)+'\" target=\"_blank\" rel=\"noopener noreferrer\">Watch the original video ↗</a>'+\n        '</article>'\n      ).join(\"\") : '<div class=\"cc-empty-wall\"><strong>Share the first link.</strong><br>Submitted links appear in your local preview immediately and are prepared for Carnival Careers review before wider public publishing.</div>';\n    };\n    renderWall();\n\n    const form=page.querySelector(\"#cultureMediaForm\");\n    form.addEventListener(\"submit\",e=>{\n      e.preventDefault();\n      if(!form.reportValidity()) return;\n      const data=Object.fromEntries(new FormData(form).entries());\n      const id=ref(\"MEDIA\");\n      const record={id:id,kind:\"culture-media\",status:\"submitted-for-review\",createdAt:new Date().toISOString(),...data};\n      const local=read(\"cc_culture_media_v1\"); local.unshift(record); write(\"cc_culture_media_v1\",local);\n      addSubmission(record);\n      renderWall();\n      const subject=\"Carnival Careers community media submission — \"+id;\n      const mail=\"mailto:\"+EMAIL+\"?subject=\"+encodeURIComponent(subject)+\"&body=\"+encodeURIComponent(JSON.stringify(record,null,2));\n      page.querySelector(\"#cultureMediaResult\").innerHTML='<strong>Media link prepared: '+esc(id)+'</strong><br>It is visible in this browser preview. <a href=\"'+mail+'\">Email it to Carnival Careers for public review / publishing →</a>';\n      form.reset();\n    });\n\n    let weekly=[];\n    try{\n      if(Array.isArray(window.CC_WEEKLY_AFFILIATE_EVENTS)) weekly=window.CC_WEEKLY_AFFILIATE_EVENTS;\n      if(!weekly.length){\n        const saved=JSON.parse(localStorage.getItem(\"cc_weekly_affiliate_events_v1\")||\"[]\");\n        if(Array.isArray(saved)) weekly=saved;\n      }\n    }catch(e){}\n    if(!weekly.length) weekly=legacy;\n    if(!weekly.length) weekly=[\n      {title:\"TicketNetwork\",vendor:\"ticket partner\",url:\"https://www.ticketnetwork.com\",note:\"Broad live-event inventory\"},\n      {title:\"EventCartel\",vendor:\"ticket partner\",url:\"https://eventcartel.com\",note:\"Concerts and nightlife\"},\n      {title:\"Go City\",vendor:\"experience partner\",url:\"https://gocity.com\",note:\"Attractions and city passes\"}\n    ];\n\n    const carousel=page.querySelector(\"#weeklyAffiliateEvents\");\n    carousel.innerHTML=weekly.map(item=>{\n      const title=item.title || item.eventName || item.name || item.vendor || \"Live event\";\n      const vendor=item.vendor || item.ticketProvider || \"affiliate ticket route\";\n      const note=item.note || [item.city,item.date || item.eventDates].filter(Boolean).join(\" · \") || \"Open the provider for current inventory.\";\n      const url=item.url || item.ticketUrl || \"#experiences\";\n      return '<a class=\"cc-event-card outbound\" data-lane=\"weekly-affiliate-event\" href=\"'+esc(url)+'\" target=\"_blank\" rel=\"noopener sponsored\"><small>'+esc(vendor)+'</small><h3>'+esc(title)+'</h3><p>'+esc(note)+'</p><b>Open event / tickets ↗</b></a>';\n    }).join(\"\");\n    page.querySelector(\"[data-cc-prev]\").onclick=()=>carousel.scrollBy({left:-Math.max(280,carousel.clientWidth*.8),behavior:\"smooth\"});\n    page.querySelector(\"[data-cc-next]\").onclick=()=>carousel.scrollBy({left:Math.max(280,carousel.clientWidth*.8),behavior:\"smooth\"});\n  };\n\n  const scrollArenaIntake = () => {\n    if((location.hash||\"\").startsWith(\"#arena-artist-intake\")){\n      setTimeout(()=>document.getElementById(\"arena-artist-intake\")?.scrollIntoView({behavior:\"smooth\",block:\"start\"}),40);\n    }\n  };\n\n  const run = () => {\n    removeCareers();\n    removeProfessionalFormLink();\n    patchTellMe();\n    patchArena();\n    patchEvents();\n    scrollArenaIntake();\n  };\n  if(document.readyState===\"loading\") document.addEventListener(\"DOMContentLoaded\",run,{once:true}); else run();\n  window.addEventListener(\"hashchange\",scrollArenaIntake);\n})();\n</script>";

const cityPartnerInvitePatch = "\n<style id=\"cc-city-partner-invite-style\">\n  #page-partners{background:#f7f4ff;color:#16131d}\n  #page-partners .cc-city-hero{padding:clamp(58px,9vw,112px) 0 48px;background:\n    radial-gradient(circle at 12% 16%,rgba(255,196,45,.34),transparent 30%),\n    radial-gradient(circle at 86% 14%,rgba(231,63,166,.34),transparent 32%),\n    linear-gradient(135deg,#130b29 0%,#34125a 52%,#071a28 100%);color:#fff;overflow:hidden}\n  #page-partners .cc-city-hero h1{max-width:11ch;margin:.18em 0 .25em;font-size:clamp(3.1rem,7.5vw,7rem);line-height:.87;letter-spacing:-.06em}\n  #page-partners .cc-city-hero p{max-width:70ch;font-size:clamp(1.05rem,1.8vw,1.24rem);line-height:1.65;color:rgba(255,255,255,.82)}\n  #page-partners .cc-city-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}\n  #page-partners .cc-city-pills span{padding:9px 12px;border-radius:999px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.19);font-size:.82rem;font-weight:900}\n  #page-partners .cc-city-main{padding:48px 0 76px}\n  #page-partners .cc-city-section{margin:0 0 42px}\n  #page-partners .cc-city-section>h2{max-width:15ch;margin:.15em 0 .35em;font-size:clamp(2rem,4.2vw,4rem);line-height:.98;letter-spacing:-.035em}\n  #page-partners .cc-city-section>p{max-width:78ch;color:#635b70;font-size:1.05rem;line-height:1.65}\n  #page-partners .cc-city-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}\n  #page-partners .cc-city-card{padding:20px;border-radius:20px;background:#fff;border:1px solid #e4daef;box-shadow:0 12px 34px rgba(54,27,88,.07)}\n  #page-partners .cc-city-card small{display:block;margin-bottom:8px;color:#7b6596;font-weight:950;letter-spacing:.09em;text-transform:uppercase}\n  #page-partners .cc-city-card h3{margin:0 0 8px;font-size:1.22rem}\n  #page-partners .cc-city-card p{margin:0;color:#655e70;line-height:1.55}\n  #page-partners .cc-city-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:20px}\n  #page-partners .cc-city-step{position:relative;padding:20px;border-radius:20px;background:#171027;color:#fff;min-height:190px}\n  #page-partners .cc-city-step b{display:block;font-size:2rem;color:#ffc947;margin-bottom:16px}\n  #page-partners .cc-city-step h3{margin:0 0 8px;font-size:1.1rem}\n  #page-partners .cc-city-step p{margin:0;color:#c9c1d6;line-height:1.5;font-size:.92rem}\n  #page-partners .cc-city-readiness{display:grid;grid-template-columns:minmax(0,.8fr) minmax(360px,1.2fr);gap:22px;align-items:start;padding:26px;border-radius:26px;background:linear-gradient(135deg,#fff,#f0e9fb);border:1px solid #dfd1ef}\n  #page-partners .cc-city-meter{height:13px;border-radius:999px;background:#ddd5e8;overflow:hidden;margin:15px 0 7px}\n  #page-partners .cc-city-meter>span{display:block;height:100%;width:0;background:linear-gradient(90deg,#6f48e8,#ec48a7,#ffbe20);transition:width .25s ease}\n  #page-partners .cc-city-score{font-weight:950;font-size:1.1rem}\n  #page-partners .cc-city-checks{display:grid;grid-template-columns:1fr 1fr;gap:9px}\n  #page-partners .cc-city-check{display:flex;gap:9px;align-items:flex-start;padding:12px;border-radius:13px;background:#fff;border:1px solid #ded5e8;font-weight:750;font-size:.9rem}\n  #page-partners .cc-city-check input{margin-top:2px}\n  #page-partners .cc-city-form-wrap{display:grid;grid-template-columns:minmax(0,.76fr) minmax(380px,1.24fr);gap:24px;align-items:start;margin-top:26px}\n  #page-partners .cc-city-form{padding:24px;border-radius:24px;background:#fff;border:1px solid #dfd4ea;box-shadow:0 18px 55px rgba(49,24,82,.10)}\n  #page-partners .cc-city-form h3{margin:0 0 5px;font-size:1.55rem}\n  #page-partners .cc-city-form>p{margin-top:0;color:#6c6477;line-height:1.55}\n  #page-partners .cc-city-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n  #page-partners .cc-city-form label{display:grid;gap:6px;font-size:.86rem;font-weight:850}\n  #page-partners .cc-city-form label.wide{grid-column:1/-1}\n  #page-partners .cc-city-form input,#page-partners .cc-city-form select,#page-partners .cc-city-form textarea{width:100%;padding:12px;border-radius:11px;border:1px solid #cfd4dc;background:#fff;color:#111827;font:inherit}\n  #page-partners .cc-city-form textarea{min-height:104px;resize:vertical}\n  #page-partners .cc-city-consent{display:flex!important;grid-template-columns:none!important;gap:9px!important;align-items:flex-start}\n  #page-partners .cc-city-consent input{width:auto!important;margin-top:3px}\n  #page-partners .cc-city-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}\n  #page-partners .cc-city-result{margin-top:12px;padding:13px 15px;border-radius:13px;background:#eef7ff;color:#17324d;line-height:1.55}\n  #page-partners .cc-city-result:empty{display:none}\n  #page-partners .cc-city-boundary{padding:20px;border-radius:20px;background:#110b1f;color:#fff}\n  #page-partners .cc-city-boundary h3{margin-top:0}\n  #page-partners .cc-city-boundary ul{margin:12px 0 0;padding-left:20px;color:#d4cce1;line-height:1.65}\n  @media(max-width:920px){\n    #page-partners .cc-city-grid{grid-template-columns:1fr 1fr}\n    #page-partners .cc-city-flow{grid-template-columns:1fr 1fr}\n    #page-partners .cc-city-readiness,#page-partners .cc-city-form-wrap{grid-template-columns:1fr}\n  }\n  @media(max-width:600px){\n    #page-partners .cc-city-grid,#page-partners .cc-city-flow,#page-partners .cc-city-checks,#page-partners .cc-city-form-grid{grid-template-columns:1fr}\n    #page-partners .cc-city-form label.wide{grid-column:auto}\n  }\n</style>\n<script id=\"cc-city-partner-invite-script\">\n(() => {\n  const EMAIL=\"familystreetdevelopers@gmail.com\";\n  const norm=v=>String(v||\"\").trim().replace(/\\s+/g,\" \").toLowerCase();\n  const esc=v=>String(v==null?\"\":v).replace(/[&<>\"']/g,m=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"\\\"\":\"&quot;\",\"'\":\"&#39;\"}[m]));\n  const read=key=>{try{return JSON.parse(localStorage.getItem(key)||\"[]\")}catch(e){return []}};\n  const write=(key,val)=>{try{localStorage.setItem(key,JSON.stringify(val))}catch(e){}};\n  const ref=()=> \"CITY-\"+Date.now().toString(36).toUpperCase()+\"-\"+Math.random().toString(36).slice(2,6).toUpperCase();\n\n  const resolvePage=()=>{\n    let page=document.getElementById(\"page-partners\") || document.querySelector('[data-page=\"partners\"]') || document.getElementById(\"page-partner\") || document.querySelector('[data-page=\"partner\"]');\n    const nav=[...document.querySelectorAll(\"a\")].find(a=>norm(a.textContent)===\"partners\");\n    if(!page && nav){\n      const hash=(nav.getAttribute(\"href\")||\"\").replace(/^#/,\"\");\n      page=document.getElementById(\"page-\"+hash) || document.getElementById(hash) || document.querySelector('[data-page=\"'+hash+'\"]');\n    }\n    if(!page){\n      page=document.createElement(\"section\");\n      page.className=\"page\";\n      const main=document.querySelector(\"main\") || document.body;\n      main.appendChild(page);\n    }\n    page.id=\"page-partners\";\n    page.dataset.page=\"partners\";\n    document.querySelectorAll(\"a\").forEach(a=>{if(norm(a.textContent)===\"partners\")a.setAttribute(\"href\",\"#partners\")});\n    return page;\n  };\n\n  const markup=()=> [\n    '<section class=\"cc-city-hero\"><div class=\"wrap\">',\n      '<span class=\"eyebrow\">CITY PARTNERS / INVITE CARNIVAL CAREERS</span>',\n      '<h1>Bring the wave to your city.</h1>',\n      '<p>When a city sees what Carnival Careers is doing and wants the full engine locally, this is the front door. Invite the episode, the family story, the jobs and ownership work, the local business activity, the Carnival connection, the media production and the arena finale as one coordinated city project.</p>',\n      '<div class=\"cc-city-pills\"><span>City Hall</span><span>Tourism</span><span>Carnival + festival organizations</span><span>Arenas + venues</span><span>Economic development</span><span>Transit</span><span>Business associations</span><span>Community partners</span></div>',\n    '</div></section>',\n\n    '<section class=\"cc-city-main\"><div class=\"wrap\">',\n      '<div class=\"cc-city-section\">',\n        '<span class=\"eyebrow darkey\">WHAT A CITY IS INVITING</span>',\n        '<h2>Not just a concert. A complete city episode.</h2>',\n        '<p>The public finale only works after the city has helped create something worth celebrating. Each city invitation starts with local people and moves outward into practical change, culture, commerce and media.</p>',\n        '<div class=\"cc-city-grid\">',\n          '<article class=\"cc-city-card\"><small>01 · People</small><h3>One locally rooted family story</h3><p>A family becomes the human centre of the episode. The city helps connect the right community relationships without turning people into props.</p></article>',\n          '<article class=\"cc-city-card\"><small>02 · Practical change</small><h3>Housing, work and mobility</h3><p>Local partners help turn the story into tangible progress: housing or ownership pathways, paid work, mobility, food access, childcare and business connections where applicable.</p></article>',\n          '<article class=\"cc-city-card\"><small>03 · Local table</small><h3>Dinner + community discovery</h3><p>The episode uses a local restaurant and conversation to reveal the city, the family and what needs to happen next.</p></article>',\n          '<article class=\"cc-city-card\"><small>04 · Culture</small><h3>Carnival, mas, festival and city life</h3><p>The project connects with the city’s real cultural calendar and existing organizers instead of inventing a fake festival layer.</p></article>',\n          '<article class=\"cc-city-card\"><small>05 · Commerce</small><h3>Local vendors, sponsors and businesses</h3><p>Businesses get clear lanes to sell, activate, supply, sponsor, hire and participate in the episode and public events.</p></article>',\n          '<article class=\"cc-city-card\"><small>06 · Finale</small><h3>Arena + filmed public triumph</h3><p>The arena comes last. It is the public victory lap after the audience understands the people, the city and what changed.</p></article>',\n        '</div>',\n      '</div>',\n\n      '<div class=\"cc-city-section\">',\n        '<span class=\"eyebrow darkey\">WHO SHOULD INVITE US</span>',\n        '<h2>Build one local table instead of twenty disconnected introductions.</h2>',\n        '<div class=\"cc-city-grid\">',\n          '<article class=\"cc-city-card\"><h3>Municipal / regional government</h3><p>Mayor’s office, culture, economic development, tourism, permits, public realm, workforce and community-development teams.</p></article>',\n          '<article class=\"cc-city-card\"><h3>Carnival + cultural leadership</h3><p>Festival organizers, mas bands, cultural institutions, local promoters, artists and community organizations that know the city from the inside.</p></article>',\n          '<article class=\"cc-city-card\"><h3>Venue + destination partners</h3><p>Arena operators, hotels, restaurants, transit, sports organizations, attractions and destination-marketing organizations that can make the episode move.</p></article>',\n        '</div>',\n      '</div>',\n\n      '<div class=\"cc-city-section\">',\n        '<span class=\"eyebrow darkey\">END-TO-END CITY PATH</span>',\n        '<h2>From “come here” to cameras rolling.</h2>',\n        '<div class=\"cc-city-flow\">',\n          '<article class=\"cc-city-step\"><b>01</b><h3>City invitation</h3><p>Submit the city, dates, local Carnival/festival context, lead contact and why the project fits now.</p></article>',\n          '<article class=\"cc-city-step\"><b>02</b><h3>Fit screen</h3><p>We review timing, local relationships, venue path, family/community fit, operating partners and obvious blockers.</p></article>',\n          '<article class=\"cc-city-step\"><b>03</b><h3>Local table</h3><p>The city brings the right municipal, cultural, venue, business and community people into one working conversation.</p></article>',\n          '<article class=\"cc-city-step\"><b>04</b><h3>City brief</h3><p>We turn the opportunity into one written city brief: episode arc, roles, dates, venues, permits, partner lanes, funding needs and decisions.</p></article>',\n          '<article class=\"cc-city-step\"><b>05</b><h3>Diligence + agreements</h3><p>Nothing is treated as committed until the required venue, property, production, insurance, talent, sponsor, travel and legal terms are real.</p></article>',\n          '<article class=\"cc-city-step\"><b>06</b><h3>Build the episode</h3><p>Family, work, housing, dinner, culture, vendors, sponsors, City Hall/transit moments and production move on one integrated schedule.</p></article>',\n          '<article class=\"cc-city-step\"><b>07</b><h3>City week</h3><p>Film the real progress, activate the city, capture Carnival/festival culture and complete the public-facing moments.</p></article>',\n          '<article class=\"cc-city-step\"><b>08</b><h3>Arena finale + close-out</h3><p>The arena closes the episode. Then settlements, reporting, media delivery, partner proof and next-city decisions are reconciled.</p></article>',\n        '</div>',\n      '</div>',\n\n      '<div class=\"cc-city-section cc-city-readiness\">',\n        '<div>',\n          '<span class=\"eyebrow darkey\">CITY READINESS BUILDER</span>',\n          '<h2>How ready is your city?</h2>',\n          '<p>These are not automatic requirements. They tell us how much of the local execution path already exists and where the first diligence work belongs.</p>',\n          '<div class=\"cc-city-meter\"><span id=\"ccCityMeterBar\"></span></div>',\n          '<div class=\"cc-city-score\" id=\"ccCityMeterText\">0 / 8 connected</div>',\n        '</div>',\n        '<div class=\"cc-city-checks\" id=\"ccCityReadiness\">',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"government\"> City / regional government contact</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"culture\"> Carnival / festival / cultural lead</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"venue\"> Arena or major venue pathway</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"tourism\"> Tourism / destination partner</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"community\"> Family / community referral pathway</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"business\"> Sponsor / vendor / business network</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"housing\"> Housing / property / ownership pathway</label>',\n          '<label class=\"cc-city-check\"><input type=\"checkbox\" value=\"permits\"> Permits / transit / public-space contact</label>',\n        '</div>',\n      '</div>',\n\n      '<div class=\"cc-city-section cc-city-form-wrap\">',\n        '<div>',\n          '<span class=\"eyebrow darkey\">OFFICIAL CITY INVITATION</span>',\n          '<h2>Put your city on the route.</h2>',\n          '<p>Give us enough information to understand the opportunity without creating a 40-email scavenger hunt. The strongest submissions identify a real local lead, real dates and the people who can help remove execution friction.</p>',\n          '<div class=\"cc-city-boundary\">',\n            '<h3>What this submission does — and does not do</h3>',\n            '<ul>',\n              '<li>It creates a structured city-invitation record for Carnival Careers review.</li>',\n              '<li>It does not guarantee that the city is selected, filmed or placed on the tour.</li>',\n              '<li>It is not a venue booking, sponsorship commitment, artist booking or municipal approval.</li>',\n              '<li>Any money, rights, public claims, dates and obligations move only through written agreements.</li>',\n            '</ul>',\n          '</div>',\n        '</div>',\n\n        '<form class=\"cc-city-form\" id=\"ccCityInviteForm\">',\n          '<h3>Invite Carnival Careers</h3>',\n          '<p>City, region, tourism body, festival, venue or authorized local partner.</p>',\n          '<div class=\"cc-city-form-grid\">',\n            '<label>City / region<input name=\"city\" required></label>',\n            '<label>Country<input name=\"country\" required></label>',\n            '<label>Inviting organization<input name=\"organization\" required></label>',\n            '<label>Your role / title<input name=\"title\" required></label>',\n            '<label>Contact name<input name=\"contactName\" required></label>',\n            '<label>Email<input name=\"email\" type=\"email\" required></label>',\n            '<label>Phone / WhatsApp<input name=\"phone\"></label>',\n            '<label>Organization type<select name=\"organizationType\"><option>City / regional government</option><option>Tourism / destination organization</option><option>Carnival / festival organization</option><option>Arena / venue</option><option>Economic development / business group</option><option>Transit / public agency</option><option>Community / cultural organization</option><option>Sports organization</option><option>Other local partner</option></select></label>',\n            '<label class=\"wide\">Target Carnival / festival / city dates<input name=\"dates\" placeholder=\"Festival window, preferred episode week, major city dates\"></label>',\n            '<label class=\"wide\">What is the cultural wave in your city right now?<textarea name=\"wave\" required placeholder=\"Carnival, festival, community, music, diaspora, tourism momentum, major anniversary, city priority...\"></textarea></label>',\n            '<label class=\"wide\">Local arena / venue pathway<textarea name=\"venue\" placeholder=\"Venue name, capacity, contact or introduction path if known\"></textarea></label>',\n            '<label class=\"wide\">Family + community pathway<textarea name=\"family\" placeholder=\"How would the city help us find a locally rooted family and community relationships without staging the story?\"></textarea></label>',\n            '<label class=\"wide\">Housing / jobs / ownership / mobility opportunities<textarea name=\"impact\" placeholder=\"Local employers, housing partners, development partners, mobility, childcare, grocery/food, ownership programs...\"></textarea></label>',\n            '<label class=\"wide\">Local sponsor / vendor / business ecosystem<textarea name=\"commerce\" placeholder=\"Brands, BIAs/chambers, restaurants, local businesses, tourism partners, suppliers...\"></textarea></label>',\n            '<label class=\"wide\">Municipal / permits / transit contacts<textarea name=\"citySupport\" placeholder=\"City Hall, public realm, permits, transit, police/fire/medical, tourism, economic development...\"></textarea></label>',\n            '<label class=\"wide\">Links / supporting materials<textarea name=\"links\" placeholder=\"City deck, festival site, arena, tourism page, news, videos, partner letters, Drive links...\"></textarea></label>',\n            '<label class=\"wide\">What are you asking Carnival Careers to bring?<textarea name=\"ask\" required placeholder=\"Full episode, arena finale, family transformation, Carnival integration, vendor marketplace, media production, travel/culture route...\"></textarea></label>',\n            '<label class=\"wide cc-city-consent\"><input type=\"checkbox\" name=\"authority\" value=\"yes\" required> I am authorized to make this introduction / invitation for the organization named above, or I am clearly identifying this as an exploratory referral rather than an official commitment.</label>',\n          '</div>',\n          '<div class=\"cc-city-actions\"><button class=\"btn primary\" type=\"submit\">Create city invitation</button><button class=\"btn\" type=\"button\" id=\"ccCityCopyBtn\">Copy current form summary</button></div>',\n          '<div class=\"cc-city-result\" id=\"ccCityInviteResult\" aria-live=\"polite\"></div>',\n        '</form>',\n      '</div>',\n    '</div></section>'\n  ].join(\"\");\n\n  const run=()=>{\n    const page=resolvePage();\n    page.innerHTML=markup();\n    page.dataset.ccCityPartnerInvite=\"1\";\n\n    const checks=[...page.querySelectorAll(\"#ccCityReadiness input[type=checkbox]\")];\n    const bar=page.querySelector(\"#ccCityMeterBar\");\n    const label=page.querySelector(\"#ccCityMeterText\");\n    const meterKey=\"cc_city_readiness_v1\";\n    const updateMeter=()=>{\n      const selected=checks.filter(x=>x.checked).map(x=>x.value);\n      bar.style.width=(selected.length/checks.length*100)+\"%\";\n      label.textContent=selected.length+\" / \"+checks.length+\" connected\";\n      write(meterKey,selected);\n    };\n    const saved=read(meterKey);\n    checks.forEach(x=>x.checked=saved.includes(x.value));\n    checks.forEach(x=>x.addEventListener(\"change\",updateMeter));\n    updateMeter();\n\n    const form=page.querySelector(\"#ccCityInviteForm\");\n    const summary=()=>{\n      const data=Object.fromEntries(new FormData(form).entries());\n      return [\n        \"Carnival Careers City Invitation\",\n        \"City: \"+(data.city||\"\"),\n        \"Country: \"+(data.country||\"\"),\n        \"Organization: \"+(data.organization||\"\"),\n        \"Contact: \"+(data.contactName||\"\")+\" — \"+(data.title||\"\"),\n        \"Email: \"+(data.email||\"\"),\n        \"Target dates: \"+(data.dates||\"\"),\n        \"Cultural wave: \"+(data.wave||\"\"),\n        \"Arena / venue: \"+(data.venue||\"\"),\n        \"Family / community: \"+(data.family||\"\"),\n        \"Impact opportunities: \"+(data.impact||\"\"),\n        \"Commerce: \"+(data.commerce||\"\"),\n        \"City support: \"+(data.citySupport||\"\"),\n        \"Links: \"+(data.links||\"\"),\n        \"Invitation ask: \"+(data.ask||\"\")\n      ].join(\"\\n\");\n    };\n    page.querySelector(\"#ccCityCopyBtn\").addEventListener(\"click\",async()=>{\n      try{\n        await navigator.clipboard.writeText(summary());\n        page.querySelector(\"#ccCityInviteResult\").textContent=\"Current city summary copied.\";\n      }catch(e){\n        page.querySelector(\"#ccCityInviteResult\").textContent=\"Copy was blocked by the browser. Select the form text manually.\";\n      }\n    });\n\n    form.addEventListener(\"submit\",e=>{\n      e.preventDefault();\n      if(!form.reportValidity()) return;\n      const data=Object.fromEntries(new FormData(form).entries());\n      const id=ref();\n      const readiness=checks.filter(x=>x.checked).map(x=>x.value);\n      const record={id:id,kind:\"city-partner-invite\",status:\"submitted-for-review\",createdAt:new Date().toISOString(),readiness:readiness,...data};\n      const rows=read(\"cc_submissions_v3\"); rows.unshift(record); write(\"cc_submissions_v3\",rows);\n      const cityRows=read(\"cc_city_invites_v1\"); cityRows.unshift(record); write(\"cc_city_invites_v1\",cityRows);\n      const subject=\"Carnival Careers city invitation — \"+(data.city||\"City\")+\" — \"+id;\n      const mail=\"mailto:\"+EMAIL+\"?subject=\"+encodeURIComponent(subject)+\"&body=\"+encodeURIComponent(summary()+\"\\n\\nReference: \"+id);\n      page.querySelector(\"#ccCityInviteResult\").innerHTML='<strong>City invitation prepared: '+esc(id)+'</strong><br>Saved to this browser’s Carnival Careers intake. <a href=\"'+mail+'\">Email the invitation packet to Carnival Careers →</a>';\n    });\n  };\n  if(document.readyState===\"loading\") document.addEventListener(\"DOMContentLoaded\",run,{once:true}); else run();\n})();\n</script>";

const sidelineSittersUnifiedPatch = \`
<style id="cc-sideline-unified-style">
  #page-childcare .cc-ss-wrap{max-width:1180px;margin:0 auto;padding:0 20px}
  #page-childcare .cc-ss-hero{padding:64px 0 34px;background:linear-gradient(135deg,#1f1647,#6f48e8 62%,#ffbd20);color:#fff}
  #page-childcare .cc-ss-kicker{font-weight:900;letter-spacing:.08em;text-transform:uppercase;font-size:.82rem;opacity:.84}
  #page-childcare .cc-ss-hero h1{font-size:clamp(2.8rem,7vw,5.6rem);line-height:.92;margin:.18em 0 .22em;max-width:10ch}
  #page-childcare .cc-ss-hero p{font-size:clamp(1.05rem,2vw,1.32rem);line-height:1.58;max-width:780px;margin:0}
  #page-childcare .cc-ss-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
  #page-childcare .cc-ss-actions a{display:inline-flex;align-items:center;min-height:46px;padding:0 18px;border-radius:999px;background:#fff;color:#24154d;font-weight:850;text-decoration:none;border:1px solid rgba(255,255,255,.7)}
  #page-childcare .cc-ss-section{padding:54px 0;border-bottom:1px solid rgba(20,20,20,.08)}
  #page-childcare .cc-ss-section h2{font-size:clamp(2rem,4vw,3.2rem);line-height:1.02;margin:0 0 12px;color:inherit}
  #page-childcare .cc-ss-lead{font-size:1.12rem;line-height:1.65;max-width:850px;margin:0 0 24px}
  #page-childcare .cc-ss-process{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:26px 0}
  #page-childcare .cc-ss-step{border-radius:18px;padding:18px;background:rgba(112,72,232,.08);border:1px solid rgba(112,72,232,.16)}
  #page-childcare .cc-ss-step b{display:block;font-size:1.05rem;margin-bottom:6px}
  #page-childcare .cc-ss-step span{font-size:.94rem;line-height:1.45;opacity:.83}
  #page-childcare .cc-ss-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.75fr);gap:24px;align-items:start}
  #page-childcare .cc-ss-card{border-radius:22px;padding:22px;background:#fff;color:#171717;border:1px solid rgba(0,0,0,.10);box-shadow:0 10px 28px rgba(0,0,0,.06)}
  #page-childcare .cc-ss-card h3{font-size:1.45rem;margin:0 0 8px}
  #page-childcare .cc-ss-card p{line-height:1.55}
  #page-childcare .cc-ss-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
  #page-childcare .cc-ss-field{display:flex;flex-direction:column;gap:6px}
  #page-childcare .cc-ss-field.cc-full{grid-column:1/-1}
  #page-childcare .cc-ss-field label{font-weight:780;font-size:.92rem}
  #page-childcare .cc-ss-field input,#page-childcare .cc-ss-field select,#page-childcare .cc-ss-field textarea{width:100%;padding:12px 13px;border-radius:12px;border:1px solid #cfd3dc;background:#fff;color:#171717;font:inherit}
  #page-childcare .cc-ss-field textarea{min-height:105px;resize:vertical}
  #page-childcare .cc-ss-submit{grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  #page-childcare .cc-ss-btn{border:0;border-radius:999px;padding:13px 18px;font:inherit;font-weight:850;cursor:pointer;background:#6f48e8;color:#fff}
  #page-childcare .cc-ss-btn.cc-secondary{background:#f2effc;color:#2d205c}
  #page-childcare .cc-ss-note{font-size:.9rem;line-height:1.5;opacity:.76}
  #page-childcare .cc-ss-status{background:#f7f5fd}
  #page-childcare .cc-ss-result{margin-top:12px;padding:12px 14px;border-radius:12px;background:#fff;border:1px solid rgba(0,0,0,.08);min-height:48px}
  #page-childcare .cc-ss-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:22px 0}
  #page-childcare .cc-ss-mini{padding:18px;border-radius:18px;background:rgba(255,190,32,.10);border:1px solid rgba(255,190,32,.24)}
  #page-childcare .cc-ss-mini b{display:block;margin-bottom:6px}
  @media(max-width:800px){
    #page-childcare .cc-ss-process,#page-childcare .cc-ss-three{grid-template-columns:1fr 1fr}
    #page-childcare .cc-ss-grid{grid-template-columns:1fr}
  }
  @media(max-width:560px){
    #page-childcare .cc-ss-process,#page-childcare .cc-ss-three,#page-childcare .cc-ss-form{grid-template-columns:1fr}
    #page-childcare .cc-ss-field.cc-full,#page-childcare .cc-ss-submit{grid-column:auto}
  }
</style>
<script id="cc-sideline-unified-script">
(() => {
  const run = () => {
    document.querySelectorAll('a[href="#childcare-status"]').forEach(a => a.remove());
    const page = document.getElementById("page-childcare") || document.querySelector('[data-page="childcare"]');
    if(!page || page.dataset.ccSidelineUnified === "1") return;
    page.dataset.ccSidelineUnified = "1";

    page.innerHTML =
      '<section class="cc-ss-hero">'+
        '<div class="cc-ss-wrap">'+
          '<div class="cc-ss-kicker">Sideline Sitters</div>'+
          '<h1>Childcare that moves with the work.</h1>'+
          '<p>Tell us where the parent needs to be and when. We turn the schedule into a provider-ready request, route it to the right kind of childcare partner, keep the family updated and keep looking when the first option cannot take it. The childcare provider makes the final booking.</p>'+
          '<div class="cc-ss-actions">'+
            '<a href="#childcare-request">Request care</a>'+
            '<a href="#childcare-partners">Become a provider partner</a>'+
            '<a href="#childcare-funders">Fund care for your people</a>'+
          '</div>'+
        '</div>'+
      '</section>'+

      '<section class="cc-ss-section">'+
        '<div class="cc-ss-wrap">'+
          '<h2>Care should not be the reason a parent misses the opportunity.</h2>'+
          '<p class="cc-ss-lead">Sideline Sitters is the coordination layer between the schedule and the childcare provider. We collect the information a provider actually needs, route by fit and capacity, follow the request and re-route when another suitable option is available. We do not call a request booked until the provider accepts it.</p>'+
          '<div class="cc-ss-process">'+
            '<div class="cc-ss-step"><b>1 · Tell us the schedule</b><span>Shift, call time, rehearsal, event day, hotel stay, interview, training or recurring care.</span></div>'+
            '<div class="cc-ss-step"><b>2 · We make it provider-ready</b><span>Location, ages, hours, care setting, timing and payment path are organized once.</span></div>'+
            '<div class="cc-ss-step"><b>3 · We route and follow up</b><span>Providers decide fit and capacity. A decline can be re-routed instead of becoming a dead end.</span></div>'+
            '<div class="cc-ss-step"><b>4 · Provider confirms</b><span>The accepting provider handles enrolment, protected care information, payment and the actual booking.</span></div>'+
          '</div>'+
        '</div>'+
      '</section>'+

      '<section class="cc-ss-section" id="childcare-request">'+
        '<div class="cc-ss-wrap">'+
          '<h2>Request care — and keep the status in the same place.</h2>'+
          '<p class="cc-ss-lead">One family form starts the request. Your reference number stays with it, so you can come back here to check the latest status from the same browser instead of hunting for a separate status page.</p>'+
          '<div class="cc-ss-grid">'+
            '<div class="cc-ss-card">'+
              '<h3>Start a childcare request</h3>'+
              '<form id="ccSidelineFamilyForm" class="cc-ss-form">'+
                '<div class="cc-ss-field"><label>Parent / guardian</label><input name="guardian" required></div>'+
                '<div class="cc-ss-field"><label>Email</label><input type="email" name="email" required></div>'+
                '<div class="cc-ss-field"><label>Phone</label><input name="phone" required></div>'+
                '<div class="cc-ss-field"><label>City / area</label><input name="city" required></div>'+
                '<div class="cc-ss-field cc-full"><label>Care location / neighbourhood</label><input name="location" required></div>'+
                '<div class="cc-ss-field"><label>Children / ages</label><input name="children" placeholder="Example: 2 children — ages 4 and 8" required></div>'+
                '<div class="cc-ss-field"><label>Schedule type</label><select name="scheduleType" required><option value="">Choose</option><option>One-time</option><option>Recurring</option><option>Emergency / backup</option><option>Not sure yet</option></select></div>'+
                '<div class="cc-ss-field"><label>Date needed</label><input type="date" name="date"></div>'+
                '<div class="cc-ss-field"><label>Timing</label><select name="timing"><option>Planned</option><option>Short notice</option><option>Same day / emergency backup</option></select></div>'+
                '<div class="cc-ss-field"><label>Start time</label><input type="time" name="startTime"></div>'+
                '<div class="cc-ss-field"><label>End time</label><input type="time" name="endTime"></div>'+
                '<div class="cc-ss-field"><label>Preferred care setting</label><select name="careSetting"><option>Best available fit</option><option>Licensed centre / backup care</option><option>Licensed home childcare</option><option>In-home care</option><option>In-hotel care</option><option>Sitter / agency</option></select></div>'+
                '<div class="cc-ss-field"><label>Work / event context</label><select name="context"><option>Carnival Careers work shift</option><option>Production / call time</option><option>Rehearsal / performance</option><option>Vendor / event day</option><option>Training / interview / meeting</option><option>Travel / hotel</option><option>Recurring family schedule</option><option>Other</option></select></div>'+
                '<div class="cc-ss-field cc-full"><label>Payment path</label><select name="payment"><option>Family pays provider</option><option>Employer / sponsor may fund</option><option>Existing corporate membership</option><option>Need help identifying funding path</option></select></div>'+
                '<div class="cc-ss-field cc-full"><label>Anything a provider needs to know to decide fit?</label><textarea name="notes" placeholder="Schedule or care-fit information only. Do not put medical records, banking information or other sensitive personal data here."></textarea></div>'+
                '<div class="cc-ss-submit"><button class="cc-ss-btn" type="submit">Start my childcare request</button><span class="cc-ss-note">This starts coordination, not a confirmed booking.</span></div>'+
              '</form>'+
              '<div id="ccSidelineFamilyResult" class="cc-ss-result" aria-live="polite">Submit the request to receive your Sideline Sitters reference number.</div>'+
            '</div>'+
            '<aside class="cc-ss-card cc-ss-status">'+
              '<h3>Already requested care?</h3>'+
              '<p>Check the request from the same place you submitted it.</p>'+
              '<div class="cc-ss-field"><label>Sideline Sitters reference</label><input id="ccSidelineStatusRef" placeholder="Example: SS-ABC123"></div>'+
              '<button id="ccSidelineStatusBtn" class="cc-ss-btn cc-secondary" type="button" style="margin-top:10px">Check my request</button>'+
              '<div id="ccSidelineStatusResult" class="cc-ss-result" aria-live="polite">Status will appear here.</div>'+
              '<p class="cc-ss-note">Current web build stores the request/status record in the browser used to submit it. Provider confirmation is still what makes care booked.</p>'+
            '</aside>'+
          '</div>'+
        '</div>'+
      '</section>'+

      '<section class="cc-ss-section" id="childcare-partners">'+
        '<div class="cc-ss-wrap">'+
          '<h2>Provider partners: tell us what you can actually accept.</h2>'+
          '<p class="cc-ss-lead">This form is separate because it does a different job. It turns your service area, age bands, hours, care settings, rates and live capacity into a routing profile so families arrive with usable information instead of vague referrals.</p>'+
          '<div class="cc-ss-three">'+
            '<div class="cc-ss-mini"><b>Your rules stay yours</b>Licensing, screening, enrolment, caregiver assignment, rates, minimums, cancellation and payment remain with you.</div>'+
            '<div class="cc-ss-mini"><b>Track the referral</b>Use a referral link, code, source field, portal, API or email handoff to identify Sideline Sitters demand.</div>'+
            '<div class="cc-ss-mini"><b>Overflow can come back</b>If you cannot place a family, send the request back and we can look for another suitable provider.</div>'+
          '</div>'+
          '<div class="cc-ss-card">'+
            '<form id="ccSidelineProviderForm" class="cc-ss-form">'+
              '<div class="cc-ss-field"><label>Provider / agency name</label><input name="provider" required></div>'+
              '<div class="cc-ss-field"><label>Primary contact</label><input name="contact" required></div>'+
              '<div class="cc-ss-field"><label>Email</label><input type="email" name="email" required></div>'+
              '<div class="cc-ss-field"><label>Phone</label><input name="phone"></div>'+
              '<div class="cc-ss-field"><label>Provider type</label><select name="providerType"><option>Licensed childcare centre / agency</option><option>Licensed home-childcare agency</option><option>In-home / in-hotel childcare agency</option><option>Babysitting / sitter agency</option><option>Independent qualified caregiver</option><option>Corporate backup-care provider</option><option>Other</option></select></div>'+
              '<div class="cc-ss-field"><label>Service area</label><input name="serviceArea" required></div>'+
              '<div class="cc-ss-field"><label>Ages served</label><input name="ages"></div>'+
              '<div class="cc-ss-field"><label>Hours / days</label><input name="hours"></div>'+
              '<div class="cc-ss-field"><label>Care settings</label><input name="settings" placeholder="Centre, home, hotel, in-home..."></div>'+
              '<div class="cc-ss-field"><label>Short-notice capacity</label><select name="shortNotice"><option>Yes — subject to availability</option><option>Sometimes</option><option>No</option></select></div>'+
              '<div class="cc-ss-field cc-full"><label>Current capacity / openings</label><textarea name="capacity"></textarea></div>'+
              '<div class="cc-ss-field"><label>Rates / pricing model</label><input name="rates"></div>'+
              '<div class="cc-ss-field"><label>Minimum booking / cancellation rule</label><input name="minimums"></div>'+
              '<div class="cc-ss-field"><label>Billing supported</label><select name="billing"><option>Family pays provider directly</option><option>Employer / sponsor billing supported</option><option>Both</option><option>Other</option></select></div>'+
              '<div class="cc-ss-field"><label>Tracked intake option</label><select name="tracking"><option>Dedicated referral link</option><option>Referral code</option><option>Partner form / source field</option><option>Portal</option><option>API / data handoff</option><option>Email handoff</option><option>Other</option></select></div>'+
              '<div class="cc-ss-field cc-full"><label>Licensing / screening / insurance / compliance</label><textarea name="compliance"></textarea></div>'+
              '<div class="cc-ss-field"><label>Accept overflow referrals?</label><select name="acceptOverflow"><option>Yes</option><option>Capacity-dependent</option><option>No</option></select></div>'+
              '<div class="cc-ss-field"><label>Send overflow back to Sideline Sitters?</label><select name="sendOverflow"><option>Yes</option><option>Maybe</option><option>No</option></select></div>'+
              '<div class="cc-ss-field cc-full"><label>Agreement / onboarding / next step</label><textarea name="nextStep"></textarea></div>'+
              '<div class="cc-ss-submit"><button class="cc-ss-btn" type="submit">Submit provider capacity</button></div>'+
            '</form>'+
            '<div id="ccSidelineProviderResult" class="cc-ss-result" aria-live="polite">Your provider profile will be saved with a reference number.</div>'+
          '</div>'+
        '</div>'+
      '</section>'+

      '<section class="cc-ss-section" id="childcare-funders">'+
        '<div class="cc-ss-wrap">'+
          '<h2>Employers and sponsors: fund the care around the schedule.</h2>'+
          '<p class="cc-ss-lead">This stays separate because the payer is solving a different problem. Tell us who needs access, where, when and what you want to fund. We can then match the benefit design to real provider terms instead of advertising a subsidy or membership that does not exist yet.</p>'+
          '<div class="cc-ss-three">'+
            '<div class="cc-ss-mini"><b>Demand-led</b>Pay for accepted use where the provider supports it.</div>'+
            '<div class="cc-ss-mini"><b>Funded block</b>Create a defined pool of approved childcare for a production, workforce or event.</div>'+
            '<div class="cc-ss-mini"><b>Membership / access</b>Package the population and service area when a provider requires corporate access.</div>'+
          '</div>'+
          '<div class="cc-ss-card">'+
            '<form id="ccSidelineFunderForm" class="cc-ss-form">'+
              '<div class="cc-ss-field"><label>Organization</label><input name="organization" required></div>'+
              '<div class="cc-ss-field"><label>Contact name</label><input name="contact" required></div>'+
              '<div class="cc-ss-field"><label>Email</label><input type="email" name="email" required></div>'+
              '<div class="cc-ss-field"><label>Phone</label><input name="phone"></div>'+
              '<div class="cc-ss-field"><label>City / coverage area</label><input name="area"></div>'+
              '<div class="cc-ss-field"><label>Estimated family count</label><input name="familyCount"></div>'+
              '<div class="cc-ss-field cc-full"><label>Who needs access?</label><textarea name="population"></textarea></div>'+
              '<div class="cc-ss-field"><label>Coverage model</label><select name="coverageModel"><option>Demand-led / per accepted booking</option><option>Funded childcare block</option><option>Corporate membership / access</option><option>Discount / priority access</option><option>Event-specific coverage</option><option>Need options</option></select></div>'+
              '<div class="cc-ss-field"><label>Dates / schedule</label><input name="schedule"></div>'+
              '<div class="cc-ss-field cc-full"><label>Budget / billing preference</label><textarea name="budget"></textarea></div>'+
              '<div class="cc-ss-field cc-full"><label>What should the childcare benefit accomplish?</label><textarea name="goal"></textarea></div>'+
              '<div class="cc-ss-submit"><button class="cc-ss-btn" type="submit">Build a funded-care option</button><span class="cc-ss-note">Nothing is promoted as funded until provider terms, payer, eligibility and booking rules are documented.</span></div>'+
            '</form>'+
            '<div id="ccSidelineFunderResult" class="cc-ss-result" aria-live="polite">Submit the coverage brief to receive a reference number.</div>'+
          '</div>'+
        '</div>'+
      '</section>';

    const read = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch(e) { return []; } };
    const write = (key,val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} };
    const ref = prefix => prefix + "-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","'":"&#039;"}[m]));

    const familyForm = document.getElementById("ccSidelineFamilyForm");
    familyForm.addEventListener("submit", e => {
      e.preventDefault();
      if(!familyForm.reportValidity()) return;
      const data = Object.fromEntries(new FormData(familyForm).entries());
      const id = ref("SS");
      const record = {id, kind:"childcare-request", status:"Received — preparing provider routing", createdAt:new Date().toISOString(), ...data};
      const rows = read("cc_submissions_v3"); rows.unshift(record); write("cc_submissions_v3", rows);
      const ss = read("cc_sideline_requests_v2"); ss.unshift(record); write("cc_sideline_requests_v2", ss);
      document.getElementById("ccSidelineFamilyResult").innerHTML = "<strong>Request received: "+esc(id)+"</strong><br>Keep this reference. Use the status box beside the form to check this request from this browser.";
      document.getElementById("ccSidelineStatusRef").value = id;
    });

    document.getElementById("ccSidelineStatusBtn").addEventListener("click", () => {
      const id = document.getElementById("ccSidelineStatusRef").value.trim().toUpperCase();
      const rows = read("cc_sideline_requests_v2").concat(read("cc_submissions_v3"));
      const hit = rows.find(x => String(x.id || "").toUpperCase() === id);
      const out = document.getElementById("ccSidelineStatusResult");
      if(!id) { out.textContent = "Enter your Sideline Sitters reference."; return; }
      if(!hit) { out.textContent = "No matching request is stored in this browser. If you submitted from another device, use the confirmation email or contact Carnival Careers with your reference."; return; }
      out.innerHTML = "<strong>"+esc(hit.id)+"</strong><br>"+esc(hit.status || "Received")+"<br><span class=\\"cc-ss-note\\">Submitted "+esc(hit.createdAt ? new Date(hit.createdAt).toLocaleString() : "")+"</span>";
    });

    const savePartner = (formId, resultId, kind, prefix, storageKey) => {
      const form = document.getElementById(formId);
      form.addEventListener("submit", e => {
        e.preventDefault();
        if(!form.reportValidity()) return;
        const data = Object.fromEntries(new FormData(form).entries());
        const id = ref(prefix);
        const record = {id, kind, status:"Submitted for review", createdAt:new Date().toISOString(), ...data};
        const rows = read("cc_submissions_v3"); rows.unshift(record); write("cc_submissions_v3", rows);
        const lane = read(storageKey); lane.unshift(record); write(storageKey, lane);
        document.getElementById(resultId).innerHTML = "<strong>Submitted: "+esc(id)+"</strong><br>Saved to the Carnival Careers intake in this browser.";
      });
    };
    savePartner("ccSidelineProviderForm","ccSidelineProviderResult","childcare-provider-capacity","SSP","cc_sideline_providers_v2");
    savePartner("ccSidelineFunderForm","ccSidelineFunderResult","childcare-funding","SSF","cc_sideline_funders_v2");
  };
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, {once:true}); else run();
})();
</script>\`;

const removeSidelineKpiPatch = `
<script id="cc-remove-sideline-kpi">
(() => {
  const remove = () => document.querySelectorAll(".sideline-kpi").forEach(el => el.remove());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", remove, { once:true });
  else remove();
  if ("MutationObserver" in window) new MutationObserver(remove).observe(document.documentElement,{subtree:true,childList:true});
})();
</script>`;

const wholeReconciliationPatch = `
<style id="cc-whole-reconcile-style">
  .cc-whole-reconcile{margin:22px 0;padding:22px;border-radius:20px;border:1px solid rgba(112,72,232,.28);background:linear-gradient(135deg,rgba(112,72,232,.10),rgba(255,190,32,.08));color:inherit}
  .cc-whole-reconcile h1,.cc-whole-reconcile h2,.cc-whole-reconcile h3{margin:.2em 0 .5em}
  .cc-whole-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0}
  .cc-whole-card{padding:14px;border-radius:14px;background:rgba(255,255,255,.76);color:#171717;border:1px solid rgba(0,0,0,.08)}
  .cc-whole-card b{display:block;font-size:1.22rem;margin-bottom:4px}
  .cc-whole-table{width:100%;border-collapse:collapse;margin:14px 0;font-size:.94rem}
  .cc-whole-table td,.cc-whole-table th{padding:9px 8px;border-bottom:1px solid rgba(127,127,127,.22);text-align:left;vertical-align:top}
  .cc-whole-note{font-size:.86rem;opacity:.84;max-width:88ch}
  #page-project .cc-whole-reconcile{font-size:1.12rem;padding:30px}
  #page-project .cc-whole-reconcile h2{font-size:clamp(2rem,4vw,3.2rem);line-height:1.02}
  #page-project .cc-whole-reconcile>p{font-size:1.14rem;line-height:1.6}
  #page-project .cc-whole-card{font-size:1.08rem;line-height:1.5;padding:20px}
  #page-project .cc-whole-card b{font-size:1.5rem;margin-bottom:8px}
  #page-project .cc-whole-note{font-size:1.04rem;line-height:1.6;opacity:.92}

  #page-capital{font-size:1.15rem;line-height:1.62}
  #page-capital h1{font-size:clamp(2.8rem,6vw,5.2rem);line-height:.98}
  #page-capital h2{font-size:clamp(2rem,4vw,3.4rem);line-height:1.04}
  #page-capital h3{font-size:clamp(1.45rem,2.5vw,2.15rem);line-height:1.12}
  #page-capital p,#page-capital li,#page-capital dd,#page-capital dt{font-size:1.12rem;line-height:1.65}
  #page-capital .cc-kicker{font-size:1rem;line-height:1.4;font-weight:850;letter-spacing:.06em}
  #page-capital .cc-whole-reconcile{padding:32px}
  #page-capital .cc-whole-card{font-size:1.12rem;line-height:1.5;padding:20px}
  #page-capital .cc-whole-card b{font-size:1.55rem;line-height:1.15;margin-bottom:8px}
  #page-capital .cc-whole-table{font-size:1.08rem;line-height:1.5}
  #page-capital .cc-whole-table td,#page-capital .cc-whole-table th{padding:13px 10px}
  #page-capital .cc-whole-note{font-size:1.05rem;line-height:1.65;opacity:.94}
  #page-capital table:not(.cc-whole-table){font-size:1.06rem;line-height:1.5}
  #page-capital table:not(.cc-whole-table) td,#page-capital table:not(.cc-whole-table) th{padding:12px 10px}
  #page-capital label,#page-capital input,#page-capital select,#page-capital textarea,#page-capital button{font-size:1.05rem}
  @media(max-width:640px){
    #page-capital{font-size:1.08rem}
    #page-capital p,#page-capital li,#page-capital dd,#page-capital dt{font-size:1.06rem}
    #page-capital .cc-whole-reconcile{padding:22px 18px}
    #page-capital .cc-whole-table{font-size:1rem}
  }
</style>
<script id="cc-whole-reconcile-script">
(() => {
  const KEY="2026-09-20-19-protected";
  const box=(html)=>'<section class="cc-whole-reconcile" data-cc-whole="'+KEY+'">'+html+'</section>';
  const project=document.getElementById("page-project")||document.querySelector('[data-page="project"]');
  const capital=document.getElementById("page-capital")||document.querySelector('[data-page="capital"]');
  const travel=document.getElementById("page-plane")||document.querySelector('[data-page="plane"],[data-page="travel"]');

  const projectHtml =
    '<h2>Toronto property plan</h2>'+
    '<p>Buy 19 Vic Towns for resale. Keep PATH, East Bayfront and Istanbul Fine Foods.</p>'+
    '<div class="cc-whole-grid">'+
      '<div class="cc-whole-card"><b>19 Vic Towns</b>C$14.110M modeled purchase · resell</div>'+
      '<div class="cc-whole-card"><b>PATH</b>C$560K · keep</div>'+
      '<div class="cc-whole-card"><b>East Bayfront</b>C$548K · keep</div>'+
      '<div class="cc-whole-card"><b>Istanbul Fine Foods</b>C$1.5M · keep and operate</div>'+
    '</div>'+
    '<p class="cc-whole-note">The 19 Vic Towns are modeled to cover financing, investor capital and profit, and major Toronto costs. Final figures depend on tax, appraisal, resale and financing terms.</p>';

  if(capital){
    const inner=capital.querySelector(".page-inner,.content,.section-inner,.container,.wrap")||capital;
    inner.innerHTML=box(
      '<div class="cc-kicker">Capital · whole-company protected coverage</div>'+
      '<h1>One current capital story.</h1>'+
      '<p>The current model buys only the Vic Towns units needed to withstand the complete audited cost stack and a conservative unresolved-HST stress while retaining PATH, East Bayfront and Istanbul Fine Foods.</p>'+
      '<div class="cc-whole-grid">'+
        '<div class="cc-whole-card"><b>C$14.110M</b>19-unit Vic Towns modeled purchase</div>'+
        '<div class="cc-whole-card"><b>C$30.128M</b>Modeled net Vic resale proceeds</div>'+
        '<div class="cc-whole-card"><b>C$29.844M</b>Modeled protected obligations</div>'+
        '<div class="cc-whole-card"><b>C$284K</b>Modeled residual cushion · not promised profit</div>'+
      '</div>'+
      '<h3>What the protected sale engine covers</h3>'+
      '<table class="cc-whole-table"><tbody>'+
        '<tr><td>Modeled senior principal</td><td>C$11.288M</td></tr>'+
        '<tr><td>12-month 9% senior-interest stress</td><td>C$1.016M</td></tr>'+
        '<tr><td>Investor capital returned</td><td>C$2.822M</td></tr>'+
        '<tr><td>Investor target profit</td><td>C$1.200M</td></tr>'+
        '<tr><td>PATH acquisition</td><td>C$560K</td></tr>'+
        '<tr><td>East Bayfront acquisition</td><td>C$548K</td></tr>'+
        '<tr><td>Istanbul Fine Foods acquisition</td><td>C$1.500M</td></tr>'+
        '<tr><td>Arena venue</td><td>C$250K</td></tr>'+
        '<tr><td>Stage / sound / lighting</td><td>C$200K</td></tr>'+
        '<tr><td>Primary talent</td><td>C$250K</td></tr>'+
        '<tr><td>Other artists / hosts / DJs</td><td>C$100K</td></tr>'+
        '<tr><td>Event marketing</td><td>C$150K</td></tr>'+
        '<tr><td>Staffing + security</td><td>C$200K</td></tr>'+
        '<tr><td>Event / production logistics</td><td>C$500K</td></tr>'+
        '<tr><td>TV / media production</td><td>C$111.056K</td></tr>'+
        '<tr><td>Six gross salaries</td><td>C$630K</td></tr>'+
        '<tr><td>Minimum employer burden</td><td>C$63K</td></tr>'+
        '<tr><td>May 2027 cruise</td><td>C$2.331M</td></tr>'+
        '<tr><td>SweetEV upfront cash</td><td>C$48.9K</td></tr>'+
        '<tr><td>50% ticket refund / restricted reserve</td><td>C$1.564M</td></tr>'+
        '<tr><td>Grocery-benefit maximum reserve</td><td>C$990K</td></tr>'+
        '<tr><td>Transit + City Hall</td><td>C$45K</td></tr>'+
        '<tr><td>Enterprise legal / admin</td><td>C$150K</td></tr>'+
        '<tr><td>Project travel / logistics</td><td>C$200K</td></tr>'+
        '<tr><td>PATH + East carry + land transfer tax</td><td>C$48.5K</td></tr>'+
        '<tr><td>Vic land transfer tax + tax proxy + common carry + closing allowance</td><td>C$744.8K</td></tr>'+
        '<tr><td>13% Vic HST stress while treatment is unresolved</td><td>C$1.834M</td></tr>'+
        '<tr><td><strong>Known-but-unpriced whole-company reserve</strong></td><td><strong>C$500K</strong></td></tr>'+
        '<tr><td>Insurance + risk coverage still awaiting final quotes</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Appraisal + environmental + title / diligence</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Lender / broker / legal closing fees not yet final</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Permits + municipal / operating approvals still to price</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Artist travel / hospitality / rights not yet contracted</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Sponsor / vendor activation fulfillment still to quote</td><td>Inside C$500K reserve</td></tr>'+
        '<tr><td>Payments / CRM / forms / automation / operating systems</td><td>Inside C$500K reserve</td></tr>'+
      '</tbody></table>'+
      '<p class="cc-whole-note">These are working underwriting/control figures, not commitments or guaranteed returns. The 19-unit block is the first selected block that stays positive under the current full-HST stress. Uncommitted operating revenue is upside and does not reduce the protected unit count.</p>'
    );
  }

  if(travel){
    const old=travel.querySelector('[data-cc-whole]');
    if(old) old.remove();
    const host=travel.querySelector(".page-inner,.content,.section-inner,.container,.wrap")||travel;
    host.insertAdjacentHTML("afterbegin",box(
      '<div class="cc-kicker">Travel · current financial control</div>'+
      '<h2>The first-sailing model stays 170 paying guests.</h2>'+
      '<div class="cc-whole-grid">'+
        '<div class="cc-whole-card"><b>C$2.331141M</b>Modeled first-sailing cost</div>'+
        '<div class="cc-whole-card"><b>C$2.625M</b>Modeled passenger + sponsor revenue</div>'+
        '<div class="cc-whole-card"><b>C$293,859</b>Modeled EBITDA before final reconciliation</div>'+
      '</div>'+
      '<p>The protected Toronto model carries the full C$2.331141M cruise cost without depending on cruise revenue. The C$2.625M revenue and C$293,859 EBITDA remain modeled and uncommitted until operator, compliant travel seller, supplier, sponsor and paid-booking evidence exists.</p>'
    ));
  }

  const replacements = [];\n  const scrub=()=>{
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let n;
    while((n=walker.nextNode())){
      if(n.parentElement && n.parentElement.closest("script,style")) continue;
      let v=n.nodeValue||"";
      let next=v;
      for(const [re,b] of replacements) next=next.replace(re,b);
      if(next!==v)n.nodeValue=next;
    }
  };
  scrub();
})();
</script>`;

let renderedHtml = canonicalHtml.replaceAll("What the hosts experience in one episode.", "A Carnival Careers episode, in short...");
renderedHtml = renderedHtml.replaceAll(" — never the beginning — because by the time the city gathers, the story has already created something real.", ".");
renderedHtml = renderedHtml.replace(/<div class="project-chips">[\s\S]*?<\/div>/, "");
const professionalCopyReplacements = [
  ["03</span> Professional forms", "03</span> Get each city done"],
  ["Firm up the people who make each city executable.", "These are the professionals who turn a city from plan into reality."],
  ["The goal is not a directory of names. It is a delivery bench: who owns the deliverable, what it costs, how fast it can close, and what dependency it clears.", "Each person or firm takes responsibility for a specific job, gives us a price and timeline, and tells us what they need from Carnival Careers to finish it."],
  ["SPVs, transactions, contracts, securities, rights and closing.", "Set up city companies, contracts, rights, deals and closings."],
  ["Entity setup, tax structure, controls, reporting and city-level economics.", "Set up the books, taxes, reporting and controls so each city can operate cleanly."],
  ["Property, event, production, liability, workers and travel coverage.", "Cover the property, events, workers, production and travel."],
  ["Appraisal + diligence", "Property checks"],
  ["Appraisal, environmental, market, title and underwriting support.", "Confirm value, title, environmental issues, market facts and lender requirements."],
  ["Planning + build", "Design + build"],
  ["Permits, design, renovations, construction and development execution.", "Handle permits, design, renovations, construction and development."],
  ["Capital execution", "Funding"],
  ["Debt, equity, grants, sponsorship and transaction coordination.", "Help close debt, equity, grants and sponsorship."],
  ["Production + media", "TV + live production"],
  ["Television, live show, music, crews, post-production and distribution.", "Deliver the episode, concert, music, crews, editing and distribution."],
  ["CRM, payments, forms, automation, analytics and operational infrastructure.", "Run CRM, forms, payments, automation and reporting."],
  ["Join the execution bench", "Can you own one of these jobs?"],
  ["Tell us exactly what you can own, your fee basis and what you need from Carnival Careers to get it closed.", "Tell us what you can take responsibility for, what you charge, how quickly you can do it, and what you need from Carnival Careers."],
  [">Discipline</option>", ">Area of work</option>"],
  [">Appraisal + diligence</option>", ">Property checks</option>"],
  [">Planning + build</option>", ">Design + build</option>"],
  [">Capital execution</option>", ">Funding</option>"],
  [">Production + media</option>", ">TV + live production</option>"],
  ["placeholder=\"Fee basis\"", "placeholder=\"Your price / fee structure\""],
  ["placeholder=\"Typical turnaround\"", "placeholder=\"How fast can you deliver?\""],
  ["placeholder=\"Deliverable you can own, dependencies, credentials and next step\"", "placeholder=\"What can you own from start to finish? What do you need from Carnival Careers?\""],
  [">Firm up your lane</button>", ">Join the city team</button>"]
];

for (const [from,to] of professionalCopyReplacements) renderedHtml = renderedHtml.replaceAll(from,to);
renderedHtml = renderedHtml.replace(/<section class="page" data-page="careers" id="page-careers">[\s\S]*?(?=<section class="page[^"]*" data-page="childcare")/, "");
renderedHtml = renderedHtml.replace(/<a\b[^>]*href="#careers"[^>]*>[\s\S]*?<\/a>/g, "");
// STATIC TELL-ME ROUTES V2
renderedHtml = renderedHtml.replace(/<a href="#show"><span>▶<\/span><div><h3>The Show\.<\/h3>[\s\S]*?<\/a>/, "");
renderedHtml = renderedHtml.replace(/<a href="#music"><span>♫<\/span><div><h3>I make the room move\.<\/h3><p>[^<]*<\/p><\/div><b>↗<\/b><\/a>/, '<a href="#arena-artist-intake"><span>♫</span><div><h3>I make the room move.</h3><p>Artists + creative leaders: submit for the arena, episode and tour.</p></div><b>↗</b></a>');
renderedHtml = renderedHtml.replace(/<a href="#music"><span>◒<\/span><div><h3>I make culture\.<\/h3><p>[^<]*<\/p><\/div><b>↗<\/b><\/a>/, '<a href="#experiences"><span>◒</span><div><h3>I create culture.</h3><p>Share Carnival, festival, parade + arena-show video.</p></div><b>↗</b></a>');
renderedHtml = renderedHtml.replace(/<a href="#show"><span>✦<\/span><div><h3>I carry the culture\.<\/h3><p>[^<]*<\/p><\/div><b>↗<\/b><\/a>/, '<a href="#experiences"><span>✦</span><div><h3>I carry the culture.</h3><p>Carnival, festival, parade + city culture.</p></div><b>↗</b></a>');
renderedHtml = renderedHtml.replace(/<a href="#project-professional">Professional forms<\/a>/g, "");
renderedHtml = renderedHtml.replace(/<a\\b[^>]*href="#childcare-status"[^>]*>[\\s\\S]*?<\\/a>/g, "");
renderedHtml = renderedHtml.replace(/<section class="section light" id="childcare-funders">[\s\S]*?<\/section>\s*(?=<section class="section" id="childcare-status">)/, "");

renderedHtml = renderedHtml.replace(
  /<section class="section" id="home-host-experience"[\s\S]*?<\/section>/,
  '<section class="section" id="home-host-experience" style="background:#ffffff;color:#111827;"><div class="wrap" style="max-width:1180px;"><div class="actions"><a class="btn" href="#show">See the Show</a></div></div></section>'
);
for (const block of [trafficFunnel, projectCopy, vendorSponsorJourneyPatch, wholeReconciliationPatch, familiesWorkMergePatch, sidelineSittersUnifiedPatch, removeSidelineKpiPatch, showPageButtonPatch, removeSmallClutterLabels, projectStorySimplifyPatch, siteDedupePatch, projectCapitalMergePatch, trailerExperience, contrastGuard, lenderReadabilityPatch, audienceRoutingPatch, cityPartnerInvitePatch]) {
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
  stacked_story_blocks_removed: true,
  plain_language_refactor: true,
  unified_story_spine: true,
  carnival_main_theme_non_music_pages: true,
  mas_parade_attendance_visible: true,
  carnival_visual_badge_removed: true,
  canonical_document_system: "WHOLE-21-PROTECTED-19UNIT-2026-09-20",
  source_recovery_instances: 1400,
  source_unique_objects: 1273,
  currentized_enterprise_uses_cad: 29844171.944789,
  protected_enterprise_obligations_cad: 29844171.944789,
  vic_towns_units_current: 19,
  vic_towns_selected_sqft: 26876,
  vic_towns_purchase_cad: 14109900,
  vic_towns_hst_stress_cad: 1834287,
  vic_hst_treatment_resolved: false,
  vic_towns_net_resale_cad: 30127996,
  downside_residual_cushion_cad: 283824.055211,
  family_social_contribution: true,
  host_social_contribution: true,
  financial_execution_timeline_months: 12,
  longer_horizon_separated: true,
  trailer_modal_audio: true,
  vendor_end_to_end_journey: true,
  sponsor_end_to_end_journey: true,
  careers_page_removed: true,
  project_professional_dropdown_removed: true,
  arena_artist_intake_abc_list: true,
  culture_media_wall: true,
  weekly_affiliate_events_carousel: true,
  city_partner_invite_end_to_end: true,
  sideline_sitters_unified: true,
  sideline_status_merged_into_family_request: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOUR_KEEP=ON", "CARNIVAL_BADGE=REMOVED", "PLAIN_LANGUAGE=ON");
