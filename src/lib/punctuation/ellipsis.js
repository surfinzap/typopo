import constants from '../constants';

/*
	Replaces 3 and more consequtive periods with ellipsis

	@param {string} string — input text for identification
	@returns {string} — output with corrected periods
*/
function replacePeriodsWithEllipsis(string) {
	/* [1] replace 3 and more dots with an ellipsis */
	string = string.replace(/\.{3,}/g, "…");

	/* [2] replace 2 dots in the middle of the sentence with an aposiopesis
				 (best-effort scenario) */
	let pattern = "[" + constants.spaces + "]\\.{2}[" + constants.spaces + "]";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, " … ");

	return string;
}


/*
	Corrects improper spacing around ellipsis and aposiopesis

	Ellipsis (as a character) is used for 2 different purposes:
	1. as an ellipsis to ommit a piece of information deliberately
	2. as an aposiopesis; a figure of speech wherein a sentence is
	deliberately broken off and left unfinished

	sources
	https://en.wikipedia.org/wiki/Ellipsis
	https://en.wikipedia.org/wiki/Aposiopesis
	http://www.liteera.cz/slovnik/vypustka

	Algorithm
	Ellipsis & Aposiopesis require different use of spacing around them,
	that is why we are correcting only following cases:
	errors:
	[1] correct spacing, when ellipsis used used around commas
	[2] correct spacing for aposiopesis at the end of the sentence in the middle of the paragraph
	[3] correct spacing for aposiopesis at the beginning of the sentence in the middle of the paragraph
	[4] correct spacing for aposiopesis at the beginning of the sentence at the beginning of the paragraph
	[5] correct spacing for aposiopesis at the end of the sentence at the end of the paragraph

	@param {string} string — input text for identification
	@returns {string} — output with corrected spacing around aposiopesis
*/
function correctSpacesAroundEllipsis(string) {

	/* [1] correct spacing, when ellipsis used used around commas */
	let pattern = ",[" + constants.spaces + "]?" + constants.ellipsis + "[" + constants.spaces + "]?,";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, ", …,");


	/* [2] correct spacing for aposiopesis at the end of the sentence
				 in the middle of the paragraph */
	pattern = "([" + constants.lowercaseChars + "])([" + constants.spaces + "])(" + constants.ellipsis + "[" + constants.spaces + "][" + constants.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [3] correct spacing for aposiopesis at the beginning of the sentence
				 in the middle of the paragraph */
	pattern = "([" + constants.sentencePunctuation + "][" + constants.spaces + "]" + constants.ellipsis +")([" + constants.spaces + "])([" + constants.lowercaseChars +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [4] correct spacing for aposiopesis at the beginning of the sentence
				 at the beginning of the paragraph */
	pattern = "(^…)([" + constants.spaces + "])([" + constants.lowercaseChars + constants.uppercaseChars + "])";
	re = new RegExp(pattern, "gm");
	string = string.replace(re, "$1$3");


	/* [5] correct spacing for aposiopesis at the end of the sentence
				 at the end of the paragraph */
	pattern = "([" + constants.lowercaseChars + constants.sentencePunctuation + "])([" + constants.spaces + "])(" + constants.ellipsis + ")(?![ " + constants.sentencePunctuation + constants.lowercaseChars + constants.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	return string;
}

export function fixEllipsis(string) {
	string = replacePeriodsWithEllipsis(string);
	string = correctSpacesAroundEllipsis(string)
	return string;
}
