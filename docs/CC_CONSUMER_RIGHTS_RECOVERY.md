# Carnival Careers — Consumer Rights & Recovery (operating standard)

Effective planning date: 2026-10-10. Owner: CC Operations / Families. Status: policy and public education gateway only; private case platform and counsel network are NOT represented as live. Jurisdictions: Canada first; U.S. per-city only when applicable.

## Purpose and boundaries

Create a repeatable household-protection workflow for unwanted calls. Log authentic evidence, screen for regulatory violations, facilitate complaints, and refer potential individual claims to qualified independent counsel. Do not treat regulatory penalties or speculative private settlements as CC receivables. Do not solicit unlawful robocalls, set traps by misrepresenting identity, fabricate evidence, issue unsupported threats, or promise settlements.

The circulating 'Unethical ways to make money, Part 3' transcript contains a U.S.-specific TCPA damage concept but substantially oversimplifies standing, exemptions, proof, and settlement. This standard supersedes claims of automatic US$1,500 per call or routine US$2k–$3k NDA settlements.

## Public entry points

- Families -> My CC Life -> Consumer Rights & Recovery
- Direct public guide: /rights-recovery.html
- Existing secure resident login: https://carnival-careers-os.floot.app/login (do not claim this upgraded module is live)
- No publicly accessible data intake; public template downloads locally and transmits nothing

## Case fields (private, future system only)

case_id, household_id, rights_holder_id, jurisdiction, number_type, registration_date, registry_proof_ref, call_date_time_timezone, called_number, caller_id_displayed, claimed_company, verified_company, seller_or_telemarketer, call_nature, sales_purpose, consent_proof, relationship_exemption, prior_internal_DNC_request_date, repeat_calls_same_entity_12mo, audio_or_voicemail_ref, recording_law_review, regulator_complaint_ref, evidence_integrity_status, lawyer_review_status, action_owner, next_deadline, actual_recovery_amount, payee, agreement_proceeds_allocation, close_reason. Encrypt sensitive records and use restricted role access; consent and retention policy needed before actual implementation. Preserve original files and audit trail.

## Routing

1. **Register and protect**: Canada: eligible personal numbers on CRTC DNCL; 31-day telemarketer grace period. U.S.: DoNotCall.gov; allow up to 31 days for covered solicitation to stop. Business numbers and exempt calls require separate analysis.
2. **Observe existing calls only**: capture date/time/timezone, company asserted, called line, purpose, evidence, and prior opt-out. Do not assume an asserted company or Caller ID equals the legal caller; spoofing is common. If robocall appears suspicious, do not engage with bots or provide personal data.
3. **Screen, never auto-accuse**: correct statute, location, exemption, consent, registration, repeat-calling and line type. Flag unanswered elements as unverified; not a violation.
4. **Official complaints**: Canada National DNCL complaint -> CRTC. U.S. FTC and applicable FCC/state channels. Consumer rights-holder approves submissions.
5. **Counsel handoff**: claims and demand letters only after rights-holder approval and appropriately licensed lawyer's assessment; check lawyer referral, contingency, and fee-sharing rules. CC does not practice law or own tenants' private claims merely because it offers an app.
6. **Finance**: Canadian administrative fines are regulator assessments, not claimant/CC revenue. US TCPA §227(b)(3) may permit $500 per violation with up to treble for willful/knowing violations, subject to discretion; §227(c)(5) DNC private action generally needs more than one qualifying call by same entity in 12 months. Actual recoveries belong to the rights holder unless a lawful, explicit arrangement says otherwise. Only recognized, collectible funds are booked. Base CC forecast = 0.

## Integration requirements

**Families / My CC Life:** Self-service guide and evidence checklist; optional future private submission restricted by household consent.

**Operations / Legal:** Case queue statuses New -> Evidence needed -> Screened -> Filed/Reported -> Counsel review -> Resolved/Closed; independent legal-review checkpoint, deadline calendar, no duplicate complaints, documented authorizations.

**Capital / Compliance:** No settlement pipeline masquerading as sales, grants, property finance, vendor equity, or festival funding. Track separate expense category 'Consumer rights education/compliance'. Track any CC-owned realized award only after legal entitlement, accounting confirmation and payment.

**Outbound:** No mass demand letters or settlement solicitations. No auto-filing, auto-recording or contacting identified callers until lawful basis, facts and explicit approval are documented.

## Authoritative sources (checked 2026-10-10)

- CRTC Consumer guide: https://crtc.gc.ca/eng/phone/telemarketing/ysk.htm
- CRTC rules and enforcement: https://crtc.gc.ca/eng/phone/telemarketing/tobligations.htm
- CRTC exemptions: https://crtc.gc.ca/eng/phone/telemarketing/exempt.htm
- FTC registry consumer FAQ: https://consumer.ftc.gov/articles/national-do-not-call-registry-faqs
- U.S. TCPA: https://www.law.cornell.edu/uscode/text/47/227

## Launch gates (NOT completed)

- Counsel legal review for Canada/U.S. jurisdictions
- Privacy impact assessment, resident opt-in, retention period, staff roles, encryption, breach procedures
- Secure case backend integrated with resident identity
- Verified complaint referral partnership, if any
- Written cost/revenue/accounting policy for any funded service
