import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const index = path.join(dist, "index.html");
const page = path.resolve("production-universe.html");
const deskPage = path.resolve("team-desk.html");
if (!fs.existsSync(index) || !fs.existsSync(page) || !fs.existsSync(deskPage)) throw new Error("Production / desk build source missing");
fs.copyFileSync(page,path.join(dist,"production-universe.html"));
fs.copyFileSync(deskPage,path.join(dist,"team-desk.html"));
let html=fs.readFileSync(index,"utf8");
if(!html.includes('id="cc-universe-project-link"')){
 const navHook=`<script id="cc-universe-project-link">
(()=>{const attach=()=>{const primary=document.querySelector('nav[aria-label="Primary"]');
if(primary){const project=[...primary.querySelectorAll('.nav-item')].find(item=>item.querySelector('a[href="#project"],a[href="/#project"]'));
const drop=project?.querySelector(".drop");if(drop&&!drop.querySelector('a[href="/production-universe.html"]')){const a=document.createElement("a");a.href="/production-universe.html";a.textContent="The Production Universe";a.setAttribute("data-cc-universe","1");drop.appendChild(a);}if(drop&&!drop.querySelector('a[href="https://carnival-careers-os.floot.app/coordination"]')){const b=document.createElement("a");b.href="https://carnival-careers-os.floot.app/coordination";b.textContent="Development Team Calendar";b.setAttribute("data-cc-coordination","1");drop.appendChild(b);}if(drop&&!drop.querySelector('a[href="/team-desk.html"]')){const c=document.createElement("a");c.href="/team-desk.html";c.textContent="Private Team Desk / Login";c.setAttribute("data-cc-team-desk","1");drop.appendChild(c);}}
const mobile=document.getElementById("mobilePanel");if(mobile&&!mobile.querySelector('a[href="/production-universe.html"]')){const reference=mobile.querySelector('a[href="#project"],a[href="/#project"]');if(reference){const a=document.createElement("a");a.href="/production-universe.html";a.textContent="The Production Universe";a.className="cc-mobile-sub-link";reference.insertAdjacentElement("afterend",a);}if(reference&&!mobile.querySelector('a[href="https://carnival-careers-os.floot.app/coordination"]')){const b=document.createElement("a");b.href="https://carnival-careers-os.floot.app/coordination";b.textContent="Development Team Calendar";b.className="cc-mobile-sub-link";reference.insertAdjacentElement("afterend",b);}if(reference&&!mobile.querySelector('a[href="/team-desk.html"]')){const c=document.createElement("a");c.href="/team-desk.html";c.textContent="Private Team Desk / Login";c.className="cc-mobile-sub-link";reference.insertAdjacentElement("afterend",c);}}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",attach,{once:true});else attach();})();
<\/script>`;
 if(!html.includes("</body>"))throw new Error("Missing closing body");
 html=html.replace("</body>",navHook+"\n</body>");
 fs.writeFileSync(index,html);
}
console.log("CC_SHOWRUNNER_UNIVERSE_READY",fs.statSync(path.join(dist,"production-universe.html")).size);
