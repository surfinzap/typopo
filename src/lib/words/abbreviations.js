import constants from "../constants";
import {removeTrailingSpaces} from "../rhythm/spaces";

/*
	Identifies differently-spelled abbreviations and replaces it with
	a temp variable, {{typopo__[abbr]}}

	Identifies given abbreviations:
	a.m., p.m., e.g., i.e.

	Algorithm
	[1] Identify e.g., i.e.
	[2] Identify a.m., p.m. (different match to avoid false positives such as:
			I am, He is the PM.)
	[3] Exclude false identifications

	@param {string} input text for identification
	@returns {string} corrected output
*/
function identify_common_abbreviations(string) {

	/* [1] Identify e.g., i.e. */
	var abbreviations = ["eg", "ie"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?["+ constants.spaces +"]?[" + abbreviations[i][1] + "]\\.?)(["+ constants.spaces +"]?)(\\b)";
		// console.log(pattern);
		var re = new RegExp(pattern, "gi");
		var replacement = "{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}




	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\d)([" + constants.spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?["+ constants.spaces +"]?[" + abbreviations[i][1] + "]\\.?)(["+ constants.spaces +"]?)(\\b|\\B)";
		var re = new RegExp(pattern, "gi");
		replacement = "$1 {{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}


	/* [3] Exclude false identifications
		 Regex \b does not catch non-latin characters so we need to exclude false
		 identifications
	*/
	abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		// non-latin character at the beginning
		var pattern = "([" + constants.nonLatinChars + "])({{typopo__" + abbreviations[i] + "}})";
		var re = new RegExp(pattern, "g");
		replacement = "$1" + abbreviations[i];
		string = string.replace(re, replacement);

		// non-latin character at the end
		pattern = "({{typopo__" + abbreviations[i] + "}} )([" + constants.nonLatinChars + "])";
		re = new RegExp(pattern, "g");
		replacement = abbreviations[i] + "$2";
		string = string.replace(re, replacement);
	}

	return string;
}


/*
	Replaces identified temp abbreviation variable like {{typopo__eg}},
	with their actual representation

	@param {string} input text for identification
	@returns {string} corrected output
*/
function place_common_abbreviations(string) {
	var abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "{{typopo__" + abbreviations[i] + "}}";
		var re = new RegExp(pattern, "g");
		var replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
		string = string.replace(re, replacement);
	}

	return string;
}

export function fixAbbreviations(string) {
	string = identify_common_abbreviations(string);
	string = place_common_abbreviations(string);
	string = removeTrailingSpaces(string);
	return string;
}
