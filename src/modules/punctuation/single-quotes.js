import { base } from "../../const.js";
import { identifyMarkdownCodeTicks, placeMarkdownCodeTicks } from "../../utils/markdown.js";
import { m } from "../../markers.js";

//

/**
  Identify ’n’ contractions as apostrophes

  Example
  rock 'n' roll → rock ’n’ roll
  fish 'n' chips → fish ’n’ chips


  Exceptions
  Press 'N' to continue (should be identified as single quotes)


  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedAnd(string) {
  let commonContractions = [
    ["dead", "buried"],
    ["drill", "bass"],
    ["drum", "bass"],
    ["rock", "roll"],
    ["pick", "mix"],
    ["fish", "chips"],
    ["salt", "shake"],
    ["mac", "cheese"],
    ["pork", "beans"],
    ["drag", "drop"],
    ["rake", "scrape"],
    ["hook", "kill"],
  ];

  commonContractions.forEach((item) => {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `(${item[0]})` +
        `([${base.spaces}]?)` +
        `(${base.singleQuoteAdepts})` +
        `(n)` +
        `(${base.singleQuoteAdepts})` +
        `([${base.spaces}]?)` +
        `(${item[1]})`, 
      "gi"),
      `$1${base.nbsp}${m.apos}$4${m.apos}${base.nbsp}$7`
    );
  });

  return string;
}

//

/**
  Identify common contractions at the beginning of the word as apostrophes


  Example
  ’em, ’cause,… see list of words in the function

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedBeginnings(string) {
  let contractedWords =
    "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";

  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.singleQuoteAdepts})` +
      `(${contractedWords})`, 
      "gi"
    ),
      `${m.apos}$2`
  );
}

//

/**
  Identify common contractions at the ends of the word as apostrophes

  Example
  contraction of an -ing form, e.g. nottin’

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedEnds(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\Bin)` +
      `(${base.singleQuoteAdepts})`,
      "gi"
    ),
      `$1${m.apos}`
  );
}

//

/**
  Identify in-word contractions as apostrophes

  Examples
  Don’t, I’m, O’Doole, 69’ers,…

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyInWordContractions(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `([\\d\\p{L}])` +
        `(${base.singleQuoteAdepts})+` +
        `([\\p{L}])`,
      "gu"
    ),
      `$1${m.apos}$3`
  );
}

//

/**
  Identify contracted years

  Example
  in ’70s, INCHEBA ’89,…

  Exceptions
  12 '45″ // when there is a wrongly spaced feet

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedYears(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^0-9]|[A-Z][0-9])` +
      `([${base.spaces}])` +
      `(${base.singleQuoteAdepts})` +
      `([\\d]{2})`,
      "gu"
    ),
      `$1$2${m.apos}$4`
  );
}

//

/**
  Identify feet and arcminutes following a 1–3 numbers

  Example
  12' 45″ → 
  12′ 45″

  Single-quotes module impact
  Function falsely identifies feet, where we are expecting quotes, e.g.	
  'Konference 2020' in quotes → 
  ‘Konference 2020’ in quotes 
  → this is corrected in replaceSinglePrimeWSingleQuote

  Implementation note
  We’re not using base.singleQuoteAdepts variable as commas and low-positioned quotes are ommited

  @param {string} string: input text for identification
  @returns {string} output with identified single primes as a temporary variable string, e.g. ${m.singlePrime}
*/
export function identifySinglePrimes(string) {
  return string.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${m.singlePrime}`);
}

//

/**
  Identify unpaired left single quote

  Algorithm
  Find left single quotes:
  - following a space, en dash or em dash
  - preceding a word

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired left single quote
*/
export function identifyUnpairedOpeningSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `(^|[${base.spaces}${base.emDash}${base.enDash}])` +
        `(${base.singleQuoteAdepts}|,)` +
        `([\\p{L}${base.ellipsis}${base.openingBrackets}\\{])`,
      "gu"
    ),
      `$1${m.osqUnpaired}$3`
  );
}

//

/**
  Identify unpaired right single quote

  Algorithm
  Find right single quotes:
  - following a word
  - optionally, following a sentence punctuation
  - optionally, preceding a space or a sentence punctuation

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired right single quote
*/
export function identifyUnpairedClosingSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}${base.closingBrackets}\\}])` +
      `([${base.sentencePunctuation}${base.ellipsis}])?` +
      `(${base.singleQuoteAdepts})` +
      `([ ${base.sentencePunctuation}])?`,
      "gu"
    ),
      `$1$2${m.csqUnpaired}$4`
  );
}

/**
  Identify single quotes within double quotes

  Limitations
  Since it’s difficult to identify apostrophe contracting end of the word (e.g. “jes’”), it’s difficult to identify single quotes universally. Therefore we’re identifying only single quotes and single quote pairs that are enclosed in double quote pairs.

  Algorithm
  - find text in double quotes
  - in quoted text find
    - unpaired left single quote
    - unpaired right single quote
    - single quote pairs

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired left single quote
*/
export function identifySingleQuotesWithinDoubleQuotes(string) {
  return string.replace(
    // prettier-ignore
    new RegExp(
        `(${base.doubleQuoteAdepts})` +
        `(.*?)` +
        `(${base.doubleQuoteAdepts})`,
      "gu"
    ),
    function ($0, $1, $2, $3) {
      $2 = identifyUnpairedOpeningSingleQuote($2);
      $2 = identifyUnpairedClosingSingleQuote($2);
      $2 = identifySingleQuotePairs($2);

      return $1 + $2 + $3;
    }
  );
}

//

/**
  Identify single quote pairs 

  Example
  "a 'quoted material' here" → “a ‘quoted material’ here”

  Assumptions and Limitations
  - This function assumes apostrophes and unpaired single quotes were identified. The function itself is part of the identifySingleQuotesWithinDoubleQuotes.
  - It is difficult to identify all contractions at the end of the word, and thus it is difficult to identify single quote pairs. This function therefore only identifies one single quote pair with a double quote pair

  @param {string} string: input text for identification
  @returns {string} output with identified single quote pair
*/
export function identifySingleQuotePairs(string) {
  // identify one phrase wrapped in single quotes
  // note the greediness is because of Rusyn contractions
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${m.osqUnpaired})` +
      `(.*)` +
      `(${m.csqUnpaired})`,
      "gu"
    ),
      `${m.osq}$2${m.csq}`
  );
}

//

/**
  Identify single quote pair around   a single word

  Example
 'word' → ‘word’

  @param {string} string: input text for identification
  @returns {string} output with identified single quote pairs around single word
*/
export function identifySingleQuotePairAroundSingleWord(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `(\\B)` +
        `(${base.singleQuoteAdepts})` +
        `([\\p{L}]+)` +
        `(${base.singleQuoteAdepts})` +
        `(\\B)`,
      "gu"
    ),
      `$1${m.osq}$3${m.csq}$5`
  );
}

//

/**
  Identify residual apostrophes 

  Finds remaining single quote adepts and changes them to apostrophes.


  Limitation
  This function runs as last in the row identification function as it catches what’s left.

  @param {string} string: input text for identification
  @returns {string} output with identified single quote pairs
*/
export function identifyResidualApostrophes(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.singleQuoteAdepts})`,
      "g"
    ),
      `${m.apos}`
  );
}

//

/**
  Replace a single qoute & a single prime with a single quote pair

  Assumptions and Limitations
  This function follows previous functions that identify single primes or unpaired single quotes.
  So it may happen that previous functions falsely identify a single quote pair around situations such as:
  - He said: “What about 'Localhost 3000', is that good?”

  Algorithm 
  Find unpaired single quote and single prime in pair and change them to a single quote pair


  @param {string} string: input text for identification
  @returns {string} output with a single quote pair
*/
export function replaceSinglePrimeWSingleQuote(string) {
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(${m.osqUnpaired})` +
      `(.*?)` +
      `(${m.singlePrime})`,
      "g"
    ),
      `${m.osq}$2${m.csq}`
  );

  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(${m.singlePrime})` +
      `(.*?)` +
      `(${m.csqUnpaired})`,
      "g"
    ),
      `${m.osq}$2${m.csq}`
  );

  return string;
}

//

/**
  Fix punctuation placement for single-word quoted content

  Single word = no spaces inside quotes (includes contractions, hyphenated words, numbers)

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word
  - keep the position of `!`, `?`, and `…` as is (ambiguous context)

  Examples:
  ‘word.’ → ‘word’.
  ‘it’s,’ → ‘it’s’,
  ‘well-known;’ → ‘well-known’;
  ‘2020:’ → ‘2020′:
  ‘Wow!’ → ‘Wow!’ (unchanged—ambiguous)

  @param {string} string: input text for identification
  @param {object} locale: locale configuration
  @returns {string} output with corrected punctuation placement
*/
export function fixQuotedWordPunctuation(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${locale.openingSingleQuote})` +
      `([^${base.spaces}${locale.closingSingleQuote}]+?)` +
      `([^${base.romanNumerals}${base.sentencePunctuation}])` +
      `([${base.sentencePunctuation}]{1,})` +
      `(${locale.closingSingleQuote})`,
      "g"
    ),
    (match, leftQuote, content, notRoman, punct, rightQuote) => {
      if (punct.length === 1 && /[.,;:]/.test(punct)) {
        return leftQuote + content + notRoman + rightQuote + punct;
      }
      return match; // Return unchanged for everything else
    }
  );
}

//

/**
  Fix punctuation placement for quoted sentence or fragment of words

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, ellipses `…`exclamation `!` and question marks `?` inside the quoted part
  - move colons `:` and semicolons `;` outside the quoted part

  @param {string} string: input text for identification
  @param {object} locale: locale configuration
  @returns {string} output with corrected punctuation placement
 */
export function fixQuotedSentencePunctuation(string, locale) {
  // move everything inside
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(${locale.openingSingleQuote})` +
      `(.+)` +
      `([${base.spaces}])(?!${locale.openingSingleQuote})` +
      `([^${base.romanNumerals}]{2,})` +
      `(${locale.closingSingleQuote})` +
      `([${base.sentencePunctuation}${base.ellipsis}])` +
      `([^${locale.closingDoubleQuote}])`,
      "g"
    ),
    `$1` +
    `$2` +
    `$3` +
    `$4` +
    `$6` +
    `$5` +
    `$7`
  )

  // move colons and semicolons outside
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([:;])` +
      `(${locale.closingSingleQuote})`,
      "g"
    ),
    `$2$1`
  )

  // move terminal punctuation (.?!…) outside when quoted fragment is at the end of a quoted sentence
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.terminalPunctuation}${base.ellipsis}])` +
      `(${locale.closingSingleQuote})` +
      `(${locale.closingDoubleQuote})`,
      "g"
    ),
    `$2$1$3`
  )

  return string;
}

//

/**
  Remove extra space around a single prime

  Example
  12 ′ 45″ →
  12′ 45″


  Assumptions and Limitations
  The functions runs after all single quotes and single primes have been identified. 


  @param {string} string: input text for identification
  @returns {string} output with adjusted spacing around single quotes and single primes
*/
export function removeExtraSpaceAroundSinglePrime(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.spaces}])` +
      `(${base.singlePrime})`, 
      "g"
    ),
    `$2`
  )
}

//

/**
  Replace all identified punctuation with appropriate punctuation in given language

  Context
  In single-quotes module, we first identify single quote and single prime adepts, and then we  replace them temporarily with labels as “${m.singlePrime}”. 
  This is the function in the sequence to swap temporary labels to desired quotes.
  

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} an output with locale-specific single quotes and single primes
*/
export function placeLocaleSingleQuotes(string, locale) {
  const replacements = [
    { pattern: m.singlePrime, replacement: base.singlePrime },
    {
      pattern:     `[${m.apos}${m.osqUnpaired}${m.csqUnpaired}]`,
      replacement: base.apostrophe,
    },
    { pattern: m.osq, replacement: locale.openingSingleQuote },
    { pattern: m.csq, replacement: locale.closingSingleQuote },
  ];

  return replacements.reduce(
    (text, { pattern, replacement }) => text.replace(new RegExp(pattern, "gu"), replacement),
    string
  );
}

//

/**
  Corrects improper use of single quotes, single primes and apostrophes

  Assumptions and Limitations
  This function assumes that double quotes are always used in pair,
  i.e. authors did not forget to close double quotes in their text.
  Further, single quotes are used as secondary and they're properly spaced,
  e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)

  Algorithm
  [0] Identify markdown code ticks
  [1] Identify common apostrophe contractions
  [2] Identify feet, arcminutes, minutes
  [3] Identify single quote pair around a single word
  [4] Identify single quotes
  [5] Replace a single qoute & a single prime with a single quote pair
  [6] Identify residual apostrophes
  [7] Replace all identified punctuation with appropriate punctuation in given language
  [8] Swap quotes and terminal punctuation
  [9] Consolidate spaces around single primes

  @param {string} string — input text for identification
  @param {string} language — language options
  @returns {string} — corrected output
*/
export function fixSingleQuotesPrimesAndApostrophes(string, locale, configuration) {
  configuration = configuration || {};

  /* [0] Identify markdown code ticks */
  string = identifyMarkdownCodeTicks(string, configuration);

  /* [1] Identify common apostrophe contractions */
  string = identifyContractedAnd(string);
  string = identifyContractedBeginnings(string);
  string = identifyInWordContractions(string);
  string = identifyContractedYears(string);
  string = identifyContractedEnds(string);

  /* [2] Identify feet, arcminutes, minutes */
  string = identifySinglePrimes(string);

  /* [3] Identify single quote pair around a single word */
  string = identifySingleQuotePairAroundSingleWord(string);

  /* [4] Identify single quotes within double quotes */
  string = identifySingleQuotesWithinDoubleQuotes(string);

  /* [5] Replace a single qoute & a single prime with a single quote pair */
  string = replaceSinglePrimeWSingleQuote(string);

  /* [6] Identify residual apostrophes*/
  string = identifyResidualApostrophes(string);

  /* [7] Replace all identified punctuation with appropriate punctuation in given language */
  string = placeLocaleSingleQuotes(string, locale);
  string = placeMarkdownCodeTicks(string, configuration);

  /* [8] Fix punctuation placement for quoted content */
  string = fixQuotedWordPunctuation(string, locale);
  string = fixQuotedSentencePunctuation(string, locale);

  /* [9] Consolidate spaces around single primes */
  string = removeExtraSpaceAroundSinglePrime(string);

  return string;
}
