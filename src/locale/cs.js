import { base } from "../const.js";

export const cs = {
  quotes: {
    leftDoubleQuote:  "„",
    rightDoubleQuote: "“",
    leftSingleQuote:  "‚",
    rightSingleQuote: "‘",
  },

  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: base.nbsp,
    dash:        base.enDash,
    spaceAfter:  base.space,
  },

  spaceAfter: {
    copyright:               base.space, // ©⎵2025
    soundRecordingCopyright: base.space, // ℗⎵2025
    numeroSign:              base.nbsp, // №⎵1234
    sectionSign:             base.nbsp, // §⎵38
    paragraphSign:           base.nbsp, // ¶⎵38
    /* 
      a space after (n-1) abbreviation
      the last space is always {nbsp}
      F.⎵X.{nbsp}Šalda, Ch.⎵G.⎵D.{nbsp}Lambert, 
      e.⎵g., v.⎵u.⎵Z.
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
  singleWordAbbreviations: ["č", "fol", "např", "odst", "par", "r", "s", "str", "sv", "tj", "tzv"],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"],
};
