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
]


/*
  The list of common multi-word abbrevations that,
  stripped down of its micro-typography treatment.
*/ 
const multipleWordAbbreviations = [
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
]


export default {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations
}
