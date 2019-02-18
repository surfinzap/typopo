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
