import { base } from "../const.js";

export const enUS = {
  quotes: {
    leftDoubleQuote:  "“",
    rightDoubleQuote: "”",
    leftSingleQuote:  "‘",
    rightSingleQuote: "’",
  },

  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: "",
    dash:        base.emDash,
    spaceAfter:  "",
  },

  spaceAfter: {
    copyright:               base.nbsp, // ©⎵2025
    soundRecordingCopyright: base.nbsp, // ℗⎵2025
    numeroSign:              base.nbsp, // №⎵1234
    sectionSign:             base.nbsp, // §⎵38
    paragraphSign:           base.nbsp, // ¶⎵38
    /* 
      a space after "n-1" abbreviation in abbr. sequence
      F.⎵X. Šalda, Ch.⎵G.⎵D. Lambert, e.⎵g., v.⎵u.⎵Z.
    */
    abbreviation:            "",
  },

  spaceBefore: {
    percent: "", // 12%
  },

  numbers: {
    ordinalIndicator:      "st|nd|rd|th",
    romanOrdinalIndicator: "",
  },

  /* 
    The first and the second space in the ordinal date, 
    e.g. 1. 1. 1993 → 1.{firstSpace}1.{secondSpace}1993
    Even though this is not a common date format in the U.S., it serves as a fallback for mixed language content.
  */
  ordinalDate: {
    firstSpace:  base.nbsp,
    secondSpace: base.nbsp,
  },

  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations:   ["p", "pp", "no", "vol"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["U S", "e g", "i e", "a m", "p m"],
};
