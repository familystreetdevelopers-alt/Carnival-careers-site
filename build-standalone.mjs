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

const buffers = [];
for (let i = 0; i < parts.length; i++) {
  const [url, expectedSize] = parts[i];
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Part ${i} download failed: ${res.status} ${res.statusText}`);
  const b = Buffer.from(await res.arrayBuffer());
  if (b.length !== expectedSize) throw new Error(`Part ${i} size mismatch: ${b.length} != ${expectedSize}`);
  buffers.push(b);
  console.log(`Downloaded part ${i}: ${b.length} bytes`);
}

const zipBytes = Buffer.concat(buffers);
const actualSha = crypto.createHash("sha256").update(zipBytes).digest("hex");
console.log("Reconstructed ZIP:", zipBytes.length, "bytes", actualSha);
if (actualSha !== expectedZipSha) {
  throw new Error(`Standalone ZIP SHA mismatch: ${actualSha} != ${expectedZipSha}`);
}

const work = path.resolve(".standalone-build");
const extract = path.join(work, "extract");
const dist = path.resolve("dist");
fs.rmSync(work, { recursive: true, force: true });
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(extract, { recursive: true });

const zip = new AdmZip(zipBytes);
zip.extractAllTo(extract, true);

const entries = fs.readdirSync(extract, { withFileTypes: true });
const dirs = entries.filter(e => e.isDirectory());
const files = entries.filter(e => e.isFile());
let sourceRoot = extract;
if (dirs.length === 1 && files.length === 0) sourceRoot = path.join(extract, dirs[0].name);

fs.cpSync(sourceRoot, dist, { recursive: true });
if (!fs.existsSync(path.join(dist, "index.html"))) throw new Error("Extracted standalone has no root index.html");
console.log("Exact standalone extracted to dist.");
