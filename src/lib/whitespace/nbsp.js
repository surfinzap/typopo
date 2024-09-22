
export function removeNbspBetweenMultiCharWords(string, locale) {
	let pattern = "(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})(["+ locale.nbsp + locale.narrowNbsp +"])(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})";
	let re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences

	return string;
}


/*
	Replace a space with a non-breaking space after a single-letter preposition

	Examples:
	V obchode → V⎵obchode
	Skáče o tyči → Skáče o⎵tyči

	Counterexamples
	See test case

	Approach
	Split identification of 
	a) small letter prepositions (that can be placed anywhere in the sentence) 
	b) and capital letter prepositions (that are placed at the beginning of the sentence)
	Reason: capital letters in the mid-sentence are rather bound to a previous word and nbsp is fixed by addNbspBeforeSingleLetter
	c) “I” in English

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function addNbspAfterPreposition(string, locale) {
	// a) small letter prepositions
	let pattern =
			"(^|[" + locale.space + "]|[^" + locale.allChars + locale.cardinalNumber + locale.apostrophe + locale.plus + locale.minus + locale.hyphen + "])"
		+ "([" + locale.lowercaseChars + "])"
		+ "([" + locale.space + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences
	
	// b) capital letter prepositions at the beggining of the sentence
	pattern = 
		"(^|[" 
			+ locale.sentencePunctuation
			+ locale.ellipsis
			+ locale.copyright
			+ locale.registeredTrademark
			+ locale.soundRecordingCopyright
			+ "])"
	+ "(["+ locale.spaces +"]?)"
	+ "(["+ locale.uppercaseChars +"])"
	+ "(["+ locale.spaces +"])"

	re = new RegExp(pattern, "g");
	replacement = "$1$2$3" + locale.nbsp;
	string = string.replace(re, replacement);

	// c) “I” in English

	if (locale.locale == "en-us") {
		string = string.replace(
			new RegExp(
				"(^|[" + locale.spaces + "])"
			+ "(I)" 
			+ "(["+ locale.spaces +"])", 
				"g"
			),
			"$1$2" + locale.nbsp
		);
	}


	return string;
}



export function addNbspAfterAmpersand(string, locale) {
	let pattern = "([" + locale.spaces + "])(" + locale.ampersand + ")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = " $2" + locale.nbsp;

	return string.replace(re, replacement);
}



/*
	Add a non-breaking space after a cardinal number (up to 99) that precedes a word.

	Assumptions and Limitations
	We’ll identify and place nbsp for 1- or 2-digit cardinal numbers.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with nbsp after cardinal numbers
*/
export function addNbspAfterCardinalNumber(string, locale) {

	return string.replace(
		new RegExp(
				"([^" + locale.nbsp + locale.cardinalNumber + "]|^)"
			+ "(" + locale.cardinalNumber + "{1,2})"
			+ "([" + locale.spaces + "])"
			+ "(["+ locale.allChars +"])", 
			"g"
		),
			"$1"
		+ "$2"
		+ locale.nbsp
		+ "$4"
	);
}


/*
	Add a non-breaking space after on ordinal number (up to 99) that precedes a word.

	Assumptions and Limitations
	We’ll identify and place nbsp for 1- or 2-digit ordinal numbers.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with nbsp after ordinal numbers
*/
export function addNbspAfterOrdinalNumber(string, locale) {

	return string.replace(
		new RegExp(
				"([^" + locale.nbsp + locale.cardinalNumber + "_%\\-]|^)"
			+ "("+ locale.cardinalNumber +"{1,2})"
			+ "("+ locale.ordinalIndicator +")"
			+ "(["+ locale.spaces +"]?)"
			+ "(["+ locale.allChars +"])", 
			"g"
		),
			"$1"
		+ "$2"
		+ "$3"
		+ locale.nbsp
		+ "$5"
	);

}



export function addNbspWithinOrdinalDate(string, locale) {
	let pattern = "("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"]?)("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"]?)("+ locale.cardinalNumber +")";
	let re = new RegExp(pattern, "g");
	let replacement = "";

	switch (locale.locale) {
		case "en-us":
		case "rue":
		case "sk":
		case "cs":
			replacement = "$1$2" + locale.nbsp + "$4$5" + locale.nbsp + "$7";
			break;
		case "de-de":
			replacement = "$1$2" + locale.nbsp + "$4$5" + locale.space + "$7";
			break;
	}

	return string.replace(re, replacement);
}


/*
	Fix non-breaking space after Ordinal Roman Number

	Examples:
	I. kapitola
	X. ročník
	8. V. 1945

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function addNbspAfterRomanNumeral(string, locale) {
	// we can identify roman numeral effectively only if it has an ordinal indicator
	if(locale.romanOrdinalIndicator != "") {
		let pattern =
				"(\\b)"
			+ "(["+ locale.romanNumerals + "]+)"
			+ "("+ locale.romanOrdinalIndicator +")"
			+ "(["+ locale.spaces +"]?)"
			+ "([" + locale.allChars + locale.cardinalNumber + "])";
		let re = new RegExp(pattern, "g");
		let replacement = "$1$2$3" + locale.nbsp + "$5";

		return string.replace(re, replacement);
	}

	return string;
}


/*
	Fix non-breaking space around name with regnal number

	Examples:
	Karel IV. → Karel⎵IV.
	Karel IV.⎵byl → Karel⎵IV. byl
	Charles IV → Charles⎵IV

	Unsupported:
	Charles I → Charles I
	(first emperor, English language; otherwise “When I am” would be incorrectly fixed)

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbspForNameWithRegnalNumber(string, locale) {
		let pattern =
			"(\\b[" + locale.uppercaseChars + "]["+ locale.lowercaseChars +"]+?)"
			+ "([" + locale.spaces + "])"
			+ "([" + locale.romanNumerals +"]+\\b)"
			+ "("  + locale.romanOrdinalIndicator +")"
			+ "([" + locale.nbsp + "]?)";
		let re = new RegExp(pattern, "g");

		return string.replace(re, function($0, $1, $2, $3, $4, $5){
			if ($5 == "" && $3 == "I")  {
				return $1 + locale.space + $3 + $4;
			}
			else if ($5 == "" && $3 != "I") {
				return $1 + locale.nbsp + $3 + $4;
			}
			else if ($5 == locale.nbsp && $3 == "I") {
				return $1 + locale.space + $3 + $4 + $5;
			}
			else {
				return $1 + locale.nbsp + $3 + $4 + locale.space;
			}

		});
}



/*
	Fix nbsp before % (percent), ‰ (permille) and ‱ (permyriad)

	@param {string} string — input text for identification
	@returns {string} — output with correctly added non-breaking space
*/
export function addNbspBeforePercent(string, locale) {
	let pattern = "([" + locale.spaces + "])([" + locale.percent + locale.permille + locale.permyriad + "])";
	let re = new RegExp(pattern, "g");
	let replacement = locale.nbsp + "$2";

	return string.replace(re, replacement);
}




/*
	Add/Swap non-breaking space before a single capital letter in a sentence

	Examples:
	The product X is missing the feature Y.
	Sputnik V
	© V Inc.
	Človek Č

	Counter examples:
	When I talk to emerging product designers (capital I in English language)
	Dear Christopher
	pán Šťastný
	pán ŠŤASTNÝ
	One sentence ends. A bad apple. (single letter before sentence punctuation)
	sentence; C-level executive (single letter befor sentence punctuation)
	I’d say… A-player.
	sentence (brackets) A-player
	“qouted part” A capital letter
	A × A (this should be fixed in multiplication sign, but maybe irrelevant)
  famous company — A Inc. (this should be fixed in dash.js)


	@param {string} string — input text for identification
	@returns {string} — output with correctly added non-breaking space
*/
export function addNbspBeforeSingleLetter(string, locale) {
	let uppercaseChars = locale.uppercaseChars;

	if (locale.locale == "en-us") {
		// remove “I” from the list to avoid placing nbsp before “something I do”
		uppercaseChars = uppercaseChars.replace(/A-Z/g, "A-HJ-Z");
	}

	let pattern = 
		"([^" 
				+ locale.sentencePunctuation
				+ locale.ellipsis
				+ locale.closingBrackets
				+ locale.rightDoubleQuote
				+ locale.rightSingleQuote
				+ locale.apostrophe
				+ locale.multiplicationSign
				+ locale.emDash
				+ locale.enDash
				+ "])"
		+ "(["+ locale.spaces +"])"
		+ "(["+ uppercaseChars +"])"
		+ "((["+ locale.spaces +"])|(\\.$|$))";

	let re = new RegExp(pattern, "g");

	return string.replace(re, function($0, $1, $2, $3, $4, $5){
		if (locale.locale == "en-us") {
			// don't make changes after "I" in en-us
			return $1 + locale.nbsp + $3 + $4

		} else if ($3 == "I" && ($5 == locale.nbsp || $5 == locale.hairSpace || $5 == locale.narrowNbsp)) {
			// replace nbsp after "I" in other languages 
			return $1 + locale.nbsp + $3 + locale.space

		} else {
			// just add nbsp before single word capital letter in the rest of the cases
			return $1 + locale.nbsp + $3 + $4	

		}
	});
}


/*
	Helper function that adds nbsp after symbols
	in their respective *.js files

	@param {string} string — input text for identification
	@returns {string} — output with correctly added non-breaking space
*/
export function addNbspAfterSymbol(string, symbol, locale) {
	let pattern = "("+ symbol +")([^" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$2";

	return string.replace(re, replacement);
}


/*
	Helper function that fixes various spaces for nbsp after symbols
	in their respective *.js files

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function replaceSpacesWithNbspAfterSymbol(string, symbol, locale) {
	let pattern = "("+ symbol +")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp;

	return string.replace(re, replacement);
}




/*
	Consolidates the use of non-breaking spaces

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string, locale) {
	string = removeNbspBetweenMultiCharWords(string, locale);
	string = addNbspAfterPreposition(string, locale);
	string = addNbspAfterAmpersand(string, locale);
	string = addNbspAfterCardinalNumber(string, locale);
	string = addNbspAfterOrdinalNumber(string, locale);
	string = addNbspWithinOrdinalDate(string, locale);
	string = addNbspAfterRomanNumeral(string, locale);
	string = addNbspBeforeSingleLetter(string, locale);
	string = fixNbspForNameWithRegnalNumber(string, locale);
	string = addNbspBeforePercent(string, locale);

	return string;
}
