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

const abbreviationsForNbsp = [
	"č.",
	"s.",
	"fol.",
	"str.",
	"r.",
	"par.",
	"odst.",
	"např.",
	"sv.",
	"tj.",
	"tzv.",
	"čl."
]

const singleWordAbbreviations = [
]

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	"hl m",
	"n l",
	"p n l",
	"př n l",

]

export default {
	quotes,
	numbers,
	abbreviationsForNbsp,
	singleWordAbbreviations,
	multipleWordAbbreviations
}
