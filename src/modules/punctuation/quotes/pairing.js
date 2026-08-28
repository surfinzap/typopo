/**
  Quote pairing: decide which scanned tokens form pairs.
*/

export const OPEN = "open";
export const CLOSE = "close";
export const UNPAIRED = "unpaired";

/**
  Assign a role to every token.

  Algorithm
  Walk the tokens in document order, keeping a stack of candidate openings.
  A token closes the most recent unclosed opening; otherwise it becomes a new
  candidate opening. Whatever is still on the stack at the end is unpaired.

  Line boundaries
  A pair never spans a line break: a quotation belongs to one paragraph.

  @param {Array<{line: number}>} tokens: tokens from scanQuoteTokens, in document order
  @returns {Array<string>} parallel to tokens: OPEN, CLOSE or UNPAIRED
*/
export function pairQuoteTokens(tokens) {
  const roles = new Array(tokens.length).fill(UNPAIRED);
  const openCandidates = [];

  tokens.forEach((token, index) => {
    if (openCandidates.length === 0) {
      openCandidates.push(index);
      return;
    }

    const candidate = openCandidates[openCandidates.length - 1];

    /*
      The candidate can never be closed from here on, since every remaining
      token is on this line or later. Abandon it and start again from this
      token, leaving it to the unpaired-quote rules.
    */
    if (tokens[candidate].line !== token.line) {
      openCandidates.pop();
      openCandidates.push(index);
      return;
    }

    openCandidates.pop();
    roles[candidate] = OPEN;
    roles[index] = CLOSE;
  });

  return roles;
}
