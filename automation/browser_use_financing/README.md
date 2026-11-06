# CC Universe — Browser Use financing application runner

This is an open-source [Browser Use](https://github.com/browser-use/browser-use) integration, restricted to source-backed Canadian commercial financing inquiries. **No financial documents or private company credentials are stored here.**

## What this does

- `--mode check`: check all 14 lender routes against financing evidence gates, offline.
- `--mode explore`: open each lender page and inspect eligibility/form fields; make no submissions.
- `--mode fill --provider "BDC"`: fill known fields for one lender; do not submit.
- `--mode submit --provider "BDC"`: only attempt a submission after legal borrower, signatory, and finance-product evidence gates are verified. Independently confirm any success with the lender.

## Setup on Windows

1. Install Python 3.12+, the open-source `browser-use` package, and either Ollama with an 8B model or your own separately billed OpenAI developer API key.
2. Run `python -m pip install browser-use` and `ollama pull llama3.1:8b`, then run or start Ollama locally. The `runner.py` defaults to `LLM_PROVIDER=ollama`. Browser Use may require separate Chrome installation; see its official setup guide.
3. Make a **local, private** copy of `cc_profile.example.json` named `cc_profile.private.json`. Add CC's verified contact details and evidence flags; do not guess. Do not commit this private file to GitHub.
4. Run `python runner.py --mode check`, then `python runner.py --mode explore --provider "BDC"` from this directory.

## Current classification

The C$30,000 One Live Events promoter memo is a potential CC **payable**, not a CC receivable. The CJ's Punch proposed C$2,000 contribution is not an established invoice. The known source set has not verified current unpaid B2B invoices, accepted customer POs, approved reverse-factoring buyer payables, or a legal borrower and authorized signer. Consequently the automated eligibility gate currently blocks all lender **submissions**.

**Execution status:** Code and lender routes are prepared. No third-party lender application has been submitted. The ChatGPT local execution environment blocks browsing external websites. Run the agent on a network-enabled machine with an available model (Ollama local or authorized API service).
