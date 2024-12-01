const quotes = {
  leftDoubleQuote : 				"„",
  rightDoubleQuote : 				"“",
  leftSingleQuote : 				"‚",
  rightSingleQuote : 				"‘",
};

const numbers = {
  ordinalIndicator :				"\\.",
  romanOrdinalIndicator :		"\\.",
}

const singleWordAbbreviations = [
  "č",
  "s",
  "fol",
  "str",
  "r",
  "par",
  "odst",
  "např",
  "sv",
  "tj",
  "tzv",
]

/*
  The list of common multi-word abbrevations that,
  stripped down of its micro-typography treatment.
*/
const multipleWordAbbreviations = [
  "hl m",
  "n l",
  "p n l",
  "př n l",

]

export default {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations
}
