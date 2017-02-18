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
	[5] Reconsider wrongly identified left quote and prime
	[6] Fix spacing around quotes and primes
	[7] Swap back some of the double quotes with a punctuation
	[9] Remove extra punctuation around quotes
	[9] Add spaces around quotes where missing
	[10] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language option
	@returns {string} output with properly replaces double qoutes and double primes
*/
export function fixDoubleQuotesAndPrimes(string, locale) {

	/* [0] Remove extra terminal punctuation around double quotes
					 e.g. “We will continue tomorrow.”. */
	let pattern = "([" + locale.sentencePunctuation + "])("+ locale.doubleQuoteAdepts + ")([" + locale.sentencePunctuation + "])";
	let re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "("+ locale.doubleQuoteAdepts + ")([" + locale.terminalPunctuation + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');

	/* [2] Identify inches, arcseconds, seconds
				 Note: we’re not using locale.doubleQuoteAdepts variable
				 as commas and low-positioned quotes are ommited*/
	pattern = "(\\d[" + locale.spaces +"]?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})",
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__double-prime}}");

	/* [3] Identify closed double quotes */
	pattern = "(" + locale.doubleQuoteAdepts + ")(.*?)(" + locale.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");


	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + locale.doubleQuoteAdepts + ")([" + locale.lowercaseChars + locale.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote--unclosed}}$2");


	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + locale.lowercaseChars + locale.uppercaseChars + locale.sentencePunctuation + locale.ellipsis + "])(" + locale.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__right-double-quote--unclosed}}");


	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + locale.spaces + "])(" + locale.doubleQuoteAdepts + ")([" + locale.spaces + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [5] Reconsider wrongly identified left quote and prime

		 Take following example:
		 It’s called “Localhost 3000” and it’s pretty fast.

		 So far, our algorithm falsely identifies prime folowing the number
		 and unclosed left single quote.
		 We'll find that identifications and swap it back to double quote pair.
	*/
	pattern = "({{typopo__left-double-quote--unclosed}})(.*?)({{typopo__double-prime}})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");

	/* [6] Remove extra spaces around quotes and prime */
	string = string.replace(/({{typopo__left-double-quote}})( )/g, "$1");
	string = string.replace(/( )({{typopo__right-double-quote}})/g, "$2");
	string = string.replace(/( )({{typopo__double-prime}})/g, "$2");


	/* [7] Swap back some of the double quotes with a punctuation

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
	pattern = "([^" + locale.sentencePunctuation + "][" + locale.spaces + "]{{typopo__left-double-quote}}.+?)([" + locale.terminalPunctuation + "])({{typopo__right-double-quote}})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3$2");


	/* [8] Remove extra comma after punctuation in direct speech,
					 e.g. "“Hey!,” she said" */
	pattern = "([" + locale.sentencePunctuation + "])([\,])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1");


	/* [9.1] Add extra space before left quote, if it’s following word or sentence punctuation */
	pattern = "([" + locale.sentencePunctuation + locale.allChars + "])({{typopo__left-double-quote}})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $2");

	/* [9.2] Add extra space after right quote if it’s preceding a word */
	pattern = "({{typopo__right-double-quote}})([" + locale.allChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $2");


	/* [10] Punctuation replacement */
	string = string.replace(/({{typopo__double-prime}})/g, locale.doublePrime);
	string = string.replace(/({{typopo__left-double-quote}})/g, locale.leftDoubleQuote);
	string = string.replace(/({{typopo__left-double-quote--unclosed}})/g, locale.leftDoubleQuote);
	string = string.replace(/({{typopo__right-double-quote}})/g, locale.rightDoubleQuote);
	string = string.replace(/({{typopo__right-double-quote--unclosed}})/g, locale.rightDoubleQuote);

	return string;
}
