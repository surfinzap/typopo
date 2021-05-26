/*
TODO
- make identification of and contractions more robust + implement an exception for press 'N'





*/


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

	string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--adept}}|{{typopo__right-single-quote--adept}}/g, locale.apostrophe);

	string = string.replace(/{{typopo__left-single-quote}}/g, locale.leftSingleQuote);
	string = string.replace(/{{typopo__right-single-quote}}/g, locale.rightSingleQuote);

	return string;
}



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

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedYears(string, locale) {	
	return string.replace(
		new RegExp(
			"([" + locale.spaces + "])"
		+ "(" + locale.singleQuoteAdepts + ")"
		+ "([" + locale.cardinalNumber + "]{2})", 
			"g"
		),
			"$1"
		+ "{{typopo__apostrophe}}"
		+ "$3"
	);
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
	[2] Identify single quotes
	[3] Identify feet, arcminutes, minutes
	[4] Reconsider wrongly identified left quote and prime
	[5] Identify residual apostrophes that have left
	[6] Replace all identified punctuation with appropriate punctuation in given language

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


	/* [2] Identify single quotes within double quotes */
	let pattern = "(" + locale.doubleQuoteAdepts + ")(.*?)(" + locale.doubleQuoteAdepts + ")";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){

		// identify {{typopo__left-single-quote--adept}}
		let pattern =
				"([" + locale.spaces + locale.emDash + locale.enDash + "])"
			+ "(" + locale.singleQuoteAdepts + "|,)"
			+ "(["+ locale.allChars +"])";
		let re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		// identify {{typopo__right-single-quote--adept}}
		pattern = "(["+ locale.allChars +"])([.,!?])?(" + locale.singleQuoteAdepts + ")([ .,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

		// identify single quote pairs around single words
		pattern = "({{typopo__left-single-quote--adept}})([" + locale.allChars + "]+)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		// identify single quote pairs around multiple word phrases
		// (assuming such phrase will occur only once)
		pattern = "({{typopo__left-single-quote--adept}})(.*)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		return $1 + $2 + $3;
	});


	/* [3] Identify feet, arcminutes, minutes
				 Note: we’re not using locale.singleQuoteAdepts variable
				 as commas and low-positioned quotes are ommited */
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");


	/* [4] Reconsider wrongly identified left quote and prime

		 Take following example:
		 He said: “What about 'Localhost 3000', is that good?”

		 So far, the algorithm falsely identifies prime folowing the number
		 and unclosed left single quote.
		 We'll find that identifications and swap it back to single quote pair.
	*/
	pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__single-prime}})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");


	/* [5] Identify residual apostrophes that have left */
	// tbd decide how to address this
	// pattern = "(" + locale.singleQuoteAdepts + ")";
	// re = new RegExp(pattern, "g");
	// string = string.replace(re, "{{typopo__apostrophe}}");


	/* [6] Replace all identified punctuation with appropriate punctuation in given language */
	string = placeLocaleSingleQuotes(string,locale);


	return string;
}
