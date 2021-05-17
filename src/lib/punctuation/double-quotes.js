/*
	Remove extra punctuation before double quotes

	Example
	“Hey!,” she said" → “Hey!” she said

	Exceptions
	(cs/sk) Byl to “Karel IV.”, ktery neco…
	č., s., fol., str.,


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with removed extra terminal punctuation
*/
export function removeExtraPunctuationBeforeQuotes(string, locale) {
	let pattern =
				"([^"+ locale.romanNumerals + "])"
			+ "([" + locale.sentencePunctuation + "])"
			+ "([" + locale.sentencePunctuation + "])"
			+ "("  + locale.doubleQuoteAdepts + ")"
	let re = new RegExp(pattern, "g");

	return string.replace(re, "$1$2$4"); 
}



/*
	Remove extra punctuation after double quotes

	Example
	“We will continue tomorrow.”. → “We will continue tomorrow.”

	Exceptions
	(cs/sk) Byl to “Karel IV.”, ktery neco…


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with removed extra terminal punctuation
*/
export function removeExtraPunctuationAfterQuotes(string, locale) {
	let pattern =
				"([^"+ locale.romanNumerals + "])"
			+ "([" + locale.sentencePunctuation + "])"
			+ "("  + locale.doubleQuoteAdepts + ")"
			+ "([" + locale.sentencePunctuation + "])"
	let re = new RegExp(pattern, "g");

	return string.replace(re, "$1$2$3"); 
}


/*
	Swap double quotes and terminal punctuation

	This is a dumb algorithm to swaps double qoutes and terminal punctuation (.!?) regardless of the context. This algorithm runs early in the overal sequence as we want to avoide false identification of double primes that will follow.

	Two different rules:
	1. Quotes contain only quoted material:
	“Sometimes it can be a whole sentence.”
	Sometimes it can be only a “quoted part”.
	The difference is where the terminal and sentence pause punctuation is.

	2. American editorial style
	Similar as the first rule, but commas (,) and periods (.) go before closing quotation marks, regardless whether they are part of the quoted material.

	The aim here is to support the first rule.

	Example
	TBD

	Exceptions
	TBD


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with swapped double quotes and terminal punctuation
*/
export function swapQuotesAndTerminalPunctuation(string, locale) {
	let pattern =
				"("+ locale.doubleQuoteAdepts + ")"
			+ "([" + locale.terminalPunctuation + locale.ellipsis + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, '$2$1');
}



/*
	Identify inches, arcseconds, seconds following a 1–3 numbers
	
	It's a dumb algorithm that picks all the options after a number, regardless of whether they may be quotes

	Example
	12′ 45" → 12′ 45″

	How this alg impacts module
	It falsely identifies inches, where we are expecting quotes, e.g.
	"Konference 2020" in quotes → “Konference 2020” in quotes 
	→ this is corrected in [TBD]

	Implementation note
	We’re not using locale.doubleQuoteAdepts variable
	as commas, low-positioned quotes, guillemets are ommited

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified double primes as a temporary variable string, e.g. {{typopo__double-prime}}
*/
export function identifyDoublePrimes(string, locale) {
	let pattern = 
			"(\\d{1,3}[" + locale.spaces +"]?)"
		+ "(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1{{typopo__double-prime}}");
}


/*
	Identify double quote pairs 

	Example
	"quoted material" → “quoted material”


	Assumptions and Limitations
	We assume that double primes, inches and arcseconds were identified in the previous run.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified double quote pairs
*/
export function identifyDoubleQuotePairs(string, locale) {
	let pattern = 
			"(" + locale.doubleQuoteAdepts + ")"
		+ "(.*?)"
		+ "(" + locale.doubleQuoteAdepts + ")";

	let re = new RegExp(pattern, "g");
	return string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");
}



/*
	After identifying double quote pairs, identify standalone left double quotes.

	Example
	There is a "standalone left quote. →
	There is a “standalone left quote.

	Assumptions and Limitations
	Double quote pairs have been identified in the analysed text already

	TODO
	- why is the standalone quote identified only before letters? 


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified standalone left double quotes
*/
export function identifyStandaloneLeftDoubleQuote(string, locale) {

	let pattern = 
			"(" + locale.doubleQuoteAdepts + ")"
		+ "([" + locale.lowercaseChars + locale.uppercaseChars + "])";

	let re = new RegExp(pattern, "g");
	return string.replace(re, "{{typopo__left-double-quote--standalone}}$2");
}



/*
	After identifying double quote pairs, identify standalone right double quotes.

	Example
	There is a standalone" right quote. →
	There is a standalone” right quote.

	Assumptions and Limitations
	Double quote pairs have been identified in the analysed text already

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with identified standalone right double quotes
*/
export function identifyStandaloneRightDoubleQuote(string, locale) {

	let pattern = 
			"([" + locale.lowercaseChars + locale.uppercaseChars + locale.sentencePunctuation + locale.ellipsis + "])"
		+ "(" + locale.doubleQuoteAdepts + ")";
	let re = new RegExp(pattern, "g");
	
	return string.replace(re, "$1{{typopo__right-double-quote--standalone}}");
}



/*
	Remove double quotes that cannot be identified whether they are left or right double quotes. 

	Example
	word " word → word word

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with removed unidentified double quotes
*/
export function removeUnidentifiedDoubleQuote(string, locale) {
	let pattern = 
			"([" + locale.spaces + "])"
		+ "(" + locale.doubleQuoteAdepts + ")"
		+ "([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}



/*
	Replace a double qoute & a double prime with a double quote pair

	Assumptions and Limitations
	This function follows previous functions that identify double primes or standalone double quotes.
	So it may happen that previous functions falsely identify a double quote pair around situations such as:
	- It’s called “Localhost 3000” and it’s pretty fast.


	Algorithm 
	Find standalone double quote and double prime in pair and change them to a double quote pair


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with a double quote pair
*/
export function replaceDoublePrimeWDoubleQuote(string, locale) {
	let pattern = 
			"({{typopo__left-double-quote--standalone}})"
		+ "(.*?)"
		+ "({{typopo__double-prime}})";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");
}



/*
 Swap quotes and terminal punctuation for a quoted part

	Assumptions
	Double quotes are identified with temporary identifier.

	Context
	In 'swapQuotesAndTerminalPunctuation' we have swapped all double right quotes by default with a terminal 		punctuation. However, quotes should contain only quoted material and 'swapQuotesAndTerminalPunctuation' falsely swaps terminal punctuation also for only “quoted part”.
	
	Examples
	“Sometimes it can be a whole sentence.”
	Sometimes it can be only a “quoted part”.

	So we’re looking to swap here:
	Sometimes it can be only a “quoted part.” →
	Sometimes it can be only a “quoted part”.

	Exceptions
	Byl to “Karel IV.”, ktery 


	Algorithm
	1. Match all the double quote pairs that do not precede sentence punctuation (and thus must be used within a sentence) 
	2. Swap right double quote with a terminal punctuation. Make sure the pattern is not greedy and it won’t catch multiple double quote pairs. This is important otherwise the algorithm would also falsely catch a whole quoted sentence.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with swapped double quotes and terminal punctuation within a quoted part
*/
export function swapQuotesAndTerminalPunctuationForQuotedPart(string, locale) {	
	let pattern =
			"([^" + locale.sentencePunctuation + "])"
		+ "([" + locale.spaces + "])"
		+ "(" + locale.leftDoubleQuote + ")"
		+ "([^" + locale.rightDoubleQuote +"]+?)"
		+ "([^" + locale.romanNumerals + "])"
		+ "([" + locale.terminalPunctuation + locale.ellipsis + "])"
		+ "(" + locale.rightDoubleQuote + ")";


	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2$3$4$5$7$6");
}



/*
	Replace all identified punctuation with appropriate punctuation in given language

	Algorithm 
	In double-quotes module, we first identify double quote and double prime adepts, and then temporarily replace them with labels as “{{typopo__double-prime}}”. 
	This is the last function in the sequence to swap temporary labels to desired quotes.


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} an output with locale-specific double quotes and double primes
*/
export function placeLocaleDoubleQuotes(string, locale) {
	string = string.replace(
		/{{typopo__double-prime}}/g, 
		locale.doublePrime);
	string = string.replace(
		/({{typopo__left-double-quote}}|{{typopo__left-double-quote--standalone}})/g, 
		locale.leftDoubleQuote);
	string = string.replace(
		/({{typopo__right-double-quote}}|{{typopo__right-double-quote--standalone}})/g, 
		locale.rightDoubleQuote);

	return string;
}



/*
	Remove an extra comma after sentence punctuation in direct speech

	Example
	“Hey!,” she said →
	“Hey!” she said

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with ...
*/
export function removeExtraCommaAfterSentencePunctuation(string, locale) {	
	let pattern = 
			"([" + locale.sentencePunctuation + "])"
		+ "([,])"
		+ "(" + locale.rightDoubleQuote +")";

	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1$3");
}





/*
	Remove extra spaces around quotes and primes

	Example
	“ English ” →
	“English”

	12′ 45 ″ →
	12′ 45″


	Assumptions and Limitations
	The functions runs after all double quotes and double primes have been identified. 


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with adjusted spacing around double quotes and double primes
*/
export function removeExtraSpacesAroundQuotes(string, locale) {	

	string = string.replace(
		new RegExp(
			"("+ locale.leftDoubleQuote +")"
		+ "(["+ locale.spaces +"])", 
			"g"
		),
		"$1"
	)


	string = string.replace(
		new RegExp(
			"(["+ locale.spaces +"])"
		+ "("+ locale.rightDoubleQuote +")", 
			"g"
		),
		"$2"
	)


	string = string.replace(
		new RegExp(
			"(["+ locale.spaces +"])"
		+ "("+ locale.doublePrime +")", 
			"g"
		),
		"$2"
	)

	return string; 
}



/*
	Add a missing space before a left double quote

	Example
	It’s a“nice” saying. →
	It’s a “nice” saying.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with added space before left double quote
*/
export function addSpaceBeforeLeftDoubleQuote(string, locale) {	

	return string.replace(
		new RegExp(
			"([" + locale.sentencePunctuation + locale.allChars + "])"
		+ "(["+ locale.leftDoubleQuote +"])", 
			"g"
		),
		"$1 $2"
	)
}



/*
	Add a missing space after a right double quote

	Example
	It’s a “nice”saying. →
	It’s a “nice” saying.

	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with added space after a right double quote
*/
export function addSpaceAfterRightDoubleQuote(string, locale) {	

	return string.replace(
		new RegExp(
			"([" + locale.rightDoubleQuote + "])"
		+ "([" + locale.allChars + "])",
			"g"
		),
		"$1 $2"
	)
}




/*
	Correct improper use of double quotes and double primes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.

	Algorithm
	[0] Remove extra terminal punctuation around double quotes
	[1] Swap right double quote adepts with a terminal punctuation
	[2] Identify inches, arcseconds, seconds
	[3] Identify double quote pairs
	[4] Identify standalone double quotes
	[5] Replace a double qoute & a double prime with a double quote pair
	[6] Replace all identified punctuation with appropriate punctuation in given language
	[7] Consolidate spaces around double quotes and primes
	[8] Swap quotes and terminal punctuation for a quoted part
	[9] Remove extra comma after punctuation in direct speech

  @param {string} string: input text for identification
  @param {string} locale: locale option
	@returns {string} output with properly replaces double qoutes and double primes
*/
export function fixDoubleQuotesAndPrimes(string, locale) {

	/* [0] Remove extra terminal punctuation around double quotes */
	string = removeExtraPunctuationBeforeQuotes(string, locale);
	string = removeExtraPunctuationAfterQuotes(string, locale);

	/* [1] Swap right double quote adepts with a terminal punctuation */
	string = swapQuotesAndTerminalPunctuation(string, locale)

	/* [2] Identify inches, arcseconds, seconds */
	string = identifyDoublePrimes(string, locale);
	
	/* [3] Identify double quote pairs */
	string = identifyDoubleQuotePairs(string, locale);

	/* [4] Identify standalone double quotes */
	string = identifyStandaloneLeftDoubleQuote(string, locale);
	string = identifyStandaloneRightDoubleQuote(string, locale);
	string = removeUnidentifiedDoubleQuote(string, locale);
		
	/* [5] Replace a double qoute & a double prime with a double quote pair */
	string = replaceDoublePrimeWDoubleQuote(string, locale);
	
	/* [6] Replace all identified punctuation with appropriate punctuation in given language */
	string = placeLocaleDoubleQuotes(string, locale);
	
	/* [7] Consolidate spaces around double quotes and primes */
	string = removeExtraSpacesAroundQuotes(string, locale);
	string = addSpaceBeforeLeftDoubleQuote(string, locale);
	string = addSpaceAfterRightDoubleQuote(string, locale);

	/* [8] Swap quotes and terminal punctuation for a quoted part */
	string = swapQuotesAndTerminalPunctuationForQuotedPart(string, locale);

	/* [9] Remove an extra comma after sentence punctuation in direct speech */
	string = removeExtraCommaAfterSentencePunctuation(string, locale);

	return string;
}
