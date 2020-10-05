import {
	removeMultipleSpaces,
	removeSpacesAtParagraphStart,
	removeSpaceBeforeSentencePausePunctuation,
	removeSpaceBeforeTerminalPunctuation,
	removeSpaceBeforeOrdinalIndicator,
	removeSpaceAfterOpeningBrackets,
	addSpaceBeforeOpeningBrackets,
	addSpaceAfterTerminalPunctuation,
	addSpaceAfterSentencePause,
	addSpaceAfterClosingBrackets,
	removeTrailingSpaces,
	addSpaceBeforeSymbol,
	fixSpaces,
} from '../../lib/whitespace/spaces'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Replace multiple spaces with a single one\n', () => {
	let testCase = {
		/* Remove multiple spaces with a single one,
			 even non-breaking spaces and others */
		'How  many spaces': 'How many spaces',
		'How   many': 'How many',
		'How    many': 'How many',
		'How     many': 'How many',
		'How      many': 'How many', // test includes nbsp
		'How      many': 'How many', // test includes hairSpace
		'How      many': 'How many', // test includes narrowNbsp
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				removeMultipleSpaces(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Remove spaces and tabs at paragraph start\n', () => {
	let testCase = {
		' What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?',

		'  What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?',

		'   What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?',

		'    What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?', // including nbsp

		'    What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?', // including hairSpace

		'    What if paragraph starts with extra space at the beginning?':
			'What if paragraph starts with extra space at the beginning?', // including narrowNbsp

		'One sentence ends. And next one continues as it should':
			'One sentence ends. And next one continues as it should',

		/* removing tabs as well*/
		'			What if sentence starts with tabs?': 'What if sentence starts with tabs?',
		'		What if sentence starts with tabs?': 'What if sentence starts with tabs?',
		'	What if sentence starts with tabs?': 'What if sentence starts with tabs?',

		// double-check, that single new lines are not removed
		'If there is one line \nand another': 'If there is one line \nand another',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				removeSpacesAtParagraphStart(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Remove space before sentence pause-punctuation\n', () => {
	let testCase = {
		'Hey , man.': 'Hey, man.',
		'Hey , man.': 'Hey, man.', // nbsp
		'Hey , man.': 'Hey, man.', // hair_space
		'Hey , man.': 'Hey, man.', // narrow_nbsp
		'Sentence and… :': 'Sentence and…:',
		'Sentence and… , else': 'Sentence and…, else',
		'Sentence and… ; else': 'Sentence and…; else',
		'Keep space before emoticon :)': 'Keep space before emoticon :)', // false positive
		'Keep space before emoticon :-)': 'Keep space before emoticon :-)', // false positive
	}

	Object.keys(testCase).forEach((key) => {
		it('unit tests', () => {
			assert.strictEqual(
				removeSpaceBeforeSentencePausePunctuation(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Remove space before a terminal punctuation, closing brackets and a degree symbol\n', () => {
	let testCase = {
		'Hey.': 'Hey.', // correct
		'Hey .': 'Hey.',
		'Hey .': 'Hey.', // nbsp
		'Hey .': 'Hey.', // hair_space
		'Hey .': 'Hey.', // narrow_nbsp
		'Sentence and…!': 'Sentence and…!', // correct
		'Sentence and… !': 'Sentence and…!',
		'Sentence and…?': 'Sentence and…?', // correct
		'Sentence and… ?': 'Sentence and…?',
		'Something (…) something else': 'Something (…) something else', //correct
		'Something (… ) something else': 'Something (…) something else',
		'Something [… ] something else': 'Something […] something else',
		'It was good (It was bad !).': 'It was good (It was bad!).',
		'5°': '5°', //correct
		'5 °': '5°',
		// false positives
		'Sentence ended. …and we were there.':
			'Sentence ended. …and we were there.',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit tests', () => {
			assert.strictEqual(
				removeSpaceBeforeTerminalPunctuation(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Remove space before ordinal indicator (en-us)\n', () => {
	let testCase = {
		'1 st': '1st',
		'2 nd': '2nd',
		'3 rd': '3rd',
		'4 th attempt': '4th attempt',
		'104 th': '104th',
		// false positives
		'Number 4 there you go': 'Number 4 there you go',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit tests', () => {
			assert.strictEqual(
				removeSpaceBeforeOrdinalIndicator(key, new Locale('en-us')),
				testCase[key]
			)
		})

		it('module tests', () => {
			assert.strictEqual(fixSpaces(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Remove space before ordinal indicator (sk, cs, rue, de-de)\n', () => {
	let testCase = {
		'1 . spoj': '1. spoj',
		'154 . spoj': '154. spoj',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit tests', () => {
			assert.strictEqual(
				removeSpaceBeforeOrdinalIndicator(key, new Locale('sk')),
				testCase[key]
			)
			assert.strictEqual(
				removeSpaceBeforeOrdinalIndicator(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				removeSpaceBeforeOrdinalIndicator(key, new Locale('rue')),
				testCase[key]
			)
			assert.strictEqual(
				removeSpaceBeforeOrdinalIndicator(key, new Locale('de-de')),
				testCase[key]
			)
		})
	})
})

describe('Remove space after opening brackets\n', () => {
	let testCase = {
		'Something ( …) something else': 'Something (…) something else',
		'Something [ …] something else': 'Something […] something else',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				removeSpaceAfterOpeningBrackets(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Add space before opening brackets\n', () => {
	let testCase = {
		'Enclosed(in) the brackets.': 'Enclosed (in) the brackets.',
		'Enclosed[in] the brackets.': 'Enclosed [in] the brackets.',
		'quote[…] with parts left out': 'quote […] with parts left out',
		'Enclosed{in} the brackets.': 'Enclosed {in} the brackets.',
		'name(s)': 'name(s)', // false positive
		'NAME(S)': 'NAME(S)', // false positive
		'mass(es)': 'mass(es)', // false positive
		'MASS(ES)': 'MASS(ES)', // false positive
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				addSpaceBeforeOpeningBrackets(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Add space after terminal punctuation\n', () => {
	let testCase = {
		'One sentence ended. Another started.':
			'One sentence ended. Another started.', // correct
		'One sentence ended.Another started.':
			'One sentence ended. Another started.',
		'One sentence ended!Another started.':
			'One sentence ended! Another started.',
		'One sentence ended…!Another started.':
			'One sentence ended…! Another started.',
		'One sentence ended?Another started.':
			'One sentence ended? Another started.',

		// false positives
		'R-N.D.': 'R-N.D.',
		'the U.S.': 'the U.S.',
		'John Thune (S.D.)': 'John Thune (S.D.)',
		'filename.js': 'filename.js',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addSpaceAfterTerminalPunctuation(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})

	Object.keys(testCase).forEach((key) => {
		it('module test', () => {
			assert.strictEqual(fixSpaces(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add a space after sentence pause punctuation\n', () => {
	let testCase = {
		'One sentence ended, another started.':
			'One sentence ended, another started.', //correct
		'One sentence ended,another started.':
			'One sentence ended, another started.',
		'One sentence ended,John started.': 'One sentence ended, John started.',
		'One sentence ended…,John started.': 'One sentence ended…, John started.',
		'One sentence ended:another started.':
			'One sentence ended: another started.',
		'One sentence ended;another started.':
			'One sentence ended; another started.',

		//false positives
		'R-N.D.': 'R-N.D.',
		'the U.S.': 'the U.S.',
		'John Thune (S.D.)': 'John Thune (S.D.)',
		'filename.js': 'filename.js',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addSpaceAfterSentencePause(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})

	Object.keys(testCase).forEach((key) => {
		it('module test', () => {
			assert.strictEqual(fixSpaces(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Add a space after closing brackets\n', () => {
	let testCase = {
		'Enclosed (in) the brackets.': 'Enclosed (in) the brackets.', // correct
		'Enclosed (in)the brackets.': 'Enclosed (in) the brackets.',
		'Enclosed [in] the brackets.': 'Enclosed [in] the brackets.', // correct
		'Enclosed [in]the brackets.': 'Enclosed [in] the brackets.',
		'Enclosed {in} the brackets.': 'Enclosed {in} the brackets.', // correct
		'Enclosed {in}the brackets.': 'Enclosed {in} the brackets.',
		'quote […]with parts left out': 'quote […] with parts left out',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addSpaceAfterClosingBrackets(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})

	Object.keys(testCase).forEach((key) => {
		it('module test', () => {
			assert.strictEqual(fixSpaces(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Remove trailing spaces\n', () => {
	let testCase = {
		'trailing spaces    ': 'trailing spaces',
		'trailing spaces    ': 'trailing spaces', // nbsp
		'trailing spaces    ': 'trailing spaces', // hair_space
		'trailing spaces    ': 'trailing spaces', // narrow_nbsp
		'trailing spaces.    ': 'trailing spaces.',
		'trailing spaces;    ': 'trailing spaces;',
		'Радостна комната —  ': 'Радостна комната —',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				removeTrailingSpaces(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Add space before symbol, e.g. ©\n', () => {
	let testCase = {
		'© 2017': '© 2017',
		'(© 2017)': '(© 2017)',
		'Company© 2017': 'Company © 2017',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				addSpaceBeforeSymbol(key, new Locale('en-us'), '©'),
				testCase[key]
			)
		})
	})
})
