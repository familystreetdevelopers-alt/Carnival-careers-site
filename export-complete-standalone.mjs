import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import AdmZip from 'adm-zip';

const root=process.cwd(),dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('Build dist/index.html first');
const zip=new AdmZip(),manifest=[];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const add=(p,buf)=>{
 const data=Buffer.isBuffer(buf)?buf:Buffer.from(buf);
 zip.addFile(p.replaceAll('\\','/'),data);
 manifest.push({path:p,size_bytes:data.length,sha256:sha(data)});
};
const walk=(d,rel='')=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>{
 const p=path.join(d,x.name),n=path.posix.join(rel,x.name);
 return x.isDirectory()?walk(p,n):x.isFile()?[{abs:p,rel:n}]:[];
});
const website=walk(dist);
if(website.length<110)throw Error('Site seems incomplete: '+website.length+' files');
for(const x of website)add('SITE/'+x.rel,fs.readFileSync(x.abs));
const source=execFileSync('git',['ls-files','-z'],{cwd:root}).toString().split('\0').filter(Boolean);
if(source.length<60)throw Error('Source checkout incomplete: '+source.length+' files');
const dedup=[];
for(const name of source){
 if(name.startsWith('music-2026/')&&name.endsWith('.mp3')){
  const input=fs.readFileSync(path.join(root,name)),built=fs.readFileSync(path.join(dist,name));
  if(sha(input)!==sha(built))throw Error('Source audio does not match site audio '+name);
  dedup.push({source:'SOURCE/'+name,identical_copy:'SITE/'+name,sha256:sha(input)});
  continue;
 }
 add('SOURCE/'+name,fs.readFileSync(path.join(root,name)));
}
const audio=website.filter(x=>x.rel.startsWith('music-2026/')&&x.rel.endsWith('.mp3'));
if(audio.length!==8)throw Error('Expected exactly eight live MP3 masters; found '+audio.length);
const index=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(let i=0;i<8;i++)if(!index.includes('id="musicSong'+i+'"'))throw Error('Song '+i+' not in site');
const addText=(name,body)=>add(name,body);
addText('README_START_HERE.txt',`CARNIVAL CAREERS - FULL STANDALONE WEBSITE + SOURCE SNAPSHOT
Source: https://github.com/familystreetdevelopers-alt/Carnival-careers-site
Production: https://carnival-careers-live-current.vercel.app/
Source commit: ${execFileSync('git',['rev-parse','HEAD'],{cwd:root}).toString().trim()}
Generated: ${new Date().toISOString()}

CONTENTS
SITE/       Built website: ALL ${website.length} public files as deployed by current GitHub build.
SOURCE/     ALL ${source.length} Git tracked original source files, with eight duplicate MP3s stored only once under SITE/music-2026. 
MANIFEST/   Checksum inventory, page inventory, media map and external-service record.
START_WEBSITE_WINDOWS.bat   Starts a local webserver on Windows using Python.
START_WEBSITE_MAC_LINUX.sh Starts a local webserver on Mac/Linux with Python.
LOCAL_WEBSITE_SERVER.py     Standalone static server, no npm or external network needed for local viewing.
REBUILD_SOURCE_WINDOWS.bat  Restores the 8 source MP3s from the standalone site and builds from original source.
REBUILD_SOURCE_MAC_LINUX.sh Same for Mac/Linux.

RUN ON WINDOWS
Unzip all files. Double-click START_WEBSITE_WINDOWS.bat. Open http://127.0.0.1:8765/
If Windows cannot find Python, install Python 3 or run 'npx serve SITE' with Node.js.
RUN ON MAC/LINUX
Unzip all files. Run bash START_WEBSITE_MAC_LINUX.sh. Open http://127.0.0.1:8765/

IMPORTANT LIMIT
All public site files, styling, artwork, music, buttons and bundled client code are included.
Live payments, externally hosted forms, sign-ins, APIs, social feeds, third-party websites, outbound emails, banking, booking and remote databases still need their external services and permissions; they cannot be transferred as functional offline backends.
Browser-local data such as saved preferences and form drafts is not present in server files and is not copied.
There are 8 songs currently in the LIVE website. A restored Loud master exists separately in our music workflow, but is NOT part of the public Git checkout, so this archive does not misrepresent Loud as live.
Do not publish your private credentials or finance/customer information in a public ZIP.
`);
addText('LOCAL_WEBSITE_SERVER.py',`#!/usr/bin/env python3
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import os
BASE=Path(__file__).resolve().parent/'SITE'
os.chdir(BASE)
class Handler(SimpleHTTPRequestHandler):
 def do_GET(self):
  from urllib.parse import urlsplit,unquote
  p=unquote(urlsplit(self.path).path)
  if p not in ('','/') and '.' not in Path(p).name and not (BASE/p.lstrip('/')).is_file() and not (BASE/p.lstrip('/')).is_dir():
   self.path='/index.html'
  super().do_GET()
 print #placeholder
`.replace(' print #placeholder\n',''));
addText('START_WEBSITE_WINDOWS.bat',`@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (start "" "http://127.0.0.1:8765/" & py -3 LOCAL_WEBSITE_SERVER.py & exit /b)
where python >nul 2>nul
if %errorlevel%==0 (start "" "http://127.0.0.1:8765/" & python LOCAL_WEBSITE_SERVER.py & exit /b)
echo Python 3 is needed to run this site offline.
pause
`);
addText('START_WEBSITE_MAC_LINUX.sh',`#!/usr/bin/env sh
cd "$(dirname "$0")"
echo 'Open http://127.0.0.1:8765/'
python3 LOCAL_WEBSITE_SERVER.py
`);
addText('REBUILD_SOURCE_WINDOWS.bat',`@echo off
cd /d "%~dp0"
xcopy /Y /Q "SITE\\music-2026\\*.mp3" "SOURCE\\music-2026\\" >nul
cd SOURCE
call npm install
call npm run build
echo Rebuilt website is SOURCE\\dist
pause
`);
addText('REBUILD_SOURCE_MAC_LINUX.sh',`#!/usr/bin/env sh
set -e
cd "$(dirname "$0")"
cp SITE/music-2026/*.mp3 SOURCE/music-2026/
cd SOURCE
npm install
npm run build
echo Rebuilt website is SOURCE/dist
`);
const links=[...index.matchAll(/https?:\/\/[^"'<>\s)]+/g)].map(m=>m[0]).filter(x=>x.length<500);
const domains=[...new Set(links.map(s=>{try{return new URL(s).hostname}catch{return ''}}).filter(Boolean))].sort();
addText('MANIFEST/THIRD_PARTY_DOMAINS.txt',domains.join('\n')+'\n');
addText('MANIFEST/ALL_PUBLIC_HTML_PAGES.txt',website.filter(x=>x.rel.endsWith('.html')).map(x=>x.rel).sort().join('\n')+'\n');
addText('MANIFEST/AUDIO_DEDUPLICATION.json',JSON.stringify(dedup,null,2));
addText('MANIFEST/EXTERNAL_SERVICES.txt',`Domains referenced from canonical site: ${domains.length}. See THIRD_PARTY_DOMAINS.txt.
External websites, mailing, forms, merchants, calendars, donation/checkouts, Google resources, socials and any API calls require internet access and active third-party accounts.
Service-side databases, contact submissions and browser-local states are not in this GitHub website source and cannot be cloned into a local static file.
This ZIP includes NO private finance records, contact databases, secret tokens, or user accounts beyond information already published in the site's source repository.
`);
addText('MANIFEST/SNAPSHOT.json',JSON.stringify({repository:'familystreetdevelopers-alt/Carnival-careers-site',commit:execFileSync('git',['rev-parse','HEAD'],{cwd:root}).toString().trim(),built_site_files:website.length,tracked_source_files:source.length,live_audio_tracks:audio.length,duplicate_source_audio_referenced:dedup.length,external_domains:domains,files:manifest},null,2));
const out=path.join(dist,'CARNIVAL_CAREERS_COMPLETE_STANDALONE_2026-10-21.zip');
zip.writeZip(out);
const size=fs.statSync(out).size;
if(size<20000000||size>95000000)throw Error('Unexpected archive size '+size);
const check=new AdmZip(out);
if(check.getEntry('SITE/index.html')===null||check.getEntry('SOURCE/index.html')===null||check.getEntry('README_START_HERE.txt')===null)throw Error('ZIP missing required content');
console.log(JSON.stringify({event:'COMPLETE_STANDALONE_EXPORT_READY',zip:path.basename(out),bytes:size,siteFiles:website.length,sourceFiles:source.length,audioTracks:audio.length,externalDomains:domains.length}));
