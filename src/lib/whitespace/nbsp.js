export function removeNbspBetweenMultiCharWords(string, constants) {
	let pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})(["+ constants.nbsp + constants.narrowNbsp +"])(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})";
	let re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterPreposition(string, constants) {
	let pattern = "(^|[" + constants.space + "]|[^" + constants.allChars + "])([" + constants.allChars + "])([" + constants.space + "])"
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + constants.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterAmpersand(string, constants) {
	let pattern = "([" + constants.spaces + "])(" + constants.ampersand + ")([" + constants.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = " $2" + constants.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAroundMultiplicationSign(string, constants) {
	let pattern = "([" + constants.spaces + "])([" + constants.multiplicationSign + "])([" + constants.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = constants.nbsp + "$2" + constants.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterCardinalNumber(string, constants) {
	let pattern = "(" + constants.cardinalNumber + ")( )(["+ constants.lowercaseChars + constants.uppercaseChars +"]+)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + constants.nbsp + "$3";

	return string.replace(re, replacement);
}



export function addNbspAfterOrdinalNumber(string, constants) {
	let pattern = "("+ constants.cardinalNumber +")("+ constants.ordinalIndicator +")(["+ constants.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + constants.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterRomanNumeral(string, constants) {
	let pattern = "(\\b["+ constants.romanNumerals + "]+)("+ constants.romanOrdinalIndicator +")(["+ constants.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + constants.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterInitial(string, constants) {
	let pattern = "(["+ constants.uppercaseChars + "]\\.)(["+ constants.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + constants.nbsp;

	return string.replace(re, replacement);
}



/*
	Consolidates the use of non-breaking spaces

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string, constants) {
	string = removeNbspBetweenMultiCharWords(string, constants);
	string = addNbspAfterPreposition(string, constants);
	string = addNbspAfterAmpersand(string, constants);
	string = addNbspAroundMultiplicationSign(string, constants);
	string = addNbspAfterCardinalNumber(string, constants);
	string = addNbspAfterOrdinalNumber(string, constants);
	string = addNbspAfterRomanNumeral(string, constants);
	string = addNbspAfterInitial(string, constants);

	return string;
}
