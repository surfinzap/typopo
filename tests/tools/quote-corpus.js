/**
 * Curated drift corpus for the quotes refactoring.
 *
 * Purpose
 * The existing suite already pins behaviour for every input it covers. What it
 * cannot do is tell us when a refactoring changes behaviour on an input nobody
 * wrote a test for — and the tokenizer/stack work in later iterations will
 * touch exactly those. This corpus is that blind spot, made visible: it is run
 * through fixTypos for every locale and the result is committed as a snapshot,
 * so any change shows up as a reviewable diff.
 *
 * These are inputs only. There is deliberately no expected output — the
 * snapshot records what typopo does today, which is not the same as asserting
 * that today's behaviour is correct. Several entries below are known-imperfect
 * and are here precisely so we notice when they move.
 *
 * Sources: temp/refactoring-quotes.md, temp/stack_algorithm_walkthrough.md,
 * and the limitations documented in the quote modules themselves.
 *
 * Convention: characters that are invisible (U+00A0, U+200A, U+202F) or
 * confusable with ASCII (U+02BC, U+2032, U+2033) are written as \u escapes,
 * never as literal characters, so this file stays safe to edit, reflow, and
 * copy-paste. Visibly distinct glyphs such as “ ” „ « » ’ stay literal.
 * See tests/tools/charset-audit.js for why that matters.
 */

export const quoteCorpus = {
  "double quotes — basic": [
    'He said "hello" and left.',
    'He said "hello."',
    '"Whole sentence in quotes."',
    'A "quoted" word, and another "quoted" word.',
    "Nested \"outer with 'inner' inside\" here.",
    'Two pairs "first" and "second" in one line.',
    'Unclosed "quote at the end of a line',
    'Unopened quote at the end"',
    'Three "quotes "in a "row',
  ],

  "double quotes — sloppy spacing": [
    '" quotes with spaces around "',
    'a" tight open and close "b',
    'It’s a"nice" saying.',
    'It’s a "nice"saying.',
    'word " word',
    '"\u00A0nbsp just inside the quotes\u00A0"',
  ],

  "double quotes — dumb variants": [
    ",,German style low quotes''",
    "„German style low quotes“",
    "«Guillemets here»",
    "''double apostrophes as quotes''",
    "``backtick quotes''",
  ],

  "punctuation around quotes": [
    '"Hey!," she said',
    '"We will continue tomorrow.".',
    '"word."',
    '"word",',
    '"Wow!"',
    '"Is it?"',
    '"a fragment", he said.',
    'He said: "a whole sentence".',
    "(cs/sk) Byl to „Karel IV.“, ktery neco",
  ],

  "primes vs quotes": [
    "12' 45\" is a length",
    "She is 5'11\" tall",
    '"Konference 2020" in quotes',
    'It’s called "Localhost 3000" and it’s pretty fast.',
    "He said: \"What about 'Localhost 3000', is that good?\"",
    "12 \u2032 45 \u2033 with stray spaces",
    'a 12" pizza',
    '"12" is the answer',
  ],

  "apostrophes — english contractions": [
    "Don't stop believin'",
    "rock 'n' roll and fish 'n' chips",
    "Press 'N' to continue",
    "'cause I said so",
    "'em, 'tis, 'twas, 'til",
    "O'Doole and the 69'ers",
    "in '70s and INCHEBA '89",
    "We were living in '90s and it was nottin'.",
    "In '90, she said 'don't quote me' on the 'net",
  ],

  "single quotes — the gate (outside double quotes)": [
    "a 'quoted fragment' outside any double quotes",
    "'single word' outside double quotes",
    "\"a 'quoted fragment' inside double quotes\"",
    "\"first 'one' and second 'two' in one double pair\"",
    "'a quoted sentence outside doubles.'",
    "He said 'hello' and she said 'goodbye'",
    "'90 bottles' were sold",
    "He sold '90 bottles' today",
    "INCHEBA '89 was a 'year'",
    "In '89 and '90 we moved",
    "The ''90s were great'",
  ],

  "single quotes — punctuation placement": [
    "\"Sentence 'quoted fragment.'\"",
    "\"Sentence 'quoted fragment'.\"",
    "'word.'",
    "'well-known;'",
    "'2020:'",
    // a contraction inside the quoted word: in en-us the closing single quote is the apostrophe glyph
    "\"The '69'ers.' were famous\"",
    "\"Those '90's,' good times\"",
    "\"Say 'don't;' be firm\"",
    "'69'ers.' were famous",
    // a number ends the quoted word: after the move, the closing mark sits right after a digit
    "\"Version '2.0.' is out\"",
    "\"In '2020,' things changed\"",
  ],

  "rusyn / MLA transliteration (U+02BC)": [
    "Vin mu povil, ta de jes\u02BC take vidil i neviril",
    "\"Vin mu povil, 'ta de jes\u02BC take vidil' i neviril\"",
    "Paul\u02BCs Diner",
    "\u02BCword at the start",
    "word\u02BC at the end",
    "kinc\u02BCa inside a word",
    "jes\u02BC, kedys\u02BC, ne\u02BC — several in a row",
    "word\u02BC\u02BC at the end",
    "\u02BC\u02BCword at the start",
  ],

  "slovak / czech archaic contractions": ["Mňa kedys’ zvádzal svet", "„Mňa kedys’ zvádzal svet“"],

  /*
    The residual-apostrophe risk is positional, not semantic. A stray
    apostrophe that precedes a genuine pair on the same line shifts the whole
    pairing by one; the same apostrophe after the pair is harmless. These four
    record both orders so the difference stays visible across iterations 3b
    and 3c.
  */
  "apostrophe adjacent to a single quote pair": [
    "Mňa kedys’ zvádzal 'to' svet",
    "Mňa 'to' zvádzal kedys’ svet",
    "kedys’ a 'quoted bit' here",
    "a 'quoted bit' and kedys’ here",
  ],

  "direct speech intro": [
    'She said - "Hello" - and left.',
    'She said "Hello" and left.',
    'She said, "Hello" and left.',
    'She said: "Hello" and left.',
    '- "Hello" at the start of a paragraph',
    'And then. - "Hello" after terminal punctuation',
  ],

  "interaction with other modules": [
    'quote [...]with parts left out and "quotes"',
    'a "quoted" text with a\u00A0nbsp preposition',
    "„Quoted“ 12\u00A0×\u00A012",
    'an email in "quotes": help@typopo.org',
    'a url in "quotes": https://typopo.org/page',
    'a `backtick` inside "quotes"',
  ],

  "multiline and empty edges": [
    'First line with "quotes"\nSecond line with "quotes"',
    '"Quote opened on one line\nand closed on the next"',
    '""',
    "''",
    '"',
    "'",
  ],
};

/**
 * Flatten the corpus to a list of { category, input } records.
 *
 * @returns {Array<{category: string, input: string}>}
 */
export function flattenCorpus() {
  return Object.entries(quoteCorpus).flatMap(([category, inputs]) =>
    inputs.map((input) => ({ category, input }))
  );
}
