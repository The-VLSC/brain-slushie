---
name: rli-workbook-master-audit
description: Audit and rank duplicate Richardson Landscape Excel database workbooks using file metadata, version history, hashes, and read-only workbook inventories. Use when deciding which RLI Database workbook is the provisional master or preparing a safe consolidation handoff; do not use it to delete sources or mutate QuickBooks.
---

# RLI Workbook Master Audit

Produce an evidence-backed provisional-master decision and a review-only handoff. Preserve every source workbook.

## Workflow

1. Read the project `AGENTS.md`, current operating guide, and handoff before inspecting files.
2. Discover the canonical SharePoint site and target folder. Record site, drive, folder, item, and current version IDs without storing credentials or signed URLs.
3. Search for all filename variants of `Database RLI`, `RLI Database`, and known reconciled outputs. Treat intake, sandbox, temporary, and process outputs as candidates—not authorities.
4. Collect for each candidate: exact path, item ID, byte size, content hash when available, modified time, current version, version count, and permissions inheritance.
5. Run `scripts/rank_candidates.py` on the sanitized metadata JSON. Ranking narrows review; it never proves authority.
6. Materialize candidate bytes only when the connector can do so safely. Hash the complete package, then inventory sheet names, visibility, used ranges, non-empty cells, formulas, tables, validations, defined names, and formula errors.
7. Apply `references/review-controls.md`. Designate a provisional master only when location, version lineage, and workbook evidence agree. Otherwise set status to `needs_review`.
8. Save the report in `ResultsPendingReview`. Do not move, rename, replace, delete, or resave source workbooks during the audit.

## Credit and handoff controls

- Reuse stable item/version metadata and hashes. Do not re-extract unchanged workbooks.
- Run deterministic inventory and diff scripts before model analysis.
- Restrict model input to summaries and changed regions; never send an entire workbook when hashes show no change.
- Use a unique job ID and include source item IDs, source versions, snapshot time, blockers, and the exact next safe action.
- On continuation, re-check source versions first. If any source changed, invalidate stale comparisons and record the delta.

## Boundaries

- QuickBooks is read/export-only. Never create, update, delete, send, post, or import a transaction.
- Never store API keys, access tokens, refresh tokens, client secrets, passwords, private signed URLs, or recovery codes in SharePoint, Notion, GitHub, logs, or workbooks.
- A public GitHub repository may contain only generic workflow code and sanitized examples—never customer data, workbook content, private paths, identities, or live identifiers.
- Do not claim a workbook is clean merely because it is newest or named `Main`.
