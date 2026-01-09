import {
  removeExtraPunctuationBeforeQuotes,
  removeExtraPunctuationAfterQuotes,
  fixQuotedWordPunctuation,
  fixQuotedSentencePunctuation,
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
  fixDirectSpeechIntro,
} from "../../src/modules/punctuation/double-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { createTestSuite, transformTestSet } from "../test-utils.js";

const doubleQuotesFalsePositives = {
  "č., s., fol., str.,":                 "č., s., fol., str.,",
  "Byl to ${ldq}Karel IV.${rdq}, ktery": "Byl to ${ldq}Karel IV.${rdq}, ktery",
  "Hey.${rdq}":                          "Hey.${rdq}",
  "common to have ${ldq}namespace pollution${rdq}, where completely unrelated code shares global variables.":
    "common to have ${ldq}namespace pollution${rdq}, where completely unrelated code shares global variables.",
};

const removePunctuationBeforeQuotesUnitSet = {
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

  // false positive
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

const removePunctuationBeforeQuotesModuleSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  /* Module set considers the effect of fixQuotedWordPunctuation function */ 
  "${ldq}Hey!,${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?,${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.,${rdq} she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:,${rdq} she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;,${rdq} she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,,${rdq} she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!:${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?:${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.:${rdq} she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey::${rdq} she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;:${rdq} she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,:${rdq} she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!;${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?;${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.;${rdq} she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:;${rdq} she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;;${rdq} she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,;${rdq} she said": "${ldq}Hey${rdq}, she said",

  // false positive
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
    transformDoubleQuoteSet(removePunctuationBeforeQuotesUnitSet, localeName),
    removeExtraPunctuationBeforeQuotes,
    transformDoubleQuoteSet(removePunctuationBeforeQuotesModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const removePunctuationAfterQuotesUnitSet = {
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

const removePunctuationAfterQuotesModuleSet = {
  /* Module set considers the effect of fixQuotedWordPunctuation function */ 
  "${ldq}Hey!${rdq}, she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}, she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}, she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}, she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}, she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}, she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!${rdq}: she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}: she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}: she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}: she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}: she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}: she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!${rdq}; she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}; she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}; she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}; she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}; she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}; she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!${rdq}. she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}. she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}. she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}. she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}. she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}. she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!${rdq}? she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}? she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}? she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}? she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}? she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}? she said": "${ldq}Hey${rdq}, she said",

  "${ldq}Hey!${rdq}! she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?${rdq}! she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.${rdq}! she said": "${ldq}Hey${rdq}. she said",
  "${ldq}Hey:${rdq}! she said": "${ldq}Hey${rdq}: she said",
  "${ldq}Hey;${rdq}! she said": "${ldq}Hey${rdq}; she said",
  "${ldq}Hey,${rdq}! she said": "${ldq}Hey${rdq}, she said",

  // false positive
  "Byl to ${ldq}Karel IV.${rdq}, ktery": "Byl to ${ldq}Karel IV.${rdq}, ktery",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove an punctuation after double quotes",
    transformDoubleQuoteSet(removePunctuationAfterQuotesUnitSet, localeName),
    removeExtraPunctuationAfterQuotes,
    transformDoubleQuoteSet(removePunctuationAfterQuotesModuleSet, localeName),
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

  'So it${apos}s 12" × 12", right?':                       "So it${apos}s 12″ × 12″, right?",
  'She said${directSpeechIntro} “It${apos}s a 12" inch!”': "She said${directSpeechIntro} ${ldq}It${apos}s a 12″ inch!${rdq}",
  'It${apos}s 12" × 12".':                                 "It${apos}s 12″ × 12″.",

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

const fixQuotedWordPunctuationModuleSet = {
  /*
  Related source: https://cmosshoptalk.com/2020/10/20/commas-and-periods-with-quotation-marks/

  Fix the punctuation around a quoted word accordingly:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word (e.g., “word.” → “word”.)
  - keep the position of `!`, `?`, and `…` as is (ambiguous context; we would need contextual information for proper placement: “Wow!” vs. Have you heard about the “bird”?)
  */

  // Single word with period
  "${ldq}word.${rdq}": "${ldq}word${rdq}.",
  "Look for ${ldq}word.${rdq} In the text.": "Look for ${ldq}word${rdq}. In the text.",
  "Look for ${ldq}Ian.${rdq} In the text.": "Look for ${ldq}Ian${rdq}. In the text.",
  
  // Single word with comma
  "${ldq}word,${rdq}": "${ldq}word${rdq},",
  "He said ${ldq}hello,${rdq} then left.": "He said ${ldq}hello${rdq}, then left.",
  
  // Single word with semicolon
  "${ldq}word;${rdq}": "${ldq}word${rdq};",
  "He used ${ldq}code;${rdq} it worked.": "He used ${ldq}code${rdq}; it worked.",
  
  // Single word with colon
  "${ldq}word:${rdq}": "${ldq}word${rdq}:",
  "Consider ${ldq}refactoring:${rdq} it helps.": "Consider ${ldq}refactoring${rdq}: it helps.",

  // Contracted words
  "Say ${ldq}don${apos}t;${rdq} be firm.": "Say ${ldq}don${apos}t${rdq}; be firm.",

  // Numbers
  "Version ${ldq}2.0.${rdq} is out.": "Version ${ldq}2.0${rdq}. is out.",
  "In ${ldq}2020,${rdq} things changed.": "In ${ldq}2020${rdq}, things changed.",
  "Number ${ldq}42;${rdq} the answer.": "Number ${ldq}42${rdq}; the answer.",

  // Combinations with numbers and contractions (e.g., 69'ers)
  "The ${ldq}69${apos}ers.${rdq} were famous.": "The ${ldq}69${apos}ers${rdq}. were famous.",
  "Those ${ldq}90${apos}s,${rdq} good times.": "Those ${ldq}90${apos}s${rdq}, good times.",

  // Hyphenated words
  "Use ${ldq}well-known.${rdq} for clarity.": "Use ${ldq}well-known${rdq}. for clarity.",
  "The ${ldq}state-of-the-art,${rdq} approach.": "The ${ldq}state-of-the-art${rdq}, approach.",
  "Try ${ldq}open-source;${rdq} it${apos}s free.": "Try ${ldq}open-source${rdq}; it${apos}s free.",

  // Escaped strings
  "${ldq}{{esc}},${rdq}": "${ldq}{{esc}}${rdq},",
}

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  "She said ${ldq}hello world.${rdq} and left.": "She said ${ldq}hello world.${rdq} and left.",
  "I heard ${ldq}good morning,${rdq} from her.": "I heard ${ldq}good morning,${rdq} from her.",
  "The ${ldq}quick brown fox;${rdq} jumps.": "The ${ldq}quick brown fox;${rdq} jumps.",
  "The ${ldq}quick brown fox${rdq}; jumps.": "The ${ldq}quick brown fox${rdq}; jumps.",
  "Note ${ldq}some important thing:${rdq} here.": "Note ${ldq}some important thing:${rdq} here.",

  // False positives - exclamation and question marks (should NOT be fixed)
  "The ${ldq}Wow!${rdq} was loud.": "The ${ldq}Wow!${rdq} was loud.",
  "The ${ldq}Wow${rdq}! was loud.": "The ${ldq}Wow${rdq}! was loud.",
  "She asked ${ldq}Why?${rdq} repeatedly.": "She asked ${ldq}Why?${rdq} repeatedly.",
  "She asked ${ldq}Why${rdq}? repeatedly.": "She asked ${ldq}Why${rdq}? repeatedly.",

  // False positives - regnal numbers
  "Byl to Karel ${ldq}IV.${rdq}, ktery": "Byl to Karel ${ldq}IV.${rdq}, ktery",
  
  // False positives - already correct
  "The ${ldq}word${rdq}. is correct.": "The ${ldq}word${rdq}. is correct.",
  "He said ${ldq}hello${rdq}, then left.": "He said ${ldq}hello${rdq}, then left.",
}

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for single-word quoted content",
    transformDoubleQuoteSet({...fixQuotedWordPunctuationUnitSet, ...fixQuotedWordPunctuationModuleSet}, localeName),
    (text) => fixQuotedWordPunctuation(text, new Locale(localeName)),
    transformDoubleQuoteSet(fixQuotedWordPunctuationModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});


const fixQuotedSentencePunctuationModuleSet = {
  /*
  Related source: https://cmosshoptalk.com/2020/10/20/commas-and-periods-with-quotation-marks/

  Fix the punctuation around a quoted word accordingly:
  - move periods `.`, commas `,`, semicolons `;`, ellipses `…`exclamation `!` and question marks `?` inside the quoted part
  - move colons `:` and semicolons `;` outside the quoted part
  */
  
  // Quoted fragment at the end of sentence
  "It can be a ${ldq}quoted fragment${rdq}.": "It can be a ${ldq}quoted fragment.${rdq}",
  "It can be a ${ldq}quoted fragment${rdq},": "It can be a ${ldq}quoted fragment,${rdq}",
  "It can be a ${ldq}quoted fragment${rdq}!": "It can be a ${ldq}quoted fragment!${rdq}",
  "It can be a ${ldq}quoted fragment${rdq}?": "It can be a ${ldq}quoted fragment?${rdq}",
  "It can be a ${ldq}quoted fragment${rdq}…": "It can be a ${ldq}quoted fragment…${rdq}",
  
  // Quoted sentence 
  "${ldq}Fully quoted sentence${rdq}.": "${ldq}Fully quoted sentence.${rdq}",
  "${ldq}Fully quoted sentence${rdq},": "${ldq}Fully quoted sentence,${rdq}",
  "${ldq}Fully quoted sentence${rdq}!": "${ldq}Fully quoted sentence!${rdq}",
  "${ldq}Fully quoted sentence${rdq}?": "${ldq}Fully quoted sentence?${rdq}",
  "${ldq}Fully quoted sentence${rdq}…": "${ldq}Fully quoted sentence…${rdq}",

  // Less common boundaries 
  "${ldq}(Fully) quoted sentence${rdq}.": "${ldq}(Fully) quoted sentence.${rdq}",
  "${ldq}Fully quoted (sentence)${rdq}.": "${ldq}Fully quoted (sentence).${rdq}",

  // Escaped strings
  "It can be a ${ldq}{{esc}} {{esc}}{rdq}.": "It can be a ${ldq}{{esc}} {{esc}}.${rdq}",

  // Colon / semicolon should be placed outside the quotes
  "${ldq}quoted fragment:${rdq} sentence continues" : "${ldq}quoted fragment${rdq}: sentence continues",
  "${ldq}quoted fragment;${rdq} sentence continues" : "${ldq}quoted fragment${rdq}; sentence continues",
  "${ldq}(quoted) fragment:${rdq} sentence continues" : "${ldq}(quoted) fragment${rdq}: sentence continues",
  "${ldq}quoted (fragment);${rdq} sentence continues" : "${ldq}quoted (fragment)${rdq}; sentence continues",

}

const fixQuotedSentencePunctuationUnitSet = {
  // False positives - single word (should NOT be fixed in this function)
  "Look for ${ldq}word.${rdq} In the text.": "Look for ${ldq}word.${rdq} In the text.",
  "${ldq}word.${rdq}": "${ldq}word.${rdq}",
}

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for quoted sentence",
    transformDoubleQuoteSet({...fixQuotedSentencePunctuationUnitSet, ...fixQuotedSentencePunctuationModuleSet}, localeName),
    (text) => fixQuotedSentencePunctuation(text, new Locale(localeName)),
    transformDoubleQuoteSet(fixQuotedSentencePunctuationModuleSet, localeName),
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

const addSpaceAfterRightDoubleQuoteSet = {
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

const fixDirectSpeechIntroSet = {
  // Problem Type 1: Using hyphen, en dash, or em dash instead of proper introduction

  // Hyphen with spaces
  "She said - ${ldq}Hello${rdq} - and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said - ${ldq}Hello${rdq} and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said -${ldq}Hello${rdq} - and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said-${ldq}Hello${rdq} - and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // En dash with spaces
  "She said – ${ldq}Hello${rdq} – and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said – ${ldq}Hello${rdq} and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said –${ldq}Hello${rdq} – and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said–${ldq}Hello${rdq} – and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Em dash with spaces
  "She said — ${ldq}Hello${rdq} — and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said — ${ldq}Hello${rdq} and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said —${ldq}Hello${rdq} — and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said—${ldq}Hello${rdq} — and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Problem Type 2: Combination of proper and wrong direct speech introduction

  // Colon/comma + hyphen
  "She said: - ${ldq}Hello${rdq} - and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said: -${ldq}Hello${rdq} - and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:- ${ldq}Hello${rdq} - and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:-${ldq}Hello${rdq} - and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said${directSpeechIntro} - ${ldq}Hello${rdq} - and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Colon/comma + en dash
  "She said: – ${ldq}Hello${rdq} – and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said: –${ldq}Hello${rdq} – and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:– ${ldq}Hello${rdq} – and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:–${ldq}Hello${rdq} – and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Colon/comma + em dash
  "She said: — ${ldq}Hello${rdq} — and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said: —${ldq}Hello${rdq} — and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:— ${ldq}Hello${rdq} — and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:—${ldq}Hello${rdq} — and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Problem Type 3: Extra spaces between introduction and quote

  "She said:${ldq}Hello${rdq} and left.":      "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said,${ldq}Hello${rdq} and left.":      "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:  ${ldq}Hello${rdq} and left.":    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:   ${ldq}Hello${rdq} and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:    ${ldq}Hello${rdq} and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said:     ${ldq}Hello${rdq} and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said,     ${ldq}Hello${rdq} and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Combination: wrong intro + extra spaces
  "She said: -  ${ldq}Hello${rdq} - and left.":   "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said: –   ${ldq}Hello${rdq} – and left.":  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said: —    ${ldq}Hello${rdq} — and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Multiple spaces around dashes
  "She said  -  ${ldq}Hello${rdq}  -  and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said  –  ${ldq}Hello${rdq}  –  and left.": "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
  "She said  —  ${ldq}Hello${rdq}  —  and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",

  // Edge cases: No ending sentence (quote at end)
  "She said - ${ldq}Hello${rdq}": "She said${directSpeechIntro} ${ldq}Hello${rdq}",
  "She said – ${ldq}Hello${rdq}": "She said${directSpeechIntro} ${ldq}Hello${rdq}",
  "She said — ${ldq}Hello${rdq}": "She said${directSpeechIntro} ${ldq}Hello${rdq}",

  // // Varied content between quotes: punctuation, numbers, special chars, etc.
  "She said - ${ldq}Hello, world!${rdq} - and left.":         "She said${directSpeechIntro} ${ldq}Hello, world!${rdq} and left.",
  "She said - ${ldq}Hello! How are you?${rdq} - and left.":   "She said${directSpeechIntro} ${ldq}Hello! How are you?${rdq} and left.",
  // "She said – ${ldq}It${apos}s 12″ × 12″.${rdq} – and left.":   "She said${directSpeechIntro} ${ldq}It${apos}s 12″ × 12″.${rdq} and left.",
  "She said — ${ldq}Numbers: 123, 456.78…${rdq} — and left.": "She said${directSpeechIntro} ${ldq}Numbers: 123, 456.78…${rdq} and left.",

  "She said — ${ldq}URL: http://example.com/path${rdq} — and left.":              "She said${directSpeechIntro} ${ldq}URL: http://example.com/path${rdq} and left.",
  "She said - ${ldq}Email: test@example.com${rdq} - and left.":                   "She said${directSpeechIntro} ${ldq}Email: test@example.com${rdq} and left.",
  "She said – ${ldq}Quote with: colon, semicolon; comma, dot.${rdq} – and left.": "She said${directSpeechIntro} ${ldq}Quote with: colon, semicolon; comma, dot.${rdq} and left.",
  "She said — ${ldq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${rdq} — and left.":
    "She said${directSpeechIntro} ${ldq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${rdq} and left.",

  // Edge cases: Paragraph starts with a quote introduced with a dash
  "- ${ldq}Hello${rdq} - she said.":   "${ldq}Hello${rdq} she said.",
  "-${ldq}Hello${rdq} - she said.":    "${ldq}Hello${rdq} she said.",
  " - ${ldq}Hello${rdq} - she said.":  "${ldq}Hello${rdq} she said.",
  "-   ${ldq}Hello${rdq} - she said.": "${ldq}Hello${rdq} she said.",
  "– ${ldq}Hello${rdq} – she said.":   "${ldq}Hello${rdq} she said.",
  "— ${ldq}Hello${rdq} — she said.":   "${ldq}Hello${rdq} she said.",

  // Edge cases: The following quoted sentence is introduced with a dash
  "ends. - ${ldq}Hello${rdq} - she said.":   "ends. ${ldq}Hello${rdq} she said.",
  "ends. -${ldq}Hello${rdq} - she said.":    "ends. ${ldq}Hello${rdq} she said.",
  "ends.  - ${ldq}Hello${rdq} - she said.":  "ends. ${ldq}Hello${rdq} she said.",
  "ends. -   ${ldq}Hello${rdq} - she said.": "ends. ${ldq}Hello${rdq} she said.",
  "ends. – ${ldq}Hello${rdq} – she said.":   "ends. ${ldq}Hello${rdq} she said.",
  "ends. — ${ldq}Hello${rdq} — she said.":   "ends. ${ldq}Hello${rdq} she said.",
  "ends? - ${ldq}Hello${rdq} - she said.":   "ends? ${ldq}Hello${rdq} she said.",
  "ends? -${ldq}Hello${rdq} - she said.":    "ends? ${ldq}Hello${rdq} she said.",
  "ends?  - ${ldq}Hello${rdq} - she said.":  "ends? ${ldq}Hello${rdq} she said.",
  "ends? -   ${ldq}Hello${rdq} - she said.": "ends? ${ldq}Hello${rdq} she said.",
  "ends? – ${ldq}Hello${rdq} – she said.":   "ends? ${ldq}Hello${rdq} she said.",
  "ends? — ${ldq}Hello${rdq} — she said.":   "ends? ${ldq}Hello${rdq} she said.",
  "ends! - ${ldq}Hello${rdq} - she said.":   "ends! ${ldq}Hello${rdq} she said.",
  "ends! -${ldq}Hello${rdq} - she said.":    "ends! ${ldq}Hello${rdq} she said.",
  "ends!  - ${ldq}Hello${rdq} - she said.":  "ends! ${ldq}Hello${rdq} she said.",
  "ends! -   ${ldq}Hello${rdq} - she said.": "ends! ${ldq}Hello${rdq} she said.",
  "ends! – ${ldq}Hello${rdq} – she said.":   "ends! ${ldq}Hello${rdq} she said.",
  "ends! — ${ldq}Hello${rdq} — she said.":   "ends! ${ldq}Hello${rdq} she said.",
  "ends… - ${ldq}Hello${rdq} - she said.":   "ends… ${ldq}Hello${rdq} she said.",
  "ends… -${ldq}Hello${rdq} - she said.":    "ends… ${ldq}Hello${rdq} she said.",
  "ends…  - ${ldq}Hello${rdq} - she said.":  "ends… ${ldq}Hello${rdq} she said.",
  "ends… -   ${ldq}Hello${rdq} - she said.": "ends… ${ldq}Hello${rdq} she said.",
  "ends… – ${ldq}Hello${rdq} – she said.":   "ends… ${ldq}Hello${rdq} she said.",
  "ends… — ${ldq}Hello${rdq} — she said.":   "ends… ${ldq}Hello${rdq} she said.",

  // False positives: Already correct (should not change)
  "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.":
    "She said${directSpeechIntro} ${ldq}Hello${rdq} and left.",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix direct speech introduction",
    transformDoubleQuoteSet(fixDirectSpeechIntroSet, localeName),
    (text) => fixDirectSpeechIntro(text, new Locale(localeName)),
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
  ...removePunctuationBeforeQuotesModuleSet,
  ...removePunctuationAfterQuotesModuleSet,
  ...identifyDoublePrimesModuleSet,
  ...identifyDoubleQuotePairsModuleSet,
  ...identifyUnpairedLeftDoubleQuoteSet,
  ...identifyUnpairedRightDoubleQuoteSet,
  ...removeUnidentifiedDoubleQuoteSet,
  ...replaceDoublePrimeWDoubleQuoteModuleSet,
  ...removeExtraSpacesAroundQuotesSet,
  ...addSpaceBeforeLeftDoubleQuoteSet,
  ...addSpaceAfterRightDoubleQuoteSet,
  ...fixDirectSpeechIntroSet,
  ...fixQuotedWordPunctuationModuleSet,
  ...fixQuotedSentencePunctuationModuleSet
};

export function transformDoubleQuoteSet(testSet, localeName) {
  return transformTestSet(testSet, localeName, {
    additionalSets: [doubleQuotesFalsePositives],
  });
}
