import constants from "../constants";

/*
	Replaces hyphen with em or en dash

	Algorithm
	[1] Replace 3 consecutive hyphens (---) with an em dash (—)
	[2] Replace 2 consecutive hyphens (--) with an en dash (—)
	[3] Replace any hyphen or dash surrounded with spaces with an em dash
	[4] Replace hyphen or dash used in number range with an en dash
			and set proper spacing

	@param {string} string — input text for identification
	@returns {string} — output with dashes instead of hyphens
*/
export function fixDash(string, language) {
	var dashes = "-–—"; // including a hyphen

	/* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
	string = string.replace(/(---)/g, "—");


	/* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
	string = string.replace(/(--)/g, "–");


	/* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
	var pattern = "[" + constants.spaces + "][" + dashes + "][" + constants.spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = constants.narrowNbsp + "—" + constants.hairSpace;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */
	var cardinal_number = "\\d+";
	pattern = "(" + cardinal_number + ")([" + constants.spaces + "]?[" + dashes + "][" + constants.spaces + "]?)(" + cardinal_number + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1–$3");


	/* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */
	var ordinal_indicator = "";
	switch (language) {
		case "rue":
		case "sk":
		case "cs":
			ordinal_indicator = "\\.";
			break;
		case "en":
			ordinal_indicator = "st|nd|rd|th";
			break;
	}
	pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + constants.spaces + "]?[" + dashes + "][" + constants.spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}
