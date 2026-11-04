import fs from "node:fs";
import path from "node:path";
const dist=path.resolve("dist"),site="https://carnival-careers-live-current.vercel.app",os="https://carnival-careers-os.floot.app";
if(!fs.existsSync(path.join(dist,"ai-opportunities.html")))throw Error("Deal intake page missing");
const item={
openapi:"3.1.0",
info:{title:"Carnival Careers — Authorized Commercial Buyer Mandate Intake",version:"1.0.0",description:"Machine-to-machine CC commercial buyer request intake. No automatic contract, licence, payment, guaranteed return, banking instruction, or authorization. Prospects and budgets are unverified until independently confirmed.",contact:{name:"Carnival Careers commercial desk",email:"familystreetdevelopers@gmail.com",url:site+"/ai-opportunities.html"}},
servers:[{url:os,description:"CC-owned operating system for private, durable buyer enquiries"}],
paths:{
"/_api/public/intake":{post:{
operationId:"submitCarnivalCareersCommercialBuyerMandate",
summary:"Record a legitimate buyer request for a CC product, original music licence, commercial service, sponsorship or qualified financing enquiry",
description:"The caller must represent a real human buyer and obtain permission before sending their contact details. Only owner-reviewed non-binding leads are created. Uses plain text JSON to avoid cross-origin preflight restrictions. The backend enforces rate limiting, deduplication, budget, email, deadline and consent validation.",
requestBody:{required:true,content:{"text/plain":{schema:{
type:"object",required:["kind","payload","sourceUrl"],
properties:{kind:{const:"agent-commerce"},sourceUrl:{type:"string",format:"uri",maxLength:500},
payload:{type:"object",required:["lane","buyer_organization","human_decision_maker","business_email","proposed_budget_cad","decision_deadline","requested_deliverables","consent","declared_authority"],properties:{
lane:{type:"string",enum:["sponsorship","music","artist","media","arena","merchandise","travel","real-estate","investment","services","city-partners","royalties","ai-data-licensing"]},
buyer_organization:{type:"string",minLength:2,maxLength:140},human_decision_maker:{type:"string",minLength:2,maxLength:120},
business_email:{type:"string",format:"email",maxLength:160},phone:{type:"string",maxLength:40},
proposed_budget_cad:{type:"number",minimum:1},decision_deadline:{type:"string",format:"date"},
requested_deliverables:{type:"string",minLength:25,maxLength:2500},
mandate_evidence_url:{type:"string",format:"uri",maxLength:350},
consent:{const:true},declared_authority:{const:true},verified_by_cc:{const:false},
channel:{type:"string",const:"cc-agent-commerce"}
}}}
},example:{kind:"agent-commerce",payload:{channel:"cc-agent-commerce",lane:"music",buyer_organization:"Example organization, not a real lead",human_decision_maker:"Example rights manager",business_email:"fictional@example.com",proposed_budget_cad:30000,decision_deadline:"2026-12-01",requested_deliverables:"Example: request a 12-month nonexclusive license for use of a CC song in a branded video campaign.",consent:true,declared_authority:true,verified_by_cc:false},sourceUrl:site+"/ai-opportunities.html"}}}},
responses:{
"201":{description:"New CC enquiry saved; an unverified reference and private lookup token returned",content:{"application/json":{schema:{$ref:"#/components/schemas/IntakeResponse"}}}},
"200":{description:"Duplicate request in deduplication window",content:{"application/json":{schema:{$ref:"#/components/schemas/IntakeResponse"}}}},
"400":{description:"Invalid or unsupported request"},"403":{description:"Unsupported browser origin"},
"413":{description:"Payload too large"},"422":{description:"Real buyer criteria or mandatory consent missing"},
"429":{description:"Rate limit exceeded"}
},tags:["Buyer Mandates"],security:[]
}},
components:{schemas:{IntakeResponse:{type:"object",required:["reference","lookupToken","status","duplicate","createdAt"],properties:{reference:{type:"string"},lookupToken:{type:"string",description:"Private token; not for publishing"},status:{type:"string",example:"RECEIVED"},duplicate:{type:"boolean"},createdAt:{type:"string",format:"date-time"}}}}}
};
const p=path.join(dist,"cc-buyer-api-openapi.json");fs.writeFileSync(p,JSON.stringify(item,null,2)+"\n","utf8");
const discovery={
schema:"Carnival Careers public commercial discovery 2026-11-04",
name:"Carnival Careers Deal Matching",
type:"non-autonomous buyer intake; not an A2A agent server",
roles:["qualified product buyer","original music licensee","film production commissioner","commercial sponsor","authorized investor","services procurement"],
landing:site+"/ai-opportunities.html#cc-deal-intake",
catalogue:site+"/CC_AGENT_COMMERCE.json",
music:site+"/cc-music-sync-catalog.json",
api_openapi:site+"/cc-buyer-api-openapi.json",
submission_api:os+"/_api/public/intake",
protocols:["HTTPS","OpenAPI 3.1"],
capabilities:["public offer discovery","machine-readable catalogue","record buyer mandate","return durable reference","owner-reviewed manual negotiation"],
restrictions:["no delegated power to sign or spend","no permission to access banking","no automatic outbound email","no guarantee of sale or royalty ownership","no fictitious buyers"],
auth:"Public, rate-limited intake with buyer consent and proof verification by CC; no payment capability",
contact:"familystreetdevelopers@gmail.com"
};
fs.mkdirSync(path.join(dist,".well-known"),{recursive:true});
fs.writeFileSync(path.join(dist,".well-known","cc-commerce-agent.json"),JSON.stringify(discovery,null,2)+"\n");
fs.appendFileSync(path.join(dist,"llms.txt"),"\n- [CC machine-readable OpenAPI 3.1 contract]("+site+"/cc-buyer-api-openapi.json)\n- [CC open protocol capabilities]("+site+"/.well-known/cc-commerce-agent.json)\n");
console.log("Buyer mandate OpenAPI and machine-agent discovery published without claiming unimplemented A2A protocol");
