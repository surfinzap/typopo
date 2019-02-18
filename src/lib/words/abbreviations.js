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



/*
	Fixes spaces between abbreviations.
	Each locale has its own pattern for fixing abbreviations,
	please refer to the test suites.

	Algorithm
	[1] Set locale-specific space between abbreviations
	[2] Change multiple-word abbreviations from all locales abbr. patterns
	[3] Identify and fix double-word abbreviations before the word
	[4] Identify and fix double-word abbreviations after the word or on their own

	@param {string} input text for identification
	@returns {string} corrected output
*/
export function fixMultiWordAbbreviations(string, locale) {
	/* Partial patterns for a composition */
	let patternPrecedingNonLatinBoundary = "([^" + locale.allChars + locale.enDash + locale.emDash + "]|^)";
	let patternAbbr = "";
	let patternFollowingWord = "([" + locale.allChars + "]|\\D)";
	let patternFollowingNonLatinBoundary = "([^" + locale.allChars + "]|\\B)";


	/* [1] Set locale-specific space between abbreviations */
	let abbrSpace = "";
	switch (locale.locale) {
		case "en-us":
			abbrSpace = "";
			break;
		case "rue":
		case "sk":
		case "cs":
		case "de-de":
			abbrSpace = locale.nbsp;
			break;
	}


	/* [2] Change multiple-word abbreviations from all locales abbr. patterns */
	let abbrevationPatterns = [];
	for (let i = 0; i < locale.multipleWordAbbreviations.length; i++) {
		let splitAbbreviation = locale.multipleWordAbbreviations[i].split(" ");
		let abbrevationPattern = "";
		for (let j = 0; j < splitAbbreviation.length; j++) {
			abbrevationPattern += "\(" + splitAbbreviation[j] + "\)\(\\.\)\(\[" + locale.spaces + "\]\?\)";
		}
		abbrevationPatterns[i] = abbrevationPattern;
	}

	/* [3] Identify multiple-word abbreviations before the word

		 Algorithm follows:
		 * build up pattern by setting preceding and following boundaries
		 * build replacement of concatenating
		 	 * preceding boundary
			 * n-1 word abbreviations where locale-specific space will be
			 * nth abbreviation the will follow with a normal space
			 * following boundary
	*/
	for (let i = 0; i < abbrevationPatterns.length; i++) {
			let pattern = patternPrecedingNonLatinBoundary + abbrevationPatterns[i] + patternFollowingWord;
			let re = new RegExp(pattern, "gi");

			let replacement = "$1";
			let abbrCount = ((abbrevationPatterns[i].match(/\(/g) || []).length)/3;
			for (let j = 0; j < abbrCount - 1; j++) {
				replacement += "$" + (j*3+2) + "\." + abbrSpace;
			}
			replacement += "$" + ((abbrCount - 1)*3+2) + ". $" + ((abbrCount)*3+2);

			string = string.replace(re, replacement);
	}

	/* [4] Identify multiple-word abbreviations before the word

		 Algorithm follows:
		 * build up pattern by setting preceding and following boundaries
		 * build replacement of concatenating
		 	 * preceding boundary
			 * n-1 word abbreviations where locale-specific space will be
			 * nth abbreviation the will follow with no space
			 * following boundary
	*/
	for (let i = 0; i < abbrevationPatterns.length; i++) {
			let pattern = patternPrecedingNonLatinBoundary + abbrevationPatterns[i] + patternFollowingNonLatinBoundary;
			let re = new RegExp(pattern, "gi");

			let replacement = "$1";
			let abbrCount = ((abbrevationPatterns[i].match(/\(/g) || []).length)/3;
			for (let j = 0; j < abbrCount - 1; j++) {
				replacement += "$" + (j*3+2) + "\." + abbrSpace;
			}
			replacement += "$" + ((abbrCount - 1)*3+2) + ".$" + ((abbrCount)*3+2);

			string = string.replace(re, replacement);
	}

	return string;
}



export function fixAbbreviations(string, locale) {
	string = fixInitials(string, locale);
	string = fixMultiWordAbbreviations(string, locale)

	return string;
}
