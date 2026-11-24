// Two Days of Quiet Dread — one-line code review comment.
// Writes the comment to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. The diff is clean, the coverage is honest, and this whole file will outlive everyone who wrote it.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Round-trip check: what was written must be byte-for-byte the entry.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt differs from ENTRY");
}
