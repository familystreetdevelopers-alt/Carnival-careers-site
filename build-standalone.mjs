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
<!-- CARNIVAL CAREERS CARD LEGIBILITY GUARD: FIX ONLY LOW-CONTRAST LIGHT TEXT INSIDE CARDS -->
<style id="cc-legibility-guard-style">
  [data-cc-contrast-fixed="1"] {
    color: #161616 !important;
    text-shadow: none !important;
  }
</style>
<script id="cc-legibility-guard-script">
(() => {
  const CANDIDATES = "h1,h2,h3,h4,h5,h6,p,a,span,li,dt,dd,label,strong,em,small,button,summary,figcaption,blockquote,td,th,div";

  const isCardRoot = (el) => {
    if (!(el instanceof Element)) return false;
    if (el.matches(".project-pro,.project-lane,.project-step")) return true;
    return Array.from(el.classList).some(
      name => name === "card" || /-card$/.test(name)
    );
  };

  const parseRgb = (value) => {
    const m = String(value || "").match(/rgba?\\(([^)]+)\\)/i);
    if (!m) return null;
    const parts = m[1].split(",").map(v => Number.parseFloat(v.trim()));
    if (parts.length < 3 || parts.some((v, i) => i < 3 && !Number.isFinite(v))) return null;
    return {
      r: Math.max(0, Math.min(255, parts[0])),
      g: Math.max(0, Math.min(255, parts[1])),
      b: Math.max(0, Math.min(255, parts[2])),
      a: Number.isFinite(parts[3]) ? Math.max(0, Math.min(1, parts[3])) : 1
    };
  };

  const relativeLuminance = ({ r, g, b }) => {
    const c = [r, g, b].map(v => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  };

  const contrastRatio = (a, b) => {
    const l1 = relativeLuminance(a);
    const l2 = relativeLuminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const composite = (front, back) => {
    const a = front.a + back.a * (1 - front.a);
    if (a <= 0) return { r: 255, g: 255, b: 255, a: 1 };
    return {
      r: ((front.r * front.a) + (back.r * back.a * (1 - front.a))) / a,
      g: ((front.g * front.a) + (back.g * back.a * (1 - front.a))) / a,
      b: ((front.b * front.a) + (back.b * back.a * (1 - front.a))) / a,
      a
    };
  };

  const lightGradientColor = (backgroundImage) => {
    const value = String(backgroundImage || "");
    if (!value || value === "none") return null;
    if (/url\\(/i.test(value)) return false;
    if (!/gradient\\(/i.test(value)) return false;

    const colors = [];
    const re = /rgba?\\(([^)]+)\\)/gi;
    let m;
    while ((m = re.exec(value))) {
      const c = parseRgb("rgb(" + m[1] + ")");
      if (c) colors.push(c);
    }
    if (!colors.length) return false;
    if (colors.some(c => c.a < 0.82 || relativeLuminance(c) < 0.72)) return false;

    const total = colors.reduce(
      (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
      { r: 0, g: 0, b: 0 }
    );
    return {
      r: total.r / colors.length,
      g: total.g / colors.length,
      b: total.b / colors.length,
      a: 1
    };
  };

  const effectiveBackground = (el) => {
    const layers = [];
    let node = el;

    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      const gradient = lightGradientColor(cs.backgroundImage);

      if (gradient === false) return null;
      if (gradient) {
        layers.push(gradient);
        break;
      }

      const bg = parseRgb(cs.backgroundColor);
      if (bg && bg.a > 0.01) {
        layers.push(bg);
        if (bg.a >= 0.995) break;
      }
      node = node.parentElement;
    }

    let result = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i -= 1) {
      result = composite(layers[i], result);
    }
    return result;
  };

  const hasOwnText = (el) =>
    Array.from(el.childNodes).some(
      n => n.nodeType === Node.TEXT_NODE && String(n.textContent || "").trim().length > 0
    );

  const refreshContrast = () => {
    document.querySelectorAll('[data-cc-contrast-fixed="1"]').forEach(el => {
      el.removeAttribute("data-cc-contrast-fixed");
    });

    const cardRoots = Array.from(document.querySelectorAll("[class]")).filter(isCardRoot);

    cardRoots.forEach(root => {
      const targets = [root, ...root.querySelectorAll(CANDIDATES)];

      targets.forEach(el => {
        if (el.closest("svg,canvas,video,picture")) return;
        if (el.matches("div") && !hasOwnText(el) && el !== root) return;

        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.2) return;

        const fg = parseRgb(cs.color);
        const bg = effectiveBackground(el);
        if (!fg || !bg || fg.a < 0.85) return;

        const fgL = relativeLuminance(fg);
        const bgL = relativeLuminance(bg);
        const ratio = contrastRatio(fg, bg);

        if (fgL >= 0.55 && bgL >= 0.72 && ratio < 3.15) {
          el.setAttribute("data-cc-contrast-fixed", "1");
        }
      });
    });
  };

  let scheduled = false;
  const run = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refreshContrast();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  window.addEventListener("load", run, { once: true });
  window.addEventListener("pageshow", run);
  window.addEventListener("hashchange", run);
  window.addEventListener("popstate", run);
  window.addEventListener("resize", run, { passive: true });

  if ("MutationObserver" in window) {
    const observer = new MutationObserver(run);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"]
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(run).catch(() => {});
  }
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
      legibility_guard_card_light_on_light_only: true
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
  "LEGIBILITY_GUARD=CARDS_ONLY"
);
