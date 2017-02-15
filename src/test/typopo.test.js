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

		// section sign
		"under Law §1782": "under Law § 1782",

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
		 Selected combination of rules that may clash.
		 */
		// Will it remove extra punctuation or will it keep the abbreviation as expected?
		"We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.m.!",
		// Will it remove extra dot?
		"We will continue tomorrow at 8:00 a.m..": "We will continue tomorrow at 8:00 a.m.",

	};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixTypos(key, "en-us"), testCase[key]);
		});
	});
});
