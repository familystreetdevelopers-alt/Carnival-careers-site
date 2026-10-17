import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// Only changes the Music section of the static build. Canonical art file and
// existing button coordinates remain intact. Rollback branch is pinned.
const tracks = [{"title":"Who You Want It To Be","duration":"3:50","file":"who-you-want-it-to-be.mp3","sha":"b9795f1946365f969e937d9a27add5b03c566fefb0eb2616686b9cb4c1e9184b","old":"She Jumbo","oldfile":"she-jumbo.mp3"},{"title":"Cold Water","duration":"2:06","file":"cold-water.mp3","sha":"475cc9696a8559ceb9600ad12c842a15b0ef41bb4fb8b00319277840d753d078","old":"Public Enemy #1","oldfile":"public-enemy-1.mp3"},{"title":"The Bounce Gone","duration":"2:02","file":"the-bounce-gone.mp3","sha":"2b152bf8738a01eeec6fb6175472807743092750c1664cc361a02cb9e334ca50","old":"Failing Up","oldfile":"failing-up.mp3"},{"title":"John Wick","duration":"3:52","file":"john-wick.mp3","sha":"6b298501da7f9e1ffe8339f97eaa1a0acf0ca98888c1b7cd23983a0134100093","old":"Stacks","oldfile":"stacks.mp3"},{"title":"Love Eternally","duration":"3:44","file":"love-eternally.mp3","sha":"f5c5aa7aa3ad9cd001ab4b8e168fc4ab2f2c4e25b6776e6090d84e66d69544d9","old":"Big Money Mi Seh","oldfile":"big-money-mi-seh.mp3"},{"title":"Pool Party 2","duration":"3:19","file":"pool-party-2.mp3","sha":"1c99c2b34032475d61106dfce78088523b6d951d32f48ca179fc55f4d4f3117e"},{"title":"Strength of We Bloodline","duration":"2:05","file":"strength-of-we-bloodline.mp3","sha":"44fec068219c437c836f4e273cfd41f0025ce3cadabbdaedb96e12476a6cb9ee"},{"title":"Stuck In The Middle","duration":"3:12","file":"stuck-in-the-middle.mp3","sha":"9743b4d2914145ec54eb294cd336b8480ae595301497dbfd23f1545e6954a926"}];
const root = path.resolve(".");
const dist = path.resolve("dist");
const filename = path.join(dist, "index.html");
if (!fs.existsSync(filename)) throw new Error("Built homepage is missing.");
let html = fs.readFileSync(filename, "utf8");
const musicStart = html.indexOf('<section class="page recovery-music" data-page="music" id="page-music">');
const musicEnd = html.indexOf('<section class="page" data-page="store"', musicStart);
if(musicStart<0||musicEnd<musicStart)throw new Error("Music page boundaries changed; refusing unsafe edit.");
if(!html.includes("The mas brings us together.")) throw new Error("Canonical Home copy changed; refusing edit.");
const music = html.slice(musicStart, musicEnd);
if(music.includes('id="cc-2026-song-labels"'))throw new Error("Surgical Music patch already applied; refusing duplicate.");
const target = path.join(dist, "music-2026");
fs.mkdirSync(target,{recursive:true});
for(const item of tracks){
  const src = path.join(root,"music-2026",item.file);
  const out = path.join(target,item.file);
  if(!fs.existsSync(src))throw new Error("Missing original music master: "+item.file);
  const sha = crypto.createHash("sha256").update(fs.readFileSync(src)).digest("hex");
  if(sha!==item.sha)throw new Error("Master checksum mismatch: "+item.file);
  fs.copyFileSync(src,out);
}
let changed = music;
for (let i=0;i<5;i++){
  const t=tracks[i];
  const before='<article><b>'+t.old+'</b><audio controls="" id="musicSong'+i+'" preload="auto" src="assets/audio/music/'+t.oldfile+'"></audio></article>';
  const after='<article><b>'+t.title+'</b><audio controls="" id="musicSong'+i+'" preload="auto" src="/music-2026/'+t.file+'"></audio></article>';
  if(changed.split(before).length!==2)throw new Error("Song slot markup drift at index "+i);
  changed=changed.replace(before,after);
  changed=changed.replace('aria-label="Play '+t.old+' from Listen Now"', 'aria-label="Play '+t.title+' from Listen Now"');
  changed=changed.replace('aria-label="Play '+t.old+'"', 'aria-label="Play '+t.title+'"');
}
const lastOld='<article><b>'+tracks[4].title+'</b><audio controls="" id="musicSong4" preload="auto" src="/music-2026/'+tracks[4].file+'"></audio></article>';
if(changed.split(lastOld).length!==2)throw new Error("Last song card changed before adding three.");
const extras=tracks.slice(5).map((t,j)=>'<article><b>'+t.title+'</b><audio controls="" id="musicSong'+(j+5)+'" preload="auto" src="/music-2026/'+t.file+'"></audio></article>').join("\n");
changed=changed.replace(lastOld,lastOld+"\n"+extras);

// Overlay only the lettering burned into the five existing illustrated cards.
// The original embedded image, card artwork, play hotspots, X/Y and beat panel
// remain byte-for-byte unchanged.
const esc=(s)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const x=[135,380,628,875,1130];
const labels=tracks.slice(0,5).map((t,i)=>{
  const titleSize=t.title.length>19?8.0:(t.title.length>15?8.8:10.0);
  const nameWidth=t.title.length>19?117:116;
  return '<g data-song-slot="'+i+'">'+
    '<rect x="'+(x[i]-2)+'" y="392" width="'+nameWidth+'" height="17" rx="2" fill="#111215" />'+
    '<text x="'+x[i]+'" y="404" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="'+titleSize+'">'+esc(t.title)+'</text>'+
    '<rect x="'+(x[i]-2)+'" y="420" width="99" height="18" rx="2" fill="#111215" />'+
    '<text x="'+x[i]+'" y="433" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="9.8">0:00 / '+t.duration+'</text>'+
    '</g>';
}).join("");
const svg='<svg id="cc-2026-song-labels" aria-hidden="true" viewBox="0 0 1402 1122" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'+labels+'</svg>';
const imgRe=/(<img alt="Carnival Careers Music Dashboard artwork" class="music-art" src="data:image\/png;base64,[A-Za-z0-9+/=]+"\s*\/?>)/;
const imgMatch=changed.match(imgRe);
if(!imgMatch) throw new Error("Original artwork marker changed; refusing edit.");
const artBefore=imgMatch[1];
changed=changed.replace(imgRe,'$1\n'+svg);
if(!changed.includes(artBefore))throw new Error("Artwork source changed during replacement.");

const oldNames="const songNames=['She Jumbo','Public Enemy #1','Failing Up','Stacks','Big Money Mi Seh'],beatNames=";
const newNames="const songNames="+JSON.stringify(tracks.slice(0,5).map(x=>x.title))+",beatNames=";
if(!html.includes(oldNames))throw new Error("Original play-button title map changed.");
html=html.replace(oldNames,newNames);
const oldProof="const labels={musicSong0:'3:22',musicSong1:'1:45',musicSong2:'3:20',musicSong3:'2:40',musicSong4:'3:29',musicBeat0:'1:45',musicBeat1:'2:46',musicBeat2:'1:54'};";
const proof="const labels={"+tracks.map((t,i)=>'musicSong'+i+':'+JSON.stringify(t.duration)).join(",")+",musicBeat0:'1:45',musicBeat1:'2:46',musicBeat2:'1:54'};";
if(!html.includes(oldProof))throw new Error("Original media-duration script changed.");
html=html.replace(oldProof,proof);
html=html.replace(music,changed);
const css='<style id="cc-2026-music-surgical-css">#page-music #cc-2026-song-labels{position:absolute;inset:0;width:100%;height:100%;z-index:7;pointer-events:none;display:block;overflow:visible}#page-music .song-hot{z-index:8}</style>';
if(!html.includes("</head>"))throw new Error("Head missing.");
html=html.replace("</head>",css+"\n</head>");
if((html.match(/id="cc-2026-song-labels"/g)||[]).length!==1)throw new Error("Multiple song overlays detected.");
for(let i=0;i<8;i++){
 if(!html.includes('id="musicSong'+i+'"'))throw new Error("Missing new track "+i);
}
fs.writeFileSync(filename,html,"utf8");
console.log("SURGICAL_MUSIC_2026_COMPLETE: eight original masters; five fixed image positions; three modal-only tracks; no original artwork or hotspot-coordinate changes.");
