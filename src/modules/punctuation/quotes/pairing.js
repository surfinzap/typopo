/**
  Quote pairing: decide which scanned tokens form pairs, and how deeply nested
  each pair is.
*/

export const OPEN = "open";
export const CLOSE = "close";
export const UNPAIRED = "unpaired";

/* What an opening mark is followed by, as identifyUnpairedOpeningDoubleQuote reads it. */
const OPENS_CONTENT = /[0-9\p{L}]/u;

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

  Line boundaries
  A pair never spans a line break: a quotation belongs to one paragraph.
  Candidates are pushed in document order, so their lines never decrease going
  up the stack; once a candidate on an earlier line is on top, nothing below it
  can be on this line either, and the search stops there.

  @param {Array<{kind: string, line: number, after: string}>} tokens: tokens from scanQuoteTokens, in document order
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

    /*
      The match is buried under a candidate of the other kind, so closing it
      would abandon that candidate. Break the tie: a mark that reads as an
      opening starts a deeper level instead — see Crossing above.
    */
    const wouldCross = matchedAt >= 0 && matchedAt < openCandidates.length - 1;
    if (wouldCross && OPENS_CONTENT.test(token.after)) matchedAt = -1;

    if (matchedAt >= 0) {
      /*
        The candidate's position in the stack is the count of candidates still
        open below it, which is exactly the nesting depth of this pair. Any
        candidate above it crossed this pair and is abandoned unpaired.
      */
      const depth = matchedAt;
      results[openCandidates[matchedAt]] = { role: OPEN, depth };
      results[index] = { role: CLOSE, depth };
      openCandidates.length = matchedAt;
      return;
    }

    /*
      Nothing to close. A candidate left on top from an earlier line can never
      be closed, since every remaining token is on this line or later: abandon
      it and leave it to the unpaired-quote rules.
    */
    const top = openCandidates[openCandidates.length - 1];
    if (top !== undefined && tokens[top].line !== token.line) openCandidates.pop();

    openCandidates.push(index);
  });

  return results;
}
