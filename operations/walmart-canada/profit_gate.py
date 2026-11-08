#!/usr/bin/env python3
"""Read-only Walmart Canada wholesale candidate margin gate. No network or purchases."""
import csv
import json
import sys
from decimal import Decimal, InvalidOperation
from pathlib import Path

REQUIRED = [
    "sku", "product", "supplier_url", "sell_price_cad", "wholesale_unit_cad",
    "referral_pct", "wfs_fulfillment_cad", "storage_per_unit_cad",
    "inbound_shipping_per_unit_cad", "duty_tax_not_recoverable_cad",
    "returns_reserve_per_unit_cad", "other_fees_per_unit_cad", "moq",
    "supplier_verified", "brand_resale_authorized", "walmart_listing_approved",
    "wfs_item_approved", "nonregulated_eligible"
]
FLAGS = ["supplier_verified", "brand_resale_authorized",
         "walmart_listing_approved", "wfs_item_approved", "nonregulated_eligible"]
COSTS = [
    "wholesale_unit_cad", "wfs_fulfillment_cad", "storage_per_unit_cad",
    "inbound_shipping_per_unit_cad", "duty_tax_not_recoverable_cad",
    "returns_reserve_per_unit_cad", "other_fees_per_unit_cad"
]
MIN_PROFIT = Decimal("5.00")
MIN_MARGIN = Decimal("0.20")


def money(v, field):
    try:
        n = Decimal(str(v).strip())
    except (InvalidOperation, TypeError):
        raise ValueError(f"{field}: a verified CAD amount is required")
    if not n.is_finite() or n < 0:
        raise ValueError(f"{field}: must be finite and nonnegative")
    return n


def evaluate(row):
    result = {"sku": row.get("sku", ""), "product": row.get("product", ""), "status": "HOLD"}
    pending = [flag for flag in FLAGS if row.get(flag, "").strip().lower() != "yes"]
    try:
        price = money(row["sell_price_cad"], "sell_price_cad")
        referral = money(row["referral_pct"], "referral_pct")
        if price == 0 or referral > 100:
            raise ValueError("sell_price_cad must be positive and referral_pct at most 100")
        costs = sum((money(row[f], f) for f in COSTS), Decimal("0"))
        moq = int(row["moq"])
        if moq <= 0:
            raise ValueError("moq must be a positive integer")
        fee = price * referral / 100
        profit = price - fee - costs
        margin = profit / price
        result.update({
            "unit_profit_cad": str(profit.quantize(Decimal("0.01"))),
            "contribution_margin_pct": str((margin * 100).quantize(Decimal("0.01"))),
            "minimum_stock_cash_cad": str((money(row["wholesale_unit_cad"], "wholesale_unit_cad") * moq).quantize(Decimal("0.01"))),
            "minimum_order_qty": moq
        })
        if profit < MIN_PROFIT:
            pending.append("profit below C$5/unit floor")
        if margin < MIN_MARGIN:
            pending.append("contribution margin below 20%")
    except (ValueError, KeyError) as exc:
        pending.append(str(exc))
    result["blockers"] = pending
    if not pending:
        result["status"] = "REVIEW_FOR_PURCHASE"  # Still requires explicit approval.
    return result


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("candidates.csv")
    with path.open(newline="", encoding="utf-8-sig") as f:
        rdr = csv.DictReader(f)
        missing = sorted(set(REQUIRED) - set(rdr.fieldnames or []))
        if missing:
            raise SystemExit("Missing CSV columns: " + ", ".join(missing))
        candidates = [evaluate(row) for row in rdr if (row.get("sku") or "").strip()]
    print(json.dumps({"candidates": candidates, "ready_for_purchase_review": sum(x["status"] == "REVIEW_FOR_PURCHASE" for x in candidates)}, indent=2))
    # Always 0 for a valid file: failure of profitability must not interrupt scheduled reporting.


if __name__ == "__main__":
    main()
