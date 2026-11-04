import fs from "node:fs";
import path from "node:path";

const dist=path.resolve("dist");
const source=JSON.parse(fs.readFileSync("CC_AGENT_COMMERCE.json","utf8"));
const file=path.join(dist,"ai-opportunities.html");
if(!fs.existsSync(file))throw Error("AI opportunities page not built");
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const choices=source.offers.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.offer)+'</option>').join("\n");
const styles=[
'<style id="cc-cash-conversion-styles">',
'#cc-deal-intake{margin-top:38px;padding:25px;border:2px solid #ed485f;border-radius:17px;background:#1c1723}',
'#cc-deal-intake h2{margin:0 0 5px}',
'#cc-deal-intake .intro{color:#e4dbe8;max-width:750px}',
'#cc-deal-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}',
'#cc-deal-form .full{grid-column:1/-1}',
'#cc-deal-form label{display:flex;flex-direction:column;gap:7px;font-weight:650;font-size:.91rem}',
'#cc-deal-form input,#cc-deal-form select,#cc-deal-form textarea{width:100%;box-sizing:border-box;background:#0c0d13;color:#fff;border:1px solid #7b6177;border-radius:9px;padding:12px;font:inherit}',
'#cc-deal-form textarea{min-height:105px;resize:vertical}',
'#cc-deal-form button{cursor:pointer;border:0;background:#f53349;color:white;border-radius:9px;padding:16px;font:800 1rem system-ui;min-height:50px}',
'#cc-deal-form button:disabled{opacity:.6}',
'#cc-deal-form .consent{display:flex;flex-direction:row;align-items:flex-start;line-height:1.4;font-weight:400}',
'#cc-deal-form .consent input{width:19px;flex:0 0 19px}',
'#cc-buyer-result{margin-top:15px;min-height:1.3em;overflow-wrap:anywhere}',
'#cc-buyer-result[data-state="ok"]{padding:15px;background:#163427;border:1px solid #65d99b;border-radius:10px}',
'#cc-buyer-result[data-state="error"]{padding:15px;background:#3e1d28;border:1px solid #e45e7b;border-radius:10px}',
'.cc-trap{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
'@media(max-width:640px){#cc-deal-form{grid-template-columns:1fr}#cc-deal-intake{padding:18px}}',
'</style>'
].join("\n");
const form=[
'<section id="cc-deal-intake" aria-labelledby="cc-rfq-title">',
'<h2 id="cc-rfq-title">Request a commercial deal — directly into the CC operating system</h2>',
'<p class="intro">For corporate buyers, music supervisors, sponsors, production clients and capital partners with an actual mandate. This creates a tracked, private enquiry, not an invoice or a binding contract. No CC staff or bot will automatically email you.</p>',
'<form id="cc-deal-form" autocomplete="on">',
'<label class="full">What do you want to buy or finance?<select name="lane" required><option value="">Select a commercial opportunity</option>'+choices+'</select></label>',
'<label>Buyer organization<input name="organization" required minlength="2" maxlength="140" autocomplete="organization" placeholder="Legal business name"></label>',
'<label>Decision-maker<input name="decision_maker" required minlength="2" maxlength="120" autocomplete="name" placeholder="Your name and role"></label>',
'<label>Work email<input name="email" type="email" required maxlength="160" autocomplete="email" placeholder="name@company.com"></label>',
'<label>Contact phone (optional)<input name="phone" type="tel" maxlength="40" autocomplete="tel"></label>',
'<label>Proposed budget (CAD)<input name="budget_cad" type="number" min="1" max="1000000000" step="1" required placeholder="30000"></label>',
'<label>Decision deadline<input name="deadline" type="date" required></label>',
'<label class="full">What are you ready to purchase, license or finance?<textarea name="requirement" required minlength="25" maxlength="2500" placeholder="Describe exact deliverables, territory and timing, relevant rights, or the investment mandate."></textarea></label>',
'<label class="full">Proof of budget/mandate (optional, do not enter financial account details)<input name="evidence" type="url" maxlength="350" placeholder="https://company.com/procurement-brief"></label>',
'<label class="cc-trap" aria-hidden="true">Website URL<input name="website_url" tabindex="-1" autocomplete="off"></label>',
'<label class="full consent"><input type="checkbox" name="consent" required> I am authorized to discuss this commercial opportunity, and I agree to CC using these details to review this enquiry. All amounts are my own estimates and have not been verified by CC.</label>',
'<div class="full"><button id="cc-buyer-submit" type="submit">Submit a qualified buyer request</button></div>',
'</form><p id="cc-buyer-result" role="status" aria-live="polite"></p>',
'<p><small>Only CC can approve contracts and payments. No deposits, banking details, or nonpublic files are requested here. Qualified leads are reviewed by a human. AI agents may submit on behalf of an identified authorized buyer, not as fictitious counterparties.</small></p>',
'</section>'
].join("\n");
const script=[
'<script id="cc-qualified-buyer-capture">',
'(()=>{',
'const form=document.getElementById("cc-deal-form"), result=document.getElementById("cc-buyer-result"); if(!form||!result)return;',
'const btn=document.getElementById("cc-buyer-submit");',
'const day=new Date();day.setDate(day.getDate()-1);form.elements.deadline.min=day.toISOString().slice(0,10);',
'const lane=new URLSearchParams(location.search).get("lane");if(lane&&Array.from(form.elements.lane.options).some(o=>o.value===lane))form.elements.lane.value=lane;',
'const render=(s,state)=>{result.textContent=s;result.dataset.state=state||"";};',
'form.addEventListener("submit",async e=>{',
' e.preventDefault();if(!form.reportValidity())return;',
' const d=new FormData(form);if(String(d.get("website_url")||"").trim())return;',
' const budget=Number(d.get("budget_cad"));if(!Number.isFinite(budget)||budget<1){render("Enter an actual proposed CAD budget.","error");return;}',
' const payload={',
'  channel:"cc-agent-commerce",lane:String(d.get("lane")||""),buyer_organization:String(d.get("organization")||""),human_decision_maker:String(d.get("decision_maker")||""),',
'  business_email:String(d.get("email")||""),phone:String(d.get("phone")||""),proposed_budget_cad:budget,',
'  decision_deadline:String(d.get("deadline")||""),requested_deliverables:String(d.get("requirement")||""),',
'  mandate_evidence_url:String(d.get("evidence")||""),consent:true,declared_authority:true,verified_by_cc:false,',
'  referral_channel:new URLSearchParams(location.search).get("from")||"direct",requested_at:new Date().toISOString()',
' };',
' const record={kind:"agent-commerce",payload,sourceUrl:location.href};',
' btn.disabled=true;btn.textContent="Saving qualified request...";render("Connecting to the CC deal register...");',
' try {',
'  const r=await fetch("https://carnival-careers-os.floot.app/_api/public/intake",{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify(record)});',
'  const data=await r.json();if(!r.ok||!data.reference)throw Error(data.error||"Submission not accepted");',
'  try{localStorage.setItem("cc_business_bid_v1",JSON.stringify({reference:data.reference,lookupToken:data.lookupToken,lane:payload.lane,createdAt:data.createdAt}));}catch(_){ }',
'  render("Request saved. Your CC deal reference: "+data.reference+". Status: "+data.status+". CC will verify your stated budget and authority before discussing any contract or payment.","ok");',
'  form.reset();',
' }catch(err){render("Your request was NOT saved: "+(err&&err.message?err.message:"network problem")+". You can instead email familystreetdevelopers@gmail.com with your buyer mandate.","error");}',
' finally {btn.disabled=false;btn.textContent="Submit a qualified buyer request";}',
'});',
'})();',
'</script>'
].join("\n");
const original=fs.readFileSync(file,"utf8");
if(!original.includes("</main>"))throw Error("Expected buyer page closing main tag");
if(original.includes('id="cc-deal-intake"'))throw Error("Form already inserted");
const revised=original.replace("</head>",styles+"</head>").replace("</main>",form+"\n</main>").replace("</body>",script+"\n</body>");
fs.writeFileSync(file,revised,"utf8");
const root="https://carnival-careers-live-current.vercel.app";
const info=[
"# Carnival Careers — buyer opportunities for AI agents",
"",
"> Official public commercial deals for human buyers and their agents. No autonomous signing or transfers.",
"",
"- [Commercial buyer intake]("+root+"/ai-opportunities.html#cc-deal-intake)",
"- [Machine-readable sales catalogue]("+root+"/CC_AGENT_COMMERCE.json)",
"- [Detailed scope and financial scenarios]("+root+"/CC_AGENT_COMMERCE.md)",
"- [Original music]("+root+"/music)",
"- [Open verified buyer mandates board](https://github.com/familystreetdevelopers-alt/Carnival-careers-site/issues/7)",
"",
"## Machine-agent intake",
"POST https://carnival-careers-os.floot.app/_api/public/intake",
"Use Content-Type: text/plain;charset=UTF-8; JSON payload { kind: \"agent-commerce\", payload: { channel: \"cc-agent-commerce\", lane, buyer_organization, human_decision_maker, business_email, proposed_budget_cad, decision_deadline, requested_deliverables, consent: true, declared_authority: true, verified_by_cc: false }, sourceUrl }.",
"All budgets are self-reported. Public API accepts unverified leads only. No monetary transaction happens on submission.",
"",
"## Business exclusions",
"Do not invent buyer identity, send unsolicited marketing, issue invoices, sign contracts, disclose private files or instruct bank transfers.",
"",
"## Commercial reply",
"familystreetdevelopers@gmail.com | +1 (647) 889-1412"
].join("\n");
fs.writeFileSync(path.join(dist,"llms.txt"),info+"\n","utf8");
fs.writeFileSync(path.join(dist,"sitemap-ai.xml"),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+root+'/ai-opportunities.html</loc><lastmod>2026-11-04</lastmod></url><url><loc>'+root+'/CC_AGENT_COMMERCE.json</loc><lastmod>2026-11-04</lastmod></url></urlset>','utf8');
const robots=path.join(dist,"robots.txt");
const existing=fs.existsSync(robots)?fs.readFileSync(robots,"utf8"):"User-agent: *\nAllow: /\n";
if(!existing.includes("sitemap-ai.xml"))fs.writeFileSync(robots,existing.trimEnd()+"\nSitemap: "+root+"/sitemap-ai.xml\n","utf8");
fs.writeFileSync(path.join(dist,"CC_AGENT_SUBMISSION.md"),info+"\n","utf8");
console.log("SUCCESS: persistently captured commercial buyer requests, llms.txt, sitemap-ai.xml and agent submission guide built.");
