import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyInWordContractions,
  identifyContractedYears,
  identifySinglePrimes,
  identifyUnpairedOpeningSingleQuote,
  identifyUnpairedClosingSingleQuote,
  identifySingleQuotePairAroundSingleWord,
  identifySingleQuotePairs,
  replaceSinglePrimeWSingleQuote,
  identifyResidualApostrophes,
  placeLocaleSingleQuotes,
  fixQuotedWordPunctuation,
  fixQuotedSentencePunctuation,
  removeExtraSpaceAroundSinglePrime,
  fixSingleQuotesPrimesAndApostrophes,
} from "../../src/modules/punctuation/single-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { createTestSuite, transformTestSet, t } from "../test-utils.js";
import { keepMarkdownCodeBlocksSet } from "./double-quotes.test.js";
import { m } from "../../src/markers.js";

const identifyContractedAndModuleSet = {
  "rock 'n' roll":   "rock ’n’ roll",
  "rock'n'roll":     "rock ’n’ roll",
  "rock 'n'roll":    "rock ’n’ roll",
  "rock'n' roll":    "rock ’n’ roll",
  "rock ‚n‘ roll":   "rock ’n’ roll",
  "rock ’nʼ roll":   "rock ’n’ roll",
  "rock ‛n′ roll":   "rock ’n’ roll",
  "rock ‹n› roll":   "rock ’n’ roll",
  "rock ´n` roll":   "rock ’n’ roll",
  "ROCK 'N' ROLL":   "ROCK ’N’ ROLL",
  "dead 'n' buried": "dead ’n’ buried",
  "drill 'n' bass":  "drill ’n’ bass",
  "drum 'n' bass":   "drum ’n’ bass",
  "pick 'n' mix":    "pick ’n’ mix",
  "fish 'n' chips":  "fish ’n’ chips",
  "salt 'n' shake":  "salt ’n’ shake",
  "mac 'n' cheese":  "mac ’n’ cheese",
  "pork 'n' beans":  "pork ’n’ beans",
  "drag 'n' drop":   "drag ’n’ drop",
  "rake 'n' scrape": "rake ’n’ scrape",
  "hook 'n' kill":   "hook ’n’ kill",
};

const identifyContractedAndUnitSet = {
  ...identifyContractedAndModuleSet,
  //false positives
  "Press ‘n’ button": "Press ‘n’ button",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify contracted and (’n’) as apostrophes",
    transformTestSet(identifyContractedAndUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedAnd(text), new Locale(localeName)),
    transformTestSet(identifyContractedAndModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedBeginningsSet = {
  "Just 'cause we wanna.":              "Just ’cause we wanna.",
  "'Tis the season":                    "’Tis the season",
  "'sblood":                            "’sblood",
  "'mongst":                            "’mongst",
  "'prentice":                          "’prentice",
  "'slight":                            "’slight",
  "'Strewth":                           "’Strewth",
  "'Twixt":                             "’Twixt",
  "'shun":                              "’shun",
  "'slid":                              "’slid",
  "Find 'em!":                          "Find ’em!",
  "'Twas the Night Before Christmas":   "’Twas the Night Before Christmas",
  "'Til The Season Comes 'Round Again": "’Til The Season Comes ’Round Again",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify common contractions at the beginning of the word as apostrophes",
    transformTestSet(identifyContractedBeginningsSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedBeginnings(text), new Locale(localeName)),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedEndsModuleSet = {
  "nottin'": "nottin’",
  "gettin'": "gettin’",
  "NOTTIN'": "NOTTIN’",
  "GETTIN'": "GETTIN’",
};

const identifyContractedEndsUnitSet = {
  ...identifyContractedEndsModuleSet,
  // false positive, when it’s not a contracted word
  "'something in'": "'something in'",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify common contractions at the end of the word as apostrophes",
    transformTestSet(identifyContractedEndsUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedEnds(text), new Locale(localeName)),
    transformTestSet(identifyContractedEndsModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyInWordContractionsSet = {
  "69'ers":       "69’ers",
  "iPhone6's":    "iPhone6’s",
  "1990's":       "1990’s",
  "don't":        "don’t",
  "don''t":       "don’t",
  "don''’t":      "don’t",
  "Paul‘s Diner": "Paul’s Diner",
  "Paul’s Diner": "Paul’s Diner",
  "Paulʼs Diner": "Paul’s Diner",
  "Paul‛s Diner": "Paul’s Diner",
  "Paul`s Diner": "Paul’s Diner",
  "Paul‚s Diner": "Paul’s Diner",
  "Paul´s Diner": "Paul’s Diner",
  "I''''m":       "I’m",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify in-word contractions as apostrophes",
    transformTestSet(identifyInWordContractionsSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyInWordContractions(text), new Locale(localeName)),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedYearsModuleSet = {
  "INCHEBA '89": "INCHEBA ’89",
  "in '70s":     "in ’70s",
  "Q1 '23":      "Q1 ’23",
};

const identifyContractedYearsUnitSet = {
  ...identifyContractedYearsModuleSet,
  // false positive, when there is a wrongly spaced feet
  "12 '45″": "12 '45″",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify contracted years as apostrophes",
    transformTestSet(identifyContractedYearsUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedYears(text), new Locale(localeName)),
    transformTestSet(identifyContractedYearsModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifySinglePrimesModuleSet = {
  "12 ' 45″": "12′ 45″",
  "12 ‘ 45″": "12′ 45″",
  "12 ’ 45″": "12′ 45″",
  "12 ‛ 45″": "12′ 45″",
  "12 ′ 45″": "12′ 45″",
  "12 ‛45″":  "12′45″",
  //this is identified wrongly as 8217, right quotation mark in module tests
  "12 '45″":  "12′45″",
};

const identifySinglePrimesUnitSet = {
  "12' 45″":  "12′ 45″",
  "12‘ 45″":  "12′ 45″",
  "12’ 45″":  "12′ 45″",
  "12‛ 45″":  "12′ 45″",
  "12′ 45″":  "12′ 45″",
  "12 ′ 45″": "12 ′ 45″",
  "12'45″":   "12′45″",
  "12 '45″":  "12 ′45″",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify feet and arcminutes following a 1–3 numbers",
    transformTestSet(identifySinglePrimesUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifySinglePrimes(text), new Locale(localeName)),
    transformTestSet(identifySinglePrimesModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedOpeningSingleQuoteModuleSet = {
  // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module
  [`${t.odq}‘word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}–‘word${t.cdq}`]: `${t.odq}–’word${t.cdq}`,
  [`${t.odq}—‘word${t.cdq}`]: `${t.odq}—’word${t.cdq}`,
  [`${t.odq}ʼword${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}‛word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}´word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}\`word${t.cdq}`]: `${t.odq}’word${t.cdq}`,
  [`${t.odq}′word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}‹word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
  [`${t.odq}›word${t.cdq}`]:  `${t.odq}’word${t.cdq}`,
};

const identifyUnpairedOpeningSingleQuoteUnitSet = {
  '" \'word"': `" ${m.osqUnpaired}word"`,
  '" ‚word"':  `" ${m.osqUnpaired}word"`,
  " ‘word":    ` ${m.osqUnpaired}word`,
  "–‘word":    `–${m.osqUnpaired}word`,
  "—‘word":    `—${m.osqUnpaired}word`,
  " ʼword":    ` ${m.osqUnpaired}word`,
  " ‛word":    ` ${m.osqUnpaired}word`,
  " ´word":    ` ${m.osqUnpaired}word`,
  " `word":    ` ${m.osqUnpaired}word`,
  " ′word":    ` ${m.osqUnpaired}word`,
  " ‹word":    ` ${m.osqUnpaired}word`,
  " ›word":    ` ${m.osqUnpaired}word`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired left single quote",
    transformTestSet(identifyUnpairedOpeningSingleQuoteUnitSet, localeName),
    (text) => identifyUnpairedOpeningSingleQuote(text),
    transformTestSet(identifyUnpairedOpeningSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedClosingSingleQuoteModuleSet = {
  // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module
  [`${t.odq}word'${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word‚${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word‘${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}wordʼ${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word‛${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word´${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word\`${t.cdq}`]: `${t.odq}word’${t.cdq}`,
  [`${t.odq}word′${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word‹${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
  [`${t.odq}word›${t.cdq}`]:  `${t.odq}word’${t.cdq}`,
};

const identifyUnpairedClosingSingleQuoteUnitSet = {
  [`${t.odq}word!'${t.cdq}`]: `${t.odq}word!${m.csqUnpaired}${t.cdq}`,
  [`${t.odq}word.'${t.cdq}`]: `${t.odq}word.${m.csqUnpaired}${t.cdq}`,
  [`${t.odq}word':${t.cdq}`]: `${t.odq}word${m.csqUnpaired}:${t.cdq}`,
  [`${t.odq}word',${t.cdq}`]: `${t.odq}word${m.csqUnpaired},${t.cdq}`,
  '"word\'"':                 `"word${m.csqUnpaired}"`,
  '"word‚"':                  `"word${m.csqUnpaired}"`,
  "word‘":                    `word${m.csqUnpaired}`,
  "wordʼ":                    `word${m.csqUnpaired}`,
  "word‛":                    `word${m.csqUnpaired}`,
  "word´":                    `word${m.csqUnpaired}`,
  "word`":                    `word${m.csqUnpaired}`,
  "word′":                    `word${m.csqUnpaired}`,
  "word‹":                    `word${m.csqUnpaired}`,
  "word›":                    `word${m.csqUnpaired}`,
  "word.'":                   `word.${m.csqUnpaired}`,
  "word!'":                   `word!${m.csqUnpaired}`,
  "word':":                   `word${m.csqUnpaired}:`,
  "word',":                   `word${m.csqUnpaired},`,
  "word' ":                   `word${m.csqUnpaired} `,
  "3000› ":                   `3000${m.csqUnpaired} `,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired right single quote",
    transformTestSet(identifyUnpairedClosingSingleQuoteUnitSet, localeName),
    (text) => identifyUnpairedClosingSingleQuote(text),
    transformTestSet(identifyUnpairedClosingSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifySingleQuotePairsModuleSet = {
  [`He said${t.directSpeechIntro} ${t.odq}What about 'word', is that good?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}word${t.csq}, is that good?${t.cdq}`,

  [`He said${t.directSpeechIntro} ${t.odq}What about 'word' 'word', is that good?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}word${t.csq} ${t.osq}word${t.csq}, is that good?${t.cdq}`,

  [`He said${t.directSpeechIntro} ${t.odq}What about 'word word', is that good?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}word word,${t.csq} is that good?${t.cdq}`,

  [`${t.odq}double quotes 'and single quotes' within${t.cdq}`]: `${t.odq}double quotes ${t.osq}and single quotes${t.csq} within${t.cdq}`,

  [`${t.odq}double quotes 'and single quotes’ within${t.cdq}`]: `${t.odq}double quotes ${t.osq}and single quotes${t.csq} within${t.cdq}`,

  [`${t.odq}double quotes ‚and single quotes' within${t.cdq}`]: `${t.odq}double quotes ${t.osq}and single quotes${t.csq} within${t.cdq}`,

  [`He said${t.directSpeechIntro} ${t.odq}What about 'name' and 'other name'?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}name${t.csq} and ${t.osq}other name${t.csq}?${t.cdq}`,

  [`Within double quotes ${t.odq}there are single 'quotes with mix’d punctuation,' you see.${t.cdq}`]: `Within double quotes ${t.odq}there are single ${t.osq}quotes with mix’d punctuation,${t.csq} you see.${t.cdq}`,

  [`Let's test this${t.directSpeechIntro} ${t.odq}however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said${t.cdq}`]: `Let’s test this${t.directSpeechIntro} ${t.odq}however, ${t.osq}quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,${t.csq} he said${t.cdq}`,

  // this case is not covered, the value is false
  // the first right single quote is falsely an apostrophe
  // the second left single quote is falsely an apostrophe
  // tbd-single-quotes-matching
  // "He said: “What about 'word word' 'word word', is that good?”":
  //   "He said: “What about ‘word word’ ’word word’, is that good?”",
};

const identifySingleQuotePairsUnitSet = {
  [`${m.osqUnpaired}word${m.csqUnpaired}`]: `${m.osq}word${m.csq}`,

  [`${m.osqUnpaired}word word${m.csqUnpaired}`]: `${m.osq}word word${m.csq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify single quote pairs",
    transformTestSet(identifySingleQuotePairsUnitSet, localeName),
    (text) => identifySingleQuotePairs(text),
    transformTestSet(identifySingleQuotePairsModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifySingleQuotePairAroundSingleWordModuleSet = {
  "'word'":                                                                           `${t.osq}word${t.csq}`,
  "'word' 'word'":                                                                    `${t.osq}word${t.csq} ${t.osq}word${t.csq}`,
  [`He said${t.directSpeechIntro} ${t.odq}What about 'word', is that good?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}word${t.csq}, is that good?${t.cdq}`,
  "Press 'N' to get started":                                                         `Press ${t.osq}N${t.csq} to get started`,
};

const identifySingleQuotePairAroundSingleWordUnitSet = {
  ...identifySingleQuotePairAroundSingleWordModuleSet,

  // false positives
  "... don't'": "... don't'",
  "'don't ...": "'don't ...",

  // false positive
  // this function does fix multiple words within single quotes
  // limitation: contractions at the end of the word, e.g. jes'
  // tbd-single-quotes-matching
  "'word word'": "'word word'",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify single quote pairs around single word",
    transformTestSet(identifySingleQuotePairAroundSingleWordUnitSet, localeName),
    (text) =>
      placeLocaleSingleQuotes(
        identifySingleQuotePairAroundSingleWord(text),
        new Locale(localeName)
      ),
    transformTestSet(identifySingleQuotePairAroundSingleWordModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const replaceSinglePrimeWSingleQuoteModuleSet = {
  [`He said${t.directSpeechIntro} ${t.odq}What about 'Localhost 3000', is that good?${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}What about ${t.osq}Localhost 3000,${t.csq} is that good?${t.cdq}`,

  [`He said${t.directSpeechIntro} ${t.odq}Here are 30 'bucks'${t.cdq}`]: `He said${t.directSpeechIntro} ${t.odq}Here are 30 ${t.osq}bucks${t.csq}${t.cdq}`,
};

const replaceSinglePrimeWSingleQuoteUnitSet = {
  [`${m.osqUnpaired}word${m.singlePrime}`]: `${m.osq}word${m.csq}`,
  [`${m.singlePrime}word${m.csqUnpaired}`]: `${m.osq}word${m.csq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Replace a single qoute & a single prime with a single quote pair",
    transformTestSet(replaceSinglePrimeWSingleQuoteUnitSet, localeName),
    (text) => replaceSinglePrimeWSingleQuote(text),
    transformTestSet(replaceSinglePrimeWSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyResidualApostrophesSet = {
  "Hers'": "Hers’",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify residual apostrophes",
    transformTestSet(identifyResidualApostrophesSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyResidualApostrophes(text), localeName),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const removeExtraSpaceAroundSinglePrimeSet = {
  "12 ′ 45″": "12′ 45″",
  "12 ′45″":  "12′45″",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove extra space around a single prime",
    transformTestSet(removeExtraSpaceAroundSinglePrimeSet, localeName),
    (text) => removeExtraSpaceAroundSinglePrime(text),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const fixQuotedWordPunctuationModuleSet = {
  /*
  Related source: https://cmosshoptalk.com/2020/10/20/commas-and-periods-with-quotation-marks/

  Fix the punctuation around a quoted word accordingly:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word (e.g., 'word.' → 'word'.)
  - keep the position of `!`, `?`, and `…` as is (ambiguous context; we would need contextual information for proper placement: 'Wow!' vs. Have you heard about the 'bird'?)
  */

  // Single word with period
  [`${t.odq}${t.osq}word.${t.csq} fill${t.cdq}`]:                  `${t.odq}${t.osq}word${t.csq}. fill${t.cdq}`,
  [`${t.odq}Look for ${t.osq}word.${t.csq} In the text.${t.cdq}`]: `${t.odq}Look for ${t.osq}word${t.csq}. In the text.${t.cdq}`,
  [`${t.odq}Look for ${t.osq}Ian.${t.csq} In the text.${t.cdq}`]:  `${t.odq}Look for ${t.osq}Ian${t.csq}. In the text.${t.cdq}`,

  // Single word with comma
  [`${t.odq}${t.osq}word,${t.csq} fill${t.cdq}`]:                `${t.odq}${t.osq}word${t.csq}, fill${t.cdq}`,
  [`${t.odq}He said ${t.osq}hello,${t.csq} then left.${t.cdq}`]: `${t.odq}He said ${t.osq}hello${t.csq}, then left.${t.cdq}`,

  // Single word with semicolon
  [`${t.odq}${t.osq}word;${t.csq} fill${t.cdq}`]:               `${t.odq}${t.osq}word${t.csq}; fill${t.cdq}`,
  [`${t.odq}He used ${t.osq}code;${t.csq} it worked.${t.cdq}`]: `${t.odq}He used ${t.osq}code${t.csq}; it worked.${t.cdq}`,

  // Single word with colon
  [`${t.odq}${t.osq}word:${t.csq} fill${t.cdq}`]:                      `${t.odq}${t.osq}word${t.csq}: fill${t.cdq}`,
  [`${t.odq}Consider ${t.osq}refactoring:${t.csq} it helps.${t.cdq}`]: `${t.odq}Consider ${t.osq}refactoring${t.csq}: it helps.${t.cdq}`,

  //fix later
  // Contracted words
  // [`${t.odq}Say ${t.osq}don${t.apos}t;${t.csq} be firm.${t.cdq}`]:
  //   "${t.odq}Say ${t.osq}don${t.apos}t${t.csq}; be firm.${t.cdq}",

  // fix later: tokenized identification of single quotes
  // Numbers
  // [`${t.odq}Version ${t.osq}2.0.${t.csq} is out.${t.cdq}`]: `${t.odq}Version ${t.osq}2.0${t.csq}. is out.${t.cdq}`,
  // [`${t.odq}In ${t.osq}2020,${t.csq} things changed.${t.cdq}`]: `${t.odq}In ${t.osq}2020${t.csq}, things changed.${t.cdq}`,
  // [`${t.odq}Number ${t.osq}42;${t.csq} the answer.${t.cdq}`]: `${t.odq}Number ${t.osq}42${t.csq}; the answer.${t.cdq}`,

  // fix later: tokenized identification of single quotes
  // Combinations with numbers and contractions (e.g., 69'ers)
  // [`${t.odq}The ${t.osq}69${t.apos}ers.${t.csq} were famous.${t.cdq}`]: `${t.odq}The ${t.osq}69${t.apos}ers${t.csq}. were famous.${t.cdq}`,
  // [`${t.odq}Those ${t.osq}90${t.apos}s,${t.csq} good times.${t.cdq}`]: `${t.odq}Those ${t.osq}90${t.apos}s${t.csq}, good times.${t.cdq}`,

  // Hyphenated words
  [`${t.odq}Use ${t.osq}well-known.${t.csq} for clarity.${t.cdq}`]:        `${t.odq}Use ${t.osq}well-known${t.csq}. for clarity.${t.cdq}`,
  [`${t.odq}The ${t.osq}state-of-the-art,${t.csq} approach.${t.cdq}`]:     `${t.odq}The ${t.osq}state-of-the-art${t.csq}, approach.${t.cdq}`,
  [`${t.odq}Try ${t.osq}open-source;${t.csq} it${t.apos}s free.${t.cdq}`]: `${t.odq}Try ${t.osq}open-source${t.csq}; it${t.apos}s free.${t.cdq}`,
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  [`She said ${t.osq}hello world.${t.csq} and left.`]:  `She said ${t.osq}hello world.${t.csq} and left.`,
  [`I heard ${t.osq}good morning,${t.csq} from her.`]:  `I heard ${t.osq}good morning,${t.csq} from her.`,
  [`The ${t.osq}quick brown fox;${t.csq} jumps.`]:      `The ${t.osq}quick brown fox;${t.csq} jumps.`,
  [`The ${t.osq}quick brown fox${t.csq}; jumps.`]:      `The ${t.osq}quick brown fox${t.csq}; jumps.`,
  [`Note ${t.osq}some important thing:${t.csq} here.`]: `Note ${t.osq}some important thing:${t.csq} here.`,

  // False positives - exclamation and question marks (should NOT be fixed)
  [`The ${t.osq}Wow!${t.csq} was loud.`]:         `The ${t.osq}Wow!${t.csq} was loud.`,
  [`The ${t.osq}Wow${t.csq}! was loud.`]:         `The ${t.osq}Wow${t.csq}! was loud.`,
  [`She asked ${t.osq}Why?${t.csq} repeatedly.`]: `She asked ${t.osq}Why?${t.csq} repeatedly.`,
  [`She asked ${t.osq}Why${t.csq}? repeatedly.`]: `She asked ${t.osq}Why${t.csq}? repeatedly.`,

  // False positives - regnal numbers
  [`Byl to Karel ${t.osq}IV.${t.csq}, ktery`]: `Byl to Karel ${t.osq}IV.${t.csq}, ktery`,

  // False positives - already correct
  [`The ${t.osq}word${t.csq}. is correct.`]:     `The ${t.osq}word${t.csq}. is correct.`,
  [`He said ${t.osq}hello${t.csq}, then left.`]: `He said ${t.osq}hello${t.csq}, then left.`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for single-word quoted content",
    transformTestSet(
      { ...fixQuotedWordPunctuationUnitSet, ...fixQuotedWordPunctuationModuleSet },
      localeName
    ),
    (text) => fixQuotedWordPunctuation(text, new Locale(localeName)),
    transformTestSet(fixQuotedWordPunctuationModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
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
  [`${t.odq}It can be a ${t.osq}quoted fragment${t.csq}. fill${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment.${t.csq} fill${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment${t.csq}, fill${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment,${t.csq} fill${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment${t.csq}! fill${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment!${t.csq} fill${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment${t.csq}? fill${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment?${t.csq} fill${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment${t.csq}… fill${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment…${t.csq} fill${t.cdq}`,

  // move terminal punctuation (.?!…) outside when quoted fragment is at the end of a quoted sentence
  [`${t.odq}Sentence ${t.osq}quoted fragment.${t.csq}${t.cdq}`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}.${t.cdq}`,

  [`${t.odq}Sentence ${t.osq}quoted fragment!${t.csq}${t.cdq}`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}!${t.cdq}`,

  // nbsp
  [`${t.odq}It can be ${t.osq}a banana${t.csq}, right.${t.cdq}`]: `${t.odq}It can be ${t.osq}a banana,${t.csq} right.${t.cdq}`,

  // Quoted sentence
  [`${t.odq}fill ${t.osq}Fully quoted sentence${t.csq}. fill${t.cdq}`]: `${t.odq}fill ${t.osq}Fully quoted sentence.${t.csq} fill${t.cdq}`,
  [`${t.odq}fill ${t.osq}Fully quoted sentence${t.csq}, fill${t.cdq}`]: `${t.odq}fill ${t.osq}Fully quoted sentence,${t.csq} fill${t.cdq}`,
  [`${t.odq}fill ${t.osq}Fully quoted sentence${t.csq}! fill${t.cdq}`]: `${t.odq}fill ${t.osq}Fully quoted sentence!${t.csq} fill${t.cdq}`,
  [`${t.odq}fill ${t.osq}Fully quoted sentence${t.csq}? fill${t.cdq}`]: `${t.odq}fill ${t.osq}Fully quoted sentence?${t.csq} fill${t.cdq}`,
  [`${t.odq}fill ${t.osq}Fully quoted sentence${t.csq}… fill${t.cdq}`]: `${t.odq}fill ${t.osq}Fully quoted sentence…${t.csq} fill${t.cdq}`,

  // Less common boundaries
  [`${t.odq}${t.osq}(Fully) quoted sentence${t.csq}.${t.cdq}`]: `${t.odq}${t.osq}(Fully) quoted sentence${t.csq}.${t.cdq}`,
  [`${t.odq}${t.osq}Fully quoted (sentence)${t.csq}.${t.cdq}`]: `${t.odq}${t.osq}Fully quoted (sentence)${t.csq}.${t.cdq}`,

  // Colon / semicolon should be placed outside the quotes
  [`${t.odq}${t.osq}quoted fragment:${t.csq} sentence continues${t.cdq}`]: `${t.odq}${t.osq}quoted fragment${t.csq}: sentence continues${t.cdq}`,
  [`${t.odq}${t.osq}quoted fragment;${t.csq} sentence continues${t.cdq}`]: `${t.odq}${t.osq}quoted fragment${t.csq}; sentence continues${t.cdq}`,

  [`${t.odq}${t.osq}(quoted) fragment:${t.csq} sentence continues${t.cdq}`]: `${t.odq}${t.osq}(quoted) fragment${t.csq}: sentence continues${t.cdq}`,
  [`${t.odq}${t.osq}quoted (fragment);${t.csq} sentence continues${t.cdq}`]: `${t.odq}${t.osq}quoted (fragment)${t.csq}; sentence continues${t.cdq}`,

  // false positive, consecutive single quotes
  [`${t.odq}fill ${t.osq}word${t.csq} ${t.osq}word${t.csq}, fill.${t.cdq}`]: `${t.odq}fill ${t.osq}word${t.csq} ${t.osq}word${t.csq}, fill.${t.cdq}`,

  // Correct placement
  [`${t.odq}It can be a ${t.osq}quoted fragment.${t.csq}${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}.${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment,${t.csq}${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment,${t.csq}${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment!${t.csq}${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}!${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment?${t.csq}${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}?${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment…${t.csq}${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}…${t.cdq}`,

  [`${t.odq}It can be a ${t.osq}quoted fragment!${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment!${t.csq}.${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment?${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment?${t.csq}.${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment…${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment…${t.csq}.${t.cdq}`,
};

const fixQuotedSentencePunctuationUnitSet = {
  // Exception. skip fixing name with regnal number
  [`${t.odq}It was ${t.osq}Charles IV${t.csq},${t.cdq}`]:          `${t.odq}It was ${t.osq}Charles IV${t.csq},${t.cdq}`,
  // False positives - single word (should NOT be fixed in this function)
  [`${t.odq}Look for ${t.osq}word.${t.csq} In the text.${t.cdq}`]: `${t.odq}Look for ${t.osq}word.${t.csq} In the text.${t.cdq}`,
  [`${t.odq}${t.osq}word.${t.csq}${t.cdq}`]:                       `${t.odq}${t.osq}word${t.csq}.${t.cdq}`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for quoted sentence or fragment",
    transformTestSet(
      { ...fixQuotedSentencePunctuationUnitSet, ...fixQuotedSentencePunctuationModuleSet },
      localeName
    ),
    (text) => fixQuotedSentencePunctuation(text, new Locale(localeName)),
    transformTestSet(fixQuotedSentencePunctuationModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

createTestSuite(
  "Test if markdown ticks are kept (single quotes) ",
  {},
  undefined,
  keepMarkdownCodeBlocksSet,
  (text, locale) =>
    fixSingleQuotesPrimesAndApostrophes(text, locale, {
      keepMarkdownCodeBlocks: true,
    }),
  supportedLocales
);

export const singleQuotesSet = {
  ...identifyContractedAndModuleSet,
  ...identifyContractedBeginningsSet,
  ...identifyContractedEndsModuleSet,
  ...identifyInWordContractionsSet,
  ...identifyContractedYearsModuleSet,
  ...identifySinglePrimesModuleSet,
  ...identifyUnpairedOpeningSingleQuoteModuleSet,
  ...identifyUnpairedClosingSingleQuoteModuleSet,
  ...identifySingleQuotePairsModuleSet,
  ...identifySingleQuotePairAroundSingleWordModuleSet,
  ...replaceSinglePrimeWSingleQuoteModuleSet,
  ...identifyResidualApostrophes,
  ...removeExtraSpaceAroundSinglePrimeSet,
  ...fixQuotedWordPunctuationModuleSet,
  ...fixQuotedSentencePunctuationModuleSet,

  [`Hej${t.directSpeechIntro} ${t.odq}Vin mu povil, 'ta de jes' take vidil' i neviril${t.cdq}`]: `Hej${t.directSpeechIntro} ${t.odq}Vin mu povil, ${t.osq}ta de jes’ take vidil${t.csq} i neviril${t.cdq}`, // tbd-single-quotes-matching
};
