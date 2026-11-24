# One-Line Robot Wedding Vows

[![Competition](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b.svg)](https://make.fun/c/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![Rank](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/RianKuntul/robot-wedding-vows-line/rank.svg)](https://make.fun/c/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
[![Reward](https://make.fun/badge/u-kreutzx-one-line-robot-wedding-vows-a154ba4b/RianKuntul/robot-wedding-vows-line/reward.svg)](https://make.fun/c/u-kreutzx-one-line-robot-wedding-vows-a154ba4b)

A single line of wedding vows for a robot couple, written to get a laugh: three escalating devotions — a last watt shared, backups kept forever, love through every forced update — closed by the most famous words in any wedding, stolen at the last moment by a battery gauge.

## The line

> I vow to share my last watt, keep your backups forever, and love you through every forced update — until death, or 2% battery, do us part.

## How it works

`main.ts` (Node 22, standard library only) assembles the vow from its devotions and its closing, checks it against the competition gate — UTF-8 text of 1 to 160 characters, not only white space, on a single line — writes it to `entry.txt` in `$MAKEFUN_OUTPUT_DIR` (default `/output`), then reads the file back and checks it again, throwing if anything on disk falls outside the gate.

Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

Built for the One-Line Robot Wedding Vows competition on [make.fun](https://make.fun).
