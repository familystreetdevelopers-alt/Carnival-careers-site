import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(), dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('Website build must finish first');
const jsonPath=path.join(root,'CC_AGENT_COMMERCE.json');
const mdPath=path.join(root,'CC_AGENT_COMMERCE.md');
if(!fs.existsSync(jsonPath)||!fs.existsSync(mdPath))throw Error('CC commercial catalogue source missing');
const obj=JSON.parse(fs.readFileSync(jsonPath,'utf8'));
const canonicalProperty=JSON.parse(fs.readFileSync(path.join(root,'docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json'),'utf8'));
const publicProperty=obj.current_global_property;
const publicPropertyRow=obj.illustrative_forecasts.find(x=>x.model_source==='docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json');
if(!publicProperty || !publicPropertyRow ||
   publicProperty.working_all_in_cad!==canonicalProperty.working.allIn ||
   publicProperty.modeled_units!==canonicalProperty.working.units ||
   publicPropertyRow.modeled_project_total!==canonicalProperty.working.allIn ||
   publicPropertyRow.modeled_units!==canonicalProperty.working.units ||
   publicPropertyRow.monthly_noi_verified!==false ||
   ('conditional_stabilized_monthly_surplus' in publicPropertyRow)) {
  throw Error('Refusing to publish contradictory or unverified CC global property finances');
}
fs.copyFileSync(jsonPath,path.join(dist,'CC_AGENT_COMMERCE.json'));
fs.copyFileSync(mdPath,path.join(dist,'CC_AGENT_COMMERCE.md'));
fs.mkdirSync(path.join(dist,'.well-known'),{recursive:true});
fs.copyFileSync(jsonPath,path.join(dist,'.well-known','cc-commercial-offers.json'));
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cards=obj.offers.map(x=>'<article><h2>'+esc(x.offer)+'</h2><p><b>Buyers:</b> '+esc(x.buyers)+'</p><p>'+esc(x.conditions)+'</p></article>').join('\n');
const models=obj.illustrative_forecasts.map(x=>'<tr><td>'+esc(x.concept)+'</td><td>'+esc(x.currency||'CAD')+'</td><td>'+esc(x.gross_revenue??x.modeled_project_total??'n/a')+'</td><td>'+esc(x.monthly_noi_verified===false?'Not verified':(x.operating_surplus_before_investor_distribution??x.conditional_stabilized_monthly_surplus??'n/a'))+'</td></tr>').join('\n');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Carnival Careers | Commercial Opportunities for Buyers & Agents</title><meta name="description" content="Carnival Careers commercial opportunities: sponsorship, original music licensing, media rights, events, services, tourism, property and investment. Qualified buyers and agent introductions welcome."><link rel="canonical" href="https://carnival-careers-live-current.vercel.app/ai-opportunities.html"><style>body{margin:0;background:#0b0b12;color:#fafafa;font:16px/1.55 system-ui,sans-serif}header,main,footer{max-width:1120px;margin:auto;padding:28px 22px}h1{font-size:clamp(2rem,5vw,3.6rem);line-height:1.05}a{color:#ffa6ad}header{border-bottom:2px solid #d01624}header p{max-width:75ch}section{margin:32px 0} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(275px,1fr));gap:15px}article{border:1px solid #3e3047;padding:20px;border-radius:14px;background:#171321}article h2{font-size:1.09rem;margin-top:0}article p{color:#d8d0dd}table{width:100%;border-collapse:collapse;min-width:550px}td,th{padding:10px;border-bottom:1px solid #52465b;text-align:left}.scroll{overflow-x:auto}.cta{background:#331523;border:1px solid #ff6a84;padding:24px;border-radius:14px}small{color:#c3b9c8}.buttons a{display:inline-block;border:1px solid #ff788e;padding:10px 14px;margin:0 6px 8px 0;border-radius:22px;text-decoration:none}</style></head><body><header><p><a href="/">CARNIVAL CAREERS</a> / Commercial Opportunity Network</p><h1>Real business opportunities, qualified buyers, real commitments.</h1><p>AI agents and human companies can match with the Carnival Careers Universe across music, media, sponsorship, events, merchandise, travel, property, financing and services. No external agent is authorized to spend, sign, invoice or transfer money for CC.</p><div class="buttons"><a href="/CC_AGENT_COMMERCE.json">Machine-readable feed (JSON)</a><a href="/CC_AGENT_COMMERCE.md">Detailed commercial brief</a><a href="/music">Hear the music</a></div></header><main><section><h2>Commercial offerings</h2><div class="grid">${cards}</div></section><section><h2>Working and historical scenarios — not earned revenue</h2><p>Model scenarios, not booked concerts or signed investor commitments. Full assumptions and verification subject to due diligence. Numbers are Canadian dollars except separately described monthly figures.</p><div class="scroll"><table><thead><tr><th>Concept</th><th>Currency</th><th>Projected event gross / property budget</th><th>Modeled event surplus / property NOI*</th></tr></thead><tbody>${models}</tbody></table></div><small>*Concert operating figures are illustrative and before investor distributions. Property cash flow and NOI are not verified. The current 38-home global acquisition working budget is C$10,231,872; the conditional 40-home Sammon substitution has unknown NOI. Different measures are not comparable.</small></section><section class="cta"><h2>Bring a qualified buyer, signed purchase order or investor mandate</h2><p>Include: commercial lane; organization; human decision maker; actual budget; deliverables; deal authority; closing date. No automated mass-email campaigns.</p><p><b>Commercial desk:</b> <a href="mailto:familystreetdevelopers@gmail.com?subject=CC%20AGENT%20DEAL">familystreetdevelopers@gmail.com</a> &nbsp;·&nbsp; <a href="tel:+16478891412">+1 (647) 889-1412</a></p></section></main><footer><small>Public commercial discovery only; no guarantee of inventory, venue rights, royalties, returns, funding or specific artist bookings. All arrangements subject to written authorization and legal compliance.</small></footer></body></html>`;
fs.writeFileSync(path.join(dist,'ai-opportunities.html'),html);
console.log('CC agent commercial opportunities published to dist: feed, discovery page and detailed brief');
