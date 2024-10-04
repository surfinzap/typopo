/*
  Removes mutliple spaces between words 

  @param {string} string — input text for identification
  @returns {string} — output with removed spaces between words
*/
export function removeMultipleSpaces(string, locale) {
  let pattern = 
      "(\\S)"
    + "([" + locale.spaces + "]{2,})"
    + "(\\S)";
	let re = new RegExp(pattern, "g");
  return string.replace(re, "$1 $3");
}



/*
  Removes extra spaces and tabs at the beginning of each paragraph, unless user configures to keep spaces before beginning of the nested markdown lists
  
	[1] split the lines manually
  [2] if removeWhitespacesBeforeMarkdownList = false; keep the spaces before the markdown lists
  [3] otherwise remove other empty spaces or tabs at the beginning of the paragraph
	[4] join lines together to a single string

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces at the beginning of paragraphs
*/
export function removeSpacesAtParagraphBeginning(string, locale, configuration) {
	/* [1] split the lines manually */
	let lines = string.split(/\r?\n/);

  let pattern = "(^\\s+)([-\\*\\+]*)"; // identify whitespaces and markdown list indicators -/*
  let re = new RegExp(pattern, "g");


  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(re, function ($0, $1, $2) {
        /* [2] */
      if (configuration.removeWhitespacesBeforeMarkdownList == false && $2 !="") {
          return $1 + $2;
        /* [3] */  
        } else {
          return $2
        }
      }
    );
  }

	/* [4] join lines together to a single string */
	return lines.join("\n");
}



/*
  Removes extra spaces and tabs at the end of each paragraph.

  [1] split the lines manually
  [2] remove empty spaces or tabs at the end of the paragraph
  [3] join lines together to a single string
  
  @param {string} string — input text for identification
  @returns {string} — output with removed spaces at the end of paragraphs
  */
 export function removeSpacesAtParagraphEnd(string) {
   /* [1] split the lines manually */
   let lines = string.split(/\r?\n/);
   let pattern = "(\\s+$)"; 
   let re = new RegExp(pattern, "g");
   
   /* [2] remove empty spaces or tabs at the end of the paragraph*/
   for (let i = 0; i < lines.length; i++) {
     lines[i] = lines[i].replace(re, "");
   }  

   /* [3] join lines together to a single string */
   return lines.join("\n");
}




export function removeSpaceBeforeSentencePausePunctuation(string, locale) {
	let pattern = "([" + locale.spaces + "])([" + locale.sentencePausePunctuation + "])([^\\-\\)]|$)";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$2$3");
}



/*
	Removes extra space before:
	- terminal punctuation
	- closing brackets
	- degree symbol (°)

	Examples:
	Hey . → Hey.
	Sentence and… ! → Sentence and…!
	Something (… ) something else → Something (…) something else
	5 ° → 5°

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces before terminal punctuation
*/
export function removeSpaceBeforeTerminalPunctuation(string, locale) {
	let pattern =
			"([" + locale.spaces + "])"
		+ "([" + locale.terminalPunctuation + locale.closingBrackets + locale.degree + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}



/*
	Removes extra spaces before ordinal indicator

	Examples:
	1 st → 1st
	2 nd → 2nd
	1 . spoj → 1. spoj

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces before ordinal indicator
*/
export function removeSpaceBeforeOrdinalIndicator(string, locale) {
	let pattern =
				"("+ locale.cardinalNumber + ")"
			+ "(["+ locale.spaces +"]?)"
			+ "("+ locale.ordinalIndicator +")"
			+ "([" + locale.spaces + "]|\\b)"; //to avoid cathing "4 th" in "4 there"
	let re = new RegExp(pattern, "g");
	let replacement = "$1$3$4";

	return string.replace(re, replacement);
}



export function removeSpaceAfterOpeningBrackets(string, locale) {
	let pattern =
			"([" + locale.openingBrackets + "])"
		+	"([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}


/*
	Add a space before opening brackets

	Examples:
	Enclosed(in) the brackets. →
	Enclosed (in) the brackets.

	Enclosed[in] the brackets. →
	Enclosed [in] the brackets.

	Enclosed{in} the brackets. →
	Enclosed {in} the brackets.

	Exclusions:
	name(s) → name(s)
	NAME(S) → NAME(S)
	mass(es) → mass(es)
	MASS(ES) → MASS(ES)

	@param {string} string — input text for identification
	@returns {string} — output with a space before an opening bracket
*/
export function addSpaceBeforeOpeningBrackets(string, locale) {
	let pattern =
			"([" + locale.lowercaseChars + locale.uppercaseChars + "])"
		+ "([" + locale.openingBrackets + "])"
		+ "([" + locale.lowercaseChars + locale.uppercaseChars + locale.ellipsis + "])"
		+ "([" + locale.lowercaseChars + locale.uppercaseChars + locale.ellipsis + locale.closingBrackets + "])";
	let re = new RegExp(pattern, "g");

	return string.replace(re, function ($0, $1, $2, $3, $4) {
		if ($3 == "s" | $3 == "S" | $3 + $4 == "es" | $3 + $4 == "ES" ) {
			return $1 + $2 + $3 + $4;
		} else {
			return $1 + locale.space + $2 + $3 + $4;
		}
	});
}


/*
	Add a space after terminal punctuation

	Example:
	One sentence ended.Another started. →
	One sentence ended. Another started.

	@param {string} string — input text for identification
	@returns {string} — output with a space after terminal punctuation
*/
export function addSpaceAfterTerminalPunctuation(string, locale) {
	var pattern =
			"([" + locale.lowercaseChars + locale.uppercaseChars + "]{2,}|["+ locale.ellipsis + "])"
		+ "([" + locale.terminalPunctuation + "])"
		+ "([" + locale.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}


/*
	Add a space after sentence pause punctuation

	Example:
	One sentence ended,another started. →
	One sentence ended, another started.

	@param {string} string — input text for identification
	@returns {string} — output with a space after closing brackets
*/
export function addSpaceAfterSentencePause(string, locale) {
	var pattern =
			"([" + locale.lowercaseChars + locale.uppercaseChars + "]{2,}|["+ locale.ellipsis + "])"
		+ "([" + locale.sentencePausePunctuation + "])"
		+ "([" + locale.lowercaseChars + locale.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}



/*
	Add a space after closing brackets

	Example:
	Enclosed (in)the brackets. → Enclosed (in) the brackets.

	@param {string} string — input text for identification
	@returns {string} — output with a space after closing brackets
*/
export function addSpaceAfterClosingBrackets(string, locale) {
	var pattern =
			"([" + locale.closingBrackets + "])"
		+ "([" + locale.lowercaseChars + locale.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2");
}




export function addSpaceBeforeSymbol(string, symbol, locale) {
	let pattern = "([^" + locale.spaces + locale.openingBrackets + "])("+ symbol +")";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.space + "$2";

	return string.replace(re, replacement);
}




export function fixSpaces(string, locale, configuration) {
	string = removeMultipleSpaces(string, locale);
	string = removeSpacesAtParagraphBeginning(string, locale, configuration);
	string = removeSpacesAtParagraphEnd(string, locale);
	string = removeSpaceBeforeSentencePausePunctuation(string, locale);
	string = removeSpaceBeforeTerminalPunctuation(string, locale);
	string = removeSpaceBeforeOrdinalIndicator(string, locale);
	string = removeSpaceAfterOpeningBrackets(string, locale);
	string = addSpaceBeforeOpeningBrackets(string, locale);
	string = addSpaceAfterTerminalPunctuation(string, locale);
	string = addSpaceAfterClosingBrackets(string, locale);
	string = addSpaceAfterSentencePause(string, locale);
	return string;
}
