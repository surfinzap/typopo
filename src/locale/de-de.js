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
	'S',
	'z',
	'St',
	'Stk',
	'Mo',
	'Di',
	'Mi',
	'Do',
	'Fr',
	'Sa',
	'So',
	'Bhf',
	'Hbf',
	'Nr',
	'ca',
	'usw',
	'geb',
	'gest',
	'u',
]

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	'b w',
	'd h',
	'd i',
	'e V',
	'n Chr',
	's a',
	's o',
	's u',
	'u a',
	'u ä',
	'u Ä',
	'u dgl',
	'u U',
	'u z',
	'u zw',
	'v a',
	'v Chr',
	'z B',
	'z T',
	'z Zt',
	'n u Z',
	'u a m',
	'v u Z',
	'Ges m b H',
]

export default {
	quotes,
	numbers,
	singleWordAbbreviations,
	multipleWordAbbreviations,
}
