import {
	removeNbspBetweenMultiCharWords,
	addNbspAfterPreposition,
	addNbspAfterAmpersand,
	addNbspAfterCardinalNumber,
	addNbspAfterOrdinalNumber,
	addNbspWithinOrdinalDate,
	addNbspAfterRomanNumeral,
	fixNbspForNameWithRegnalNumber,
	addNbspBeforePercent,
	addNbspAfterSymbol,
	replaceSpacesWithNbspAfterSymbol,
	fixNbsp,
} from '../../lib/whitespace/nbsp'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Remove non-breaking space between multi-letter words\n', () => {
	let testCase = {
		'vo dvore': 'vo dvore',
		'Ku komore': 'Ku komore',
		'vo vo vo vo': 'vo vo vo vo',
		'vo vo vo': 'vo vo vo',
		'ňa moja': 'ňa moja',
		'Ťa tvoja': 'Ťa tvoja',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				removeNbspBetweenMultiCharWords(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add non-breaking spaces after single-character prepositions\n', () => {
	let testCase = {
		'Koniec. V potoku': 'Koniec. V potoku',
		'Skáče o tyči': 'Skáče o tyči',
		'v obchode a v hospode': 'v obchode a v hospode',
		'v a v a v': 'v a v a v',
		'a з коминів': 'a з коминів',
		'a я іду здоїти': 'a я іду здоїти',
		'a в хырбетї': 'a в хырбетї',
		'што є му вытыкане': 'што є му вытыкане',
		'ся ї не': 'ся ї не',

		// false positives
		'client’s customer': 'client’s customer',
		'Ctrl+I and Ctrl+B or pasting an image.':
			'Ctrl+I and Ctrl+B or pasting an image.',
		'Ctrl-I and Ctrl-B or pasting an image.':
			'Ctrl-I and Ctrl-B or pasting an image.',
		'získává investici $25M na něco': 'získává investici $25M na něco', //no nbsp after $25M
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterPreposition(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add non-breaking space after ampersand\n', () => {
	let testCase = {
		'Bed & Breakfast': 'Bed & Breakfast',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterAmpersand(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add non-breaking space after cardinal number\n', () => {
	let testCase = {
		'5 mm': '5 mm',
		'5 Kč': '5 Kč',
		/* eslint-disable no-irregular-whitespace */
		/* false positives, when number is already bound with abbreviation
		 * Na str.⎵5 je obsah → Na str.⎵5 je obsah
		 * 									 !→ Na str. 5⎵je obsah
		 */
		/* eslint-enable no-irregular-whitespace */
		'Na str. 5 je obsah': 'Na str. 5 je obsah',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterCardinalNumber(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add non-breaking space after ordinal number (en)\n', () => {
	let testCase = {
		'1st amendment': '1st amendment',
		'2nd amendment': '2nd amendment',
		'3rd amendment': '3rd amendment',
		'4th amendment': '4th amendment',
		'18th amendment': '18th amendment',
		'15th March': '15th March',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add non-breaking space after ordinal number (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		'1. dodatok': '1. dodatok',
		'1.dodatok': '1. dodatok',
		'1.štava': '1. štava',
		'10.00': '10.00', // false positive for the example above
		'12. dodatok': '12. dodatok',
		'12. január': '12. január',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, new Locale('de-de')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterOrdinalNumber(key, new Locale('rue')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('de-de')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Add non-breaking space within ordinal date (sk, cs, rue)\n', () => {
	let testCase = {
		'12. 1. 2017': '12. 1. 2017',
		'12.1.2017': '12. 1. 2017',
		'10.00': '10.00', // false positive for the example above
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, new Locale('rue')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Add non-breaking space within ordinal date (de-de)\n', () => {
	let testCase = {
		/*  German standard orthography (Duden) recommends
				only one nbsp (or narrowNbsp) after the day
				and a regular interword space following the month*/
		'12.1.2019': '12. 1. 2019',
		'12. 1. 2019': '12. 1. 2019',
		'10.00': '10.00', // false positive for the example above
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspWithinOrdinalDate(key, new Locale('de-de')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('de-de')), testCase[key])
		})
	})
})

describe('Add non-breaking space after roman numeral (sk, cs, de-de, rue)\n', () => {
	let testCase = {
		'I. kapitola': 'I. kapitola',
		'bola to I. kapitola': 'bola to I. kapitola',
		'III. kapitola': 'III. kapitola',
		'III.kapitola': 'III. kapitola',
		'X. ročník': 'X. ročník',
		'Bol to X. ročník.': 'Bol to X. ročník.',
		'V. ročník': 'V. ročník',
		'L. ročník': 'L. ročník',
		'D. ročník': 'D. ročník',
		'8. V. 1945': '8. V. 1945',
		'8. V.1945': '8. V. 1945',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('de-de')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('rue')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('de-de')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Add non-breaking space after roman numeral (sk, cs, de-de, rue)\nExtra false positive', () => {
	let testCase = {
		// false positive
		'Karel IV.': 'Karel IV.',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('de-de')),
				testCase[key]
			)
			assert.strictEqual(
				addNbspAfterRomanNumeral(key, new Locale('rue')),
				testCase[key]
			)
		})
	})
})

describe('Fix non-breaking space around name with regnal number (sk, cs, de-de, rue)\n', () => {
	let testCase = {
		// Place non-breaking space between name and roman numeral
		'Karel IV. byl římsko-německý král.': 'Karel IV. byl římsko-německý král.',
		'Karel IV. byl římsko-německý král.': 'Karel IV. byl římsko-německý král.',
		'Karel IV.': 'Karel IV.',
		//false positive
		'je to IV. cenová skupina': 'je to IV. cenová skupina',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, new Locale('de-de')),
				testCase[key]
			)
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, new Locale('rue')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('de-de')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Fix non-breaking space around name with regnal number (sk, cs, de-de, rue)\n', () => {
	let testCase = {
		// This example is false positive for English language.
		// This is extra module test to double-check that nbsp is placed correctly around “I” in other languages
		'When I talk to emerging product designers':
			'When I talk to emerging product designers',
	}

	Object.keys(testCase).forEach((key) => {
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('de-de')), testCase[key])
			assert.strictEqual(fixNbsp(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Fix non-breaking space around name with regnal number (en-us)\n', () => {
	let testCase = {
		// Place non-breaking space between name and roman numeral
		'Charles IV was an emperor.': 'Charles IV was an emperor.',
		'Charles IV was an emperor.': 'Charles IV was an emperor.', // swapped nbsp
		'Charles IV': 'Charles IV',
		'Charles X': 'Charles X',

		// False positives
		'When I talk to emerging product designers':
			'When I talk to emerging product designers',
		'Try Ctrl+I': 'Try Ctrl+I',
		'Sequoia Capital': 'Sequoia Capital',

		// Unsupported
		/* eslint-disable no-irregular-whitespace */
		// It’s more common to use “I + verb” in text than citing regnal names so this case is unsupported for now
		/* eslint-enable no-irregular-whitespace */
		'Charles I': 'Charles I',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspForNameWithRegnalNumber(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add nbsp before percent, permille, permyriad\n', () => {
	let testCase = {
		'20 %': '20 %',
		'20 %–30 %': '20 %–30 %',
		'20 ‰': '20 ‰',
		'20 ‰–30 ‰': '20 ‰–30 ‰',
		'20 ‱': '20 ‱',
		'20 ‱–30 ‱': '20 ‱–30 ‱',

		/* false positives
			 we won't include nbsp, if there was no space in the first place.
			 some languages distinguish when percent is used
			 * as a noun → 20 %
			 * as an adjective → 20%
			 we cannot fix that without additional context
		*/
		'20%': '20%',
		'20%–30%': '20%–30%',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addNbspBeforePercent(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNbsp(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add space after symbol, e.g. ©\n', () => {
	let testCase = {
		'©2017': '© 2017',
		'Company ©2017': 'Company © 2017',
	}

	Object.keys(testCase).forEach((key) => {
		it('just unit tests', () => {
			assert.strictEqual(
				addNbspAfterSymbol(key, new Locale('en-us'), '©'),
				testCase[key]
			)
		})
	})
})

describe('Replaces various spaces with non-breaking space after symbol, e.g. ©\n', () => {
	let testCase = {
		'Company © 2017': 'Company © 2017',
		'Company © 2017': 'Company © 2017', // hairSpace
		'Company © 2017': 'Company © 2017', // narrowNbsp
	}

	Object.keys(testCase).forEach((key) => {
		it('just unit tests', () => {
			assert.strictEqual(
				replaceSpacesWithNbspAfterSymbol(key, new Locale('en-us'), '©'),
				testCase[key]
			)
		})
	})
})
