const quotes = {
	leftDoubleQuote: '«',
	rightDoubleQuote: '»',
	leftSingleQuote: '‹',
	rightSingleQuote: '›',
}

const numbers = {
	ordinalIndicator: '\\.',
	romanOrdinalIndicator: '\\.',
}

const singleWordAbbreviations = [
	'ціт',
	'ст',
	'канц',
	'абз',
	'тзв',
	'Зб',
	'ч',
	'напр',
]

// Disregard correct spelling in your locale
// and provide abbreviations in format “abbr abbr abbr…”
const multipleWordAbbreviations = [
	'т зн',
	'Е Ч',
	'евід ч',
	'род ч',
	'т ч',
	'т д',
]

export default {
	quotes,
	numbers,
	singleWordAbbreviations,
	multipleWordAbbreviations,
}
