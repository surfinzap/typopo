import { fixPlusMinus } from '../../lib/symbols/plus-minus'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix plus-minus symbol ±\n', () => {
	let testCase = {
		'+-': '±',
		'-+': '±',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(fixPlusMinus(key, new Locale('en-us')), testCase[key])
		})
	})
})
