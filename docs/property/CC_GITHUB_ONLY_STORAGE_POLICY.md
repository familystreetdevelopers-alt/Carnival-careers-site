# CC Universe — GitHub-only permanent storage policy
**Supersession:** 2026-11-08. Applies to every current and new Carnival Careers, CC Universe, CC-CAPITAL65, production, music, investor, operating and real estate working asset.

**Authoritative storage is GitHub, not ChatGPT Library.** All subsequent source changes, version tracking, manifest updates, builds, and finished artifact destinations must be mapped to a GitHub repository and commit. Container/sandbox is temporary staging only. Google Drive may be consulted as a source or edited by explicit request, but is not the canonical destination.

## Repository distinction
- `familystreetdevelopers-alt/Carnival-careers-site` is **PUBLIC**. It is the canonical website and non-confidential business-project source repo.
- Do not put household data, KYC, mortgage applications, financing records, private emails, unpublished contracts, signed deal copies, private contact lists, bank data or confidential investor documents in this public repo.
- Use an access-controlled **private GitHub repo** for nonpublic financial and legal masters, original source documents and large archival packages, with minimum-access permissions. A Git branch on the public repo is not private storage.
- Until a private GitHub repo is connected, confidential revised files may be stored in **authenticated encryption only** in this public repo. The eight-master AES-256-GCM archive is [committed and verified](../../vault/encrypted/README.md). Never publish the decryption key or unencrypted documents.

## Master rules
1. Recover source in the repo before creating a replacement. Update the same canonical path where possible.
2. Preserve original file byte-level integrity when archival, legal or music rights require it; create revision with date and manifest, not alterations to signed evidence.
3. Validate financing numbers against `CC_GLOBAL_OPTIMIZED_STACK_2026-11-08.json`; enforce scenario separation, assumptions and actual external-evidence gates.
4. Every deliverable ends in a checked GitHub commit and a specific path. If no safe writable GitHub destination exists, list exact blocked files and privacy reason rather than diverting to Library.
5. Data-room permissions, investor/lender rights, third-party attachments, and release/access controls are explicit, never inferred from repository existence.
6. No automatic external contact.

## Current asset status
- Global-property Markdown/JSON and safe investor context: persisted in public GitHub.
- Eight original-derived master revisions: **PERSISTED in GitHub as one AES-256-GCM encrypted ZIP** at [vault/encrypted](../../vault/encrypted/README.md), Git blob `ebe372f293accc2118d04844d267ac576bd22cee`. Only plaintext individual files require a private repository.
- Website: GitHub controls production source; OS uses native Floot build, synchronized by versioned public model controls.
