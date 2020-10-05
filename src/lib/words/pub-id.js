/*
	Identifies wrongly formatted ISSN and corrects it
	Wiki: https://en.wikipedia.org/wiki/International_Standard_Serial_Number

	Since the ISSN format is 0000-0000, the script will only catch ISSN
	for correction if there is ISSN abbreviation placed before digits

	Examples
	ISSN 0000 - 0000 → ISSN 0000-0000
	issn 0000 - 0000 → ISSN 0000-0000
	ISSN 0000—0000 → ISSN 0000-0000
	ISSN: 0000 - 0000 → ISSN: 0000-0000 // the use of colon

	@param {string} string — input text for identification
	@returns {string} — output with correct ISSN format
*/
export function fixISSN(string, locale) {
	let pattern =
		'(issn)' +
		'(:?)' +
		'([' +
		locale.spaces +
		']?)' +
		'(\\d{4})' +
		'([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)' +
		'(\\d{4})'
	let re = new RegExp(pattern, 'gi')
	let replacement = 'ISSN$2' + locale.nbsp + '$4-$6'

	return string.replace(re, replacement)
}

/*
	Identifies wrongly formatted ISBN10 and corrects it
	Wiki: https://en.wikipedia.org/wiki/International_Standard_Book_Numbe

	Since the ISBN10 format varies among publishers, the function will try
	to catch possible variations

	Examples
	Isbn 80- 902734—1-6 → ISBN 80-902734-1-6
	Isbn 80- 902734—1-6 → ISBN 80-902734-1-6
	Isbn: 0-9752298-0-X → ISBN: 0-9752298-0-X // the use of colon

	@param {string} string — input text for identification
	@returns {string} — output with correct ISBN format
*/
export function fixISBN10(string, locale) {
	let dashedSpace =
		'([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)'
	let pattern =
		'(isbn)' +
		'(:?)' +
		'([' +
		locale.spaces +
		']?)' +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(X|\\d+)'
	let re = new RegExp(pattern, 'gi')
	let replacement = 'ISBN$2' + locale.nbsp + '$4-$6-$8-$10'

	return string.replace(re, replacement)
}

/*
	Identifies wrongly formatted ISBN13 and corrects it
	Wiki: https://en.wikipedia.org/wiki/International_Standard_Book_Numbe

	Since the ISBN13 format varies among publishers, the function will try
	to catch possible variations

	Examples
	Isbn 978-80- 902734—1-6 → ISBN 80-902734-1-6
	Isbn 978-80- 902734—1-6 → ISBN 80-902734-1-6
	Isbn: 978-0-9752298-0-X → ISBN: 0-9752298-0-X // the use of colon

	@param {string} string — input text for identification
	@returns {string} — output with correct ISBN format
*/
export function fixISBN13(string, locale) {
	let dashedSpace =
		'([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)'
	let pattern =
		'(isbn)' +
		'(:?)' +
		'([' +
		locale.spaces +
		']?)' +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(X|\\d+)'
	let re = new RegExp(pattern, 'gi')
	let replacement = 'ISBN$2' + locale.nbsp + '$4-$6-$8-$10-$12'

	return string.replace(re, replacement)
}

/*
	Identifies wrongly formatted ISBN13 number and corrects it
	Wiki: https://en.wikipedia.org/wiki/International_Standard_Book_Numbe

	When ISBN number is standalone, it fixes hyphens and spaces in between.

	Examples
	978-80- 902734—1-6 → 80-902734-1-6
	978-80- 902734—1-6 → 80-902734-1-6
	978-0-9752298- 0-X → 0-9752298-0-X // the use of colon

	@param {string} string — input text for identification
	@returns {string} — output with correct ISBN format
*/
export function fixISBNnumber(string, locale) {
	let dashedSpace =
		'([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)'
	let pattern =
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(\\d+)' +
		dashedSpace +
		'(X|\\d+?)'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1-$3-$5-$7-$9'

	return string.replace(re, replacement)
}

/*
	Fixes publication identifiers — ISSN, ISBN

	@param {string} string — input text for identification
	@returns {string} — output with fixed publication identifiers
*/
export function fixPubId(string, locale) {
	string = fixISSN(string, locale)
	string = fixISBN10(string, locale)
	string = fixISBN13(string, locale)
	string = fixISBNnumber(string, locale)

	return string
}
