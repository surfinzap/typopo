import { fixCopyright } from '../../lib/symbols/copyright'
import { fixTypos } from '../../typopo'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix copyright ©\n', () => {
	let testCase = {
		'(c)2017': '© 2017',
		'Company (c)2017': 'Company © 2017',
		'Company (C)2017': 'Company © 2017',
		'Company ©2017': 'Company © 2017',
		'Company © 2017': 'Company © 2017',
		'Company(c) 2017': 'Company © 2017',
		'Company(C) 2017': 'Company © 2017',
		'Company© 2017': 'Company © 2017',
		'Sec­tion 7(c)': 'Sec­tion 7(c)',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(fixCopyright(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix copyright ©\n', () => {
	let testCase = {
		'( c ) 2017': '© 2017',
		'( c     ) 2017': '© 2017',
		'( c )2017': '© 2017',
	}

	Object.keys(testCase).forEach((key) => {
		it('integration test', () => {
			assert.strictEqual(fixTypos(key, 'en-us'), testCase[key])
		})
	})
})
