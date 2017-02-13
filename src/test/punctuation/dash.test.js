import {fixDash} from "../../lib/punctuation/dash";
import assert from 'assert';
import Constants from "../../locale/locale";

describe('Replace hyphen with dashes, where applicable in English\n', () => {
	let testCase = {
		"and - she said": "and — she said",
		"Brno--Praha": "Brno–Praha",
		"and --- she said": "and — she said",
		"and – she said": "and — she said",
		"vopros - što": "vopros — što",

		"5-6 eggs": "5–6 eggs",
		"5 -6 eggs": "5–6 eggs",
		"5- 6 eggs": "5–6 eggs",
		"5 - 6 eggs": "5–6 eggs",
		"5—6 eggs": "5–6 eggs",
		"5-12″ long": "5–12″ long",
		"In 5.25-10.75 range": "In 5.25–10.75 range",
		"In 5,000.25-10,000.75 range": "In 5,000.25–10,000.75 range",
		"v rozmedzí 5,25-10,75": "v rozmedzí 5,25–10,75",
		"v rozmedzí 5 000,25-10 000,75": "v rozmedzí 5 000,25–10 000,75",

		/* tests for cardinal numbers */
		"1st-5th August": "1st–5th August",
		"1st -5th August": "1st–5th August",
		"1st- 5th August": "1st–5th August",
		"1st - 5th August": "1st–5th August",
		};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixDash(key, new Constants("en-us")), testCase[key]);
		});
	});
});

describe('Replace hyphen with dashes, where applicable in Rusyn, Slovak, Czech\n', () => {
	let testCase = {
		"1.-5. augusta": "1.–5. augusta",
    "1. -5. augusta": "1.–5. augusta",
    "1.- 5. augusta": "1.–5. augusta",
    "1. - 5. augusta": "1.–5. augusta",
		};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixDash(key, new Constants("rue")), testCase[key]);
			assert.equal(fixDash(key, new Constants("sk")), testCase[key]);
			assert.equal(fixDash(key, new Constants("cs")), testCase[key]);
		});
	});
});
