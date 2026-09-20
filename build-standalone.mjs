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

const canonicalIndexPath = path.resolve("index.html");
if (!fs.existsSync(canonicalIndexPath)) throw new Error("Canonical GitHub index.html is missing.");
const canonicalHtml = fs.readFileSync(canonicalIndexPath, "utf8");
const requiredCanonicalMarkers = [
  "The mas brings us together.",
  "Tell me who you are.",
  'id="page-music"'
];
for (const marker of requiredCanonicalMarkers) {
  if (!canonicalHtml.includes(marker)) throw new Error(`Canonical HTML marker missing: ${marker}`);
}
fs.writeFileSync(path.join(dist, "index.html"), canonicalHtml);

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
  exact_uploaded_standalone: true,\n  canonical_html_from_github: true,\n  canonical_html_bytes: Buffer.byteLength(canonicalHtml)
}, null, 2));

console.log("EXACT_STANDALONE_VERIFIED", actualZipSha, actualVideoSha, videoBytes.length);
