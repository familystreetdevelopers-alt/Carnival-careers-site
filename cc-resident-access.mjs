import fs from "node:fs";
import path from "node:path";

// Resident portal public entry point. It never collects private resident credentials.
// Source Home copy remains unchanged; inject only into generated dist.
const dist=path.resolve("dist");
const index=path.join(dist,"index.html");
if(!fs.existsSync(index))throw new Error("Canonical site must be built first");
fs.copyFileSync(path.resolve("my-cc-life.html"),path.join(dist,"my-cc-life.html"));
const injection=fs.readFileSync(path.resolve("cc-resident-access-hook.html"),"utf8");
let html=fs.readFileSync(index,"utf8");
if(!html.includes('id="cc-resident-gateway-script"')){
 if(!html.includes("</body>"))throw new Error("Missing closing body");
 html=html.replace("</body>",injection+"\n</body>");
 fs.writeFileSync(index,html);
}
if(!html.includes("The mas brings us together."))throw new Error("Canonical Home copy marker missing");
console.log("CC_RESIDENT_GATEWAY_READY");
