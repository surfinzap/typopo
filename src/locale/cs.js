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

  spaceAfterSymbol: {
    copyright:               base.space, // ©⎵2025
    soundRecordingCopyright: base.space, // ℗⎵2025
    numeroSign:              base.nbsp, // №⎵1234
    sectionSign:             base.nbsp, // §⎵38
    paragraphSign:           base.nbsp, // ¶⎵38
  },

  /*
    A space between a digit and a percent sign 
  */
  spaceBeforePercent: base.nbsp,

  numbers: {
    ordinalIndicator:      "\\.",
    romanOrdinalIndicator: "\\.",
  },

  /* 
    The first and the second space in the ordinal date, e.g. 1. 1. 1993
    1.{firstSpace}1.{secondSpace}1993
  */
  ordinalDate: {
    firstSpace:  base.nbsp,
    secondSpace: base.nbsp,
  },

  /* 
    (n-1) abbreviation space.
    Examples:
    J.{abbreviationSpace}Novak
    F.{abbreviationSpace}X.{nbsp}Šalda
    Ch.{abbreviationSpace}G.{abbreviationSpace}D.{nbsp}Lambert
    e.{abbreviationSpace}g.
  */
  abbreviationSpace:         base.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations:   [
    "č",
    "fol",
    "např",
    "odst",
    "par",
    "r",
    "s",
    "str",
    "sv",
    "tj",
    "tzv",
  ],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: ["hl m", "n l", "p n l", "př n l"],
};
