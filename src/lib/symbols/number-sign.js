/*
	Remove extra space, nbsp, hairSpace, narrowNbsp
	after number sign and before number

	@param {string} string — input text for identification
	@returns {string} — output without extra spaces
*/
export function removeExtraSpacesAfterNumberSign(string, locale) {

	return string.replace(
		new RegExp(
				"(" + locale.numberSign + ")"
			+ "([" + locale.spaces + "]+)"
			+ "(" + locale.cardinalNumber + ")", 
			"g"
		),
		"$1$3"
	);

}



/*
	Consolidates the use of number sign (#)

	@param {string} string — input text for identification
	@returns {string} — output with properly used number sign
*/
export function fixNumberSign(string, locale) {
	string = removeExtraSpacesAfterNumberSign(string, locale);
	return string;
}
