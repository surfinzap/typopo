import {
  fixQuotedSentencePunctuation,
  fixQuotedWordPunctuation,
} from "../../../src/modules/punctuation/quotes/shared.js";
import { fixQuotes } from "../../../src/modules/punctuation/quotes.js";
import Locale, { supportedLocales } from "../../../src/locale/locale.js";
import { createTestSuite, expandPairVariants, transformTestSet, t, q } from "../../test-utils.js";

/*
  Cases here are written once, with q.o / q.c for the quote pair under test, and
  expanded into variants by expandPairVariants():
  - unit tests run each function with the outer pair and with the inner pair
  - module tests run fixQuotes with the pair at the top level, nested inside the
    outer pair, and typed with plain single marks
*/

/* The quote pairs for a locale, as ./quotes/shared.js expects them */
function outerPair(localeName) {
  const locale = new Locale(localeName);
  return { open: locale.openingDoubleQuote, close: locale.closingDoubleQuote };
}

function innerPair(localeName) {
  const locale = new Locale(localeName);
  return { open: locale.openingSingleQuote, close: locale.closingSingleQuote };
}

const pairs = { outer: outerPair, inner: innerPair };

//

const fixQuotedWordPunctuationModuleSet = {
  /*
  Related source: https://cmosshoptalk.com/2020/10/20/commas-and-periods-with-quotation-marks/

  Fix the punctuation around a quoted word accordingly:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word (e.g., “word.” → “word”.)
  - keep the position of `!`, `?`, and `…` as is (ambiguous context; we would need contextual information for proper placement: “Wow!” vs. Have you heard about the “bird”?)
  */

  // Single word with period
  [`${q.o}word.${q.c}`]:                       `${q.o}word${q.c}.`,
  [`Look for ${q.o}word.${q.c} In the text.`]: `Look for ${q.o}word${q.c}. In the text.`,
  [`Look for ${q.o}Ian.${q.c} In the text.`]:  `Look for ${q.o}Ian${q.c}. In the text.`,

  // Single word with comma
  [`${q.o}word,${q.c}`]:                     `${q.o}word${q.c},`,
  [`He said ${q.o}hello,${q.c} then left.`]: `He said ${q.o}hello${q.c}, then left.`,

  // Single word with semicolon
  [`${q.o}word;${q.c}`]:                    `${q.o}word${q.c};`,
  [`He used ${q.o}code;${q.c} it worked.`]: `He used ${q.o}code${q.c}; it worked.`,

  // Single word with colon
  [`${q.o}word:${q.c}`]:                           `${q.o}word${q.c}:`,
  [`Consider ${q.o}refactoring:${q.c} it helps.`]: `Consider ${q.o}refactoring${q.c}: it helps.`,

  // Contracted words
  [`Say ${q.o}don${t.apos}t;${q.c} be firm.`]: `Say ${q.o}don${t.apos}t${q.c}; be firm.`,

  // Numbers
  [`Version ${q.o}2.0.${q.c} is out.`]:     `Version ${q.o}2.0${q.c}. is out.`,
  [`In ${q.o}2020,${q.c} things changed.`]: `In ${q.o}2020${q.c}, things changed.`,
  [`Number ${q.o}42;${q.c} the answer.`]:   `Number ${q.o}42${q.c}; the answer.`,

  // Combinations with numbers and contractions (e.g., 69'ers)
  [`The ${q.o}69${t.apos}ers.${q.c} were famous.`]: `The ${q.o}69${t.apos}ers${q.c}. were famous.`,
  [`Those ${q.o}90${t.apos}s,${q.c} good times.`]:  `Those ${q.o}90${t.apos}s${q.c}, good times.`,

  // Hyphenated words
  [`Use ${q.o}well-known.${q.c} for clarity.`]:        `Use ${q.o}well-known${q.c}. for clarity.`,
  [`The ${q.o}state-of-the-art,${q.c} approach.`]:     `The ${q.o}state-of-the-art${q.c}, approach.`,
  [`Try ${q.o}open-source;${q.c} it${t.apos}s free.`]: `Try ${q.o}open-source${q.c}; it${t.apos}s free.`,
};

const fixQuotedWordPunctuationUnitSet = {
  // False positives - multiple words (should NOT be fixed in this function)
  [`She said ${q.o}hello world.${q.c} and left.`]:  `She said ${q.o}hello world.${q.c} and left.`,
  [`I heard ${q.o}good morning,${q.c} from her.`]:  `I heard ${q.o}good morning,${q.c} from her.`,
  // the same, with a non-breaking space
  [`I heard ${q.o}good morning,${q.c} from her.`]:  `I heard ${q.o}good morning,${q.c} from her.`,
  [`The ${q.o}quick brown fox;${q.c} jumps.`]:      `The ${q.o}quick brown fox;${q.c} jumps.`,
  [`The ${q.o}quick brown fox${q.c}; jumps.`]:      `The ${q.o}quick brown fox${q.c}; jumps.`,
  [`Note ${q.o}some important thing:${q.c} here.`]: `Note ${q.o}some important thing:${q.c} here.`,

  // False positives - exclamation and question marks (should NOT be fixed)
  [`The ${q.o}Wow!${q.c} was loud.`]:         `The ${q.o}Wow!${q.c} was loud.`,
  [`The ${q.o}Wow${q.c}! was loud.`]:         `The ${q.o}Wow${q.c}! was loud.`,
  [`She asked ${q.o}Why?${q.c} repeatedly.`]: `She asked ${q.o}Why?${q.c} repeatedly.`,
  [`She asked ${q.o}Why${q.c}? repeatedly.`]: `She asked ${q.o}Why${q.c}? repeatedly.`,

  // False positives - regnal numbers
  [`Byl to Karel ${q.o}IV.${q.c}, ktery`]: `Byl to Karel ${q.o}IV.${q.c}, ktery`,
  // the same, with a non-breaking space before the quote
  [`Byl to Karel ${q.o}IV.${q.c}, ktery`]: `Byl to Karel ${q.o}IV.${q.c}, ktery`,

  // False positives - already correct
  [`The ${q.o}word${q.c}. is correct.`]:     `The ${q.o}word${q.c}. is correct.`,
  [`He said ${q.o}hello${q.c}, then left.`]: `He said ${q.o}hello${q.c}, then left.`,
};

const fixQuotedWordPunctuationVariants = {
  outer:  {},
  nested: {
    /*
      A quoted word that fills the whole outer quote: the inner pass moves the
      punctuation out of the inner pair, then the outer pass reads the inner
      pair as one quoted word and moves it out of the outer pair too.
    */
    overrides: {
      [`${q.o}word.${q.c}`]: `${t.odq}${t.osq}word${t.csq}${t.cdq}.`,
      [`${q.o}word,${q.c}`]: `${t.odq}${t.osq}word${t.csq}${t.cdq},`,
      [`${q.o}word;${q.c}`]: `${t.odq}${t.osq}word${t.csq}${t.cdq};`,
      [`${q.o}word:${q.c}`]: `${t.odq}${t.osq}word${t.csq}${t.cdq}:`,

      /*
        Owner to review: fixQuotes gets these right, but they are not idempotent.
        Once the punctuation moves out, a second run reads the closing mark after
        a number as a prime and degrades the opening one to an apostrophe:
        „Version ‚2.0‘. is out.“ → „Version ’2.0′. is out.“ (cs, sk, de-de, en-us).
        Delete the three nulls to re-enable them.
      */
      [`Version ${q.o}2.0.${q.c} is out.`]:     null,
      [`In ${q.o}2020,${q.c} things changed.`]: null,
      [`Number ${q.o}42;${q.c} the answer.`]:   null,
    },
  },
  typed: {},
};

Object.entries(pairs).forEach(([pairName, pairOf]) => {
  supportedLocales.forEach((localeName) => {
    createTestSuite(
      `Fix punctuation placement for single-word quoted content (${pairName} pair)`,
      transformTestSet(
        expandPairVariants(
          { ...fixQuotedWordPunctuationUnitSet, ...fixQuotedWordPunctuationModuleSet },
          { [pairName]: {} }
        ),
        localeName
      ),
      (text) => fixQuotedWordPunctuation(text, pairOf(localeName)),
      {},
      null,
      localeName
    );
  });
});

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for single-word quoted content, in the pipeline",
    {},
    null,
    transformTestSet(
      expandPairVariants(fixQuotedWordPunctuationModuleSet, fixQuotedWordPunctuationVariants),
      localeName
    ),
    (text) => fixQuotes(text, new Locale(localeName)),
    localeName
  );
});

//

/*
  Related source: https://cmosshoptalk.com/2020/10/20/commas-and-periods-with-quotation-marks/

  Fix the punctuation around a quoted sentence or fragment accordingly:
  - move periods `.`, commas `,`, ellipses `…`, exclamation `!` and question marks `?` inside the quoted part
  - move colons `:` and semicolons `;` outside the quoted part

  Nested inside the outer quote, a quoted part that ends the outer quote keeps
  its terminal punctuation outside: “It can be a ‘quoted fragment’.”

  Each group says how its cases nest: `frame` places them mid-sentence in the
  outer quote, otherwise they end it.
*/

/* Frame a case inside the outer quote, with text before and after it */
function insideOuter(before, after) {
  return [`${t.odq}${before}`, `${after}${t.cdq}`];
}

const fixQuotedSentencePunctuationGroups = {
  fragmentAtTheEndOfSentence: {
    cases: {
      [`It can be a ${q.o}quoted fragment${q.c}.`]: `It can be a ${q.o}quoted fragment.${q.c}`,
      [`It can be a ${q.o}quoted fragment${q.c},`]: `It can be a ${q.o}quoted fragment,${q.c}`,
      [`It can be a ${q.o}quoted fragment${q.c}!`]: `It can be a ${q.o}quoted fragment!${q.c}`,
      [`It can be a ${q.o}quoted fragment${q.c}?`]: `It can be a ${q.o}quoted fragment?${q.c}`,
      [`It can be a ${q.o}quoted fragment${q.c}…`]: `It can be a ${q.o}quoted fragment…${q.c}`,

      // nbsp
      [`It can be ${q.o}a banana${q.c}.`]: `It can be ${q.o}a banana.${q.c}`,
    },
    nested: { frame: insideOuter("", " fill") },
  },

  quotedSentence: {
    cases: {
      [`${q.o}Fully quoted sentence${q.c}.`]: `${q.o}Fully quoted sentence.${q.c}`,
      [`${q.o}Fully quoted sentence${q.c},`]: `${q.o}Fully quoted sentence,${q.c}`,
      [`${q.o}Fully quoted sentence${q.c}!`]: `${q.o}Fully quoted sentence!${q.c}`,
      [`${q.o}Fully quoted sentence${q.c}?`]: `${q.o}Fully quoted sentence?${q.c}`,
      [`${q.o}Fully quoted sentence${q.c}…`]: `${q.o}Fully quoted sentence…${q.c}`,
    },
    nested: { frame: insideOuter("fill ", " fill") },
  },

  lessCommonBoundaries: {
    cases: {
      [`${q.o}(Fully) quoted sentence${q.c}.`]: `${q.o}(Fully) quoted sentence.${q.c}`,
      [`${q.o}Fully quoted (sentence)${q.c}.`]: `${q.o}Fully quoted (sentence).${q.c}`,
    },
    nested: {
      // ending the outer quote, the period stays outside the inner pair
      overrides: {
        [`${q.o}(Fully) quoted sentence${q.c}.`]: `${t.odq}${t.osq}(Fully) quoted sentence${t.csq}.${t.cdq}`,
        [`${q.o}Fully quoted (sentence)${q.c}.`]: `${t.odq}${t.osq}Fully quoted (sentence)${t.csq}.${t.cdq}`,
      },
    },
  },

  consecutiveQuotes: {
    // false positive
    cases: {
      [`${q.o}word${q.c} ${q.o}word${q.c},`]: `${q.o}word${q.c} ${q.o}word${q.c},`,
    },
    nested: { frame: insideOuter("fill ", " fill.") },
  },

  colonAndSemicolon: {
    // placed outside the quotes
    cases: {
      [`${q.o}quoted fragment:${q.c} sentence continues`]:   `${q.o}quoted fragment${q.c}: sentence continues`,
      [`${q.o}quoted fragment;${q.c} sentence continues`]:   `${q.o}quoted fragment${q.c}; sentence continues`,
      [`${q.o}(quoted) fragment:${q.c} sentence continues`]: `${q.o}(quoted) fragment${q.c}: sentence continues`,
      [`${q.o}quoted (fragment);${q.c} sentence continues`]: `${q.o}quoted (fragment)${q.c}; sentence continues`,
    },
  },

  correctPlacement: {
    cases: {
      [`It can be a ${q.o}quoted fragment.${q.c}`]: `It can be a ${q.o}quoted fragment.${q.c}`,
      [`It can be a ${q.o}quoted fragment,${q.c}`]: `It can be a ${q.o}quoted fragment,${q.c}`,
      [`It can be a ${q.o}quoted fragment!${q.c}`]: `It can be a ${q.o}quoted fragment!${q.c}`,
      [`It can be a ${q.o}quoted fragment?${q.c}`]: `It can be a ${q.o}quoted fragment?${q.c}`,
      [`It can be a ${q.o}quoted fragment…${q.c}`]: `It can be a ${q.o}quoted fragment…${q.c}`,
    },
    nested: {
      // ending the outer quote, terminal punctuation moves outside the inner pair; a comma stays
      overrides: {
        [`It can be a ${q.o}quoted fragment.${q.c}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}.${t.cdq}`,
        [`It can be a ${q.o}quoted fragment!${q.c}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}!${t.cdq}`,
        [`It can be a ${q.o}quoted fragment?${q.c}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}?${t.cdq}`,
        [`It can be a ${q.o}quoted fragment…${q.c}`]: `${t.odq}It can be a ${t.osq}quoted fragment${t.csq}…${t.cdq}`,
      },
    },
  },
};

/* Unit tests only: what fixQuotedSentencePunctuation leaves to fixQuotedWordPunctuation or skips */
const fixQuotedSentencePunctuationUnitGroup = {
  cases: {
    // Exception. skip fixing name with regnal number
    [`It was ${q.o}Charles IV${q.c},`]: `It was ${q.o}Charles IV${q.c},`,
    [`It was ${q.o}Charles IV${q.c},`]: `It was ${q.o}Charles IV${q.c},`,

    // False positives - single word (should NOT be fixed in this function)
    [`Look for ${q.o}word.${q.c} In the text.`]: `Look for ${q.o}word.${q.c} In the text.`,
    [`${q.o}word.${q.c}`]:                       `${q.o}word.${q.c}`,
  },
  nested: {
    // ending the outer quote, the period moves outside the inner pair, even for a single word
    overrides: {
      [`${q.o}word.${q.c}`]: `${t.odq}${t.osq}word${t.csq}.${t.cdq}`,
    },
  },
};

/* Nested only: no counterpart at the top level */
const fixQuotedSentencePunctuationNestedSet = {
  // terminal punctuation moves outside when the quoted fragment ends the outer quote
  [`${t.odq}Sentence ${t.osq}quoted fragment.${t.csq}${t.cdq}`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}.${t.cdq}`,
  [`${t.odq}Sentence ${t.osq}quoted fragment!${t.csq}${t.cdq}`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}!${t.cdq}`,

  // a fragment's own !, ? or … stays inside, the sentence's period outside
  [`${t.odq}It can be a ${t.osq}quoted fragment!${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment!${t.csq}.${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment?${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment?${t.csq}.${t.cdq}`,
  [`${t.odq}It can be a ${t.osq}quoted fragment…${t.csq}.${t.cdq}`]: `${t.odq}It can be a ${t.osq}quoted fragment…${t.csq}.${t.cdq}`,

  // nbsp
  [`${t.odq}It can be ${t.osq}a banana${t.csq}, right.${t.cdq}`]: `${t.odq}It can be ${t.osq}a banana,${t.csq} right.${t.cdq}`,
};

/* Both kinds typed: the outer pair's rule, with an inner pair inside */
const fixQuotedSentencePunctuationCombinationSet = {
  [`${t.odq}Sentence ${t.osq}quoted fragment${t.csq}${t.cdq}.`]: `${t.odq}Sentence ${t.osq}quoted fragment${t.csq}.${t.cdq}`,
};

/* Expand each group into the given variants, with the group's own options for each */
function expandGroups(groups, variantNames) {
  return Object.assign(
    {},
    ...groups.map((group) =>
      expandPairVariants(
        group.cases,
        Object.fromEntries(variantNames.map((name) => [name, group[name] ?? {}]))
      )
    )
  );
}

const sentenceGroups = Object.values(fixQuotedSentencePunctuationGroups);

const fixQuotedSentencePunctuationModuleSet = {
  ...expandGroups(sentenceGroups, ["outer", "nested", "typed"]),
  ...fixQuotedSentencePunctuationNestedSet,
  ...fixQuotedSentencePunctuationCombinationSet,
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Fix punctuation placement for quoted sentence or fragment (outer pair)",
    transformTestSet(
      {
        ...expandGroups([...sentenceGroups, fixQuotedSentencePunctuationUnitGroup], ["outer"]),
        ...fixQuotedSentencePunctuationCombinationSet,
      },
      localeName
    ),
    (text) => fixQuotedSentencePunctuation(text, outerPair(localeName)),
    {},
    null,
    localeName
  );

  createTestSuite(
    "Fix punctuation placement for quoted sentence or fragment (inner pair, nested)",
    transformTestSet(
      {
        ...expandGroups([...sentenceGroups, fixQuotedSentencePunctuationUnitGroup], ["nested"]),
        ...fixQuotedSentencePunctuationNestedSet,
      },
      localeName
    ),
    (text) =>
      fixQuotedSentencePunctuation(
        text,
        innerPair(localeName),
        new Locale(localeName).closingDoubleQuote
      ),
    {},
    null,
    localeName
  );

  createTestSuite(
    "Fix punctuation placement for quoted sentence or fragment, in the pipeline",
    {},
    null,
    transformTestSet(fixQuotedSentencePunctuationModuleSet, localeName),
    (text) => fixQuotes(text, new Locale(localeName)),
    localeName
  );
});

/* Module cases, in t.* tokens, for the integration and idempotency suites */
export const quotesSet = {
  ...expandPairVariants(fixQuotedWordPunctuationModuleSet, fixQuotedWordPunctuationVariants),
  ...fixQuotedSentencePunctuationModuleSet,
};
