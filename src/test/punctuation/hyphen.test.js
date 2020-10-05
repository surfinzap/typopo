import { fixHyphen, fixSpaceAroundHyphen } from '../../lib/punctuation/hyphen'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix spaces around hyphen\n', () => {
	let testCase = {
		'e-shop': 'e-shop', // correct
		'e- shop': 'e-shop',
		'e- shop': 'e-shop', // nbsp
		'e- shop': 'e-shop', // hairSpace
		'e- shop': 'e-shop', // narrowNbsp
		'e -shop': 'e-shop',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit tests', () => {
			assert.strictEqual(
				fixSpaceAroundHyphen(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module tests', () => {
			assert.strictEqual(fixHyphen(key, new Locale('en-us')), testCase[key])
		})
	})
})
