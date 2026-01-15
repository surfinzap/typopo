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
import { createTestSuite, transformTestSet, t } from "../test-utils.js";
import { m } from "../../src/markers.js";

const doubleQuotesFalsePositives = {
  "č., s., fol., str.,":                       "č., s., fol., str.,",
  [`Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`]: `Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`,
  [`Hey.${t.rdq}`]:                            `Hey.${t.rdq}`,
};

const removePunctuationBeforeQuotesUnitSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  [`${t.ldq}Hey!,${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?,${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.,${t.rdq} she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:,${t.rdq} she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;,${t.rdq} she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,,${t.rdq} she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!:${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?:${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.:${t.rdq} she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey::${t.rdq} she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;:${t.rdq} she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,:${t.rdq} she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!;${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?;${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.;${t.rdq} she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:;${t.rdq} she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;;${t.rdq} she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,;${t.rdq} she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  // false positive
  [`${t.ldq}Hey!!${t.rdq} she said`]: `${t.ldq}Hey!!${t.rdq} she said`,
  [`${t.ldq}Hey?!${t.rdq} she said`]: `${t.ldq}Hey?!${t.rdq} she said`,
  [`${t.ldq}Hey.!${t.rdq} she said`]: `${t.ldq}Hey.!${t.rdq} she said`,
  [`${t.ldq}Hey:!${t.rdq} she said`]: `${t.ldq}Hey:!${t.rdq} she said`,
  [`${t.ldq}Hey;!${t.rdq} she said`]: `${t.ldq}Hey;!${t.rdq} she said`,
  [`${t.ldq}Hey,!${t.rdq} she said`]: `${t.ldq}Hey,!${t.rdq} she said`,

  [`${t.ldq}Hey!?${t.rdq} she said`]: `${t.ldq}Hey!?${t.rdq} she said`,
  [`${t.ldq}Hey??${t.rdq} she said`]: `${t.ldq}Hey??${t.rdq} she said`,
  [`${t.ldq}Hey.?${t.rdq} she said`]: `${t.ldq}Hey.?${t.rdq} she said`,
  [`${t.ldq}Hey:?${t.rdq} she said`]: `${t.ldq}Hey:?${t.rdq} she said`,
  [`${t.ldq}Hey;?${t.rdq} she said`]: `${t.ldq}Hey;?${t.rdq} she said`,
  [`${t.ldq}Hey,?${t.rdq} she said`]: `${t.ldq}Hey,?${t.rdq} she said`,

  [`${t.ldq}Hey!.${t.rdq} she said`]: `${t.ldq}Hey!.${t.rdq} she said`,
  [`${t.ldq}Hey?.${t.rdq} she said`]: `${t.ldq}Hey?.${t.rdq} she said`,
  [`${t.ldq}Hey:.${t.rdq} she said`]: `${t.ldq}Hey:.${t.rdq} she said`,
  [`${t.ldq}Hey;.${t.rdq} she said`]: `${t.ldq}Hey;.${t.rdq} she said`,
  [`${t.ldq}Hey,.${t.rdq} she said`]: `${t.ldq}Hey,.${t.rdq} she said`,
};

const removePunctuationBeforeQuotesModuleSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  /* Module set considers the effect of fixQuotedWordPunctuation function */
  [`${t.ldq}Hey!,${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?,${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.,${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:,${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;,${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,,${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!:${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?:${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.:${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey::${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;:${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,:${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!;${t.rdq} she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?;${t.rdq} she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.;${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:;${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;;${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,;${t.rdq} she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  // false positive
  [`${t.ldq}Hey!!${t.rdq} she said`]: `${t.ldq}Hey!!${t.rdq} she said`,
  [`${t.ldq}Hey?!${t.rdq} she said`]: `${t.ldq}Hey?!${t.rdq} she said`,
  [`${t.ldq}Hey.!${t.rdq} she said`]: `${t.ldq}Hey.!${t.rdq} she said`,
  [`${t.ldq}Hey:!${t.rdq} she said`]: `${t.ldq}Hey:!${t.rdq} she said`,
  [`${t.ldq}Hey;!${t.rdq} she said`]: `${t.ldq}Hey;!${t.rdq} she said`,
  [`${t.ldq}Hey,!${t.rdq} she said`]: `${t.ldq}Hey,!${t.rdq} she said`,

  [`${t.ldq}Hey!?${t.rdq} she said`]: `${t.ldq}Hey!?${t.rdq} she said`,
  [`${t.ldq}Hey??${t.rdq} she said`]: `${t.ldq}Hey??${t.rdq} she said`,
  [`${t.ldq}Hey.?${t.rdq} she said`]: `${t.ldq}Hey.?${t.rdq} she said`,
  [`${t.ldq}Hey:?${t.rdq} she said`]: `${t.ldq}Hey:?${t.rdq} she said`,
  [`${t.ldq}Hey;?${t.rdq} she said`]: `${t.ldq}Hey;?${t.rdq} she said`,
  [`${t.ldq}Hey,?${t.rdq} she said`]: `${t.ldq}Hey,?${t.rdq} she said`,

  [`${t.ldq}Hey!.${t.rdq} she said`]: `${t.ldq}Hey!.${t.rdq} she said`,
  [`${t.ldq}Hey?.${t.rdq} she said`]: `${t.ldq}Hey?.${t.rdq} she said`,
  [`${t.ldq}Hey:.${t.rdq} she said`]: `${t.ldq}Hey:.${t.rdq} she said`,
  [`${t.ldq}Hey;.${t.rdq} she said`]: `${t.ldq}Hey;.${t.rdq} she said`,
  [`${t.ldq}Hey,.${t.rdq} she said`]: `${t.ldq}Hey,.${t.rdq} she said`,
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
  [`${t.ldq}Hey!${t.rdq}, she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}, she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}, she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}, she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}, she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}, she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!${t.rdq}: she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}: she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}: she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}: she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}: she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}: she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!${t.rdq}; she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}; she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}; she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}; she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}; she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}; she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!${t.rdq}. she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}. she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}. she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}. she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}. she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}. she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!${t.rdq}? she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}? she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}? she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}? she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}? she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}? she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  [`${t.ldq}Hey!${t.rdq}! she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}! she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}! she said`]: `${t.ldq}Hey.${t.rdq} she said`,
  [`${t.ldq}Hey:${t.rdq}! she said`]: `${t.ldq}Hey:${t.rdq} she said`,
  [`${t.ldq}Hey;${t.rdq}! she said`]: `${t.ldq}Hey;${t.rdq} she said`,
  [`${t.ldq}Hey,${t.rdq}! she said`]: `${t.ldq}Hey,${t.rdq} she said`,

  // false positive
  [`Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`]: `Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`,
};

const removePunctuationAfterQuotesModuleSet = {
  /* Module set considers the effect of fixQuotedWordPunctuation function */
  [`${t.ldq}Hey!${t.rdq}, she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}, she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}, she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}, she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}, she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}, she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!${t.rdq}: she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}: she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}: she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}: she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}: she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}: she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!${t.rdq}; she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}; she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}; she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}; she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}; she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}; she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!${t.rdq}. she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}. she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}. she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}. she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}. she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}. she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!${t.rdq}? she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}? she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}? she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}? she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}? she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}? she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  [`${t.ldq}Hey!${t.rdq}! she said`]: `${t.ldq}Hey!${t.rdq} she said`,
  [`${t.ldq}Hey?${t.rdq}! she said`]: `${t.ldq}Hey?${t.rdq} she said`,
  [`${t.ldq}Hey.${t.rdq}! she said`]: `${t.ldq}Hey${t.rdq}. she said`,
  [`${t.ldq}Hey:${t.rdq}! she said`]: `${t.ldq}Hey${t.rdq}: she said`,
  [`${t.ldq}Hey;${t.rdq}! she said`]: `${t.ldq}Hey${t.rdq}; she said`,
  [`${t.ldq}Hey,${t.rdq}! she said`]: `${t.ldq}Hey${t.rdq}, she said`,

  // false positive
  [`Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`]: `Byl to ${t.ldq}Karel IV.${t.rdq}, ktery`,
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
  '“Conference 2020" and “something in quotes.”': '“Conference 2020" and “something in quotes.”',

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

  [`So it${t.apos}s 12" × 12", right?`]:                         `So it${t.apos}s 12″ × 12″, right?`,
  [`She said${t.directSpeechIntro} “It${t.apos}s a 12" inch!”`]: `She said${t.directSpeechIntro} ${t.ldq}It${t.apos}s a 12″ inch!${t.rdq}`,
  [`It${t.apos}s 12" × 12".`]:                                   `It${t.apos}s 12″ × 12″.`,

  // identify swapped inches with terminal punctuation
  '"He was 12".': `${t.ldq}He was 12.${t.rdq}`,
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
  '" quoted material "': `${t.ldq} quoted material ${t.rdq}`,
  '"quoted material "':  `${t.ldq}quoted material ${t.rdq}`,
  '" quoted material"':  `${t.ldq} quoted material${t.rdq}`,
};

const identifyDoubleQuotePairsModuleSet = {
  '"quoted material"':     `${t.ldq}quoted material${t.rdq}`,
  '„quoted material"':     `${t.ldq}quoted material${t.rdq}`,
  "«quoted material«":     `${t.ldq}quoted material${t.rdq}`,
  "’’quoted material''":   `${t.ldq}quoted material${t.rdq}`,
  "‹‹quoted material››":   `${t.ldq}quoted material${t.rdq}`,
  ",,quoted material,,":   `${t.ldq}quoted material${t.rdq}`,
  "‘‘quoted material‘‘":   `${t.ldq}quoted material${t.rdq}`,
  "‘‘‘quoted material‘‘‘": `${t.ldq}quoted material${t.rdq}`,
  "´´quoted material´´":   `${t.ldq}quoted material${t.rdq}`,
  "``quoted material``":   `${t.ldq}quoted material${t.rdq}`,
  "“quoted material”":     `${t.ldq}quoted material${t.rdq}`,
  "„quoted material“":     `${t.ldq}quoted material${t.rdq}`,
  "«quoted material»":     `${t.ldq}quoted material${t.rdq}`,

  'unquoted "quoted material" material':     `unquoted ${t.ldq}quoted material${t.rdq} material`,
  '"quoted material" and "quoted material"': `${t.ldq}quoted material${t.rdq} and ${t.ldq}quoted material${t.rdq}`,

  // primes × double quotes
  '"Conference 2020" and "something in quotes."': `${t.ldq}Conference 2020${t.rdq} and ${t.ldq}something in quotes.${t.rdq}`,
  [`"Gone in 60${m.doublePrime}"`]:               `${t.ldq}Gone in 60″${t.rdq}`,

  '"2020"': `${t.ldq}2020${t.rdq}`,
  '"202"':  `${t.ldq}202${t.rdq}`,

  // false positive
  [`"starting quotes, primes 90${m.doublePrime}, ending quotes"`]: `${t.ldq}starting quotes, primes 90″, ending quotes${t.rdq}`,

  //jibberish inside quotes
  ",,idjsa; frilj f0d, if9,,": `${t.ldq}idjsa; frilj f0d, if9${t.rdq}`,
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
  '"unpaired left quote.':    `${t.ldq}unpaired left quote.`,
  "«unpaired left quote.":    `${t.ldq}unpaired left quote.`,
  "„unpaired left quote.":    `${t.ldq}unpaired left quote.`,
  ",,unpaired left quote.":   `${t.ldq}unpaired left quote.`,
  "‹‹unpaired left quote.":   `${t.ldq}unpaired left quote.`,
  "‘‘unpaired left quote.":   `${t.ldq}unpaired left quote.`,
  '"Unpaired left quote.':    `${t.ldq}Unpaired left quote.`,
  "“Unpaired left quote.":    `${t.ldq}Unpaired left quote.`,
  "«Unpaired left quote.":    `${t.ldq}Unpaired left quote.`,
  "„Unpaired left quote.":    `${t.ldq}Unpaired left quote.`,
  ",,Unpaired left quote.":   `${t.ldq}Unpaired left quote.`,
  "‹‹Unpaired left quote.":   `${t.ldq}Unpaired left quote.`,
  "‘‘Unpaired left quote.":   `${t.ldq}Unpaired left quote.`,
  "‘‘1 unpaired left quote.": `${t.ldq}1 unpaired left quote.`,
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
  'unpaired" right quote.':  `unpaired${t.rdq} right quote.`,
  "unpaired« right quote.":  `unpaired${t.rdq} right quote.`,
  "unpaired„ right quote.":  `unpaired${t.rdq} right quote.`,
  "unpaired” right quote.":  `unpaired${t.rdq} right quote.`,
  "unpaired“ right quote.":  `unpaired${t.rdq} right quote.`,
  "unpaired,, right quote.": `unpaired${t.rdq} right quote.`,
  "unpaired›› right quote.": `unpaired${t.rdq} right quote.`,
  "unpaired‘‘ right quote.": `unpaired${t.rdq} right quote.`,
  'UNPAIRED" right quote.':  `UNPAIRED${t.rdq} right quote.`,
  'unpaired right quote."':  `unpaired right quote.${t.rdq}`,
  'unpaired right quote…"':  `unpaired right quote…${t.rdq}`,
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
  [`${m.ldqUnpaired}word${m.doublePrime}`]: `${m.ldq}word${m.rdq}`,

  [`${m.doublePrime}word${m.rdqUnpaired}`]: `${m.ldq}word${m.rdq}`,
};

const replaceDoublePrimeWDoubleQuoteModuleSet = {
  'It’s called "Localhost 3000" and it’s pretty fast.': `It’s called ${t.ldq}Localhost 3000${t.rdq} and it’s pretty fast.`,
  'Here are 30 "bucks"':                                `Here are 30 ${t.ldq}bucks${t.rdq}`,
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
  [`${t.ldq}word.${t.rdq}`]:                       `${t.ldq}word${t.rdq}.`,
  [`Look for ${t.ldq}word.${t.rdq} In the text.`]: `Look for ${t.ldq}word${t.rdq}. In the text.`,
  [`Look for ${t.ldq}Ian.${t.rdq} In the text.`]:  `Look for ${t.ldq}Ian${t.rdq}. In the text.`,

  // Single word with comma
  [`${t.ldq}word,${t.rdq}`]:                     `${t.ldq}word${t.rdq},`,
  [`He said ${t.ldq}hello,${t.rdq} then left.`]: `He said ${t.ldq}hello${t.rdq}, then left.`,

  // Single word with semicolon
  [`${t.ldq}word;${t.rdq}`]:                    `${t.ldq}word${t.rdq};`,
  [`He used ${t.ldq}code;${t.rdq} it worked.`]: `He used ${t.ldq}code${t.rdq}; it worked.`,

  // Single word with colon
  [`${t.ldq}word:${t.rdq}`]:                           `${t.ldq}word${t.rdq}:`,
  [`Consider ${t.ldq}refactoring:${t.rdq} it helps.`]: `Consider ${t.ldq}refactoring${t.rdq}: it helps.`,

  // Contracted words
  [`Say ${t.ldq}don${t.apos}t;${t.rdq} be firm.`]: `Say ${t.ldq}don${t.apos}t${t.rdq}; be firm.`,

  // Numbers
  [`Version ${t.ldq}2.0.${t.rdq} is out.`]:     `Version ${t.ldq}2.0${t.rdq}. is out.`,
  [`In ${t.ldq}2020,${t.rdq} things changed.`]: `In ${t.ldq}2020${t.rdq}, things changed.`,
  [`Number ${t.ldq}42;${t.rdq} the answer.`]:   `Number ${t.ldq}42${t.rdq}; the answer.`,

  // Combinations with numbers and contractions (e.g., 69'ers)
  [`The ${t.ldq}69${t.apos}ers.${t.rdq} were famous.`]: `The ${t.ldq}69${t.apos}ers${t.rdq}. were famous.`,
  [`Those ${t.ldq}90${t.apos}s,${t.rdq} good times.`]:  `Those ${t.ldq}90${t.apos}s${t.rdq}, good times.`,

  // Hyphenated words
  [`Use ${t.ldq}well-known.${t.rdq} for clarity.`]:        `Use ${t.ldq}well-known${t.rdq}. for clarity.`,
  [`The ${t.ldq}state-of-the-art,${t.rdq} approach.`]:     `The ${t.ldq}state-of-the-art${t.rdq}, approach.`,
  [`Try ${t.ldq}open-source;${t.rdq} it${t.apos}s free.`]: `Try ${t.ldq}open-source${t.rdq}; it${t.apos}s free.`,
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  [`She said ${t.ldq}hello world.${t.rdq} and left.`]:  `She said ${t.ldq}hello world.${t.rdq} and left.`,
  [`I heard ${t.ldq}good morning,${t.rdq} from her.`]:  `I heard ${t.ldq}good morning,${t.rdq} from her.`,
  [`The ${t.ldq}quick brown fox;${t.rdq} jumps.`]:      `The ${t.ldq}quick brown fox;${t.rdq} jumps.`,
  [`The ${t.ldq}quick brown fox${t.rdq}; jumps.`]:      `The ${t.ldq}quick brown fox${t.rdq}; jumps.`,
  [`Note ${t.ldq}some important thing:${t.rdq} here.`]: `Note ${t.ldq}some important thing:${t.rdq} here.`,

  // False positives - exclamation and question marks (should NOT be fixed)
  [`The ${t.ldq}Wow!${t.rdq} was loud.`]:         `The ${t.ldq}Wow!${t.rdq} was loud.`,
  [`The ${t.ldq}Wow${t.rdq}! was loud.`]:         `The ${t.ldq}Wow${t.rdq}! was loud.`,
  [`She asked ${t.ldq}Why?${t.rdq} repeatedly.`]: `She asked ${t.ldq}Why?${t.rdq} repeatedly.`,
  [`She asked ${t.ldq}Why${t.rdq}? repeatedly.`]: `She asked ${t.ldq}Why${t.rdq}? repeatedly.`,

  // False positives - regnal numbers
  [`Byl to Karel ${t.ldq}IV.${t.rdq}, ktery`]: `Byl to Karel ${t.ldq}IV.${t.rdq}, ktery`,

  // False positives - already correct
  [`The ${t.ldq}word${t.rdq}. is correct.`]:     `The ${t.ldq}word${t.rdq}. is correct.`,
  [`He said ${t.ldq}hello${t.rdq}, then left.`]: `He said ${t.ldq}hello${t.rdq}, then left.`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for single-word quoted content",
    transformDoubleQuoteSet(
      { ...fixQuotedWordPunctuationUnitSet, ...fixQuotedWordPunctuationModuleSet },
      localeName
    ),
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
  [`It can be a ${t.ldq}quoted fragment${t.rdq}.`]: `It can be a ${t.ldq}quoted fragment.${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment${t.rdq},`]: `It can be a ${t.ldq}quoted fragment,${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment${t.rdq}!`]: `It can be a ${t.ldq}quoted fragment!${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment${t.rdq}?`]: `It can be a ${t.ldq}quoted fragment?${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment${t.rdq}…`]: `It can be a ${t.ldq}quoted fragment…${t.rdq}`,

  // nbsp
  [`It can be ${t.ldq}a banana${t.rdq}.`]: `It can be ${t.ldq}a banana.${t.rdq}`,

  // Quoted sentence
  [`${t.ldq}Fully quoted sentence${t.rdq}.`]: `${t.ldq}Fully quoted sentence.${t.rdq}`,
  [`${t.ldq}Fully quoted sentence${t.rdq},`]: `${t.ldq}Fully quoted sentence,${t.rdq}`,
  [`${t.ldq}Fully quoted sentence${t.rdq}!`]: `${t.ldq}Fully quoted sentence!${t.rdq}`,
  [`${t.ldq}Fully quoted sentence${t.rdq}?`]: `${t.ldq}Fully quoted sentence?${t.rdq}`,
  [`${t.ldq}Fully quoted sentence${t.rdq}…`]: `${t.ldq}Fully quoted sentence…${t.rdq}`,

  // Less common boundaries
  [`${t.ldq}(Fully) quoted sentence${t.rdq}.`]: `${t.ldq}(Fully) quoted sentence.${t.rdq}`,
  [`${t.ldq}Fully quoted (sentence)${t.rdq}.`]: `${t.ldq}Fully quoted (sentence).${t.rdq}`,

  // false positive, consecutive double quotes
  [`${t.ldq}word${t.rdq} ${t.ldq}word${t.rdq},`]: `${t.ldq}word${t.rdq} ${t.ldq}word${t.rdq},`,

  // Colon / semicolon should be placed outside the quotes
  [`${t.ldq}quoted fragment:${t.rdq} sentence continues`]:   `${t.ldq}quoted fragment${t.rdq}: sentence continues`,
  [`${t.ldq}quoted fragment;${t.rdq} sentence continues`]:   `${t.ldq}quoted fragment${t.rdq}; sentence continues`,
  [`${t.ldq}(quoted) fragment:${t.rdq} sentence continues`]: `${t.ldq}(quoted) fragment${t.rdq}: sentence continues`,
  [`${t.ldq}quoted (fragment);${t.rdq} sentence continues`]: `${t.ldq}quoted (fragment)${t.rdq}; sentence continues`,

  // Single quotes + double quotes
  [`${t.ldq}Sentence ${t.lsq}quoted fragment${t.rsq}${t.rdq}.`]: `${t.ldq}Sentence ${t.lsq}quoted fragment${t.rsq}.${t.rdq}`,

  // Correct placement
  [`It can be a ${t.ldq}quoted fragment.${t.rdq}`]: `It can be a ${t.ldq}quoted fragment.${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment,${t.rdq}`]: `It can be a ${t.ldq}quoted fragment,${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment!${t.rdq}`]: `It can be a ${t.ldq}quoted fragment!${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment?${t.rdq}`]: `It can be a ${t.ldq}quoted fragment?${t.rdq}`,
  [`It can be a ${t.ldq}quoted fragment…${t.rdq}`]: `It can be a ${t.ldq}quoted fragment…${t.rdq}`,
};

const fixQuotedSentencePunctuationUnitSet = {
  // Exception. skip fixing name with regnal number
  [`It was ${t.ldq}Charles IV${t.rdq},`]: `It was ${t.ldq}Charles IV${t.rdq},`,

  // False positives - single word (should NOT be fixed in this function)
  [`Look for ${t.ldq}word.${t.rdq} In the text.`]: `Look for ${t.ldq}word.${t.rdq} In the text.`,
  [`${t.ldq}word.${t.rdq}`]:                       `${t.ldq}word.${t.rdq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for quoted sentence",
    transformDoubleQuoteSet(
      { ...fixQuotedSentencePunctuationUnitSet, ...fixQuotedSentencePunctuationModuleSet },
      localeName
    ),
    (text) => fixQuotedSentencePunctuation(text, new Locale(localeName)),
    transformDoubleQuoteSet(fixQuotedSentencePunctuationModuleSet, localeName),
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const removeExtraSpacesAroundQuotesSet = {
  [`${t.ldq} extra space at the beginning${t.rdq}`]: `${t.ldq}extra space at the beginning${t.rdq}`,
  [`${t.ldq}extra space at the end ${t.rdq}`]:       `${t.ldq}extra space at the end${t.rdq}`,
  [`${t.ldq}Sentence and… ${t.rdq}`]:                `${t.ldq}Sentence and…${t.rdq}`,

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
  [`It’s a very ${t.ldq}nice${t.rdq} saying.`]:               `It’s a very ${t.ldq}nice${t.rdq} saying.`,
  [`It’s a${t.ldq}nice${t.rdq} saying.`]:                     `It’s a ${t.ldq}nice${t.rdq} saying.`, //add nbsp;
  [`An unquoted sentence.${t.ldq}And a quoted one.${t.rdq}`]: `An unquoted sentence. ${t.ldq}And a quoted one.${t.rdq}`,
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
  [`It’s a ${t.ldq}nice${t.rdq}saying.`]:                     `It’s a ${t.ldq}nice${t.rdq} saying.`,
  [`${t.ldq}A quoted sentence.${t.rdq}And an unquoted one.`]: `${t.ldq}A quoted sentence.${t.rdq} And an unquoted one.`,
  [`${t.ldq}A quoted sentence!${t.rdq}And an unquoted one.`]: `${t.ldq}A quoted sentence!${t.rdq} And an unquoted one.`,
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
  [`She said - ${t.ldq}Hello${t.rdq} - and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said - ${t.ldq}Hello${t.rdq} and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said -${t.ldq}Hello${t.rdq} - and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said-${t.ldq}Hello${t.rdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // En dash with spaces
  [`She said – ${t.ldq}Hello${t.rdq} – and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said – ${t.ldq}Hello${t.rdq} and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said –${t.ldq}Hello${t.rdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said–${t.ldq}Hello${t.rdq} – and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Em dash with spaces
  [`She said — ${t.ldq}Hello${t.rdq} — and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said — ${t.ldq}Hello${t.rdq} and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said —${t.ldq}Hello${t.rdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said—${t.ldq}Hello${t.rdq} — and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Problem Type 2: Combination of proper and wrong direct speech introduction

  // Colon/comma + hyphen
  [`She said: - ${t.ldq}Hello${t.rdq} - and left.`]:                      `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said: -${t.ldq}Hello${t.rdq} - and left.`]:                       `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:- ${t.ldq}Hello${t.rdq} - and left.`]:                       `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:-${t.ldq}Hello${t.rdq} - and left.`]:                        `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said${t.directSpeechIntro} - ${t.ldq}Hello${t.rdq} - and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Colon/comma + en dash
  [`She said: – ${t.ldq}Hello${t.rdq} – and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said: –${t.ldq}Hello${t.rdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:– ${t.ldq}Hello${t.rdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:–${t.ldq}Hello${t.rdq} – and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Colon/comma + em dash
  [`She said: — ${t.ldq}Hello${t.rdq} — and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said: —${t.ldq}Hello${t.rdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:— ${t.ldq}Hello${t.rdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:—${t.ldq}Hello${t.rdq} — and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Problem Type 3: Extra spaces between introduction and quote

  [`She said:${t.ldq}Hello${t.rdq} and left.`]:      `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said,${t.ldq}Hello${t.rdq} and left.`]:      `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:  ${t.ldq}Hello${t.rdq} and left.`]:    `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:   ${t.ldq}Hello${t.rdq} and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:    ${t.ldq}Hello${t.rdq} and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said:     ${t.ldq}Hello${t.rdq} and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said,     ${t.ldq}Hello${t.rdq} and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Combination: wrong intro + extra spaces
  [`She said: -  ${t.ldq}Hello${t.rdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said: –   ${t.ldq}Hello${t.rdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said: —    ${t.ldq}Hello${t.rdq} — and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Multiple spaces around dashes
  [`She said  -  ${t.ldq}Hello${t.rdq}  -  and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said  –  ${t.ldq}Hello${t.rdq}  –  and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
  [`She said  —  ${t.ldq}Hello${t.rdq}  —  and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,

  // Edge cases: No ending sentence (quote at end)
  [`She said - ${t.ldq}Hello${t.rdq}`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq}`,
  [`She said – ${t.ldq}Hello${t.rdq}`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq}`,
  [`She said — ${t.ldq}Hello${t.rdq}`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq}`,

  // // Varied content between quotes: punctuation, numbers, special chars, etc.
  [`She said - ${t.ldq}Hello, world!${t.rdq} - and left.`]:         `She said${t.directSpeechIntro} ${t.ldq}Hello, world!${t.rdq} and left.`,
  [`She said - ${t.ldq}Hello! How are you?${t.rdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.ldq}Hello! How are you?${t.rdq} and left.`,
  // [`She said – ${t.ldq}It${t.apos}s 12″ × 12″.${t.rdq} – and left.`]: `She said${t.directSpeechIntro} ${t.ldq}It${t.apos}s 12″ × 12″.${t.rdq} and left.`,
  [`She said — ${t.ldq}Numbers: 123, 456.78…${t.rdq} — and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Numbers: 123, 456.78…${t.rdq} and left.`,

  [`She said — ${t.ldq}URL: http://example.com/path${t.rdq} — and left.`]:                                                                              `She said${t.directSpeechIntro} ${t.ldq}URL: http://example.com/path${t.rdq} and left.`,
  [`She said - ${t.ldq}Email: test@example.com${t.rdq} - and left.`]:                                                                                   `She said${t.directSpeechIntro} ${t.ldq}Email: test@example.com${t.rdq} and left.`,
  [`She said – ${t.ldq}Quote with: colon, semicolon; comma, dot.${t.rdq} – and left.`]:                                                                 `She said${t.directSpeechIntro} ${t.ldq}Quote with: colon, semicolon; comma, dot.${t.rdq} and left.`,
  [`She said — ${t.ldq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${t.rdq} — and left.`]: `She said${t.directSpeechIntro} ${t.ldq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${t.rdq} and left.`,

  // Edge cases: Paragraph starts with a quote introduced with a dash
  [`- ${t.ldq}Hello${t.rdq} - she said.`]:   `${t.ldq}Hello${t.rdq} she said.`,
  [`-${t.ldq}Hello${t.rdq} - she said.`]:    `${t.ldq}Hello${t.rdq} she said.`,
  [` - ${t.ldq}Hello${t.rdq} - she said.`]:  `${t.ldq}Hello${t.rdq} she said.`,
  [`-   ${t.ldq}Hello${t.rdq} - she said.`]: `${t.ldq}Hello${t.rdq} she said.`,
  [`– ${t.ldq}Hello${t.rdq} – she said.`]:   `${t.ldq}Hello${t.rdq} she said.`,
  [`— ${t.ldq}Hello${t.rdq} — she said.`]:   `${t.ldq}Hello${t.rdq} she said.`,

  // Edge cases: The following quoted sentence is introduced with a dash
  [`ends. - ${t.ldq}Hello${t.rdq} - she said.`]:   `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends. -${t.ldq}Hello${t.rdq} - she said.`]:    `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends.  - ${t.ldq}Hello${t.rdq} - she said.`]:  `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends. -   ${t.ldq}Hello${t.rdq} - she said.`]: `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends. – ${t.ldq}Hello${t.rdq} – she said.`]:   `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends. — ${t.ldq}Hello${t.rdq} — she said.`]:   `ends. ${t.ldq}Hello${t.rdq} she said.`,
  [`ends? - ${t.ldq}Hello${t.rdq} - she said.`]:   `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends? -${t.ldq}Hello${t.rdq} - she said.`]:    `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends?  - ${t.ldq}Hello${t.rdq} - she said.`]:  `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends? -   ${t.ldq}Hello${t.rdq} - she said.`]: `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends? – ${t.ldq}Hello${t.rdq} – she said.`]:   `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends? — ${t.ldq}Hello${t.rdq} — she said.`]:   `ends? ${t.ldq}Hello${t.rdq} she said.`,
  [`ends! - ${t.ldq}Hello${t.rdq} - she said.`]:   `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends! -${t.ldq}Hello${t.rdq} - she said.`]:    `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends!  - ${t.ldq}Hello${t.rdq} - she said.`]:  `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends! -   ${t.ldq}Hello${t.rdq} - she said.`]: `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends! – ${t.ldq}Hello${t.rdq} – she said.`]:   `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends! — ${t.ldq}Hello${t.rdq} — she said.`]:   `ends! ${t.ldq}Hello${t.rdq} she said.`,
  [`ends… - ${t.ldq}Hello${t.rdq} - she said.`]:   `ends… ${t.ldq}Hello${t.rdq} she said.`,
  [`ends… -${t.ldq}Hello${t.rdq} - she said.`]:    `ends… ${t.ldq}Hello${t.rdq} she said.`,
  [`ends…  - ${t.ldq}Hello${t.rdq} - she said.`]:  `ends… ${t.ldq}Hello${t.rdq} she said.`,
  [`ends… -   ${t.ldq}Hello${t.rdq} - she said.`]: `ends… ${t.ldq}Hello${t.rdq} she said.`,
  [`ends… – ${t.ldq}Hello${t.rdq} – she said.`]:   `ends… ${t.ldq}Hello${t.rdq} she said.`,
  [`ends… — ${t.ldq}Hello${t.rdq} — she said.`]:   `ends… ${t.ldq}Hello${t.rdq} she said.`,

  // False positives: Already correct (should not change)
  [`She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`]: `She said${t.directSpeechIntro} ${t.ldq}Hello${t.rdq} and left.`,
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
  ...fixQuotedSentencePunctuationModuleSet,
};

export function transformDoubleQuoteSet(testSet, localeName) {
  return transformTestSet(testSet, localeName, {
    additionalSets: [doubleQuotesFalsePositives],
  });
}
