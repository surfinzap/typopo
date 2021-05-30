import {identifyContractedAnd,
				identifyContractedBeginnings,
				identifyInWordContractions,
				identifyContractedYears,	

				identifySinglePrimes,
				replaceSinglePrimeWSingleQuote,
				placeLocaleSingleQuotes,

				removeExtraSpaceAroundSinglePrime,
				fixSingleQuotesPrimesAndApostrophes} 
				from "../../lib/punctuation/single-quotes";
import Locale from "../../locale/locale";

import assert from 'assert';

let testModule = {
	"Let's test this: “however, 'quote this or nottin' 'n' this will be corrected for 69'ers,' he said”":
	"Let’s test this: “however, ‘quote this or nottin’ ’n’ this will be corrected for 69’ers,’ he said”",
}



describe('Identify contracted and (’n’) as apostrophes (en-us):\n', () => {
	let testCase = {
		"rock 'n' roll":
		"rock ’n’ roll",

		"Fish 'n' Chips": 
		"Fish ’n’ Chips",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleSingleQuotes(
					identifyContractedAnd(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});
});



describe('Identify common contractions at the beginning of the word as apostrophes (en-us):\n', () => {
	let testCase = {
		"Just 'cause I wanna.": 
		"Just ’cause I wanna.",

		"'Tis the season":
		"’Tis the season",

		"'sblood": 
		"’sblood",

		"'mongst": 
		"’mongst",

		"'prentice": 
		"’prentice",

		"'slight": 
		"’slight",

		"'Strewth": 
		"’Strewth",

		"'Twixt": 
		"’Twixt",

		"'shun": 
		"’shun",

		"'slid": 
		"’slid",

		"Find 'em!": 
		"Find ’em!",


		"'Twas the Night Before Christmas":
		"’Twas the Night Before Christmas",

		"'Til The Season Comes 'Round Again":
		"’Til The Season Comes ’Round Again",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleSingleQuotes(
					identifyContractedBeginnings(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});
});



describe('Identify in-word contractions as apostrophes (en-us):\n', () => {
	let testCase = {
		"69'ers": "69’ers",
		"iPhone6's": "iPhone6’s",
		"1990's": "1990’s",
		"don't" : "don’t",
		"don''t" : "don’t",
    "don''’t" : "don’t",
    "Paul‘s Diner": "Paul’s Diner",
    "Paul’s Diner": "Paul’s Diner",
    "Paulʼs Diner": "Paul’s Diner",
    "Paul‛s Diner": "Paul’s Diner",
    "Paul`s Diner": "Paul’s Diner",
    "Paul‚s Diner": "Paul’s Diner",
    "Paul´s Diner": "Paul’s Diner",		
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleSingleQuotes(
					identifyInWordContractions(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});
});



describe('Identify contracted years as apostrophes (en-us):\n', () => {
	let testCase = {
		"INCHEBA '89": "INCHEBA ’89",
		"in '70s": "in ’70s",
	};


	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleSingleQuotes(
					identifyContractedYears(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});
});



describe('Identify feet and arcminutes following a 1–3 numbers (en-us):\n', () => {
	let moduleTestCase = {
		"12 ' 45″": 
		"12′ 45″",

		"12 ‘ 45″": 
		"12′ 45″",
		
		"12 ’ 45″": 
		"12′ 45″",

		"12 ‛ 45″": 
		"12′ 45″",

		"12 ′ 45″": 
		"12′ 45″",

		"12 ‛45″": 
		"12′45″",

		"12 '45″":  //this is identified wrongly as 8217, right quotation mark in module tests
		"12′45″",		

	};
	
	let unitTestCase = {
		"12' 45″": 
		"12′ 45″",

		"12‘ 45″": 
		"12′ 45″",
		
		"12’ 45″": 
		"12′ 45″",

		"12‛ 45″": 
		"12′ 45″",

		"12′ 45″": 
		"12′ 45″",

		"12 ′ 45″": 
		"12 ′ 45″",

		"12'45″": 
		"12′45″",

		"12 '45″":
		"12 ′45″",		
	};

	Object.keys(unitTestCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleSingleQuotes(
					identifySinglePrimes(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				unitTestCase[key]
			);
		});
	});


	Object.keys(moduleTestCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(
				fixSingleQuotesPrimesAndApostrophes(
					key,
					new Locale("en-us")
				), 
				moduleTestCase[key]
			);
		});
	});
});



describe('Replace a single qoute & a single prime with a single quote pair (en-us):\n', () => {
	let unitTestCase = {
		"{{typopo__left-single-quote--standalone}}word{{typopo__single-prime}}":
		"{{typopo__left-single-quote}}word{{typopo__right-single-quote}}",

		"{{typopo__single-prime}}word{{typopo__right-single-quote--standalone}}":
		"{{typopo__left-single-quote}}word{{typopo__right-single-quote}}",		

		// ...testFalsePositives,
	};

	let moduleTestCase = {
		"He said: “What about 'Localhost 3000', is that good?”":
		"He said: “What about ‘Localhost 3000’, is that good?”",

		"He said: “Here are 30 \'bucks\'”":
		"He said: “Here are 30 ‘bucks’”",
				
		// ...testFalsePositives,
	};	

	Object.keys(unitTestCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				replaceSinglePrimeWSingleQuote(
					key, 
					new Locale("en-us")
					),
					unitTestCase[key]);
		});
	});
			
	Object.keys(moduleTestCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				moduleTestCase[key]);
		});
	});
});


describe('Single quotes in default language (en-us)\n', () => {
	let testCase = {
		/* Basic tests */


		"Within double quotes “there are single 'quotes with mix’d punctuation', you see”.":
		"Within double quotes “there are single ‘quotes with mix’d punctuation’, you see”.",
		"He said: “What about 'name' and 'other name'?”":
		"He said: “What about ‘name’ and ‘other name’?”",

		"And I ask you: “What’s the idea behind this—how do you call it—'one size fits all' approach?”":
		"And I ask you: “What’s the idea behind this—how do you call it—‘one size fits all’ approach?”",




		
		...testModule,

		// tbd figure out later
		// "Hers'": "Hers’",

	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in English", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Remove extra space around a single prime:\n', () => {
	let testCase = {
		"12 ′ 45″":
		"12′ 45″",

		"12 ′45″":
		"12′45″",
	};



	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(				removeExtraSpaceAroundSinglePrime(
					key, 
					new Locale("en-us")
				), 
			testCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});
});





describe('Single quotes in (sk, cs, de-de)\n', () => {
	let testCase = {
		"„double quotes 'and single quotes' within“":
		"„double quotes ‚and single quotes‘ within“",
		"„double quotes 'and single quotes‘ within“": "„double quotes ‚and single quotes‘ within“",
		"„double quotes ‚and single quotes' within“": "„double quotes ‚and single quotes‘ within“",
		"„double quotes ‚and single quotes` within“": "„double quotes ‚and single quotes‘ within“",
		"„double quotes ,and single quotes‘ within“": "„double quotes ‚and single quotes‘ within“", // abused comma , for ‚

		"Hej: „Vin mu povil, 'ta de jes' take vidil' i neviril“":
		"Hej: „Vin mu povil, ‚ta de jes’ take vidil‘ i neviril“",

		"INCHEBA '89": "INCHEBA ’89",
	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in (sk, cs, de-de)", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(key, new Locale("sk")), testCase[key]);
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(key, new Locale("cs")), testCase[key]);
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(key, new Locale("de-de")), testCase[key]);
		});
	});
});

describe('Single quotes in (rue)\n', () => {
	let testCase = {
		"«double quotes 'and single quotes' within»":
		"«double quotes ‹and single quotes› within»",

		"Hej: «Vin mu povil, 'ta de jes' take vidil' i neviril»":
		"Hej: «Vin mu povil, ‹ta de jes’ take vidil› i neviril»",

		"He said: «What about 'name' and 'other name'?»":
		"He said: «What about ‹name› and ‹other name›?»",

		"INCHEBA '89": "INCHEBA ’89",

	};


	Object.keys(testCase).forEach((key) => {
		it("should fix single quotes, primes and apostrophes in Rusyn", () => {
			assert.strictEqual(fixSingleQuotesPrimesAndApostrophes(key, new Locale("rue")), testCase[key]);
		});
	});
});
