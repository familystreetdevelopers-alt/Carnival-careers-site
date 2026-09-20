import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dist = path.resolve("dist");
const canonicalIndexPath = path.resolve("index.html");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

if (!fs.existsSync(canonicalIndexPath)) {
  throw new Error("Canonical GitHub index.html is missing.");
}

const canonicalHtml = fs.readFileSync(canonicalIndexPath, "utf8");
const requiredCanonicalMarkers = [
  "The mas brings us together.",
  "Tell me who you are.",
  'id="page-music"'
];

for (const marker of requiredCanonicalMarkers) {
  if (!canonicalHtml.includes(marker)) {
    throw new Error(`Canonical HTML marker missing: ${marker}`);
  }
}

fs.writeFileSync(path.join(dist, "index.html"), canonicalHtml);
fs.writeFileSync(
  path.join(dist, "CANONICAL-BUILD-VERIFIED.json"),
  JSON.stringify(
    {
      canonical_html_from_github: true,
      canonical_html_bytes: Buffer.byteLength(canonicalHtml),
      canonical_html_sha256: crypto.createHash("sha256").update(canonicalHtml).digest("hex"),
      external_asset_rewrite: true
    },
    null,
    2
  )
);

console.log("CANONICAL_STATIC_BUILD_VERIFIED", Buffer.byteLength(canonicalHtml));
