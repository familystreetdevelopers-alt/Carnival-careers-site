import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import AdmZip from "adm-zip";

const parts = [
  ["https://at.adobe.com/RFlU94brzB44xccL", 20971520],
  ["https://at.adobe.com/jkLrtWtaPNJfgt5Z", 20971520],
  ["https://at.adobe.com/4mxvVciEiTkmdVoc", 20971520],
  ["https://at.adobe.com/aB2ls4vlovsmOCwN", 20971520],
  ["https://at.adobe.com/AH4K36U89syT6Y9p", 20971520],
  ["https://at.adobe.com/8wovuPGoCGGeRPXr", 20971520],
  ["https://at.adobe.com/4JUxGTHsObXHAs8z", 20971520],
  ["https://at.adobe.com/gS28AdyLcDS2i9fb", 14576197]
];
const expectedZipSha = "4cd39ae4eee215a75ebf0b2b920626ee0cd88eb0cb0315b4cf4ddd69afeb78d7";
const expectedVideoSha = "949dc3663a11755c98cc4cbdb5d2b60f352a5a1f42ef4f68751b4f9e55f4a7bc";
const expectedVideoSize = 104934221;

const buffers = [];
for (let i = 0; i < parts.length; i++) {
  const [url, expectedSize] = parts[i];
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Part ${i} download failed: ${res.status} ${res.statusText}`);
  const b = Buffer.from(await res.arrayBuffer());
  if (b.length !== expectedSize) throw new Error(`Part ${i} size mismatch: ${b.length} != ${expectedSize}`);
  buffers.push(b);
}

const zipBytes = Buffer.concat(buffers);
const actualZipSha = crypto.createHash("sha256").update(zipBytes).digest("hex");
if (actualZipSha !== expectedZipSha) throw new Error(`Standalone ZIP SHA mismatch: ${actualZipSha}`);

const work = path.resolve(".standalone-build");
const extract = path.join(work, "extract");
const dist = path.resolve("dist");
fs.rmSync(work, { recursive: true, force: true });
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(extract, { recursive: true });

new AdmZip(zipBytes).extractAllTo(extract, true);
const entries = fs.readdirSync(extract, { withFileTypes: true });
const dirs = entries.filter(e => e.isDirectory());
const files = entries.filter(e => e.isFile());
let sourceRoot = extract;
if (dirs.length === 1 && files.length === 0) sourceRoot = path.join(extract, dirs[0].name);

fs.cpSync(sourceRoot, dist, { recursive: true });
if (!fs.existsSync(path.join(dist, "index.html"))) throw new Error("Extracted standalone has no root index.html");

const homeIndexPath = path.join(dist, "index.html");
let homeHtml = fs.readFileSync(homeIndexPath, "utf8");
const homeStoryMarker = `</section>
<section class="section recovery-route-section">
<div class="wrap">
<div class="eyebrow darkey">MONEY ROUTES</div>`;
const homeStoryBlock = `</section>
<section class="section" id="home-host-experience" style="background:#ffffff;color:#111827;">
<div class="wrap" style="max-width:1180px;">
<div class="eyebrow darkey">ONE CITY · ONE FULL STORY</div>
<h2 style="font-size:clamp(35px,4vw,62px);letter-spacing:-.04em;margin-bottom:22px;">What the hosts experience in one episode.</h2>
<p style="max-width:1080px;font-size:clamp(17px,1.55vw,21px);line-height:1.75;color:#4b5563;margin:0;">In each city, the hosts arrive as the audience’s guides into a complete Carnival Careers story: they meet the selected family and local workers, spend time with them at a major women’s sports game as part of the city experience, move through the arena with the cast while capturing the energy of the fans, merchandise, food, sponsors and game-day economy, then sit down together for the family dinner inside the arena restaurant, where the personal story, ambitions and challenges of the family become the emotional foundation of the episode. From there, the hosts follow the family through the housing journey—property selection, design decisions, construction or renovation, employment and ownership planning—while also participating in the city’s transit activation, City Hall and community moments, Carnival and cultural experiences, rehearsals and behind-the-scenes television production. The episode builds toward the completed home reveal and then the arena concert, where the same hosts who spent the week getting to know the family now bring that story in front of thousands of people, connecting the family, the city, the sports organization, artists, sponsors and audience into one continuous experience. By the time they leave the city, the hosts have not simply presented a concert or interviewed a family; they have lived through the city with them, attended its games, eaten together, watched a home and employment pathway take shape, participated in its culture, and carried the entire story from the first introduction to the final arena stage.</p>
</div>
</section>
<section class="section recovery-route-section">
<div class="wrap">
<div class="eyebrow darkey">MONEY ROUTES</div>`;

if (!homeHtml.includes(homeStoryMarker)) throw new Error("Home story insertion point not found");
homeHtml = homeHtml.replace(homeStoryMarker, homeStoryBlock);
fs.writeFileSync(homeIndexPath, homeHtml);


const videoPath = path.join(dist, "assets/video/carnival-careers.mp4");
const videoBytes = fs.readFileSync(videoPath);
const actualVideoSha = crypto.createHash("sha256").update(videoBytes).digest("hex");
if (videoBytes.length !== expectedVideoSize) throw new Error(`Video size mismatch: ${videoBytes.length}`);
if (actualVideoSha !== expectedVideoSha) throw new Error(`Video SHA mismatch: ${actualVideoSha}`);

fs.writeFileSync(path.join(dist, "STANDALONE-BUILD-VERIFIED.json"), JSON.stringify({
  zip_sha256: actualZipSha,
  zip_bytes: zipBytes.length,
  video_sha256: actualVideoSha,
  video_bytes: videoBytes.length,
  exact_uploaded_standalone: true
}, null, 2));

console.log("EXACT_STANDALONE_VERIFIED", actualZipSha, actualVideoSha, videoBytes.length);
