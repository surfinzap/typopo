/*
	Replace “x/X” with “×” in the following contexts:
	* 5 x 5 			→ 5⎵×⎵5 				(number × number)
	* 5″ x 4″ 		→ 5″⎵×⎵4″				(number including double/single primes)
	* 5 mm X 5 mm → 5 mm⎵×⎵5 mm		(number with measurement)
	* 5cm x 5cm 	→ 5cm⎵×⎵5cm			(number as an adjective)

	Also, provide non-breaking spaces around multiplication sign.

	@param {string} string — input text for identification
	@returns {string} — output with replaced and spaced multiplication sign
*/
export function fixMultiplicationSignBetweenNumbers(string, locale) {
	let pattern =
		'([' +
		locale.cardinalNumber +
		']+)' +
		'([' +
		locale.spaces +
		']?[' +
		locale.lowercaseChars +
		locale.singlePrime +
		locale.doublePrime +
		']*)' +
		'([' +
		locale.spaces +
		'][x][' +
		locale.spaces +
		'])' +
		'([' +
		locale.cardinalNumber +
		']+)' +
		'([' +
		locale.spaces +
		']?[' +
		locale.lowercaseChars +
		locale.singlePrime +
		locale.doublePrime +
		']*)'

	let re = new RegExp(pattern, 'gi')
	let replacement =
		'$1$2' + locale.nbsp + locale.multiplicationSign + locale.nbsp + '$4$5'

	string = string.replace(re, replacement)
	string = string.replace(re, replacement) // run it twice to catch odd/even occurences

	return string
}

/*
	Replace “x/X” with “×” in the following contexts:
	* š x v x h 			→ š⎵×⎵v⎵×⎵h 				(single letters)
	* mm x mm 				→ mm⎵×⎵mm						(abbreviations)
	* Marciano x Clay → Marciano⎵×⎵Clay		(words)

	Also, provide non-breaking spaces around multiplication sign.

	@param {string} string — input text for identification
	@returns {string} — output with replaced and spaced multiplication sign
*/
export function fixMultiplicationSignBetweenWords(string, locale) {
	let pattern =
		'([' +
		locale.allChars +
		']+)' +
		'([' +
		locale.spaces +
		'][x][' +
		locale.spaces +
		'])' +
		'([' +
		locale.allChars +
		']+)'

	let re = new RegExp(pattern, 'g')
	let replacement =
		'$1' + locale.nbsp + locale.multiplicationSign + locale.nbsp + '$3'

	string = string.replace(re, replacement)
	string = string.replace(re, replacement) // run it twice to catch odd/even occurences

	return string
}

/*
	Replace “x/X” with “×” in the following contexts:
	* 4 x object → 4⎵×⎵object
	* 4X object → 4X⎵object

	Also, provide non-breaking spaces around multiplication sign.

	@param {string} string — input text for identification
	@returns {string} — output with replaced and spaced multiplication sign
*/
export function fixMultiplicationSignBetweenNumberAndWord(string, locale) {
	let pattern =
		'([' +
		locale.cardinalNumber +
		'])' +
		'([' +
		locale.spaces +
		']?)' +
		'([x|×])' +
		'([' +
		locale.spaces +
		'])' +
		'([' +
		locale.lowercaseChars +
		']+)'
	let re = new RegExp(pattern, 'gi')

	string = string.replace(re, function ($0, $1, $2, $3, $4, $5) {
		if ($2 == '') {
			return $1 + $2 + locale.multiplicationSign + locale.nbsp + $5
		}
		return $1 + locale.nbsp + locale.multiplicationSign + locale.nbsp + $5
	})

	return string
}

/*
	Fix spacing around intended multiplication sign in the following contexts:
	* 12x3		→ 12⎵×⎵3
	* 12×3		→ 12⎵×⎵3
	* 12″×3″	→ 12″⎵×⎵3″ (number including double/single primes)

	@param {string} string — input text for identification
	@returns {string} — output with spaced multiplication sign
*/
export function fixNbspAroundMultiplicationSign(string, locale) {
	let pattern =
		'([' +
		locale.cardinalNumber +
		']+)' +
		'([' +
		locale.singlePrime +
		locale.doublePrime +
		'])?' +
		'([x|×])' +
		'([' +
		locale.cardinalNumber +
		']+)' +
		'([' +
		locale.singlePrime +
		locale.doublePrime +
		'])?'
	let re = new RegExp(pattern, 'gi')
	let replacement =
		'$1$2' + locale.nbsp + locale.multiplicationSign + locale.nbsp + '$4$5'

	return string.replace(re, replacement)
}

export function fixMultiplicationSign(string, locale) {
	string = fixMultiplicationSignBetweenNumbers(string, locale)
	string = fixMultiplicationSignBetweenWords(string, locale)
	string = fixMultiplicationSignBetweenNumberAndWord(string, locale)
	string = fixNbspAroundMultiplicationSign(string, locale)

	return string
}
