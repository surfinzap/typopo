import constants from "../constants";


export function removeMultipleSpaces(string) {
	let pattern = "[" + constants.spaces + "]{2,}";
	let re = new RegExp(pattern, "g");
	return string.replace(re, " ");
}



/*
	Removes extra spaces at the beginning of each paragraph

	This could be done with a one-liner:
	return string.replace(/^\s+/gm, "");

	However, it also removes empty lines. Since, we want to handle this change
	separately, we need to
	[1] split the lines manually
	[2] and remove extra spaces at the begining of each line
	[3] join lines together to a single string

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces at the beginning of paragraphs
*/
export function removeSpacesAtParagraphStart(string) {
	/* [1] split the lines manually */
	let lines = string.split(/\r?\n/);

	/* [2] and remove extra spaces at the begining of each line */
	for (let i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/^\s+/, "");
	}

	/* [3] join lines together to a single string */
	return lines.join("\n");
}



export function removeSpaceBeforePunctuation(string) {
	let pattern = "([" + constants.spaces + "])([" + constants.sentencePunctuation + constants.closingBrackets + constants.degree + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}



export function removeSpaceAfterPunctuation(string) {
	let pattern = "([" + constants.openingBrackets + "])([" + constants.spaces + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}



export function addSpaceBeforePunctuation(string) {
	var pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars + "])([" + constants.openingBrackets + "])(["+ constants.lowercaseChars + constants.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}



export function addSpaceAfterPunctuation(string) {
	var pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars + "])([" + constants.sentencePunctuation + constants.closingBrackets + "])(["+ constants.lowercaseChars + constants.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}



export function removeTrailingSpaces(string) {
	return string.trim();
}



export function fixSpaces(string) {
	string = removeMultipleSpaces(string);
	string = removeSpacesAtParagraphStart(string);
	string = removeSpaceBeforePunctuation(string);
	string = removeSpaceAfterPunctuation(string);
	string = addSpaceBeforePunctuation(string);
	string = addSpaceAfterPunctuation(string);
	string = removeTrailingSpaces(string);
	return string;
}
