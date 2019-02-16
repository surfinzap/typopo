import {removeTrailingSpaces} from "../whitespace/spaces";
import {removeExtraPeriod} from "../punctuation/period";

/*
	Fixes differently-spelled abbreviations:
	a.m., p.m., e.g., i.e.

	Algorithm
	[1] Identify e.g., i.e. in brackets, within quotes and at the beginning
	[2] Identify other e.g., i.e. cases
	[3] Identify a.m., p.m. in brackets, within quotes and at the beginning
	[4] Identify a.m., p.m. (different match to avoid false positives such as:
			I am, He is the PM.)
	[5] Exclude false identifications

	@param {string} input text for identification
	@returns {string} corrected output
*/
export function fixEgIeAmPm(string, locale) {



	/* [1] Identify e.g., i.e. at the beginning, in brackets, within quotes or in the list of abbreviations */
	let abbreviations = ["eg", "ie"];
	for (let i = 0; i < abbreviations.length; i++) {
		// boundaries are set for non-latin characters
		let pattern = "(^|["+ locale.spaces + locale.openingBrackets + locale.leftDoubleQuote + locale.leftSingleQuote + "])([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]*)([" + locale.closingBrackets + locale.rightDoubleQuote + locale.rightSingleQuote + locale.sentencePausePunctuation + "])";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1{{typopo__" + abbreviations[i] + "}}$4";
		string = string.replace(re, replacement);
	}


	/* [2] Identify e.g., i.e. */
	abbreviations = ["eg", "ie"];
	for (let i = 0; i < abbreviations.length; i++) {
		// boundaries are set for non-latin characters
		let pattern = "(^|\\s|["+ locale.openingBrackets +"])([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]?)([^" + locale.allChars + locale.cardinalNumber + "\\n])";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}


	/* [3] Identify a.m., p.m. in brackets, within quotes and at the beginning */
	abbreviations = ["am", "pm"];
	for (let i = 0; i < abbreviations.length; i++) {
		// let pattern = "(\\d)([" + locale.spaces + "]?)([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]?)(\\b|\\B)";
		let pattern = "(^|["+ locale.openingBrackets + locale.leftDoubleQuote + locale.leftSingleQuote + "])([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]*)([" + locale.closingBrackets + locale.rightDoubleQuote + locale.rightSingleQuote + "]|$)";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1{{typopo__" + abbreviations[i] + "}}$4";
		string = string.replace(re, replacement);
	}


	/* [4] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (let i = 0; i < abbreviations.length; i++) {
		let pattern = "(\\d)([" + locale.spaces + "]?)([" + abbreviations[i][0] + "]\\.?["+ locale.spaces +"]*[" + abbreviations[i][1] + "]\\.?)(["+ locale.spaces +"]?)(\\b)";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1 {{typopo__" + abbreviations[i] + "}}$4";
		string = string.replace(re, replacement);
	}


	/* [5] Exclude false identifications
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

	// extra cleanup
	string = removeTrailingSpaces(string, locale);
	string = removeExtraPeriod(string, locale);

	return string;
}



/*
	Fixes spaces around initials for First and up to two Middle names
	It won't fix any other abbreviation.

	Algorithm
	[1] Identify and replace pattern "I. FullName"
	[2] Identify and replace pattern "I. I. FullName"
	[3] Identify and replace pattern "I. I. I. FullName"

	@param {string} input text for identification
	@returns {string} corrected output
*/
export function fixInitials(string, locale) {
	// define pattern for initial and a full name
	let initialPattern = "(["+ locale.uppercaseChars + "]["+ locale.allChars + "]?\\.)(["+ locale.spaces +"]?)";
	let fullNamePattern = "(["+ locale.allChars + "]{2,}[^\\.])";


	// define locale-specific spacing for multiple initials
	let initialSpace = "";
	switch (locale.locale) {
		case "en-us":
			initialSpace = "";
			break;
		case "rue":
		case "sk":
		case "cs":
		case "de-de":
			initialSpace = locale.nbsp;
			break;
	}


	// [1] Identify and replace pattern "I. FullName"
	let pattern = initialPattern + fullNamePattern;
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$3";
	string = string.replace(re, replacement);


	// [2] Identify and replace pattern "I. I. FullName"
	pattern = initialPattern + initialPattern + fullNamePattern;
	re = new RegExp(pattern, "g");
	replacement = "$1" + initialSpace + "$3" + locale.space + "$5";
	string = string.replace(re, replacement);


	// [3] Identify and replace pattern "I. I. I. FullName"
	pattern = initialPattern + initialPattern + initialPattern + fullNamePattern;
	re = new RegExp(pattern, "g");
	replacement = "$1" + initialSpace + "$3" + initialSpace + "$5" + locale.space + "$7";
	string = string.replace(re, replacement);


	return string;
}


export function fixAbbreviations(string, locale) {
	string = fixInitials(string, locale);
	string = fixEgIeAmPm(string, locale);

	return string;
}
