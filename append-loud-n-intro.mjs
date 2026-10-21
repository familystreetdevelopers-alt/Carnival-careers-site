import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Song-only final stage. Until the original MP3 exists in music-2026/, do nothing.
// This preserves the live site unchanged while the audio asset is being transferred.
const file='Loud_n_intro_RESTORED_FORMULA_MASTER_320.mp3';
const src=path.resolve('music-2026',file);
if(!fs.existsSync(src)){console.log('LOUD pending: MP3 not yet hosted; site unchanged.');process.exit(0)}
const sha=crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
if(sha!=='364b4fa101ea8f5dc463b68ae0d13fe594e75370e2652153ad0a29eb2a81f8b1')throw Error('Incorrect LOUD master; refusing update');
const htmlPath=path.resolve('dist/index.html');
let html=fs.readFileSync(htmlPath,'utf8');
if(!html.includes('The mas brings us together.'))throw Error('Home copy mismatch');
const start=html.indexOf('<section class="page recovery-music" data-page="music" id="page-music">');
const end=html.indexOf('<section class="page" data-page="store"',start);
if(start<0||end<start)throw Error('Music page boundaries changed');
let music=html.slice(start,end);
if(music.includes('id="musicSong8"'))throw Error('Track already added');
const tracks=['Who You Want It To Be','Cold Water','The Bounce Gone','John Wick','Love Eternally','Pool Party 2','Strength of We Bloodline','Stuck In The Middle'];
const existing=[...music.matchAll(/<article><b>([^<]+)<\/b><audio controls="" id="musicSong(\d+)"/g)];
if(existing.length!==8||existing.some((m,i)=>m[1]!==tracks[i]||Number(m[2])!==i))throw Error('Song list/order changed');
const oldCard=/(<article><b>Stuck In The Middle<\/b><audio controls="" id="musicSong7"[^>]*><\/audio><\/article>)/g;
if([...music.matchAll(oldCard)].length!==1)throw Error('Last song card mismatch');
music=music.replace(oldCard,'$1\n<article><b>Loud n intro</b><audio controls="" id="musicSong8" preload="auto" src="/music-2026/'+file+'"></audio></article>');
const lastMobile=/(<button type="button" class="ccm-track" data-ccm-song="7"[\s\S]*?<\/button>)/g;
if([...music.matchAll(lastMobile)].length!==1)throw Error('Last mobile song mismatch');
const button=[
'<button type="button" class="ccm-track" data-ccm-song="8" aria-pressed="false" aria-label="Play Loud n intro, 3:38">',
'<span class="ccm-number">09</span>',
'<span class="ccm-track-title">Loud n intro</span>',
'<span class="ccm-length">3:38</span>',
'<span class="ccm-play-icon" aria-hidden="true">▶</span>',
'</button>'].join('\n');
music=music.replace(lastMobile,'$1\n'+button);
if(!music.includes('Eight full-length tracks.')||!music.includes('aria-label="Eight full-length songs"'))throw Error('Mobile track count marker changed');
music=music.replace('Eight full-length tracks.','Nine full-length tracks.').replace('aria-label="Eight full-length songs"','aria-label="Nine full-length songs"');
html=html.slice(0,start)+music+html.slice(end);
const oldDuration='musicSong7:"3:12",musicBeat0:';
if(!html.includes(oldDuration))throw Error('Duration map changed');
html=html.replace(oldDuration,'musicSong7:"3:12",musicSong8:"3:38",musicBeat0:');
const dest=path.resolve('dist/music-2026',file);
fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);
fs.writeFileSync(htmlPath,html,'utf8');
console.log('LOUD added as ninth song; previous eight and every other page unchanged.');
