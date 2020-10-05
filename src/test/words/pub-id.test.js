import {
	fixPubId,
	fixISSN,
	fixISBN10,
	fixISBN13,
	fixISBNnumber,
} from '../../lib/words/pub-id'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Fix ISSN format\n', () => {
	let testCase = {
		'ISSN 0000 - 0000': 'ISSN 0000-0000',
		'Issn 0000 - 0000': 'ISSN 0000-0000',
		'issn 0000 - 0000': 'ISSN 0000-0000',
		'ISSN 0000—0000': 'ISSN 0000-0000',
		'ISSN: 0000 - 0000': 'ISSN: 0000-0000',
		'ISSN:0000 - 0000': 'ISSN: 0000-0000',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(fixISSN(key, new Locale('en-us')), testCase[key])
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix ISBN10 format\n', () => {
	let testCase = {
		'ISBN 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'Isbn 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'isbn 80 - 902734 - 1 - 6': 'ISBN 80-902734-1-6',
		'ISBN 80—902734—1—6': 'ISBN 80-902734-1-6',
		'ISBN: 80 - 902734 - 1 - 6': 'ISBN: 80-902734-1-6',
		'ISBN:80 - 902734 - 1 - 6': 'ISBN: 80-902734-1-6',
		'ISBN:0-9752298-0-X': 'ISBN: 0-9752298-0-X',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(fixISBN10(key, new Locale('en-us')), testCase[key])
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix ISBN13 format\n', () => {
	let testCase = {
		'ISBN 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'Isbn 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'isbn 978 - 80 - 902734 - 1 - 6': 'ISBN 978-80-902734-1-6',
		'ISBN 978 - 80—902734—1—6': 'ISBN 978-80-902734-1-6',
		'ISBN: 978 - 80 - 902734 - 1 - 6': 'ISBN: 978-80-902734-1-6',
		'ISBN:978 - 80 - 902734 - 1 - 6': 'ISBN: 978-80-902734-1-6',
		'ISBN:978 - 0-9752298-0-X': 'ISBN: 978-0-9752298-0-X',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(fixISBN13(key, new Locale('en-us')), testCase[key])
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, new Locale('en-us')), testCase[key])
		})
	})
})

describe('Fix ISBN number\n', () => {
	let testCase = {
		'978 - 80 - 902734 - 1 - 6': '978-80-902734-1-6',
		'978 - 80—902734—1—6': '978-80-902734-1-6',
		'978 - 0-9752298-0-X': '978-0-9752298-0-X',
		'978 - 99921 - 58 - 10 - 7': '978-99921-58-10-7',
		'978 - 9971 - 5 - 0210 - 0': '978-9971-5-0210-0',
		'978 - 960 - 425 - 059 - 0': '978-960-425-059-0',
		'978 - 85 - 359 - 0277 - 5': '978-85-359-0277-5',
		'978 - 1 - 84356 - 028 - 3': '978-1-84356-028-3',
		'978 - 0 - 684 - 84328 - 5': '978-0-684-84328-5',
		'978 - 0 - 8044 - 2957 - X': '978-0-8044-2957-X',
		'978 - 0 - 85131 - 041 - 9': '978-0-85131-041-9',
		'978 - 93 - 86954 - 21 - 4': '978-93-86954-21-4',
		'978 - 0 - 943396 - 04 - 2': '978-0-943396-04-2',
		'978 - 0 - 9752298 - 0 - X': '978-0-9752298-0-X',
	}

	Object.keys(testCase).forEach((key) => {
		it('unit test', () => {
			assert.strictEqual(fixISBNnumber(key, new Locale('en-us')), testCase[key])
		})
		it('module test', () => {
			assert.strictEqual(fixPubId(key, new Locale('en-us')), testCase[key])
		})
	})
})
