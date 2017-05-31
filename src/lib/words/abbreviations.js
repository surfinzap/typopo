import {removeTrailingSpaces} from "../whitespace/spaces";

/*
	Fixes differently-spelled abbreviations:
	a.m., p.m., e.g., i.e.

	Algorithm
	[1] Identify e.g., i.e.
	[2] Identify a.m., p.m. (different match to avoid false positives such as:
			I am, He is the PM.)
	[3] Exclude false identifications

	@param {string} input text for identification
	@returns {string} corrected output
*/
export function fixEgIeAmPm(string, locale) {

	/* [1] Identify e.g., i.e. */
	let abbreviations = ["eg", "ie"];
	for (let i = 0; i < abbreviations.length; i++) {
		// boundaries are set for non-latin characters
		let pattern = "(^|\\s|["+ locale.openingBrackets +"])([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]?)([^" + locale.allChars + "\\n])";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}


	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (let i = 0; i < abbreviations.length; i++) {
		let pattern = "(\\d)([" + locale.spaces + "]?)([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]?)(\\b|\\B)";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1 {{typopo__" + abbreviations[i] + "}}$4";
		string = string.replace(re, replacement);
	}


	/* [3] Exclude false identifications
		 Regex \b does not catch non-latin characters so we need to exclude false
		 identifications
	*/
	abbreviations = ["eg", "ie", "am", "pm"];
	for (let i = 0; i < abbreviations.length; i++) {
		// non-latin character at the beginning
		let pattern = "([" + locale.nonLatinChars + "])({{typopo__" + abbreviations[i] + "}})";
		let re = new RegExp(pattern, "g");
		let replacement = "$1" + abbreviations[i];
		string = string.replace(re, replacement);

		// non-latin character at the end
		pattern = "({{typopo__" + abbreviations[i] + "}})(["+ locale.spaces +"]?)([" + locale.nonLatinChars + "])";
		re = new RegExp(pattern, "g");
		replacement = abbreviations[i] + "$3";
		string = string.replace(re, replacement);
	}

	/*
	Replaces identified temp abbreviation variable like {{typopo__eg}},
	with their actual representation
	*/
	for (let i = 0; i < abbreviations.length; i++) {
		let pattern = "{{typopo__" + abbreviations[i] + "}}";
		let re = new RegExp(pattern, "g");
		let replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
		string = string.replace(re, replacement);
	}

	return removeTrailingSpaces(string, locale);
}




export function fixAbbreviations(string, locale) {
	return fixEgIeAmPm(string, locale);
}
