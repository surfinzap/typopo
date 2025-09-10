import { base } from "../const.js";

export const sk = {
  quotes: {
    leftDoubleQuote:  "„",
    rightDoubleQuote: "“",
    leftSingleQuote:  "‚",
    rightSingleQuote: "‘",
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
    "s",
    "fol",
    "str",
    "r",
    "par",
    "odst",
    "napr",
    "sv",
    "tzv",
    "čl",
    "cit",
    "roč",
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
    "t j",
    "zodp red",
    "t č",
  ],
};
