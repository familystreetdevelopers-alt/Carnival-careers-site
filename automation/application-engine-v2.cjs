'use strict';
const { chromium } = require('playwright');
const fs = require('node:fs');
const { URL } = require('node:url');

async function main() {
  const target = process.env.APPLICATION_URL;
  const url = new URL(target);
  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) throw Error('Official HTTPS URL required');
  const fields = JSON.parse(process.env.CC_APPLICATION_FIELDS_JSON || '{}');
  if (!fields || Array.isArray(fields) || typeof fields !== 'object') throw Error('Invalid applicant profile');
  const mapping = JSON.parse(process.env.CC_APPLICATION_MAPPING_JSON || '{}');
  const submit = process.env.CC_SUBMIT_APPROVED === 'true';
  const expectedDomain = process.env.CC_APPROVED_DOMAIN || '';
  if (submit && (!expectedDomain || expectedDomain !== url.hostname)) throw Error('Submission requires exact domain approval');
  fs.mkdirSync('application-output', { recursive:true });
  const result = { requested_url:target, status:'NOT SUBMITTED', filled:[], missing:[], needs_review:[], confirmation:null };
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({acceptDownloads:false});
  try {
    await page.goto(target,{waitUntil:'domcontentloaded',timeout:45000});
    if (page.url().startsWith('http:')) throw Error('Insecure redirect');
    const controls = page.locator('input, textarea, select');
    const inputs = await controls.evaluateAll(nodes=>nodes.map((n,i)=>({
      index:i, tag:n.tagName.toLowerCase(), type:(n.type||'').toLowerCase(),
      name:n.name||'', id:n.id||'', placeholder:n.placeholder||'',
      label:n.labels?.[0]?.innerText||'', required:!!n.required
    })).filter(x=>!['hidden','password','file','submit','button','checkbox','radio'].includes(x.type)));
    result.detected_fields = inputs;
    for (const [field,value] of Object.entries(fields)) {
      if (!['string','number'].includes(typeof value)) continue;
      const key = String(mapping[field] || field).toLowerCase().trim();
      const matches = inputs.filter(x=>[x.name,x.id,x.placeholder,x.label].some(v=>String(v).toLowerCase().trim()===key));
      if (matches.length!==1) {result.missing.push({field,reason:matches.length?'ambiguous':'not found'});continue;}
      const match=matches[0], el=controls.nth(match.index);
      try {
        if(match.tag==='select') await el.selectOption({label:String(value)});
        else await el.fill(String(value));
        result.filled.push(field);
      } catch(e) {result.missing.push({field,reason:'could not fill'});}
    }
    const auth = await page.locator('input[type="password"], iframe[src*="captcha"], [class*="captcha"], [id*="captcha"]').count();
    const missingRequired=inputs.filter(x=>x.required&&!result.filled.some(k=>{
      const key=String(mapping[k]||k).toLowerCase().trim();
      return [x.name,x.id,x.placeholder,x.label].some(v=>String(v).toLowerCase().trim()===key);
    }));
    if(auth) result.needs_review.push('Login or human verification required');
    if(missingRequired.length) result.needs_review.push('Required fields remain unfilled');
    if(submit && !auth && !missingRequired.length && !result.missing.length) {
      // Do not click an ambiguous or payment-related button.
      const buttons=page.locator('button[type="submit"],input[type="submit"]');
      if(await buttons.count()!==1) result.needs_review.push('Submission control ambiguous');
      else {
        const button=buttons.first();
        const label=((await button.innerText().catch(()=>'')) || (await button.getAttribute('value')) || '').trim();
        if(!/^(submit|submit application|send application|apply now)$/i.test(label)) result.needs_review.push('Submission button requires manual review');
        else {
          await button.click({timeout:10000});
          await page.waitForLoadState('domcontentloaded',{timeout:15000}).catch(()=>{});
          const body=(await page.locator('body').innerText()).slice(0,12000);
          const confirmation=body.match(/(?:confirmation|reference|application)\s*(?:number|id|#|code)\s*[:#]?\s*([A-Z0-9-]{5,40})/i);
          if(confirmation) {result.status='SUBMITTED — CONFIRMATION DETECTED';result.confirmation='DETECTED — REDACTED';}
          else {result.status='SUBMISSION CLICKED — NOT VERIFIED';result.needs_review.push('No confirmation identifier detected');}
        }
      }
    }
    if(!submit) result.needs_review.push('Awaiting explicit submission approval');
    result.final_url=page.url();
  } catch(e) {result.needs_review.push('Browser error: '+String(e.message).slice(0,160));}
  finally {
    fs.writeFileSync('application-output/status.json',JSON.stringify(result,null,2));
    await browser.close();
  }
  if(result.needs_review.length) console.log('Needs review:',result.needs_review.join('; '));
  console.log('Status:',result.status,'Fields filled:',result.filled.length);
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
