import {fixSingleQuotesPrimesAndApostrophes} from "../../lib/punctuation/single-quotes";
import assert from 'assert';

describe('Single quotes in default language (en)\n', () => {
	let testCase = {
		/* Basic tests */
		"Let's test this: “however, 'quote this or nottin' 'n' this will be corrected for 69'ers,' he said”":
		"Let’s test this: “however, ‘quote this or nottin’ ’n’ this will be corrected for 69’ers,’ he said”",
		"Within double quotes “there are single 'quotes with mix’d punctuation', you see”.":
		"Within double quotes “there are single ‘quotes with mix’d punctuation’, you see”.",

		/* Mixing quotes and primes, left for single quotes */
		"12' 45″": "12′ 45″",
		"3° 5' 30″": "3° 5′ 30″",

		/* Improperly spaced primes, left for single quotes */
		"12 ′ 45″": "12′ 45″",
		"3° 5 ′ 30″": "3° 5′ 30″",
	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in English", () => {
			assert.equal(fixSingleQuotesPrimesAndApostrophes(key, "en"), testCase[key]);
		});
	});
});

describe('Single quotes in Slovak and Czech language (sk, cs)\n', () => {
	let testCase = {
		"„double quotes 'and single quotes' within“":
		"„double quotes ‚and single quotes‘ within“",

		// "Hej: „Vin mu povil, 'ta de jes' take vidil' i neviril“":
		// "Hej: „Vin mu povil, ‚ta de jes’ take vidil‘ i neviril“",

		"INCHEBA '89": "INCHEBA ’89",
	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in Slovak/Czech", () => {
			assert.equal(fixSingleQuotesPrimesAndApostrophes(key, "sk"), testCase[key]);
			assert.equal(fixSingleQuotesPrimesAndApostrophes(key, "cs"), testCase[key]);
		});
	});
});

describe('Single quotes in Rusyn language (rue)\n', () => {
	let testCase = {
		"«double quotes 'and single quotes' within»":
		"«double quotes ‹and single quotes› within»",

		// "Hej: «Vin mu povil, 'ta de jes' take vidil' i neviril»":
		// "Hej: «Vin mu povil, ‹ta de jes’ take vidil› i neviril»",

		"INCHEBA '89": "INCHEBA ’89",

	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in Rusyn", () => {
			assert.equal(fixSingleQuotesPrimesAndApostrophes(key, "rue"), testCase[key]);
		});
	});
});
