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


const storyUnification = \`
<style id="cc-story-spine-style">
  .cc-story-spine{margin:22px 0;padding:22px;border-radius:20px;border:1px solid rgba(255,196,77,.28);background:linear-gradient(135deg,rgba(255,196,77,.12),rgba(49,223,204,.07));color:inherit}
  .cc-story-spine h3{margin:0 0 9px;font-size:clamp(1.25rem,2vw,1.7rem);line-height:1.08}
  .cc-story-spine p{margin:8px 0;max-width:78ch;line-height:1.62}
  .cc-story-spine .cc-story-kicker{font-size:.76rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:7px}
  .cc-story-spine .cc-story-arc{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:15px}
  .cc-story-spine .cc-story-arc span{display:block;padding:11px;border-radius:12px;background:rgba(255,255,255,.06);font-size:.8rem;font-weight:800}
  .cc-story-spine .cc-timeline{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:15px}
  .cc-story-spine .cc-timeline div{padding:12px;border-radius:12px;background:rgba(255,255,255,.06)}
  .cc-story-spine .cc-timeline b{display:block;color:var(--aqua);font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
  .light .cc-story-spine{background:linear-gradient(135deg,#fff7df,#fff 55%,#eefcf9);border-color:rgba(179,122,0,.22);color:var(--ink)}
  .light .cc-story-spine .cc-story-arc span,.light .cc-story-spine .cc-timeline div{background:rgba(15,25,40,.055)}
  @media(max-width:800px){.cc-story-spine .cc-story-arc,.cc-story-spine .cc-timeline{grid-template-columns:1fr 1fr}}
  @media(max-width:520px){.cc-story-spine .cc-story-arc,.cc-story-spine .cc-timeline{grid-template-columns:1fr}}
</style>
<script id="cc-story-spine-script">
(() => {
  const findPage=(...ids)=>ids.map(id=>document.getElementById(id)).find(Boolean)||null;
  const put=(root,key,html)=>{
    if(!root)return;
    const inner=root.querySelector(".page-inner,.content,.section-inner,.container,.wrap,main")||root;
    let box=inner.querySelector('[data-cc-story="'+key+'"]');
    if(!box){box=document.createElement("div");box.className="cc-story-spine";box.setAttribute("data-cc-story",key);inner.appendChild(box);}
    box.innerHTML=html;
  };
  const home=findPage("page-home")||document.querySelector('[data-page="home"]');
  const families=findPage("page-families","page-childcare")||document.querySelector('[data-page="families"],[data-page="childcare"]');
  const project=findPage("page-project")||document.querySelector('[data-page="project"]');
  const show=findPage("page-show")||document.querySelector('[data-page="show"]');
  const capital=findPage("page-capital")||document.querySelector('[data-page="capital"]');
  const partners=findPage("page-partners","page-sponsors")||document.querySelector('[data-page="partners"],[data-page="sponsors"]');

  const hero=document.querySelector("#page-project .project-hero");
  if(hero){
    const h=hero.querySelector("h1");
    const p=hero.querySelector("p");
    if(h)h.textContent="A woman brings her contribution. A family brings theirs. The city helps turn both into something that lasts.";
    if(p)p.textContent="Every city begins with people whose contribution deserves to be seen more clearly. The episode host brings cultural memory, mentorship, relationships and a public platform. The chosen family brings work, caregiving, resilience, culture, local spending and a real ownership journey. Dinner opens the relationship; the home, work, businesses and community make the stakes visible; the arena concert comes last as the victory lap after something real has been built.";
  }

  put(home,"home-social",'<div class="cc-story-kicker">Why the people matter</div><h3>The family and the host are contributors — not props.</h3><p><strong>The featured family contributes to society</strong> through work, caregiving, culture, local spending, relationships, resilience and the decision to let a real housing and ownership journey be seen. <strong>The episode host contributes</strong> history, cultural memory, mentorship, credibility, relationships and a public platform that helps the city recognize people and contributions that are often under-told.</p><p>Toronto follows Hopeton LaTouche\\'s household as the featured family / tenant-owner story, with Michie Mee as episode host.</p>');

  put(families,"family-social",'<div class="cc-story-kicker">Family contribution</div><h3>The transformation starts by recognizing what the family already gives.</h3><p>The family is not presented as a passive beneficiary. Their labour, caregiving, neighbourhood relationships, culture, purchases, ambitions and lived experience already help hold a city together. Carnival Careers adds documented work and income pathways, housing/ownership progress, mobility and family supports so that contribution can become more stable, visible and investable.</p>');

  put(project,"project-arc",'<div class="cc-story-kicker">One story across every city</div><h3>Relationship first. Arena finale last.</h3><p>The same narrative spine governs the project, television, partnerships and capital story.</p><div class="cc-story-arc"><span>1 · Host / woman + her contribution</span><span>2 · Chosen family + dinner</span><span>3 · Home, work, ownership + local commerce</span><span>4 · Community, transit + Carnival culture</span><span>5 · Family/home reveal</span><span>6 · Arena finale</span><span>7 · Settlement + partner proof</span><span>8 · Next city only after evidence</span></div>');

  put(show,"show-social",'<div class="cc-story-kicker">What the episode leaves behind</div><h3>The host carries the story. The family proves the stakes.</h3><p>The host does more than present: she uses her own history and public platform to connect the family to the city, surface overlooked contributions, ask the questions the audience needs answered and carry the relationship from dinner to the arena stage. The family does more than receive: they work, choose, participate, spend locally, share their reality and help demonstrate whether the model can produce lasting housing, income, ownership, commerce and community value.</p><p>The concert is the celebration at the end — not the beginning of the story.</p>');

  put(capital,"capital-12m",'<div class="cc-story-kicker">12-month capital execution</div><h3>Capital follows the same story arc.</h3><p>The 12-month investment story is execution, proof and settlement — while genuinely long-term obligations stay outside the artificial one-year box.</p><div class="cc-timeline"><div><b>Months 1–2</b>Legal structure, diligence, family/host story, venue/talent/partner pathways, source-backed data room.</div><div><b>Months 3–4</b>Capital and sponsor conversion, property/family diligence, workforce and production scoping.</div><div><b>Months 5–6</b>Evidence-backed contracting of venue/talent/production/vendors/workforce as gates are cleared.</div><div><b>Months 7–9</b>Property/workforce execution, commerce, community activation, ticketing/marketing and filming preparation.</div><div><b>Months 10–11</b>Family transformation, city/transit/Carnival activation, production advance, episode filming and arena finale.</div><div><b>Month 12</b>Settlement, investor reporting, sponsor proof, episode deliverables and replication decision.</div><div><b>Beyond Month 12</b>Mortgage amortization, refinance, tenant-owner conversion and long-term property holding.</div><div><b>Longer horizon</b>Residual media rights, long-tail cash flow and the wider 65-city rollout continue on their real timelines.</div></div><p><strong>Nothing is forced into Month 12 if its legal or economic life is longer.</strong> Investor recovery and participation depend on definitive agreements and actual collected cash, not projections.</p>');

  put(partners,"partner-social",'<div class="cc-story-kicker">What partners are helping make visible</div><h3>Support the people, not just the logo inventory.</h3><p>Partner value is tied to visible outcomes: recognition of the host\\'s cultural and social contribution, stability and ownership progress for the family, paid work, local businesses, useful services, community participation and measurable proof after the event. The arena provides scale; the social contribution is what gives that scale meaning.</p>');

  const episode=document.getElementById("episode-experience");
  if(episode){
    const head=episode.querySelector(".head");
    if(head && !head.querySelector('[data-cc-story="episode-contribution"]')){
      const box=document.createElement("div");
      box.className="cc-story-spine";
      box.setAttribute("data-cc-story","episode-contribution");
      box.innerHTML='<div class="cc-story-kicker">Contribution to society</div><h3>Two contributions move the episode.</h3><p><strong>The host brings public service through recognition:</strong> cultural memory, mentorship, context, relationships and a platform that can turn overlooked work into a visible city story. <strong>The family brings lived contribution:</strong> work, caregiving, culture, resilience, spending, relationships and the courage to make a real transition visible. The episode is strongest when viewers see what both already give before they see what the project adds.</p>';
      head.appendChild(box);
    }
  }
})();
</script>\`;

const trailerExperience = \`
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
</script>\`;

let renderedHtml = canonicalHtml;
for (const block of [trafficFunnel, projectCopy, storyUnification, trailerExperience, contrastGuard]) {
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
  plain_language_refactor: true,
  unified_story_spine: true,
  family_social_contribution: true,
  host_social_contribution: true,
  financial_execution_timeline_months: 12,
  longer_horizon_separated: true,
  trailer_modal_audio: true
}, null, 2));

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(renderedHtml), "EAT_YOU_KEEP=ON", "PLAIN_LANGUAGE=ON");
