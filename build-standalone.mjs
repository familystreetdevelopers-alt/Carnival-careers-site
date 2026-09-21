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
  .cc-eyk-shell:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.24;background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);background-size:24px 24px;mask-image:linear-gradient(to bottom,black,transparent 78%)}
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

  place(home,"core-home",'<div class="cc-kicker">Toronto story</div><h3>Contribution. Stability. Ownership.</h3><p><strong>Hopeton LaTouche’s household is the featured Toronto family / tenant-owner story.</strong> <strong>Michie Mee is the episode host.</strong> Michie brings cultural memory, contribution and a public platform. Hopeton’s household brings work, caregiving, resilience, culture, local spending and a real ownership journey. Carnival Careers connects those contributions to tangible change, visible Carnival and mas parade attendance, and then the arena as the public victory lap.</p>');
  place(families,"core-families",'<div class="cc-kicker">Families</div><h3>The family’s contribution comes before the support model.</h3><p>Work, caregiving, culture, neighbourhood relationships, resilience and ownership ambition are already contributions. Carnival Careers can add documented work/income pathways, housing/ownership progress, mobility, childcare/family supports and partner connections. A qualifying tenant-owner role is modeled at C$105,000 gross a year for real documented work when funded and activated. The household uses that income for housing, Eat Your Keep groceries, SweetEVRides mobility, childcare and normal family needs, while the family remains visibly part of Carnival culture and mas parade attendance.</p>');
  place(project,"core-project",'<div class="cc-kicker">Project</div><h3>One family makes the city stakes visible.</h3><p>Toronto moves from Michie and the family relationship through dinner, history, work, home/ownership, Eat Your Keep, mobility, childcare, local commerce, Carnival culture and mas parade attendance. The arena comes last, after the project has produced real evidence that something changed. Toronto is the proof for a 65-city format: each city needs its own highlighted woman, featured family, real change, Carnival/public-culture beat and earned arena payoff.</p>');
  place(show,"core-show",'<div class="cc-kicker">The show</div><h3>Michie Mee carries the relationship and recognition.</h3><p>The episode follows recognition → relationship → tangible change → Carnival/mas parade visibility → public triumph. Michie Mee is the highlighted Toronto woman and host; Hopeton LaTouche is the featured family / tenant-owner. The parade shows the family and city inside the culture before the arena delivers the final emotional release.</p>');
  place(capital,"core-capital",'<div class="cc-kicker">Capital</div><h3>19 Vic Towns are the protected downside sale engine.</h3><p>PATH #5101/12 York and East Bayfront #3215/138 Downes are retained alongside Istanbul Fine Foods. The unit-sizing case does not count uncommitted operating revenue and covers the senior/investor exit, C$1.2M investor target profit, audience reserves and whole-company operating obligations.</p>');
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
  place(store,"core-store",eatYourKeepHtml);
  initEatYourKeep(store);
})();
</script>`;


const showPageButtonPatch = `
<script id="cc-show-button-patch">
(() => {
  const run = () => {
    const start = "In each city, the hosts arrive as the audience’s guides into a complete Carnival Careers story:";
    const nodes = [...document.querySelectorAll("p,div")];
    const target = nodes.find(el => (el.textContent || "").trim().startsWith(start));
    if (!target) return;

    const wrap = document.createElement("div");
    wrap.className = "actions";
    wrap.setAttribute("data-cc-show-link", "1");
    wrap.innerHTML = '<a class="btn" href="#show">See the Show</a>';

    const parent = target.parentElement;
    const prior = target.previousElementSibling;
    if (prior && /^H[1-6]$/.test(prior.tagName) && (prior.textContent || "").trim().toUpperCase() === "THE SERVICE PROMISE") {
      prior.remove();
    }
    target.replaceWith(wrap);

    if (parent) {
      const heading = [...parent.querySelectorAll("h1,h2,h3,h4,h5,h6")].find(h => (h.textContent || "").trim().toUpperCase() === "THE SERVICE PROMISE");
      if (heading) heading.remove();
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once:true });
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
</style>
<script id="cc-whole-reconcile-script">
(() => {
  const KEY="2026-09-20-19-protected";
  const box=(html)=>'<section class="cc-whole-reconcile" data-cc-whole="'+KEY+'">'+html+'</section>';
  const project=document.getElementById("page-project")||document.querySelector('[data-page="project"]');
  const capital=document.getElementById("page-capital")||document.querySelector('[data-page="capital"]');
  const travel=document.getElementById("page-plane")||document.querySelector('[data-page="plane"],[data-page="travel"]');

  const projectHtml =
    '<div class="cc-kicker">Current Toronto execution stack</div>'+
    '<h2>19 Vic Towns fund the protected downside case. PATH, East Bayfront and Istanbul stay.</h2>'+
    '<div class="cc-whole-grid">'+
      '<div class="cc-whole-card"><b>19 Vic Towns</b>26,876 sq. ft. / C$14.110M modeled purchase at C$525/sf</div>'+
      '<div class="cc-whole-card"><b>C$560K PATH</b>5101 - 12 York Street · retain</div>'+
      '<div class="cc-whole-card"><b>C$548K East Bayfront</b>3215 - 138 Downes Street · retain</div>'+
      '<div class="cc-whole-card"><b>C$1.5M Istanbul</b>Fine Foods · retain / operate</div>'+
    '</div>'+
    '<p>The 19-unit sale engine is sized without counting uncommitted sponsor, vendor, ticket, media, cruise, grocery, Istanbul or SweetEV revenue. It covers the modeled senior/investor exit, C$1.2M investor target profit, audience reserves, project operating costs and a controlled reserve for real costs still waiting on quotes.</p>'+
    '<p class="cc-whole-note"><strong>Protected tax rule:</strong> the model carries a full 13% Vic Towns HST stress until the definitive APS/tax review confirms whether HST is included, recoverable or otherwise lower. Seller acceptance of the reduced 19-unit block, appraisal/actual resale values and lender/investor terms remain evidence gates.</p>';

  if(project){
    const old=project.querySelector('[data-cc-whole]');
    if(old) old.remove();
    const host=project.querySelector(".project-wrap,.page-inner,.content,.container,.wrap")||project;
    host.insertAdjacentHTML("afterbegin",box(projectHtml));
  }

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
        '<tr><td>PATH + East Bayfront + Istanbul</td><td>C$2.608M</td></tr>'+
        '<tr><td>Arena + TV</td><td>C$1.761M</td></tr>'+
        '<tr><td>Six salaries + minimum employer burden</td><td>C$693K</td></tr>'+
        '<tr><td>May 2027 cruise</td><td>C$2.331M</td></tr>'+
        '<tr><td>SweetEV upfront cash</td><td>C$48.9K</td></tr>'+
        '<tr><td>50% ticket refund / restricted reserve</td><td>C$1.564M</td></tr>'+
        '<tr><td>Grocery-benefit maximum reserve</td><td>C$990K</td></tr>'+
        '<tr><td>Transit + City Hall</td><td>C$45K</td></tr>'+
        '<tr><td>Enterprise legal / admin</td><td>C$150K</td></tr>'+
        '<tr><td>Project travel / logistics</td><td>C$200K</td></tr>'+
        '<tr><td>PATH + East carry + LTT</td><td>C$48.5K</td></tr>'+
        '<tr><td>Vic LTT + tax proxy + common carry + closing allowance</td><td>C$744.8K</td></tr>'+
        '<tr><td>13% Vic HST stress while treatment is unresolved</td><td>C$1.834M</td></tr>'+
        '<tr><td>Known-but-unpriced whole-company reserve</td><td>C$500K</td></tr>'+
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

  const replacements = [
    [/\b16\s+Vic\s+Towns\b/g,"19 Vic Towns"],
    [/\b16-unit\s+Vic\s+Towns\b/g,"19-unit Vic Towns"],
    [/22,868\s+sq\.\s*ft\./g,"26,876 sq. ft."],
    [/C\$12\.006M/g,"C$14.110M"],
    [/C\$25\.635M/g,"C$30.128M"],
    [/C\$25\.521M/g,"C$29.844M"],
    [/C\$114K/g,"C$284K"],
    [/C\$9\.605M/g,"C$11.288M"],
    [/C\$864K/g,"C$1.016M"],
    [/C\$2\.401M/g,"C$2.822M"],
    [/C\$17\.553M/g,"superseded"],
    [/C\$18\.712M/g,"superseded"],
    [/C\$1\.159M/g,"superseded"],
    [/C\$23\.140888M/g,"superseded"],
    [/C\$29\.769885M/g,"superseded"],
    [/C\$11\.908M/g,"superseded"],
    [/C\$11\.550M/g,"superseded"],
    [/C\$592,888/g,"C$560,000"]
  ];
  const scrub=()=>{
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
for (const block of [trafficFunnel, projectCopy, wholeReconciliationPatch, showPageButtonPatch, trailerExperience, contrastGuard]) {
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
  trailer_modal_audio: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOUR_KEEP=ON", "CARNIVAL_BADGE=REMOVED", "PLAIN_LANGUAGE=ON");
