import {correctDoubleQuotesAndPrimes} from "../../lib/punctuation/double-quotes";
import assert from 'assert';

describe('Double quotes in default language (en-us)\n', () => {
	let testCase = {
		/* Basic tests */
		"English „English„ „English„ English": "English “English” “English” English",
		"“English double quotation marks“": "“English double quotation marks”",
		"”English double quotation marks”": "“English double quotation marks”",
		"\"English double quotation marks\"": "“English double quotation marks”",
		"Chto mu povisť slova ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova “Myžku, sŷnku mij”",
		"\"abc''": "“abc”",


		/* Use-cases for mixing double quotes and primes */
		"He said: \"Here’s 12\" record.\"": "He said: “Here’s 12″ record.”",
		"He said: \"He was 12.\"": "He said: “He was 12.”", //false positive
		/* error of wrongly identified primes due to swapped punctuation */
		"He said: \"He was 12\". And then he added: \"Maybe he was 13\".":
		"He said: “He was 12.” And then he added: “Maybe he was 13.”",


		// Mixing double quotes and double primes
		"12′ 45\"": "12′ 45″",
		"3° 5′ 30\"": "3° 5′ 30″",


		// Improperly spaced double primes
		"12′ 45 ″": "12′ 45″",
		"3° 5′ 30 ″": "3° 5′ 30″",


		/* swap double quotes with a terminal punctuation .,?! */
		"Hey”.": "Hey.”",
		"Hey”?": "Hey?”",
		"Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”":
		"Within double quotes “there are single ‘quotes with mixed punctuation’, you see”.",

		"“We swap punctuation and double quotes in case of the whole sentence”.":
		"“We swap punctuation and double quotes in case of the whole sentence.”",


		/* False positives
			 We won’t double quotes and punctuation when only portion of a sentence is double-quoted */
		"Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.": "Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.",
		"He was like “namespace pollution”.": "He was like “namespace pollution”.",
		"He was like “Georgia”.": "He was like “Georgia”.",
		"He was ok. “He was ok”.": "He was ok. “He was ok.”",
		"“Zest”, that’s an interesting name.": "“Zest”, that’s an interesting name.",


		/* remove extra spaces along „English double quotation marks“ */
		"“ Ups, an extra space at the beginning”": "“Ups, an extra space at the beginning”",
		"“Ups, an extra space at the end ”": "“Ups, an extra space at the end”",


		/* remove space when aposiopesis is followed by punctuation */
		"“Sentence and… ”": "“Sentence and…”",


		/* Best-effort for unclosed double quotes */
		"\"Even when left double quote is missing its right counterpart.":
		"“Even when left double quote is missing its right counterpart.",

		"Even when right double quote is missing its left counterpart.\"":
		"Even when right double quote is missing its left counterpart.”",

		"We’ll remove a quote, \" when it is hanging spaced around in the middle":
		"We’ll remove a quote,  when it is hanging spaced around in the middle",

	};


	Object.keys(testCase).forEach((key) => {
		it("should replace multiple dots with an ellipsis", () => {
			assert.equal(correctDoubleQuotesAndPrimes(key, "en-us"), testCase[key]);
		});
	});
});

describe('Double quotes in Slovak and Czech language (sk, cs)\n', () => {
	let testCase = {
		/* Basic tests */
		"Slovak „Slovak„ „Slovak„ Slovak": "Slovak „Slovak“ „Slovak“ Slovak",
    "“Slovak, Rusyn, Czech double quotation marks“": "„Slovak, Rusyn, Czech double quotation marks“",
    "”Slovak, Rusyn, Czech double quotation marks”": "„Slovak, Rusyn, Czech double quotation marks“",
    "\"Slovak, Rusyn, Czech double quotation marks\"": "„Slovak, Rusyn, Czech double quotation marks“",
    "Chto mu povisť slova ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova „Myžku, sŷnku mij“",
    "\"abc''": "„abc“",
	};


	Object.keys(testCase).forEach((key) => {
		it("should replace multiple dots with an ellipsis", () => {
			assert.equal(correctDoubleQuotesAndPrimes(key, "sk"), testCase[key]);
			assert.equal(correctDoubleQuotesAndPrimes(key, "cs"), testCase[key]);
		});
	});
});

describe('Double quotes in Rusyn language (rue)\n', () => {
	let testCase = {
		/* Basic tests */
		"Slovak „Slovak„ „Slovak„ Slovak": "Slovak «Slovak» «Slovak» Slovak",
    "“Slovak, Rusyn, Czech double quotation marks“": "«Slovak, Rusyn, Czech double quotation marks»",
    "”Slovak, Rusyn, Czech double quotation marks”": "«Slovak, Rusyn, Czech double quotation marks»",
    "\"Slovak, Rusyn, Czech double quotation marks\"": "«Slovak, Rusyn, Czech double quotation marks»",
    "Chto mu povisť slova ,,Myžku, sŷnku mij‘‘": "Chto mu povisť slova «Myžku, sŷnku mij»",
    "\"abc''": "«abc»",
	};


	Object.keys(testCase).forEach((key) => {
		it("should replace multiple dots with an ellipsis", () => {
			assert.equal(correctDoubleQuotesAndPrimes(key, "rue"), testCase[key]);
		});
	});
});
