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


const torontoModelRefinement = String.raw`
<!-- CARNIVAL CAREERS TORONTO MODEL REFINEMENT: EXISTING SECTIONS ONLY -->
<style id="cc-toronto-model-style">
  .cc-toronto-model {
    margin: 22px 0 4px;
    padding: 20px;
    border-radius: 18px;
    border: 1px solid rgba(112, 72, 232, .24);
    background: linear-gradient(135deg, rgba(112,72,232,.10), rgba(237,56,161,.08));
  }
  .cc-toronto-model h3 { margin: 0 0 8px; }
  .cc-toronto-model p { margin: 7px 0; }
  .cc-toronto-model strong { font-weight: 850; }
  .cc-toronto-model .cc-model-kicker {
    font-size: .78rem;
    font-weight: 850;
    letter-spacing: .12em;
    text-transform: uppercase;
    opacity: .78;
  }
</style>
<script id="cc-toronto-model-script">
(() => {
  const add = (root, key, html) => {
    if (!root || root.querySelector(\'[data-cc-model="\' + key + \'"]\')) return;
    const box = document.createElement("div");
    box.className = "cc-toronto-model";
    box.setAttribute("data-cc-model", key);
    box.innerHTML = html;
    const inner = root.querySelector(".page-inner,.content,.section-inner,.container,main") || root;
    inner.appendChild(box);
  };

  const home = document.getElementById("page-home") || document.querySelector(\'[data-page="home"]\');
  const families = document.getElementById("page-families") || document.getElementById("page-childcare") || document.querySelector(\'[data-page="families"],[data-page="childcare"]\');
  const project = document.getElementById("page-project") || document.querySelector(\'[data-page="project"]\');
  const show = document.getElementById("page-show") || document.querySelector(\'[data-page="show"]\');
  const capital = document.getElementById("page-capital") || document.querySelector(\'[data-page="capital"]\');

  add(home, "toronto-home", \'<div class="cc-model-kicker">Toronto working scenario</div><h3>One family proves the full engine.</h3><p><strong>Hopeton LaTouche is the featured Toronto family / tenant-owner.</strong> <strong>Michie Mee is the Toronto host.</strong> The episode follows the family through housing, work, groceries, mobility, childcare, community activation and the arena finale.</p>\');
  add(families, "toronto-families", \'<div class="cc-model-kicker">Families</div><h3>C$105,000 anchor household + a wider earning community.</h3><p>The Toronto working model uses a real C$105,000 annual tenant-owner employment position to stabilize the featured household. Household spending then supports housing, groceries through the project grocery lane, SweetEVRides mobility and childcare/family services. Only a small activation slice is intended to help switch on the wider Sideline Sitter network; Sideline Sitters are designed to earn mainly from external sales, referrals, sponsor activations, vendors and project commerce rather than from the tenant-owner salary.</p><p>Employment, housing, ownership, childcare, transportation and any mortgage underwriting remain separate documented relationships subject to applicable law, payroll deductions, lender criteria and signed agreements.</p>\');
  add(project, "toronto-project", \'<div class="cc-model-kicker">Toronto proof unit</div><h3>Family → home → work → commerce → community → show.</h3><p>Hopeton\'s household is the first Toronto tenant-owner story. Michie Mee hosts the journey. The property and workforce story is filmed alongside the restaurant/family experience, community participation, City Hall/transit activations and the arena performance. The aim is to leave an operating household and commercial network behind after the cameras move on.</p>\');
  add(show, "toronto-show", \'<div class="cc-model-kicker">Toronto episode</div><h3>Michie Mee hosts; Hopeton\'s family lives the transformation.</h3><p>The host guides viewers through the family story without replacing it. The episode connects the tenant-owner journey to local businesses, groceries, mobility, childcare, vendors, sponsors, artists and the live arena finale so the business activity is visible on screen.</p>\');
  add(capital, "toronto-capital", \'<div class="cc-model-kicker">Capital logic</div><h3>Capital is concentrated in anchor households, then multiplied through outside commerce.</h3><p>The working 12-month concept is a C$1.2M investment facility that can support up to ten C$105,000 tenant-owner employment positions (C$1.05M) plus a controlled reserve for employer costs, systems, compliance and commercialization. Hopeton is the Toronto proof household. A small activation allocation can connect each anchor household to a broader Sideline Sitter network, while most Sideline Sitter earnings are intended to come from external transactions, sponsor/vendor budgets, referrals and commerce.</p><p>Any investor return is a target, not a guarantee. Capital recovery, profit participation, collateral, reserves, lender priority and distributions require definitive agreements and actual collected revenue.</p>\');
})();
</script>
<!-- /CARNIVAL CAREERS TORONTO MODEL REFINEMENT -->
`;
let renderedHtml = canonicalHtml;
if (!renderedHtml.includes('id="cc-shopify-traffic"')) {
  if (!renderedHtml.includes("</body>")) {
    throw new Error("Canonical HTML is missing </body>; traffic funnel was not injected.");
  }
  renderedHtml = renderedHtml.replace("</body>", `${trafficFunnel}\n</body>`);
}

if (!renderedHtml.includes('id="cc-toronto-model-script"')) {
  if (!renderedHtml.includes("</body>")) {
    throw new Error("Canonical HTML is missing </body>; Toronto model refinement was not injected.");
  }
  renderedHtml = renderedHtml.replace("</body>", `${torontoModelRefinement}\n</body>`);
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
      legibility_guard_card_light_on_light_only: true,
      toronto_tenant_owner_model_refined: true,
      toronto_featured_family: "Hopeton LaTouche",
      toronto_host: "Michie Mee"
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
