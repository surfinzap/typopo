import {
  removeExtraPunctuationBeforeQuotes,
  removeExtraPunctuationAfterQuotes,
  swapQuotesAndTerminalPunctuation,
  identifyDoublePrimes,
  identifyDoubleQuotePairs,
  identifyUnpairedLeftDoubleQuote,
  identifyUnpairedRightDoubleQuote,
  removeUnidentifiedDoubleQuote,
  replaceDoublePrimeWDoubleQuote,
  placeLocaleDoubleQuotes,
  removeExtraSpacesAroundQuotes,
  addSpaceBeforeLeftDoubleQuote,
  addSpaceAfterRightDoubleQuote,
  fixDoubleQuotesAndPrimes,
} from "../../src/modules/punctuation/double-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { base } from "../../src/const.js";
import { createTestSuite } from "../test-utils.js";

const doubleQuotesFalsePositivesNew = {
  "č., s., fol., str.,":                 "č., s., fol., str.,",
  "Byl to ${ldq}Karel IV.${rdq}, ktery": "Byl to ${ldq}Karel IV.${rdq}, ktery",
  "Hey.${rdq}":                          "Hey.${rdq}",
  "common to have ${ldq}namespace pollution${rdq}, where completely unrelated code shares global variables.":
    "common to have ${ldq}namespace pollution${rdq}, where completely unrelated code shares global variables.",
};

const removePunctuationBeforeQuotesSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  "${ldq}Hey!,${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?,${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.,${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:,${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;,${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,,${rdq} she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!:${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?:${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.:${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey::${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;:${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,:${rdq} she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!;${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?;${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.;${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:;${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;;${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,;${rdq} she said": "${ldq}Hey,${rdq} she said",

  //false positive
  "${ldq}Hey!!${rdq} she said": "${ldq}Hey!!${rdq} she said",
  "${ldq}Hey?!${rdq} she said": "${ldq}Hey?!${rdq} she said",
  "${ldq}Hey.!${rdq} she said": "${ldq}Hey.!${rdq} she said",
  "${ldq}Hey:!${rdq} she said": "${ldq}Hey:!${rdq} she said",
  "${ldq}Hey;!${rdq} she said": "${ldq}Hey;!${rdq} she said",
  "${ldq}Hey,!${rdq} she said": "${ldq}Hey,!${rdq} she said",

  "${ldq}Hey!?${rdq} she said": "${ldq}Hey!?${rdq} she said",
  "${ldq}Hey??${rdq} she said": "${ldq}Hey??${rdq} she said",
  "${ldq}Hey.?${rdq} she said": "${ldq}Hey.?${rdq} she said",
  "${ldq}Hey:?${rdq} she said": "${ldq}Hey:?${rdq} she said",
  "${ldq}Hey;?${rdq} she said": "${ldq}Hey;?${rdq} she said",
  "${ldq}Hey,?${rdq} she said": "${ldq}Hey,?${rdq} she said",

  "${ldq}Hey!.${rdq} she said": "${ldq}Hey!.${rdq} she said",
  "${ldq}Hey?.${rdq} she said": "${ldq}Hey?.${rdq} she said",
  "${ldq}Hey:.${rdq} she said": "${ldq}Hey:.${rdq} she said",
  "${ldq}Hey;.${rdq} she said": "${ldq}Hey;.${rdq} she said",
  "${ldq}Hey,.${rdq} she said": "${ldq}Hey,.${rdq} she said",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove an extra punctuation before double quotes",
    transformDoubleQuoteSet(removePunctuationBeforeQuotesSet, localeName),
    removeExtraPunctuationBeforeQuotes,
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const removePunctuationAfterQuotesSet = {
  "${ldq}Hey!${rdq}, she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}, she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}, she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}, she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}, she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}, she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!${rdq}: she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}: she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}: she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}: she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}: she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}: she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!${rdq}; she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}; she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}; she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}; she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}; she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}; she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!${rdq}. she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}. she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}. she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}. she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}. she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}. she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!${rdq}? she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}? she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}? she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}? she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}? she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}? she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!${rdq}! she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}! she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}! she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:${rdq}! she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;${rdq}! she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,${rdq}! she said": "${ldq}Hey,${rdq} she said",

  // false positive
  "Byl to ${ldq}Karel IV.${rdq}, ktery": "Byl to ${ldq}Karel IV.${rdq}, ktery",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove an punctuation after double quotes",
    transformDoubleQuoteSet(removePunctuationAfterQuotesSet, localeName),
    removeExtraPunctuationAfterQuotes,
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const identifyDoublePrimesUnitSet = {
  '12′ 45 "':  "12′ 45 ″",
  "12′ 45 “":  "12′ 45 ″",
  "12′ 45 ”":  "12′ 45 ″",
  "12′ 45 ″":  "12′ 45 ″",
  "12′ 45 ‘‘": "12′ 45 ″",
  "12′ 45 ’’": "12′ 45 ″",
  "12′ 45 ''": "12′ 45 ″",
  "12′ 45 ′′": "12′ 45 ″",
  "12 ''":     "12 ″",

  // false positive to exclude long numbers (temporary)
  '“Conference 2020" and “something in quotes”.': '“Conference 2020" and “something in quotes”.',

  // identify swapped inches with terminal punctuation
  '"He was 12".': '"He was 12."',

  // false positive
  'He was 12".':     "He was 12″.",
  '"He was 12."':    '"He was 12."',
  'It’s 12" x 12".': "It’s 12″ x 12″.",
  'It’s 12" × 12".': "It’s 12″ × 12″.",
};

const identifyDoublePrimesModuleSet = {
  '12′ 45"':  "12′ 45″",
  "12′ 45“":  "12′ 45″",
  "12′ 45”":  "12′ 45″",
  "12′ 45″":  "12′ 45″",
  "12′ 45‘‘": "12′ 45″",
  "12′ 45’’": "12′ 45″",
  "12′ 45''": "12′ 45″",
  "12′ 45′′": "12′ 45″",
  "12′ 45′’": "12′ 45″",
  "12''":     "12″",
  "12′′":     "12″",

  '3° 5′ 30"': "3° 5′ 30″",
  '12"3′00°':  "12″3′00°",

  'So it${apos}s 12" × 12", right?':    "So it${apos}s 12″ × 12″, right?",
  'She said: “It${apos}s a 12" inch!”': "She said: ${ldq}It${apos}s a 12″ inch!${rdq}",
  'It${apos}s 12" × 12".':              "It${apos}s 12″ × 12″.",

  // identify swapped inches with terminal punctuation
  '"He was 12".': "${ldq}He was 12.${rdq}",
  'He was 12".':  "He was 12″.", // failing on singleQuotes
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify inches, arcseconds, seconds following a 1–3 numbers",
    transformDoubleQuoteSet(identifyDoublePrimesUnitSet, localeName),
    (text) => placeLocaleDoubleQuotes(identifyDoublePrimes(text), new Locale(localeName)),
    transformDoubleQuoteSet(identifyDoublePrimesModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const identifyDoubleQuotePairsUnitSet = {
  '" quoted material "': "${ldq} quoted material ${rdq}",
  '"quoted material "':  "${ldq}quoted material ${rdq}",
  '" quoted material"':  "${ldq} quoted material${rdq}",
};

const identifyDoubleQuotePairsModuleSet = {
  '"quoted material"':     "${ldq}quoted material${rdq}",
  '„quoted material"':     "${ldq}quoted material${rdq}",
  "«quoted material«":     "${ldq}quoted material${rdq}",
  "’’quoted material''":   "${ldq}quoted material${rdq}",
  "‹‹quoted material››":   "${ldq}quoted material${rdq}",
  ",,quoted material,,":   "${ldq}quoted material${rdq}",
  "‘‘quoted material‘‘":   "${ldq}quoted material${rdq}",
  "‘‘‘quoted material‘‘‘": "${ldq}quoted material${rdq}",
  "´´quoted material´´":   "${ldq}quoted material${rdq}",
  "``quoted material``":   "${ldq}quoted material${rdq}",
  "“quoted material”":     "${ldq}quoted material${rdq}",
  "„quoted material“":     "${ldq}quoted material${rdq}",
  "«quoted material»":     "${ldq}quoted material${rdq}",

  'unquoted "quoted material" material':     "unquoted ${ldq}quoted material${rdq} material",
  '"quoted material" and "quoted material"': "${ldq}quoted material${rdq} and ${ldq}quoted material${rdq}",

  // primes × double quotes
  '"Conference 2020" and "something in quotes".': "${ldq}Conference 2020${rdq} and ${ldq}something in quotes${rdq}.",
  '"Gone in 60{{typopo__double-prime}}"':         "${ldq}Gone in 60″${rdq}",

  '"2020"': "${ldq}2020${rdq}",
  '"202"':  "${ldq}202${rdq}",

  // false positive
  '"starting quotes, primes 90{{typopo__double-prime}}, ending quotes"':
    "${ldq}starting quotes, primes 90″, ending quotes${rdq}",

  //jibberish inside quotes
  ",,idjsa; frilj f0d, if9,,": "${ldq}idjsa; frilj f0d, if9${rdq}",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify double quote pairs",
    transformDoubleQuoteSet(
      { ...identifyDoubleQuotePairsUnitSet, ...identifyDoubleQuotePairsModuleSet },
      localeName
    ),
    (text) => placeLocaleDoubleQuotes(identifyDoubleQuotePairs(text), new Locale(localeName)),
    transformDoubleQuoteSet(identifyDoubleQuotePairsModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedLeftDoubleQuoteSet = {
  '"unpaired left quote.':    "${ldq}unpaired left quote.",
  "«unpaired left quote.":    "${ldq}unpaired left quote.",
  "„unpaired left quote.":    "${ldq}unpaired left quote.",
  ",,unpaired left quote.":   "${ldq}unpaired left quote.",
  "‹‹unpaired left quote.":   "${ldq}unpaired left quote.",
  "‘‘unpaired left quote.":   "${ldq}unpaired left quote.",
  '"Unpaired left quote.':    "${ldq}Unpaired left quote.",
  "“Unpaired left quote.":    "${ldq}Unpaired left quote.",
  "«Unpaired left quote.":    "${ldq}Unpaired left quote.",
  "„Unpaired left quote.":    "${ldq}Unpaired left quote.",
  ",,Unpaired left quote.":   "${ldq}Unpaired left quote.",
  "‹‹Unpaired left quote.":   "${ldq}Unpaired left quote.",
  "‘‘Unpaired left quote.":   "${ldq}Unpaired left quote.",
  "‘‘1 unpaired left quote.": "${ldq}1 unpaired left quote.",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired left double quote",
    transformDoubleQuoteSet(identifyUnpairedLeftDoubleQuoteSet, localeName),
    (text) =>
      placeLocaleDoubleQuotes(identifyUnpairedLeftDoubleQuote(text), new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedRightDoubleQuoteSet = {
  'unpaired" right quote.':  "unpaired${rdq} right quote.",
  "unpaired« right quote.":  "unpaired${rdq} right quote.",
  "unpaired„ right quote.":  "unpaired${rdq} right quote.",
  "unpaired” right quote.":  "unpaired${rdq} right quote.",
  "unpaired“ right quote.":  "unpaired${rdq} right quote.",
  "unpaired,, right quote.": "unpaired${rdq} right quote.",
  "unpaired›› right quote.": "unpaired${rdq} right quote.",
  "unpaired‘‘ right quote.": "unpaired${rdq} right quote.",
  'UNPAIRED" right quote.':  "UNPAIRED${rdq} right quote.",
  'unpaired right quote."':  "unpaired right quote.${rdq}",
  'unpaired right quote…"':  "unpaired right quote…${rdq}",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired right double quote",
    transformDoubleQuoteSet(identifyUnpairedRightDoubleQuoteSet, localeName),
    (text) =>
      placeLocaleDoubleQuotes(identifyUnpairedRightDoubleQuote(text), new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const removeUnidentifiedDoubleQuoteSet = {
  "word „ word":  "word word",
  "word “ word":  "word word",
  "word ” word":  "word word",
  'word " word':  "word word",
  "word « word":  "word word",
  "word » word":  "word word",
  "word ″ word":  "word word",
  "word ‘‘ word": "word word",
  "word ‚‚ word": "word word",
  "word ’’ word": "word word",
  "word '' word": "word word",
  "word ‹‹ word": "word word",
  "word ›› word": "word word",
  "word ′′ word": "word word",
  "word ´´ word": "word word",
  "word `` word": "word word",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove unidentified double quotes",
    transformDoubleQuoteSet(removeUnidentifiedDoubleQuoteSet, localeName),
    removeUnidentifiedDoubleQuote,
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const replaceDoublePrimeWDoubleQuoteUnitSet = {
  "{{typopo__ldq--unpaired}}word{{typopo__double-prime}}": "{{typopo__ldq}}word{{typopo__rdq}}",

  "{{typopo__double-prime}}word{{typopo__rdq--unpaired}}": "{{typopo__ldq}}word{{typopo__rdq}}",
};

const replaceDoublePrimeWDoubleQuoteModuleSet = {
  'It’s called "Localhost 3000" and it’s pretty fast.':
    "It’s called ${ldq}Localhost 3000${rdq} and it’s pretty fast.",
  'Here are 30 "bucks"': "Here are 30 ${ldq}bucks${rdq}",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Replace a double quote & a double prime with a double quote pair",
    transformDoubleQuoteSet(replaceDoublePrimeWDoubleQuoteUnitSet, localeName),
    (text) => replaceDoublePrimeWDoubleQuote(text, new Locale(localeName)),
    transformDoubleQuoteSet(replaceDoublePrimeWDoubleQuoteModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const swapQuotesAndTerminalPunctuationSet = {
  // quoted part at the
  // end of a sentence
  // end of a paragraph
  "Sometimes it can be only a ${ldq}quoted part.${rdq}":             "Sometimes it can be only a ${ldq}quoted part${rdq}.",
  "Sometimes it can be only a ${ldq}quoted${rdq} ${ldq}part.${rdq}": "Sometimes it can be only a ${ldq}quoted${rdq} ${ldq}part${rdq}.",

  "Is it ${ldq}Amores Perros${rdq}?": "Is it ${ldq}Amores Perros${rdq}?",
  "Look for ${ldq}Anguanga${rdq}.":   "Look for ${ldq}Anguanga${rdq}.",

  "${ldq}A whole sentence.${rdq} Only a ${ldq}quoted part.${rdq}":
    "${ldq}A whole sentence.${rdq} Only a ${ldq}quoted part${rdq}.",

  // quoted part at the
  // end of a sentence
  // middle of a paragraph
  "a ${ldq}quoted part.${rdq} A ${ldq}quoted part.${rdq}":         "a ${ldq}quoted part${rdq}. A ${ldq}quoted part${rdq}.",
  "Only a ${ldq}quoted part.${rdq} ${ldq}A whole sentence.${rdq}": "Only a ${ldq}quoted part${rdq}. ${ldq}A whole sentence.${rdq}",

  // quoted part in the middle of a sentence
  // toto tu je asi zbytocny test
  "Only a ${ldq}quoted part${rdq} in a sentence. ${ldq}A whole sentence.${rdq}":
    "Only a ${ldq}quoted part${rdq} in a sentence. ${ldq}A whole sentence.${rdq}",

  // place punctuation within a quoted sentence that’s in the middle of the sentence.
  "Ask ${ldq}What’s going on in here${rdq}? so you can dig deeper.":
    "Ask ${ldq}What’s going on in here?${rdq} so you can dig deeper.",
  "Ask ${ldq}Question${rdq}? and ${ldq}Question${rdq}? and done.":
    "Ask ${ldq}Question?${rdq} and ${ldq}Question?${rdq} and done.",
  "Ask ${ldq}Question${rdq}? and done.\nAsk ${ldq}Question${rdq}? and done.":
    "Ask ${ldq}Question?${rdq} and done.\nAsk ${ldq}Question?${rdq} and done.",
  "Before you ask the ${ldq}How often…${rdq} question": "Before you ask the ${ldq}How often…${rdq} question",
  "Before you ask the ${ldq}How often${rdq}… question": "Before you ask the ${ldq}How often…${rdq} question",

  "${ldq}…example${rdq}":     "${ldq}…example${rdq}",
  "abc ${ldq}…example${rdq}": "abc ${ldq}…example${rdq}",

  // Bracket before the ellipsis, false positive
  "Ask ${ldq}what if (the thing)…${rdq}": "Ask ${ldq}what if (the thing)…${rdq}",

  // place punctuation within a quoted sentence
  "He was ok. ${ldq}He was ok${rdq}.":            "He was ok. ${ldq}He was ok.${rdq}",
  "He was ok. ${ldq}He was ok${rdq}. He was ok.": "He was ok. ${ldq}He was ok.${rdq} He was ok.",
  "He was ok? ${ldq}He was ok${rdq}.":            "He was ok? ${ldq}He was ok.${rdq}",

  // swap a right quote and terminal punctuation for the whole sentence
  "${ldq}He was ok${rdq}.":                                               "${ldq}He was ok.${rdq}",
  "${ldq}He was ok${rdq}.\n${ldq}He was ok${rdq}.":                       "${ldq}He was ok.${rdq}\n${ldq}He was ok.${rdq}",
  "${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}.":                        "${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq}",
  "${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}.": "${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq}",
  "${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}. ${ldq}He was ok${rdq}.":
    "${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq} ${ldq}He was ok.${rdq}",
  "${ldq}He was ok${rdq}?":            "${ldq}He was ok?${rdq}",
  "${ldq}He was ok${rdq}. He was ok.": "${ldq}He was ok.${rdq} He was ok.",

  // ellipsis
  "${ldq}Types of${rdq}…":                        "${ldq}Types of…${rdq}",
  "${ldq}Types of${rdq}…\n${ldq}Types of${rdq}…": "${ldq}Types of…${rdq}\n${ldq}Types of…${rdq}",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Swap quotes and terminal punctuation for a quoted part",
    transformDoubleQuoteSet(swapQuotesAndTerminalPunctuationSet, localeName),
    (text) => swapQuotesAndTerminalPunctuation(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const removeExtraSpacesAroundQuotesSet = {
  "${ldq} extra space at the beginning${rdq}": "${ldq}extra space at the beginning${rdq}",
  "${ldq}extra space at the end ${rdq}":       "${ldq}extra space at the end${rdq}",
  "${ldq}Sentence and… ${rdq}":                "${ldq}Sentence and…${rdq}",

  "12′ 45 ″":       "12′ 45″",
  "3° 5′ 30 ″":     "3° 5′ 30″",
  "3° 5′ 30 ″ and": "3° 5′ 30″ and",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove extra spaces around quotes and primes",
    transformDoubleQuoteSet(removeExtraSpacesAroundQuotesSet, localeName),
    (text) => removeExtraSpacesAroundQuotes(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const addSpaceBeforeLeftDoubleQuoteSet = {
  "It’s a very ${ldq}nice${rdq} saying.":               "It’s a very ${ldq}nice${rdq} saying.",
  "It’s a${ldq}nice${rdq} saying.":                     "It’s a ${ldq}nice${rdq} saying.", //add nbsp;
  "An unquoted sentence.${ldq}And a quoted one.${rdq}": "An unquoted sentence. ${ldq}And a quoted one.${rdq}",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Add a missing space before a left double quote",
    transformDoubleQuoteSet(addSpaceBeforeLeftDoubleQuoteSet, localeName),
    (text) => addSpaceBeforeLeftDoubleQuote(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

let addSpaceAfterRightDoubleQuoteSet = {
  "It’s a ${ldq}nice${rdq}saying.":                     "It’s a ${ldq}nice${rdq} saying.",
  "${ldq}A quoted sentence.${rdq}And an unquoted one.": "${ldq}A quoted sentence.${rdq} And an unquoted one.",
  "${ldq}A quoted sentence!${rdq}And an unquoted one.": "${ldq}A quoted sentence!${rdq} And an unquoted one.",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Add a missing space after a right double quote",
    transformDoubleQuoteSet(addSpaceAfterRightDoubleQuoteSet, localeName),
    (text) => addSpaceAfterRightDoubleQuote(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

export const keepMarkdownCodeBlocksSet = {
  "```\ncode\n```":    "```\ncode\n```",
  "``code``":          "``code``",
  "``code code``":     "``code code``",
  "``code`` ``code``": "``code`` ``code``",
  "`code`":            "`code`",
  "`code code`":       "`code code`",
  "`code` `code`":     "`code` `code`",
};

createTestSuite(
  "Test if markdown ticks are kept (double quotes) ",
  {},
  undefined,
  keepMarkdownCodeBlocksSet,
  (text, locale) =>
    fixDoubleQuotesAndPrimes(text, locale, {
      keepMarkdownCodeBlocks: true,
    }),
  supportedLocales
);

export const doubleQuotesSet = {
  ...removePunctuationBeforeQuotesSet,
  ...removePunctuationAfterQuotesSet,
  ...identifyDoublePrimesModuleSet,
  ...identifyDoubleQuotePairsModuleSet,
  ...identifyUnpairedLeftDoubleQuoteSet,
  ...identifyUnpairedRightDoubleQuoteSet,
  ...removeUnidentifiedDoubleQuoteSet,
  ...replaceDoublePrimeWDoubleQuoteModuleSet,
  ...swapQuotesAndTerminalPunctuationSet,
  ...removeExtraSpacesAroundQuotesSet,
  ...addSpaceBeforeLeftDoubleQuoteSet,
  ...addSpaceAfterRightDoubleQuoteSet,
};

export function transformDoubleQuoteSet(testSet, localeName) {
  const locale = new Locale(localeName);
  const replaceTokens = (str) =>
    str
      .replace(/\$\{ldq\}/g, locale.leftDoubleQuote)
      .replace(/\$\{rdq\}/g, locale.rightDoubleQuote)
      .replace(/\$\{lsq\}/g, locale.leftSingleQuote)
      .replace(/\$\{rsq\}/g, locale.rightSingleQuote)
      .replace(/\$\{apos\}/g, base.apostrophe);

  const transformed = {};
  testSet = { ...testSet, ...doubleQuotesFalsePositivesNew };

  Object.keys(testSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(testSet[key]);
  });

  return transformed;
}
