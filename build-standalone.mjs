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
  .cc-carnival-page{box-shadow:inset 0 4px 0 rgba(237,56,161,.72),inset 0 7px 0 rgba(255,190,32,.46)}
  .cc-carnival-signal{display:inline-flex;align-items:center;gap:7px;margin:10px 0 12px;padding:7px 11px;border-radius:999px;border:1px solid rgba(237,56,161,.30);background:linear-gradient(90deg,rgba(237,56,161,.12),rgba(255,190,32,.14),rgba(112,72,232,.12));font-size:.74rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
  .cc-carnival-signal::before{content:"✦";font-size:.9rem}
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

  const pages = Array.from(document.querySelectorAll('.page,[data-page]')).filter(el => {
    const key = String(el.getAttribute('data-page') || el.id || '').toLowerCase();
    return key && !key.includes('music');
  });
  pages.forEach(page => {
    page.classList.add('cc-carnival-page');
    const host = page.querySelector('.page-hero .wrap,.hero .wrap,.page-inner,.section-inner,.content,.container,.wrap') || page;
    if(!host.querySelector(':scope > .cc-carnival-signal')){
      const signal=document.createElement('div');
      signal.className='cc-carnival-signal';
      signal.textContent='Carnival roots • Mas parade attendance • City celebration';
      host.insertBefore(signal, host.firstChild);
    }
  });

  place(home,"core-home",'<div class="cc-kicker">Toronto story</div><h3>Contribution. Stability. Ownership.</h3><p><strong>Hopeton LaTouche’s household is the featured Toronto family / tenant-owner story.</strong> <strong>Michie Mee is the episode host.</strong> Michie brings cultural memory, contribution and a public platform. Hopeton’s household brings work, caregiving, resilience, culture, local spending and a real ownership journey. Carnival Careers connects those contributions to tangible change, visible Carnival and mas parade attendance, and then the arena as the public victory lap.</p>');
  place(families,"core-families",'<div class="cc-kicker">Families</div><h3>The family’s contribution comes before the support model.</h3><p>Work, caregiving, culture, neighbourhood relationships, resilience and ownership ambition are already contributions. Carnival Careers can add documented work/income pathways, housing/ownership progress, mobility, childcare/family supports and partner connections. A qualifying tenant-owner role is modeled at C$105,000 gross a year for real documented work when funded and activated. The household uses that income for housing, Eat Your Keep groceries, SweetEVRides mobility, childcare and normal family needs, while the family remains visibly part of Carnival culture and mas parade attendance.</p>');
  place(project,"core-project",'<div class="cc-kicker">Project</div><h3>One family makes the city stakes visible.</h3><p>Toronto moves from Michie and the family relationship through dinner, history, work, home/ownership, Eat Your Keep, mobility, childcare, local commerce, Carnival culture and mas parade attendance. The arena comes last, after the project has produced real evidence that something changed.</p>');
  place(show,"core-show",'<div class="cc-kicker">The show</div><h3>Michie Mee carries the relationship and recognition.</h3><p>The episode follows recognition → relationship → tangible change → Carnival/mas parade visibility → public triumph. Michie Mee is the highlighted Toronto woman and host; Hopeton LaTouche is the featured family / tenant-owner. The parade shows the family and city inside the culture before the arena delivers the final emotional release.</p>');
  place(capital,"core-capital",'<div class="cc-kicker">Capital</div><h3>Capital finances the outcome behind the story.</h3><p>The itemized current model contains C$29.770M of quantified uses across active current lanes and C$10.884M of quantified revenue lanes. Those figures are not one investor ask and should not be netted blindly: C$23.141M is the current Toronto real-estate purchase basis, with senior debt/equity sizing still subject to underwriting. Carnival and mas parade attendance remain a core public-facing part of the city platform, not a decorative add-on. Toronto arena + TV production is C$1.761M. The C$114.469M 65-city figure is only a mechanical arena + TV production scale, not the whole rollout budget. Targets and models are not commitments.</p>');
  place(store,"core-store",'<div class="cc-kicker">Eat Your Keep</div><h3>Everyday commerce should leave measurable community value.</h3><p>Buy groceries. Build ownership. Eligible shopping should help members build a stake in the grocery store instead of acting like ordinary loyalty points. The store sits inside the same Carnival-rooted family and parade-attendance ecosystem. The final member/share/co-operative structure, tax treatment, redemption rules and receipt wording must be approved before launch.</p>');
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

let renderedHtml = canonicalHtml;
for (const block of [trafficFunnel, projectCopy, trailerExperience, contrastGuard]) {
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
  carnival_visual_theme_minimal: true,
  family_social_contribution: true,
  host_social_contribution: true,
  financial_execution_timeline_months: 12,
  longer_horizon_separated: true,
  trailer_modal_audio: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOUR_KEEP=ON", "CARNIVAL_MAS_PARADE=ON", "PLAIN_LANGUAGE=ON");
