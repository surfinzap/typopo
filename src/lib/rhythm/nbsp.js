import constants from "../constants";

/*
	Consolidates the use of non-breaking spaces

	* removes characters between multi-character words
	* adds non-breaking spaces after cardinal numbers
	* adds non-breaking spaces around ×
	* adds non-breaking spaces after single-character prepositions

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string) {

	// removes non-breaking spaces between multi-character words
	var pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})(["+ constants.nbsp + constants.narrowNbsp +"])(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})";
	var re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after cardinal numbers
	pattern = "([0-9]+)( )(["+ constants.lowercaseChars + constants.uppercaseChars +"]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + constants.nbsp + "$3";
	string =  string.replace(re, replacement);


	// adds non-breaking spaces around ×
	pattern = "([" + constants.spaces + "])([×])([" + constants.spaces + "])";
	re = new RegExp(pattern, "g");
	replacement = constants.nbsp + "$2" + constants.nbsp;
	string = string.replace(re, replacement);


	// adds non-breaking spaces after single-character prepositions
	pattern = "([  ])([" + constants.lowercaseChars + constants.uppercaseChars + "]|&)( )";
	re = new RegExp(pattern, "g");
	replacement = "$1$2" + constants.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}
