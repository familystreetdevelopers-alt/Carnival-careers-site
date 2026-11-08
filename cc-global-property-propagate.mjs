/**
 * CC Universe global-property pilot propagation
 * Source of truth: docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json
 * This changes project/capital/property modules only; Home wording, media, signed contracts untouched.
 */
import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),dist=path.join(root,"dist"),model=JSON.parse(fs.readFileSync(path.join(root,"docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json"),"utf8"));
if(model.version!=="CC-GLOBAL-OPT-2026-11-08"||model.working.allIn!==10231872||model.sammonConditional.indicativeAllIn!==9022984)throw Error("CC global model not reconciled");
if(!fs.existsSync(path.join(dist,"index.html")))throw Error("Site not built");
const htmlPath=path.join(dist,"index.html");
let html=fs.readFileSync(htmlPath,"utf8");
if(!html.includes('id="page-project"')||!html.includes('The mas brings us together.'))throw Error("Canonical site/Home guard failed");
const section='<section id="cc-global-optimized-20261108" aria-label="Global property current plan" style="padding:22px;max-width:1080px;margin:26px auto;border:1px solid #977f69;border-radius:15px;background:#1a1519;color:#f8f1e9;line-height:1.55"><small style="color:#edbc78;font-weight:800;letter-spacing:.13em">CURRENT GLOBAL PROPERTY PILOT · 8 NOV 2026</small><h2 style="color:#fff;margin:8px 0 12px;font-size:clamp(23px,3vw,38px)">Own the right homes. Film every city.</h2><p style="color:#f8f1e9">Working property model: <strong>C$10,231,872 / 38 modeled homes.</strong> Conditional Sammon-for-Pape replacement: <strong>C$9,022,984 / 40 homes</strong> only if lawful family occupancy, a 4-bedroom solution, financing and actual NOI are verified. <strong>Sammon NOI is unknown.</strong></p><p style="color:#f8f1e9">Tokyo and London property purchases deferred, but production continues by local partnerships. Ghana two-unit expansion held. Keep six Toronto tenant-owner households and target C$800/month affordability, subject to funded underwriting. No double-count of owner-occupied rent.</p><p style="color:#decfc9">This is a distinct global real-estate pilot—not the separate 109 Pembroke/Tournament/Euclid/VicTowns Toronto CC-CAPITAL65 development program or the full 65-city concert/media budget. Do not add overlapping York/Downes condos twice.</p><a style="color:#ffcc8c;font-weight:850" href="/global-property-stack.html">View full property register, sensitivities and diligence requirements</a></section>';
const runtime=`<script id="cc-global-optimized-pilot-sync">(()=>{const section=${JSON.stringify(section)};const render=()=>{for(const id of ["page-project","page-capital"]){const el=document.getElementById(id);if(!el||el.querySelector(id==="page-capital"?"#cc-global-optimized-20261108-capital":"#cc-global-optimized-20261108"))continue;const use=id==="page-capital"?section.replace('id="cc-global-optimized-20261108"','id="cc-global-optimized-20261108-capital"'):section;el.insertAdjacentHTML("afterbegin",use)}};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render);else render();window.addEventListener("hashchange",render)})()</script>`;
if(!html.includes('id="cc-global-optimized-pilot-sync"'))html=html.replace("</body>",runtime+"</body>");
fs.writeFileSync(htmlPath,html,"utf8");
const active=["houses.html","iron-man-house.html","the-story.html","production-universe.html","capital-execution.html","pembroke-acquisition.html","finance-instruments.html","team-desk.html"];
const box='<aside id="cc-global-property-update-v20261108" style="margin:20px auto;padding:16px 20px;max-width:1120px;color:#f7ece5;background:#251921;border-left:4px solid #e2b478;line-height:1.55;border-radius:10px"><strong>CC Universe global property update · Nov 8, 2026:</strong> C$10.232M / 38 modeled homes; C$9.023M / 40 homes only if the tenanted Sammon alternative passes legal occupancy and finance diligence (Sammon NOI unknown). Tokyo/London film with partners; Ghana addition paused. <a href="/global-property-stack.html" style="color:#f7cc89">See the full model</a>. Separate from Toronto CC-CAPITAL65 and the 65-city concert/media budget.</aside>';
let patched=0;
for(const name of active){const p=path.join(dist,name);if(!fs.existsSync(p))continue;let c=fs.readFileSync(p,"utf8");if(c.includes('id="cc-global-property-update-v20261108"')||c.includes('id="cc-global-lane-note"')||c.includes('id="global-pilot-2026"'))continue;const at=/<main(?:\s[^>]*)?>/i.exec(c);if(!at)continue;const k=at.index+at[0].length;c=c.slice(0,k)+box+c.slice(k);fs.writeFileSync(p,c,"utf8");patched++}
const glob="global-property-stack.html";fs.copyFileSync(path.join(root,glob),path.join(dist,glob));
// All published CC HTML assets receive a machine-readable model version marker, including
// pages whose content is unrelated to real estate. Do not alter their copy or sales flows.
let marked=0;
for(const entry of fs.readdirSync(dist,{withFileTypes:true})){
 if(!entry.isFile()||!entry.name.endsWith(".html"))continue;
 const p=path.join(dist,entry.name),h=fs.readFileSync(p,"utf8");
 if(h.includes('name="cc-global-property-version"'))continue;
 if(!h.includes("</head>"))continue;
 fs.writeFileSync(p,h.replace("</head>",'<meta name="cc-global-property-version" content="CC-GLOBAL-OPT-2026-11-08"><link rel="alternate" type="application/json" href="/cc-global-property-current.json" title="CC global property model"></head>'),"utf8");
 marked++;
}
fs.mkdirSync(path.join(dist,"docs","property"),{recursive:true});
for(const name of ["CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json","CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.md","CC_GLOBAL_ASSET_SUPERSESSION_REGISTER_2026-11-08.md"])fs.copyFileSync(path.join(root,"docs","property",name),path.join(dist,"docs","property",name));
fs.writeFileSync(path.join(dist,"cc-global-property-current.json"),JSON.stringify(model,null,2));
console.log(JSON.stringify({event:"CC_GLOBAL_OPTIMIZED_PROPAGATED",version:model.version,sidePagesPatched:patched,allInCAD:model.working.allIn,conditionalSammonCAD:model.sammonConditional.indicativeAllIn}));
