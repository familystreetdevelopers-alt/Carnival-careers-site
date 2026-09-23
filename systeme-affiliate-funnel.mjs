import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
if (!fs.existsSync(dist)) throw new Error("dist must exist before generating the Systeme.io affiliate funnel.");

const affiliateId = "sa0106982963ec9fa81e5169cba06a5e5e8eadcf2e";
const site = "https://carnival-careers-live-current.vercel.app";
const disclosure = "Affiliate disclosure: Carnival Careers may earn a commission if you sign up or buy through links on this page. There is no extra cost to you.";

const aff = (url, tag) => {
  const join = url.includes("?") ? "&" : "?";
  return url + join + "sa=" + affiliateId + "&tk=" + encodeURIComponent(tag);
};

const homepage = tag => aff("https://systeme.io/", tag);
const features = tag => aff("https://systeme.io/features", tag);
const funnels = tag => aff("https://systeme.io/sales-funnels", tag);
const website = tag => aff("https://systeme.io/website-builder", tag);
const affiliateProgram = tag => aff("https://systeme.io/affiliate-program", tag);

function esc(v){
  return String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function shell(title, description, body, canonical){
  return '<!doctype html><html lang="en"><head>'+
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<title>'+esc(title)+' | Carnival Careers Business Tools</title>'+
    '<meta name="description" content="'+esc(description)+'">'+
    '<link rel="canonical" href="'+esc(canonical)+'">'+
    '<meta name="robots" content="index,follow">'+
    '<style>'+
    'body{margin:0;background:#f6f3fb;color:#17131f;font-family:Arial,Helvetica,sans-serif}'+
    '.w{max-width:980px;margin:auto;padding:56px 20px 88px}.hero{padding:34px;border-radius:28px;background:linear-gradient(135deg,#171027,#442173 58%,#123249);color:#fff;box-shadow:0 22px 60px rgba(32,18,58,.22)}'+
    '.ey{font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#ffd15b}.hero h1{font-size:clamp(2.5rem,7vw,5.4rem);line-height:.92;letter-spacing:-.055em;margin:.18em 0}.hero p{font-size:1.13rem;line-height:1.65;color:rgba(255,255,255,.84);max-width:760px}'+
    '.cta{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 20px;border-radius:999px;background:#ffd15b;color:#1d1530!important;font-weight:950;text-decoration:none;margin:9px 8px 0 0}.cta.alt{background:#fff}'+
    '.disclosure{margin:18px 0 0;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.10);font-size:.9rem;line-height:1.45;color:#fff}'+
    '.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:26px 0}.card{padding:20px;border-radius:18px;background:#fff;border:1px solid #e2d9ec;box-shadow:0 9px 28px rgba(39,23,58,.06)}.card h2,.card h3{margin-top:0}.card p,main>p,li{line-height:1.62;color:#5e5767}.section{margin-top:42px}.section h2{font-size:clamp(1.8rem,4vw,3rem);letter-spacing:-.03em}.note{padding:17px;border-radius:16px;background:#fff7d9;border:1px solid #f1df9f;color:#433611}.small{font-size:.88rem;color:#716a77}.links a{color:#3f2f84}'+
    '@media(max-width:760px){.grid{grid-template-columns:1fr}.hero{padding:25px}}'+
    '</style></head><body><main class="w">'+body+'</main></body></html>';
}

const mainBody =
  '<section class="hero">'+
    '<div class="ey">FREE BUSINESS TOOL / AFFILIATE LINK</div>'+
    '<h1>Build the business system before buying five different tools.</h1>'+
    '<p>Systeme.io combines sales funnels, email marketing, websites, courses, affiliate management, booking, CRM-style pipelines and automation in one platform. The free plan lets people test the workflow before paying.</p>'+
    '<a class="cta" href="'+homepage("cc_tools_main")+'" rel="sponsored nofollow">Start free on Systeme.io</a>'+
    '<a class="cta alt" href="'+features("cc_tools_features")+'" rel="sponsored nofollow">See the feature list</a>'+
    '<div class="disclosure">'+esc(disclosure)+'</div>'+
  '</section>'+
  '<section class="section"><h2>What you can build</h2><div class="grid">'+
    '<article class="card"><h3>Funnels + pages</h3><p>Create opt-in pages, sales pages, checkout flows and websites with a visual editor.</p><a href="'+funnels("cc_tools_funnels")+'" rel="sponsored nofollow">Explore funnels →</a></article>'+
    '<article class="card"><h3>Email + automation</h3><p>Connect forms, tags and automated email sequences without stitching together a separate email platform.</p><a href="'+features("cc_tools_email")+'" rel="sponsored nofollow">Explore automation →</a></article>'+
    '<article class="card"><h3>Courses + affiliates</h3><p>Host courses, manage students and create an affiliate program from the same account.</p><a href="'+features("cc_tools_courses")+'" rel="sponsored nofollow">Explore the platform →</a></article>'+
  '</div></section>'+
  '<section class="section"><h2>Why this page exists</h2><p>Carnival Careers tests revenue lanes that can keep working after the initial setup. This page is a transparent affiliate lane: if someone follows a tracked link and later becomes an eligible paying Systeme.io customer, Systeme.io may credit a commission to Carnival Careers under its affiliate terms.</p>'+
  '<div class="note"><strong>No earnings promise.</strong> This page describes software and an affiliate relationship. It does not promise that using the platform will make money, produce customers or create a profitable business.</div></section>'+
  '<section class="section links"><h2>Useful starting points</h2><p><a href="'+website("cc_tools_website")+'" rel="sponsored nofollow">Website builder</a> · <a href="'+funnels("cc_tools_salesfunnels")+'" rel="sponsored nofollow">Sales funnels</a> · <a href="'+affiliateProgram("cc_tools_affiliate")+'" rel="sponsored nofollow">Systeme.io affiliate program</a></p></section>';

fs.writeFileSync(
  path.join(dist,"free-business-tools.html"),
  shell(
    "Free all-in-one business tools",
    "Explore a free all-in-one platform for funnels, email, websites, courses, affiliate management and automation.",
    mainBody,
    site + "/free-business-tools.html"
  )
);

const seo = [
  ["free-sales-funnel-builder","Free Sales Funnel Builder","A no-cost starting point for building opt-in and sales funnels without buying a separate funnel platform.","A funnel is the path from first click to signup or purchase. A useful beginner setup usually needs a landing page, a form, follow-up email and a clear next step. Systeme.io puts those pieces in one account.",funnels],
  ["free-email-marketing-funnel-builder","Free Email Marketing + Funnel Builder","Combine lead capture, tagging and follow-up email in one free starting stack.","The simplest automation is often the most useful: someone submits a form, receives a tag and enters a short email sequence. Keeping the form and email system together reduces handoffs and setup work.",features],
  ["all-in-one-online-business-platform","All-in-One Online Business Platform","A practical overview of putting websites, funnels, email, courses and automations under one login.","Using fewer tools can reduce duplicate subscriptions and integration work. The tradeoff is that an all-in-one platform may not have every advanced feature of a specialized tool, so the free tier is useful for testing fit first.",features],
  ["free-online-course-platform","Free Online Course Platform","Start structuring an online course without committing to a paid course platform first.","A basic course business needs lesson hosting, student access, checkout and follow-up. Systeme.io places course delivery beside the funnel and email tools, which can make a small first launch easier to operate.",features],
  ["affiliate-program-software","Affiliate Program Software","Create and manage an affiliate program alongside the pages and products it promotes.","Affiliate software needs reliable links, attribution and commission rules. Keeping affiliate management next to the sales funnel can simplify tracking, but program owners are still responsible for clear terms and compliant promotion.",features],
  ["small-business-marketing-automation","Small Business Marketing Automation","A simple way to connect forms, tags, emails and customer actions without a separate automation service.","Automation is most useful when it removes a repeated handoff: welcome a lead, tag an interest, deliver access or trigger a follow-up. Start with one workflow, verify it, then add complexity.",features],
  ["website-builder-with-email-automation","Website Builder With Email Automation","Build pages and connect them directly to email follow-up and lead tags.","A website becomes more useful when forms have an immediate next action. Connecting website forms to automated email can reduce manual replies while keeping the visitor journey consistent.",website],
  ["free-creator-business-tools","Free Creator Business Tools","A free starting stack for creators selling courses, digital offers, services or memberships.","Creators often need a landing page, email list, checkout, content delivery and follow-up before they need a large software stack. An all-in-one free tier can be a practical way to validate the workflow.",homepage],
  ["evergreen-marketing-automation-platform","Evergreen Marketing Automation Platform","Build repeatable lead and customer journeys that do not require a manual send every time.","Evergreen automation works best for repeatable actions such as welcome sequences, lead magnets, course access and routine follow-up. It should still be reviewed periodically for broken links, outdated claims and deliverability.",features],
  ["online-business-tools-free","Online Business Tools You Can Start Free","A plain-language checklist of the core tools needed to launch a basic online offer.","For many small online offers, the core stack is a page, email capture, follow-up, checkout and delivery. Starting free can help test the process before adding paid software or advertising.",homepage]
];

for(const [slug,title,description,body,linkFn] of seo){
  const tag="seo_"+slug.replace(/-/g,"_");
  const target=linkFn(tag);
  const bodyHtml=
    '<section class="hero"><div class="ey">CARNIVAL CAREERS BUSINESS TOOLS</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p>'+
    '<a class="cta" href="'+target+'" rel="sponsored nofollow">Try Systeme.io free</a><div class="disclosure">'+esc(disclosure)+'</div></section>'+
    '<section class="section"><h2>Start with the workflow, not the software list.</h2><p>'+esc(body)+'</p>'+
    '<div class="grid"><article class="card"><h3>1 · Capture</h3><p>Give the visitor one clear page and one clear next step.</p></article><article class="card"><h3>2 · Follow up</h3><p>Use tags and email automation for repeatable communication.</p></article><article class="card"><h3>3 · Measure</h3><p>Track which sources actually produce registrations and customers.</p></article></div>'+
    '<p class="small">No earnings are guaranteed. Suitability depends on your business, audience, offer and execution.</p></section>';
  fs.writeFileSync(path.join(dist,slug+".html"),shell(title,description,bodyHtml,site+"/"+slug+".html"));
}


const buyerIntentPages = [
  {
    slug:"systeme-io-free-plan",
    title:"Systeme.io Free Plan: What You Can Build Before Paying",
    description:"A practical 2026 overview of Systeme.io's free plan for funnels, email, websites, courses, automations and affiliate management.",
    tag:"seo_systeme_free_plan",
    html:
      '<section class="hero"><div class="ey">BUYER GUIDE / VERIFIED SEPTEMBER 2026</div><h1>What can you actually do on Systeme.io for free?</h1>'+
      '<p>The useful question is not whether there is a free plan. It is whether the free plan is large enough to launch a real first workflow before you pay.</p>'+
      '<a class="cta" href="'+homepage("seo_systeme_free_plan")+'" rel="sponsored nofollow">Open a free account</a>'+
      '<div class="disclosure">'+esc(disclosure)+'</div></section>'+
      '<section class="section"><h2>The current free-plan baseline</h2>'+
      '<div class="grid"><article class="card"><h3>Up to 2,000 contacts</h3><p>Enough room to validate an email list, lead magnet or early customer base before a paid contact tier becomes necessary.</p></article>'+
      '<article class="card"><h3>3 sales funnels</h3><p>Enough for a lead funnel, a sales funnel and one additional test without committing to a paid funnel builder.</p></article>'+
      '<article class="card"><h3>Unlimited email sending</h3><p>The current official pricing page lists unlimited email sends on every plan, including Free.</p></article></div>'+
      '<p>Systeme.io also currently lists one custom domain, a course, a blog, automation capability and its affiliate-management tools on the free tier. Limits and plan packaging can change, so check the live pricing page before making a long-term software decision.</p>'+
      '<h2>Who the free plan makes sense for</h2><p>It is strongest when you need one simple operating system: capture a lead, tag the lead, send follow-up email, host a page or course, and connect the pieces without buying a separate tool for each step.</p>'+
      '<h2>Where the free plan stops being enough</h2><p>The practical upgrade triggers are usually contact volume, the number of funnels, the number of automation rules/workflows, or advanced features such as evergreen webinars. Do not upgrade simply because a paid tier exists; upgrade when a real operating limit is blocking the next step.</p>'+
      '<div class="note"><strong>Bottom line:</strong> if you are under the free limits, build the workflow first and let usage—not software anxiety—decide when to pay.</div>'+
      '<p><a class="cta" href="'+homepage("seo_systeme_free_plan_bottom")+'" rel="sponsored nofollow">Start free</a></p></section>'
  },
  {
    slug:"systeme-io-affiliate-program-guide",
    title:"Systeme.io Affiliate Program: How the 60% Lifetime Commission Works",
    description:"A plain-language guide to Systeme.io's current affiliate attribution and lifetime recurring commission structure.",
    tag:"seo_systeme_affiliate_program",
    html:
      '<section class="hero"><div class="ey">AFFILIATE GUIDE / VERIFIED SEPTEMBER 2026</div><h1>Why the Systeme.io affiliate model is different.</h1>'+
      '<p>Systeme.io currently advertises a 60% lifetime recurring commission. The most important detail is when attribution becomes locked to an affiliate.</p>'+
      '<a class="cta" href="'+affiliateProgram("seo_systeme_affiliate_program")+'" rel="sponsored nofollow">See the official affiliate program</a><div class="disclosure">'+esc(disclosure)+'</div></section>'+
      '<section class="section"><h2>The referral event that matters</h2><p>Under the current affiliate agreement, a new lead needs to register for a free Systeme.io account through the affiliate link. Once that happens, Systeme.io says that affiliate relationship is retained for later dashboard upgrades, subject to the program terms.</p>'+
      '<div class="grid"><article class="card"><h3>Free signup first</h3><p>A click by itself is not enough. The referred person must actually register through the tracked link.</p></article>'+
      '<article class="card"><h3>Lifetime relationship</h3><p>Systeme.io says the referral remains associated with the affiliate for later eligible upgrades.</p></article>'+
      '<article class="card"><h3>60% recurring</h3><p>The current program advertises 60% of eligible subscription sales for the lifetime of the referred customer.</p></article></div>'+
      '<h2>What this does not mean</h2><p>It does not guarantee affiliate income. Invalid leads, refunds, chargebacks, term changes and other eligibility rules can affect commissions. And the best traffic is still useful, permission-based traffic—not unsolicited messages.</p>'+
      '<div class="note"><strong>The conversion goal:</strong> send a genuinely interested person through the tracked link and get the free registration completed. That is more valuable than chasing raw clicks.</div>'+
      '<p><a class="cta" href="'+homepage("seo_systeme_affiliate_program_bottom")+'" rel="sponsored nofollow">Create a free Systeme.io account</a></p></section>'
  },
  {
    slug:"systeme-io-small-business-automation",
    title:"Systeme.io for Small Business Automation",
    description:"A practical small-business workflow using Systeme.io for lead capture, email, funnels, automation and digital delivery.",
    tag:"seo_small_business_automation",
    html:
      '<section class="hero"><div class="ey">SMALL BUSINESS WORKFLOW</div><h1>Automate the boring handoffs first.</h1>'+
      '<p>A small business does not need fifty automations. It needs the repetitive handoffs—lead capture, welcome, follow-up and delivery—to stop consuming attention.</p>'+
      '<a class="cta" href="'+homepage("seo_small_business_automation")+'" rel="sponsored nofollow">Build it free</a><div class="disclosure">'+esc(disclosure)+'</div></section>'+
      '<section class="section"><h2>A four-step first automation</h2>'+
      '<div class="grid"><article class="card"><h3>1 · Capture</h3><p>Use one focused page and form for a specific offer or lead magnet.</p></article>'+
      '<article class="card"><h3>2 · Tag</h3><p>Apply an interest tag so later messages are based on what the person actually asked for.</p></article>'+
      '<article class="card"><h3>3 · Follow up</h3><p>Send a useful welcome sequence automatically instead of manually replying to every signup.</p></article></div>'+
      '<div class="grid"><article class="card"><h3>4 · Deliver</h3><p>Route the person to the next relevant page, course, booking or checkout step.</p></article>'+
      '<article class="card"><h3>Measure one thing</h3><p>Track which source produces registrations, not just clicks. A smaller stream of qualified signups beats empty traffic.</p></article>'+
      '<article class="card"><h3>Expand only after proof</h3><p>Once one workflow works, clone the logic for the next offer instead of building a giant automation map on day one.</p></article></div>'+
      '<p>The current free plan is large enough to test this basic workflow without a credit card. That makes it useful for validating the process before deciding whether a paid tier is justified.</p>'+
      '<p><a class="cta" href="'+homepage("seo_small_business_automation_bottom")+'" rel="sponsored nofollow">Start the free workflow</a></p></section>'
  }
];

for (const p of buyerIntentPages){
  fs.writeFileSync(path.join(dist,p.slug+".html"),shell(p.title,p.description,p.html,site+"/"+p.slug+".html"));
}

const shareChannels = [
  ["website","Website"],["email","Email"],["linkedin","LinkedIn"],["facebook","Facebook"],["instagram","Instagram"],["threads","Threads"],["x","X"],["youtube","YouTube"],["pinterest","Pinterest"],["reddit","Reddit"],["quora","Quora"],["medium","Medium"],["substack","Substack"]
];

const shareRows = shareChannels.map(([slug,label])=>{
  const link=homepage("share_"+slug);
  return '<article class="card"><h3>'+esc(label)+'</h3><p><strong>Disclosure:</strong> Affiliate link — Carnival Careers may earn a commission at no extra cost to you.</p><p>Free all-in-one business platform for funnels, email, websites, courses and automation.</p><p><a href="'+link+'" rel="sponsored nofollow">'+esc(link)+'</a></p></article>';
}).join("");

fs.writeFileSync(path.join(dist,"systeme-affiliate-share-kit.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Systeme.io Affiliate Share Kit</title><style>body{margin:0;background:#f7f4fb;color:#17131f;font-family:Arial,Helvetica,sans-serif}.w{max-width:980px;margin:auto;padding:48px 20px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.card{padding:18px;border-radius:16px;background:#fff;border:1px solid #e1d8ea}.card p{line-height:1.55;word-break:break-word}.card a{color:#422a91}@media(max-width:700px){.grid{grid-template-columns:1fr}}</style></head><body><main class="w"><h1>Systeme.io affiliate share kit</h1><p>Each link has a separate <code>tk</code> source tag. Keep the disclosure with every promotional post.</p><div class="grid">'+shareRows+'</div></main></body></html>'
);

const indexPath=path.join(dist,"index.html");
let html=fs.readFileSync(indexPath,"utf8");
const module = [
'<style id="cc-systeme-affiliate-style">',
'#cc-systeme-affiliate{margin:30px 0;padding:clamp(22px,4vw,42px);border-radius:26px;background:linear-gradient(135deg,#19112a,#472276 58%,#10324b);color:#fff;box-shadow:0 20px 56px rgba(34,17,58,.20)}',
'#cc-systeme-affiliate .cc-sys-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:24px;align-items:center}',
'#cc-systeme-affiliate h3{margin:8px 0 12px;font-size:clamp(2rem,4.5vw,4rem);line-height:.95;letter-spacing:-.045em}',
'#cc-systeme-affiliate p{color:rgba(255,255,255,.82);line-height:1.6}',
'#cc-systeme-affiliate .cc-sys-tag{font-size:.76rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#ffd15b}',
'#cc-systeme-affiliate .cc-sys-btn{display:inline-flex;align-items:center;justify-content:center;min-height:47px;padding:0 17px;border-radius:999px;background:#ffd15b;color:#21162f!important;text-decoration:none;font-weight:950;margin:5px 7px 0 0}',
'#cc-systeme-affiliate .cc-sys-btn.alt{background:#fff}',
'#cc-systeme-affiliate .cc-sys-disclosure{padding:15px;border-radius:15px;background:rgba(255,255,255,.10);font-size:.84rem}',
'@media(max-width:760px){#cc-systeme-affiliate .cc-sys-grid{grid-template-columns:1fr}}',
'</style>',
'<script id="cc-systeme-affiliate-script">',
'(()=>{',
'const run=()=>{',
'if(document.getElementById("cc-systeme-affiliate"))return;',
'const page=document.getElementById("page-store")||document.getElementById("page-commerce")||document.querySelector("[data-page=\\"store\\"],[data-page=\\"commerce\\"]");',
'if(!page)return;',
'const host=page.querySelector(".wrap,.page-inner,.content,.section-inner,.container")||page;',
'const box=document.createElement("section");box.id="cc-systeme-affiliate";',
'box.innerHTML='+JSON.stringify(
  '<div class="cc-sys-grid"><div><div class="cc-sys-tag">AUTOMATED REVENUE LANE / BUSINESS TOOL</div><h3>Build funnels, email and automation without another pile of subscriptions.</h3><p>Systeme.io offers a free starting tier for websites, funnels, email, courses, affiliate management and business automation.</p><a class="cc-sys-btn" href="'+homepage("cc_commerce_module")+'" target="_blank" rel="sponsored nofollow noopener">Start free</a><a class="cc-sys-btn alt" href="/free-business-tools.html">See the toolkit</a></div><div class="cc-sys-disclosure"><strong>Affiliate disclosure</strong><br>'+disclosure+' No earnings or business results are guaranteed.</div></div>'
)+';',
'host.appendChild(box);',
'};',
'if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true});else run();',
'})();',
'</script>'
].join("");

if(!html.includes('id="cc-systeme-affiliate-script"')){
  html=html.replace("</body>",module+"\n</body>");
  fs.writeFileSync(indexPath,html);
}

const sitemap = [
  "free-business-tools",
  ...seo.map(x=>x[0]),
  ...buyerIntentPages.map(x=>x.slug)
].map(slug=>'  <url><loc>'+site+'/'+slug+'.html</loc></url>').join("\n");

fs.writeFileSync(path.join(dist,"sitemap-systeme-affiliate.xml"),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+sitemap+'\n</urlset>'
);

const verifyPath=path.join(dist,"CANONICAL-BUILD-VERIFIED.json");
if(fs.existsSync(verifyPath)){
  const data=JSON.parse(fs.readFileSync(verifyPath,"utf8"));
  data.systeme_affiliate_funnel=true;
  data.systeme_affiliate_id=affiliateId;
  data.systeme_source_tag_tracking=true;
  data.systeme_affiliate_disclosure=true;
  data.systeme_seo_pages=seo.length+1+buyerIntentPages.length;
  data.systeme_share_channels=shareChannels.length;
  fs.writeFileSync(verifyPath,JSON.stringify(data,null,2));
}


const sitemapIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '  <sitemap><loc>'+site+'/sitemap-systeme-affiliate.xml</loc></sitemap>',
  '  <sitemap><loc>'+site+'/sitemap-pet-commerce.xml</loc></sitemap>',
  '</sitemapindex>'
].join("\n");
fs.writeFileSync(path.join(dist,"sitemap.xml"),sitemapIndex);

let robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "Sitemap: "+site+"/sitemap.xml",
  "Sitemap: "+site+"/sitemap-systeme-affiliate.xml",
  "Sitemap: "+site+"/sitemap-pet-commerce.xml",
  ""
].join("\n");
fs.writeFileSync(path.join(dist,"robots.txt"),robots);

console.log("SYSTEME_AFFILIATE_FUNNEL_GENERATED", seo.length+1+buyerIntentPages.length, "SEO_PAGES", shareChannels.length, "TRACKED_SHARE_LINKS");