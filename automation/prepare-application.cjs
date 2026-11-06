// CC application assistant: generic, best-effort browser form preparation.
// Requires Playwright, runs on GitHub Actions. Never submits.
const { chromium } = require('playwright');
const fs = require('node:fs');
const { URL } = require('node:url');
(async () => {
 const target=process.env.APPLICATION_URL;
 const u=new URL(target);
 if(u.protocol!=='https:' || u.username || u.password) throw Error('Official HTTPS URL required');
 const fields=JSON.parse(process.env.CC_APPLICATION_FIELDS_JSON||'{}');
 if(!fields || typeof fields!=='object' || Array.isArray(fields)) throw Error('Field map must be JSON object');
 fs.mkdirSync('application-output',{recursive:true});
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:false});
 let result={url:target,status:'NOT SUBMITTED',fields:[],warnings:[],final_url:null};
 try {
  await page.goto(target,{waitUntil:'domcontentloaded',timeout:45000});
  result.final_url=page.url();
  const inputs=await page.locator('input, textarea, select').evaluateAll(nodes=>nodes.map((n,i)=>({index:i,tag:n.tagName.toLowerCase(),type:n.type||'',name:n.name||'',id:n.id||'',placeholder:n.placeholder||'',label:n.labels?.[0]?.innerText||'',required:n.required})).filter(x=>!['hidden','password','file','submit','button','checkbox','radio'].includes(x.type)));
  result.detected_fields=inputs;
  for(const [key,value] of Object.entries(fields)){
   if(typeof value!=='string' && typeof value!=='number'){result.warnings.push('Skipped non-scalar field '+key);continue;}
   const matches=inputs.filter(x=>[x.name,x.id,x.label,x.placeholder].some(v=>String(v||'').toLowerCase()===key.toLowerCase()));
   if(matches.length!==1){result.fields.push({key,status:matches.length?'AMBIGUOUS':'NOT FOUND'});continue;}
   const match=matches[0], el=page.locator('input, textarea, select').nth(match.index);
   try { if(match.tag==='select') await el.selectOption({label:String(value)}); else await el.fill(String(value)); result.fields.push({key,status:'FILLED'}); }
   catch(e){result.fields.push({key,status:'FAILED',reason:String(e).slice(0,150)});}
  }
  // No screenshot: public-repository artifacts must not expose applicant information.
 }catch(e){result.warnings.push(String(e));}
 finally{
  // Never include submitted values in the public log or artifact.
  fs.writeFileSync('application-output/status.json',JSON.stringify(result,null,2));
  console.log('Application preparation status:',result.status,'fields:',result.fields.length);
  await browser.close();
 }
})().catch(e=>{console.error('Application preparation failed:',e.message);process.exitCode=1;});
