import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dist = path.resolve("dist");
const canonicalIndexPath = path.resolve("index.html");
const pressKitPath = path.resolve("pet-picks-press.html");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

if (!fs.existsSync(canonicalIndexPath)) {
  throw new Error("Canonical GitHub index.html is missing.");
}
if (!fs.existsSync(pressKitPath)) {
  throw new Error("Pet Picks press kit is missing.");
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


const contrastGuard = `
<!-- CARNIVAL CAREERS LEGIBILITY GUARD: ONLY LIGHT TEXT ON LIGHT SOLID BACKGROUNDS -->
<style id="cc-legibility-guard-style">
  [data-cc-contrast-fixed="1"] {
    color: #171717 !important;
    text-shadow: none !important;
  }
</style>
<script id="cc-legibility-guard-script">
(() => {
  const CANDIDATES = "h1,h2,h3,h4,h5,h6,p,a,span,li,dt,dd,label,strong,em,small,button,summary,figcaption,blockquote";
  const parseRgb = (value) => {
    const m = String(value || "").match(/rgba?\\(([^)]+)\\)/i);
    if (!m) return null;
    const parts = m[1].split(",").map(v => Number.parseFloat(v.trim()));
    if (parts.length < 3 || parts.some((v, i) => i < 3 && !Number.isFinite(v))) return null;
    return { r: parts[0], g: parts[1], b: parts[2], a: Number.isFinite(parts[3]) ? parts[3] : 1 };
  };
  const luminance = ({r,g,b}) => (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  const effectiveSolidBackground = (el) => {
    let node = el;
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
      const bg = parseRgb(cs.backgroundColor);
      if (bg && bg.a > 0.02 && bg.a < 0.92) return null;
      if (bg && bg.a >= 0.92) return bg;
      node = node.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const refreshContrast = () => {
    document.querySelectorAll('[data-cc-contrast-fixed="1"]').forEach(el => {
      el.removeAttribute("data-cc-contrast-fixed");
    });
    document.querySelectorAll(CANDIDATES).forEach(el => {
      if (el.closest("svg,canvas,video,picture")) return;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const fg = parseRgb(cs.color);
      const bg = effectiveSolidBackground(el);
      if (!fg || !bg) return;
      if (fg.a >= 0.85 && luminance(fg) >= 232 && luminance(bg) >= 238) {
        el.setAttribute("data-cc-contrast-fixed", "1");
      }
    });
  };
  const run = () => requestAnimationFrame(refreshContrast);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
  window.addEventListener("hashchange", run);
  window.addEventListener("resize", run, { passive: true });
})();
</script>
<!-- /CARNIVAL CAREERS LEGIBILITY GUARD -->
`;

let renderedHtml = canonicalHtml;
if (!renderedHtml.includes('id="cc-shopify-traffic"')) {
  if (!renderedHtml.includes("</body>")) {
    throw new Error("Canonical HTML is missing </body>; traffic funnel was not injected.");
  }
  renderedHtml = renderedHtml.replace("</body>", `${trafficFunnel}\n</body>`);
}

if (!renderedHtml.includes('id="cc-legibility-guard-script"')) {
  if (!renderedHtml.includes("</body>")) {
    throw new Error("Canonical HTML is missing </body>; legibility guard was not injected.");
  }
  renderedHtml = renderedHtml.replace("</body>", `${contrastGuard}\n</body>`);
}

fs.writeFileSync(path.join(dist, "index.html"), renderedHtml);
fs.copyFileSync(pressKitPath, path.join(dist, "pet-picks-press.html"));
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
      shopify_campaign: "trending_pet_picks",
      pet_picks_press_kit: true,
      legibility_guard_light_on_light_only: true
    },
    null,
    2
  )
);

console.log(
  "CANONICAL_STATIC_BUILD_VERIFIED",
  Buffer.byteLength(renderedHtml),
  "SHOPIFY_TRAFFIC_FUNNEL=ON",
  "PET_PICKS_PRESS_KIT=ON",
  "LEGIBILITY_GUARD=ON"
);
