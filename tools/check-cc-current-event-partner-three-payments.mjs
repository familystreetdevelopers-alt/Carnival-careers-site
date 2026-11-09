/** Safeguard for the CURRENT CC event-partner milestone schedule.
 * Does not inspect dated original PDF masters or archived 14-page transcript.
 */
import fs from "node:fs";
const sources=[
  "docs/sponsorship/CC_CURRENT_EVENT_PARTNER_THREE_INCREMENT_POLICY_2026-11-08.md",
  "docs/sponsorship/CC_SPONSOR_HORIZONS_2026-11-08.md",
  "docs/sponsorship/CC_SPONSOR_HORIZONS_2026-11-08.json",
  "docs/sponsorship/CC_ARTIST_SPONSORSHIP_CORRECTED_FULL_15PAGE_TEXT_2026-11-08.md",
  "docs/CC_SHOWRUNNER_UNIVERSE.md",
  "docs/CC_DEBT_INSTRUMENTS_AND_SETTLEMENT_CONTROLS.md",
  "docs/CC_NOTES_BONDS_CAPITAL_EXECUTION_MASTER.md",
  "cc-sponsorship-horizons.mjs"
];
const failures=[];
for(const p of sources){
 if(!fs.existsSync(p)){failures.push("Missing "+p);continue;}
 const c=fs.readFileSync(p,"utf8").toLowerCase();
 if(!c.includes("door")||!c.includes("music")||!c.includes("lineup")||!c.includes("last song"))failures.push("Three required gates not explicit in "+p);
 if(c.includes("the historic three x c$3,000 c$9,000 promoter counteroffer is unaccepted historical context"))failures.push("Retired incorrect event partner framing "+p);
}
const policy=JSON.parse(fs.readFileSync("docs/sponsorship/CC_SPONSOR_HORIZONS_2026-11-08.json","utf8"));
const gates=policy.current_event_partner_policy?.releases;
if(!Array.isArray(gates)||gates.length!==3||gates.some(x=>x.amount_cad!==null))failures.push("Current partner payment triggers missing or invented fixed amounts");
if(failures.length){for(const f of failures)console.error("CC PARTNER GATE FAIL:",f);process.exit(1);}
console.log("CC event partner payment guard PASSED: Door -> original CC music in show audio lineup -> Hopeton completes last song; amounts unsigned; no three-part sponsor billing assumed.");
