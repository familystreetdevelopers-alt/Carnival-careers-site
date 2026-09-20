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

const shopUrl =
  "https://wase0y-fi.myshopify.com/collections/trending-pet-picks" +
  "?utm_source=carnivalcareers&utm_medium=website&utm_campaign=trending_pet_picks";

const trafficFunnel = `
<!-- CARNIVAL CAREERS -> SHOPIFY TRAFFIC FUNNEL -->
<style id="cc-shopify-traffic-style">
  #cc-shopify-traffic {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 2147483000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    padding: 0 20px;
    border-radius: 999px;
    background: #e30613;
    color: #fff !important;
    font: 800 14px/1.1 Arial, Helvetica, sans-serif;
    letter-spacing: .04em;
    text-transform: uppercase;
    text-decoration: none !important;
    box-shadow: 0 10px 30px rgba(0,0,0,.35);
    border: 2px solid rgba(255,255,255,.88);
  }
  #cc-shopify-traffic:hover,
  #cc-shopify-traffic:focus {
    transform: translateY(-1px);
    filter: brightness(1.06);
    outline: none;
  }
  @media (max-width: 640px) {
    #cc-shopify-traffic {
      right: 12px;
      bottom: 12px;
      min-height: 46px;
      padding: 0 16px;
      font-size: 12px;
    }
  }
</style>
<a
  id="cc-shopify-traffic"
  href="${shopUrl}"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Shop Trending Pet Picks"
>Shop Trending Pet Picks</a>
<!-- /CARNIVAL CAREERS -> SHOPIFY TRAFFIC FUNNEL -->
`;

let renderedHtml = canonicalHtml;
if (!renderedHtml.includes('id="cc-shopify-traffic"')) {
  if (!renderedHtml.includes("</body>")) {
    throw new Error("Canonical HTML is missing </body>; traffic funnel was not injected.");
  }
  renderedHtml = renderedHtml.replace("</body>", `${trafficFunnel}\n</body>`);
}

fs.writeFileSync(path.join(dist, "index.html"), renderedHtml);
fs.writeFileSync(
  path.join(dist, "CANONICAL-BUILD-VERIFIED.json"),
  JSON.stringify(
    {
      canonical_html_from_github: true,
      canonical_html_bytes: Buffer.byteLength(canonicalHtml),
      canonical_html_sha256: crypto.createHash("sha256").update(canonicalHtml).digest("hex"),
      rendered_html_bytes: Buffer.byteLength(renderedHtml),
      rendered_html_sha256: crypto.createHash("sha256").update(renderedHtml).digest("hex"),
      external_asset_rewrite: true,
      shopify_traffic_funnel: true,
      shopify_campaign: "trending_pet_picks"
    },
    null,
    2
  )
);

console.log(
  "CANONICAL_STATIC_BUILD_VERIFIED",
  Buffer.byteLength(renderedHtml),
  "SHOPIFY_TRAFFIC_FUNNEL=ON"
);
