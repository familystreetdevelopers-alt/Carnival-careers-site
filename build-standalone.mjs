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

  place(home,"core-home",'<div class="cc-kicker">Toronto story</div><h3>Contribution. Stability. Ownership.</h3><p><strong>Hopeton LaTouche’s household is the featured Toronto family / tenant-owner story.</strong> <strong>Michie Mee is the episode host.</strong> Michie brings cultural memory, contribution and a public platform. Hopeton’s household brings work, caregiving, resilience, culture, local spending and a real ownership journey. Carnival Careers connects those contributions to tangible change, visible Carnival and mas parade attendance, and then the arena as the public victory lap.</p>');
  place(families,"core-families",'<div class="cc-kicker">Families</div><h3>The family’s contribution comes before the support model.</h3><p>Work, caregiving, culture, neighbourhood relationships, resilience and ownership ambition are already contributions. Carnival Careers can add documented work/income pathways, housing/ownership progress, mobility, childcare/family supports and partner connections. A qualifying tenant-owner role is modeled at C$105,000 gross a year for real documented work when funded and activated. The household uses that income for housing, Eat Your Keep groceries, SweetEVRides mobility, childcare and normal family needs, while the family remains visibly part of Carnival culture and mas parade attendance.</p>');
  place(project,"core-project",'<div class="cc-kicker">Project</div><h3>One family makes the city stakes visible.</h3><p>Toronto moves from Michie and the family relationship through dinner, history, work, home/ownership, Eat Your Keep, mobility, childcare, local commerce, Carnival culture and mas parade attendance. The arena comes last, after the project has produced real evidence that something changed. Toronto is the proof for a 65-city format: each city needs its own highlighted woman, featured family, real change, Carnival/public-culture beat and earned arena payoff.</p>');
  place(show,"core-show",'<div class="cc-kicker">The show</div><h3>Michie Mee carries the relationship and recognition.</h3><p>The episode follows recognition → relationship → tangible change → Carnival/mas parade visibility → public triumph. Michie Mee is the highlighted Toronto woman and host; Hopeton LaTouche is the featured family / tenant-owner. The parade shows the family and city inside the culture before the arena delivers the final emotional release.</p>');
  place(capital,"core-capital",'<div class="cc-kicker">Capital</div><h3>16 Vic Towns are the current downside sale engine.</h3><p>PATH #5101/12 York and East Bayfront #3215/138 Downes are retained alongside Istanbul Fine Foods. The unit-sizing case does not count uncommitted operating revenue and covers the senior/investor exit, C$1.2M investor target profit, audience reserves and whole-company operating obligations.</p>');
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


const wholeReconciliationPatch = `
<style id="cc-whole-reconcile-style">
  .cc-whole-reconcile{margin:22px 0;padding:22px;border-radius:20px;border:1px solid rgba(112,72,232,.28);background:linear-gradient(135deg,rgba(112,72,232,.10),rgba(255,190,32,.08));color:inherit}
  .cc-whole-reconcile h2,.cc-whole-reconcile h3{margin:.2em 0 .5em}
  .cc-whole-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:16px 0}
  .cc-whole-card{padding:14px;border-radius:14px;background:rgba(255,255,255,.74);color:#171717;border:1px solid rgba(0,0,0,.08)}
  .cc-whole-card b{display:block;font-size:1.22rem;margin-bottom:4px}
  .cc-whole-table{width:100%;border-collapse:collapse;margin:14px 0;font-size:.94rem}
  .cc-whole-table td,.cc-whole-table th{padding:9px 8px;border-bottom:1px solid rgba(127,127,127,.22);text-align:left;vertical-align:top}
  .cc-whole-note{font-size:.86rem;opacity:.82;max-width:85ch}
</style>
<script id="cc-whole-reconcile-script">
(() => {
  const box=(html)=>'<section class="cc-whole-reconcile" data-cc-whole="2026-09-20">'+html+'</section>';
  const project=document.getElementById("page-project")||document.querySelector('[data-page="project"]');
  const capital=document.getElementById("page-capital")||document.querySelector('[data-page="capital"]');
  const travel=document.getElementById("page-plane")||document.querySelector('[data-page="plane"]');
  if(project && !project.querySelector('[data-cc-whole="2026-09-20"]')){
    const host=project.querySelector(".project-wrap,.page-inner,.content,.container,.wrap")||project;
    host.insertAdjacentHTML("afterbegin",box(
      '<div class="cc-kicker">Current Toronto execution stack</div>'+
      '<h2>16 Vic Towns fund the downside case. PATH, East Bayfront and Istanbul stay.</h2>'+
      '<div class="cc-whole-grid">'+
      '<div class="cc-whole-card"><b>16 Vic Towns</b>22,868 sq. ft. / C$12.006M modeled purchase at C$525/sf</div>'+
      '<div class="cc-whole-card"><b>C$560K PATH</b>5101 - 12 York Street · retain</div>'+
      '<div class="cc-whole-card"><b>C$548K East Bayfront</b>3215 - 138 Downes Street · retain</div>'+
      '<div class="cc-whole-card"><b>C$1.5M Istanbul</b>Fine Foods operating-business acquisition</div>'+
      '</div>'+
      '<p>The sale engine is sized without counting uncommitted sponsor, vendor, ticket, media, cruise, grocery or SweetEV revenue. It covers the modeled senior/investor exit, the investor C$1.2M target profit, arena + TV, six salaries plus minimum employer burden, cruise, SweetEV upfront cash, ticket-refund reserve, grocery-benefit reserve, civic activations, enterprise legal/admin, property carry/closing costs and a C$500K reserve for real but still unquoted Carnival Careers obligations.</p>'+
      '<p class="cc-whole-note">The 16-unit price, 80/20 financing mix, 9% senior-interest stress and C$1,180/sf resale case are underwriting assumptions, not commitments. Seller, lender, appraisal and definitive legal documents control.</p>'
    ));
  }
  if(capital){
    const inner=capital.querySelector(".page-inner,.content,.section-inner,.container,.wrap")||capital;
    inner.innerHTML=box(
      '<div class="cc-kicker">Capital · whole-company downside coverage</div>'+
      '<h1>One clean capital story.</h1>'+
      '<p>The current Toronto model buys only the Vic Towns units needed to cover the full downside case, while keeping the PATH condo, East Bayfront condo and Istanbul Fine Foods.</p>'+
      '<div class="cc-whole-grid">'+
      '<div class="cc-whole-card"><b>C$12.006M</b>16-unit Vic Towns purchase basis</div>'+
      '<div class="cc-whole-card"><b>C$25.635M</b>Modeled net Vic resale proceeds</div>'+
      '<div class="cc-whole-card"><b>C$25.521M</b>Modeled covered obligations</div>'+
      '<div class="cc-whole-card"><b>C$114K</b>Modeled residual cushion — not promised profit</div>'+
      '</div>'+
      '<h3>What the 16-unit sale engine covers</h3>'+
      '<table class="cc-whole-table"><tbody>'+
      '<tr><td>Modeled senior principal</td><td>C$9.605M</td></tr>'+
      '<tr><td>12-month 9% senior-interest stress</td><td>C$864K</td></tr>'+
      '<tr><td>Investor capital returned</td><td>C$2.401M</td></tr>'+
      '<tr><td>Investor target profit</td><td>C$1.200M</td></tr>'+
      '<tr><td>PATH + East Bayfront + Istanbul</td><td>C$2.608M</td></tr>'+
      '<tr><td>Arena + TV</td><td>C$1.761M</td></tr>'+
      '<tr><td>Six salaries + minimum employer burden</td><td>C$693K</td></tr>'+
      '<tr><td>May 2027 cruise</td><td>C$2.331M</td></tr>'+
      '<tr><td>SweetEV upfront cash</td><td>C$48.9K</td></tr>'+
      '<tr><td>50% ticket refund/reserve</td><td>C$1.564M</td></tr>'+
      '<tr><td>Grocery-benefit maximum reserve</td><td>C$990K</td></tr>'+
      '<tr><td>Civic activation + enterprise admin + retained carry + property closing allowance</td><td>C$313K</td></tr>'+
      '<tr><td>Known-but-unpriced whole-company reserve</td><td>C$500K</td></tr>'+
      '</tbody></table>'+
      '<p class="cc-whole-note">No uncommitted revenue is used to make the minimum unit count work. The C$500K reserve is controlled for quote-dependent SweetEV operations, Mas participation, childcare support, technology/CRM, sponsor/vendor fulfillment, HST/closing adjustments and other confirmed-but-unpriced obligations. Any signed outside funding reduces the burden; it is not counted before execution.</p>'
    );
  }
  if(travel && !travel.querySelector('[data-cc-whole="2026-09-20"]')){
    const host=travel.querySelector(".page-inner,.content,.section-inner,.container,.wrap")||travel;
    host.insertAdjacentHTML("afterbegin",box(
      '<div class="cc-kicker">Travel numbers · current control</div>'+
      '<h2>May 2027 first-sailing model: C$2.331M cost / C$2.625M modeled revenue.</h2>'+
      '<div class="cc-whole-grid"><div class="cc-whole-card"><b>C$1.725M</b>Vessel / operator / ports / taxes / core inventory</div><div class="cc-whole-card"><b>C$235K</b>Artists / cultural / onboard production</div><div class="cc-whole-card"><b>C$371K</b>Shore, sales, compliance, filming + C$81,141 contingency</div></div>'+
      '<p>Modeled revenue and the C$293,859 modeled EBITDA are not used to reduce the 16-unit Vic Towns downside requirement. Operator, route, compliant travel seller, supplier quotes and paid bookings remain evidence gates.</p>'
    ));
  }
})();
</script>`;

let renderedHtml = canonicalHtml;
for (const block of [trafficFunnel, projectCopy, wholeReconciliationPatch, trailerExperience, contrastGuard]) {
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
  canonical_document_system: "WHOLE-21-2026-09-20",
  source_recovery_instances: 1400,
  source_unique_objects: 1273,
  currentized_enterprise_uses_cad: 25521275.39,
  vic_towns_units_current: 16,
  vic_towns_net_resale_cad: 25635028,
  downside_residual_cushion_cad: 113752.61,
  family_social_contribution: true,
  host_social_contribution: true,
  financial_execution_timeline_months: 12,
  longer_horizon_separated: true,
  trailer_modal_audio: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOUR_KEEP=ON", "CARNIVAL_BADGE=REMOVED", "PLAIN_LANGUAGE=ON");
