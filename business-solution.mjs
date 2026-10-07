import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
if (!fs.existsSync(dist)) throw new Error("dist must exist before generating the business-solution pages.");

const SITE = "https://carnival-careers-live-current.vercel.app";
const generatedAt = new Date().toISOString();

const esc = value => String(value ?? "")
  .replace(/&/g,"&amp;")
  .replace(/</g,"&lt;")
  .replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;");

const styles = `
  :root{--ink:#100d13;--paper:#f7f4f1;--red:#d71920;--gold:#e3ad31;--green:#1e9c68;--muted:#6e6772;--line:#ded7de;--deep:#130e19}
  *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,Helvetica,sans-serif}
  a{color:inherit}.wrap{width:min(1180px,calc(100% - 34px));margin:auto}.hero{position:relative;overflow:hidden;padding:78px 0 58px;background:
  radial-gradient(circle at 9% 8%,rgba(227,173,49,.27),transparent 29%),radial-gradient(circle at 91% 11%,rgba(215,25,32,.24),transparent 30%),
  linear-gradient(135deg,#120c17 0%,#24101c 48%,#09161d 100%);color:#fff}.hero:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.13;background-image:radial-gradient(rgba(255,255,255,.9) 1px,transparent 1px);background-size:28px 28px}
  .hero .wrap{position:relative;z-index:1}.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.76rem;font-weight:950;letter-spacing:.13em;text-transform:uppercase;color:#ffd56b}.eyebrow:before{content:"";width:24px;height:2px;background:currentColor}
  h1{max-width:13ch;margin:.18em 0 .22em;font-size:clamp(3.1rem,8vw,7rem);line-height:.86;letter-spacing:-.065em}h2{font-size:clamp(2rem,4.5vw,4rem);line-height:.96;letter-spacing:-.045em}h3{line-height:1.08}
  .hero p{max-width:800px;margin:0;font-size:clamp(1.05rem,1.8vw,1.25rem);line-height:1.65;color:rgba(255,255,255,.82)}
  .statebar{display:flex;flex-wrap:wrap;gap:9px;margin-top:25px}.state{padding:9px 12px;border-radius:999px;font-size:.78rem;font-weight:950;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08)}.state.green{background:#dff7ea;color:#093d29;border-color:#8ed4b0}
  .cta-row{display:flex;flex-wrap:wrap;gap:9px;margin-top:24px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 16px;border-radius:999px;text-decoration:none;font-weight:950;background:#fff;color:#171019}.btn.alt{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.28)}
  .spine{padding:30px 0;background:#fff;border-bottom:1px solid var(--line)}.spine-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.spine-grid div{padding:13px 9px;text-align:center;border-radius:12px;background:#f0ecf0;font-size:.79rem;font-weight:950}.spine-grid div:nth-child(odd){background:#171019;color:#fff}
  .section{padding:62px 0}.section.white{background:#fff}.section.dark{background:#151019;color:#fff}.section.dark p{color:#cfc7d1}.section-head{display:grid;grid-template-columns:minmax(0,.8fr) minmax(320px,1.2fr);gap:28px;align-items:end;margin-bottom:28px}.section-head h2{margin:0}.section-head p{margin:0;color:var(--muted);line-height:1.65;font-size:1.05rem}
  .lane-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.lane{display:flex;flex-direction:column;min-height:315px;padding:24px;border:1px solid var(--line);border-radius:20px;background:#fff;text-decoration:none;box-shadow:0 12px 32px rgba(30,15,32,.05)}.lane small{font-size:.72rem;font-weight:950;letter-spacing:.1em;text-transform:uppercase;color:#806d45}.lane h3{font-size:1.45rem;margin:11px 0 9px}.lane p{margin:0;color:#69616d;line-height:1.55}.lane b{margin-top:auto;padding-top:18px;color:#7d2024}
  .greenline{display:flex;align-items:flex-start;gap:10px;margin-top:14px;padding:12px 13px;border-radius:13px;background:#ebf8f1;color:#153e2d;font-size:.87rem;line-height:1.45}.green-dot{flex:0 0 auto;width:10px;height:10px;border-radius:50%;background:var(--green);margin-top:4px}
  .flow{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.step{padding:20px;border-top:3px solid var(--gold);background:#fff}.step b{display:block;color:#9a6c08;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px}.step h3{margin:0 0 7px}.step p{margin:0;color:#6a626d;line-height:1.5;font-size:.92rem}
  .controls{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.control{padding:20px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(255,255,255,.06)}.control strong{display:block;margin-bottom:7px}.control p{margin:0;line-height:1.52;color:#cfc7d1}
  .truth{padding:22px;border-left:5px solid var(--red);background:#fff}.truth strong{display:block;font-size:1.22rem;margin-bottom:6px}.truth p{margin:0;color:#635b66;line-height:1.6}
  .table-wrap{overflow:auto;border:1px solid var(--line);border-radius:16px;background:#fff}table{width:100%;border-collapse:collapse;min-width:850px}th,td{padding:13px 14px;text-align:left;border-bottom:1px solid #ece6eb;vertical-align:top}th{font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;background:#18121c;color:#fff}td{font-size:.92rem;line-height:1.45}.pill{display:inline-block;padding:5px 8px;border-radius:999px;font-size:.7rem;font-weight:950}.pill.g{background:#dff7ea;color:#0f5b3b}.pill.a{background:#fff0c8;color:#6f4d00}
  .footer{padding:28px 0 46px;background:#0f0c11;color:#aaa}.footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}.footer a{color:#fff}
  @media(max-width:950px){.spine-grid{grid-template-columns:repeat(4,1fr)}.lane-grid,.controls{grid-template-columns:1fr 1fr}.flow{grid-template-columns:1fr 1fr}.section-head{grid-template-columns:1fr}}
  @media(max-width:620px){.spine-grid,.lane-grid,.controls,.flow{grid-template-columns:1fr}.hero{padding-top:54px}.section{padding:44px 0}h1{font-size:clamp(3rem,15vw,4.7rem)}}
`;

function shell(title, description, body, canonical){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Carnival Careers</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><meta name="robots" content="index,follow"><style>${styles}</style></head><body>${body}<footer class="footer"><div class="wrap"><span>Carnival Careers · Toronto first · repeatable city operating system</span><span><a href="/business-solution.html">Business Solution</a> · <a href="/#project">Project</a> · <a href="/#show">Show</a></span></div></footer></body></html>`;
}

const spine = `<section class="spine"><div class="wrap"><div class="spine-grid"><div>BUILD</div><div>WORK</div><div>SELL</div><div>GATHER</div><div>FILM</div><div>TRAVEL</div><div>REPEAT</div></div></div></section>`;

const lanes = [
  {
    slug:"house-executor",
    num:"01",
    title:"House Executor",
    summary:"Move a property from lead to underwriting, control, financing, design, diligence, permits, construction, occupancy and ongoing ownership/operations.",
    href:"/house-executor.html"
  },
  {
    slug:"arena-marketplace-executor",
    num:"02",
    title:"Arena + Vendor Marketplace Executor",
    summary:"Turn a live-event concept into inventory, vendor/sponsor participation, production, ticket/attendee routing, operations, settlement and a repeatable city package.",
    href:"/arena-marketplace-executor.html"
  },
  {
    slug:"carnival-circuit",
    num:"03",
    title:"Carnival Circuit",
    summary:"Route people, partners and businesses from one city activation to the next while licensed travel providers remain responsible for booking and carriage.",
    href:"/carnival-circuit.html"
  },
  {
    slug:"reality-content-engine",
    num:"04",
    title:"Reality + Content Engine",
    summary:"Turn each real transformation into a master episode and a controlled library of social, sponsor, music, partner and case-study content.",
    href:"/reality-content-engine.html"
  },
  {
    slug:"profit-control",
    num:"05",
    title:"Profit + Control",
    summary:"Force every operating lane to show its cost, revenue mechanism, margin logic, cash timing, risk carrier, executable paper and evidence state.",
    href:"/profit-control.html"
  },
  {
    slug:"contact-os",
    num:"06",
    title:"Contact Operating System",
    summary:"One canonical contact, one active thread, one unresolved decision, one next action — with repetition, bounces and stale outreach suppressed.",
    href:"/contact-os.html"
  }
];

const laneCards = lanes.map(x=>{ const status = x.slug === "contact-os" ? "<strong>Source required.</strong> Canonical contact workbook is not available; migration and enrichment remain blocked." : "<strong>Control framework ready.</strong> Lane evidence remains in progress."; return `<a class="lane" href="${x.href}"><small>${x.num} · operating lane</small><h3>${x.title}</h3><p>${x.summary}</p><div class="greenline"><span class="green-dot"></span><span>${status}</span></div><b>Open executor →</b></a>`; }).join("");

const home = shell(
  "Full Business Solution",
  "Carnival Careers links property, work, marketplace commerce, live events, travel and screen content into one repeatable city operating system.",
  `<section class="hero"><div class="wrap"><div class="eyebrow">FULL BUSINESS SOLUTION / CONTROLLED OPERATING MODEL</div><h1>One city. One machine. Every result feeds the next.</h1><p>Carnival Careers is not a concert with side projects. It is an operating system that links a real household transformation, property, paid work, commerce, a vendor marketplace, live culture, travel and filmed media so each completed piece produces evidence and inventory for the next city.</p><div class="statebar"><span class="state green">CONTROL FRAMEWORK · READY</span><span class="state">LANE EVIDENCE · IN PROGRESS</span><span class="state">OUTREACH · PAUSED</span></div><div class="cta-row"><a class="btn" href="#engines">Open the engines</a><a class="btn alt" href="/#project">Current project</a></div></div></section>
  ${spine}
  <section class="section" id="engines"><div class="wrap"><div class="section-head"><h2>The six execution engines.</h2><p>Each engine has a defined beginning, controlled states, evidence gates and a finish. A lead is not a deal. A quote is not a contract. A modeled dollar is not collected cash. The system advances only when the evidence advances.</p></div><div class="lane-grid">${laneCards}</div></div></section>
  <section class="section dark"><div class="wrap"><div class="section-head"><h2>Green means controlled — not imagined.</h2><p>Internal readiness is separated from real-world confirmation. The operating system can be complete before a venue, lender, builder, ship, broadcaster or sponsor signs. External facts remain visibly blocked until the required paper exists.</p></div><div class="controls"><div class="control"><strong>Truth state</strong><p>Every material claim is tagged VERIFIED, MODELED, QUOTED, CONTRACTED, COLLECTED or BLOCKED.</p></div><div class="control"><strong>Dependency owner</strong><p>Every blocker has one responsible party, one required document or decision and one next state.</p></div><div class="control"><strong>No repeated chasing</strong><p>Contact history is read before another message is prepared. The next communication must move the unresolved decision.</p></div></div></div></section>
  <section class="section white"><div class="wrap"><div class="truth"><strong>The operating rule</strong><p>BUILD creates the asset. WORK makes the family economics visible. SELL turns the audience into commerce. GATHER creates the public event. FILM turns the real work into media inventory. TRAVEL connects the next market. REPEAT converts one successful city into a circuit.</p></div></div></section>`,
  SITE + "/business-solution.html"
);

fs.writeFileSync(path.join(dist,"business-solution.html"),home);

const detailPages = {
  "house-executor.html": {
    title:"House Executor",
    description:"A controlled property-to-occupancy workflow for Carnival Careers.",
    lead:"A house or building does not become part of the project because it appears in a listing. It moves through evidence, control, financing, design, diligence, approvals, construction, occupancy and operating handoff.",
    steps:[
      ["01","Source + screen","Capture address, ownership/seller route, ask, income/NOI where applicable, title/zoning clues, site constraints and the intended family/business use."],
      ["02","Underwrite","Build a current sources-and-uses view, debt capacity, seller-finance scenario, cash-to-close, downside cases and an evidence register."],
      ["03","Control","Move only through lawful non-binding term sheet/LOI/APS/option/JV paper, legal review, deposit conditions and diligence rights."],
      ["04","Design + diligence","Survey, zoning, planning, environmental/building condition, geotech/site work, architecture, structural/MEP/fire/life-safety and cost plan as applicable."],
      ["05","Permit + build","Close permit gaps, issue controlled construction documents, contract scopes, track schedule/cost/RFIs/submittals/changes and verify work."],
      ["06","Occupy + own","Inspection, commissioning, occupancy, insurance, property management, buyer/tenant-owner structure and recurring operating records."]
    ],
    links:'<a class="btn" href="/houses.html">Open The Houses</a><a class="btn alt" href="/#project">Project</a>'
  },
  "arena-marketplace-executor.html": {
    title:"Arena + Vendor Marketplace Executor",
    description:"A controlled live-event and vendor-marketplace workflow for Carnival Careers.",
    lead:"The live event is the public victory lap, not the first thing the economics depend on. The marketplace, sponsor inventory, technical production, audience path and settlement all have explicit owners and evidence states.",
    steps:[
      ["01","Format + inventory","Lock the event format, capacity assumptions, sellable vendor/sponsor/hospitality inventory and what remains unconfirmed."],
      ["02","Venue + production file","Build venue requirements, technical scope, safety, staffing, security, insurance, accessibility, medical, load-in/out and show-control requirements."],
      ["03","Marketplace file","Define vendor categories, minimum commercial terms, footprints, power/water/Wi-Fi, permits, insurance, POS, load-in and settlement."],
      ["04","Audience + ticket path","Separate ticket seller of record from Carnival Careers promotion, track inventory source, fees/refunds, attribution and attendee communications."],
      ["05","Operate","Run command centre, credentials, backstage, sponsor/VIP, vendors, guest services, production, incident logs, show call and close-out."],
      ["06","Settle + reuse","Reconcile ticket/vendor/sponsor/merch/media economics, close invoices/issues, capture proof and roll the package forward to the next city."]
    ],
    links:'<a class="btn" href="/#arena">Arena</a><a class="btn alt" href="/#vendors">Vendors</a><a class="btn alt" href="/#sponsors">Sponsors</a>'
  },
  "carnival-circuit.html": {
    title:"Carnival Circuit",
    description:"A compliant travel-and-city routing system for the Carnival Careers circuit.",
    lead:"Travel is a routing and demand engine until a licensed provider confirms the actual booking. Carnival Careers can organize demand, content, partner activity and city sequencing without pretending to be the airline, cruise line or ticket seller.",
    steps:[
      ["01","Route demand","Capture origin, destination, timing, flexibility, party/group size, city-event purpose and consent for referral."],
      ["02","Pool + qualify","Match compatible demand conservatively. A potential match is a demand signal, not a confirmed trip."],
      ["03","Provider handoff","Send qualified demand only to an appropriate licensed/operator/provider route when the user authorizes outreach."],
      ["04","Quote + booking evidence","Provider owns live inventory, quote, contract, payment, ticket/cabin/charter confirmation, refunds and carriage."],
      ["05","Moving venue","Where commercially valid, use travel time for sponsor, vendor, hospitality and content activity under the provider agreement."],
      ["06","Arrive + repeat","The destination becomes the next city activation; travel evidence and audience data feed the next route."]
    ],
    links:'<a class="btn" href="/#boat">Moving Venue</a><a class="btn alt" href="/#plane">Plane Pool</a><a class="btn alt" href="/#experiences">Events</a>'
  },
  "reality-content-engine.html": {
    title:"Reality + Content Engine",
    description:"A repeatable factual-entertainment and social-content production system for Carnival Careers.",
    lead:"The show is built from the real operating work. One controlled capture plan produces the master story and a reusable content library instead of treating social media as a separate afterthought.",
    steps:[
      ["01","Story + rights","Define featured people, factual story beats, releases/permissions, locations, music/brand rights, sensitive information rules and what cannot be filmed."],
      ["02","Production plan","Turn house/work/business/city/event milestones into call sheets, coverage lists, interview beats, continuity and media-delivery requirements."],
      ["03","Principal capture","Film the real transformation, work, property, city, culture, partners and finale with source/date/rights metadata attached."],
      ["04","Master edit","Build the episode/trailer/screener with factual verification, music/footage clearances, captions, credits and delivery specifications."],
      ["05","Derivative factory","Create vertical clips, sponsor cutdowns, performance moments, behind-the-scenes pieces, stills, partner deliverables and archive-ready selects from approved masters."],
      ["06","Distribute + measure","Track exactly where each asset is licensed, delivered, posted or used; separate reach from paid revenue; feed verified performance into the next production cycle."]
    ],
    links:'<a class="btn" href="/#show">Show</a><a class="btn alt" href="/#music">Music</a><a class="btn alt" href="/#experiences">Culture + Events</a>'
  },
  "profit-control.html": {
    title:"Profit + Control",
    description:"The unit-economics and evidence-control layer for Carnival Careers.",
    lead:"Every engine has to survive the same financial test. The system records the current cost source, revenue mechanism, contribution logic, cash timing, risk carrier, executable paper and collection rail before an amount is treated as financeable truth.",
    steps:[
      ["01","Inputs","Current source or quote, quantity/unit, date, currency, tax treatment and confidence/evidence state."],
      ["02","Direct cost","All direct execution costs including mandatory fees, production/fulfillment, travel, labour, insurance and contingency appropriate to the lane."],
      ["03","Revenue mechanism","Who pays, for what deliverable, at what unit/price, under what contract/platform, and when recognition/collection can occur."],
      ["04","Contribution","Revenue less direct cost, then explicit overhead allocation — never a hidden gross-profit shortcut."],
      ["05","Cash timing + risk","Deposit/prepayment/receivable/refund/chargeback/closing timing, who carries working-capital risk and what can fail before cash clears."],
      ["06","Evidence ladder","MODELED → QUOTED → CONTRACTED → INVOICED/BOOKED → COLLECTED. No lane skips the ladder."]
    ],
    links:'<a class="btn" href="/#project">Project + funding</a>'
  },
  "contact-os.html": {
    title:"Contact Operating System",
    description:"The deduplicated contact and decision-state operating system for Carnival Careers.",
    lead:"The contact list is not a blast list. Every person is one record with one relationship state, one active thread, one unresolved decision, one relevant proof package and one next action.",
    steps:[
      ["01","Canonicalize","Dedupe person/company/email/domain/aliases/social handles and preserve every source-list membership."],
      ["02","Read context","Attach the actual Gmail thread/history, last conversation, promises already made, bounces, opt-outs and holds."],
      ["03","Match the offer","Assign one primary commercial role, secondary roles, the relevant executor lane and the exact proof that person needs."],
      ["04","Set the decision","Record Waiting On = US/THEM/NONE and one Next Unresolved Decision. No generic check-ins."],
      ["05","Route proof","Use the narrowest relevant destination: house, marketplace, travel, screen/content, financial control or whole-system page."],
      ["06","Advance by evidence","UNVERIFIED → VERIFIED → CONTEXT BUILT → OFFER MATCHED → PROOF READY → ENGAGED → DILIGENCE → EXECUTABLE PAPER → SIGNED → FUNDED/BOOKED → FULFILLED → CONTENT CAPTURED → CASE STUDY → NEXT CITY."]
    ],
    links:'<a class="btn" href="/business-solution.html">Whole system</a>'
  }
};

for (const [filename,page] of Object.entries(detailPages)){
  const steps = page.steps.map(([n,t,p])=>`<article class="step"><b>${n}</b><h3>${t}</h3><p>${p}</p></article>`).join("");
  const laneState = filename === "contact-os.html"
    ? '<span class="state">CONTACT DATA · SOURCE REQUIRED</span><span class="state">OUTREACH · PAUSED</span>'
    : '<span class="state green">CONTROL FRAMEWORK · READY</span><span class="state">LANE EVIDENCE · IN PROGRESS</span><span class="state">OUTREACH · PAUSED</span>';
  const html = shell(
    page.title,
    page.description,
    `<section class="hero"><div class="wrap"><div class="eyebrow">CARNIVAL CAREERS / EXECUTOR</div><h1>${page.title}</h1><p>${page.lead}</p><div class="statebar">${laneState}</div><div class="cta-row">${page.links}</div></div></section>
    ${spine}
    <section class="section"><div class="wrap"><div class="section-head"><h2>End to end.</h2><p>The finish line is a completed, evidenced operating result — not a research result, email, meeting, application or optimistic projection.</p></div><div class="flow">${steps}</div></div></section>
    <section class="section dark"><div class="wrap"><div class="controls"><div class="control"><strong>Owner</strong><p>Every step has a responsible internal or external owner before the state can advance.</p></div><div class="control"><strong>Evidence</strong><p>Every material fact carries a source/date and one of the controlled truth states.</p></div><div class="control"><strong>Next decision</strong><p>Blocked work records the smallest document, approval or fact that would move it forward.</p></div></div></div></section>
    <section class="section white"><div class="wrap"><div class="truth"><strong>No fake green.</strong><p>“Control framework ready” means the process, controls and state machine exist; lane evidence and source records may still be incomplete. It does not convert an unsigned counterparty, unbooked venue, unapproved permit, modeled dollar or unconfirmed route into a real-world commitment.</p></div></div></section>`,
    SITE + "/" + filename
  );
  fs.writeFileSync(path.join(dist,filename),html);
}

const greenSystem = {
  generated_at: generatedAt,
  canonical_public_front_door: SITE + "/business-solution.html",
  operating_spine: ["BUILD","WORK","SELL","GATHER","FILM","TRAVEL","REPEAT"],
  truth_states: ["VERIFIED","MODELED","QUOTED","CONTRACTED","COLLECTED","BLOCKED"],
  outreach_state: "CONTROLLED_BY_USER_INSTRUCTION",
  lanes: lanes.map(x=>({id:x.slug,title:x.title,internal_system:"READY",external_execution:"EVIDENCE_GATED",url:SITE+x.href}))
};
fs.writeFileSync(path.join(dist,"green-system.json"),JSON.stringify(greenSystem,null,2));

const contactSchema = {
  generated_at: generatedAt,
  operating_rule: "one canonical contact + one active thread + one unresolved decision + one next action",
  states:["UNVERIFIED","VERIFIED","CONTEXT BUILT","OFFER MATCHED","PROOF READY","ENGAGED","DILIGENCE","EXECUTABLE PAPER","SIGNED","FUNDED/BOOKED","FULFILLED","CONTENT CAPTURED","CASE STUDY","NEXT CITY"],
  fields:[
    "Canonical Name","Organization","Primary Commercial Role","Secondary Roles","Email","Domain","Aliases","Source Memberships",
    "Relationship State","Last Conversation Date","Last Conversation Summary","Waiting On","Next Unresolved Decision","Proof Needed",
    "Canonical Destination URL","Gmail Thread ID","Gmail Message ID","Bounce/Invalid","Opt-Out/Hold","Warm/Active",
    "User Contact Required","User Contact Reason","Last Audited At"
  ],
  suppression_rules:["duplicate thread","hard hold","opt-out","invalid/bounce","provider send-limit risk","no unresolved decision","same generic pitch already used"],
  canonical_routes:{
    whole_system:SITE+"/business-solution.html",
    house:SITE+"/house-executor.html",
    arena_marketplace:SITE+"/arena-marketplace-executor.html",
    travel:SITE+"/carnival-circuit.html",
    reality_content:SITE+"/reality-content-engine.html",
    profit_control:SITE+"/profit-control.html"
  }
};
fs.writeFileSync(path.join(dist,"contact-os-schema.json"),JSON.stringify(contactSchema,null,2));

const economicsSchema = {
  generated_at: generatedAt,
  rule:"No profitability claim advances beyond its evidence state.",
  lanes:["House","Arena + Vendor Marketplace","Travel","Reality + Content","Mobility","Commerce"],
  required_fields:["Input / Source","Last Verified Date","Evidence State","Direct Cost","Revenue Mechanism","Unit / Price","Gross Contribution","Overhead Allocation","Net Contribution","Cash Timing","Risk Carrier","Executable Paper","Collection Mechanism","Blocker","Next Evidence"],
  evidence_ladder:["MODELED","QUOTED","CONTRACTED","INVOICED/BOOKED","COLLECTED"],
  calculations:{
    gross_contribution:"recognized revenue - direct cost",
    net_contribution:"gross contribution - allocated overhead",
    cash_profit:"cash collected - cash paid for attributable direct cost - paid allocated overhead"
  }
};
fs.writeFileSync(path.join(dist,"unit-economics-schema.json"),JSON.stringify(economicsSchema,null,2));


// Final public-site truth-control pass. This runs after the legacy standalone builder so
// future counterparties cannot be routed into retired finance/property language.
const rootPath = path.join(dist,"index.html");
if (fs.existsSync(rootPath)) {
  let rootHtml = fs.readFileSync(rootPath,"utf8");

  const greenRootPatch = `
<script id="cc-green-root-truth-control">
(() => {
  const run = () => {
    const q = s => (document.querySelector(s));
    const pageInner = page => page?.querySelector(".page-inner,.content,.section-inner,.container,.wrap") || page;

    // Canonical future-contact destination.
    const heroActions = q("#page-home .actions") || q('[data-page="home"] .actions');
    if (heroActions && !document.getElementById("ccBusinessSolutionLink")) {
      const a = document.createElement("a");
      a.id = "ccBusinessSolutionLink";
      a.className = "btn";
      a.href = "/business-solution.html";
      a.textContent = "Full Business Solution";
      heroActions.prepend(a);
    }

    // Retired labels requested off the public experience.
    const labelMap = new Map([
      ["MONEY ROUTES","BUSINESS SOLUTION"],
      ["THE SERVICE PROMISE","SERVICE CONTROL"],
      ["FIND YOUR WAY IN",""]
    ]);
    document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,div,strong,small,label").forEach(el => {
      if (el.children.length) return;
      const raw = (el.textContent || "").trim();
      const key = raw.toUpperCase();
      if (labelMap.has(key)) {
        const next = labelMap.get(key);
        if (next) el.textContent = next;
        else el.remove();
      }
    });

    // Replace the entire legacy capital page rather than trying to preserve
    // superseded Vic Towns / C$5.509M / old event-TV-cruise waterfall figures.
    const capital = q("#page-capital") || q('[data-page="capital"]');
    if (capital) {
      const inner = pageInner(capital);
      inner.innerHTML = [
        '<section style="padding:48px 0">',
          '<div class="eyebrow">CAPITAL / EVIDENCE CONTROL</div>',
          '<h1>Finance what can be evidenced.</h1>',
          '<p>Carnival Careers separates current facts, counterparty quotes, official or statutory amounts, market benchmarks and modeled assumptions. No pipeline number is represented as committed cash, revenue or profit.</p>',
          '<div class="grid cols-3" style="margin-top:22px">',
            '<article class="card"><small>PROPERTY</small><h3>Asset-specific underwriting</h3><p>Purchase price, debt, seller financing, closing costs, construction, income and exit stay tied to the exact property and current evidence.</p></article>',
            '<article class="card"><small>OPERATIONS</small><h3>Event + production economics</h3><p>Venue, technical production, talent, staffing, insurance, media and operating costs advance only from current quotes, contracts or clearly labelled models.</p></article>',
            '<article class="card"><small>REVENUE</small><h3>Evidence ladder</h3><p>MODELED → QUOTED → CONTRACTED → INVOICED / BOOKED → COLLECTED. The public story never skips a state.</p></article>',
          '</div>',
          '<div class="actions" style="margin-top:24px"><a class="btn primary" href="/profit-control.html">Open Profit + Control</a><a class="btn" href="/business-solution.html">Open Full Business Solution</a></div>',
        '</section>'
      ].join("");
    }

    // A lender may still see a historical property name in a separate legacy block.
    // Genericize it so only the current, transaction-specific package carries asset names.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      let t = node.nodeValue || "";
      if (!t.trim()) continue;
      t = t.replace(/Vic Towns/gi,"current Toronto property stack");
      t = t.replace(/Property is not asked to fund the concert\./gi,"Every capital lane is evidence-controlled.");
      node.nodeValue = t;
    }

    // Remove a standalone capital nav destination when present; Project + the
    // canonical business-solution/profit-control routes now carry the finance story.
    document.querySelectorAll('a[href="#capital"],a[href="/#capital"]').forEach(a => {
      const txt = (a.textContent || "").trim().toLowerCase();
      if (txt === "capital") a.remove();
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
})();
</script>
`;

  rootHtml = rootHtml.replace("</body>", greenRootPatch + "\n</body>");
  fs.writeFileSync(rootPath, rootHtml);
}

console.log("CARNIVAL_CAREERS_GREEN_BUSINESS_SOLUTION_GENERATED", Object.keys(detailPages).length + 1);
