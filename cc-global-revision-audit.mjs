// CC Universe: fail production build if a property-related asset drifts from the governing model.
// Nothing contacts users or modifies financial contracts.
import fs from "node:fs";import path from "node:path";
const root=process.cwd(),dist=path.join(root,"dist"),data=JSON.parse(fs.readFileSync(path.join(root,"docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json"),"utf8"));
const check=(file,need)=>{const s=fs.readFileSync(path.join(root,file),"utf8");for(const w of need)if(!s.includes(w))throw Error("CC global property drift "+file+": missing "+w);return s};
if(data.version!=="CC-GLOBAL-OPT-2026-11-08"||data.working.allIn!==10231872||data.working.units!==38||data.sammonConditional.indicativeAllIn!==9022984||data.sammonConditional.conditionalUnits!==40)throw Error("Canonical property model mismatch");
check("docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.md",["C$10,231,872","C$9,022,984","Sammon NOI"]);
check("docs/CC_SHOWRUNNER_UNIVERSE.md",["CC-GLOBAL-OPT-2026-11-08"]);
check("docs/CC_NOTES_BONDS_CAPITAL_EXECUTION_MASTER.md",["CC global property funding control"]);
check("docs/CC_DEBT_INSTRUMENTS_AND_SETTLEMENT_CONTROLS.md",["Global property stack reconciliation"]);
check("dist/global-property-stack.html",["C$10.232M","C$9.023M","Sammon"]);
check("dist/index.html",["The mas brings us together.","cc-global-optimized-pilot-sync"]);
const html=fs.readdirSync(dist).filter(n=>n.endsWith(".html"));let seen=0;for(const file of html){const content=fs.readFileSync(path.join(dist,file),"utf8");if(content.includes("</head>")){if(!content.includes('name="cc-global-property-version"'))throw Error("Missing version on "+file);seen++;}}
if(seen<20)throw Error("Too few public pages stamped "+seen);
if(!fs.existsSync(path.join(dist,"cc-global-property-current.json")))throw Error("Latest model JSON missing from built public assets");
console.log(JSON.stringify({event:"CC_GLOBAL_ALL_SITE_PAGES_VERIFIED",version:data.version,htmlFiles:html.length,versionedHtmlFiles:seen,workingCAD:data.working.allIn,conditionalCAD:data.sammonConditional.indicativeAllIn}));
