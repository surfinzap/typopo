import { base } from "../../const.js";
import { identifyMarkdownCodeTicks, placeMarkdownCodeTicks } from "../../utils/markdown.js";

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
      `$1${base.nbsp}{{typopo__apostrophe}}$4{{typopo__apostrophe}}${base.nbsp}$7`
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
      `{{typopo__apostrophe}}$2`
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
      `$1{{typopo__apostrophe}}`
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
        `([\\d${base.allChars}])` +
        `(${base.singleQuoteAdepts})+` +
        `([${base.allChars}])`, 
      "g"
    ),
      `$1{{typopo__apostrophe}}$3`
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
      "g"
    ),
      `$1$2{{typopo__apostrophe}}$4`
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
  @returns {string} output with identified single primes as a temporary variable string, e.g. {{typopo__single-prime}}
*/
export function identifySinglePrimes(string) {
  return string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}

//

/**
  Identify standalone left single quote

  Algorithm
  Find left single quotes:
  - following a space, en dash or em dash
  - preceding a word

  @param {string} string: input text for identification
  @returns {string} output with identified standalone left single quote
*/
export function identifyStandaloneLeftSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `(^|[${base.spaces}${base.emDash}${base.enDash}])` +
        `(${base.singleQuoteAdepts}|,)` +
        `([${base.allChars}${base.ellipsis}])`,
      "g"
    ),
      `$1{{typopo__lsq--standalone}}$3`
  );
}

//

/**
  Identify standalone right single quote

  Algorithm
  Find right single quotes:
  - following a word
  - optionally, following a sentence punctuation
  - optionally, preceding a space or a sentence punctuation

  @param {string} string: input text for identification
  @returns {string} output with identified standalone right single quote
*/
export function identifyStandaloneRightSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.allChars}])` +
      `([${base.sentencePunctuation}${base.ellipsis}])?` +
      `(${base.singleQuoteAdepts})` +
      `([ ${base.sentencePunctuation}])?`,
      "g"
    ),
      `$1$2{{typopo__rsq--standalone}}$4`
  );
}

/**
  Identify single quotes within double quotes

  Limitations
  Since it’s difficult to identify apostrophe contracting end of the word (e.g. “jes’”), it’s difficult to identify single quotes universally. Therefore we’re identifying only single quotes and single quote pairs that are enclosed in double quote pairs.

  Algorithm
  - find text in double quotes
  - in quoted text find
    - standalone left single quote
    - standalone right single quote
    - single quote pairs

  @param {string} string: input text for identification
  @returns {string} output with identified standalone left single quote
*/
export function identifySingleQuotesWithinDoubleQuotes(string) {
  return string.replace(
    // prettier-ignore
    new RegExp(
        `(${base.doubleQuoteAdepts})` +
        `(.*?)` +
        `(${base.doubleQuoteAdepts})`,
      "g"
    ),
    function ($0, $1, $2, $3) {
      $2 = identifyStandaloneLeftSingleQuote($2);
      $2 = identifyStandaloneRightSingleQuote($2);
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
  - This function assumes apostrophes and standalone single quotes were identified. The function itself is part of the identifySingleQuotesWithinDoubleQuotes.
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
      `({{typopo__lsq--standalone}})` +
      `(.*)` +
      `({{typopo__rsq--standalone}})`,
      "g"
    ),
      `{{typopo__lsq}}$2{{typopo__rsq}}`
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
        `([${base.allChars}]+)` +
        `(${base.singleQuoteAdepts})` +
        `(\\B)`,
      "g"
    ),
      `$1{{typopo__lsq}}$3{{typopo__rsq}}$5`
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
      `{{typopo__apostrophe}}`
  );
}

//

/**
  Replace a single qoute & a single prime with a single quote pair

  Assumptions and Limitations
  This function follows previous functions that identify single primes or standalone single quotes.
  So it may happen that previous functions falsely identify a single quote pair around situations such as:
  - He said: “What about 'Localhost 3000', is that good?”

  Algorithm 
  Find standalone single quote and single prime in pair and change them to a single quote pair


  @param {string} string: input text for identification
  @returns {string} output with a single quote pair
*/
export function replaceSinglePrimeWSingleQuote(string) {
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `({{typopo__lsq--standalone}})` +
      `(.*?)` +
      `({{typopo__single-prime}})`,
      "g"
    ),
      `{{typopo__lsq}}$2{{typopo__rsq}}`
  );

  // prettier-ignore
  string = string.replace(
    new RegExp(
      `({{typopo__single-prime}})` +
      `(.*?)` +
      `({{typopo__rsq--standalone}})`,
      "g"
    ),
      `{{typopo__lsq}}$2{{typopo__rsq}}`
  );

  return string;
}

//

/**
 Swap single quotes and terminal punctuation for a quoted part


   There are two different rules to follow quotes:
  1. Quotes contain only quoted material:
  ‘Sometimes it can be a whole sentence.’
  Sometimes it can be only a ‘quoted part’.
  The difference is where the terminal and sentence pause punctuation is.

  2. American editorial style
  Similar as the first rule, but commas (,) and periods (.) go before closing quotation marks, regardless whether they are part of the quoted material.

  The aim here is to support the first rule.

  
  Examples
  ‘Sometimes it can be a whole sentence.’
  Sometimes it can be only a ‘quoted part’.

  So we’re looking to swap here:
  Sometimes it can be only a ‘quoted part.’ →
  Sometimes it can be only a ‘quoted part’.

  Exceptions
  Byl to ‘Karel IV.’, ktery 


  Algorithm
  Three different cases, see comments in code

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with swapped single quotes and terminal punctuation within a quoted part
*/
export function swapSingleQuotesAndTerminalPunctuation(string, locale) {
  // place punctuation outside of quoted part
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([^${base.sentencePunctuation}])` +
      `([${base.spaces}])` +
      `(${locale.leftSingleQuote})` +
      `([^${locale.rightSingleQuote}]+?)` +
      `([^${base.romanNumerals}])` +
      `([${base.terminalPunctuation}${base.ellipsis}])` +
      `(${locale.rightSingleQuote})`, 
      "g"
    ),
      `$1$2$3$4$5$7$6`
  );

  // place punctuation within a quoted sentence that’s in the middle of the sentence.
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([^${base.sentencePunctuation}])` +
      `([${base.spaces}])` +
      `(${locale.leftSingleQuote})` +
      `(.+?)` +
      `([^${base.romanNumerals}])` +
      `(${locale.rightSingleQuote})` +
      `([${base.terminalPunctuation}${base.ellipsis}])` +
      `([${base.spaces}])` +
      `([${base.lowercaseChars}])`,

      "g"
    ),
      `$1$2$3$4$5$7$6$8$9`
  );

  // place punctuation within a quoted sentence
  // following a previous sentence or starting from a beginning
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.sentencePunctuation}][${base.spaces}]|^)` +
      `(${locale.leftSingleQuote})` +
      `([^${locale.rightSingleQuote}]+?)` +
      `([^${base.romanNumerals}])` +
      `(${locale.rightSingleQuote})` +
      `([${base.terminalPunctuation}${base.ellipsis}])` +
      `(\\B)`,

      "g"
    ),
      `$1$2$3$4$6$5$7`
  );

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
  In single-quotes module, we first identify single quote and single prime adepts, and then we  replace them temporarily with labels as “{{typopo__single-prime}}”. 
  This is the function in the sequence to swap temporary labels to desired quotes.
  

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} an output with locale-specific single quotes and single primes
*/
export function placeLocaleSingleQuotes(string, locale) {
  string = string.replace(/({{typopo__single-prime}})/g, base.singlePrime);

  string = string.replace(
    /{{typopo__apostrophe}}|{{typopo__lsq--standalone}}|{{typopo__rsq--standalone}}/g,
    base.apostrophe
  );

  string = string.replace(/{{typopo__lsq}}/g, locale.leftSingleQuote);
  string = string.replace(/{{typopo__rsq}}/g, locale.rightSingleQuote);

  string = string.replace(/{{typopo__markdown_syntax_highlight}}/g, "```");

  return string;
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

  /* [8] Swap quotes and terminal punctuation */
  string = swapSingleQuotesAndTerminalPunctuation(string, locale);

  /* [9] Consolidate spaces around single primes */
  string = removeExtraSpaceAroundSinglePrime(string);

  return string;
}
