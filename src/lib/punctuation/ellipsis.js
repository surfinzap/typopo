/*
	Replaces 3 and more consequtive periods with ellipsis

	@param {string} string — input text for identification
	@returns {string} — output with corrected periods
*/
function replacePeriodsWithEllipsis(string, locale) {
	/* [1] replace 3 and more dots/ellipses with an ellipsis */
	let pattern = "[" + locale.ellipsis + "\\.]{3,}";
	let re = new RegExp(pattern, "g");
	let replacement = locale.ellipsis;
	string = string.replace(re, replacement);

	/* [2] replace 2 dots in the middle of the sentence with an aposiopesis
				 (best-effort scenario) */
	pattern = "[" + locale.spaces + "]\\.{2}[" + locale.spaces + "]";
	re = new RegExp(pattern, "g");
	replacement = locale.space + locale.ellipsis + locale.space;
	string = string.replace(re, replacement);

	/* [3] Replace ellipsis followed by dots with an ellipsis */
	pattern = locale.ellipsis + "\\.+";
	re = new RegExp(pattern, "g");
	replacement = locale.ellipsis;
	string = string.replace(re, replacement);

	/* [4] Replace dots followed by ellipsis with an ellipsis */
	pattern = "\\.+" + locale.ellipsis;
	re = new RegExp(pattern, "g");
	replacement = locale.ellipsis;
	string = string.replace(re, replacement);


	/* [5] Replace multiple ellipses with an ellipsis */
	pattern = locale.ellipsis + "{2,}";
	re = new RegExp(pattern, "g");
	replacement = locale.ellipsis;
	string = string.replace(re, replacement);

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
function correctSpacesAroundEllipsis(string, locale) {

	/* [1] correct spacing, when ellipsis used used around commas */
	let pattern = ",[" + locale.spaces + "]?" + locale.ellipsis + "[" + locale.spaces + "]?,";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, ", …,");


	/* [2] correct spacing for aposiopesis at the end of the sentence
				 in the middle of the paragraph */
	pattern = "([" + locale.lowercaseChars + "])([" + locale.spaces + "])(" + locale.ellipsis + "[" + locale.spaces + "][" + locale.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [3] correct spacing for aposiopesis at the beginning of the sentence
				 in the middle of the paragraph */
	pattern = "([" + locale.sentencePunctuation + "][" + locale.spaces + "]" + locale.ellipsis +")([" + locale.spaces + "])([" + locale.lowercaseChars +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [4] correct spacing for aposiopesis at the beginning of the sentence
				 at the beginning of the paragraph */
	pattern = "(^…)([" + locale.spaces + "])([" + locale.lowercaseChars + locale.uppercaseChars + "])";
	re = new RegExp(pattern, "gm");
	string = string.replace(re, "$1$3");


	/* [5] correct spacing for aposiopesis at the end of the sentence
				 at the end of the paragraph */
	pattern = "([" + locale.lowercaseChars + locale.sentencePunctuation + "])([" + locale.spaces + "])(" + locale.ellipsis + ")(?![ " + locale.sentencePunctuation + locale.lowercaseChars + locale.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [6] add space after aposiopesis between two words */

	pattern = "([" + locale.allChars + "])([" + locale.ellipsis + "])([" + locale.allChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2 $3");

	return string;
}

export function fixEllipsis(string, locale) {
	string = replacePeriodsWithEllipsis(string, locale);
	string = correctSpacesAroundEllipsis(string, locale)
	return string;
}
