/**
  Quote pairing: decide which scanned tokens form pairs, and how deeply nested
  each pair is.
*/

import { SINGLE } from "./scanner.js";

export const OPEN = "open";
export const CLOSE = "close";
export const UNPAIRED = "unpaired";

/* What an opening mark is followed by, as identifyUnpairedOpeningDoubleQuote reads it. */
const OPENS_CONTENT = /[0-9\p{L}]/u;

/* What a word-final mark is preceded by. A single mark there is an apostrophe or a closing quote. */
const ENDS_WORD = /[0-9\p{L}]/u;

/* What a word-initial mark is preceded by. A single mark there is an opening quote or an apostrophe. */
const STARTS_WORD = /\s/u;

/**
  Assign a role and a nesting depth to every token.

  Algorithm
  Walk the tokens in document order, keeping a stack of candidate openings.
  A token closes the innermost candidate of its own kind; otherwise it becomes
  a new candidate. Whatever is still on the stack at the end is unpaired.

  Why kind matters here, and only here
  Pairing needs to know a double from a single, or a flat stack would close the
  opening " with the opening ' in `"a 'b' c"`. Once the pair is formed the kind
  is discarded: the glyphs are chosen from the depth, so `"a 'b' c"` and
  `'a "b" c'` render identically.

  Crossing, and how it is told apart from a deeper nesting
  A mark whose match sits below a candidate of the other kind is ambiguous. It
  can close the outer pair, crossing over the inner candidate:

    She said " a 'good deal " yesterday'

  or it can open a third level, which the match below it will close later:

    "He said 'the "best" one' yesterday"

  Position alone cannot separate the two, so the tie is broken on what follows
  the mark: a letter or a digit reads as an opening and nests, anything else
  closes the outer pair and abandons the candidates it crossed. The class is
  the one identifyUnpairedOpeningDoubleQuote already uses for the same
  judgement.

  This is the only place pairing consults the surrounding text, and it never
  refuses to pair — the Iteration 2 review established that pairing must not
  gate on context, or ` " quoted material " ` would not be repaired. Breaking a
  tie between two possible pairings is a narrower thing than that.

  Single marks need evidence to open
  A single mark right after a letter or a digit never opens. That is where a
  word-final apostrophe sits (`kedys’`, `jes’`) whenever no contraction rule
  caught it, and as an opening candidate it would shift every pairing after it
  on the line:

    Mňa kedys’ zvádzal 'to' svet

  Such a mark can still close a pair, or stay unpaired and degrade to an
  apostrophe. Double marks are not held to this: the sloppy-spacing repair
  above depends on them pairing freely, and no apostrophe is ever one.

  The cost is a word-final apostrophe inside a single pair, which closes it
  early — `'bol som tam kedys’ a vravím'`. Nothing in the text tells it apart
  from a closing quote. Typed as the modifier letter apostrophe instead
  (`kedysʼ`, `kincʼa`), it never reaches pairing: identifyModifierApostrophe marks it
  before the scan.

  Single marks need evidence to close
  The mirror image: a single mark after a space and before a letter or a digit
  never closes. It reads as an opening, or as a word-initial apostrophe such as
  a contracted year that no rule caught:

    In '89 and '90 we moved
    INCHEBA '89 was a 'year'

  Letting the second mark close would pair `'89 and '` in the first line, and
  pair `'89 … '` in the second, leaving the final mark stray. Instead it opens;
  the earlier mark is left unpaired and degrades to an apostrophe. Double marks
  are not held to this, for the same sloppy-spacing reason as above.

  Depth counts only pairs
  A candidate that is abandoned or never closed does not enclose anything, so
  it does not count towards the depth of a pair formed above it on the stack.
  Depth is therefore assigned once pairing is done, from the pairs alone.

  Line boundaries
  A pair never spans a line break: a quotation belongs to one paragraph.
  Candidates are pushed in document order, so their lines never decrease going
  up the stack; once a candidate on an earlier line is on top, nothing below it
  can be on this line either, and the search stops there.

  @param {Array<{kind: string, line: number, before: string, after: string}>} tokens: tokens from scanQuoteTokens, in document order
  @returns {Array<{role: string, depth: number|null}>} parallel to tokens.
    role is OPEN, CLOSE or UNPAIRED; depth is the 0-based nesting level of the
    pair, null for an unpaired token.
*/
export function pairQuoteTokens(tokens) {
  const results = tokens.map(() => ({ role: UNPAIRED, depth: null }));
  const openCandidates = [];

  tokens.forEach((token, index) => {
    /*
      Look for the innermost candidate this token can close: same line, same
      kind. Stop at the first candidate on another line — see Line boundaries.
    */
    let matchedAt = -1;
    for (let position = openCandidates.length - 1; position >= 0; position--) {
      const candidate = tokens[openCandidates[position]];
      if (candidate.line !== token.line) break;
      if (candidate.kind === token.kind) {
        matchedAt = position;
        break;
      }
    }

    /* See Single marks need evidence to open and to close, above. */
    const canOpen = token.kind !== SINGLE || !ENDS_WORD.test(token.before);
    const canClose =
      token.kind !== SINGLE || !(STARTS_WORD.test(token.before) && OPENS_CONTENT.test(token.after));
    if (!canClose) matchedAt = -1;

    /*
      The match is buried under a candidate of the other kind, so closing it
      would abandon that candidate. Break the tie: a mark that reads as an
      opening starts a deeper level instead — see Crossing above.
    */
    const wouldCross = matchedAt >= 0 && matchedAt < openCandidates.length - 1;
    if (wouldCross && canOpen && OPENS_CONTENT.test(token.after)) matchedAt = -1;

    if (matchedAt >= 0) {
      /*
        Any candidate above the match crossed this pair and is abandoned
        unpaired. Depth is assigned below, see Depth counts only pairs.
      */
      results[openCandidates[matchedAt]] = { role: OPEN, depth: null };
      results[index] = { role: CLOSE, depth: null };
      openCandidates.length = matchedAt;
      return;
    }

    /* A mark that cannot open stays unpaired. */
    if (!canOpen) return;

    /*
      Nothing to close. A candidate left on top from an earlier line can never
      be closed, since every remaining token is on this line or later: abandon
      it and leave it to the unpaired-quote rules.
    */
    const top = openCandidates[openCandidates.length - 1];
    if (top !== undefined && tokens[top].line !== token.line) openCandidates.pop();

    openCandidates.push(index);
  });

  /*
    Pairs never cross and never span a line, so in document order every CLOSE
    ends the innermost pair still open: a running count of open pairs is the
    depth.
  */
  let openPairs = 0;
  results.forEach((result) => {
    if (result.role === OPEN) result.depth = openPairs++;
    if (result.role === CLOSE) result.depth = --openPairs;
  });

  return results;
}
