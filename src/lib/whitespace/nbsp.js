export function removeNbspBetweenMultiCharWords(string, locale) {
	let pattern = "(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})(["+ locale.nbsp + locale.narrowNbsp +"])(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})";
	let re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterPreposition(string, locale) {
	let pattern = "(^|[" + locale.space + "]|[^" + locale.allChars + "])([" + locale.allChars + "])([" + locale.space + "])"
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterAmpersand(string, locale) {
	let pattern = "([" + locale.spaces + "])(" + locale.ampersand + ")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = " $2" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAroundMultiplicationSign(string, locale) {
	let pattern = "([" + locale.spaces + "])([" + locale.multiplicationSign + "])([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = locale.nbsp + "$2" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterCardinalNumber(string, locale) {
	let pattern = "(" + locale.cardinalNumber + ")( )(["+ locale.allChars +"]+)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$3";

	return string.replace(re, replacement);
}



export function addNbspAfterOrdinalNumber(string, locale) {
	let pattern = "("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterRomanNumeral(string, locale) {
	let pattern = "(\\b["+ locale.romanNumerals + "]+)("+ locale.romanOrdinalIndicator +")(["+ locale.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterInitial(string, locale) {
	let pattern = "(["+ locale.uppercaseChars + "]\\.)(["+ locale.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp;

	return string.replace(re, replacement);
}



/*
	Consolidates the use of non-breaking spaces

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string, locale) {
	string = removeNbspBetweenMultiCharWords(string, locale);
	string = addNbspAfterPreposition(string, locale);
	string = addNbspAfterAmpersand(string, locale);
	string = addNbspAroundMultiplicationSign(string, locale);
	string = addNbspAfterCardinalNumber(string, locale);
	string = addNbspAfterOrdinalNumber(string, locale);
	string = addNbspAfterRomanNumeral(string, locale);
	string = addNbspAfterInitial(string, locale);

	return string;
}
