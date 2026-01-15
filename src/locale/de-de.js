import { base } from "../const.js";

export const deDE = {
  quotes: {
    openingDoubleQuote: "„",
    closingDoubleQuote: "“",
    openingSingleQuote: "‚",
    closingSingleQuote: "‘",
  },

  /* 
    …sentence: „Direct speech…“
  */
  directSpeechIntro: ":",

  /*
    Dash and spacing between words 
  */
  dashWords: {
    spaceBefore: base.hairSpace,
    dash:        base.enDash,
    spaceAfter:  base.hairSpace,
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
    abbreviation:            base.nbsp,
  },

  spaceBefore: {
    percent: base.narrowNbsp, // 12⎵%
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
    secondSpace: base.space,
  },

  /* 
    Common single-word abbreviations that are followed by a non-breaking space.
    For coding purposes, they are written here without periods.
  */
  singleWordAbbreviations: [
    "Bhf",
    "ca",
    "Di",
    "Do",
    "Fr",
    "geb",
    "gest",
    "Hbf",
    "Mi",
    "Mo",
    "Nr",
    "S",
    "Sa",
    "So",
    "St",
    "Stk",
    "u",
    "usw",
    "z",
  ],
  /*
    Common multi-word abbreviations that require proper spacing.
    For coding purposes, they are written here without periods and without correct spacing.
  */
  multipleWordAbbreviations: [
    "b w",
    "d h",
    "d i",
    "e V",
    "Ges m b H",
    "n Chr",
    "n u Z",
    "s a",
    "s o",
    "s u",
    "u a m",
    "u a",
    "u ä",
    "u Ä",
    "u dgl",
    "u U",
    "u z",
    "u zw",
    "v a",
    "v Chr",
    "v u Z",
    "z B",
    "z T",
    "z Zt",
  ],
};
