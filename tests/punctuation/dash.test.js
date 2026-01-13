import {
  fixDashesBetweenWords,
  fixDashBetweenWordAndPunctuation,
  fixDashBetweenCardinalNumbers,
  fixDashBetweenPercentageRange,
  fixDashBetweenOrdinalNumbers,
  fixDash,
  fixDashBetweenWordAndBrackets,
} from "../../src/modules/punctuation/dash.js";
import { createTestSuite, transformTestSet, t } from "../test-utils.js";
import { supportedLocales } from "../../src/locale/locale.js";

const dashFalsePositives = {
  // False positive: compound words
  "e -shop": "e -shop",
  "e- shop": "e- shop",
  "e- shop": "e- shop", //nbsp
  "e- shop": "e- shop", //hairSpace
  "e- shop": "e- shop", //narrowNbsp

  // False positive: hyphen at the beginning of the paragraph
  "- she said":     "- she said",
  " - she said":    " - she said",
  "  - she said":   "  - she said",
  "\t- she said":   "\t- she said",
  "\t\t- she said": "\t\t- she said",

  "+-":                "+-",
  "{{test-variable}}": "{{test-variable}}",
  "---":               "---", // standalone hyphens for <hr> in markdown
};

const dashesBetweenWordsSet = {
  "and - she said":   `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and – she said":   `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and  –  she said": `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and — she said":   `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and  —  she said": `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and — she said":   `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`, //mixed spaces
  "and— she said":    `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`, //mixed spaces
  "and —she said":    `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,
  "and—she said":     `and${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}she said`,

  "word - word":     `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`, //nbsp
  "word - word":     `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`, //hairSpace
  "word - word":     `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`, //narrowNbsp
  "ptaškŷ -  čadič": `ptaškŷ${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}čadič`, // non-latin chars
  "хотїв - нияке":   `хотїв${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}нияке`, // non-latin chars

  "…the top 10 - and explore…":  `…the top 10${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}and explore…`,
  "…the top 10 – and explore…":  `…the top 10${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}and explore…`,
  "…the top 10 –  and explore…": `…the top 10${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}and explore…`,
  "…the top 10–and explore…":    `…the top 10${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}and explore…`,
  "…the top 10 — and explore…":  `…the top 10${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}and explore…`,

  "…like to see - 7 wonders…":  `…like to see${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}7 wonders…`,
  "…like to see – 7 wonders…":  `…like to see${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}7 wonders…`,
  "…like to see –  7 wonders…": `…like to see${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}7 wonders…`,
  "…like to see–7 wonders…":    `…like to see${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}7 wonders…`,
  "…like to see — 7 wonders…":  `…like to see${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}7 wonders…`,

  "word -- word":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word --- word": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word –– word":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word ––word":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word–– word":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word––word":    `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word ––– word": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word —— word":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word ——word":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word—— word":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word——word":    `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "word ——— word": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  // false positive
  // leave four and more dashes as they are, maybe that's intentional
  "word ---- word":  "word ---- word",
  "word ----- word": "word ----- word",
  "word –––– word":  "word –––– word",
  "word ———— word":  "word ———— word",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix a dash, an en dash, an em dash and spacing between words`,
    transformTestSet({ ...dashesBetweenWordsSet, ...dashFalsePositives }, locale),
    fixDashesBetweenWords,
    {},
    fixDash,
    locale
  );
});

const dashBetweenWordAndPunctuation = {
  "so there is a dash - ,": `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash -,":  `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash-,":   `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash -:":  `so there is a dash${t.spaceBeforeDash}${t.dash}:`,
  "so there is a dash -;":  `so there is a dash${t.spaceBeforeDash}${t.dash};`,
  "so there is a dash -.":  `so there is a dash${t.spaceBeforeDash}${t.dash}.`,
  "so there is a dash -?":  `so there is a dash${t.spaceBeforeDash}${t.dash}?`,
  "so there is a dash -!":  `so there is a dash${t.spaceBeforeDash}${t.dash}!`,
  "so there is a dash -\n": `so there is a dash${t.spaceBeforeDash}${t.dash}\n`,
  "so there is a dash – ,": `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash –,":  `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash–,":   `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash –:":  `so there is a dash${t.spaceBeforeDash}${t.dash}:`,
  "so there is a dash –;":  `so there is a dash${t.spaceBeforeDash}${t.dash};`,
  "so there is a dash –.":  `so there is a dash${t.spaceBeforeDash}${t.dash}.`,
  "so there is a dash –?":  `so there is a dash${t.spaceBeforeDash}${t.dash}?`,
  "so there is a dash –!":  `so there is a dash${t.spaceBeforeDash}${t.dash}!`,
  "so there is a dash –\n": `so there is a dash${t.spaceBeforeDash}${t.dash}\n`,
  "so there is a dash — ,": `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash —,":  `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash—,":   `so there is a dash${t.spaceBeforeDash}${t.dash},`,
  "so there is a dash —:":  `so there is a dash${t.spaceBeforeDash}${t.dash}:`,
  "so there is a dash —;":  `so there is a dash${t.spaceBeforeDash}${t.dash};`,
  "so there is a dash —.":  `so there is a dash${t.spaceBeforeDash}${t.dash}.`,
  "so there is a dash —?":  `so there is a dash${t.spaceBeforeDash}${t.dash}?`,
  "so there is a dash —!":  `so there is a dash${t.spaceBeforeDash}${t.dash}!`,
  "so there is a dash —\n": `so there is a dash${t.spaceBeforeDash}${t.dash}\n`,

  "word -- !":  `word${t.spaceBeforeDash}${t.dash}!`,
  "word --- !": `word${t.spaceBeforeDash}${t.dash}!`,
  "word –– !":  `word${t.spaceBeforeDash}${t.dash}!`,
  "word ––!":   `word${t.spaceBeforeDash}${t.dash}!`,
  "word–– !":   `word${t.spaceBeforeDash}${t.dash}!`,
  "word––!":    `word${t.spaceBeforeDash}${t.dash}!`,
  "word ––– !": `word${t.spaceBeforeDash}${t.dash}!`,
  "word —— !":  `word${t.spaceBeforeDash}${t.dash}!`,
  "word ——!":   `word${t.spaceBeforeDash}${t.dash}!`,
  "word—— !":   `word${t.spaceBeforeDash}${t.dash}!`,
  "word——!":    `word${t.spaceBeforeDash}${t.dash}!`,
  "word ——— !": `word${t.spaceBeforeDash}${t.dash}!`,

  // false positive
  // leave four and more dashes as they are, maybe that's intentional
  "word ----!":  "word ----!",
  "word -----!": "word -----!",
  "word ––––!":  "word ––––!",
  "word ————!":  "word ————!",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix dash between word and punctuation`,
    transformTestSet({ ...dashBetweenWordAndPunctuation, ...dashFalsePositives }, locale),
    fixDashBetweenWordAndPunctuation,
    {},
    fixDash,
    locale
  );
});

const dashBetweenWordAndBrackets = {
  "word - (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word -(bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word- (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word-(bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word - [bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word -[bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word- [bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word-[bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word - {bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word -{bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word- {bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word-{bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,

  "word – (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word –(bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word– (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word–(bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word – [bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word –[bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word– [bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word–[bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word – {bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word –{bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word– {bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word–{bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,

  "word — (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word —(bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word— (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word—(bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word — [bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word —[bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word— [bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word—[bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[bracket`,
  "word — {bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word —{bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word— {bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,
  "word—{bracket":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{bracket`,

  "word —   (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word -- (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word --- (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word –– (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word —— (bracket":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,
  "word ——— (bracket": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(bracket`,

  // false positives
  // leave four and more dashes as they are, maybe that's intentional
  "word ---- (bracket": "word ---- (bracket",
  "word –––– (bracket": "word –––– (bracket",
  "word ———— (bracket": "word ———— (bracket",

  //

  "bracket) - word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) -word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)- word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)-word":   `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] - word": `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] -word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]- word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]-word":   `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} - word": `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} -word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}- word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}-word":   `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "bracket) – word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) –word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)– word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)–word":   `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] – word": `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] –word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]– word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]–word":   `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} – word": `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} –word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}– word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}–word":   `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "bracket) — word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) —word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)— word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket)—word":   `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] — word": `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket] —word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]— word":  `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket]—word":   `bracket]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} — word": `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket} —word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}— word":  `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket}—word":   `bracket}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "bracket) —   word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) -- word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) --- word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) –– word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) —— word":  `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "bracket) ——— word": `bracket)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  // false positives
  // leave four and more dashes as they are, maybe that's intentional
  "bracket) ---- word": "bracket) ---- word",
  "bracket) –––– word": "bracket) –––– word",
  "bracket) ———— word": "bracket) ———— word",

  //

  "word - )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word -)":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word- )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word-)":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word - ]": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word -]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word- ]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word-]":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word - }": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word -}":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word- }":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word-}":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,

  "word – )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word –)":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word– )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word–)":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word – ]": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word –]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word– ]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word–]":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word – }": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word –}":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word– }":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word–}":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,

  "word — )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word —)":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word— )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word—)":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word — ]": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word —]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word— ]":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word—]":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}]`,
  "word — }": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word —}":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word— }":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,
  "word—}":   `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}}`,

  "word —   )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word -- )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word --- )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word –– )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word —— )":  `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,
  "word ——— )": `word${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash})`,

  // false positives
  // leave four and more dashes as they are, maybe that's intentional
  "word ----)": "word ----)",
  "word ––––)": "word ––––)",
  "word ————)": "word ————)",

  //

  "( - word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( -word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(- word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(-word":   `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ - word": `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ -word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[- word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[-word":   `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ - word": `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ -word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{- word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{-word":   `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "( – word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( –word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(– word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(–word":   `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ – word": `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ –word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[– word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[–word":   `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ – word": `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ –word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{– word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{–word":   `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "( — word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( —word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(— word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "(—word":   `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ — word": `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[ —word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[— word":  `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "[—word":   `[${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ — word": `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{ —word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{— word":  `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "{—word":   `{${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  "( —   word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( -- word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( --- word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( –– word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( —— word":  `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,
  "( ——— word": `(${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}word`,

  // false positives
  // leave four and more dashes as they are, maybe that's intentional
  "(---- word": "(---- word",
  "(–––– word": "(–––– word",
  "(———— word": "(———— word",

  //

  "word) - (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word) -(word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)- (word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)-(word":   `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word] - [word": `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word] -[word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]- [word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]-[word":   `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word} - {word": `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word} -{word":  `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}- {word":  `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}-{word":   `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,

  "word) – (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word) –(word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)– (word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)–(word":   `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word] – [word": `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word] –[word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]– [word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]–[word":   `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word} – {word": `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}– {word":  `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}–{word":   `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,

  "word) — (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word) —(word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)— (word":  `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word)—(word":   `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`,
  "word] — [word": `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word] —[word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]— [word":  `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word]—[word":   `word]${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}[word`,
  "word} — {word": `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word} —{word":  `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}— {word":  `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,
  "word}—{word":   `word}${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}{word`,

  //

  // different spacing
  "word) – (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`, // nbsp
  "word) – (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`, // hairSpace
  "word) – (word": `word)${t.spaceBeforeDash}${t.dash}${t.spaceAfterDash}(word`, // hairSpace

  // only fix spaces, but not hyphens, en dash or em dash
  "( - )":      "(-)",
  "[ - ]":      "[-]",
  "{ - }":      "{-}",
  "( – )":      "(–)",
  "[ – ]":      "[–]",
  "{ – }":      "{–}",
  "( — )":      "(—)",
  "[ — ]":      "[—]",
  "{ — }":      "{—}",
  "( -)":       "(-)",
  "[ -]":       "[-]",
  "{ -}":       "{-}",
  "( –)":       "(–)",
  "[ –]":       "[–]",
  "{ –}":       "{–}",
  "( —)":       "(—)",
  "[ —]":       "[—]",
  "{ —}":       "{—}",
  "(- )":       "(-)",
  "[- ]":       "[-]",
  "{- }":       "{-}",
  "(– )":       "(–)",
  "[– ]":       "[–]",
  "{– }":       "{–}",
  "(— )":       "(—)",
  "[— ]":       "[—]",
  "{— }":       "{—}",
  "( -- )":     "(--)",
  "( ----- )":  "(-----)",
  "( --     )": "(--)",
  "(    --  )": "(--)",
  "( --)":      "(--)",
  "(-- )":      "(--)",

  // false positives, don't fix
  "(-)":   "(-)",
  "[-]":   "[-]",
  "{-}":   "{-}",
  "(–)":   "(–)",
  "[–]":   "[–]",
  "{–}":   "{–}",
  "(—)":   "(—)",
  "[—]":   "[—]",
  "{—}":   "{—}",
  "(--)":  "(--)",
  "(––)":  "(––)",
  "(——)":  "(——)",
  "(-–—)": "(-–—)",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix dash between word and brackets`,
    transformTestSet({ ...dashBetweenWordAndBrackets, ...dashFalsePositives }, locale),
    fixDashBetweenWordAndBrackets,
    {},
    fixDash,
    locale
  );
});

const dashCardinalNumbersSet = {
  "5-6 eggs":                          "5–6 eggs",
  "15-16 eggs":                        "15–16 eggs",
  "5 -6 eggs":                         "5–6 eggs",
  "5- 6 eggs":                         "5–6 eggs",
  "5 - 6 eggs":                        "5–6 eggs",
  "5—6 eggs":                          "5–6 eggs",
  "5-12″ long":                        "5–12″ long",
  "In 5.25-10.75 range":               "In 5.25–10.75 range",
  "In 5,000.25-10,000.75 range":       "In 5,000.25–10,000.75 range",
  "v rozmedzí 5,25-10,75":             "v rozmedzí 5,25–10,75",
  "v rozmedzí 5 000,25-10 000,75":     "v rozmedzí 5 000,25–10 000,75",
  "2-3 Eier":                          "2–3 Eier",
  "2 -3 Eier":                         "2–3 Eier",
  "2- 3 Eier":                         "2–3 Eier",
  "2 - 3 Eier":                        "2–3 Eier",
  "2—3 Eier":                          "2–3 Eier",
  "im Bereich von 5.000,25-10.000,75": "im Bereich von 5.000,25–10.000,75",

  // date formats
  "2019-02-03":     "2019–02–03",
  "2019 - 02 - 03": "2019–02–03",
  "2019- 02 -03":   "2019–02–03",
  "2019-02":        "2019–02",
  "2019 -02":       "2019–02",
  "2019 - 02":      "2019–02",
  "2019- 02":       "2019–02",
  "19 - 02 - 03":   "19–02–03",
  "19- 02 -03":     "19–02–03",

  //telephone numbers
  "1–2–3":     "1–2–3", // correct
  "1 – 2 – 3": "1–2–3",
  "1– 2 –3":   "1–2–3",

  "1-2-3":     "1–2–3",
  "1 - 2 - 3": "1–2–3",
  "1- 2 -3":   "1–2–3",

  "1—2—3":     "1–2–3",
  "1 — 2 — 3": "1–2–3",
  "1— 2 —3":   "1–2–3",

  "154-123-4567": "154–123–4567",

  // multiple dashes
  "2 -- 3":  "2–3",
  "2 --- 3": "2–3",
  "2 –– 3":  "2–3",
  "2 ––– 3": "2–3",
  "2 —— 3":  "2–3",
  "2 ——— 3": "2–3",
};

createTestSuite(
  "Fix dash between cardinal numbers",
  dashCardinalNumbersSet,
  fixDashBetweenCardinalNumbers,
  {},
  fixDash,
  supportedLocales
);

const dashPercentageRangeSet = {
  "20%-30%":   "20%–30%",
  "20% -30%":  "20%–30%",
  "20% - 30%": "20%–30%",
  "20%- 30%":  "20%–30%",

  "20%–30%": "20%–30%",
  "20%—30%": "20%–30%",

  "20 %-30 %":   "20 %–30 %",
  "20 % -30 %":  "20 %–30 %",
  "20 % - 30 %": "20 %–30 %",
  "20 %- 30 %":  "20 %–30 %",

  "20 ‰ - 30 ‰": "20 ‰–30 ‰",
  "20 ‱ - 30 ‱": "20 ‱–30 ‱",

  "2 % -- 3 %":  "2 %–3 %",
  "2 % --- 3 %": "2 %–3 %",
  "2 % –– 3 %":  "2 %–3 %",
  "2 % ––– 3 %": "2 %–3 %",
  "2 % —— 3 %":  "2 %–3 %",
  "2 % ——— 3 %": "2 %–3 %",
};

createTestSuite(
  "Fix dash between percentage range",
  dashPercentageRangeSet,
  fixDashBetweenPercentageRange,
  {},
  fixDash,
  "en-us"
);

const dashOrdinalNumbersEnUsSet = {
  "1st-5th August":     "1st–5th August",
  "1st -5th August":    "1st–5th August",
  "1st- 5th August":    "1st–5th August",
  "1st - 5th August":   "1st–5th August",
  "1st -- 5th August":  "1st–5th August",
  "1st --- 5th August": "1st–5th August",
};

createTestSuite(
  "Fix dash between ordinal numbers",
  dashOrdinalNumbersEnUsSet,
  fixDashBetweenOrdinalNumbers,
  {},
  fixDash,
  "en-us"
);

const dashOrdinalNumbersOtherLocalesSet = {
  "1.-5. augusta":     "1.–5. augusta",
  "1. -5. augusta":    "1.–5. augusta",
  "1.- 5. augusta":    "1.–5. augusta",
  "1. - 5. augusta":   "1.–5. augusta",
  "1. -- 5. augusta":  "1.–5. augusta",
  "1. --- 5. augusta": "1.–5. augusta",
};

createTestSuite(
  "Fix dash between ordinal numbers",
  dashOrdinalNumbersOtherLocalesSet,
  fixDashBetweenOrdinalNumbers,
  {},
  fixDash,
  supportedLocales.filter((locale) => locale !== "en-us")
);

export const dashSet = {
  ...dashesBetweenWordsSet,
  ...dashBetweenWordAndPunctuation,
  ...dashBetweenWordAndBrackets,
  ...dashCardinalNumbersSet,
};
