import {
	removeExtraSpacesAfterNumberSign,
	fixNumberSign,
} from '../../lib/symbols/number-sign'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Remove extra space before number sign\n', () => {
	let testCase = {
		'# 9': '#9',
		'#    9': '#9',
		'# 9': '#9', //nbsp
		'# 9': '#9', //hairSpace
		'# 9': '#9', //narrowNbsp
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				removeExtraSpacesAfterNumberSign(key, new Locale('en-us')),
				testCase[key]
			)
		})
		it('module test', () => {
			assert.strictEqual(fixNumberSign(key, new Locale('en-us')), testCase[key])
		})
	})
})
