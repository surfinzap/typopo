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
	"napr.",
	"sv.",
	"tj.",
	"tzv.",
	"čl.",
]

const singleWordAbbreviations = []

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	"hl m",
	"n l",
	"p n l",
	"pr n l",
	"s a",
	"s l",
	"t j",
	"zodp red",
]

export default {
	quotes,
	numbers,
	abbreviationsForNbsp,
	singleWordAbbreviations,
	multipleWordAbbreviations
}
