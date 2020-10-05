import {
	replaceThreeHyphensWithEmDash,
	replaceTwoHyphensWithEnDash,
	replaceSpacedHyphenWithDash,
	consolidateSpacedDashes,
	fixDashSpacesBetweenWords,
	fixHyphenBetweenWordAndPunctuation,
	fixDashBetweenCardinalNumbers,
	fixDashBetweenPercentageRange,
	fixDashBetweenOrdinalNumbers,
	fixDash,
} from '../../lib/punctuation/dash'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Replace 3 hyphens with an em dash\n', () => {
	let testCase = {
		'and --- she said': 'and — she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceThreeHyphensWithEmDash(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Replace 2 hyphens with an en dash\n', () => {
	let testCase = {
		'and -- she said': 'and – she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceTwoHyphensWithEnDash(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Replace spaced hyphen with an em dash (en-us, sk, cs, rue)\n', () => {
	let testCase = {
		'and - she said': 'and — she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, new Locale('en-us')),
				testCase[key]
			)
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, new Locale('cs')),
				testCase[key]
			)
		})
	})
})

describe('Replace spaced hyphen with an en dash (de-de)\n', () => {
	let testCase = {
		'und - er sagte': 'und – er sagte',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				replaceSpacedHyphenWithDash(key, new Locale('de-de')),
				testCase[key]
			)
		})
	})
})

describe('Replace spaced en dash with an em dash (en-us, sk, cs, rue)\n', () => {
	let testCase = {
		'and – she said': 'and — she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				consolidateSpacedDashes(key, new Locale('en-us')),
				testCase[key]
			)
			assert.strictEqual(
				consolidateSpacedDashes(key, new Locale('sk')),
				testCase[key]
			)
		})
	})
})

describe('Replace spaced em dash with an en dash (de-de)\n', () => {
	let testCase = {
		'und — sie sagte': 'und – sie sagte',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				consolidateSpacedDashes(key, new Locale('de-de')),
				testCase[key]
			)
		})
	})
})

describe('Fix dash spaces between words (en-us)\n', () => {
	let testCase = {
		'and — she said': 'and—she said',
		'and — she said': 'and—she said', //mixed spaces
		'and— she said': 'and—she said',
		'and —she said': 'and—she said',
		'and—she said': 'and—she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Fix dash spaces between words (rue, sk)\n', () => {
	let testCase = {
		'and — she said': 'and — she said',
		'and—she said': 'and — she said',
		'and —she said': 'and — she said',
		'and —čadič': 'and — čadič',
		'and —Čadič': 'and — Čadič',
		'Радостна комната —': 'Радостна комната —', //false positive
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, new Locale('rue')),
				testCase[key]
			)
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, new Locale('sk')),
				testCase[key]
			)
		})
	})
})

describe('Fix dash spaces between words (cs)\n', () => {
	let testCase = {
		'and — she said': 'and – she said',
		'and—she said': 'and – she said',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, new Locale('cs')),
				testCase[key]
			)
		})
	})
})

describe('Fix dash spaces between words (de-de) \n', () => {
	let testCase = {
		'und –sie sagte': 'und – sie sagte',
		'und– sie sagte': 'und – sie sagte',
		'und – sie sagte': 'und – sie sagte', //mixed spaces
		'und–sie sagte': 'und – sie sagte',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashSpacesBetweenWords(key, new Locale('de-de')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('de-de')), testCase[key])
		})
	})
})

describe('Fix hyphen between word and punctuation (en-us)\n', () => {
	let testCase = {
		'so there is a dash -,': 'so there is a dash—,',
		'so there is a dash-,': 'so there is a dash—,',
		'so there is a dash -:': 'so there is a dash—:',
		'so there is a dash -;': 'so there is a dash—;',
		'so there is a dash -.': 'so there is a dash—.',
		'so there is a dash -?': 'so there is a dash—?',
		'so there is a dash -!': 'so there is a dash—!',
		'so there is a dash -\n': 'so there is a dash—\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix hyphen between word and punctuation (sk, rue)\n', () => {
	let testCase = {
		'so there is a dash -,': 'so there is a dash —,', //hairSpace
		'so there is a dash -.': 'so there is a dash —.',
		'so there is a dash -\n': 'so there is a dash —\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, new Locale('rue')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixDash(key, new Locale('rue')), testCase[key])
		})
	})
})

describe('Fix hyphen between word and punctuation (cs)\n', () => {
	let testCase = {
		'so there is a dash -,': 'so there is a dash –,', //nbsp + enDash
		'so there is a dash -.': 'so there is a dash –.',
		'so there is a dash -\n': 'so there is a dash –\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, new Locale('cs')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('cs')), testCase[key])
		})
	})
})

describe('Fix hyphen between word and punctuation (de-de)\n', () => {
	let testCase = {
		'so there is a dash -,': 'so there is a dash –,', //hairSpace + enDash
		'so there is a dash -.': 'so there is a dash –.',
		'so there is a dash -\n': 'so there is a dash –\n',

		//false positives
		'e-shop': 'e-shop',
		'e- shop': 'e- shop', // this individual method shouldn't catch that
		'+-': '+-',
		'{{test-variable}}': '{{test-variable}}',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixHyphenBetweenWordAndPunctuation(key, new Locale('de-de')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('de-de')), testCase[key])
		})
	})
})

describe('Fix dash between cardinal numbers\n', () => {
	let testCase = {
		'5-6 eggs': '5–6 eggs',
		'15-16 eggs': '15–16 eggs',
		'5 -6 eggs': '5–6 eggs',
		'5- 6 eggs': '5–6 eggs',
		'5 - 6 eggs': '5–6 eggs',
		'5—6 eggs': '5–6 eggs',
		'5-12″ long': '5–12″ long',
		'In 5.25-10.75 range': 'In 5.25–10.75 range',
		'In 5,000.25-10,000.75 range': 'In 5,000.25–10,000.75 range',
		'v rozmedzí 5,25-10,75': 'v rozmedzí 5,25–10,75',
		'v rozmedzí 5 000,25-10 000,75': 'v rozmedzí 5 000,25–10 000,75',
		'2-3 Eier': '2–3 Eier',
		'2 -3 Eier': '2–3 Eier',
		'2- 3 Eier': '2–3 Eier',
		'2 - 3 Eier': '2–3 Eier',
		'2—3 Eier': '2–3 Eier',
		'im Bereich von 5.000,25-10.000,75': 'im Bereich von 5.000,25–10.000,75',

		// date formats
		'2019-02-03': '2019–02–03',
		'2019 - 02 - 03': '2019–02–03',
		'2019- 02 -03': '2019–02–03',
		'2019-02': '2019–02',
		'2019 -02': '2019–02',
		'2019 - 02': '2019–02',
		'2019- 02': '2019–02',
		'19 - 02 - 03': '19–02–03',
		'19- 02 -03': '19–02–03',

		//telephone numbers
		'1–2–3': '1–2–3', // correct
		'1 – 2 – 3': '1–2–3',
		'1– 2 –3': '1–2–3',

		'1-2-3': '1–2–3',
		'1 - 2 - 3': '1–2–3',
		'1- 2 -3': '1–2–3',

		'1—2—3': '1–2–3',
		'1 — 2 — 3': '1–2–3',
		'1— 2 —3': '1–2–3',

		'154-123-4567': '154–123–4567',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenCardinalNumbers(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix dash between percentage range\n', () => {
	let testCase = {
		'20%-30%': '20%–30%',
		'20% -30%': '20%–30%',
		'20% - 30%': '20%–30%',

		'20%–30%': '20%–30%',
		'20%—30%': '20%–30%',

		'20 %-30 %': '20 %–30 %',
		'20 % -30 %': '20 %–30 %',
		'20 % - 30 %': '20 %–30 %',
		'20 %- 30 %': '20 %–30 %',

		'20 ‰ - 30 ‰': '20 ‰–30 ‰',
		'20 ‱ - 30 ‱': '20 ‱–30 ‱',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenPercentageRange(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix dash between ordinal numbers (en-us)\n', () => {
	let testCase = {
		'1st-5th August': '1st–5th August',
		'1st -5th August': '1st–5th August',
		'1st- 5th August': '1st–5th August',
		'1st - 5th August': '1st–5th August',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix dash between ordinal numbers (rue, sk, cs, de)\n', () => {
	let testCase = {
		'1.-5. augusta': '1.–5. augusta',
		'1. -5. augusta': '1.–5. augusta',
		'1.- 5. augusta': '1.–5. augusta',
		'1. - 5. augusta': '1.–5. augusta',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, new Locale('rue')),
				testCase[key]
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				fixDashBetweenOrdinalNumbers(key, new Locale('de-de')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixDash(key, new Locale('rue')), testCase[key])
			assert.strictEqual(fixDash(key, new Locale('sk')), testCase[key])
			assert.strictEqual(fixDash(key, new Locale('cs')), testCase[key])
			assert.strictEqual(fixDash(key, new Locale('de-de')), testCase[key])
		})
	})
})
