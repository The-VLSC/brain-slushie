#!/usr/bin/env python3
"""Rank sanitized RLI workbook candidate metadata without opening workbooks."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import PurePosixPath


def parse_time(value: str | None) -> float:
    if not value:
        return 0.0
    return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()


def classify(path: str) -> str:
    lowered = path.casefold()
    if any(part in lowered for part in ("/.sandbox/", "/tmp/", "/.output/")):
        return "process_artifact"
    if "/00.) books intake/" in lowered:
        return "source_candidate"
    if "/01.) richardson landscape, inc/" in lowered:
        return "canonical_folder_candidate"
    return "needs_review"


def score(row: dict) -> tuple[int, list[str]]:
    path = str(row.get("path") or "")
    name = str(row.get("name") or PurePosixPath(path).name)
    bucket = classify(path)
    points = 0
    reasons: list[str] = []
    if bucket == "canonical_folder_candidate":
        points += 50
        reasons.append("canonical RLI folder")
    elif bucket == "source_candidate":
        points += 10
        reasons.append("intake source candidate")
    else:
        points -= 25
        reasons.append(bucket)
    versions = int(row.get("version_count") or 0)
    points += min(versions, 30)
    reasons.append(f"{versions} versions")
    if "main" in name.casefold():
        points += 5
        reasons.append("main filename marker")
    if row.get("hash"):
        points += 3
        reasons.append("content hash available")
    if row.get("formula_error_count", 0):
        points -= 10
        reasons.append("formula errors observed")
    if row.get("anomalous_used_range"):
        points -= 8
        reasons.append("anomalous used range")
    return points, reasons


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", help="JSON array of sanitized candidate metadata")
    parser.add_argument("--output", help="Optional output JSON path")
    args = parser.parse_args()
    with open(args.input, encoding="utf-8") as handle:
        rows = json.load(handle)
    ranked = []
    for row in rows:
        points, reasons = score(row)
        ranked.append({**row, "classification": classify(str(row.get("path") or "")), "score": points, "ranking_reasons": reasons})
    ranked.sort(key=lambda r: (r["score"], parse_time(r.get("modified_at"))), reverse=True)
    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "decision_scope": "ranking_only_not_authority",
        "candidates": ranked,
    }
    payload = json.dumps(result, indent=2, sort_keys=True) + "\n"
    if args.output:
        with open(args.output, "w", encoding="utf-8") as handle:
            handle.write(payload)
    else:
        print(payload, end="")


if __name__ == "__main__":
    main()
