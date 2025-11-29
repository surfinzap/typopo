import { base } from "../const.js";

export const rue = {
  quotes: {
    leftDoubleQuote:  "«",
    rightDoubleQuote: "»",
    leftSingleQuote:  "‹",
    rightSingleQuote: "›",
  },

  /* 
    …sentence: «Direct speech…»
  */
  directSpeechIntro: ":",

  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: base.hairSpace,
    dash:        base.emDash,
    spaceAfter:  base.hairSpace,
  },

  spaceAfter: {
    copyright:               base.nbsp, // ©⎵2025
    soundRecordingCopyright: base.nbsp, // ℗⎵2025
    numeroSign:              base.nbsp, // №⎵1234
    sectionSign:             base.narrowNbsp, // §⎵38
    paragraphSign:           base.narrowNbsp, // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation:            base.nbsp,
  },

  spaceBefore: {
    percent: base.nbsp, // 12⎵%
  },

  numbers: {
    ordinalIndicator:      "\\.",
    romanOrdinalIndicator: "\\.",
  },

  /* 
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace:  base.nbsp,
    secondSpace: base.nbsp,
  },

  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations:   ["ціт", "ст", "канц", "абз", "тзв", "Зб", "ч", "напр"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["т зн", "Е Ч", "евід ч", "род ч", "т ч", "т д"],
};
