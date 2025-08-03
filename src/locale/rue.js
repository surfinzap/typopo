const quotes = {
  leftDoubleQuote : 				"«",
  rightDoubleQuote : 				"»",
  leftSingleQuote : 				"‹",
  rightSingleQuote : 				"›",
};

const numbers = {
  ordinalIndicator :				"\\.",
  romanOrdinalIndicator :		"\\.",
}

const singleWordAbbreviations = [
  "ціт",
  "ст",
  "канц",
  "абз",
  "тзв",
  "Зб",
  "ч",
  "напр"

]


/*
  The list of common multi-word abbrevations that are
  stripped down of its micro-typography treatment.
*/
const multipleWordAbbreviations = [
  "т зн",
  "Е Ч",
  "евід ч",
  "род ч",
  "т ч",
  "т д",
]

export default {
  quotes,
  numbers,
  singleWordAbbreviations,
  multipleWordAbbreviations
}
