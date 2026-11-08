/** CC Universe source coverage check. Run: node tools/check-cc-universe-catalog.mjs */
import {execFileSync} from "node:child_process";
import fs from "node:fs";
const catalog=JSON.parse(fs.readFileSync("CC_UNIVERSE/inventory/GITHUB_FILE_MANIFEST.json","utf8"));
const files=execFileSync("git",["ls-files","-z"],{encoding:"utf8"}).split("\0").filter(Boolean).filter(p=>!p.startsWith("CC_UNIVERSE/")&&p!=="tools/check-cc-universe-catalog.mjs");
const saved=new Set(catalog.files.map(x=>x.path));
const missed=files.filter(x=>!saved.has(x));const gone=catalog.files.filter(x=>!files.includes(x.path)).map(x=>x.path);
const unassigned=catalog.files.filter(x=>!catalog.departments.some(d=>d.id===x.department)).map(x=>x.path);
console.log(JSON.stringify({tracked:files.length,indexed:catalog.files.length,missing:missed,removed:gone,uncategorized:unassigned},null,2));
if(missed.length||gone.length||unassigned.length)process.exitCode=1;
