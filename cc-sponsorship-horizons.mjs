import fs from 'node:fs';
import path from 'node:path';
// Apply sponsor horizon policy on Sponsors/Project only. Never rewrite Home or send messages.
const root=process.cwd(), dist=path.join(root,'dist');
const modelPath=path.join(root,'docs/sponsorship/CC_SPONSOR_HORIZONS_2026-11-08.json');
if(!fs.existsSync(modelPath)||!fs.existsSync(path.join(dist,'index.html')))throw Error('Sponsor model/site build missing');
const data=JSON.parse(fs.readFileSync(modelPath,'utf8'));
if(data.version!=='CC-SPONSOR-HORIZONS-2026-11-08'||data.tiers.length!==3)throw Error('Sponsor model version mismatch');
const money=n=>'C$'+Number(n).toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2});
const rows=data.tiers.map(x=>'<tr><td>'+x.key+'</td><td>'+x.lead_days+' days</td><td>'+money(x.target_cad)+'</td><td>'+x.sponsor_three_way_cad.map(money).join(' + ')+'</td></tr>').join('');
const table='<table style="width:100%;border-collapse:collapse"><thead><tr><th>Package</th><th>Lead time</th><th>Sponsor target</th><th>Three portions</th></tr></thead><tbody>'+rows+'</tbody></table>';
const policy='<p>Corporate sponsorship typically needs 3-5 months. Short-term shows have smaller, faster cash targets; long-lead arena campaigns have larger, contracted deliverables. No money, stage rights or future performances are confirmed.</p>';
const world=data.world_tour_18month_program;
const globalProgram='<h2>18-month arena / global platform campaign</h2><p><strong>C$250k circuit / C$1M global title / C$3M aggregate corporate sponsorship ambition</strong> from November 2026 to May 2028. Goal: pursue 18 opening-act opportunities, no dates or stage rights confirmed. Working global property acquisition reserve illustration: 10% of C$10,231,872 = C$1,023,187 excluding closing costs. Request six Rivian R1S family vehicles in-kind or approved equivalent; HGTV remains an uncommissioned pitch; Hedonya distribution only through lawful licensed wholesalers. Core PDF designs are locked originals recovered using docs/sponsorship/CC_ORIGINAL_PDF_MASTERS_CANONICAL_REGISTRY.json.</p>';
const milestone='<h2>Promoter three-release option</h2><p>Only if a named promoter signs a show-specific addendum: (1) verified gate admission and credentials, (2) authorized stage-manager/audio lineup and actual set access, and (3) completed approved performance and microphone hand-back. Sponsor receipts and promoter fees are independent financial contracts. Negotiate a lower stage fee where possible.</p>';
const css='<style>body{margin:0;background:#17141b;color:#fff;font:16px/1.6 Arial,Helvetica,sans-serif}main{max-width:1050px;padding:48px 22px;margin:auto}h1,h2,a{color:#f9c77e}td,th{padding:12px;border:1px solid #68555c;text-align:left}@media(max-width:620px){table{display:block;overflow-x:auto}}</style>';
const page='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Carnival Careers | Sponsor timing and offers</title>'+css+'</head><body><main><a href="/">Carnival Careers</a><h1>Right-sized arena sponsorships</h1>'+policy+table+globalProgram+milestone+'<p>Historic 2026 signed documents do not create rights for 2027. All sponsorship assets are conditional on legal permissions and signed terms.</p></main></body></html>';
fs.writeFileSync(path.join(dist,'sponsorship-horizons.html'),page);
fs.writeFileSync(path.join(dist,'cc-sponsor-horizons.json'),JSON.stringify(data,null,2)+'\n');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
if(!html.includes('The mas brings us together.'))throw Error('Canonical Home copy guard failed');
const markup='<section id="cc-sponsor-horizons" style="padding:24px;border:1px solid #d5ab71;margin:22px auto;max-width:1080px;border-radius:14px;background:#21161c;color:#fff"><h2>Three sponsorship horizons</h2>'+policy+table+globalProgram+'<p><a href="/sponsorship-horizons.html" style="color:#ffc977">See three-release promoter safeguards and sponsor rights</a></p></section>';
const patch='<script id="cc-sponsor-horizon-policy">(function(){function draw(){var node=document.getElementById("page-sponsors")||document.getElementById("page-project");if(node&&!document.getElementById("cc-sponsor-horizons")){var t=document.createElement("div");t.innerHTML='+JSON.stringify(markup)+';node.appendChild(t.firstChild);}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",draw,{once:true});else draw();})();</script>';
if(!html.includes('id="cc-sponsor-horizon-policy"')){if(!html.includes('</body>'))throw Error('No body close');html=html.replace('</body>',patch+'</body>');fs.writeFileSync(path.join(dist,'index.html'),html);}
console.log('Sponsor horizon model published. No Home copy modified.');