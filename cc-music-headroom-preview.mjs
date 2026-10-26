import fs from 'node:fs';
const file='dist/index.html';
let html=fs.readFileSync(file,'utf8');
const anchor='<section class="page recovery-music" data-page="music" id="page-music">';
const a=html.indexOf(anchor),b=html.indexOf('<section class="page" data-page="store"',a);
if(a<0||b<a||!html.includes('The mas brings us together.'))throw Error('Canonical page guard');
const original=html.slice(a,b);
if(original.includes('id="cc-headroom-compare"'))throw Error('Duplicate audio test');
for(let i=0;i<8;i++)if(!original.includes('id="musicSong'+i+'"'))throw Error('Missing song '+i);
const control='<div id="cc-headroom-compare" style="position:relative;z-index:5;display:flex;gap:9px;flex-wrap:wrap;align-items:center;justify-content:center;background:#140d12;color:white;padding:14px;border:1px solid #883d46;margin:0 auto;max-width:950px;font:700 12px Arial"><span style="color:#ffd28a">MUSIC QUALITY A/B TEST · ORIGINAL RECORDINGS PRESERVED</span><button id="cc-audio-balanced" type="button" aria-pressed="true" style="padding:9px;background:#9b1c2e;color:white;border:1px solid #d9b0ac;border-radius:5px;cursor:pointer">Balanced playback</button><button id="cc-audio-original" type="button" aria-pressed="false" style="padding:9px;background:#25171e;color:white;border:1px solid #d9b0ac;border-radius:5px;cursor:pointer">Original sound / instant revert</button><small id="cc-audio-label" style="width:100%;text-align:center;color:#ddd">No tracks re-encoded or replaced</small></div>';
html=html.slice(0,a)+original.replace(anchor,anchor+control)+html.slice(b);
const script=String.raw`<script id="cc-headroom-js">
(()=>{const init=()=>{
const root=document.getElementById('page-music'),gain=[-1.91,-4.96,-5.94,-5.45,-5.98,-4.88,-1.98,-1.83];
const clean=document.getElementById('cc-audio-balanced'),orig=document.getElementById('cc-audio-original'),label=document.getElementById('cc-audio-label');
if(!root||!clean||!orig)return;
const songs=gain.map((_,i)=>root.querySelector('#musicSong'+i));let mode='balanced';
const apply=()=>{
 songs.forEach((a,i)=>{if(a)a.volume=mode==='original'?1:Math.pow(10,gain[i]/20)});
 clean.setAttribute('aria-pressed',String(mode==='balanced'));
 orig.setAttribute('aria-pressed',String(mode==='original'));
 clean.style.background=mode==='balanced'?'#9b1c2e':'#25171e';
 orig.style.background=mode==='original'?'#9b1c2e':'#25171e';
 label.textContent=mode==='original'?'Original playback volume restored.':'Track-specific gain reduction only; source files unchanged.';
};
clean.addEventListener('click',()=>{mode='balanced';apply()});
orig.addEventListener('click',()=>{mode='original';apply()});
songs.forEach(a=>a&&a.addEventListener('play',apply));apply();
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();
</script>`;
if(!html.includes('</body>'))throw Error('Missing body end');
html=html.replace('</body>',script+'</body>');
fs.writeFileSync(file,html,'utf8');
console.log('CC audio gain A/B enabled in preview — originals unchanged');
