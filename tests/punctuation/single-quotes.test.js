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
import { createTestSuite, transformTestSet } from "../test-utils.js";
import { keepMarkdownCodeBlocksSet } from "./double-quotes.test.js";
import { mark } from "../../src/markers.js";

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
  "${ldq}‘word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}–‘word${rdq}": "${ldq}–’word${rdq}",
  "${ldq}—‘word${rdq}": "${ldq}—’word${rdq}",
  "${ldq}ʼword${rdq}":  "${ldq}’word${rdq}",
  "${ldq}‛word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}´word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}`word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}′word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}‹word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}›word${rdq}":  "${ldq}’word${rdq}",
};

const identifyUnpairedLeftSingleQuoteUnitSet = {
  '" \'word"': `" ${mark.lsqUnpaired}word"`,
  '" ‚word"':  `" ${mark.lsqUnpaired}word"`,
  " ‘word":    ` ${mark.lsqUnpaired}word`,
  "–‘word":    `–${mark.lsqUnpaired}word`,
  "—‘word":    `—${mark.lsqUnpaired}word`,
  " ʼword":    ` ${mark.lsqUnpaired}word`,
  " ‛word":    ` ${mark.lsqUnpaired}word`,
  " ´word":    ` ${mark.lsqUnpaired}word`,
  " `word":    ` ${mark.lsqUnpaired}word`,
  " ′word":    ` ${mark.lsqUnpaired}word`,
  " ‹word":    ` ${mark.lsqUnpaired}word`,
  " ›word":    ` ${mark.lsqUnpaired}word`,
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
  "${ldq}word'${rdq}": "${ldq}word’${rdq}",
  "${ldq}word‚${rdq}": "${ldq}word’${rdq}",
  "${ldq}word‘${rdq}": "${ldq}word’${rdq}",
  "${ldq}wordʼ${rdq}": "${ldq}word’${rdq}",
  "${ldq}word‛${rdq}": "${ldq}word’${rdq}",
  "${ldq}word´${rdq}": "${ldq}word’${rdq}",
  "${ldq}word`${rdq}": "${ldq}word’${rdq}",
  "${ldq}word′${rdq}": "${ldq}word’${rdq}",
  "${ldq}word‹${rdq}": "${ldq}word’${rdq}",
  "${ldq}word›${rdq}": "${ldq}word’${rdq}",
};

const identifyUnpairedRightSingleQuoteUnitSet = {
  "${ldq}word!'${rdq}": "${ldq}word!{{typopo__rsq--unpaired}}${rdq}",
  "${ldq}word.'${rdq}": "${ldq}word.{{typopo__rsq--unpaired}}${rdq}",
  "${ldq}word':${rdq}": "${ldq}word{{typopo__rsq--unpaired}}:${rdq}",
  "${ldq}word',${rdq}": "${ldq}word{{typopo__rsq--unpaired}},${rdq}",
  '"word\'"':           '"word{{typopo__rsq--unpaired}}"',
  '"word‚"':            '"word{{typopo__rsq--unpaired}}"',
  "word‘":              "word{{typopo__rsq--unpaired}}",
  wordʼ:                "word{{typopo__rsq--unpaired}}",
  "word‛":              "word{{typopo__rsq--unpaired}}",
  "word´":              "word{{typopo__rsq--unpaired}}",
  "word`":              "word{{typopo__rsq--unpaired}}",
  "word′":              "word{{typopo__rsq--unpaired}}",
  "word‹":              "word{{typopo__rsq--unpaired}}",
  "word›":              "word{{typopo__rsq--unpaired}}",
  "word.'":             "word.{{typopo__rsq--unpaired}}",
  "word!'":             "word!{{typopo__rsq--unpaired}}",
  "word':":             "word{{typopo__rsq--unpaired}}:",
  "word',":             "word{{typopo__rsq--unpaired}},",
  "word' ":             "word{{typopo__rsq--unpaired}} ",
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
  "He said${directSpeechIntro} ${ldq}What about 'word', is that good?${rdq}":
    "He said${directSpeechIntro} ${ldq}What about ${lsq}word${rsq}, is that good?${rdq}",

  "He said${directSpeechIntro} ${ldq}What about 'word' 'word', is that good?${rdq}":
    "He said${directSpeechIntro} ${ldq}What about ${lsq}word${rsq} ${lsq}word${rsq}, is that good?${rdq}",

  "He said${directSpeechIntro} ${ldq}What about 'word word', is that good?${rdq}":
    "He said${directSpeechIntro} ${ldq}What about ${lsq}word word,${rsq} is that good?${rdq}",

  "${ldq}double quotes 'and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes 'and single quotes’ within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes ‚and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "He said${directSpeechIntro} ${ldq}What about 'name' and 'other name'?${rdq}":
    "He said${directSpeechIntro} ${ldq}What about ${lsq}name${rsq} and ${lsq}other name${rsq}?${rdq}",

  "Within double quotes ${ldq}there are single 'quotes with mix’d punctuation,' you see.${rdq}":
    "Within double quotes ${ldq}there are single ${lsq}quotes with mix’d punctuation,${rsq} you see.${rdq}",

  "Let's test this${directSpeechIntro} ${ldq}however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said${rdq}":
    "Let’s test this${directSpeechIntro} ${ldq}however, ${lsq}quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,${rsq} he said${rdq}",

  // this case is not covered, the value is false
  // the first right single quote is falsely an apostrophe
  // the second left single quote is falsely an apostrophe
  // tbd-single-quotes-matching
  // "He said: “What about 'word word' 'word word', is that good?”":
  //   "He said: “What about ‘word word’ ’word word’, is that good?”",
};

const identifySingleQuotePairsUnitSet = {
  [`${mark.lsqUnpaired}word${mark.rsqUnpaired}`]: `${mark.lsq}word${mark.rsq}`,

  [`${mark.lsqUnpaired}word word${mark.rsqUnpaired}`]: `${mark.lsq}word word${mark.rsq}`,
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
  "'word'":                                                                   "${lsq}word${rsq}",
  "'word' 'word'":                                                            "${lsq}word${rsq} ${lsq}word${rsq}",
  "He said${directSpeechIntro} ${ldq}What about 'word', is that good?${rdq}": "He said${directSpeechIntro} ${ldq}What about ${lsq}word${rsq}, is that good?${rdq}",
  "Press 'N' to get started":                                                 "Press ${lsq}N${rsq} to get started",
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
  "He said${directSpeechIntro} ${ldq}What about 'Localhost 3000', is that good?${rdq}":
    "He said${directSpeechIntro} ${ldq}What about ${lsq}Localhost 3000,${rsq} is that good?${rdq}",

  "He said${directSpeechIntro} ${ldq}Here are 30 'bucks'${rdq}":
    "He said${directSpeechIntro} ${ldq}Here are 30 ${lsq}bucks${rsq}${rdq}",
};

const replaceSinglePrimeWSingleQuoteUnitSet = {
  [`${mark.lsqUnpaired}word${mark.singlePrime}`]: `${mark.lsq}word${mark.rsq}`,
  [`${mark.singlePrime}word${mark.rsqUnpaired}`]: `${mark.lsq}word${mark.rsq}`,
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
  "${ldq}${lsq}word.${rsq} fill${rdq}":                  "${ldq}${lsq}word${rsq}. fill${rdq}",
  "${ldq}Look for ${lsq}word.${rsq} In the text.${rdq}": "${ldq}Look for ${lsq}word${rsq}. In the text.${rdq}",
  "${ldq}Look for ${lsq}Ian.${rsq} In the text.${rdq}":  "${ldq}Look for ${lsq}Ian${rsq}. In the text.${rdq}",

  // Single word with comma
  "${ldq}${lsq}word,${rsq} fill${rdq}":                "${ldq}${lsq}word${rsq}, fill${rdq}",
  "${ldq}He said ${lsq}hello,${rsq} then left.${rdq}": "${ldq}He said ${lsq}hello${rsq}, then left.${rdq}",

  // Single word with semicolon
  "${ldq}${lsq}word;${rsq} fill${rdq}":               "${ldq}${lsq}word${rsq}; fill${rdq}",
  "${ldq}He used ${lsq}code;${rsq} it worked.${rdq}": "${ldq}He used ${lsq}code${rsq}; it worked.${rdq}",

  // Single word with colon
  "${ldq}${lsq}word:${rsq} fill${rdq}":                      "${ldq}${lsq}word${rsq}: fill${rdq}",
  "${ldq}Consider ${lsq}refactoring:${rsq} it helps.${rdq}": "${ldq}Consider ${lsq}refactoring${rsq}: it helps.${rdq}",

  //fix later
  // Contracted words
  // "${ldq}Say ${lsq}don${apos}t;${rsq} be firm.${rdq}":
  //   "${ldq}Say ${lsq}don${apos}t${rsq}; be firm.${rdq}",

  // fix later: tokenized identification of single quotes
  // Numbers
  // "${ldq}Version ${lsq}2.0.${rsq} is out.${rdq}":     "${ldq}Version ${lsq}2.0${rsq}. is out.${rdq}",
  // "${ldq}In ${lsq}2020,${rsq} things changed.${rdq}": "${ldq}In ${lsq}2020${rsq}, things changed.${rdq}",
  // "${ldq}Number ${lsq}42;${rsq} the answer.${rdq}":   "${ldq}Number ${lsq}42${rsq}; the answer.${rdq}",

  // fix later: tokenized identification of single quotes
  // Combinations with numbers and contractions (e.g., 69'ers)
  // "${ldq}The ${lsq}69${apos}ers.${rsq} were famous.${rdq}": "${ldq}The ${lsq}69${apos}ers${rsq}. were famous.${rdq}",
  // "${ldq}Those ${lsq}90${apos}s,${rsq} good times.${rdq}":  "${ldq}Those ${lsq}90${apos}s${rsq}, good times.${rdq}",

  // Hyphenated words
  "${ldq}Use ${lsq}well-known.${rsq} for clarity.${rdq}":    "${ldq}Use ${lsq}well-known${rsq}. for clarity.${rdq}",
  "${ldq}The ${lsq}state-of-the-art,${rsq} approach.${rdq}": "${ldq}The ${lsq}state-of-the-art${rsq}, approach.${rdq}",
  "${ldq}Try ${lsq}open-source;${rsq} it${apos}s free.${rdq}":
    "${ldq}Try ${lsq}open-source${rsq}; it${apos}s free.${rdq}",

  // Escaped strings
  "${ldq}${lsq}{{esc}},${rsq} fill${rdq}": "${ldq}${lsq}{{esc}}${rsq}, fill${rdq}",
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  "She said ${lsq}hello world.${rsq} and left.":  "She said ${lsq}hello world.${rsq} and left.",
  "I heard ${lsq}good morning,${rsq} from her.":  "I heard ${lsq}good morning,${rsq} from her.",
  "The ${lsq}quick brown fox;${rsq} jumps.":      "The ${lsq}quick brown fox;${rsq} jumps.",
  "The ${lsq}quick brown fox${rsq}; jumps.":      "The ${lsq}quick brown fox${rsq}; jumps.",
  "Note ${lsq}some important thing:${rsq} here.": "Note ${lsq}some important thing:${rsq} here.",

  // False positives - exclamation and question marks (should NOT be fixed)
  "The ${lsq}Wow!${rsq} was loud.":         "The ${lsq}Wow!${rsq} was loud.",
  "The ${lsq}Wow${rsq}! was loud.":         "The ${lsq}Wow${rsq}! was loud.",
  "She asked ${lsq}Why?${rsq} repeatedly.": "She asked ${lsq}Why?${rsq} repeatedly.",
  "She asked ${lsq}Why${rsq}? repeatedly.": "She asked ${lsq}Why${rsq}? repeatedly.",

  // False positives - regnal numbers
  "Byl to Karel ${lsq}IV.${rsq}, ktery": "Byl to Karel ${lsq}IV.${rsq}, ktery",

  // False positives - already correct
  "The ${lsq}word${rsq}. is correct.":     "The ${lsq}word${rsq}. is correct.",
  "He said ${lsq}hello${rsq}, then left.": "He said ${lsq}hello${rsq}, then left.",
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
  "${ldq}It can be a ${lsq}quoted fragment${rsq}. fill${rdq}": "${ldq}It can be a ${lsq}quoted fragment.${rsq} fill${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment${rsq}, fill${rdq}": "${ldq}It can be a ${lsq}quoted fragment,${rsq} fill${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment${rsq}! fill${rdq}": "${ldq}It can be a ${lsq}quoted fragment!${rsq} fill${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment${rsq}? fill${rdq}": "${ldq}It can be a ${lsq}quoted fragment?${rsq} fill${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment${rsq}… fill${rdq}": "${ldq}It can be a ${lsq}quoted fragment…${rsq} fill${rdq}",

  // move terminal punctuation (.?!…) outside when quoted fragment is at the end of a quoted sentence
  "${ldq}Sentence ${lsq}quoted fragment.${rsq}${rdq}":
    "${ldq}Sentence ${lsq}quoted fragment${rsq}.${rdq}",

  "${ldq}Sentence ${lsq}quoted fragment!${rsq}${rdq}":
    "${ldq}Sentence ${lsq}quoted fragment${rsq}!${rdq}",

  // nbsp
  "${ldq}It can be ${lsq}a banana${rsq}, right.${rdq}":
    "${ldq}It can be ${lsq}a banana,${rsq} right.${rdq}",

  // Quoted sentence
  "${ldq}fill ${lsq}Fully quoted sentence${rsq}. fill${rdq}": "${ldq}fill ${lsq}Fully quoted sentence.${rsq} fill${rdq}",
  "${ldq}fill ${lsq}Fully quoted sentence${rsq}, fill${rdq}": "${ldq}fill ${lsq}Fully quoted sentence,${rsq} fill${rdq}",
  "${ldq}fill ${lsq}Fully quoted sentence${rsq}! fill${rdq}": "${ldq}fill ${lsq}Fully quoted sentence!${rsq} fill${rdq}",
  "${ldq}fill ${lsq}Fully quoted sentence${rsq}? fill${rdq}": "${ldq}fill ${lsq}Fully quoted sentence?${rsq} fill${rdq}",
  "${ldq}fill ${lsq}Fully quoted sentence${rsq}… fill${rdq}": "${ldq}fill ${lsq}Fully quoted sentence…${rsq} fill${rdq}",

  // Less common boundaries
  "${ldq}${lsq}(Fully) quoted sentence${rsq}.${rdq}":
    "${ldq}${lsq}(Fully) quoted sentence${rsq}.${rdq}",
  "${ldq}${lsq}Fully quoted (sentence)${rsq}.${rdq}":
    "${ldq}${lsq}Fully quoted (sentence)${rsq}.${rdq}",

  // Escaped strings
  "${ldq}It can be a ${lsq}{{esc}} {{esc}}${rsq}.${rdq}":
    "${ldq}It can be a ${lsq}{{esc}} {{esc}}${rsq}.${rdq}",

  // Colon / semicolon should be placed outside the quotes
  "${ldq}${lsq}quoted fragment:${rsq} sentence continues${rdq}": "${ldq}${lsq}quoted fragment${rsq}: sentence continues${rdq}",
  "${ldq}${lsq}quoted fragment;${rsq} sentence continues${rdq}": "${ldq}${lsq}quoted fragment${rsq}; sentence continues${rdq}",

  "${ldq}${lsq}(quoted) fragment:${rsq} sentence continues${rdq}": "${ldq}${lsq}(quoted) fragment${rsq}: sentence continues${rdq}",
  "${ldq}${lsq}quoted (fragment);${rsq} sentence continues${rdq}": "${ldq}${lsq}quoted (fragment)${rsq}; sentence continues${rdq}",

  // false positive, consecutive single quotes
  "${ldq}fill ${lsq}word${rsq} ${lsq}word${rsq}, fill.${rdq}":
    "${ldq}fill ${lsq}word${rsq} ${lsq}word${rsq}, fill.${rdq}",

  // Correct placement
  "${ldq}It can be a ${lsq}quoted fragment.${rsq}${rdq}": "${ldq}It can be a ${lsq}quoted fragment${rsq}.${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment,${rsq}${rdq}": "${ldq}It can be a ${lsq}quoted fragment,${rsq}${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment!${rsq}${rdq}": "${ldq}It can be a ${lsq}quoted fragment${rsq}!${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment?${rsq}${rdq}": "${ldq}It can be a ${lsq}quoted fragment${rsq}?${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment…${rsq}${rdq}":
    "${ldq}It can be a ${lsq}quoted fragment${rsq}…${rdq}",

  "${ldq}It can be a ${lsq}quoted fragment!${rsq}.${rdq}": "${ldq}It can be a ${lsq}quoted fragment!${rsq}.${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment?${rsq}.${rdq}": "${ldq}It can be a ${lsq}quoted fragment?${rsq}.${rdq}",
  "${ldq}It can be a ${lsq}quoted fragment…${rsq}.${rdq}": "${ldq}It can be a ${lsq}quoted fragment…${rsq}.${rdq}",
};

const fixQuotedSentencePunctuationUnitSet = {
  // Exception. skip fixing name with regnal number
  "${ldq}It was ${lsq}Charles IV${rsq},${rdq}":          "${ldq}It was ${lsq}Charles IV${rsq},${rdq}",
  // False positives - single word (should NOT be fixed in this function)
  "${ldq}Look for ${lsq}word.${rsq} In the text.${rdq}": "${ldq}Look for ${lsq}word.${rsq} In the text.${rdq}",
  "${ldq}${lsq}word.${rsq}${rdq}":                       "${ldq}${lsq}word${rsq}.${rdq}",
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

  "Hej${directSpeechIntro} ${ldq}Vin mu povil, 'ta de jes' take vidil' i neviril${rdq}":
    "Hej${directSpeechIntro} ${ldq}Vin mu povil, ${lsq}ta de jes’ take vidil${rsq} i neviril${rdq}", // tbd-single-quotes-matching
};
