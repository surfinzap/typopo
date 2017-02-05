import constants from '../constants';
import loc from "../../locale/locale";

/*
	Corrects improper use of single quotes, single primes and apostrophes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.
	Further, single quotes are used as secondary and they're properly spaced,
	e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)

	Algorithm
	[1] Identify common apostrohe contractions
	[2] Identify single quotes
	[3] Identify feet, arcminutes, minutes
	[4] Identify residual apostrophes that have left
	[?] Swap right single quote adepts with a puntuation
			(We were swapping single quotes as part of algorithm a while a back,
			but since it is more probable that single quotes are in the middle of the
			sentence, we havae dropped swapping as a part of the algorithm)
	[6] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
export function correctSingleQuotesPrimesAndApostrophes(string, locale) {

	/* [1.1] Identify ’n’ contractions */
	var pattern = "(" + constants.singleQuoteAdepts + ")(n)(" + constants.singleQuoteAdepts + ")";
	var re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");


	/* [1.2] Identify common contractions at the beginning or at the end
					 of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
	var contraction_examples = "em|cause|twas|tis|til|round"
	pattern = "(" + constants.singleQuoteAdepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2");


	/* [1.3] Identify in-word contractions,
					 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + constants.lowercaseChars + constants.uppercaseChars;
	pattern = "(["+ character_adepts +"])(" + constants.singleQuoteAdepts + ")(["+ character_adepts +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__apostrophe}}$3");


	/* [1.4] Identify year contractions
		 e.g. ’70s, INCHEBA ’89,… */
	pattern = "(" + constants.singleQuoteAdepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}$2");


	/* [2] Identify single quotes within double quotes */
	pattern = "(" + constants.doubleQuoteAdepts + ")(.*?)(" + constants.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){

		//identify {{typopo__left-single-quote--adept}}
		var pattern = "( )(" + constants.singleQuoteAdepts + ")(["+ constants.lowercaseChars + constants.uppercaseChars +"])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		//identify {{typopo__right-single-quote--adept}}
		pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars +"])([\.,!?])?(" + constants.singleQuoteAdepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

		//identify single quote pairs
		pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		return $1 + $2 + $3;
	});


	/* [3] Identify feet, arcminutes, minutes
				 Note: we’re not using constants.singleQuoteAdepts variable
				 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");


	/* [4] Identify residual apostrophes that have left */
	pattern = "(" + constants.singleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}");



	/* [5] Punctuation replacement */
	string = string.replace(/({{typopo__single-prime}})/g, "′");
	string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--adept}}|{{typopo__right-single-quote--adept}}/g, "’");

	let leftSingleQuote = loc.locale[locale].quotes.leftSingleQuote;
	let rightSingleQuote = loc.locale[locale].quotes.rightSingleQuote;

	string = string.replace(/{{typopo__left-single-quote}}/g, leftSingleQuote);
	string = string.replace(/{{typopo__right-single-quote}}/g, rightSingleQuote);

	return string;
}
