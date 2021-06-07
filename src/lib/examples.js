/*
	What the function does? e.g. Replace 3 and more…

	Example


	Exceptions


	Assumptions and Limitations


	Theory


	Algorithm 


	@param {string} string: input text for identification
	@param {string} locale: locale option
	@returns {string} output with ...
*/
export function name(string, locale) {	
	let pattern =
			"(\\b)"
		+ "(["+ locale.romanNumerals + "]+)"
		+ "(" + locale.romanOrdinalIndicator +")"
		+ "(["+ locale.spaces +"]?)"
		+ "(["+ locale.allChars + locale.cardinalNumber + "])";
	let re = new RegExp(pattern, "g");
	let replacement = locale.ellipsis;

	return string.replace(re, replacement); 

	// shorter version
	string = string.replace(
		new RegExp(
			"("+ locale.leftDoubleQuote +")"
		+ "(["+ locale.spaces +"])", 
			"g"
		),
		"$1"
	);


}


/* test */
describe('Test case (en):\n', () => {
	let testCase = {
		...somePartialTestCase,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				unitFunction(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
		it("module test", () => {
			assert.strictEqual(
				moduleFunction(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
	});
});
