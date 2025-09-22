import { base } from "../const.js";

export const sk = {
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
  },

  spaceBefore: {
    percent: base.nbsp, // 12⎵%
  },

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
  abbreviationSpace:       base.nbsp,
  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: [
    "č",
    "cit",
    "čl",
    "fol",
    "napr",
    "odst",
    "par",
    "r",
    "roč",
    "s",
    "str",
    "sv",
    "tzv",
    "vyd",
  ],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: [
    "hl m",
    "n l",
    "p n l",
    "pr n l",
    "s a",
    "s l",
    "t č",
    "t j",
    "zodp red",
  ],
};
