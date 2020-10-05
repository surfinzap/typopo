import { fixRegisteredTrademark } from '../../lib/symbols/registered-trademark'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix registered trademark ®\n', () => {
	let testCase = {
		'(r)': '®',
		'(R)': '®',
		'Company (r)': 'Company®',
		'Company ®': 'Company®',
		'Section 7(r)': 'Section 7(r)',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(
				fixRegisteredTrademark(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Fix registered trademark ®\n', () => {
	let testCase = {
		'( r )': '®',
	}

	Object.keys(testCase).forEach((key) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), testCase[key])
		})
	})
})
