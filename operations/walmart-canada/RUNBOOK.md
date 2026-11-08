# Carnival Careers — Walmart Canada direct-sales runbook

## Current truthful status (2026-11-07)
- Independent Walmart Canada integration is saved in this repo, without Shopify.
- No connected Walmart seller account, seller approval, Walmart Global API keys, approved SKUs, paid inventory, WFS shipment, live listings or sales have been demonstrated.
- The scheduled GitHub workflow checks product economics and (once keys exist) authenticates in a read-only manner and tests catalog, inventory and order APIs. It cannot purchase, publish or ship.
- This repo is PUBLIC: never commit IDs, passwords, business registration documents, tax numbers, payment information, API secrets, or raw customer orders.

## Checkpoint 1: User authorizes and connects Walmart
1. Use https://www.walmart.ca/en/marketplace > Request to sell. Provide the actual legal business name, verifiable identity, business/tax number or registration documentation, real address, commerce experience and product plans. Never fabricate licensing.
2. Obtain Walmart seller approval; sign their agreement; complete payout setup and WFS onboarding.
3. In Walmart Developer Portal generate Global API credentials. Store credentials in this repo's GitHub Settings > Secrets and variables > Actions as repository **secrets**:
   - CC_WALMART_CLIENT_ID
   - CC_WALMART_CLIENT_SECRET
4. Run the workflow from GitHub Actions. It uses sandbox by default. For Walmart-issued production credentials, set Actions variables CC_WALMART_ENV=production and CC_WALMART_PRODUCTION_READY=true. The worker is still read-only.
This is the first of the two owner checkpoints, although Walmart may request further verification.

## Supplier pipeline — sourced, NOT contacted
**A. Aurora Wholesale Inc.**, Vaughan ON: https://aurorawholesaleinc.com
Public contact: sam@aurorawholesaleinc.com ; 647-887-1033.
Supplier says it holds warehouse stock, buys from authorized channels, sells on Walmart.ca and supplies registered retailers by case. It has NOT verified resale permissions, a CC wholesale account, direct WFS delivery, a current quote or an approved SKU.

**B. NexDeal Distribution**, Van Nuys, CA: https://nexdeal.com/how-nexdeal-works/
Bulk-only seller; no per-order dropshipping. Customer pays US-to-Canada shipping/duties; no manufacturer brand authorization letters; orders final. High-risk backup only; do not buy on the video's suggested profit arithmetic.

Target discovery categories: non-aerosol housewares organizers, office accessories, home organization. No SKU has been approved or price-matched by UPC.

**Procurement inquiry — draft only, NOT sent:**
Subject: Walmart.ca WFS-compliant wholesale line card and quotation — Carnival Careers

Hello, we are sourcing new-condition nonregulated housewares and office accessories for Walmart Canada Marketplace / WFS. Please send your available UPC/GTIN line card with wholesale CAD prices, case packs, MOQ, inventory, source and resale permissions, dimensions, HS classification, lead time, direct-to-WFS prep/labeling capability, full freight costs, and return/cancellation terms. Please indicate whether delivery can be arranged to Walmart-assigned Canadian WFS locations after Walmart approves the inbound shipment. We will not order before marketplace and fulfillment acceptance.

Thank you,
Carnival Careers

## Product check
- Confirm exact UPC, category, brand resale eligibility, *new* condition and Walmart.ca marketplace approval.
- Confirm WFS acceptance (no prohibited aerosol/perishable/regulated SKU).
- Obtain landed CAD costs and supplier stock; factor referral %, WFS pick/pack, storage, prep, freight, import duty, unrecoverable taxes and reserves for returns.
- Populate candidates.csv with *verified*, quoted numbers only. Run python3 operations/walmart-canada/profit_gate.py operations/walmart-canada/candidates.csv.
- Profit floor: C$5 per unit **and** 20% contribution margin, before approval to buy (CC's screening policy, not a promise).
- A passing screen is not permission to purchase; unsold items can still lose money.

## Checkpoint 2: Owner approves one exact inventory order
Approve SKU/UPC, brand and item authorization, quantities, supplier invoice, all-in landed cost, estimated margin, return policy, required cash, fulfillment destination and documented downside. A person then funds/authorizes the wholesale purchase. Generate WFS inbound shipping documents only for accepted items, confirmed shipping address and actual quantity.

## Post-launch path
Approved supplier -> approved listing and WFS item conversion -> WFS inbound plan -> warehouse receipt -> Walmart.ca sale -> WFS packing/delivery/returns -> Walmart payout -> reconciliation.

The current workflow does NOT automate writes/purchases or revenue: those require seller credentials, approved product data, API permission tests and seller-authorized transactions.

Official references:
- https://www.walmart.ca/en/marketplace
- https://developer.walmart.com/global-marketplace/docs/global-marketplace-apis
- https://developer.walmart.com/global-marketplace/docs/get-an-access-token-using-token-api
- https://marketplacelearn.walmart.com/ca/guides/Walmart%20Fulfillment%20Services%20%28WFS%29/WFS%20basics/walmart-fulfillment-services-wfs-program
