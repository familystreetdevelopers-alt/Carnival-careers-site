import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const dist=path.join(root,'dist');
const indexPath=path.join(dist,'index.html');
const sourcePath=path.join(root,'earn-with-cc.html');
if(!fs.existsSync(indexPath) || !fs.existsSync(sourcePath)) throw Error('Canonical site and affiliate hub must exist');
const affiliatePage=fs.readFileSync(sourcePath,'utf8');
const required=['https://villiers.ai/?id=4XEAEP','https://systeme.io/?sa=sa0106982963ec9fa81e5169cba06a5e5e8eadcf2e','Trip.com · affiliate not activated','Travelpayouts · tracked tools not published','/cc-connect.html#join'];
for(const marker of required) if(!affiliatePage.includes(marker)) throw Error('Missing verified affiliate hub marker: '+marker);
fs.writeFileSync(path.join(dist,'earn-with-cc.html'),affiliatePage,'utf8');

const status={
  updated:'2026-11-16',
  canonical:'https://carnival-careers-live-current.vercel.app/earn-with-cc.html',
  revenue_rule:'Only the provider dashboard or a settled payment establishes earned affiliate revenue.',
  owner_side_confirmed:[
    {provider:'Villiers',status:'active',program:'whole-aircraft charter',tracking_id:'4XEAEP',source:'Affiliate welcome email and provider correspondence'},
    {provider:'Systeme.io',status:'active',program:'business tools',source:'Affiliate welcome email and existing production builder'}
  ],
  awaiting_tracking_or_activation:[
    {provider:'Travelpayouts',status:'account activation and project-connected emails found; project tools and tracking not yet verified'},
    {provider:'Trip.com',status:'no activated account under either requested email; no official tracked link'},
    {provider:'FareHarbor',status:'invited to apply; approval not verified'},
    {provider:'Zoho',status:'affiliate training and partner follow-up received; official tracking link not verified'},
    {provider:'Oceanic Entertainment',status:'past 2026 event links expired; new event-specific links required'}
  ],
  patron_rule:'No automatic sub-affiliate commissions or patron payouts without provider permission, issued identity, written agreement and verified commission.',
  collected_revenue_cad:null
};
fs.writeFileSync(path.join(dist,'cc-affiliate-status.json'),JSON.stringify(status,null,2)+'\n','utf8');

let html=fs.readFileSync(indexPath,'utf8');
if(!html.includes('The mas brings us together.') || !html.includes('id="page-music"'))throw Error('Canonical home guard failed; refusing nav edit');
const hook=[
'<script id="cc-universe-earn-nav">',
"(()=>{function add(){",
" const nav=document.querySelector('nav[aria-label=\"Primary\"]');",
" if(nav&&!nav.querySelector('[data-cc-earn-nav]')){",
"   const a=document.createElement('a');a.href='/earn-with-cc.html';a.textContent='Earn with CC';",
"   a.setAttribute('data-cc-earn-nav','');a.style.cssText='color:#ffca71;font-weight:900';",
"   nav.appendChild(a);",
" }",
" const mobile=document.getElementById('mobilePanel');",
" if(mobile&&!mobile.querySelector('[data-cc-earn-mobile]')){",
"   const a=document.createElement('a');a.href='/earn-with-cc.html';a.textContent='Earn with CC';",
"   a.setAttribute('data-cc-earn-mobile','');mobile.appendChild(a);",
" }",
"}",
"if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();",
"window.addEventListener('hashchange',add);",
"})();",
"</script>"
].join('\n');
if(!html.includes('id="cc-universe-earn-nav"')){
 if(!html.includes('</body>'))throw Error('Canonical home missing closing body');
 html=html.replace('</body>',hook+'\n</body>');
 fs.writeFileSync(indexPath,html,'utf8');
}
console.log('CC_AFFILIATE_HUB_PUBLISHED active=2 pending=4 home_copy_unchanged=true');