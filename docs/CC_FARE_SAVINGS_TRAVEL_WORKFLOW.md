# CC Travel — Fare Savings, Flight Price Monitoring & Post-Booking Credit Screening
**Toronto first / Carnival Careers unified commercial Travel workflow / 2026-10-12**

## Identity
This is an additional operating capability within **CC Travel + Plane Pool + My CC Life + Commerce + Treasury + Consumer Rights**. No duplicate travel app, independent company, third-party inbox login, new tourism inventory, separate blast engine or automatic paid subscription. Canonical customer-facing page: https://carnival-careers-live-current.vercel.app/fare-savings.html

## Facts vs viral hacks
- Google's October 2026 research reports that the cheapest day to BOOK is negligible (~1.4% difference Wednesday vs Sunday). Day of travel and itinerary flexibility matter more, not a Tuesday/Wednesday/Saturday booking rule. https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/
- No verified universally cheapest 3–4 AM checkout time. Never imply incognito/VPN automatically reduces pricing. Compare actual all-in prices, same passengers, currency, locations and point-of-sale without misrepresenting residence.
- Google Flights supports booking-window insights and price tracking on selected route/dates; alerts are not booked seats, fare holds or actual purchase authorization. https://support.google.com/travel/answer/7664728?hl=en
- JetBack is a real third-party product, not CC infrastructure. It advertises US$99.99/year and major US airlines; typical eligible outcomes are nontransferable airline eCredits, not guaranteed cash. Its legal terms allow reticketing, seat/benefit changes, Gmail OAuth and optional OTP proxying, and grant a limited agency/power of attorney. It is licensed for personal noncommercial use and forbids automation/bots beyond permitted scope, redistribution and commercial resale without consent. Do not enroll clients, forward confirmations, connect mailboxes or proxy verification codes automatically. https://getjetback.com/terms/ https://getjetback.com/
- Distinguish discretionary price-drop fare credit from refund for significant flight change/cancellation or other passenger-rights claims. The US DOT's refund guidance is not a blanket airfare price-drop refund rule; airline and jurisdiction fare rules govern. https://www.transportation.gov/individuals/aviation-consumer-protection/refunds
- Canada-first: review Air Canada/WestJet/other fare rules, original seller-of-record and itinerary. UltraBasic/nonchangeable and OTA fares need extra caution. Example https://www.westjet.com/en-ca/manage/change-cancel

## What CC sells
- A clearly priced **pre-booking flight comparison service** (use existing CC travel/research/route products when active) comparing dates, nearby airports, connecting itineraries, baggage and fare rules. Third-party airlines/agencies own inventory, price, ticketing, payment and refunds.
- Optional **post-booking fare eligibility review** as a discrete service only with confirmed fee, defined scope and consent: compare publicly available identical airline fares, obtain passenger/booking-channel details solely through a proper secure authorized channel, identify eligible cash/credit/change paths and produce a documented recommendation.
- Optional **travel disruption assistance**: evidence-based passenger rights/third-party policy assistance and traveler-authorized provider contact. No legal representation or guaranteed compensation.
- **Families/My CC Life**: educational self-service travel budgeting and an opt-in airfare-savings referral path; benefits independent from tenancy, employment and property ownership.
- **65-city CC circuit**: group cabin/air + carnival itineraries; Plane Pool demand matching remains referral-only until provider confirms real inventory. Affiliate/referral revenues only from approved partner terms; no unauthorized flight ticket/resale/fee.

## Operational states for each fare review
CUSTOMER_INQUIRY -> CONSENT_CAPTURED -> BOOKING_CHANNEL_AND_POLICY_VERIFIED -> SAME_ITINERARY_FARE_CHECK -> COMPARABLE_PRICE_SAVED -> FEES_AND_CREDIT_RESTRICTIONS_VERIFIED -> NET_ECONOMIC_VALUE_ESTIMATED -> CUSTOMER_OPT_IN_AND_SPECIFIC_APPROVAL -> AIRLINE_OR_AGENT_SUBMISSION -> WRITTEN_AIRLINE_RESULT -> CREDIT_ISSUED_OR_CASH_REFUND_SETTLED -> CC_SERVICE_DELIVERED -> CC_FEE_COLLECTED.
Fail states: NO_ELIGIBLE_FARE, PRICE_INCREASED, CREDIT_RESTRICTIONS_WORSE, DIFFERENT_FARE_CLASS, BANK/AIRLINE_LOGIN_REQUIRED, NO_AUTHORIZATION, THIRD_PARTY_REJECTED. Stop if negative economics or loss of seat/baggage benefits.

## Capture only minimum authorized customer data
Use customer-owned account, secure intake and informed consent. In public/ordinary contact path collect only basic route/city, carrier, general date/month, fare type, booking channel, and whether the customer seeks a quote. Never request PNR/confirmation, passport, boarding pass, payment info, airline login, credit card, security answers, MFA/OTP, or sensitive travel information in a public form, analytics, URL, ordinary email or shared spreadsheet. Do not collect co-passenger data without permission; no personal itinerary in general staff broadcasts. Customer controls authorization to share the necessary details through approved secure means.

## Accounting, fees and proof
Original ticket fare / current all-in equivalent fare / currency and time checked / per passenger / paid exchange penalty / difference in bag-seat-benefit value / actual eligible airline credit (currency, expiry, owner, restrictions) / genuine cash refund / CC disclosed service fee / referral commission where contracted and earned.
**Net estimated benefit = max(0, genuine same-itinerary price difference − unavoidable fees − loss of material benefits)**, not a cash credit promised.
Theoretical difference not included in revenue, cash collection, household savings or CC payable. An eCredit is not CC income; receipt must be verified to actual traveler account and classified as customer benefit. CC revenue is its own agreed and genuinely earned/settled service fee or authorized commission, not the airfare difference unless a lawful, disclosed contract specifically provides and customer has consented.

## Automation controls
- Only where passenger consent, legitimate airline/provider access and law/platform conditions exist may a tool monitor fare alerts. Standard no-cost default: traveler activates Google Flights alerts in own account and optionally forwards *only the alert/link* for opt-in CC review, not the PNR/booking email.
- Existing CC active Travel/Mobility task may examine paid CC travel-service intake and inbound fare-saving requests, but must not scan or forward private noncustomer flight bookings or modify reservations.
- Contact airline/OTA on behalf of traveler only with specific authorization and access within provider terms; signing, reticketing, cancel/refund election, accepting voucher/credit and subscriptions are always traveler-only final decisions.
- No browsing/scraping/OTP automation circumventing provider terms; no mass promises or guaranteed savings. Never book on an arbitrary Tuesday/4AM schedule.
- Keep the canonical travel/Shopify fulfillment loop as the sole paid-service work owner; route CC website inquiries there. Do not spawn a second seller-of-record.

## Evidence and truth labels
SOURCE VERIFIED (Google Flights or airline rule) != PRICE OBSERVED != FARE COMPARABLE != FARE ELIGIBLE != CLAIM SENT != CREDIT ISSUED != CASH REFUNDED != CC FEE SETTLED.
Report only verifiable customer demand, live paid order, real potential savings after policy, authorized accepted claim or posted credit/refund, or user-only action. No guaranteed savings and no booking change without permission.
