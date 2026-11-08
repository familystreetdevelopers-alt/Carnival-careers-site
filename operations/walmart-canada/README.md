# Carnival Careers — Walmart Canada marketplace lane

**Independent of Shopify.** This folder does not change the Carnival Careers website, Shopify, or checkout.

## Status (2026-11-07)

- Operating route verified: Walmart Canada Marketplace -> Walmart Fulfillment Services (WFS) -> direct API integration.
- No Walmart seller authorization, API credentials, approved product listings, wholesale purchase, WFS inbound shipment, or sales have been confirmed.
- Any inventory purchase requires explicit human approval. This repo must NEVER contain passwords, seller IDs, tax/ID documents, bank details, or API secrets.
- NexDeal (nexdeal.com) operates bulk wholesale, NOT per-order dropshipping. Supplier claims about brand authorization, in-stock units, delivery-to-WFS, taxes, and marketplace approvals must be verified for each item.
- WFS Canada prohibits aerosols and some regulated items; never copy the Axe body spray example.
- An out-of-stock Walmart listing does NOT prove unmet demand, a vacant listing, brand resale permission, or a profitable opportunity.

## The only two user-facing checkpoints

1. Complete and approve official [Walmart Canada Marketplace enrollment](https://www.walmart.ca/en/marketplace) and WFS onboarding, providing Walmart-required legal business/BN, ID verification, payout, tax and return-address information. Walmart approval is discretionary. Once approved, enable the **Global API** in Seller Center and store Walmart keys in **GitHub Actions encrypted secrets**, never committed files.
2. Approve payment for a verified first wholesale shipment **only after** Walmart accepts the products for sale and WFS, the supplier confirms source/rights/packing/direct warehouse delivery, and the calculated *landed* profit passes the thresholds below.

## Prepared controls

Run `python3 operations/walmart-canada/profit_gate.py operations/walmart-canada/candidates.csv`.

Edit candidates.csv to add supplier-quoted, independently verified Canadian-dollar inputs. All five vetting flags must be `yes` to pass the gate. At least C$5/unit net contribution and 20% net contribution margin are required by default; these are CC risk-control assumptions, not Walmart policy or a profit guarantee.

Automatable **after approval/credentials**: catalog sync, inventory status, repricing within a profit floor, order reporting, WFS restock alerts, reconciliation, and estimated contribution reports. Supplier orders / inventory spending remain approval-gated.

## Primary documentation

- [Walmart Canada marketplace application](https://www.walmart.ca/en/marketplace)
- [Canadian seller onboarding/verification](https://marketplacelearn.walmart.com/ca/guides/Getting%20started/Onboarding/complete-onboarding-in-seller-center)
- [WFS Canada program and restrictions](https://marketplacelearn.walmart.com/ca/guides/Walmart%20Fulfillment%20Services%20%28WFS%29/WFS%20basics/walmart-fulfillment-services-wfs-program)
- [WFS Canada storage and fulfillment fees](https://marketplacelearn.walmart.com/ca/guides/Walmart%20Fulfillment%20Services%20%28WFS%29/WFS%20basics/wfs-fees)
- [Walmart Canada Global Marketplace APIs](https://developer.walmart.com/ca-marketplace/docs/global-marketplace-apis)
- [NexDeal wholesale FAQ](https://nexdeal.com/faqs/)

## No false green lights

- No item is *approved* merely because it is found in a marketplace search.
- Never place an automatic purchase or upload an unverified branded listing.
- Do not claim revenue, completed onboarding, API connectivity, or an active Walmart store before the relevant response confirms it.
