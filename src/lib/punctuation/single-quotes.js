/*
TODO
- make identification of and contractions more robust + implement an exception for press 'N'
- remove [5] if unnecessary
- reconsider: make single quote identifiable as not enclosed in double quote pair?
	- challenge: we don't know contractions in other languages, such as rusyn transliteration.
- consolidate numbering
- tbd swap quotes and terinal punctuation

*/






/*
	Identify ’n’ contractions as apostrophes

	Example
	rock 'n' roll → rock ’n’ roll
	fish 'n' chips → fish ’n’ chips


	Exceptions
	Press 'N' to continue (should be identified as single quotes)


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedAnd(string, locale) {	

	return string.replace(
		new RegExp(
			"(" + locale.singleQuoteAdepts + ")"
		+ "(n)"
		+ "(" + locale.singleQuoteAdepts + ")", 
			"g"
		),
			"{{typopo__apostrophe}}"
		+ "$2"
		+ "{{typopo__apostrophe}}"
	)
}



/*
	Identify common contractions at the beginning of the word as apostrophes


	Example
	’em, ’cause,… see list of words in the function

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedBeginnings(string, locale) {	
	let contractedWords = "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";

	return string.replace(
		new RegExp(
			"(" + locale.singleQuoteAdepts + ")"
		+ "(" + contractedWords + ")", 
			"gi"
		),
			"{{typopo__apostrophe}}"
		+ "$2"
	);
}



/*
	Identify common contractions at the ends of the word as apostrophes

	Example
	contraction of an -ing form, e.g. nottin’

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedEnds(string, locale) {	
	return string.replace(
		new RegExp(
			"(\\Bin)"
		+ "(" + locale.singleQuoteAdepts + ")",
			"gi"
		),
			"$1"
		+ "{{typopo__apostrophe}}"
	);
}



/*
	Identify in-word contractions as apostrophes

	Examples
	Don’t, I’m, O’Doole, 69’ers,…

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyInWordContractions(string, locale) {	
	return string.replace(
		new RegExp(
			"(["+ locale.cardinalNumber + locale.allChars +"])"
			+ "(" + locale.singleQuoteAdepts +")+"
			+ "(["+ locale.allChars +"])", 
			"g"
		),
			"$1"
		+ "{{typopo__apostrophe}}"
		+ "$3"
	);
}




/*
	Identify contracted years

	Example
	in ’70s, INCHEBA ’89,…

	Exceptions
	12 '45″ // when there is a wrongly spaced feet


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedYears(string, locale) {	
	return string.replace(
		new RegExp(
			"([^0-9])"
		+ "([" + locale.spaces + "])"
		+ "(" + locale.singleQuoteAdepts + ")"
		+ "([" + locale.cardinalNumber + "]{2})", 
			"g"
		),
			"$1"
		+ "$2"
		+ "{{typopo__apostrophe}}"
		+ "$4"
	);
}



/*
	Identify feet and arcminutes following a 1–3 numbers

	Example
	12' 45″ → 
	12′ 45″

	Single-quotes module impact
	Function falsely identifies feet, where we are expecting quotes, e.g.	
	'Konference 2020' in quotes → 
	‘Konference 2020’ in quotes 
	→ this is corrected in replaceSinglePrimeWSingleQuote

	Implementation note
	We’re not using locale.singleQuoteAdepts variable as commas and low-positioned quotes are ommited

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified single primes as a temporary variable string, e.g. {{typopo__sinlge-prime}}
*/
export function identifySinglePrimes(string, locale) {
	return string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1$2{{typopo__single-prime}}");
}



/*
	Identify standalone right single quote

	Algorithm
	Find right single quotes:
	- following a word
	- optionally, following a sentence punctuation
	- optionally, preceding a space or a sentence punctuation

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified standalone right single quote
*/
export function identifyStandaloneRightSingleQuote(string, locale) {

	return string.replace(
		new RegExp(
			"(["+ locale.allChars +"])"
		+ "(["+ locale.sentencePunctuation +"])?"
		+ "(" + locale.singleQuoteAdepts + ")"
		+ "([ "+ locale.sentencePunctuation +"])?",
			"g"
		),
			"$1"
		+ "$2"
		+ "{{typopo__right-single-quote--standalone}}"
		+ "$4"
	);

}




/*
	Identify double quote pairs 

	Example
	"a 'quoted material' here" → “a ‘quoted material’ here”

	Assumptions and Limitations


	This function assumes apostrophes and standalone single quotes were identified. The function itself is part of the {TBD}.

	Since it is difficult to identify all contractions at the end of the word, double quotes pairs are identified only in few cases:
	- around a single word
	- one double quote pair around longer text when enclosed in double quotes

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified single quote pairs
*/
export function identifySingleQuotePairs(string, locale) {

	// identify a single quote pair around a single word	
	string = string.replace(
		new RegExp(
			"({{typopo__left-single-quote--standalone}})"
		+ "([" + locale.allChars + "]+)"
		+ "({{typopo__right-single-quote--standalone}})",
			"g"
		),
			"{{typopo__left-single-quote}}"
		+ "$2"
		+ "{{typopo__right-single-quote}}"
	);

	// identify one phrase wrapped in single quotes
	string = string.replace(
		new RegExp(
			"({{typopo__left-single-quote--standalone}})"
		+ "(.*)"
		+ "({{typopo__right-single-quote--standalone}})",
			"g"
		),
			"{{typopo__left-single-quote}}"
		+ "$2"
		+ "{{typopo__right-single-quote}}"
	);

	return string;
}






/*
	Replace a single qoute & a single prime with a single quote pair

	Assumptions and Limitations
	This function follows previous functions that identify single primes or standalone single quotes.
	So it may happen that previous functions falsely identify a single quote pair around situations such as:
	- He said: “What about 'Localhost 3000', is that good?”

	Algorithm 
	Find standalone single quote and single prime in pair and change them to a single quote pair


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with a single quote pair
*/
export function replaceSinglePrimeWSingleQuote(string, locale) {

	string = string.replace(
		new RegExp(
			"({{typopo__left-single-quote--standalone}})"
		+ "(.*?)"
		+ "({{typopo__single-prime}})",
			"g"
		),
			"{{typopo__left-single-quote}}"
		+ "$2"
		+ "{{typopo__right-single-quote}}"
	);

	string = string.replace(
		new RegExp(
			"({{typopo__single-prime}})"
		+ "(.*?)"
		+ "({{typopo__right-single-quote--standalone}})",
			"g"
		),
			"{{typopo__left-single-quote}}"
		+ "$2"
		+ "{{typopo__right-single-quote}}"
	);	

	return string;
}




/*
	Identify single quote pairs 

	Example
	"quoted material" → “quoted material”


	Assumptions and Limitations
	We assume that double primes, inches and arcseconds were identified in the previous run.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified double quote pairs
*/
export function identifyDoubleQuotePairs(string, locale) {
	// double quotes around a number
	string = string.replace(
		new RegExp(
			"(" + locale.doubleQuoteAdepts + ")"
		+ "(\\d+)"
		+ "({{typopo__double-prime}})",
			"g"
		),
			"{{typopo__left-double-quote}}"
		+ "$2"
		+ "{{typopo__right-double-quote}}"
	);

	// generic rule
	string = string.replace(
		new RegExp(
			"(" + locale.doubleQuoteAdepts + ")"
		+ "(.*?)"
		+ "(" + locale.doubleQuoteAdepts + ")",
			"g"
		),
			"{{typopo__left-double-quote}}"
		+ "$2"
		+ "{{typopo__right-double-quote}}"
	);

	return string;
}








/*
	Remove extra space around a single prime

	Example
	12 ′ 45″ →
	12′ 45″


	Assumptions and Limitations
	The functions runs after all single quotes and single primes have been identified. 


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with adjusted spacing around single quotes and single primes
*/
export function removeExtraSpaceAroundSinglePrime(string, locale) {	


	return string.replace(
		new RegExp(
			"(["+ locale.spaces +"])"
		+ "("+ locale.singlePrime +")", 
			"g"
		),
		"$2"
	)
}




/*
	Replace all identified punctuation with appropriate punctuation in given language

	Context
	In single-quotes module, we first identify single quote and single prime adepts, and then we  replace them temporarily with labels as “{{typopo__single-prime}}”. 
	This is the function in the sequence to swap temporary labels to desired quotes.
	

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} an output with locale-specific single quotes and single primes
*/
export function placeLocaleSingleQuotes(string, locale) {

	string = string.replace(/({{typopo__single-prime}})/g, locale.singlePrime);

	string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--standalone}}|{{typopo__right-single-quote--standalone}}/g, locale.apostrophe);

	string = string.replace(/{{typopo__left-single-quote}}/g, locale.leftSingleQuote);
	string = string.replace(/{{typopo__right-single-quote}}/g, locale.rightSingleQuote);

	return string;
}








/*
	Corrects improper use of single quotes, single primes and apostrophes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.
	Further, single quotes are used as secondary and they're properly spaced,
	e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)

	Algorithm
	[1] Identify common apostrophe contractions
	[1.5] Identify feet, arcminutes, minutes
	[2] Identify single quotes
	[3] empty, previously 1.5
	[4] Replace a single qoute & a single prime with a single quote pair
	[4.5] Consolidate spaces around single quotes and primes
	[5] Identify residual apostrophes that have left
	[6] Replace all identified punctuation with appropriate punctuation in given language
	[7] Consolidate spaces around single primes

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
export function fixSingleQuotesPrimesAndApostrophes(string, locale) {

	/* [1] Identify common apostrophe contractions */
	string = identifyContractedAnd(string, locale);
	string = identifyContractedBeginnings(string, locale);
	string = identifyInWordContractions(string, locale);
	string = identifyContractedYears(string, locale);
	string = identifyContractedEnds(string, locale);


	/* [1.5] Identify feet, arcminutes, minutes */
	string = identifySinglePrimes(string, locale);


	/* [2] Identify single quotes within double quotes */
	let pattern = "(" + locale.doubleQuoteAdepts + ")(.*?)(" + locale.doubleQuoteAdepts + ")";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){

		// identify {{typopo__left-single-quote--standalone}}
		let pattern =
				"([" + locale.spaces + locale.emDash + locale.enDash + "])"
			+ "(" + locale.singleQuoteAdepts + "|,)"
			+ "(["+ locale.allChars +"])";
		let re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--standalone}}$3");



		$2 = identifyStandaloneRightSingleQuote($2, locale);
		$2 = identifySingleQuotePairs($2, locale);

		return $1 + $2 + $3;
	});








	/* [4] Replace a single qoute & a single prime with a single quote pair */
	string = replaceSinglePrimeWSingleQuote(string, locale);


	/* [4.5] Consolidate spaces around single quotes and primes */



	/* [5] Identify residual apostrophes that have left */
	// tbd decide how to address this
	// pattern = "(" + locale.singleQuoteAdepts + ")";
	// re = new RegExp(pattern, "g");
	// string = string.replace(re, "{{typopo__apostrophe}}");


	/* [6] Replace all identified punctuation with appropriate punctuation in given language */
	string = placeLocaleSingleQuotes(string,locale);

	/* [7] Consolidate spaces around single primes */
	string = removeExtraSpaceAroundSinglePrime(string, locale);

	return string;
}
