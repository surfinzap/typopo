/*
	Corrects improper use of double quotes and double primes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.

	Algorithm
	[0] Remove extra terminal punctuation around double quotes
	[1] Swap right double quote adepts with a punctuation
	    (this comes first as it is a quite common mistake that may eventually
		  lead to improper identification of double primes)
	[2] Identify inches, arcseconds, seconds
	[3] Identify closed double quotes
	[4] Identify the rest as unclosed double quotes (best-effort replacement)
	[5] Fix spacing around quotes and primes
	[6] Swap back some of the double quotes with a punctuation
	[7] Remove extra punctuation around quotes
	[8] Add spaces around quotes where missing
	[9] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language option
	@returns {string} output with properly replaces double qoutes and double primes
*/
export function fixDoubleQuotesAndPrimes(string, constants) {

	/* [0] Remove extra terminal punctuation around double quotes
					 e.g. “We will continue tomorrow.”. */
	let pattern = "([" + constants.sentencePunctuation + "])("+ constants.doubleQuoteAdepts + ")([" + constants.sentencePunctuation + "])";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "("+ constants.doubleQuoteAdepts + ")([" + constants.terminalPunctuation + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');

	/* [2] Identify inches, arcseconds, seconds
				 Note: we’re not using constants.doubleQuoteAdepts variable
				 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d ?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");


	/* [3] Identify closed double quotes */
	pattern = "(" + constants.doubleQuoteAdepts + ")(.*?)(" + constants.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");


	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + constants.doubleQuoteAdepts + ")([" + constants.lowercaseChars + constants.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2");


	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + constants.lowercaseChars + constants.uppercaseChars + constants.sentencePunctuation + constants.ellipsis + "])(" + constants.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__right-double-quote}}");


	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + constants.spaces + "])(" + constants.doubleQuoteAdepts + ")([" + constants.spaces + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [5] Remove extra spaces around quotes and prime */
	string = string.replace(/({{typopo__left-double-quote}})( )/g, "$1");
	string = string.replace(/( )({{typopo__right-double-quote}})/g, "$2");
	string = string.replace(/( )({{typopo__double-prime}})/g, "$2");


	/* [6] Swap back some of the double quotes with a punctuation

		 Idea
		 In [1] we have swapped all double right quotes by default with a terminal
		 punctuation. However, not all double quotes wrap the whole sentence and
		 there are cases when few words are quoted within a sentence. Take a look at
		 examples:
		 “Sentence qouted as a whole.” (full stop is placed within double quotes)
		 This is “quoted expression.” (full stop is placed outside double quotes)

		 Algorithm
		 Match all the double quote pairs that do not precede sentence punctuation
		 (and thus must be used within a sentence) and swap right double with
		 a terminal punctuation.
		 */
	pattern = "([^" + constants.sentencePunctuation + "][" + constants.spaces + "]{{typopo__left-double-quote}}.+?)([" + constants.terminalPunctuation + "])({{typopo__right-double-quote}})";
	// console.log(pattern);
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3$2");


	/* [7] Remove extra comma after punctuation in direct speech,
					 e.g. "“Hey!,” she said" */
	pattern = "([" + constants.sentencePunctuation + "])([\,])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1");


	/* [8.1] Add extra space before left quote, if it’s following word or sentence punctuation */
	pattern = "([" + constants.sentencePunctuation + constants.allChars + "])({{typopo__left-double-quote}})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $2");

	/* [8.2] Add extra space after right quote if it’s preceding a word */
	pattern = "({{typopo__right-double-quote}})([" + constants.allChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $2");


	/* [9] Punctuation replacement */
	string = string.replace(/({{typopo__double-prime}})/g, constants.doublePrime);

	string = string.replace(/({{typopo__left-double-quote}})/g, constants.leftDoubleQuote);
	string = string.replace(/({{typopo__right-double-quote}})/g, constants.rightDoubleQuote);

	return string;
}
