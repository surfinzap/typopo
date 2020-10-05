import { fixTrademark } from '../../lib/symbols/trademark'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix trademark ™\n', () => {
	let testCase = {
		'(tm)': '™',
		'(TM)': '™',
		'Company (tm)': 'Company™',
		'Company ™': 'Company™',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(fixTrademark(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix trademark ™\n', () => {
	let testCase = {
		'( tm )': '™',
	}

	Object.keys(testCase).forEach((key) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), testCase[key])
		})
	})
})
