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
export function fixDash(string, locale) {
	let dashes = "-–—"; // including a hyphen

	/* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
	string = string.replace(/(---)/g, "—");


	/* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
	string = string.replace(/(--)/g, "–");


	/* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
	let pattern = "[" + locale.spaces + "][" + dashes + "][" + locale.spaces + "]";
	let re = new RegExp(pattern, "g");
	let replacement = locale.narrowNbsp + "—" + locale.hairSpace;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */
	pattern = "(" + locale.cardinalNumber + ")([" + locale.spaces + "]?[" + dashes + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1–$3");


	/* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */

	pattern = "(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")([" + locale.spaces + "]?[" + dashes + "][" + locale.spaces + "]?)(" + locale.cardinalNumber + ")(" + locale.ordinalIndicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}
