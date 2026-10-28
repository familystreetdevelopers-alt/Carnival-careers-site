import fs from "node:fs";
import path from "node:path";

const dist=path.resolve("dist");
if (!fs.existsSync(path.join(dist,"index.html"))) throw new Error("Canonical site build missing.");
const pages=["sideline-sitters.html","sideline-sitters-portal.html"];
for (const file of pages) {
 const source=path.resolve(file);
 if (!fs.existsSync(source)) throw new Error("Sideline Sitters source file missing: "+file);
 const contents=fs.readFileSync(source,"utf8");
 if(!contents.includes("Sideline Sitters") || !contents.includes('charset="utf-8"')) throw new Error("Invalid Sideline Sitters page: "+file);
 fs.copyFileSync(source,path.join(dist,file));
}
console.log("Sideline Sitters landing + caregiver portal pages staged alongside the unchanged canonical homepage.");
