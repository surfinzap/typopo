import {fixTypos} from '../typopo.js';
import assert from 'assert';

describe('Test consistency of internal variables', () => {
  let testCase = {

		/*
		 We are using temporary {variables} in curly brackets as text replacement
		 in some functions. Make sure that variables in curly brackets do not change
		 in course of running algorithm.
		 */
		"{{test-variable}}": "{{test-variable}}",
		"{{test-variable}} at the beginning of the sentence.": "{{test-variable}} at the beginning of the sentence.",
		"And {{test-variable}} in the middle of the sentence.": "And {{test-variable}} in the middle of the sentence.",
	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTypos(key, "en-us"), testCase[key]);
		});
	});
});

describe('Test that exceptions remain intact', () => {
	let testCase = {

		/*
		 Exceptions

		 This is list of exceptions that we want skip while correcting errors,
		 namely:
		 [1] URL address
		 [2] IP address
		 [3] Email adress

		 Sidenote: List of tests is incomplete, however to identify
		 all kinds of URLs, IPs or emails, we’re adapting following implementation:
		 http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
		 */

		// [1] URL address
		"www.tota.sk": "www.tota.sk",
		"http://www.tota.sk": "http://www.tota.sk",

		// [2] IP address
		"127.0.0.1": "127.0.0.1",

		// [3] Email address
		"mail@domain.com": "mail@domain.com",

		// test order of replacements
		"www.tota.sk and 127.0.0.1 and mail@domain.com": "www.tota.sk and 127.0.0.1 and mail@domain.com",

	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTypos(key, "en-us"), testCase[key]);
		});
	});
});

describe('Tests that all modules are plugged in', () => {
	let testCase = {

		// double quoutes
		"English „English„ „English„ English": "English “English” “English” English",
		"He said: \"Here’s a 12\" record.\"": "He said: “Here’s a 12″ record.”",
		"12′ 45\"": "12′ 45″",
		"3° 5′ 30\"": "3° 5′ 30″",
		"12\"3'00°": "12″3′00°",

		// ellipsis
		"Sentence ..….. another sentence": "Sentence … another sentence",

		// punctuation trimming
		"č., s., fol., e.g., i.e., str.," : "č., s., fol., e.g., i.e., str.,",
		// hyphen
		"e- shop": "e-shop",
		// single quotes
		"Let's test this: “however, 'quote this or nottin' 'n' this will be corrected for 69'ers,' he said”":
		"Let’s test this: “however, ‘quote this or nottin’ ’n’ this will be corrected for 69’ers,’ he said”",
		"I'''m":"I’m",
		"I''''m":"I’m",
		"He said: “What about 'name' and 'other name'?”":
		"He said: “What about ‘name’ and ‘other name’?”",


		// section sign
		"under Law §1782": "under Law § 1782",
		// copyright
		"Company (c)2017": "Company © 2017",
		// exponents
		"100 km3" : "100 km³",
		// plus-minus
		"+-": "±",
		// sound recording copyright
		"Company (p)2017": "Company ℗ 2017",
		//registered trademark
		"Company (r)": "Company®",
		// trademark
		"Company (tm)": "Company™",

		// spaces
		"Sentence and… ?": "Sentence and…?",
		// nbsp
		"v a v a v": "v a v a v",
		// "the U.S. and" : "the U.S. and", not yet supported



		// abbreviations
		"(e.g.)" : "(e.g.)",
		"a.m." : "a.m.",
		"5 a.m." : "5 a.m.",
		"CH. CH. CH. Lambert" : "CH.CH.CH. Lambert",
		"the U.S." : "the U.S.",


		//case
		"CMSko" : "CMSko",
		"cAPSLOCK": "capslock",

	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTypos(key, "en-us"), testCase[key]);
		});
	});
});

describe('Integration tests', () => {
	let testCase = {

		/*
		 Selected combination of rules processed within modules that may clash.
		 */

		// Will it remove extra punctuation or will it keep the abbreviation as expected?
		"We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.m.!",
		// Will it remove extra dot?
		"We will continue tomorrow at 8:00 a.m..": "We will continue tomorrow at 8:00 a.m.",

		/*	Combination of resolving issues with ellipsis and brackets together.
				In scientific discourse, […] is used to signify deliberately omitted
				parts (e.g. of a quotation) */
		"quote [...]with parts left out": "quote […] with parts left out",
		"quote[…] with parts left out": "quote […] with parts left out",
		"quote [ ...] with parts left out": "quote […] with parts left out",
		"quote [.... ] with parts left out": "quote […] with parts left out",
		"quote [ ….. ] with parts left out": "quote […] with parts left out",

	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTypos(key, "en-us"), testCase[key]);
		});
	});
});
