# Review controls

## Evidence hierarchy

1. Explicit owner-approved source-of-record designation tied to an item ID.
2. Correct canonical folder plus continuous version history.
3. Content-level completeness and valid formula/dependency structure.
4. Modified time and filename, used only as supporting signals.

## Required statuses

- `provisional_master`: strongest current evidence; safe to compare against, not overwrite.
- `source_candidate`: potentially contains new or conflicting information.
- `derived_output`: generated report or consolidation; never promoted from filename alone.
- `process_artifact`: sandbox, temporary, backup, or workflow copy.
- `needs_review`: evidence is incomplete, conflicting, or below confidence threshold.

## Stop conditions

Stop before mutation when any of these is true:

- the authoritative group or permission boundary is unresolved;
- backup/restore has not been validated;
- a source changed after materialization;
- raw file bytes cannot be obtained for a required comparison;
- formulas, external links, tables, validation, macros, or hidden sheets cannot be preserved;
- conflict reconciliation does not account for every non-empty source cell.

## Handoff minimum

Include the job ID, target site/folder, provisional master item and version IDs, every candidate item/version ID, hashes when available, observed anomalies, operations performed, operations not performed, and the next deterministic command or connector read.
