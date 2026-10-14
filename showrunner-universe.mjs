import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const index = path.join(dist, "index.html");
const unifiedStorySource = path.resolve("the-story.html");
const teamDeskSource = path.resolve("team-desk.html");

for (const file of [index, unifiedStorySource, teamDeskSource]) {
  if (!fs.existsSync(file)) throw new Error("Missing required page for Story consolidation: " + file);
}
fs.copyFileSync(unifiedStorySource, path.join(dist, "the-story.html"));
fs.copyFileSync(teamDeskSource, path.join(dist, "team-desk.html"));

let html = fs.readFileSync(index, "utf8");
const oldProjectNavigation = '<div class="nav-item"><a class="nav-link" href="#project">Project</a><div class="drop"><a href="#project">Project overview</a><a href="#project-story">Story + economic engine</a><a href="#project-partners">Partner lanes</a><a href="#project-professional">Professional forms</a></div></div>';
const newProjectNavigation = '<div class="nav-item"><a class="nav-link" href="/the-story.html" data-cc-single-story-nav>Story</a></div><div class="nav-item"><a class="nav-link" href="#project">Project</a><div class="drop"><a href="#project">Project overview</a><a href="#project-professional">Professional forms</a><a href="https://carnival-careers-os.floot.app/coordination">Development Calendar</a><a href="/team-desk.html">Private Team Desk</a></div></div>';
if (!html.includes(oldProjectNavigation)) throw new Error("Cannot locate original Project dropdown; do not silently ship duplicate Story links");
html = html.replace(oldProjectNavigation, newProjectNavigation);

const mobileNeedle = '<a href="#home">Home</a><a href="#project">Project</a>';
if (!html.includes(mobileNeedle)) throw new Error("Cannot locate original mobile nav");
html = html.replace(mobileNeedle, '<a href="#home">Home</a><a href="/the-story.html" data-cc-single-story-mobile>Story</a><a href="#project">Project</a>');

html = html.replace(/href="#project-story"/g, 'href="/the-story.html"')
  .replace(/href="#project-partners"/g, 'href="/the-story.html"');
const style = '<style id="cc-single-story-experience">'+
'#page-project #project-story,#page-project #project-partners{display:none!important}'+
'#page-project .cc-one-story-in-project{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between;padding:25px 28px;margin:24px 0;border:1px solid rgba(255,196,77,.45);border-left:4px solid #ffc44d;border-radius:16px;background:linear-gradient(115deg,rgba(108,26,45,.62),rgba(12,17,31,.94));color:#fff}'+
'#page-project .cc-one-story-in-project h2{font-size:clamp(22px,3vw,36px);line-height:1.1;margin:0 0 9px;font-weight:900;color:#ffc44d}'+
'#page-project .cc-one-story-in-project p{font-size:14px;max-width:660px;line-height:1.5;margin:0;color:#f0dfe3}'+
'#page-project .cc-one-story-in-project a{background:#e54153;color:#fff;font-size:13px;font-weight:900;text-decoration:none;padding:13px 17px;border-radius:8px;white-space:nowrap}'+
'</style>';
if (!html.includes("</head>")) throw new Error("Missing </head> for Story styling");
html = html.replace("</head>", style + "\n</head>");
const projectMain = '<main class="project-wrap">';
if (!html.includes(projectMain)) throw new Error("Missing Project section");
html = html.replace(projectMain, projectMain + '\n<section class="cc-one-story-in-project"><div><h2>One story. Every industry.</h2><p>Follow the featured woman, family, development, commerce, production, music, travel and real economics in one continuous journey.</p></div><a href="/the-story.html">Read the full story ↗</a></section>');

fs.writeFileSync(index, html);

const redirect = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Story | Carnival Careers</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="https://carnival-careers-live-current.vercel.app/the-story.html"><meta http-equiv="refresh" content="0;url=/the-story.html"></head><body><p>The Production Universe has moved into <a href="/the-story.html">the unified Story</a>.</p></body></html>';
fs.writeFileSync(path.join(dist, "production-universe.html"), redirect);
console.log("CC_STORY_MERGED", {
  story: fs.statSync(path.join(dist, "the-story.html")).size,
  storyNavButtons: (html.match(/data-cc-single-story-nav/g) || []).length,
  storyMobileButtons: (html.match(/data-cc-single-story-mobile/g) || []).length,
  duplicateStoryNavLinks: (html.match(/href="#project-story"|href="#project-partners"/g) || []).length
});