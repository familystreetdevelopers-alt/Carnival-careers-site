# CC Universe — Eight Revised Canonical Masters (Encrypted)
**GitHub status: PERSISTED / VERIFIED** — 8 November 2026

The real revised master files are securely stored in this GitHub repository as **one encrypted ZIP archive** containing all eight source-derived master revisions and 3 audit/README files.

**Public-repository confidentiality:** the repository is public, so only authenticated AES-256-GCM ciphertext is committed. The **key is NOT in GitHub**; the owner receives it directly in the ChatGPT response. If the key is lost, this encrypted archive cannot be opened without recovering it from the owner. Do not put the decryption key in a commit, issue, PR, public website, environment example, shared document, or CI log.

## Encrypted GitHub source
- File: [CC_UNIVERSE_EIGHT_MASTERS_2026-11-08.zip.aesgcm](CC_UNIVERSE_EIGHT_MASTERS_2026-11-08.zip.aesgcm)
- Git blob SHA-1: `ebe372f293accc2118d04844d267ac576bd22cee`
- Encrypted size: `606662 bytes`
- Encrypted SHA-256: `8592b44ce14bf95d550bfe98c9726fa82009a8f77f68081175a4ebf1e776ef4f`
- Expected decrypted ZIP SHA-256: `2837b90a2382901447e57ae325c7b1d9fc3a2cd6c7843f0afa0783d9adf67a76`
- Stored format: `CC-AESGCM-20261108\n` (header), 12-byte GCM nonce, ciphertext and GCM authentication tag.
- AAD: `CC Universe eight canonical revisions 2026-11-08`
- Code: [decrypt_cc_masters.py](../../tools/decrypt_cc_masters.py)

## How to open
1. Download the `.zip.aesgcm` file from GitHub, using **Download raw file**.
2. With Python installed, run `python -m pip install cryptography`.
3. From a clone of this repository, run:
   ```bash
   python tools/decrypt_cc_masters.py vault/encrypted/CC_UNIVERSE_EIGHT_MASTERS_2026-11-08.zip.aesgcm
   ```
4. At the hidden prompt, paste the owner-held 64-character hexadecimal key (provided in private ChatGPT reply).
5. A verified ZIP is saved beside the encrypted file; extract it locally. Its `REVISED_CANONICAL_FILES/` directory contains the eight real master revisions.

**Do not push the decrypted ZIP or raw financial / household / legal masters into this public repo.** A GitHub **private repo** can store individual unencrypted revision files if one is configured with appropriate access.

## The eight actual original-derived revised masters
1. `Carnival_Careers_ENTERPRISE_CONTROL_v5_DIRECTOR_X_JANET_RASTAFEST_2026-09-16.xlsx`
2. `Carnival_Careers_Expandable_Sourced_Financial_Control_2026-09-16.xlsx`
3. `Carnival_Careers_365_DAY_MASTER_INDEX_v5_DIRECTOR_X_JANET_RASTAFEST_2026-09-16.xlsx`
4. `Carnival_Careers_Tenant_Owner_Mortgage_Readiness_Preview.xlsx`
5. `Carnival_Careers_CURRENT_4_Page_Capital_Plan_v2.docx`
6. `Carnival_Careers_Governance_Legal_Tax_CMHC_Execution_Binder_UPDATED.docx`
7. `Carnival_Careers_ENTERPRISE_MASTER_BOOK_v5_DIRECTOR_X_JANET_RASTAFEST_2026-09-16.pdf`
8. `Carnival_Careers_26_Chapter_Data_Room_INDEX_2026-09-15.pdf`

Each contains the November 8 current-model supersession control. Signed archival source records remain unaltered. Public GitHub model: [optimized property control](../../docs/property/CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.md).

**This upload does not establish completed financial underwriting, legal possession, actual mortgage approvals, or full amendment of previously sent third-party documents.**
