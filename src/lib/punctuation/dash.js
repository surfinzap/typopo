export function replaceThreeHyphensWithEmDash(string) {
	return string.replace(/(---)/g, '—')
}

export function replaceTwoHyphensWithEnDash(string) {
	return string.replace(/(--)/g, '–')
}

export function replaceSpacedHyphenWithDash(string, locale) {
	let pattern =
		'[' + locale.spaces + '][' + locale.hyphen + '][' + locale.spaces + ']'
	let re = new RegExp(pattern, 'g')
	let replacement = ''

	switch (locale.locale) {
		case 'en-us':
		case 'rue':
		case 'sk':
		case 'cs':
			replacement = locale.space + locale.emDash + locale.space
			break
		case 'de-de':
			replacement = locale.space + locale.enDash + locale.space
			break
	}

	return (string = string.replace(re, replacement))
}

/*
	Some languages require en dash, some require em dash.
	This function will consolidate the dashes based on the locale

	@param {string} string — input text for identification
	@returns {string} — output with an appropriate dash between spaces
*/
export function consolidateSpacedDashes(string, locale) {
	let pattern =
		'[' +
		locale.spaces +
		'][' +
		locale.enDash +
		'|' +
		locale.emDash +
		'][' +
		locale.spaces +
		']'
	let re = new RegExp(pattern, 'g')
	let replacement = ''

	switch (locale.locale) {
		case 'en-us':
		case 'rue':
		case 'sk':
		case 'cs':
			replacement = locale.space + locale.emDash + locale.space
			break
		case 'de-de':
			replacement = locale.space + locale.enDash + locale.space
			break
	}

	return (string = string.replace(re, replacement))
}

export function fixDashSpacesBetweenWords(string, locale) {
	let pattern =
		'([' +
		locale.spaces +
		']?)([' +
		locale.emDash +
		locale.enDash +
		'])([' +
		locale.spaces +
		']?)([' +
		locale.allChars +
		'])'
	let re = new RegExp(pattern, 'g')
	// console.log(pattern);
	let replacement = ''

	switch (locale.locale) {
		case 'en-us':
			replacement = locale.emDash + '$4'
			break
		case 'rue':
		case 'sk':
			replacement = locale.hairSpace + locale.emDash + locale.hairSpace + '$4'
			break
		case 'cs':
			replacement = locale.nbsp + locale.enDash + locale.space + '$4'
			break
		case 'de-de':
			replacement = locale.hairSpace + locale.enDash + locale.hairSpace + '$4'
			break
	}

	return (string = string.replace(re, replacement))
}

/*
	Replace hyphen placed between a word and punctuation,
	or placed at the end of a paragaph.

	Examples (en-us):
	so there is a dash -, 	→ so there is a dash—,
	so there is a dash-, 		→ so there is a dash—,
	so there is a dash -?		→ so there is a dash—?
	so there is a dash -		→ so there is a dash—

	@param {string} string — input text for identification
	@returns {string} — output with locale-specific dash and spacing between a word and a punctuation.
*/
export function fixHyphenBetweenWordAndPunctuation(string, locale) {
	let pattern =
		'([' +
		locale.allChars +
		'])([' +
		locale.spaces +
		']?)(' +
		locale.hyphen +
		')([' +
		locale.spaces +
		']?)([' +
		locale.sentencePunctuation +
		'\\n\\r])'
	let re = new RegExp(pattern, 'g')
	let replacement = ''

	switch (locale.locale) {
		case 'en-us':
			replacement = '$1' + locale.emDash + '$5'
			break
		case 'rue':
		case 'sk':
			replacement = '$1' + locale.hairSpace + locale.emDash + '$5'
			break
		case 'cs':
			replacement = '$1' + locale.nbsp + locale.enDash + '$5'
			break
		case 'de-de':
			replacement = '$1' + locale.hairSpace + locale.enDash + '$5'
			break
	}

	return (string = string.replace(re, replacement))
}

/*
	Replace hyphen or dash, placed between 2 cardinal numbers,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	Because in edge cases we would need to tackle overlapping regex matches
	(e.g. 1–2–3), we've made the function bit more verbose.
	[1] Match the pattern twice, replace it with enDash adepts
	[2] Replace enDash adepts with actual enDashes

	@param {string} string — input text for identification
	@returns {string} — output with en dash between cardinal numbers
*/
export function fixDashBetweenCardinalNumbers(string, locale) {
	/* [1] Match the pattern twice, replace it with enDash adepts */
	let pattern =
		'(' +
		locale.cardinalNumber +
		')' +
		'([' +
		locale.spaces +
		']?' +
		'[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		']' +
		'[' +
		locale.spaces +
		']?)' +
		'(' +
		locale.cardinalNumber +
		')'
	// console.log(pattern);
	let re = new RegExp(pattern, 'g')
	let replacement = '$1' + '{{typopo__endash}}' + '$3'
	string = string.replace(re, replacement) // [1] replace odd matches
	string = string.replace(re, replacement) // [1] reaplce even matches

	/* [2] Replace enDash adepts with actual enDashes */
	pattern = '{{typopo__endash}}'
	re = new RegExp(pattern, 'g')
	replacement = locale.enDash

	return string.replace(re, replacement)
}

/*
	Replace hyphen or dash, placed between percentage range,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with en dash between percentage range
*/
export function fixDashBetweenPercentageRange(string, locale) {
	let pattern =
		'([' +
		locale.percent +
		locale.permille +
		locale.permyriad +
		'])([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)(' +
		locale.cardinalNumber +
		')'
	let re = new RegExp(pattern, 'g')
	let replacement = '$1' + locale.enDash + '$3'
	return string.replace(re, replacement)
}

/*
	Replace hyphen or dash, placed between 2 ordinal numbers,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with dash between ordinal numbers
*/
export function fixDashBetweenOrdinalNumbers(string, locale) {
	let pattern =
		'(' +
		locale.cardinalNumber +
		')(' +
		locale.ordinalIndicator +
		')([' +
		locale.spaces +
		']?[' +
		locale.hyphen +
		locale.enDash +
		locale.emDash +
		'][' +
		locale.spaces +
		']?)(' +
		locale.cardinalNumber +
		')(' +
		locale.ordinalIndicator +
		')'
	let re = new RegExp(pattern, 'gi')
	let replacement = '$1$2' + locale.enDash + '$4$5'

	return string.replace(re, replacement)
}

/*
	Fixes dashes

	@param {string} string — input text for identification
	@returns {string} — output with fixed dashes
*/
export function fixDash(string, locale) {
	string = replaceThreeHyphensWithEmDash(string, locale)
	string = replaceTwoHyphensWithEnDash(string, locale)
	string = replaceSpacedHyphenWithDash(string, locale)
	string = consolidateSpacedDashes(string, locale)
	string = fixDashSpacesBetweenWords(string, locale)
	string = fixHyphenBetweenWordAndPunctuation(string, locale)
	string = fixDashBetweenCardinalNumbers(string, locale)
	string = fixDashBetweenPercentageRange(string, locale)
	string = fixDashBetweenOrdinalNumbers(string, locale)
	return string
}
