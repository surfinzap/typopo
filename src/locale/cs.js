const quotes = {
	leftDoubleQuote: '„',
	rightDoubleQuote: '“',
	leftSingleQuote: '‚',
	rightSingleQuote: '‘',
}

const numbers = {
	ordinalIndicator: '\\.',
	romanOrdinalIndicator: '\\.',
}

const singleWordAbbreviations = [
	'č',
	's',
	'fol',
	'str',
	'r',
	'par',
	'odst',
	'např',
	'sv',
	'tj',
	'tzv',
]

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = ['hl m', 'n l', 'p n l', 'př n l']

export default {
	quotes,
	numbers,
	singleWordAbbreviations,
	multipleWordAbbreviations,
}
