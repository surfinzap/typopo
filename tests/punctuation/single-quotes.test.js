import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyInWordContractions,
  identifyContractedYears,
  identifySinglePrimes,
  identifyUnpairedLeftSingleQuote,
  identifyUnpairedRightSingleQuote,
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

const identifyUnpairedLeftSingleQuoteModuleSet = {
  // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module
  [`${t.ldq}‘word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}–‘word${t.rdq}`]: `${t.ldq}–’word${t.rdq}`,
  [`${t.ldq}—‘word${t.rdq}`]: `${t.ldq}—’word${t.rdq}`,
  [`${t.ldq}ʼword${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}‛word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}´word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}\`word${t.rdq}`]: `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}′word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}‹word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
  [`${t.ldq}›word${t.rdq}`]:  `${t.ldq}’word${t.rdq}`,
};

const identifyUnpairedLeftSingleQuoteUnitSet = {
  '" \'word"': `" ${m.lsqUnpaired}word"`,
  '" ‚word"':  `" ${m.lsqUnpaired}word"`,
  " ‘word":    ` ${m.lsqUnpaired}word`,
  "–‘word":    `–${m.lsqUnpaired}word`,
  "—‘word":    `—${m.lsqUnpaired}word`,
  " ʼword":    ` ${m.lsqUnpaired}word`,
  " ‛word":    ` ${m.lsqUnpaired}word`,
  " ´word":    ` ${m.lsqUnpaired}word`,
  " `word":    ` ${m.lsqUnpaired}word`,
  " ′word":    ` ${m.lsqUnpaired}word`,
  " ‹word":    ` ${m.lsqUnpaired}word`,
  " ›word":    ` ${m.lsqUnpaired}word`,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired left single quote",
    transformTestSet(identifyUnpairedLeftSingleQuoteUnitSet, localeName),
    (text) => identifyUnpairedLeftSingleQuote(text),
    transformTestSet(identifyUnpairedLeftSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedRightSingleQuoteModuleSet = {
  // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module
  [`${t.ldq}word'${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word‚${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word‘${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}wordʼ${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word‛${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word´${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word\`${t.rdq}`]: `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word′${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word‹${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
  [`${t.ldq}word›${t.rdq}`]:  `${t.ldq}word’${t.rdq}`,
};

const identifyUnpairedRightSingleQuoteUnitSet = {
  [`${t.ldq}word!'${t.rdq}`]: `${t.ldq}word!${m.rsqUnpaired}${t.rdq}`,
  [`${t.ldq}word.'${t.rdq}`]: `${t.ldq}word.${m.rsqUnpaired}${t.rdq}`,
  [`${t.ldq}word':${t.rdq}`]: `${t.ldq}word${m.rsqUnpaired}:${t.rdq}`,
  [`${t.ldq}word',${t.rdq}`]: `${t.ldq}word${m.rsqUnpaired},${t.rdq}`,
  '"word\'"':                 `"word${m.rsqUnpaired}"`,
  '"word‚"':                  `"word${m.rsqUnpaired}"`,
  "word‘":                    `word${m.rsqUnpaired}`,
  "wordʼ":                    `word${m.rsqUnpaired}`,
  "word‛":                    `word${m.rsqUnpaired}`,
  "word´":                    `word${m.rsqUnpaired}`,
  "word`":                    `word${m.rsqUnpaired}`,
  "word′":                    `word${m.rsqUnpaired}`,
  "word‹":                    `word${m.rsqUnpaired}`,
  "word›":                    `word${m.rsqUnpaired}`,
  "word.'":                   `word.${m.rsqUnpaired}`,
  "word!'":                   `word!${m.rsqUnpaired}`,
  "word':":                   `word${m.rsqUnpaired}:`,
  "word',":                   `word${m.rsqUnpaired},`,
  "word' ":                   `word${m.rsqUnpaired} `,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired right single quote",
    transformTestSet(identifyUnpairedRightSingleQuoteUnitSet, localeName),
    (text) => identifyUnpairedRightSingleQuote(text),
    transformTestSet(identifyUnpairedRightSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifySingleQuotePairsModuleSet = {
  [`He said${t.directSpeechIntro} ${t.ldq}What about 'word', is that good?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}word${t.rsq}, is that good?${t.rdq}`,

  [`He said${t.directSpeechIntro} ${t.ldq}What about 'word' 'word', is that good?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}word${t.rsq} ${t.lsq}word${t.rsq}, is that good?${t.rdq}`,

  [`He said${t.directSpeechIntro} ${t.ldq}What about 'word word', is that good?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}word word,${t.rsq} is that good?${t.rdq}`,

  [`${t.ldq}double quotes 'and single quotes' within${t.rdq}`]: `${t.ldq}double quotes ${t.lsq}and single quotes${t.rsq} within${t.rdq}`,

  [`${t.ldq}double quotes 'and single quotes’ within${t.rdq}`]: `${t.ldq}double quotes ${t.lsq}and single quotes${t.rsq} within${t.rdq}`,

  [`${t.ldq}double quotes ‚and single quotes' within${t.rdq}`]: `${t.ldq}double quotes ${t.lsq}and single quotes${t.rsq} within${t.rdq}`,

  [`He said${t.directSpeechIntro} ${t.ldq}What about 'name' and 'other name'?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}name${t.rsq} and ${t.lsq}other name${t.rsq}?${t.rdq}`,

  [`Within double quotes ${t.ldq}there are single 'quotes with mix’d punctuation,' you see.${t.rdq}`]: `Within double quotes ${t.ldq}there are single ${t.lsq}quotes with mix’d punctuation,${t.rsq} you see.${t.rdq}`,

  [`Let's test this${t.directSpeechIntro} ${t.ldq}however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said${t.rdq}`]: `Let’s test this${t.directSpeechIntro} ${t.ldq}however, ${t.lsq}quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,${t.rsq} he said${t.rdq}`,

  // this case is not covered, the value is false
  // the first right single quote is falsely an apostrophe
  // the second left single quote is falsely an apostrophe
  // tbd-single-quotes-matching
  // "He said: “What about 'word word' 'word word', is that good?”":
  //   "He said: “What about ‘word word’ ’word word’, is that good?”",
};

const identifySingleQuotePairsUnitSet = {
  [`${m.lsqUnpaired}word${m.rsqUnpaired}`]: `${m.lsq}word${m.rsq}`,

  [`${m.lsqUnpaired}word word${m.rsqUnpaired}`]: `${m.lsq}word word${m.rsq}`,
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
  "'word'":                                                                           `${t.lsq}word${t.rsq}`,
  "'word' 'word'":                                                                    `${t.lsq}word${t.rsq} ${t.lsq}word${t.rsq}`,
  [`He said${t.directSpeechIntro} ${t.ldq}What about 'word', is that good?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}word${t.rsq}, is that good?${t.rdq}`,
  "Press 'N' to get started":                                                         `Press ${t.lsq}N${t.rsq} to get started`,
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
  [`He said${t.directSpeechIntro} ${t.ldq}What about 'Localhost 3000', is that good?${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}What about ${t.lsq}Localhost 3000,${t.rsq} is that good?${t.rdq}`,

  [`He said${t.directSpeechIntro} ${t.ldq}Here are 30 'bucks'${t.rdq}`]: `He said${t.directSpeechIntro} ${t.ldq}Here are 30 ${t.lsq}bucks${t.rsq}${t.rdq}`,
};

const replaceSinglePrimeWSingleQuoteUnitSet = {
  [`${m.lsqUnpaired}word${m.singlePrime}`]: `${m.lsq}word${m.rsq}`,
  [`${m.singlePrime}word${m.rsqUnpaired}`]: `${m.lsq}word${m.rsq}`,
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
  [`${t.ldq}${t.lsq}word.${t.rsq} fill${t.rdq}`]:                  `${t.ldq}${t.lsq}word${t.rsq}. fill${t.rdq}`,
  [`${t.ldq}Look for ${t.lsq}word.${t.rsq} In the text.${t.rdq}`]: `${t.ldq}Look for ${t.lsq}word${t.rsq}. In the text.${t.rdq}`,
  [`${t.ldq}Look for ${t.lsq}Ian.${t.rsq} In the text.${t.rdq}`]:  `${t.ldq}Look for ${t.lsq}Ian${t.rsq}. In the text.${t.rdq}`,

  // Single word with comma
  [`${t.ldq}${t.lsq}word,${t.rsq} fill${t.rdq}`]:                `${t.ldq}${t.lsq}word${t.rsq}, fill${t.rdq}`,
  [`${t.ldq}He said ${t.lsq}hello,${t.rsq} then left.${t.rdq}`]: `${t.ldq}He said ${t.lsq}hello${t.rsq}, then left.${t.rdq}`,

  // Single word with semicolon
  [`${t.ldq}${t.lsq}word;${t.rsq} fill${t.rdq}`]:               `${t.ldq}${t.lsq}word${t.rsq}; fill${t.rdq}`,
  [`${t.ldq}He used ${t.lsq}code;${t.rsq} it worked.${t.rdq}`]: `${t.ldq}He used ${t.lsq}code${t.rsq}; it worked.${t.rdq}`,

  // Single word with colon
  [`${t.ldq}${t.lsq}word:${t.rsq} fill${t.rdq}`]:                      `${t.ldq}${t.lsq}word${t.rsq}: fill${t.rdq}`,
  [`${t.ldq}Consider ${t.lsq}refactoring:${t.rsq} it helps.${t.rdq}`]: `${t.ldq}Consider ${t.lsq}refactoring${t.rsq}: it helps.${t.rdq}`,

  //fix later
  // Contracted words
  // [`${t.ldq}Say ${t.lsq}don${t.apos}t;${t.rsq} be firm.${t.rdq}`]:
  //   "${t.ldq}Say ${t.lsq}don${t.apos}t${t.rsq}; be firm.${t.rdq}",

  // fix later: tokenized identification of single quotes
  // Numbers
  // [`${t.ldq}Version ${t.lsq}2.0.${t.rsq} is out.${t.rdq}`]: `${t.ldq}Version ${t.lsq}2.0${t.rsq}. is out.${t.rdq}`,
  // [`${t.ldq}In ${t.lsq}2020,${t.rsq} things changed.${t.rdq}`]: `${t.ldq}In ${t.lsq}2020${t.rsq}, things changed.${t.rdq}`,
  // [`${t.ldq}Number ${t.lsq}42;${t.rsq} the answer.${t.rdq}`]: `${t.ldq}Number ${t.lsq}42${t.rsq}; the answer.${t.rdq}`,

  // fix later: tokenized identification of single quotes
  // Combinations with numbers and contractions (e.g., 69'ers)
  // [`${t.ldq}The ${t.lsq}69${t.apos}ers.${t.rsq} were famous.${t.rdq}`]: `${t.ldq}The ${t.lsq}69${t.apos}ers${t.rsq}. were famous.${t.rdq}`,
  // [`${t.ldq}Those ${t.lsq}90${t.apos}s,${t.rsq} good times.${t.rdq}`]: `${t.ldq}Those ${t.lsq}90${t.apos}s${t.rsq}, good times.${t.rdq}`,

  // Hyphenated words
  [`${t.ldq}Use ${t.lsq}well-known.${t.rsq} for clarity.${t.rdq}`]:        `${t.ldq}Use ${t.lsq}well-known${t.rsq}. for clarity.${t.rdq}`,
  [`${t.ldq}The ${t.lsq}state-of-the-art,${t.rsq} approach.${t.rdq}`]:     `${t.ldq}The ${t.lsq}state-of-the-art${t.rsq}, approach.${t.rdq}`,
  [`${t.ldq}Try ${t.lsq}open-source;${t.rsq} it${t.apos}s free.${t.rdq}`]: `${t.ldq}Try ${t.lsq}open-source${t.rsq}; it${t.apos}s free.${t.rdq}`,

  // Escaped strings
  [`${t.ldq}${t.lsq}{{esc}},${t.rsq} fill${t.rdq}`]: `${t.ldq}${t.lsq}{{esc}}${t.rsq}, fill${t.rdq}`,
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  [`She said ${t.lsq}hello world.${t.rsq} and left.`]:  `She said ${t.lsq}hello world.${t.rsq} and left.`,
  [`I heard ${t.lsq}good morning,${t.rsq} from her.`]:  `I heard ${t.lsq}good morning,${t.rsq} from her.`,
  [`The ${t.lsq}quick brown fox;${t.rsq} jumps.`]:      `The ${t.lsq}quick brown fox;${t.rsq} jumps.`,
  [`The ${t.lsq}quick brown fox${t.rsq}; jumps.`]:      `The ${t.lsq}quick brown fox${t.rsq}; jumps.`,
  [`Note ${t.lsq}some important thing:${t.rsq} here.`]: `Note ${t.lsq}some important thing:${t.rsq} here.`,

  // False positives - exclamation and question marks (should NOT be fixed)
  [`The ${t.lsq}Wow!${t.rsq} was loud.`]:         `The ${t.lsq}Wow!${t.rsq} was loud.`,
  [`The ${t.lsq}Wow${t.rsq}! was loud.`]:         `The ${t.lsq}Wow${t.rsq}! was loud.`,
  [`She asked ${t.lsq}Why?${t.rsq} repeatedly.`]: `She asked ${t.lsq}Why?${t.rsq} repeatedly.`,
  [`She asked ${t.lsq}Why${t.rsq}? repeatedly.`]: `She asked ${t.lsq}Why${t.rsq}? repeatedly.`,

  // False positives - regnal numbers
  [`Byl to Karel ${t.lsq}IV.${t.rsq}, ktery`]: `Byl to Karel ${t.lsq}IV.${t.rsq}, ktery`,

  // False positives - already correct
  [`The ${t.lsq}word${t.rsq}. is correct.`]:     `The ${t.lsq}word${t.rsq}. is correct.`,
  [`He said ${t.lsq}hello${t.rsq}, then left.`]: `He said ${t.lsq}hello${t.rsq}, then left.`,
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
  [`${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}. fill${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment.${t.rsq} fill${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}, fill${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment,${t.rsq} fill${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}! fill${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment!${t.rsq} fill${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}? fill${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment?${t.rsq} fill${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}… fill${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment…${t.rsq} fill${t.rdq}`,

  // move terminal punctuation (.?!…) outside when quoted fragment is at the end of a quoted sentence
  [`${t.ldq}Sentence ${t.lsq}quoted fragment.${t.rsq}${t.rdq}`]: `${t.ldq}Sentence ${t.lsq}quoted fragment${t.rsq}.${t.rdq}`,

  [`${t.ldq}Sentence ${t.lsq}quoted fragment!${t.rsq}${t.rdq}`]: `${t.ldq}Sentence ${t.lsq}quoted fragment${t.rsq}!${t.rdq}`,

  // nbsp
  [`${t.ldq}It can be ${t.lsq}a banana${t.rsq}, right.${t.rdq}`]: `${t.ldq}It can be ${t.lsq}a banana,${t.rsq} right.${t.rdq}`,

  // Quoted sentence
  [`${t.ldq}fill ${t.lsq}Fully quoted sentence${t.rsq}. fill${t.rdq}`]: `${t.ldq}fill ${t.lsq}Fully quoted sentence.${t.rsq} fill${t.rdq}`,
  [`${t.ldq}fill ${t.lsq}Fully quoted sentence${t.rsq}, fill${t.rdq}`]: `${t.ldq}fill ${t.lsq}Fully quoted sentence,${t.rsq} fill${t.rdq}`,
  [`${t.ldq}fill ${t.lsq}Fully quoted sentence${t.rsq}! fill${t.rdq}`]: `${t.ldq}fill ${t.lsq}Fully quoted sentence!${t.rsq} fill${t.rdq}`,
  [`${t.ldq}fill ${t.lsq}Fully quoted sentence${t.rsq}? fill${t.rdq}`]: `${t.ldq}fill ${t.lsq}Fully quoted sentence?${t.rsq} fill${t.rdq}`,
  [`${t.ldq}fill ${t.lsq}Fully quoted sentence${t.rsq}… fill${t.rdq}`]: `${t.ldq}fill ${t.lsq}Fully quoted sentence…${t.rsq} fill${t.rdq}`,

  // Less common boundaries
  [`${t.ldq}${t.lsq}(Fully) quoted sentence${t.rsq}.${t.rdq}`]: `${t.ldq}${t.lsq}(Fully) quoted sentence${t.rsq}.${t.rdq}`,
  [`${t.ldq}${t.lsq}Fully quoted (sentence)${t.rsq}.${t.rdq}`]: `${t.ldq}${t.lsq}Fully quoted (sentence)${t.rsq}.${t.rdq}`,

  // Escaped strings
  [`${t.ldq}It can be a ${t.lsq}{{esc}} {{esc}}${t.rsq}.${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}{{esc}} {{esc}}${t.rsq}.${t.rdq}`,

  // Colon / semicolon should be placed outside the quotes
  [`${t.ldq}${t.lsq}quoted fragment:${t.rsq} sentence continues${t.rdq}`]: `${t.ldq}${t.lsq}quoted fragment${t.rsq}: sentence continues${t.rdq}`,
  [`${t.ldq}${t.lsq}quoted fragment;${t.rsq} sentence continues${t.rdq}`]: `${t.ldq}${t.lsq}quoted fragment${t.rsq}; sentence continues${t.rdq}`,

  [`${t.ldq}${t.lsq}(quoted) fragment:${t.rsq} sentence continues${t.rdq}`]: `${t.ldq}${t.lsq}(quoted) fragment${t.rsq}: sentence continues${t.rdq}`,
  [`${t.ldq}${t.lsq}quoted (fragment);${t.rsq} sentence continues${t.rdq}`]: `${t.ldq}${t.lsq}quoted (fragment)${t.rsq}; sentence continues${t.rdq}`,

  // false positive, consecutive single quotes
  [`${t.ldq}fill ${t.lsq}word${t.rsq} ${t.lsq}word${t.rsq}, fill.${t.rdq}`]: `${t.ldq}fill ${t.lsq}word${t.rsq} ${t.lsq}word${t.rsq}, fill.${t.rdq}`,

  // Correct placement
  [`${t.ldq}It can be a ${t.lsq}quoted fragment.${t.rsq}${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}.${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment,${t.rsq}${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment,${t.rsq}${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment!${t.rsq}${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}!${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment?${t.rsq}${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}?${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment…${t.rsq}${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment${t.rsq}…${t.rdq}`,

  [`${t.ldq}It can be a ${t.lsq}quoted fragment!${t.rsq}.${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment!${t.rsq}.${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment?${t.rsq}.${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment?${t.rsq}.${t.rdq}`,
  [`${t.ldq}It can be a ${t.lsq}quoted fragment…${t.rsq}.${t.rdq}`]: `${t.ldq}It can be a ${t.lsq}quoted fragment…${t.rsq}.${t.rdq}`,
};

const fixQuotedSentencePunctuationUnitSet = {
  // Exception. skip fixing name with regnal number
  [`${t.ldq}It was ${t.lsq}Charles IV${t.rsq},${t.rdq}`]:          `${t.ldq}It was ${t.lsq}Charles IV${t.rsq},${t.rdq}`,
  // False positives - single word (should NOT be fixed in this function)
  [`${t.ldq}Look for ${t.lsq}word.${t.rsq} In the text.${t.rdq}`]: `${t.ldq}Look for ${t.lsq}word.${t.rsq} In the text.${t.rdq}`,
  [`${t.ldq}${t.lsq}word.${t.rsq}${t.rdq}`]:                       `${t.ldq}${t.lsq}word${t.rsq}.${t.rdq}`,
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
  ...identifyUnpairedLeftSingleQuoteModuleSet,
  ...identifyUnpairedRightSingleQuoteModuleSet,
  ...identifySingleQuotePairsModuleSet,
  ...identifySingleQuotePairAroundSingleWordModuleSet,
  ...replaceSinglePrimeWSingleQuoteModuleSet,
  ...identifyResidualApostrophes,
  ...removeExtraSpaceAroundSinglePrimeSet,
  ...fixQuotedWordPunctuationModuleSet,
  ...fixQuotedSentencePunctuationModuleSet,

  [`Hej${t.directSpeechIntro} ${t.ldq}Vin mu povil, 'ta de jes' take vidil' i neviril${t.rdq}`]: `Hej${t.directSpeechIntro} ${t.ldq}Vin mu povil, ${t.lsq}ta de jes’ take vidil${t.rsq} i neviril${t.rdq}`, // tbd-single-quotes-matching
};
