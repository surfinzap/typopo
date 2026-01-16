import {
  removeExtraPunctuationBeforeQuotes,
  removeExtraPunctuationAfterQuotes,
  fixQuotedWordPunctuation,
  fixQuotedSentencePunctuation,
  identifyDoublePrimes,
  identifyDoubleQuotePairs,
  identifyUnpairedOpeningDoubleQuote,
  identifyUnpairedClosingDoubleQuote,
  removeUnidentifiedDoubleQuote,
  replaceDoublePrimeWDoubleQuote,
  placeLocaleDoubleQuotes,
  removeExtraSpacesAroundQuotes,
  addSpaceBeforeopeningDoubleQuote,
  addSpaceAfterclosingDoubleQuote,
  fixDoubleQuotesAndPrimes,
  fixDirectSpeechIntro,
} from "../../src/modules/punctuation/double-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { createTestSuite, transformTestSet, t } from "../test-utils.js";
import { m } from "../../src/markers.js";

const doubleQuotesFalsePositives = {
  "č., s., fol., str.,":                       "č., s., fol., str.,",
  [`Byl to ${t.odq}Karel IV.${t.cdq}, ktery`]: `Byl to ${t.odq}Karel IV.${t.cdq}, ktery`,
  [`Hey.${t.cdq}`]:                            `Hey.${t.cdq}`,
};

const removePunctuationBeforeQuotesUnitSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  [`${t.odq}Hey!,${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?,${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.,${t.cdq} she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:,${t.cdq} she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;,${t.cdq} she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,,${t.cdq} she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!:${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?:${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.:${t.cdq} she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey::${t.cdq} she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;:${t.cdq} she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,:${t.cdq} she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!;${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?;${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.;${t.cdq} she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:;${t.cdq} she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;;${t.cdq} she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,;${t.cdq} she said`]: `${t.odq}Hey,${t.cdq} she said`,

  // false positive
  [`${t.odq}Hey!!${t.cdq} she said`]: `${t.odq}Hey!!${t.cdq} she said`,
  [`${t.odq}Hey?!${t.cdq} she said`]: `${t.odq}Hey?!${t.cdq} she said`,
  [`${t.odq}Hey.!${t.cdq} she said`]: `${t.odq}Hey.!${t.cdq} she said`,
  [`${t.odq}Hey:!${t.cdq} she said`]: `${t.odq}Hey:!${t.cdq} she said`,
  [`${t.odq}Hey;!${t.cdq} she said`]: `${t.odq}Hey;!${t.cdq} she said`,
  [`${t.odq}Hey,!${t.cdq} she said`]: `${t.odq}Hey,!${t.cdq} she said`,

  [`${t.odq}Hey!?${t.cdq} she said`]: `${t.odq}Hey!?${t.cdq} she said`,
  [`${t.odq}Hey??${t.cdq} she said`]: `${t.odq}Hey??${t.cdq} she said`,
  [`${t.odq}Hey.?${t.cdq} she said`]: `${t.odq}Hey.?${t.cdq} she said`,
  [`${t.odq}Hey:?${t.cdq} she said`]: `${t.odq}Hey:?${t.cdq} she said`,
  [`${t.odq}Hey;?${t.cdq} she said`]: `${t.odq}Hey;?${t.cdq} she said`,
  [`${t.odq}Hey,?${t.cdq} she said`]: `${t.odq}Hey,?${t.cdq} she said`,

  [`${t.odq}Hey!.${t.cdq} she said`]: `${t.odq}Hey!.${t.cdq} she said`,
  [`${t.odq}Hey?.${t.cdq} she said`]: `${t.odq}Hey?.${t.cdq} she said`,
  [`${t.odq}Hey:.${t.cdq} she said`]: `${t.odq}Hey:.${t.cdq} she said`,
  [`${t.odq}Hey;.${t.cdq} she said`]: `${t.odq}Hey;.${t.cdq} she said`,
  [`${t.odq}Hey,.${t.cdq} she said`]: `${t.odq}Hey,.${t.cdq} she said`,
};

const removePunctuationBeforeQuotesModuleSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  /* Module set considers the effect of fixQuotedWordPunctuation function */
  [`${t.odq}Hey!,${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?,${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.,${t.cdq} she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:,${t.cdq} she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;,${t.cdq} she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,,${t.cdq} she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!:${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?:${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.:${t.cdq} she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey::${t.cdq} she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;:${t.cdq} she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,:${t.cdq} she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!;${t.cdq} she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?;${t.cdq} she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.;${t.cdq} she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:;${t.cdq} she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;;${t.cdq} she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,;${t.cdq} she said`]: `${t.odq}Hey${t.cdq}, she said`,

  // false positive
  [`${t.odq}Hey!!${t.cdq} she said`]: `${t.odq}Hey!!${t.cdq} she said`,
  [`${t.odq}Hey?!${t.cdq} she said`]: `${t.odq}Hey?!${t.cdq} she said`,
  [`${t.odq}Hey.!${t.cdq} she said`]: `${t.odq}Hey.!${t.cdq} she said`,
  [`${t.odq}Hey:!${t.cdq} she said`]: `${t.odq}Hey:!${t.cdq} she said`,
  [`${t.odq}Hey;!${t.cdq} she said`]: `${t.odq}Hey;!${t.cdq} she said`,
  [`${t.odq}Hey,!${t.cdq} she said`]: `${t.odq}Hey,!${t.cdq} she said`,

  [`${t.odq}Hey!?${t.cdq} she said`]: `${t.odq}Hey!?${t.cdq} she said`,
  [`${t.odq}Hey??${t.cdq} she said`]: `${t.odq}Hey??${t.cdq} she said`,
  [`${t.odq}Hey.?${t.cdq} she said`]: `${t.odq}Hey.?${t.cdq} she said`,
  [`${t.odq}Hey:?${t.cdq} she said`]: `${t.odq}Hey:?${t.cdq} she said`,
  [`${t.odq}Hey;?${t.cdq} she said`]: `${t.odq}Hey;?${t.cdq} she said`,
  [`${t.odq}Hey,?${t.cdq} she said`]: `${t.odq}Hey,?${t.cdq} she said`,

  [`${t.odq}Hey!.${t.cdq} she said`]: `${t.odq}Hey!.${t.cdq} she said`,
  [`${t.odq}Hey?.${t.cdq} she said`]: `${t.odq}Hey?.${t.cdq} she said`,
  [`${t.odq}Hey:.${t.cdq} she said`]: `${t.odq}Hey:.${t.cdq} she said`,
  [`${t.odq}Hey;.${t.cdq} she said`]: `${t.odq}Hey;.${t.cdq} she said`,
  [`${t.odq}Hey,.${t.cdq} she said`]: `${t.odq}Hey,.${t.cdq} she said`,
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
  [`${t.odq}Hey!${t.cdq}, she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}, she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}, she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}, she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}, she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}, she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!${t.cdq}: she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}: she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}: she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}: she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}: she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}: she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!${t.cdq}; she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}; she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}; she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}; she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}; she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}; she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!${t.cdq}. she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}. she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}. she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}. she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}. she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}. she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!${t.cdq}? she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}? she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}? she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}? she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}? she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}? she said`]: `${t.odq}Hey,${t.cdq} she said`,

  [`${t.odq}Hey!${t.cdq}! she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}! she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}! she said`]: `${t.odq}Hey.${t.cdq} she said`,
  [`${t.odq}Hey:${t.cdq}! she said`]: `${t.odq}Hey:${t.cdq} she said`,
  [`${t.odq}Hey;${t.cdq}! she said`]: `${t.odq}Hey;${t.cdq} she said`,
  [`${t.odq}Hey,${t.cdq}! she said`]: `${t.odq}Hey,${t.cdq} she said`,

  // false positive
  [`Byl to ${t.odq}Karel IV.${t.cdq}, ktery`]: `Byl to ${t.odq}Karel IV.${t.cdq}, ktery`,
};

const removePunctuationAfterQuotesModuleSet = {
  /* Module set considers the effect of fixQuotedWordPunctuation function */
  [`${t.odq}Hey!${t.cdq}, she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}, she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}, she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}, she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}, she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}, she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!${t.cdq}: she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}: she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}: she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}: she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}: she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}: she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!${t.cdq}; she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}; she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}; she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}; she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}; she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}; she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!${t.cdq}. she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}. she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}. she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}. she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}. she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}. she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!${t.cdq}? she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}? she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}? she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}? she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}? she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}? she said`]: `${t.odq}Hey${t.cdq}, she said`,

  [`${t.odq}Hey!${t.cdq}! she said`]: `${t.odq}Hey!${t.cdq} she said`,
  [`${t.odq}Hey?${t.cdq}! she said`]: `${t.odq}Hey?${t.cdq} she said`,
  [`${t.odq}Hey.${t.cdq}! she said`]: `${t.odq}Hey${t.cdq}. she said`,
  [`${t.odq}Hey:${t.cdq}! she said`]: `${t.odq}Hey${t.cdq}: she said`,
  [`${t.odq}Hey;${t.cdq}! she said`]: `${t.odq}Hey${t.cdq}; she said`,
  [`${t.odq}Hey,${t.cdq}! she said`]: `${t.odq}Hey${t.cdq}, she said`,

  // false positive
  [`Byl to ${t.odq}Karel IV.${t.cdq}, ktery`]: `Byl to ${t.odq}Karel IV.${t.cdq}, ktery`,
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
  [`She said${t.directSpeechIntro} “It${t.apos}s a 12" inch!”`]: `She said${t.directSpeechIntro} ${t.odq}It${t.apos}s a 12″ inch!${t.cdq}`,
  [`It${t.apos}s 12" × 12".`]:                                   `It${t.apos}s 12″ × 12″.`,

  // identify swapped inches with terminal punctuation
  '"He was 12".': `${t.odq}He was 12.${t.cdq}`,
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
  '" quoted material "': `${t.odq} quoted material ${t.cdq}`,
  '"quoted material "':  `${t.odq}quoted material ${t.cdq}`,
  '" quoted material"':  `${t.odq} quoted material${t.cdq}`,
};

const identifyDoubleQuotePairsModuleSet = {
  '"quoted material"':     `${t.odq}quoted material${t.cdq}`,
  '„quoted material"':     `${t.odq}quoted material${t.cdq}`,
  "«quoted material«":     `${t.odq}quoted material${t.cdq}`,
  "’’quoted material''":   `${t.odq}quoted material${t.cdq}`,
  "‹‹quoted material››":   `${t.odq}quoted material${t.cdq}`,
  ",,quoted material,,":   `${t.odq}quoted material${t.cdq}`,
  "‘‘quoted material‘‘":   `${t.odq}quoted material${t.cdq}`,
  "‘‘‘quoted material‘‘‘": `${t.odq}quoted material${t.cdq}`,
  "´´quoted material´´":   `${t.odq}quoted material${t.cdq}`,
  "``quoted material``":   `${t.odq}quoted material${t.cdq}`,
  "“quoted material”":     `${t.odq}quoted material${t.cdq}`,
  "„quoted material“":     `${t.odq}quoted material${t.cdq}`,
  "«quoted material»":     `${t.odq}quoted material${t.cdq}`,

  'unquoted "quoted material" material':     `unquoted ${t.odq}quoted material${t.cdq} material`,
  '"quoted material" and "quoted material"': `${t.odq}quoted material${t.cdq} and ${t.odq}quoted material${t.cdq}`,

  // primes × double quotes
  '"Conference 2020" and "something in quotes."': `${t.odq}Conference 2020${t.cdq} and ${t.odq}something in quotes.${t.cdq}`,
  [`"Gone in 60${m.doublePrime}"`]:               `${t.odq}Gone in 60″${t.cdq}`,

  '"2020"': `${t.odq}2020${t.cdq}`,
  '"202"':  `${t.odq}202${t.cdq}`,

  // false positive
  [`"starting quotes, primes 90${m.doublePrime}, ending quotes"`]: `${t.odq}starting quotes, primes 90″, ending quotes${t.cdq}`,

  //jibberish inside quotes
  ",,idjsa; frilj f0d, if9,,": `${t.odq}idjsa; frilj f0d, if9${t.cdq}`,
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

const identifyUnpairedOpeningDoubleQuoteSet = {
  '"unpaired left quote.':    `${t.odq}unpaired left quote.`,
  "«unpaired left quote.":    `${t.odq}unpaired left quote.`,
  "„unpaired left quote.":    `${t.odq}unpaired left quote.`,
  ",,unpaired left quote.":   `${t.odq}unpaired left quote.`,
  "‹‹unpaired left quote.":   `${t.odq}unpaired left quote.`,
  "‘‘unpaired left quote.":   `${t.odq}unpaired left quote.`,
  '"Unpaired left quote.':    `${t.odq}Unpaired left quote.`,
  "“Unpaired left quote.":    `${t.odq}Unpaired left quote.`,
  "«Unpaired left quote.":    `${t.odq}Unpaired left quote.`,
  "„Unpaired left quote.":    `${t.odq}Unpaired left quote.`,
  ",,Unpaired left quote.":   `${t.odq}Unpaired left quote.`,
  "‹‹Unpaired left quote.":   `${t.odq}Unpaired left quote.`,
  "‘‘Unpaired left quote.":   `${t.odq}Unpaired left quote.`,
  "‘‘1 unpaired left quote.": `${t.odq}1 unpaired left quote.`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired left double quote",
    transformDoubleQuoteSet(identifyUnpairedOpeningDoubleQuoteSet, localeName),
    (text) =>
      placeLocaleDoubleQuotes(identifyUnpairedOpeningDoubleQuote(text), new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedClosingDoubleQuoteSet = {
  'unpaired" right quote.':  `unpaired${t.cdq} right quote.`,
  "unpaired« right quote.":  `unpaired${t.cdq} right quote.`,
  "unpaired„ right quote.":  `unpaired${t.cdq} right quote.`,
  "unpaired” right quote.":  `unpaired${t.cdq} right quote.`,
  "unpaired“ right quote.":  `unpaired${t.cdq} right quote.`,
  "unpaired,, right quote.": `unpaired${t.cdq} right quote.`,
  "unpaired›› right quote.": `unpaired${t.cdq} right quote.`,
  "unpaired‘‘ right quote.": `unpaired${t.cdq} right quote.`,
  'UNPAIRED" right quote.':  `UNPAIRED${t.cdq} right quote.`,
  'unpaired right quote."':  `unpaired right quote.${t.cdq}`,
  'unpaired right quote…"':  `unpaired right quote…${t.cdq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired right double quote",
    transformDoubleQuoteSet(identifyUnpairedClosingDoubleQuoteSet, localeName),
    (text) =>
      placeLocaleDoubleQuotes(identifyUnpairedClosingDoubleQuote(text), new Locale(localeName)),
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
  [`${m.odqUnpaired}word${m.doublePrime}`]: `${m.odq}word${m.cdq}`,

  [`${m.doublePrime}word${m.cdqUnpaired}`]: `${m.odq}word${m.cdq}`,
};

const replaceDoublePrimeWDoubleQuoteModuleSet = {
  'It’s called "Localhost 3000" and it’s pretty fast.': `It’s called ${t.odq}Localhost 3000${t.cdq} and it’s pretty fast.`,
  'Here are 30 "bucks"':                                `Here are 30 ${t.odq}bucks${t.cdq}`,
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
  [`${t.odq}word.${t.cdq}`]:                       `${t.odq}word${t.cdq}.`,
  [`Look for ${t.odq}word.${t.cdq} In the text.`]: `Look for ${t.odq}word${t.cdq}. In the text.`,
  [`Look for ${t.odq}Ian.${t.cdq} In the text.`]:  `Look for ${t.odq}Ian${t.cdq}. In the text.`,

  // Single word with comma
  [`${t.odq}word,${t.cdq}`]:                     `${t.odq}word${t.cdq},`,
  [`He said ${t.odq}hello,${t.cdq} then left.`]: `He said ${t.odq}hello${t.cdq}, then left.`,

  // Single word with semicolon
  [`${t.odq}word;${t.cdq}`]:                    `${t.odq}word${t.cdq};`,
  [`He used ${t.odq}code;${t.cdq} it worked.`]: `He used ${t.odq}code${t.cdq}; it worked.`,

  // Single word with colon
  [`${t.odq}word:${t.cdq}`]:                           `${t.odq}word${t.cdq}:`,
  [`Consider ${t.odq}refactoring:${t.cdq} it helps.`]: `Consider ${t.odq}refactoring${t.cdq}: it helps.`,

  // Contracted words
  [`Say ${t.odq}don${t.apos}t;${t.cdq} be firm.`]: `Say ${t.odq}don${t.apos}t${t.cdq}; be firm.`,

  // Numbers
  [`Version ${t.odq}2.0.${t.cdq} is out.`]:     `Version ${t.odq}2.0${t.cdq}. is out.`,
  [`In ${t.odq}2020,${t.cdq} things changed.`]: `In ${t.odq}2020${t.cdq}, things changed.`,
  [`Number ${t.odq}42;${t.cdq} the answer.`]:   `Number ${t.odq}42${t.cdq}; the answer.`,

  // Combinations with numbers and contractions (e.g., 69'ers)
  [`The ${t.odq}69${t.apos}ers.${t.cdq} were famous.`]: `The ${t.odq}69${t.apos}ers${t.cdq}. were famous.`,
  [`Those ${t.odq}90${t.apos}s,${t.cdq} good times.`]:  `Those ${t.odq}90${t.apos}s${t.cdq}, good times.`,

  // Hyphenated words
  [`Use ${t.odq}well-known.${t.cdq} for clarity.`]:        `Use ${t.odq}well-known${t.cdq}. for clarity.`,
  [`The ${t.odq}state-of-the-art,${t.cdq} approach.`]:     `The ${t.odq}state-of-the-art${t.cdq}, approach.`,
  [`Try ${t.odq}open-source;${t.cdq} it${t.apos}s free.`]: `Try ${t.odq}open-source${t.cdq}; it${t.apos}s free.`,
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  [`She said ${t.odq}hello world.${t.cdq} and left.`]:  `She said ${t.odq}hello world.${t.cdq} and left.`,
  [`I heard ${t.odq}good morning,${t.cdq} from her.`]:  `I heard ${t.odq}good morning,${t.cdq} from her.`,
  [`The ${t.odq}quick brown fox;${t.cdq} jumps.`]:      `The ${t.odq}quick brown fox;${t.cdq} jumps.`,
  [`The ${t.odq}quick brown fox${t.cdq}; jumps.`]:      `The ${t.odq}quick brown fox${t.cdq}; jumps.`,
  [`Note ${t.odq}some important thing:${t.cdq} here.`]: `Note ${t.odq}some important thing:${t.cdq} here.`,

  // False positives - exclamation and question marks (should NOT be fixed)
  [`The ${t.odq}Wow!${t.cdq} was loud.`]:         `The ${t.odq}Wow!${t.cdq} was loud.`,
  [`The ${t.odq}Wow${t.cdq}! was loud.`]:         `The ${t.odq}Wow${t.cdq}! was loud.`,
  [`She asked ${t.odq}Why?${t.cdq} repeatedly.`]: `She asked ${t.odq}Why?${t.cdq} repeatedly.`,
  [`She asked ${t.odq}Why${t.cdq}? repeatedly.`]: `She asked ${t.odq}Why${t.cdq}? repeatedly.`,

  // False positives - regnal numbers
  [`Byl to Karel ${t.odq}IV.${t.cdq}, ktery`]: `Byl to Karel ${t.odq}IV.${t.cdq}, ktery`,

  // False positives - already correct
  [`The ${t.odq}word${t.cdq}. is correct.`]:     `The ${t.odq}word${t.cdq}. is correct.`,
  [`He said ${t.odq}hello${t.cdq}, then left.`]: `He said ${t.odq}hello${t.cdq}, then left.`,
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
  [`It can be a ${t.odq}quoted fragment${t.cdq}.`]: `It can be a ${t.odq}quoted fragment.${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment${t.cdq},`]: `It can be a ${t.odq}quoted fragment,${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment${t.cdq}!`]: `It can be a ${t.odq}quoted fragment!${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment${t.cdq}?`]: `It can be a ${t.odq}quoted fragment?${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment${t.cdq}…`]: `It can be a ${t.odq}quoted fragment…${t.cdq}`,

  // nbsp
  [`It can be ${t.odq}a banana${t.cdq}.`]: `It can be ${t.odq}a banana.${t.cdq}`,

  // Quoted sentence
  [`${t.odq}Fully quoted sentence${t.cdq}.`]: `${t.odq}Fully quoted sentence.${t.cdq}`,
  [`${t.odq}Fully quoted sentence${t.cdq},`]: `${t.odq}Fully quoted sentence,${t.cdq}`,
  [`${t.odq}Fully quoted sentence${t.cdq}!`]: `${t.odq}Fully quoted sentence!${t.cdq}`,
  [`${t.odq}Fully quoted sentence${t.cdq}?`]: `${t.odq}Fully quoted sentence?${t.cdq}`,
  [`${t.odq}Fully quoted sentence${t.cdq}…`]: `${t.odq}Fully quoted sentence…${t.cdq}`,

  // Less common boundaries
  [`${t.odq}(Fully) quoted sentence${t.cdq}.`]: `${t.odq}(Fully) quoted sentence.${t.cdq}`,
  [`${t.odq}Fully quoted (sentence)${t.cdq}.`]: `${t.odq}Fully quoted (sentence).${t.cdq}`,

  // false positive, consecutive double quotes
  [`${t.odq}word${t.cdq} ${t.odq}word${t.cdq},`]: `${t.odq}word${t.cdq} ${t.odq}word${t.cdq},`,

  // Colon / semicolon should be placed outside the quotes
  [`${t.odq}quoted fragment:${t.cdq} sentence continues`]:   `${t.odq}quoted fragment${t.cdq}: sentence continues`,
  [`${t.odq}quoted fragment;${t.cdq} sentence continues`]:   `${t.odq}quoted fragment${t.cdq}; sentence continues`,
  [`${t.odq}(quoted) fragment:${t.cdq} sentence continues`]: `${t.odq}(quoted) fragment${t.cdq}: sentence continues`,
  [`${t.odq}quoted (fragment);${t.cdq} sentence continues`]: `${t.odq}quoted (fragment)${t.cdq}; sentence continues`,

  // Single quotes + double quotes
  [`${t.odq}Sentence ${t.osq}quoted fragment${t.csq}${t.cdq}.`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}.${t.cdq}`,

  // Correct placement
  [`It can be a ${t.odq}quoted fragment.${t.cdq}`]: `It can be a ${t.odq}quoted fragment.${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment,${t.cdq}`]: `It can be a ${t.odq}quoted fragment,${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment!${t.cdq}`]: `It can be a ${t.odq}quoted fragment!${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment?${t.cdq}`]: `It can be a ${t.odq}quoted fragment?${t.cdq}`,
  [`It can be a ${t.odq}quoted fragment…${t.cdq}`]: `It can be a ${t.odq}quoted fragment…${t.cdq}`,
};

const fixQuotedSentencePunctuationUnitSet = {
  // Exception. skip fixing name with regnal number
  [`It was ${t.odq}Charles IV${t.cdq},`]: `It was ${t.odq}Charles IV${t.cdq},`,

  // False positives - single word (should NOT be fixed in this function)
  [`Look for ${t.odq}word.${t.cdq} In the text.`]: `Look for ${t.odq}word.${t.cdq} In the text.`,
  [`${t.odq}word.${t.cdq}`]:                       `${t.odq}word.${t.cdq}`,
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
  [`${t.odq} extra space at the beginning${t.cdq}`]: `${t.odq}extra space at the beginning${t.cdq}`,
  [`${t.odq}extra space at the end ${t.cdq}`]:       `${t.odq}extra space at the end${t.cdq}`,
  [`${t.odq}Sentence and… ${t.cdq}`]:                `${t.odq}Sentence and…${t.cdq}`,

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

const addSpaceBeforeopeningDoubleQuoteSet = {
  [`It’s a very ${t.odq}nice${t.cdq} saying.`]:               `It’s a very ${t.odq}nice${t.cdq} saying.`,
  [`It’s a${t.odq}nice${t.cdq} saying.`]:                     `It’s a ${t.odq}nice${t.cdq} saying.`, //add nbsp;
  [`An unquoted sentence.${t.odq}And a quoted one.${t.cdq}`]: `An unquoted sentence. ${t.odq}And a quoted one.${t.cdq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Add a missing space before a left double quote",
    transformDoubleQuoteSet(addSpaceBeforeopeningDoubleQuoteSet, localeName),
    (text) => addSpaceBeforeopeningDoubleQuote(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const addSpaceAfterclosingDoubleQuoteSet = {
  [`It’s a ${t.odq}nice${t.cdq}saying.`]:                     `It’s a ${t.odq}nice${t.cdq} saying.`,
  [`${t.odq}A quoted sentence.${t.cdq}And an unquoted one.`]: `${t.odq}A quoted sentence.${t.cdq} And an unquoted one.`,
  [`${t.odq}A quoted sentence!${t.cdq}And an unquoted one.`]: `${t.odq}A quoted sentence!${t.cdq} And an unquoted one.`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Add a missing space after a right double quote",
    transformDoubleQuoteSet(addSpaceAfterclosingDoubleQuoteSet, localeName),
    (text) => addSpaceAfterclosingDoubleQuote(text, new Locale(localeName)),
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

const fixDirectSpeechIntroSet = {
  // Problem Type 1: Using hyphen, en dash, or em dash instead of proper introduction

  // Hyphen with spaces
  [`She said - ${t.odq}Hello${t.cdq} - and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said - ${t.odq}Hello${t.cdq} and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said -${t.odq}Hello${t.cdq} - and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said-${t.odq}Hello${t.cdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // En dash with spaces
  [`She said – ${t.odq}Hello${t.cdq} – and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said – ${t.odq}Hello${t.cdq} and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said –${t.odq}Hello${t.cdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said–${t.odq}Hello${t.cdq} – and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Em dash with spaces
  [`She said — ${t.odq}Hello${t.cdq} — and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said — ${t.odq}Hello${t.cdq} and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said —${t.odq}Hello${t.cdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said—${t.odq}Hello${t.cdq} — and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Problem Type 2: Combination of proper and wrong direct speech introduction

  // Colon/comma + hyphen
  [`She said: - ${t.odq}Hello${t.cdq} - and left.`]:                      `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said: -${t.odq}Hello${t.cdq} - and left.`]:                       `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:- ${t.odq}Hello${t.cdq} - and left.`]:                       `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:-${t.odq}Hello${t.cdq} - and left.`]:                        `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said${t.directSpeechIntro} - ${t.odq}Hello${t.cdq} - and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Colon/comma + en dash
  [`She said: – ${t.odq}Hello${t.cdq} – and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said: –${t.odq}Hello${t.cdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:– ${t.odq}Hello${t.cdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:–${t.odq}Hello${t.cdq} – and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Colon/comma + em dash
  [`She said: — ${t.odq}Hello${t.cdq} — and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said: —${t.odq}Hello${t.cdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:— ${t.odq}Hello${t.cdq} — and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:—${t.odq}Hello${t.cdq} — and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Problem Type 3: Extra spaces between introduction and quote

  [`She said:${t.odq}Hello${t.cdq} and left.`]:      `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said,${t.odq}Hello${t.cdq} and left.`]:      `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:  ${t.odq}Hello${t.cdq} and left.`]:    `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:   ${t.odq}Hello${t.cdq} and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:    ${t.odq}Hello${t.cdq} and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said:     ${t.odq}Hello${t.cdq} and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said,     ${t.odq}Hello${t.cdq} and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Combination: wrong intro + extra spaces
  [`She said: -  ${t.odq}Hello${t.cdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said: –   ${t.odq}Hello${t.cdq} – and left.`]:  `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said: —    ${t.odq}Hello${t.cdq} — and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Multiple spaces around dashes
  [`She said  -  ${t.odq}Hello${t.cdq}  -  and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said  –  ${t.odq}Hello${t.cdq}  –  and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
  [`She said  —  ${t.odq}Hello${t.cdq}  —  and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,

  // Edge cases: No ending sentence (quote at end)
  [`She said - ${t.odq}Hello${t.cdq}`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq}`,
  [`She said – ${t.odq}Hello${t.cdq}`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq}`,
  [`She said — ${t.odq}Hello${t.cdq}`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq}`,

  // // Varied content between quotes: punctuation, numbers, special chars, etc.
  [`She said - ${t.odq}Hello, world!${t.cdq} - and left.`]:         `She said${t.directSpeechIntro} ${t.odq}Hello, world!${t.cdq} and left.`,
  [`She said - ${t.odq}Hello! How are you?${t.cdq} - and left.`]:   `She said${t.directSpeechIntro} ${t.odq}Hello! How are you?${t.cdq} and left.`,
  // [`She said – ${t.odq}It${t.apos}s 12″ × 12″.${t.cdq} – and left.`]: `She said${t.directSpeechIntro} ${t.odq}It${t.apos}s 12″ × 12″.${t.cdq} and left.`,
  [`She said — ${t.odq}Numbers: 123, 456.78…${t.cdq} — and left.`]: `She said${t.directSpeechIntro} ${t.odq}Numbers: 123, 456.78…${t.cdq} and left.`,

  [`She said — ${t.odq}URL: http://example.com/path${t.cdq} — and left.`]:                                                                              `She said${t.directSpeechIntro} ${t.odq}URL: http://example.com/path${t.cdq} and left.`,
  [`She said - ${t.odq}Email: test@example.com${t.cdq} - and left.`]:                                                                                   `She said${t.directSpeechIntro} ${t.odq}Email: test@example.com${t.cdq} and left.`,
  [`She said – ${t.odq}Quote with: colon, semicolon; comma, dot.${t.cdq} – and left.`]:                                                                 `She said${t.directSpeechIntro} ${t.odq}Quote with: colon, semicolon; comma, dot.${t.cdq} and left.`,
  [`She said — ${t.odq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${t.cdq} — and left.`]: `She said${t.directSpeechIntro} ${t.odq}A very long sentence with many words and punctuation marks, including commas, periods, and other symbols!${t.cdq} and left.`,

  // Edge cases: Paragraph starts with a quote introduced with a dash
  [`- ${t.odq}Hello${t.cdq} - she said.`]:   `${t.odq}Hello${t.cdq} she said.`,
  [`-${t.odq}Hello${t.cdq} - she said.`]:    `${t.odq}Hello${t.cdq} she said.`,
  [` - ${t.odq}Hello${t.cdq} - she said.`]:  `${t.odq}Hello${t.cdq} she said.`,
  [`-   ${t.odq}Hello${t.cdq} - she said.`]: `${t.odq}Hello${t.cdq} she said.`,
  [`– ${t.odq}Hello${t.cdq} – she said.`]:   `${t.odq}Hello${t.cdq} she said.`,
  [`— ${t.odq}Hello${t.cdq} — she said.`]:   `${t.odq}Hello${t.cdq} she said.`,

  // Edge cases: The following quoted sentence is introduced with a dash
  [`ends. - ${t.odq}Hello${t.cdq} - she said.`]:   `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends. -${t.odq}Hello${t.cdq} - she said.`]:    `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends.  - ${t.odq}Hello${t.cdq} - she said.`]:  `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends. -   ${t.odq}Hello${t.cdq} - she said.`]: `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends. – ${t.odq}Hello${t.cdq} – she said.`]:   `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends. — ${t.odq}Hello${t.cdq} — she said.`]:   `ends. ${t.odq}Hello${t.cdq} she said.`,
  [`ends? - ${t.odq}Hello${t.cdq} - she said.`]:   `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends? -${t.odq}Hello${t.cdq} - she said.`]:    `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends?  - ${t.odq}Hello${t.cdq} - she said.`]:  `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends? -   ${t.odq}Hello${t.cdq} - she said.`]: `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends? – ${t.odq}Hello${t.cdq} – she said.`]:   `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends? — ${t.odq}Hello${t.cdq} — she said.`]:   `ends? ${t.odq}Hello${t.cdq} she said.`,
  [`ends! - ${t.odq}Hello${t.cdq} - she said.`]:   `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends! -${t.odq}Hello${t.cdq} - she said.`]:    `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends!  - ${t.odq}Hello${t.cdq} - she said.`]:  `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends! -   ${t.odq}Hello${t.cdq} - she said.`]: `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends! – ${t.odq}Hello${t.cdq} – she said.`]:   `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends! — ${t.odq}Hello${t.cdq} — she said.`]:   `ends! ${t.odq}Hello${t.cdq} she said.`,
  [`ends… - ${t.odq}Hello${t.cdq} - she said.`]:   `ends… ${t.odq}Hello${t.cdq} she said.`,
  [`ends… -${t.odq}Hello${t.cdq} - she said.`]:    `ends… ${t.odq}Hello${t.cdq} she said.`,
  [`ends…  - ${t.odq}Hello${t.cdq} - she said.`]:  `ends… ${t.odq}Hello${t.cdq} she said.`,
  [`ends… -   ${t.odq}Hello${t.cdq} - she said.`]: `ends… ${t.odq}Hello${t.cdq} she said.`,
  [`ends… – ${t.odq}Hello${t.cdq} – she said.`]:   `ends… ${t.odq}Hello${t.cdq} she said.`,
  [`ends… — ${t.odq}Hello${t.cdq} — she said.`]:   `ends… ${t.odq}Hello${t.cdq} she said.`,

  // False positives: Already correct (should not change)
  [`She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`]: `She said${t.directSpeechIntro} ${t.odq}Hello${t.cdq} and left.`,
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
  ...identifyUnpairedOpeningDoubleQuoteSet,
  ...identifyUnpairedClosingDoubleQuoteSet,
  ...removeUnidentifiedDoubleQuoteSet,
  ...replaceDoublePrimeWDoubleQuoteModuleSet,
  ...removeExtraSpacesAroundQuotesSet,
  ...addSpaceBeforeopeningDoubleQuoteSet,
  ...addSpaceAfterclosingDoubleQuoteSet,
  ...fixDirectSpeechIntroSet,
  ...fixQuotedWordPunctuationModuleSet,
  ...fixQuotedSentencePunctuationModuleSet,
};

export function transformDoubleQuoteSet(testSet, localeName) {
  return transformTestSet(testSet, localeName, {
    additionalSets: [doubleQuotesFalsePositives],
  });
}
