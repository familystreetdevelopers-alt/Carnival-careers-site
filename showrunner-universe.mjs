import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const index = path.join(dist, "index.html");
const page = path.resolve("production-universe.html");
if (!fs.existsSync(index) || !fs.existsSync(page)) throw new Error("Showrunner build source missing");
fs.copyFileSync(page,path.join(dist,"production-universe.html"));
let html=fs.readFileSync(index,"utf8");
if(!html.includes('id="cc-universe-project-link"')){
 const navHook=`<script id="cc-universe-project-link">
(()=>{const attach=()=>{const primary=document.querySelector('nav[aria-label="Primary"]');
if(primary){const project=[...primary.querySelectorAll('.nav-item')].find(item=>item.querySelector('a[href="#project"],a[href="/#project"]'));
const drop=project?.querySelector(".drop");if(drop&&!drop.querySelector('a[href="/production-universe.html"]')){const a=document.createElement("a");a.href="/production-universe.html";a.textContent="The Production Universe";a.setAttribute("data-cc-universe","1");drop.appendChild(a);}}
const mobile=document.getElementById("mobilePanel");if(mobile&&!mobile.querySelector('a[href="/production-universe.html"]')){const reference=mobile.querySelector('a[href="#project"],a[href="/#project"]');if(reference){const a=document.createElement("a");a.href="/production-universe.html";a.textContent="The Production Universe";a.className="cc-mobile-sub-link";reference.insertAdjacentElement("afterend",a);}}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",attach,{once:true});else attach();})();
<\/script>`;
 if(!html.includes("</body>"))throw new Error("Missing closing body");
 html=html.replace("</body>",navHook+"\n</body>");
 fs.writeFileSync(index,html);
}
console.log("CC_SHOWRUNNER_UNIVERSE_READY",fs.statSync(path.join(dist,"production-universe.html")).size);
