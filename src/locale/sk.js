const quotes = {
  leftDoubleQuote:  "„",
  rightDoubleQuote: "“",
  leftSingleQuote:  "‚",
  rightSingleQuote: "‘",
};

const numbers = {
  ordinalIndicator:      "\\.",
  romanOrdinalIndicator: "\\.",
};

const singleWordAbbreviations = [
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
];

/*
  The list of common multi-word abbrevations that are
  stripped down of its micro-typography treatment.
*/
const multipleWordAbbreviations = [
  "hl m",
  "n l",
  "p n l",
  "pr n l",
  "s a",
  "s l",
  "t j",
  "zodp red",
  "t č",
];

export const sk = {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations,
};
