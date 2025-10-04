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
  swapSingleQuotesAndTerminalPunctuation,
  removeExtraSpaceAroundSinglePrime,
  fixSingleQuotesPrimesAndApostrophes,
} from "../../src/modules/punctuation/single-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { describe, it, expect } from "vitest";
import { createTestSuite, transformTestSet } from "../test-utils.js";
import { keepMarkdownCodeBlocksSet } from "./double-quotes.test.js";

const configIgnoreMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: false,
};

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
  '" \'word"': '" {{typopo__lsq--unpaired}}word"',
  '" ‚word"':  '" {{typopo__lsq--unpaired}}word"',
  " ‘word":    " {{typopo__lsq--unpaired}}word",
  "–‘word":    "–{{typopo__lsq--unpaired}}word",
  "—‘word":    "—{{typopo__lsq--unpaired}}word",
  " ʼword":    " {{typopo__lsq--unpaired}}word",
  " ‛word":    " {{typopo__lsq--unpaired}}word",
  " ´word":    " {{typopo__lsq--unpaired}}word",
  " `word":    " {{typopo__lsq--unpaired}}word",
  " ′word":    " {{typopo__lsq--unpaired}}word",
  " ‹word":    " {{typopo__lsq--unpaired}}word",
  " ›word":    " {{typopo__lsq--unpaired}}word",
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
  "${ldq}word'${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word‚${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word‘${rdq}":  "${ldq}word’${rdq}",
  "${ldq}wordʼ${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word‛${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word´${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word`${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word′${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word‹${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word›${rdq}":  "${ldq}word’${rdq}",
  "${ldq}word.'${rdq}": "${ldq}word.’${rdq}",
  "${ldq}word!'${rdq}": "${ldq}word!’${rdq}",
  "${ldq}word':${rdq}": "${ldq}word’:${rdq}",
  "${ldq}word',${rdq}": "${ldq}word’,${rdq}",
};

const identifyUnpairedRightSingleQuoteUnitSet = {
  '"word\'"': '"word{{typopo__rsq--unpaired}}"',
  '"word‚"':  '"word{{typopo__rsq--unpaired}}"',
  "word‘":    "word{{typopo__rsq--unpaired}}",
  wordʼ:      "word{{typopo__rsq--unpaired}}",
  "word‛":    "word{{typopo__rsq--unpaired}}",
  "word´":    "word{{typopo__rsq--unpaired}}",
  "word`":    "word{{typopo__rsq--unpaired}}",
  "word′":    "word{{typopo__rsq--unpaired}}",
  "word‹":    "word{{typopo__rsq--unpaired}}",
  "word›":    "word{{typopo__rsq--unpaired}}",
  "word.'":   "word.{{typopo__rsq--unpaired}}",
  "word!'":   "word!{{typopo__rsq--unpaired}}",
  "word':":   "word{{typopo__rsq--unpaired}}:",
  "word',":   "word{{typopo__rsq--unpaired}},",
  "word' ":   "word{{typopo__rsq--unpaired}} ",
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
  "He said: ${ldq}What about 'word', is that good?${rdq}":
    "He said: ${ldq}What about ${lsq}word${rsq}, is that good?${rdq}",

  "He said: ${ldq}What about 'word' 'word', is that good?${rdq}":
    "He said: ${ldq}What about ${lsq}word${rsq} ${lsq}word${rsq}, is that good?${rdq}",

  "He said: ${ldq}What about 'word word', is that good?${rdq}":
    "He said: ${ldq}What about ${lsq}word word${rsq}, is that good?${rdq}",

  "${ldq}double quotes 'and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes 'and single quotes’ within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes ‚and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "He said: ${ldq}What about 'name' and 'other name'?${rdq}":
    "He said: ${ldq}What about ${lsq}name${rsq} and ${lsq}other name${rsq}?${rdq}",

  "Within double quotes ${ldq}there are single 'quotes with mix’d punctuation', you see${rdq}.":
    "Within double quotes ${ldq}there are single ${lsq}quotes with mix’d punctuation${rsq}, you see${rdq}.",

  "Let's test this: ${ldq}however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said${rdq}":
    "Let’s test this: ${ldq}however, ${lsq}quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,${rsq} he said${rdq}",

  // this case is not covered, the value is false
  // the first right single quote is falsely an apostrophe
  // the second left single quote is falsely an apostrophe
  // tbd-single-quotes-matching
  // "He said: “What about 'word word' 'word word', is that good?”":
  //   "He said: “What about ‘word word’ ’word word’, is that good?”",
};

const identifySingleQuotePairsUnitSet = {
  "{{typopo__lsq--unpaired}}word{{typopo__rsq--unpaired}}": "{{typopo__lsq}}word{{typopo__rsq}}",

  "{{typopo__lsq--unpaired}}word word{{typopo__rsq--unpaired}}":
    "{{typopo__lsq}}word word{{typopo__rsq}}",
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
  "'word'":                                                "${lsq}word${rsq}",
  "'word' 'word'":                                         "${lsq}word${rsq} ${lsq}word${rsq}",
  "He said: ${ldq}What about 'word', is that good?${rdq}": "He said: ${ldq}What about ${lsq}word${rsq}, is that good?${rdq}",
  "Press 'N' to get started":                              "Press ${lsq}N${rsq} to get started",
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
  "He said: ${ldq}What about 'Localhost 3000', is that good?${rdq}":
    "He said: ${ldq}What about ${lsq}Localhost 3000${rsq}, is that good?${rdq}",

  "He said: ${ldq}Here are 30 'bucks'${rdq}": "He said: ${ldq}Here are 30 ${lsq}bucks${rsq}${rdq}",
};

const replaceSinglePrimeWSingleQuoteUnitSet = {
  "{{typopo__lsq--unpaired}}word{{typopo__single-prime}}": "{{typopo__lsq}}word{{typopo__rsq}}",

  "{{typopo__single-prime}}word{{typopo__rsq--unpaired}}": "{{typopo__lsq}}word{{typopo__rsq}}",
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

const swapSingleQuotesAndTerminalPunctuationSet = {
  // quoted part at the
  // end of a sentence
  // end of a paragraph
  "Sometimes it can be only a ${lsq}quoted part.${rsq}":             "Sometimes it can be only a ${lsq}quoted part${rsq}.",
  "Sometimes it can be only a ${lsq}quoted${rsq} ${lsq}part.${rsq}": "Sometimes it can be only a ${lsq}quoted${rsq} ${lsq}part${rsq}.",
  "${lsq}A whole sentence.${rsq} Only a ${lsq}quoted part.${rsq}":   "${lsq}A whole sentence.${rsq} Only a ${lsq}quoted part${rsq}.",

  "Is it ${lsq}Amores Perros${rsq}?": "Is it ${lsq}Amores Perros${rsq}?",
  "Look for ${lsq}Anguanga${rsq}.":   "Look for ${lsq}Anguanga${rsq}.",

  // quoted part at the
  // end of a sentence
  // middle of a paragraph
  "a ${lsq}quoted part.${rsq} A ${lsq}quoted part.${rsq}":         "a ${lsq}quoted part${rsq}. A ${lsq}quoted part${rsq}.",
  "Only a ${lsq}quoted part.${rsq} ${lsq}A whole sentence.${rsq}": "Only a ${lsq}quoted part${rsq}. ${lsq}A whole sentence.${rsq}",

  // quoted part in the middle of a sentence
  // toto tu je asi zbytocny test
  "Only a ${lsq}quoted part${rsq} in a sentence. ${lsq}A whole sentence.${rsq}":
    "Only a ${lsq}quoted part${rsq} in a sentence. ${lsq}A whole sentence.${rsq}",

  // place punctuation within a quoted sentence that’s in the middle of the sentence.
  "Ask ${lsq}What’s going on in here${rsq}? so you can dig deeper.":
    "Ask ${lsq}What’s going on in here?${rsq} so you can dig deeper.",

  "Before you ask the ${lsq}How often…${rsq} question":
    "Before you ask the ${lsq}How often…${rsq} question",

  "${lsq}…example${rsq}":     "${lsq}…example${rsq}",
  "abc ${lsq}…example${rsq}": "abc ${lsq}…example${rsq}",

  // place punctuation within a quoted sentence
  "He was ok. ${lsq}He was ok${rsq}.":            "He was ok. ${lsq}He was ok.${rsq}",
  "He was ok. ${lsq}He was ok${rsq}. He was ok.": "He was ok. ${lsq}He was ok.${rsq} He was ok.",
  "He was ok? ${lsq}He was ok${rsq}.":            "He was ok? ${lsq}He was ok.${rsq}",

  // swap a right quote and terminal punctuation for the whole sentence
  "${lsq}He was ok${rsq}.":            "${lsq}He was ok.${rsq}",
  "${lsq}He was ok${rsq}?":            "${lsq}He was ok?${rsq}",
  "${lsq}He was ok${rsq}. He was ok.": "${lsq}He was ok.${rsq} He was ok.",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Swap single quotes and terminal punctuation for a quoted part",
    transformTestSet(swapSingleQuotesAndTerminalPunctuationSet, localeName),
    (text) => swapSingleQuotesAndTerminalPunctuation(text, new Locale(localeName)),
    {},
    null,
    // (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)), // tbd-swapping-quotes
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
  // ...swapSingleQuotesAndTerminalPunctuationSet, tbd-swapping-quotes

  "Hej: ${ldq}Vin mu povil, 'ta de jes' take vidil' i neviril${rdq}":
    "Hej: ${ldq}Vin mu povil, ${lsq}ta de jes’ take vidil${rsq} i neviril${rdq}", // tbd-single-quotes-matching
};

describe("Single quotes (module test) ", () => {
  supportedLocales.forEach((localeName) => {
    const testCase = transformTestSet(singleQuotesSet, localeName);

    Object.keys(testCase).forEach((key) => {
      it(`module test, locale: (${localeName})`, () => {
        expect(
          fixSingleQuotesPrimesAndApostrophes(
            key,
            new Locale(localeName),
            configIgnoreMarkdownCodeBlocks
          )
        ).toBe(testCase[key]);
      });
    });
  });
});
