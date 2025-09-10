const quotes = {
  leftDoubleQuote:  "“",
  rightDoubleQuote: "”",
  leftSingleQuote:  "‘",
  rightSingleQuote: "’",
};

const numbers = {
  ordinalIndicator:      "st|nd|rd|th",
  romanOrdinalIndicator: "",
};

const singleWordAbbreviations = ["p", "pp", "no", "vol"];

/*
  The list of common multi-word abbrevations that are
  stripped down of its micro-typography treatment.
*/
const multipleWordAbbreviations = ["U S", "e g", "i e", "a m", "p m"];

export const enUS = {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations,
};
