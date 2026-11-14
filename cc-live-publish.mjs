import fs from 'node:fs';
import path from 'node:path';
const file=path.resolve('cc-live.html'),out=path.resolve('dist/cc-live.html');
if(!fs.existsSync(file))throw new Error('CC LIVE source missing');
const html=fs.readFileSync(file,'utf8');
if(!html.includes('CC LIVE')||!html.includes('ourcarnivalcareers@gmail.com'))throw new Error('CC LIVE page failed check');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,html);
console.log('CC_LIVE_PAGE_PUBLISHED',out);
