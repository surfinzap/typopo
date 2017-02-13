export function removeMultipleSpaces(string, locale) {
	let pattern = "[" + locale.spaces + "]{2,}";
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
export function removeSpacesAtParagraphStart(string, locale) {
	/* [1] split the lines manually */
	let lines = string.split(/\r?\n/);

	/* [2] and remove extra spaces at the begining of each line */
	for (let i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/^\s+/, "");
	}

	/* [3] join lines together to a single string */
	return lines.join("\n");
}



export function removeSpaceBeforePunctuation(string, locale) {
	let pattern = "([" + locale.spaces + "])([" + locale.sentencePunctuation + locale.closingBrackets + locale.degree + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}



export function removeSpaceAfterPunctuation(string, locale) {
	let pattern = "([" + locale.openingBrackets + "])([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}



export function addSpaceBeforePunctuation(string, locale) {
	var pattern = "(["+ locale.lowercaseChars + locale.uppercaseChars + "])([" + locale.openingBrackets + "])(["+ locale.lowercaseChars + locale.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}



export function addSpaceAfterPunctuation(string, locale) {
	var pattern = "(["+ locale.lowercaseChars + locale.uppercaseChars + "])([" + locale.sentencePunctuation + locale.closingBrackets + "])(["+ locale.lowercaseChars + locale.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}



export function removeTrailingSpaces(string, locale) {
	return string.trim();
}



export function fixSpaces(string, locale) {
	string = removeMultipleSpaces(string, locale);
	string = removeSpacesAtParagraphStart(string, locale);
	string = removeSpaceBeforePunctuation(string, locale);
	string = removeSpaceAfterPunctuation(string, locale);
	string = addSpaceBeforePunctuation(string, locale);
	string = addSpaceAfterPunctuation(string, locale);
	string = removeTrailingSpaces(string, locale);
	return string;
}
