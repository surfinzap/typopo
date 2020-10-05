/*!
 * Typopo 2.3.5
 *
 * Copyright 2015-20 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2020-07-27
 */

import Locale from './locale/locale'
import { removeEmptyLines } from './lib/whitespace/lines'
import { fixNbsp } from './lib/whitespace/nbsp'
import { fixSpaces } from './lib/whitespace/spaces'
import { fixPeriod } from './lib/punctuation/period'
import { fixEllipsis } from './lib/punctuation/ellipsis'
import { fixHyphen } from './lib/punctuation/hyphen'
import { fixDash } from './lib/punctuation/dash'
import { fixDoubleQuotesAndPrimes } from './lib/punctuation/double-quotes'
import { fixSingleQuotesPrimesAndApostrophes } from './lib/punctuation/single-quotes'
import { fixMultiplicationSign } from './lib/symbols/multiplication-sign'
import { fixSectionSign } from './lib/symbols/section-sign'
import { fixCopyright } from './lib/symbols/copyright'
import { fixSoundRecordingCopyright } from './lib/symbols/sound-recording-copyright'
import { fixPlusMinus } from './lib/symbols/plus-minus'
import { fixRegisteredTrademark } from './lib/symbols/registered-trademark'
import { fixTrademark } from './lib/symbols/trademark'
import { fixExponents } from './lib/symbols/exponents'
import { fixNumberSign } from './lib/symbols/number-sign'
import { fixAbbreviations } from './lib/words/abbreviations'
import { fixCase } from './lib/words/case'
import { fixPubId } from './lib/words/pub-id'
import { excludeExceptions, placeExceptions } from './lib/words/exceptions'

/*
	Correct typos

	@param {string} string — input text for correction
	@param {locale} string — (optional, default: en) supported languages: en, sk, cs, rue.
	@param {configuration} object — (optional) configuration
	@returns {string} corrected output
*/
export function fixTypos(string, locale, configuration) {
	locale = typeof locale === 'undefined' ? 'en-us' : locale

	let currentLocale = new Locale(locale)

	configuration =
		typeof configuration === 'undefined'
			? {
					removeLines: true,
			  }
			: configuration

	// exclude exceptions from fixing
	string = excludeExceptions(string, currentLocale)

	if (configuration.removeLines) {
		string = removeEmptyLines(string)
	}

	// ellipsis (since it can have different spacing around, it has to go before spaces cleanup)
	string = fixEllipsis(string, currentLocale)

	// spaces cleanup
	string = fixSpaces(string, currentLocale)

	// punctuation
	string = fixPeriod(string)
	string = fixDash(string, currentLocale)
	string = fixHyphen(string, currentLocale)
	string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale)
	string = fixDoubleQuotesAndPrimes(string, currentLocale)

	// symbols
	string = fixMultiplicationSign(string, currentLocale)
	string = fixSectionSign(string, currentLocale)
	string = fixCopyright(string, currentLocale)
	string = fixSoundRecordingCopyright(string, currentLocale)
	string = fixPlusMinus(string, currentLocale)
	string = fixRegisteredTrademark(string, currentLocale)
	string = fixTrademark(string, currentLocale)
	string = fixExponents(string, currentLocale)
	string = fixNumberSign(string, currentLocale)

	// words
	string = fixCase(string, currentLocale)
	string = fixAbbreviations(string, currentLocale)
	string = fixPubId(string, currentLocale)

	// spaces
	string = fixNbsp(string, currentLocale)

	// place excluded exceptions
	string = placeExceptions(string)

	return string
}
