import fs from "node:fs";
import path from "node:path";

// Prevent redundant Boat/Stewardship promos and a stray "FOR CARNIVAL CAREERS"
// label from appearing above the site. Keep the actual pages and in-page links.
const index=path.join(process.cwd(),"dist","index.html");
let html=fs.readFileSync(index,"utf8");
if(!html.includes('id="page-home"')||!html.includes('id="page-music"'))throw Error("Missing canonical pages: header cleanup aborted");
const firstMain=html.search(/<main\b/i);
if(firstMain<0)throw Error("Missing main element: header cleanup aborted");
let pre=html.slice(0,firstMain);
const post=html.slice(firstMain);
pre=pre.replace(/<a\b[^>]*href=(["'])[^"']*\/(?:boat-2027|stewardship)\.html[^"']*\1[^>]*>[\s\S]*?<\/a>/gi,"");
pre=pre.replace(/<(span|small|p)[^>]*>\s*FOR CARNIVAL CAREER(?:S)?[^<]*<\/\1>/gi,"");
html=pre+post;
const hook=`
<style id="cc-clean-global-top-links-css">
.site-header a[href*="boat-2027.html"],.site-header a[href*="stewardship.html"],
#mobilePanel a[href*="boat-2027.html"],#mobilePanel a[href*="stewardship.html"],
body>a[href*="boat-2027.html"],body>a[href*="stewardship.html"]{display:none!important}
</style>
<script id="cc-clean-global-top-links-js">
(()=>{
 const clean=()=>{
  const main=document.querySelector("main");
  for(const a of document.querySelectorAll('a[href*="boat-2027.html"],a[href*="stewardship.html"]')){
   const above=main&&Boolean(a.compareDocumentPosition(main)&Node.DOCUMENT_POSITION_FOLLOWING);
   if(above||a.closest("header,.site-header,#mobilePanel,.topbar,.utility-bar"))a.remove();
  }
  for(const p of document.querySelectorAll("header span,header small,header p,header a,.site-header span,.site-header small")){
   if(!p.children.length&&/^FOR CARNIVAL CAREER(?:S)?\b/i.test((p.textContent||"").trim()))p.remove();
  }
  for(const n of [...document.body.childNodes]){
   if(n===main)break;
   if(n.nodeType===Node.TEXT_NODE&&/^\s*FOR CARNIVAL CAREER(?:S)?\b/i.test(n.textContent||""))n.remove();
  }
 };
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",clean,{once:true});else clean();
 window.addEventListener("load",clean,{once:true});
})();
</script>`;
if(!html.includes('id="cc-clean-global-top-links-js"'))html=html.replace("</body>",hook+"\n</body>");
fs.writeFileSync(index,html,"utf8");
console.log("CC_GLOBAL_HEADER_DUPLICATES_REMOVED");
