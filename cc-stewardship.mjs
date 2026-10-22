import fs from "node:fs";
import path from "node:path";

// Add a distinct CC Universe governance page without modifying canonical Home, Houses, or Music.
const root = path.resolve(".");
const dist = path.join(root, "dist");
const src = path.join(root, "stewardship.html");
const dest = path.join(dist, "stewardship.html");
const indexPath = path.join(dist, "index.html");
if (!fs.existsSync(src) || !fs.existsSync(indexPath)) throw new Error("Governance source or site missing");
const governance = fs.readFileSync(src, "utf8");
if (!governance.includes("People are not") || !governance.includes("Acquisition velocity")) throw new Error("Governance page verification failed");
let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("The mas brings us together.") || !html.includes('id="page-music"')) throw new Error("Canonical site changed; refusing unsafe edit");
fs.copyFileSync(src, dest);
const hook = `
<style id="cc-stewardship-style">
.cc-stewardship-entry{margin:30px 0;padding:clamp(22px,3vw,36px);border:1px solid rgba(225,181,109,.50);background:linear-gradient(110deg,#1b1114,#3a1821 65%,#1a1115);border-radius:18px;color:#fff}
.cc-stewardship-entry .cc-stewardship-kicker{font-size:11px;letter-spacing:.18em;font-weight:900;text-transform:uppercase;color:#e9bd78}
.cc-stewardship-entry h3{font-size:clamp(1.45rem,3.1vw,2.3rem)!important;line-height:1.15!important;color:#fff!important;margin:10px 0}
.cc-stewardship-entry p{font-size:.95rem;color:#e4d8d0;max-width:65ch;line-height:1.65}
.cc-stewardship-entry a{display:inline-flex;margin-top:12px;padding:11px 17px;background:#e9bd78;color:#1a1115!important;font-weight:850;text-decoration:none!important;border-radius:4px}
.cc-stewardship-nav-link{border-left:2px solid #e9bd78!important;padding-left:14px!important}
</style>
<script id="cc-stewardship-script">
(()=> {
 const target="/stewardship.html";
 const install=()=>{
  const page=document.getElementById("page-project")||document.querySelector('[data-page="project"]');
  if(page&&!page.querySelector(".cc-stewardship-entry")){
   const section=document.createElement("section");
   section.className="cc-stewardship-entry";
   section.innerHTML='<div class="cc-stewardship-kicker">CC UNIVERSE / GOVERNING PRINCIPLE</div><h3>People are not collateral.</h3><p>Debt may finance a property. It does not define a person. Read how ownership, consent, stewardship and acquisition velocity govern CC Universe operations.</p><a href="/stewardship.html">Read the CC Universe principles →</a>';
   (page.querySelector(".page-inner,.container,.wrap,.section-inner")||page).appendChild(section);
  }
  const primary=document.querySelector('nav[aria-label="Primary"]');
  if(primary){
   const project=[...primary.querySelectorAll('a[href="#project"],a[href="/#project"]')].find(a=>/project/i.test(a.textContent||""));
   const item=project?.closest(".nav-item");
   const drop=item?.querySelector(".drop");
   if(drop&&!drop.querySelector('a[href="/stewardship.html"]')){
    const link=document.createElement("a");link.href=target;link.textContent="Stewardship";link.className="cc-stewardship-nav-link";
    drop.appendChild(link);
   }
  }
  const mobile=document.getElementById("mobilePanel");
  if(mobile&&!mobile.querySelector('a[href="/stewardship.html"]')){
   const link=document.createElement("a");link.href=target;link.textContent="Stewardship & Self-Determination";
   link.style.cssText="display:block;padding:12px 16px;color:#e9bd78;font-weight:800;text-decoration:none";
   const pr=[...mobile.querySelectorAll("a,summary")].find(e=>/project/i.test(e.textContent||""));
   if(pr){const parent=pr.closest("details")||pr.parentElement;parent?.insertAdjacentElement("afterend",link)}
   else mobile.appendChild(link);
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
 window.addEventListener("load",install,{once:true});
})();
</script>`;
if (!html.includes('id="cc-stewardship-script"')) {
 if (!html.includes("</body>")) throw new Error("Missing closing body");
 html=html.replace("</body>",hook+"\n</body>");
 fs.writeFileSync(indexPath,html,"utf8");
}
if (!fs.readFileSync(indexPath,"utf8").includes("The mas brings us together.")) throw new Error("Canonical Home marker missing after governance integration");
console.log("CC_UNIVERSE_STEWARDSHIP_PAGE_READY");