import fs from "node:fs";
import path from "node:path";

// Build-time regression guard. The legacy intake handler was sending the
// same form once on button click and again on form submit for forms without
// the newer durable-intake interception.
const target = path.resolve("dist/index.html");
if (!fs.existsSync(target)) throw new Error("Missing dist/index.html");
const before = fs.readFileSync(target, "utf8");
const legacyClick = "form.querySelector('button[type=\"submit\"],button')?.addEventListener(\"click\",()=>handleIntake({target:form}),true);";
const occurrences = before.split(legacyClick).length - 1;
if (occurrences !== 1) throw new Error("Expected exactly one legacy duplicate-click handler; found " + occurrences);
const replacement = "/* One validated submit event is enough; duplicate click-to-intake trigger intentionally disabled. */";
const after = before.replace(legacyClick, replacement);
if (!after.includes('form.addEventListener("submit",handleIntake,true);')) {
  throw new Error("Native submit intake handler is missing; refusing to publish");
}
if (!after.includes('cc-durable-dynamic-intake-v2')) {
  throw new Error("New durable intake module is missing; refusing to publish");
}
fs.writeFileSync(target, after, "utf8");

for (const page of ["pembroke-acquisition.html", "my-cc-life.html", "the-story.html", "houses.html"]) {
  if (!fs.existsSync(path.resolve("dist", page))) {
    throw new Error("Critical public page missing from build: " + page);
  }
}
console.log("PASS: duplicate form-click intake removed; submit preserved; critical pages present.");
