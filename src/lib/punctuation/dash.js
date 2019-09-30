export function replaceThreeHyphensWithEmDash(string, locale) {
	return string.replace(/(---)/g, "—");
}



export function replaceTwoHyphensWithEnDash(string, locale) {
	return string.replace(/(--)/g, "–");
}



export function replaceSpacedHyphenWithDash(string, locale) {
	let pattern = "[" + locale.spaces + "][" + locale.hyphen + "][" + locale.spaces + "]";
	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
		case "rue":
		case "sk":
		case "cs":
			replacement = locale.space + locale.emDash + locale.space;
			break;
		case "de-de":
			replacement = locale.space + locale.enDash + locale.space;
			break;
	}

	return string = string.replace(re, replacement);
}



/*
	Some languages require en dash, some require em dash.
	This function will consolidate the dashes based on the locale

	@param {string} string — input text for identification
	@returns {string} — output with an appropriate dash between spaces
*/
export function consolidateSpacedDashes(string, locale) {

	let pattern = "[" + locale.spaces + "][" + locale.enDash + "|" + locale.emDash + "][" + locale.spaces + "]";
	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
		case "rue":
		case "sk":
		case "cs":
			replacement = locale.space + locale.emDash + locale.space;
			break;
		case "de-de":
			replacement = locale.space + locale.enDash + locale.space;
			break;
	}

	return string = string.replace(re, replacement);
}



export function fixDashSpacesBetweenWords(string, locale) {
	let pattern = "[" + locale.spaces + "]?[" + locale.emDash + "|" + locale.enDash + "][" + locale.spaces + "]?";
	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
			replacement = locale.emDash;
			break;
		case "rue":
		case "sk":
			replacement = locale.hairSpace + locale.emDash + locale.hairSpace;
			break;
		case "cs":
			replacement = locale.nbsp + locale.enDash + locale.space;
			break;
		case "de-de":
			replacement = locale.hairSpace + locale.enDash + locale.hairSpace;
			break;
	}

	return string = string.replace(re, replacement);
}



/*
	Replace hyphen or dash, placed between 2 cardinal numbers,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with en dash between cardinal numbers
*/
export function fixDashBetweenCardinalNumbers(string, locale) {
	let pattern = "(" + locale.cardinalNumber + ")([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.enDash + "$3";
	return string.replace(re, replacement);
}



/*
	Replace hyphen or dash, placed between percentage range,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with en dash between percentage range
*/
export function fixDashBetweenPercentageRange(string, locale) {
	let pattern = "(%)([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.enDash + "$3";
	return string.replace(re, replacement);
}



/*
	Replace hyphen or dash, placed between 2 ordinal numbers,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with dash between ordinal numbers
*/
export function fixDashBetweenOrdinalNumbers(string, locale) {
	let pattern = "(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")";
	let re = new RegExp(pattern, "gi");
	let replacement = "$1$2" + locale.enDash + "$4$5";

	return string.replace(re, replacement);
}



/*
	Fixes dashes

	@param {string} string — input text for identification
	@returns {string} — output with fixed dashes
*/
export function fixDash(string, locale) {
	string = replaceThreeHyphensWithEmDash(string, locale)
	string = replaceTwoHyphensWithEnDash(string, locale)
	string = replaceSpacedHyphenWithDash(string, locale);
	string = consolidateSpacedDashes(string, locale);
	string = fixDashSpacesBetweenWords(string, locale);
	string = fixDashBetweenCardinalNumbers(string, locale);
	string = fixDashBetweenPercentageRange(string, locale);
	string = fixDashBetweenOrdinalNumbers(string, locale);
	return string;
}
