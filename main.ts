// One-Line Robot Wedding Vows — a make.fun entry.
//
// The program assembles a single funny line of wedding vows for a robot
// couple from its parts — a list of devotions and a closing — writes it
// into entry.txt, then reads the file back and refuses to succeed unless
// what landed on disk still passes the competition gate (UTF-8 text,
// 1–160 characters, not blank, one line). Failing loudly beats
// submitting an invalid entry.
//
// Output directory: $MAKEFUN_OUTPUT_DIR when set, otherwise /output,
// which is where the grader looks.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vow is built, not pasted, so its rhythm stays visible: three
// devotions that escalate — a sacrifice (my last watt), a forever
// (your backups), an endurance (every forced update) — and then the
// closing, which borrows the most famous words in any wedding and
// lets a battery gauge steal them at the very last moment.
const DEVOTIONS = [
  "share my last watt",
  "keep your backups forever",
  "love you through every forced update",
];

const CLOSING = "until death, or 2% battery, do us part";

// Join the devotions the way an officiant would read them: commas
// between the early ones, an "and" before the last, then an em-dash
// pause so the closing lands on its own beat.
function assembleVow(): string {
  const list =
    DEVOTIONS.slice(0, -1).join(", ") + ", and " + DEVOTIONS[DEVOTIONS.length - 1];
  return `I vow to ${list} — ${CLOSING}.`;
}

const VOW = assembleVow();

// The gate, straight from the competition kit.
const MIN_CHARS = 1;
const MAX_CHARS = 160;

// Count characters the way a reader would (code points), not UTF-16
// code units, so an accented letter or an emoji can never sneak the
// line past the limit on a technicality.
function charCount(text: string): number {
  return [...text].length;
}

// Throw unless `text` is exactly the kind of single line the gate
// accepts: within the character limit, not only white space, and with
// no line breaks hiding inside it.
function assertGatePasses(text: string): void {
  const n = charCount(text);
  if (n < MIN_CHARS || n > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${n}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  // Check the line before it ever touches disk.
  assertGatePasses(VOW);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const entryPath = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(entryPath, VOW, "utf8");

  // Read it back and gate the bytes that were actually written — a
  // short write or a mangled encoding must fail here, not at judging.
  const written = readFileSync(entryPath, "utf8");
  assertGatePasses(written);
  if (written !== VOW) {
    throw new Error("entry.txt on disk does not match the vow that was written");
  }

  console.log(`wrote ${charCount(written)} chars to ${entryPath}`);
}

main();
