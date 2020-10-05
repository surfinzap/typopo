const quotes = {
	leftDoubleQuote: '“',
	rightDoubleQuote: '”',
	leftSingleQuote: '‘',
	rightSingleQuote: '’',
}

const numbers = {
	ordinalIndicator: 'st|nd|rd|th',
	romanOrdinalIndicator: '',
}

const singleWordAbbreviations = ['p', 'pp', 'no', 'vol']

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = ['U S', 'e g', 'i e', 'a m', 'p m']

export default {
	quotes,
	numbers,
	singleWordAbbreviations,
	multipleWordAbbreviations,
}
