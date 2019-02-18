const quotes = {
	leftDoubleQuote : 				"“",
	rightDoubleQuote : 				"”",
	leftSingleQuote : 				"‘",
	rightSingleQuote : 				"’",
};

const numbers = {
	ordinalIndicator :				"st|nd|rd|th",
	romanOrdinalIndicator :		"",
}

const abbreviationsForNbsp = [
	"p.",
	"pp."
]

const singleWordAbbreviations = []

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	"U S",
	"e g",
	"i e",
	"a m",
	"p m",
]

export default {
	quotes,
	numbers,
	abbreviationsForNbsp,
	singleWordAbbreviations,
	multipleWordAbbreviations
}
