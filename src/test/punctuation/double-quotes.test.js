import { fixDoubleQuotesAndPrimes } from '../../lib/punctuation/double-quotes'
import assert from 'assert'
import Locale from '../../locale/locale'

describe('Double quotes in default language (en)\n', () => {
	let testCase = {
		/* Basic tests */
		'English „English„ „English„ English':
			'English “English” “English” English',
		'“English double quotation marks“': '“English double quotation marks”',
		'”English double quotation marks”': '“English double quotation marks”',
		'"English double quotation marks"': '“English double quotation marks”',
		'Chto mu povisť slova ,,Myžku, sŷnku mij‘‘':
			'Chto mu povisť slova “Myžku, sŷnku mij”',
		"\"abc''": '“abc”',
		'It’s called "Localhost 3000" and it’s pretty fast.':
			'It’s called “Localhost 3000” and it’s pretty fast.',
		'But he did not say what "it really" was. "For the present I am free and am all right. Only I haven’t the least idea what I am to do; I wanted to consult you seriously."':
			'But he did not say what “it really” was. “For the present I am free and am all right. Only I haven’t the least idea what I am to do; I wanted to consult you seriously.”',

		/* Use-cases for mixing double quotes and primes */
		'He said: "Here’s a 12" record."': 'He said: “Here’s a 12″ record.”',
		'He said: "He was 12."': 'He said: “He was 12.”', //false positive
		/* error of wrongly identified primes due to swapped punctuation */
		'He said: "He was 12". And then he added: "Maybe he was 13".':
			'He said: “He was 12.” And then he added: “Maybe he was 13.”',

		// Mixing double quotes and double primes
		'12′ 45"': '12′ 45″',
		'3° 5′ 30"': '3° 5′ 30″',
		'12"3′00°': '12″3′00°',

		// Primes at the end of the sentence
		'So it’s 12" × 12", right?': 'So it’s 12″ × 12″, right?',

		// Improperly spaced double primes
		'12′ 45 ″': '12′ 45″',
		'3° 5′ 30 ″': '3° 5′ 30″',

		/* swap double quotes with a terminal punctuation .,?! */
		'Hey.”': 'Hey.”',
		'Hey”.': 'Hey.”',
		'Hey”…': 'Hey…”',
		'Hey”?': 'Hey?”',
		'Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”':
			'Within double quotes “there are single ‘quotes with mixed punctuation’, you see”.',

		'“We swap punctuation and double quotes in case of the whole sentence”.':
			'“We swap punctuation and double quotes in case of the whole sentence.”',

		/* False positives
			 We won’t swap double quotes and punctuation when only portion of a sentence is double-quoted */
		'Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.':
			'Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.',
		'He was like “namespace pollution”.': 'He was like “namespace pollution”.',
		'He was like “Georgia”.': 'He was like “Georgia”.',
		'He was ok. “He was ok”.': 'He was ok. “He was ok.”',
		'“Zest”, that’s an interesting name.':
			'“Zest”, that’s an interesting name.',
		'Byl to “Karel IV.”, ktery neco…': 'Byl to “Karel IV.”, ktery neco…',

		/* remove extra spaces along „English double quotation marks“ */
		'“ Ups, an extra space at the beginning”':
			'“Ups, an extra space at the beginning”',
		'“Ups, an extra space at the end ”': '“Ups, an extra space at the end”',

		/* remove space when aposiopesis is followed by punctuation */
		'“Sentence and… ”': '“Sentence and…”',

		/* Best-effort for unclosed double quotes */
		'"Even when left double quote is missing its right counterpart.':
			'“Even when left double quote is missing its right counterpart.',

		'Even when right double quote is missing its left counterpart."':
			'Even when right double quote is missing its left counterpart.”',

		'We’ll remove a quote, " when it is hanging spaced around in the middle':
			'We’ll remove a quote,  when it is hanging spaced around in the middle',

		/* Remove extra sentence punctuation

			[1] extra comma after terminal punctuation, it it happens often in direct speech
			[2] extra dot at the end of a direct speech ending with abbreviation
			[3] false positive */
		/*[1]*/ '“Hey!,” she said': '“Hey!” she said',
		/*[2]*/ '“We will continue this tomorrow at 8:00 a.m.”.':
			'“We will continue this tomorrow at 8:00 a.m.”',
		/*[3]*/ 'č., s., fol., str.,': 'č., s., fol., str.,',

		/* Wrong spacing */
		'He said:“Here’s 12″ record.”': 'He said: “Here’s 12″ record.”',
		'It’s a“nice”saying.': 'It’s a “nice” saying.',
		'An unquoted sentence.“And a quoted one.”':
			'An unquoted sentence. “And a quoted one.”',
		'“A quoted sentence.”And an unquoted one.':
			'“A quoted sentence.” And an unquoted one.',
		'“A quoted sentence!”And an unquoted one.':
			'“A quoted sentence!” And an unquoted one.',
	}

	Object.keys(testCase).forEach((key) => {
		it('module test', () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(key, new Locale('en-us')),
				testCase[key]
			)
		})
	})
})

describe('Double quotes in Slovak, Czech and German language (sk, cs, de)\n', () => {
	let testCase = {
		/* Basic tests */
		'Slovak „Slovak„ „Slovak„ Slovak': 'Slovak „Slovak“ „Slovak“ Slovak',
		'“Slovak, Rusyn, Czech, German double quotation marks“':
			'„Slovak, Rusyn, Czech, German double quotation marks“',
		'”Slovak, Rusyn, Czech, German double quotation marks”':
			'„Slovak, Rusyn, Czech, German double quotation marks“',
		'"Slovak, Rusyn, Czech, German double quotation marks"':
			'„Slovak, Rusyn, Czech, German double quotation marks“',
		'Chto mu povisť slova ,,Myžku, sŷnku mij‘‘':
			'Chto mu povisť slova „Myžku, sŷnku mij“',
		"\"abc''": '„abc“',

		/* Wrong spacing */
		'He said:„Here’s 12″ record.“': 'He said: „Here’s 12″ record.“',
		'It’s a„nice“saying.': 'It’s a „nice“ saying.',
		'An unquoted sentence.„And a quoted one.“':
			'An unquoted sentence. „And a quoted one.“',
		'„A quoted sentence.“And an unquoted one.':
			'„A quoted sentence.“ And an unquoted one.',
		'„A quoted sentence!“And an unquoted one.':
			'„A quoted sentence!“ And an unquoted one.',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(key, new Locale('cs')),
				testCase[key]
			)
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(key, new Locale('sk')),
				testCase[key]
			)
		})
	})
})

describe('Double quotes in Rusyn language (rue)\n', () => {
	let testCase = {
		/* Basic tests */
		'Slovak „Slovak„ „Slovak„ Slovak': 'Slovak «Slovak» «Slovak» Slovak',
		'“Slovak, Rusyn, Czech double quotation marks“':
			'«Slovak, Rusyn, Czech double quotation marks»',
		'”Slovak, Rusyn, Czech double quotation marks”':
			'«Slovak, Rusyn, Czech double quotation marks»',
		'"Slovak, Rusyn, Czech double quotation marks"':
			'«Slovak, Rusyn, Czech double quotation marks»',
		'Chto mu povisť slova ,,Myžku, sŷnku mij‘‘':
			'Chto mu povisť slova «Myžku, sŷnku mij»',
		"\"abc''": '«abc»',
	}

	Object.keys(testCase).forEach((key) => {
		it('', () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(key, new Locale('rue')),
				testCase[key]
			)
		})
	})
})
