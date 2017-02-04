/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

import {normalizeConfiguration} from './configuration';
import getExceptionHandler from './modules/exceptions';

export {getDefaultConfiguration} from './configuration';

export function createCorrector(configuration) {
  const config = normalizeConfiguration(configuration);
  const {
    essentialSet,
    nonLatinChars,
    lowercaseCharsEnSkCzRue,
    uppercaseCharsEnSkCzRue,
    singleQuoteAdepts,
    doubleQuoteAdepts,
    nbsp,
    hairSpace,
    narrowNbsp,
    spaces,
    terminalPunctuation,
    sentencePunctuation,
    openingBrackets,
    closingBrackets,
    ellipsis,
    degree,
  } = config.patterns;

  /*----------------------------------------------------------------------------*\
   Essential replacements
   \*----------------------------------------------------------------------------*/

  function replace_symbols(string) {
    for (const rule in essentialSet) {
      const re = new RegExp(rule, "g");
      string = string.replace(re, essentialSet[rule]);
    }
    return string;
  }


  function replace_periods_with_ellipsis(string) {
    /* [1] replace 3 and more dots with an ellipsis */
    string = string.replace(/\.{3,}/g, "…");

    /* [2] replace 2 dots in the middle of the sentence with an aposiopesis */
    const pattern = "[" + spaces + "]\\.{2}[" + spaces + "]";
    const re = new RegExp(pattern, "g");
    string = string.replace(re, " … ");

    /* [3] replace 2 dots at the end of the sentence with full stop */
    string = string.replace(/\.{2}/g, ".");

    return string;
  }


  function remove_multiple_spaces(string) {
    return string.replace(/ {2,}/g, " ");
  }


  /*----------------------------------------------------------------------------*\
   Quotes, primes & apostrophes
   \*----------------------------------------------------------------------------*/


  /*
   Corrects improper use of double quotes and double primes

   Assumptions and Limitations
   This function assumes that double quotes are always used in pair,
   i.e. authors did not forget to close double quotes in their text.

   Algorithm
   [0] Remove extra terminal punctuation around double quotes
   [1] Swap right double quote adepts with a punctuation
   (this comes first as it is a quite common mistake that may eventually
   lead to improper identification of double primes)
   [2] Identify inches, arcseconds, seconds
   [3] Identify closed double quotes
   [4] Identify the rest as unclosed double quotes (best-effort replacement)
   [5] Fix spacing around quotes and primes
   [6] Swap back some of the double quotes with a punctuation
   [7] Remove extra punctuation around quotes
   [8] Replace all identified punctuation with appropriate punctuation in
   given language

   @param {string} string — input text for identification
   @param {string} language — language option
   @returns {string} output with properly replaces double quotes and double primes
   */
  function correct_double_quotes_and_primes(string, language) {

    /* [0] Remove extra terminal punctuation around double quotes
     e.g. “We will continue tomorrow.”. */
    let pattern = "([" + sentencePunctuation + "])(" + doubleQuoteAdepts + ")([" + sentencePunctuation + "])";
    let re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$2");

    /* [1] Swap right double quote adepts with a terminal punctuation */
    pattern = "(" + doubleQuoteAdepts + ")([" + terminalPunctuation + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, '$2$1');

    /* [2] Identify inches, arcseconds, seconds
     Note: we’re not using double_quote_adepts variable
     as commas and low-positioned quotes are omitted*/
    string = string.replace(/(\d ?)(“|”|"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");


    /* [3] Identify closed double quotes */
    pattern = "(" + doubleQuoteAdepts + ")(.*?)(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");


    /* [4.1] Identify unclosed left double quote */
    pattern = "(" + doubleQuoteAdepts + ")([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__left-double-quote}}$2");


    /* [4.2] Identify unclosed right double quote */
    pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + sentencePunctuation + ellipsis + "])(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1{{typopo__right-double-quote}}");


    /* [4.3] Remove remaining unidentified double quote */
    pattern = "([" + spaces + "])(" + doubleQuoteAdepts + ")([" + spaces + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");


    /* [5] Fix spacing around quotes and prime */
    string = string.replace(/(\{\{typopo__left-double-quote}})( )/g, "$1");
    string = string.replace(/( )(\{\{typopo__right-double-quote}})/g, "$2");
    string = string.replace(/( )(\{\{typopo__double-prime}})/g, "$2");


    /* [6] Swap back some of the double quotes with a punctuation

     Idea
     In [1] we have swapped all double right quotes by default with a terminal
     punctuation. However, not all double quotes wrap the whole sentence and
     there are cases when few words are quoted within a sentence. Take a look at
     examples:
     “Sentence quoted as a whole.” (full stop is placed within double quotes)
     This is “quoted expression.” (full stop is placed outside double quotes)

     Algorithm
     Match all the double quote pairs that do not precede sentence punctuation
     (and thus must be used within a sentence) and swap right double with
     a terminal punctuation.
     */
    pattern = "([^" + sentencePunctuation + "][" + spaces + "]{{typopo__left-double-quote}}.+?)([" + terminalPunctuation + "])({{typopo__right-double-quote}})";
    // console.log(pattern);
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3$2");


    /* [7] Remove extra comma after punctuation in direct speech,
     e.g. "“Hey!,” she said" */
    pattern = "([" + sentencePunctuation + "])([\,])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1");


    /* [8] Punctuation replacement */
    string = string.replace(/(\{\{typopo__double-prime}})/g, "″");

    switch (language) {
      case "rue":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "«");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "»");
        break;
      case "sk":
      case "cs":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "„");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "“");
        break;
      case "en":
        string = string.replace(/(\{\{typopo__left-double-quote}})/g, "“");
        string = string.replace(/(\{\{typopo__right-double-quote}})/g, "”");
        break;
    }

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
   [1] Identify common apostrohe contractions
   [2] Identify single quotes
   [3] Identify feet, arcminutes, minutes
   [4] Identify residual apostrophes that have left
   [?] Swap right single quote adepts with a punctuation
   (We were swapping single quotes as part of algorithm a while a back,
   but since it is more probable that single quotes are in the middle of the
   sentence, we have dropped swapping as a part of the algorithm)
   [6] Replace all identified punctuation with appropriate punctuation in
   given language

   @param {string} string — input text for identification
   @param {string} language — language options
   @returns {string} — corrected output
   */
  function correct_single_quotes_primes_and_apostrophes(string, language) {

    /* [1.1] Identify ’n’ contractions */
    let pattern = "(" + singleQuoteAdepts + ")(n)(" + singleQuoteAdepts + ")";
    let re = new RegExp(pattern, "gi");
    string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");


    /* [1.2] Identify common contractions at the beginning or at the end
     of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
    const contraction_examples = "em|cause|twas|tis|til|round";
    pattern = "(" + singleQuoteAdepts + ")(" + contraction_examples + ")";
    re = new RegExp(pattern, "gi");
    string = string.replace(re, "{{typopo__apostrophe}}$2");


    /* [1.3] Identify in-word contractions,
     e.g. Don’t, I’m, O’Doole, 69’ers */
    const character_adepts = "0-9" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue;
    pattern = "([" + character_adepts + "])(" + singleQuoteAdepts + ")([" + character_adepts + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1{{typopo__apostrophe}}$3");


    /* [1.4] Identify year contractions
     e.g. ’70s, INCHEBA ’89,… */
    pattern = "(" + singleQuoteAdepts + ")([0-9]{2})";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__apostrophe}}$2");


    /* [2] Identify single quotes within double quotes */
    pattern = "(" + doubleQuoteAdepts + ")(.*?)(" + doubleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function ($0, $1, $2, $3) {

      //identify {{typopo__left-single-quote--adept}}
      let pattern = "( )(" + singleQuoteAdepts + ")([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
      let re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

      //identify {{typopo__right-single-quote--adept}}
      pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([\.,!?])?(" + singleQuoteAdepts + ")([ ]|[\.,!?])";
      re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

      //identify single quote pairs
      pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
      re = new RegExp(pattern, "g");
      $2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

      return $1 + $2 + $3;
    });


    /* [3] Identify feet, arcminutes, minutes
     Note: we’re not using single_quote_adepts variable
     as commas and low-positioned quotes are omitted*/
    string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");


    /* [4] Identify residual apostrophes that have left */
    pattern = "(" + singleQuoteAdepts + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "{{typopo__apostrophe}}");


    /* [5] Punctuation replacement */
    string = string.replace(/(\{\{typopo__single-prime}})/g, "′");
    string = string.replace(/\{\{typopo__apostrophe}}|\{\{typopo__left-single-quote--adept}}|\{\{typopo__right-single-quote--adept}}/g, "’");


    switch (language) {
      case "rue":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‹");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "›");
        break;
      case "sk":
      case "cs":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‚");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "‘");
        break;
      case "en":
        string = string.replace(/\{\{typopo__left-single-quote}}/g, "‘");
        string = string.replace(/\{\{typopo__right-single-quote}}/g, "’");
    }

    return string;
  }


  function correct_multiple_sign(string) {
    return remove_multiple_spaces(string.replace(/([1-9]+[ ]?[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
  }


  /*
   Replaces hyphen with em or en dash

   Algorithm
   [1] Replace 3 consecutive hyphens (---) with an em dash (—)
   [2] Replace 2 consecutive hyphens (--) with an en dash (—)
   [3] Replace any hyphen or dash surrounded with spaces with an em dash
   [4] Replace hyphen or dash used in number range with an en dash
   and set proper spacing

   @param {string} string — input text for identification
   @returns {string} — output with dashes instead of hyphens
   */
  function replace_hyphen_with_dash(string, language) {
    const dashes = "-–—"; // including a hyphen

    /* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
    string = string.replace(/(---)/g, "—");


    /* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
    string = string.replace(/(--)/g, "–");


    /* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
    let pattern = "[" + spaces + "][" + dashes + "][" + spaces + "]";
    let re = new RegExp(pattern, "g");
    const replacement = narrowNbsp + "—" + hairSpace;
    string = string.replace(re, replacement);

    /* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
     with an en dash; including cases when there is an extra space
     from either one side or both sides of the dash */
    const cardinal_number = "\\d+";
    pattern = "(" + cardinal_number + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1–$3");


    /* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
     with an en dash; including cases when there is an extra space
     from either one side or both sides of the dash */
    let ordinal_indicator = "";
    switch (language) {
      case "rue":
      case "sk":
      case "cs":
        ordinal_indicator = "\\.";
        break;
      case "en":
        ordinal_indicator = "st|nd|rd|th";
        break;
    }
    pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
    re = new RegExp(pattern, "gi");
    string = string.replace(re, "$1$2–$4$5");

    return string;
  }


  function replace_dash_with_hyphen(string) {
    const pattern = "([" + lowercaseCharsEnSkCzRue + "])([–—])([" + lowercaseCharsEnSkCzRue + "])";
    const re = new RegExp(pattern, "g");
    return string.replace(re, "$1-$3");
  }


  /*----------------------------------------------------------------------------*\
   Consolidation of spaces
   \*----------------------------------------------------------------------------*/


  function remove_space_before_punctuation(string) {
    const pattern = "([" + spaces + "])([" + sentencePunctuation + closingBrackets + degree + "])";
    const re = new RegExp(pattern, "g");
    return string.replace(re, "$2");
  }


  function remove_space_after_punctuation(string) {
    const pattern = "([" + openingBrackets + "])([" + spaces + "])";
    const re = new RegExp(pattern, "g");
    return string.replace(re, "$1");
  }


  function remove_trailing_spaces(string) {
    return string.trim();
  }


  function add_space_before_punctuation(string) {
    const pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([" + openingBrackets + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    const re = new RegExp(pattern, "g");
    return string.replace(re, "$1 $2$3");
  }


  function add_space_after_punctuation(string) {
    const pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])([" + sentencePunctuation + closingBrackets + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    const re = new RegExp(pattern, "g");
    return string.replace(re, "$1$2 $3");
  }


  /*
   Removes extra spaces at the beginning of each paragraph

   This could be done with a one-liner:
   return string.replace(/^\s+/gm, "");

   However, it also removes empty lines. Since, we want to handle this change
   separately, we need to
   [1] split the lines manually
   [2] and remove extra spaces at the begining of each line
   [3] join lines together to a single string

   @param {string} string — input text for identification
   @returns {string} — output with removed spaces at the beginning of paragraphs
   */
  function remove_spaces_at_paragraph_beginning(string) {
    /* [1] split the lines manually */
    let lines = string.split(/\r?\n/);

    /* [2] and remove extra spaces at the begining of each line */
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^\s+/, "");
    }

    /* [3] join lines together to a single string */
    return lines.join("\n");
  }


  /*
   Removes empty lines

   @param {string} string — input text for identification
   @returns {string} — output with removed empty lines
   */
  function remove_empty_lines(string) {
    return string.replace(/^\s+/gm, "");
  }


  /*
   Consolidates the use of non-breaking spaces

   * adds non-breaking spaces after single-character prepositions
   * adds non-breaking spaces after numerals
   * adds non-breaking spaces around ×
   * removes characters between multi-character words

   @param {string} string — input text for identification
   @returns {string} — output with correctly placed non-breaking space
   */
  function consolidate_nbsp(string) {
    // removes non-breaking spaces between multi-character words
    let pattern = "([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]{2,})([" + nbsp + narrowNbsp + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]{2,})";
    let re = new RegExp(pattern, "g");
    string = string.replace(re, "$1 $3");
    string = string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


    // adds non-breaking spaces after numerals
    pattern = "([0-9]+)( )([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]+)";
    re = new RegExp(pattern, "g");
    let replacement = "$1" + nbsp + "$3";
    string = string.replace(re, replacement);


    // adds non-breaking spaces around ×
    pattern = "([" + spaces + "])([×])([" + spaces + "])";
    re = new RegExp(pattern, "g");
    replacement = nbsp + "$2" + nbsp;
    string = string.replace(re, replacement);


    // adds non-breaking spaces after single-character prepositions
    pattern = "([  ])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "]|&)( )";
    re = new RegExp(pattern, "g");
    replacement = "$1$2" + nbsp;
    string = string.replace(re, replacement);
    string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

    return string;
  }


  /*
   Corrects improper spacing around ellipsis and aposiopesis

   Ellipsis (as a character) is used for 2 different purposes:
   1. as an ellipsis to omit a piece of information deliberately
   2. as an aposiopesis; a figure of speech wherein a sentence is
   deliberately broken off and left unfinished

   sources
   https://en.wikipedia.org/wiki/Ellipsis
   https://en.wikipedia.org/wiki/Aposiopesis
   http://www.liteera.cz/slovnik/vypustka

   Algorithm
   Ellipsis & Aposiopesis require different use of spacing around them,
   that is why we are correcting only following cases:
   errors:
   [1] correct spacing, when ellipsis used used around commas
   [2] correct spacing for aposiopesis at the end of the sentence in the middle of the paragraph
   [3] correct spacing for aposiopesis at the beginning of the sentence in the middle of the paragraph
   [4] correct spacing for aposiopesis at the beginning of the sentence at the beginning of the paragraph
   [5] correct spacing for aposiopesis at the end of the sentence at the end of the paragraph

   @param {string} string — input text for identification
   @returns {string} — output with corrected spacing around aposiopesis
   */
  function correct_spaces_around_ellipsis(string) {

    /* [1] correct spacing, when ellipsis used used around commas */
    let pattern = ",[" + spaces + "]?" + ellipsis + "[" + spaces + "]?,";
    let re = new RegExp(pattern, "g");
    string = string.replace(re, ", …,");


    /* [2] correct spacing for aposiopesis at the end of the sentence
     in the middle of the paragraph */
    pattern = "([" + lowercaseCharsEnSkCzRue + "])([" + spaces + "])(" + ellipsis + "[" + spaces + "][" + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");


    /* [3] correct spacing for aposiopesis at the beginning of the sentence
     in the middle of the paragraph */
    pattern = "([" + sentencePunctuation + "][" + spaces + "]" + ellipsis + ")([" + spaces + "])([" + lowercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");


    /* [4] correct spacing for aposiopesis at the beginning of the sentence
     at the beginning of the paragraph */
    pattern = "(^…)([" + spaces + "])([" + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "gm");
    string = string.replace(re, "$1$3");


    /* [5] correct spacing for aposiopesis at the end of the sentence
     at the end of the paragraph */
    pattern = "([" + lowercaseCharsEnSkCzRue + sentencePunctuation + "])([" + spaces + "])(" + ellipsis + ")(?![ " + sentencePunctuation + lowercaseCharsEnSkCzRue + uppercaseCharsEnSkCzRue + "])";
    re = new RegExp(pattern, "g");
    string = string.replace(re, "$1$3");

    return string;
  }


  /*
   Corrects accidental uppercase

   Best-effort function to fix most common accidental uppercase errors, namely:
   [1] 2 first uppercase letters (ie. UPpercase)
   [2] Swapped cases (ie. uPPERCASE)

   Algorithm does not fix other uppercase eventualities,
   e.g. mixed case (UppERcaSe) as there are many cases for corporate brands
   that could potentially match the algorithm as false positive.

   @param {string} string — input text for identification
   @returns {string} — output with corrected accidental uppercase
   */
  function correct_accidental_uppercase(string) {

    /* [1] two first uppercase letters (i.e. UPpercase) */
    let pattern = "[" + uppercaseCharsEnSkCzRue + "]{2,2}[" + lowercaseCharsEnSkCzRue + "]+";
    let re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return (string.substring(0, 1) + string.substring(1).toLowerCase());
    });

    /* [2.1] Swapped cases (2-letter cases, i.e. iT)
     Note that this is divided into 2 separate cases as \b in JavaScript regex
     does not take non-latin characters into a cosnideration
     */
    pattern = "[" + lowercaseCharsEnSkCzRue + "][" + uppercaseCharsEnSkCzRue + "]\\b";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return (string.substring(0, 1) + string.substring(1).toLowerCase());
    });

    /* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
    pattern = "[" + lowercaseCharsEnSkCzRue + "]+[" + uppercaseCharsEnSkCzRue + "]{2,}";
    re = new RegExp(pattern, "g");
    string = string.replace(re, function (string) {
      return (string.substring(0, 1) + string.substring(1).toLowerCase());
    });

    return string;
  }


  /*----------------------------------------------------------------------------*\
   Abbreviations
   \*----------------------------------------------------------------------------*/
  /*
   Identifies differently-spelled abbreviations and replaces it with
   a temp variable, {{typopo__[abbr]}}

   Identifies given abbreviations:
   a.m., p.m., e.g., i.e.

   Algorithm
   [1] Identify e.g., i.e.
   [2] Identify a.m., p.m. (different match to avoid false positives such as:
   I am, He is the PM.)
   [3] Exclude false identifications

   @param {string} input text for identification
   @returns {string} corrected output
   */
  function identify_common_abbreviations(string) {

    /* [1] Identify e.g., i.e. */
    let abbreviations = ["eg", "ie"];
    for (let i = 0; i < abbreviations.length; i++) {
      const pattern = "(\\b[" + abbreviations[i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + spaces + "]?)(\\b)";
      // console.log(pattern);
      const re = new RegExp(pattern, "gi");
      const replacement = "{{typopo__" + abbreviations[i] + "}} ";
      string = string.replace(re, replacement);
    }


    /* [2] Identify a.m., p.m. */
    abbreviations = ["am", "pm"];
    for (let i = 0; i < abbreviations.length; i++) {
      const pattern = "(\\d)([" + spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + spaces + "]?)(\\b|\\B)";
      const re = new RegExp(pattern, "gi");
      const replacement = "$1 {{typopo__" + abbreviations[i] + "}} ";
      string = string.replace(re, replacement);
    }


    /* [3] Exclude false identifications
     Regex \b does not catch non-latin characters so we need to exclude false
     identifications
     */
    abbreviations = ["eg", "ie", "am", "pm"];
    for (let i = 0; i < abbreviations.length; i++) {
      // non-latin character at the beginning
      let pattern = "([" + nonLatinChars + "])({{typopo__" + abbreviations[i] + "}})";
      let re = new RegExp(pattern, "g");
      let replacement = "$1" + abbreviations[i];
      string = string.replace(re, replacement);

      // non-latin character at the end
      pattern = "({{typopo__" + abbreviations[i] + "}} )([" + nonLatinChars + "])";
      re = new RegExp(pattern, "g");
      replacement = abbreviations[i] + "$2";
      string = string.replace(re, replacement);
    }

    return string;
  }


  /*
   Replaces identified temp abbreviation variable like {{typopo__eg}},
   with their actual representation

   @param {string} input text for identification
   @returns {string} corrected output
   */
  function place_common_abbreviations(string) {
    const abbreviations = ["eg", "ie", "am", "pm"];
    for (let i = 0; i < abbreviations.length; i++) {
      const pattern = "{{typopo__" + abbreviations[i] + "}}";
      const re = new RegExp(pattern, "g");
      const replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
      string = string.replace(re, replacement);
    }

    return string;
  }


  /*----------------------------------------------------------------------------*\
   Main script
   \*----------------------------------------------------------------------------*/


  /*
   Correct typos in the predefined order


   @param {string} string — input text for correction
   @returns {string} — corrected output
   */
  return function correct_typos(string) {
    const language = config.language;
    const remove_lines = config['remove-empty-lines'];

    const exceptionHandler = getExceptionHandler(config['exceptions']);

    string = exceptionHandler.identify_exceptions(string);
    string = identify_common_abbreviations(string); // needs to go before punctuation fixes

    string = replace_symbols(string, essentialSet);
    string = replace_periods_with_ellipsis(string);
    string = remove_multiple_spaces(string);


    string = correct_double_quotes_and_primes(string, language);
    string = correct_single_quotes_primes_and_apostrophes(string, language);

    string = correct_multiple_sign(string);

    string = remove_space_before_punctuation(string);
    string = remove_space_after_punctuation(string);
    string = remove_trailing_spaces(string);
    string = add_space_before_punctuation(string);
    string = add_space_after_punctuation(string);
    string = remove_spaces_at_paragraph_beginning(string);

    if (remove_lines) {
      string = remove_empty_lines(string);
    }

    string = consolidate_nbsp(string);
    string = correct_spaces_around_ellipsis(string);

    string = replace_hyphen_with_dash(string, language);
    string = replace_dash_with_hyphen(string);

    string = correct_accidental_uppercase(string);

    string = place_common_abbreviations(string); // needs to go after punctuation fixes
    string = exceptionHandler.place_exceptions(string);

    string = replace_periods_with_ellipsis(string);

    return string;
  }
}
