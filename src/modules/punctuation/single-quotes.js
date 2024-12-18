import { identifyMarkdownCodeTicks,
         placeMarkdownCodeTicks } from "../punctuation/markdown";



/*
  Identify ’n’ contractions as apostrophes

  Example
  rock 'n' roll → rock ’n’ roll
  fish 'n' chips → fish ’n’ chips


  Exceptions
  Press 'N' to continue (should be identified as single quotes)


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedAnd(string, locale) {	
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

  commonContractions.forEach(item =>{

    string = string.replace(
      new RegExp(
        "(" + item[0] + ")"
        +	"([" + locale.spaces + "])?"
        +	"(" + locale.singleQuoteAdepts + ")"
        + "(n)"
        + "(" + locale.singleQuoteAdepts + ")" 
        +	"([" + locale.spaces + "])?"
        + "(" + item[1] + ")",
        "gi"
      ),
        "$1"
        +	locale.nbsp
        +	"{{typopo__apostrophe}}"
        + "$4"
        + "{{typopo__apostrophe}}"
        +	locale.nbsp
        + "$7"
    )
  });

  return string;
}



/*
  Identify common contractions at the beginning of the word as apostrophes


  Example
  ’em, ’cause,… see list of words in the function

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedBeginnings(string, locale) {	
  let contractedWords = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";

  return string.replace(
    new RegExp(
      "(" + locale.singleQuoteAdepts + ")"
    + "(" + contractedWords + ")", 
      "gi"
    ),
      "{{typopo__apostrophe}}"
    + "$2"
  );
}



/*
  Identify common contractions at the ends of the word as apostrophes

  Example
  contraction of an -ing form, e.g. nottin’

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedEnds(string, locale) {	
  return string.replace(
    new RegExp(
      "(\\Bin)"
    + "(" + locale.singleQuoteAdepts + ")",
      "gi"
    ),
      "$1"
    + "{{typopo__apostrophe}}"
  );
}



/*
  Identify in-word contractions as apostrophes

  Examples
  Don’t, I’m, O’Doole, 69’ers,…

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyInWordContractions(string, locale) {	
  return string.replace(
    new RegExp(
      "(["+ locale.cardinalNumber + locale.allChars +"])"
      + "(" + locale.singleQuoteAdepts +")+"
      + "(["+ locale.allChars +"])", 
      "g"
    ),
      "$1"
    + "{{typopo__apostrophe}}"
    + "$3"
  );
}




/*
  Identify contracted years

  Example
  in ’70s, INCHEBA ’89,…

  Exceptions
  12 '45″ // when there is a wrongly spaced feet


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedYears(string, locale) {	
  return string.replace(
    new RegExp(
      "([^0-9]|[A-Z][0-9])"
    + "([" + locale.spaces + "])"
    + "(" + locale.singleQuoteAdepts + ")"
    + "([" + locale.cardinalNumber + "]{2})", 
      "g"
    ),
      "$1"
    + "$2"
    + "{{typopo__apostrophe}}"
    + "$4"
  );
}



/*
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
  We’re not using locale.singleQuoteAdepts variable as commas and low-positioned quotes are ommited

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified single primes as a temporary variable string, e.g. {{typopo__sinlge-prime}}
*/
export function identifySinglePrimes(string) {
  return string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}



/*
  Identify standalone left single quote

  Algorithm
  Find left single quotes:
  - following a space, en dash or em dash
  - preceding a word

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified standalone left single quote
*/
export function identifyStandaloneLeftSingleQuote(string, locale) {

  return string.replace(
    new RegExp(
        "([" + locale.spaces + locale.emDash + locale.enDash + "])"
      + "(" + locale.singleQuoteAdepts + "|,)"
      + "(["+ locale.allChars +"])",
      "g"
    ),
      "$1"
    + "{{typopo__left-single-quote--standalone}}"
    + "$3"
  );

}



/*
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
  @param {string} locale: locale option
  @returns {string} output with identified standalone left single quote
*/
export function identifySingleQuotesWithinDoubleQuotes(string, locale) {

  return string.replace(
    new RegExp(
        "(" + locale.doubleQuoteAdepts + ")"
      + "(.*?)"
      + "(" + locale.doubleQuoteAdepts + ")",
      "g"
    ),
      function($0, $1, $2, $3){

        $2 = identifyStandaloneLeftSingleQuote($2, locale);
        $2 = identifyStandaloneRightSingleQuote($2, locale);
        $2 = identifySingleQuotePairs($2, locale);

        return $1 + $2 + $3;
      }
  );

}




/*
  Identify standalone right single quote

  Algorithm
  Find right single quotes:
  - following a word
  - optionally, following a sentence punctuation
  - optionally, preceding a space or a sentence punctuation

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified standalone right single quote
*/
export function identifyStandaloneRightSingleQuote(string, locale) {

  return string.replace(
    new RegExp(
      "(["+ locale.allChars +"])"
    + "(["+ locale.sentencePunctuation +"])?"
    + "(" + locale.singleQuoteAdepts + ")"
    + "([ "+ locale.sentencePunctuation +"])?",
      "g"
    ),
      "$1"
    + "$2"
    + "{{typopo__right-single-quote--standalone}}"
    + "$4"
  );

}




/*
  Identify single quote pairs 

  Example
  "a 'quoted material' here" → “a ‘quoted material’ here”

  Assumptions and Limitations
  - This function assumes apostrophes and standalone single quotes were identified. The function itself is part of the identifySingleQuotesWithinDoubleQuotes.
  - It is difficult to identify all contractions at the end of the word, and thus it is difficult to identify single quote pairs. This function therefore only identifies one single quote pair with a double quote pair

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified single quote pair
*/
export function identifySingleQuotePairs(string) {

  // identify one phrase wrapped in single quotes
  return string.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})"
    + "(.*)"
    + "({{typopo__right-single-quote--standalone}})",
      "g"
    ),
      "{{typopo__left-single-quote}}"
    + "$2"
    + "{{typopo__right-single-quote}}"
  );

}


/*
  Identify single quote pair around   a single word

  Example
 'word' → ‘word’

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified single quote pairs around single word
*/
export function identifySingleQuotePairAroundSingleWord(string, locale){

  return string.replace(
    new RegExp(
        "(\\B)"
      + "(" + locale.singleQuoteAdepts + ")"
      + "([" + locale.allChars + "]+)"
      + "(" + locale.singleQuoteAdepts + ")"
      + "(\\B)",
      "g"
    ),
      "$1"
    + "{{typopo__left-single-quote}}"
    + "$3"
    + "{{typopo__right-single-quote}}"
    + "$5"
  );

}



/*
  Identify residual apostrophes 

  Finds remaining single quote adepts and changes them to apostrophes.


  Limitation
  This function runs as last in the row identification function as it catches what’s left.

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with identified single quote pairs
*/
export function identifyResidualApostrophes(string, locale) {

  return string.replace(
    new RegExp(
      "(" + locale.singleQuoteAdepts + ")",
      "g"
    ),
      "{{typopo__apostrophe}}"
  );
}





/*
  Replace a single qoute & a single prime with a single quote pair

  Assumptions and Limitations
  This function follows previous functions that identify single primes or standalone single quotes.
  So it may happen that previous functions falsely identify a single quote pair around situations such as:
  - He said: “What about 'Localhost 3000', is that good?”

  Algorithm 
  Find standalone single quote and single prime in pair and change them to a single quote pair


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with a single quote pair
*/
export function replaceSinglePrimeWSingleQuote(string) {

  string = string.replace(
    new RegExp(
      "({{typopo__left-single-quote--standalone}})"
    + "(.*?)"
    + "({{typopo__single-prime}})",
      "g"
    ),
      "{{typopo__left-single-quote}}"
    + "$2"
    + "{{typopo__right-single-quote}}"
  );

  string = string.replace(
    new RegExp(
      "({{typopo__single-prime}})"
    + "(.*?)"
    + "({{typopo__right-single-quote--standalone}})",
      "g"
    ),
      "{{typopo__left-single-quote}}"
    + "$2"
    + "{{typopo__right-single-quote}}"
  );	

  return string;
}



/*
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
  string = string.replace(
    new RegExp(
      "([^" + locale.sentencePunctuation + "])"
    + "([" + locale.spaces + "])"
    + "(" + locale.leftSingleQuote + ")"
    + "([^" + locale.rightSingleQuote +"]+?)"
    + "([^" + locale.romanNumerals + "])"
    + "([" + locale.terminalPunctuation + locale.ellipsis + "])"
    + "(" + locale.rightSingleQuote + ")", 
      "g"
    ),
      "$1"
    + "$2"
    + "$3"
    + "$4"
    + "$5"
    + "$7"
    + "$6"
  );

  // place punctuation within a quoted sentence that’s in the middle of the sentence.
  string = string.replace(
    new RegExp(
      "([^" + locale.sentencePunctuation + "])"
    + "([" + locale.spaces + "])"
    + "(" + locale.leftSingleQuote + ")"
    + "(.+?)"
    + "([^" + locale.romanNumerals + "])"
    + "(" + locale.rightSingleQuote + ")"
    // + "([" + locale.lowercaseChars + "])"
    + "([" + locale.terminalPunctuation + locale.ellipsis + "])"
    + "([" + locale.spaces + "])"
    + "([" + locale.lowercaseChars + "])",

      "g"
    ),
      "$1"
    + "$2"
    + "$3"
    + "$4"
    + "$5"
    + "$7"
    + "$6"
    + "$8"
    + "$9"
  );
  

  // place punctuation within a quoted sentence 
  // following a previous sentence or starting from a beginning
  string = string.replace(
    new RegExp(
      "([" + locale.sentencePunctuation + "][" + locale.spaces + "]|^)"
    + "(" + locale.leftSingleQuote + ")"
    + "([^" + locale.rightSingleQuote +"]+?)"
    + "([^" + locale.romanNumerals + "])"
    + "(" + locale.rightSingleQuote + ")"
    + "([" + locale.terminalPunctuation + locale.ellipsis + "])"
    + "(\\B)",

      "g"
    ),
      "$1"
    + "$2"
    + "$3"
    + "$4"
    + "$6"
    + "$5"
    + "$7"
  );

  return string;

}




/*
  Remove extra space around a single prime

  Example
  12 ′ 45″ →
  12′ 45″


  Assumptions and Limitations
  The functions runs after all single quotes and single primes have been identified. 


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with adjusted spacing around single quotes and single primes
*/
export function removeExtraSpaceAroundSinglePrime(string, locale) {	


  return string.replace(
    new RegExp(
      "(["+ locale.spaces +"])"
    + "("+ locale.singlePrime +")", 
      "g"
    ),
    "$2"
  )
}




/*
  Replace all identified punctuation with appropriate punctuation in given language

  Context
  In single-quotes module, we first identify single quote and single prime adepts, and then we  replace them temporarily with labels as “{{typopo__single-prime}}”. 
  This is the function in the sequence to swap temporary labels to desired quotes.
  

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} an output with locale-specific single quotes and single primes
*/
export function placeLocaleSingleQuotes(string, locale) {

  string = string.replace(/({{typopo__single-prime}})/g, locale.singlePrime);

  string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g, locale.apostrophe);

  string = string.replace(/{{typopo__left-single-quote}}/g, locale.leftSingleQuote);
  string = string.replace(/{{typopo__right-single-quote}}/g, locale.rightSingleQuote);

    string = string.replace(/{{typopo__markdown_syntax_highlight}}/g, "```");

  

  return string;
}





/*
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
  string = identifyContractedAnd(string, locale);
  string = identifyContractedBeginnings(string, locale);
  string = identifyInWordContractions(string, locale);
  string = identifyContractedYears(string, locale);
  string = identifyContractedEnds(string, locale);


  /* [2] Identify feet, arcminutes, minutes */
  string = identifySinglePrimes(string, locale);

  /* [3] Identify single quote pair around a single word */
  string = identifySingleQuotePairAroundSingleWord(string, locale);

  /* [4] Identify single quotes within double quotes */
  string = identifySingleQuotesWithinDoubleQuotes(string, locale);


  /* [5] Replace a single qoute & a single prime with a single quote pair */
  string = replaceSinglePrimeWSingleQuote(string, locale);


  /* [6] Identify residual apostrophes*/
  string = identifyResidualApostrophes(string, locale);


  /* [7] Replace all identified punctuation with appropriate punctuation in given language */
  string = placeLocaleSingleQuotes(string,locale);
  string = placeMarkdownCodeTicks(string, configuration);

  /* [8] Swap quotes and terminal punctuation */
  string = swapSingleQuotesAndTerminalPunctuation(string, locale);

  /* [9] Consolidate spaces around single primes */
  string = removeExtraSpaceAroundSinglePrime(string, locale);

  return string;
}