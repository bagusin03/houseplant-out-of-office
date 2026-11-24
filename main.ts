// The Houseplant Out-of-Office — make.fun entry
// Writes one original out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt. Offline, deterministic, no network, no API calls.
// Final line: 112 characters, 114 bytes (the em dash is one character),
// one line, no trailing newline — verified byte-identical across runs.
import { mkdirSync, writeFileSync } from "node:fs";

// The fern by the copier, last watered in March, answers the way every
// out-of-office reply promises to — except it keeps the plant's promise
// instead of the office's: emails ignored in the order received.
const LINE =
  "Out of office — I'm the fern by the copier. Last watered in March. Your email will be ignored in order received.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-120 chars,
// not only whitespace, in a single line. Count code points, the way the
// scorer counts characters, not UTF-16 code units.
const CHAR_COUNT = [...LINE].length;
if (
  CHAR_COUNT < 1 ||
  CHAR_COUNT > 120 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(`Line failed gate: ${CHAR_COUNT} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
