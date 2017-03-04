export function replaceThreeHyphensWithEmDash(string, locale) {
	return string.replace(/(---)/g, "—");
}



export function replaceTwoHyphensWithEnDash(string, locale) {
	return string.replace(/(--)/g, "–");
}



export function replaceSpacedHyphenWithEmDash(string, locale) {
	let pattern = "[" + locale.spaces + "][" + locale.hyphen + "][" + locale.spaces + "]";
	let re = new RegExp(pattern, "g");
	let replacement = locale.space + locale.emDash + locale.space;
	return string = string.replace(re, replacement);
}



export function replaceSpacedEnDashWithEmDash(string, locale) {
	let pattern = "[" + locale.spaces + "][" + locale.enDash + "][" + locale.spaces + "]";
	let re = new RegExp(pattern, "g");
	let replacement = locale.space + locale.emDash + locale.space;
	return string = string.replace(re, replacement);
}



export function fixSpacesAroundEmDash(string, locale) {
	let pattern = "[" + locale.spaces + "]?[" + locale.emDash + "][" + locale.spaces + "]?";
	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
			replacement = locale.emDash;
			break;
		case "rue":
		case "sk":
		case "cs":
			replacement = locale.narrowNbsp + locale.emDash + locale.hairSpace;
			break;
	}

	return string = string.replace(re, replacement);
}



/*
	Replace hyphen or dash, placed between 2 cardinal numbers,
	with an en dash; including cases when there is an extra space
	from either one side or both sides of the dash

	@param {string} string — input text for identification
	@returns {string} — output with dash between cardinal numbers
*/
export function fixDashBetweenCardinalNumbers(string, locale) {
	let pattern = "(" + locale.cardinalNumber + ")([" + locale.spaces + "]?[" + locale.hyphen + locale.enDash + locale.emDash + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
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
	string = replaceTwoHyphensWithEnDash(string, locale);
	string = replaceSpacedHyphenWithEmDash(string, locale);
	string = replaceSpacedEnDashWithEmDash(string, locale);
	string = fixSpacesAroundEmDash(string, locale);
	string = fixDashBetweenCardinalNumbers(string, locale);
	string = fixDashBetweenOrdinalNumbers(string, locale);
	return string;
}
