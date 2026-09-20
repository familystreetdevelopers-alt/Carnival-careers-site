import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
if (!fs.existsSync(dist)) throw new Error("dist must exist before generating distribution pages.");

const collection = "https://wase0y-fi.myshopify.com/collections/trending-pet-picks";
const products = {
  catToy: {name:"Interactive Cat Toy Ball", price:"C$34.99", url:"https://wase0y-fi.myshopify.com/products/interactive-cat-toy-ball"},
  waterer: {name:"Automatic Circulating Pet Waterer", price:"C$24.99", url:"https://wase0y-fi.myshopify.com/products/automatic-circulating-pet-waterer"},
  harness: {name:"Reflective Dog Strap Harness", price:"C$29.99", url:"https://wase0y-fi.myshopify.com/products/reflective-dog-strap-harness"},
  bowl: {name:"Pet Slow-Feeding Wisdom Bowl", price:"C$24.99", url:"https://wase0y-fi.myshopify.com/products/pet-slow-feeding-wisdom-bowl"},
  mat: {name:"Super Soft Pet Kennel Mat", price:"C$19.99", url:"https://wase0y-fi.myshopify.com/products/super-soft-pet-kennel-mat"}
};

const seo = [
["interactive-cat-toy-under-35","Interactive Cat Toy Under C$35","A simple budget-friendly cat enrichment idea for indoor play.",products.catToy,"For indoor cats, variety matters. A moving toy can add another option to a rotation of wand play, boxes, climbing, and quiet rest. The goal is not nonstop stimulation; it is giving a cat safe chances to investigate and move.","Use short supervised play sessions, rotate toys instead of leaving everything out all day, and put away anything damaged or loose."],
["automatic-pet-waterer-budget-guide","Automatic Pet Waterer on a Budget","A practical look at adding a circulating water option without a large spend.",products.waterer,"Some pet owners like offering more than one water station. A circulating waterer can be one of those stations, especially in a multi-room home or apartment.","Keep fresh water available, clean the unit according to its instructions, and watch whether your pet actually prefers it."],
["reflective-dog-harness-night-walks","Reflective Dog Harness for Lower-Light Walks","A visibility-focused dog-walking option under C$30.",products.harness,"Reflective material can make a dog easier to notice when light hits it during dawn, dusk, or evening walks. It works best as one layer of a broader walking-safety routine.","Use a properly fitted harness, stay on well-lit routes when possible, and follow local leash rules."],
["slow-feeder-bowl-everyday-use","Slow-Feeding Bowl for Everyday Mealtimes","A low-cost way to make mealtime less rushed and more engaging.",products.bowl,"Slow-feeding bowls add shape and obstacles to a meal so pets work around the surface instead of eating from a flat bowl. Some owners use them as a simple enrichment tool.","Choose a size appropriate for your pet and stop using any bowl that causes frustration or difficulty."],
["soft-kennel-mat-budget-comfort","Soft Kennel Mat for Budget Comfort","An affordable mat for crates, kennels, floors, and familiar resting spots.",products.mat,"A soft mat can make a hard surface more inviting and can help define a consistent resting place at home or while traveling.","Check fit, washability, and wear regularly. Replace damaged bedding rather than letting loose material accumulate."],
["pet-products-under-35-cad","5 Practical Pet Products Under C$35","A budget roundup covering play, hydration, walking, feeding, and comfort.",null,"Pet gear does not have to be complicated. This collection focuses on five everyday categories: enrichment, water, walking visibility, feeding pace, and rest.","Pick products around a real routine you already have rather than buying gear simply because it is trending."],
["indoor-cat-enrichment-budget","Budget Indoor Cat Enrichment Ideas","Low-cost ways to add variety to an indoor cat's day.",products.catToy,"Try rotating play styles: chasing, climbing, hiding, food puzzles, window watching, and quiet rest. A small toy can be useful when it is part of a broader routine rather than the only source of activity.","Supervise new toys and remove damaged parts promptly."],
["dog-walking-visibility-tips","Dog-Walking Visibility Tips","Simple ideas for making lower-light walks easier to see.",products.harness,"Reflective gear, a visible leash, predictable routes, and attention at crossings can all help make dog walks more noticeable to other people and road users.","Reflective gear improves visibility only when light reaches it; it does not replace attentive walking."],
["pet-hydration-station-ideas","Simple Pet Hydration Station Ideas","Ways to make water easier to access around the home.",products.waterer,"Some households use more than one water source, especially with multiple pets or multiple floors. Bowls and circulating waterers can be placed where pets naturally spend time.","Refresh and clean water containers regularly and monitor normal drinking habits."],
["slow-feeding-routine-tips","Simple Slow-Feeding Routine Tips","Practical ways to make mealtime more deliberate.",products.bowl,"Measured meals, calm feeding spaces, and appropriately designed bowls can make feeding routines easier to manage. The best setup is one your pet can use comfortably.","If a pet has swallowing, dental, or other health concerns, ask a veterinarian what feeding setup is appropriate."],
["crate-comfort-setup","Simple Crate and Kennel Comfort Setup","A straightforward checklist for a familiar resting space.",products.mat,"A crate or kennel setup usually works best when it is clean, correctly sized, ventilated, and associated with calm experiences. Bedding is one part of that environment.","Choose bedding that fits safely and suits your pet's chewing and temperature needs."],
["new-dog-owner-budget-gear","Budget Gear for New Dog Owners","Start with daily routines before buying a long list of accessories.",products.harness,"Prioritize basics tied to feeding, walking, identification, cleanup, rest, and safe transport. Add extras after you learn the dog's actual habits.","Fit and safety matter more than the number of products you buy."],
["new-cat-owner-budget-gear","Budget Gear for New Cat Owners","A simple starting list for play, food, water, litter, scratching, and rest.",products.catToy,"Cats benefit from choices: places to hide, scratch, climb, drink, eat, play, and rest. You can build that environment gradually rather than all at once.","Introduce new items slowly and keep familiar resources available."],
["small-space-pet-essentials","Pet Essentials for Smaller Homes","Choose gear that solves a routine without taking over the room.",products.waterer,"In smaller spaces, multi-use and easy-to-clean products can matter more than size or novelty. Place supplies where pets can use them without blocking household movement.","Keep food, water, litter, bedding, and play areas arranged for easy daily maintenance."],
["travel-day-pet-essentials","Simple Pet Travel-Day Essentials","A practical checklist for short trips and routine travel days.",products.mat,"Think through identification, water, food, cleanup, restraint or carrier needs, familiar bedding, and breaks before leaving.","Travel rules vary by carrier and destination, so check requirements in advance."],
["rainy-day-cat-play","Rainy-Day Cat Play Ideas","Indoor enrichment ideas for days when the household stays in.",products.catToy,"Short play sessions, cardboard boxes, treat searches, training games, climbing, and rotating toys can break up an indoor day.","Let the cat disengage when it wants to rest."],
["summer-pet-water-access","Summer Pet Water Access","Simple ways to keep clean water easy to reach during warmer days.",products.waterer,"Extra water stations can be useful in warm weather, particularly in larger homes or multi-pet households.","Heat can be dangerous for pets. Provide appropriate shade and cooling and seek veterinary help for signs of heat illness."],
["winter-dog-walk-visibility","Winter Dog-Walk Visibility","Why reflective gear can be useful when days get shorter.",products.harness,"Shorter daylight hours mean more walks happen around dawn or dusk. Reflective material can add visibility when illuminated by headlights or other light sources.","Also consider route conditions, temperature, paws, and local weather advisories."],
["senior-dog-resting-spaces","Comfortable Resting Spaces for Older Dogs","Simple ways to make favorite rest areas more inviting.",products.mat,"Older dogs often spend plenty of time resting. Clean, accessible sleeping spots placed near family activity can make daily routines easier.","Mobility or pain changes should be discussed with a veterinarian rather than solved only with bedding."],
["puppy-mealtime-pace","Puppy Mealtime Pace","Building calm, repeatable feeding habits from the beginning.",products.bowl,"Consistent meal locations and portions can make routines easier to track. Some puppies may use slow-feeding designs comfortably while others need a simpler bowl.","Ask a veterinarian about appropriate food, portions, and feeding frequency for a growing puppy."],
["rescue-dog-settling-in","Helping a Rescue Dog Settle Into a New Home","Keep the first routines simple, predictable, and low pressure.",products.mat,"A familiar resting area, consistent meals, calm walks, and time to decompress can help a new dog learn the household rhythm.","Behavior and adjustment timelines vary widely; avoid forcing interaction."],
["multi-pet-household-basics","Multi-Pet Household Basics","Reduce competition by giving pets enough access to everyday resources.",products.waterer,"Multiple water points, separate feeding where needed, several resting areas, and individual attention can make household routines easier.","Watch for guarding, stress, or avoidance and adjust resource placement as needed."],
["apartment-pet-gear","Practical Pet Gear for Apartment Living","Focus on compact, cleanable products tied to real routines.",products.mat,"Apartment pet setups benefit from predictable storage, easy cleanup, quiet enrichment, and well-managed walking or litter routines.","Respect building rules and neighbors while meeting the pet's exercise and enrichment needs."],
["budget-dog-gift-ideas","Budget Dog Gift Ideas Under C$35","Four practical dog-oriented picks for walking, water, feeding, and comfort.",products.harness,"A useful gift does not need to be elaborate. Products tied to routines are often easier for an owner to integrate than novelty items.","Confirm sizing and the recipient dog's habits before choosing gear."],
["budget-cat-gift-ideas","Budget Cat Gift Ideas Under C$35","Simple cat-oriented gift ideas centered on play and everyday care.",products.catToy,"Cat gifts work best when they match the cat's play style and the household's setup. Small enrichment items can be paired with familiar favorites like boxes and scratching surfaces.","Avoid assuming every cat likes the same texture, movement, or noise level."]
];

const channels = [
["instagram","Instagram","A five-product pet roundup under C$35. Play, hydration, walking visibility, slower feeding and comfort—all in one collection."],
["tiktok","TikTok","Five practical pet picks under C$35. Which one would your pet actually use?"],
["youtube_shorts","YouTube Shorts","5 affordable pet products in one quick roundup: toy, waterer, reflective harness, slow feeder and kennel mat."],
["facebook","Facebook","Pet owners: here are five practical picks under C$35 covering everyday routines from play to rest."],
["threads","Threads","A pet-product list that is actually about routines: play, water, walking, meals and rest. All five are under C$35."],
["pinterest","Pinterest","Save this: five affordable pet-product ideas under C$35 for cats and dogs."],
["reddit","Reddit","Sharing a straightforward under-C$35 pet gear roundup. I’d be interested in which categories people actually find useful."],
["x","X","5 practical pet picks under C$35: cat toy, waterer, reflective harness, slow feeder, kennel mat."],
["linkedin","LinkedIn","A small ecommerce test: five practical pet products, one focused collection, channel-level tracking, and earned distribution instead of ad spend."],
["bluesky","Bluesky","Five practical pet picks under C$35, built around everyday routines rather than novelty."],
["telegram","Telegram","Today’s pet roundup: five practical products under C$35. Full collection here."],
["whatsapp","WhatsApp","Sharing a quick pet-product roundup: five practical picks under C$35."],
["discord","Discord","Pet people: I’m testing a five-item collection under C$35 and would value real feedback on which category is most useful."],
["google_business_profile","Google Business Profile","New roundup: five practical pet products under C$35, covering play, hydration, visibility, feeding and comfort."],
["medium","Medium","A practical guide to five everyday pet-product categories you can cover for under C$35 each."],
["substack","Substack","This week’s budget pet roundup: five products tied to everyday routines, not impulse novelty."],
["wordpress","WordPress","Five practical pet products under C$35: a concise buying guide for play, water, walking, meals and rest."],
["tumblr","Tumblr","tiny pet gear roundup 🐾 five practical picks under C$35"],
["quora","Quora","If the goal is useful pet gear under C$35, I would start with the routine you want to improve: play, water, walking, feeding, or rest."],
["snapchat","Snapchat","5 PET PICKS UNDER C$35 🐾"],
["nextdoor","Nextdoor","For local pet owners: sharing a small roundup of five practical pet products under C$35."],
["mastodon","Mastodon","Testing a practical five-product pet collection under C$35, with each item tied to a normal daily routine."],
["flipboard","Flipboard","5 Practical Pet Products Under C$35"],
["blogger","Blogger","A budget-conscious pet roundup covering five everyday categories."],
["email_forward","Email","Thought you might like this five-item pet roundup—everything is under C$35."]
];

function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function shell(title,description,body,robots="index,follow"){
return \`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>\${esc(title)} | Carnival Careers Commerce</title><meta name="description" content="\${esc(description)}"><meta name="robots" content="\${robots}"><style>body{margin:0;background:#0b0b0b;color:#fff;font-family:Arial,Helvetica,sans-serif}.w{max-width:820px;margin:auto;padding:48px 20px 80px}.e{color:#ff4b54;text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:900}h1{font-size:42px;line-height:1.05;margin:10px 0 16px}p,li{font-size:18px;line-height:1.6;color:#d1d1d1}.c{display:inline-block;background:#e30613;color:#fff;text-decoration:none;font-weight:900;padding:14px 22px;border-radius:999px;margin:12px 0 22px}.box{background:#151515;border:1px solid #2b2b2b;border-radius:14px;padding:20px;margin:24px 0}a{color:#fff}</style></head><body><main class="w">\${body}</main></body></html>\`;
}

for(const [slug,title,description,product,body,tips] of seo){
 const target=product?product.url:collection;
 const link=\`\${target}?utm_source=organic&utm_medium=seo&utm_campaign=\${slug}\`;
 const productBox=product?\`<div class="box"><strong>Featured option:</strong> \${esc(product.name)} — \${product.price}<br><a href="\${link}">View product</a></div>\`:\`<div class="box"><a href="\${collection}?utm_source=organic&utm_medium=seo&utm_campaign=\${slug}">View all five Trending Pet Picks</a></div>\`;
 const html=shell(title,description,\`<div class="e">Carnival Careers Commerce Guide</div><h1>\${esc(title)}</h1><p>\${esc(description)}</p><p>\${esc(body)}</p>\${productBox}<h2>Keep it practical</h2><p>\${esc(tips)}</p><p><a href="/pet-picks-press.html">Press and creator kit</a></p>\`);
 fs.writeFileSync(path.join(dist,\`\${slug}.html\`),html);
}

for(const [slug,label,copy] of channels){
 const tracked=\`\${collection}?utm_source=\${slug}&utm_medium=organic_share&utm_campaign=free100\`;
 const html=shell(\`\${label} Share Kit\`,\`Ready-to-use organic share copy and tracked link for \${label}.\`,\`<div class="e">Free Distribution Asset</div><h1>\${esc(label)} Share Kit</h1><div class="box"><strong>Ready-to-use copy</strong><p>\${esc(copy)}</p><strong>Tracked link</strong><p><a href="\${tracked}">\${tracked}</a></p></div><a class="c" href="\${tracked}">Open Trending Pet Picks</a><p><a href="/pet-picks-press.html">Open press kit</a></p>\`,"noindex,follow");
 fs.writeFileSync(path.join(dist,\`share-\${slug}.html\`),html);
}

const sitemap = seo.map(([slug])=>\`  <url><loc>https://carnival-careers-live-current.vercel.app/\${slug}.html</loc></url>\`).join("\\n");
fs.writeFileSync(path.join(dist,"sitemap-pet-commerce.xml"),\`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n\${sitemap}\\n</urlset>\`);
console.log("FREE_DISTRIBUTION_ASSETS_GENERATED", seo.length + channels.length);
