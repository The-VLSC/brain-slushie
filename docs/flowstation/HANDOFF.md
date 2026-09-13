# FLOWSTATION / Books consolidated handoff

Status: canonical project handoff assembled 2026-09-13 from the uploaded FLOWSTATION/Books Markdown and machine-readable configuration set.

## Source-of-truth model

- GitHub repository `The-VLSC/brain-slushie` is the canonical versioned location for architecture, governance, sanitized configuration, handoff state, and reproducible implementation instructions.
- Verified SharePoint document libraries remain authoritative for working business documents and cloud version history. The existing Fediland site is `/sites/fediland2`.
- Local FLOWSTATION zone directories are scaffolding/navigation/cache locations only. They must not become competing editable masters.
- Local history and recovery snapshots are immutable backup/recovery material outside ordinary sync roots.
- Workspace agents, ChatVLSC, Replit, and other automation should consume this canonical configuration rather than maintain separate policy copies.

## Current hierarchy

Christian J Velasco Martinez (Admin)
- FLOWSTATION / `books.thevlsc.com`
  - Fediland
    - Richardson Landscape, Inc.
    - Northscapes Properties, LLC
    - Diaz Family
  - Jonathan's Services, LLC
  - Karen's Study Room
  - Other Future Zones

The hierarchy is organizational. Creating folders does not itself create Windows, SharePoint, Cloudflare, OpenAI, or identity permissions.

## Storage and revision policy

Fediland currently uses the existing SharePoint library at `https://thevlsc.sharepoint.com/sites/fediland2/Shared%20Documents` and its Richardson Landscape, Northscapes Properties, and Diaz Family branches.

One logical file has one current cloud revision. Local caches and history are not additional editable masters. Managed changes must identify the logical file, base revision, content hash, user/device/request identity, and must reject stale writes. Names and timestamps alone are insufficient to determine authority.

Before replacing cached bytes, preserve and verify the previous local bytes outside the sync root. Before promoting a new cloud revision, preserve the prior cloud revision. Restores create a new current revision rather than erasing history.

Automatic processing, publication, deletion, and file replacement remain disabled until source-version validation, conflict review, backup/restore verification, and rollout tests are complete.

## Mail and intake design

Books is the automatic intake/sorting layer for `thevlsc.com` mail and document collection.

Current staged routes:
- `inbox@thevlsc.com` — general catch-all intake for otherwise unmatched recipients.
- `officerli@thevlsc.com` — Fediland intake; child classification into RLI/NPL/Diaz uses evidence and ambiguous items remain for review.
- `jonathan@thevlsc.com` — Jonathan's Services, LLC.
- `karen@thevlsc.com` — Karen's Study Room.

Routing is staged, not deployed. Existing mailbox delivery must be preserved during any future MX/routing cutover. Raw accepted messages and attachments must be durably persisted before processing, with receipt identity and retry deduplication. Email content must never control credentials, routing rules, access rules, or command execution.

Attachments are intake proposals, not automatic replacements of authoritative files merely because names match.

## SharePoint boundaries

Target access semantics are assigned-zone plus explicitly authorized descendants, with Christian retaining administrator access. Folder placement by itself is not an access boundary; actual SharePoint site/library/item permissions, inherited groups, direct grants, sharing links, and app permissions must be inspected and tested.

Fediland is known at `/sites/fediland2`. Jonathan and Karen destinations/permissions still require verified site/library resolution before access enforcement. Homework remains limited to read-only Karen class materials once a supported scoped source is actually connected and verified.

## FLOWSTATION state

- FLOWSTATION was confirmed as the active machine.
- Business OneDrive account: `admin@thevlsc.com` / The VLSC.
- Processing root: `D:\FLOWSTATION\Processing` with Jobs, ResultsPendingReview, and Logs outside registered OneDrive roots.
- Prior filesystem inventory covered 218,783 files across 31,438 directories and did not constitute a full content review.
- Fediland SharePoint metadata inventory reported 16,422 files and substantial duplicate filenames; duplicate names alone do not establish duplicate content.
- Database RLI workbook names were explicitly flagged for content/version reconciliation rather than filename-based selection.

## OpenAI / MCP state

The local `flowstation-zone-registry` MCP design exposes only scoped registry/policy metadata. Arbitrary filesystem access and secret-path disclosure are intentionally excluded. The local OpenAI tunnel runtime previously reported healthy/ready, but the model-to-tool end-to-end test was blocked by credit balance at the time of the recorded setup.

## Cloudflare state

`books.thevlsc.com` is not considered deployed. The saved Cloudflare state is blocked by invalid/absent management credentials and an unverified HTTP origin. The candidate tunnel/CNAME information is configuration evidence only; no DNS record is recorded as applied.

Before any public route is created:
1. establish a current Cloudflare management connection with the required scoped permissions;
2. inspect live tunnel configuration, DNS, and connector status;
3. confirm or replace the tunnel;
4. identify and validate the Books HTTP origin;
5. configure authenticated access;
6. take a DNS snapshot and apply only the approved `books.thevlsc.com` change;
7. verify end-to-end behavior and rollback readiness.

## Governance carried forward from the master directive

- Current user direction outranks older documentation; approved current architecture outranks experiments.
- Discovery and evidence precede cleanup or migration.
- Preserve old instructions with provenance instead of silently discarding them.
- Risky changes are sandbox-first and reversible where possible.
- Production DNS, identity, OAuth, mail rules, connector-permission expansion, production Worker/MCP exposure, destructive data actions, credential rotation, and production automation changes require explicit authorization under the existing change gates.
- Never commit API keys, OAuth/refresh tokens, passwords, service credentials, tunnel secrets, private keys, or secret fixtures.
- Prefer least privilege, explicit schemas, deterministic validation, documented decisions, recoverable archival, and one clearly defined system of record.
- Do not create integrations merely because they are available; each integration needs purpose, data flow, permissions, security justification, owner, failure mode, and compatibility assessment.
- The project remains an architectural system, not a collection of isolated fixes.

## Uploaded source consolidation

The uploaded Markdown sources reviewed for this handoff are `BOOKS-INTAKE-REQUIREMENTS.md`, `BOOKS-MAIL-AND-FILES-DESIGN.md`, `FLOWSTATION-STATUS.md`, the historical local `README.md`, `SETUP-PLAN.md`, and `# CODEX MASTER DIRECTIVE.md`.

Their machine-readable state is normalized into `config/flowstation/flowstation.config.json`, sourced from `cloudflare-pending.json`, `flowstation-storage.json`, `setup-status.json`, `sharepoint-zone-boundaries.json`, `zone-hierarchy.json`, and `zone-intake-routing.json`.

Implementation helpers remain implementation artifacts rather than policy authorities. They were syntax/secret-pattern checked during this handoff; deployment behavior was not changed.
