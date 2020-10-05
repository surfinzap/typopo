import {
	fixMultiplicationSignBetweenNumbers,
	fixMultiplicationSignBetweenWords,
	fixMultiplicationSignBetweenNumberAndWord,
	fixNbspAroundMultiplicationSign,
	fixMultiplicationSign,
} from '../../lib/symbols/multiplication-sign'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix multiplication sign between numbers\n', () => {
	let testCase = {
		'5 x 4': '5 × 4',
		'5 X 4': '5 × 4',
		'5″ x 4″': '5″ × 4″',
		'5′ x 4′': '5′ × 4′',

		'5 mm x 5 mm': '5 mm × 5 mm',
		'5 žien X 5 žien': '5 žien × 5 žien',
		'5cm x 5cm': '5cm × 5cm',

		'5 x 4 x 3': '5 × 4 × 3',
		'5″ x 4″ x 3″': '5″ × 4″ × 3″',
		'5 mm x 5 mm x 5 mm': '5 mm × 5 mm × 5 mm',

		'4xenographs': '4xenographs', // false positive
		'0xd': '0xd', //false positive, hex number
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenNumbers(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Fix multiplication sign between words\n', () => {
	let testCase = {
		'š x v x h': 'š × v × h',
		'mm x mm': 'mm × mm',
		'Marciano x Clay': 'Marciano × Clay',
		'žena x žena': 'žena × žena',

		'light xenons': 'light xenons', // false positive
		'František X Šalda': 'František X Šalda', // false positive; noun abbr. in en-us
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenWords(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Fix multiplication sign between a number and a word\n', () => {
	let testCase = {
		'4 x object': '4 × object',
		'4x object': '4× object',
		'4X object': '4× object',
		'4X žena': '4× žena',
		'4 xenographs': '4 xenographs', // false positive
		'4xenographs': '4xenographs', // false positive
		'0xd': '0xd', //false positive, hex number
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixMultiplicationSignBetweenNumberAndWord(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Fix nbsp around multiplication sign\n', () => {
	let testCase = {
		'12x3': '12 × 3',
		'12×3': '12 × 3',
		'12″×3″': '12″ × 3″',
		'12′×3′': '12′ × 3′',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixNbspAroundMultiplicationSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(
				fixMultiplicationSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})
