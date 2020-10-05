/*
	Corrects accidental uppercase

	Best-effort function to fix most common accidental uppercase errors, namely:
	[1] 2 first uppercase letters (ie. UPpercase)
	[2] Swapped cases (ie. uPPERCASE)

	Algorithm does not fix other uppercase eventualities,
	e.g. mixed case (UppERcaSe) as there are many cases for corporate brands
	that could potentially match the algorithm as false positive.

	@param {string} string — input text for identification
	@returns {string} — output with corrected accidental uppercase
*/
export function fixCase(string, locale) {
	/* [1] two first uppercase letters (i.e. UPpercase) */
	let pattern =
		'([^' +
		locale.allChars +
		']|^)([' +
		locale.uppercaseChars +
		']{2})([' +
		locale.lowercaseChars +
		']{2,})'
	let re = new RegExp(pattern, 'g')

	string = string.replace(re, function ($0, $1, $2, $3) {
		return $1 + $2.substring(0, 1) + $2.substring(1).toLowerCase() + $3
	})

	/* [2] Swapped cases (n-letter cases, i.e. uPPERCASE)
			There is one exception excluded from swapping → iOS
			If needed, update this part of code to exclude the list of other popular names.
	*/
	pattern =
		'(\\b)(?!iOS)([' +
		locale.lowercaseChars +
		'])([' +
		locale.uppercaseChars +
		']{2,})'
	re = new RegExp(pattern, 'g')
	string = string.replace(re, function (string, $1, $2, $3) {
		return $1 + $2 + $3.toLowerCase()
	})

	return string
}
