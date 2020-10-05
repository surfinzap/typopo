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
	'napr',
	'sv',
	'tzv',
	'čl',
	'cit',
	'roč',
	'vyd',
]

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	'hl m',
	'n l',
	'p n l',
	'pr n l',
	's a',
	's l',
	't j',
	'zodp red',
	't č',
]

export default {
	quotes,
	numbers,
	singleWordAbbreviations,
	multipleWordAbbreviations,
}
