let exceptions = []

/*
	Identifies exceptions that will be ommited from correction of any sort

	Algorithm
	[1] Identify email adresses
	[2] Identify web URLs and IPs
	[3] Mark them as temporary exceptions in format {{typopo__exception-[i]}}

	@param {string} input text for identification of exceptions
	@returns {string} — output with identified exceptions in format {{typopo__exception-[i]}}
*/
export function excludeExceptions(string, locale) {
	/* [1] Identify email adresses */
	identifyExceptionSet(string, locale.emailAddressPattern)

	/* [2] Identify web URLs and IPs */
	identifyExceptionSet(string, locale.webUrlPattern)

	/* [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}} */
	for (var i = 0; i < exceptions.length; i++) {
		var replacement = '{{typopo__exception-' + i + '}}'
		string = string.replace(exceptions[i], replacement)
	}

	return string
}

/*
	Identifies set of exceptions for given pattern
	Used as helper function for excludeExceptions(string, locale)

	@param {string} input text for identification of exceptions
	@param {pattern} regular expression pattern to match exception
*/
function identifyExceptionSet(string, pattern) {
	var re = new RegExp(pattern, 'g')
	var matched_exceptions = string.match(re)
	if (matched_exceptions != null) {
		exceptions = exceptions.concat(matched_exceptions)
	}
}

/*
	Replaces identified exceptions with real ones by change their
	temporary representation in format {{typopo__exception-[i]}} with its
	corresponding representation

	@param {string} input text with identified exceptions
	@returns {string} output with placed exceptions
*/
export function placeExceptions(string) {
	for (var i = 0; i < exceptions.length; i++) {
		var pattern = '{{typopo__exception-' + i + '}}'
		var re = new RegExp(pattern, 'g')
		var replacement = exceptions[i]
		string = string.replace(re, replacement)
	}

	return string
}
