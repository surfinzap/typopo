import {removeExtraPunctuationBeforeQuotes,
				removeExtraPunctuationAfterQuotes, 
				swapQuotesAndTerminalPunctuation,
				swapQuotesAndTerminalPunctuationForQuotedPart,
				identifyDoublePrimes,
				identifyDoubleQuotePairs,
				identifyStandaloneLeftDoubleQuote,
				identifyStandaloneRightDoubleQuote,
				removeUnidentifiedDoubleQuote,
				replaceDoublePrimeWDoubleQuote,
				placeLocaleDoubleQuotes,
				removeExtraCommaAfterSentencePunctuation,
				removeExtraSpacesAroundQuotes,
				addSpaceBeforeLeftDoubleQuote,
				addSpaceAfterRightDoubleQuote,
				fixDoubleQuotesAndPrimes} 
				from "../../lib/punctuation/double-quotes";
import assert from 'assert';
import Locale from "../../locale/locale";

let testFalsePositives = {
	"č., s., fol., str.," : 
	"č., s., fol., str.,",

	"Byl to “Karel IV.”, ktery":
	"Byl to “Karel IV.”, ktery",

	"Hey.”": 
	"Hey.”",

	"Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.": 
	"Because of this, it’s common to have “namespace pollution”, where completely unrelated code shares global variables.",
}


let testModule = {
	"He said: \"Here’s a 12\" record.\"" : 
	"He said: “Here’s a 12″ record.”",

	"He said: \"He was 12.\"": 
	"He said: “He was 12.”", 

	"He said: \"He was 12\". And then he added: \"Maybe he was 13\".":
	"He said: “He was 12.” And then he added: “Maybe he was 13.”",

	"So it’s 12\" × 12\", right?" : 
	"So it’s 12″ × 12″, right?",

	"An unquoted sentence.“And a quoted one.”":
	"An unquoted sentence. “And a quoted one.”",

	"\"quoted material\" and \"extra":
	"“quoted material” and “extra",	

	"It was like “namespace pollution”.": 
	"It was like “namespace pollution”.",

	"English „English„ „English„ English": 
	"English “English” “English” English",

	"“English double quotation marks“": 
	"“English double quotation marks”",

	"”English double quotation marks”": 
	"“English double quotation marks”",

	"\"English double quotation marks\"": 
	"“English double quotation marks”",

	"\"Conference 2020\" and \"something in quotes\"." : 
	"“Conference 2020” and “something in quotes”.", 

	"Here are 30 \"bucks\"":
	"Here are 30 “bucks”",

	"Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”":
	"Within double quotes “there are single ‘quotes with mixed punctuation’, you see”.",	

	"He was like “Georgia”.": 
	"He was like “Georgia”.",

	"He was ok. “He was ok”.": 
	"He was ok. “He was ok.”",
}


function localizeTest(string, leftDoubleQuote, rightDoubleQuote) {
	string = string.replace(/“/g, leftDoubleQuote);
	string = string.replace(/”/g, rightDoubleQuote);
	return string;
}

let testModuleSk = {}
Object.keys(testModule).forEach(function(key){
  testModuleSk[key] = localizeTest(testModule[key],"„","“");
});

let testModuleRue = {}
Object.keys(testModule).forEach(function(key){
  testModuleRue[key] = localizeTest(testModule[key],"«","»");
});









describe('Remove punctuation before double quotes (en-us):\n', () => {
	let testCase = {
		/* extra comma after terminal punctuation, 
		 as it it happens in direct speech */
		"“Hey!,” she said": 
		"“Hey!” she said",
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(removeExtraPunctuationBeforeQuotes(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Remove punctuation after double quotes (en-us):\n', () => {
	let testCase = {
		/* dot at the end of a direct speech ending with abbreviation */
		"“We will continue this tomorrow at 8:00 a.m.”.": 
		"“We will continue this tomorrow at 8:00 a.m.”",
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(removeExtraPunctuationAfterQuotes(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Swap double quotes and terminal punctuation (en-us):\n', () => {
	let testCase = {
		"Hey”.": 
		"Hey.”",

		"Hey”…": 
		"Hey…”",

		"Hey”?": 
		"Hey?”",
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(swapQuotesAndTerminalPunctuation(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Identify inches, arcseconds, seconds following a 1–3 numbers (en-us):\n', () => {
	let testCase = {
		"12′ 45\"": "12′ 45″",
		"12′ 45“": "12′ 45″",
		"12′ 45”": "12′ 45″",
		"12′ 45″": "12′ 45″",
		"12′ 45‘‘": "12′ 45″",
		"12′ 45’’": "12′ 45″",
		"12′ 45\'\'": "12′ 45″",
		"12′ 45′′": "12′ 45″",
		
		"3° 5′ 30\"": "3° 5′ 30″",
		"12\"3′00°": "12″3′00°",

		"So it’s 12\" × 12\", right?" : 
		"So it’s 12″ × 12″, right?",

		"She said: “It’s a 12\" inch!”":
		"She said: “It’s a 12″ inch!”",

		...testFalsePositives,
	};
	
	let unitTestCase = {
		"12′ 45 \"": "12′ 45 ″",
		"12′ 45 “": "12′ 45 ″",
		"12′ 45 ”": "12′ 45 ″",
		"12′ 45 ″": "12′ 45 ″",
		"12′ 45 ‘‘": "12′ 45 ″",
		"12′ 45 ’’": "12′ 45 ″",
		"12′ 45 \'\'": "12′ 45 ″",
		"12′ 45 ′′": "12′ 45 ″",	
		
		// false positive to exclude long numbers (temporary)
		"“Conference 2020\" and “something in quotes”." : 
		"“Conference 2020\" and “something in quotes”.",
		
		...testCase,
	};

	Object.keys(unitTestCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleDoubleQuotes(
					identifyDoublePrimes(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				unitTestCase[key]);
		});
	});


	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Identify double quote pairs (en-us):\n', () => {
	let testCase = {
		"\"quoted material\"":
		"“quoted material”",

		"„quoted material\"":
		"“quoted material”",

		"«quoted material«":
		"“quoted material”",

		"’’quoted material\'\'":
		"“quoted material”",
		
		"‹‹quoted material››":
		"“quoted material”",

		",,quoted material,,":
		"“quoted material”",
		
		"‘‘quoted material‘‘":
		"“quoted material”",
		
		"unquoted \"quoted material\" material":
		"unquoted “quoted material” material",	
		
		"\"quoted material\" and \"quoted material\"":
		"“quoted material” and “quoted material”",	

		// primes × double quotes
		"\"Conference 2020\" and \"something in quotes\"." : 
		"“Conference 2020” and “something in quotes”.",

		"\"Gone in 60{{typopo__double-prime}}\"":
		"“Gone in 60″”",

		"\"2020\"":
		"“2020”",

		"\"202\"":
		"“202”",


		// false positive
		"\"starting quotes, primes 90{{typopo__double-prime}}, ending quotes\"":
		"“starting quotes, primes 90″, ending quotes”",
		

		//jibberish inside quotes
		",,idjsa ;frilj ;'f0d, if9,,":
		"“idjsa ;frilj ;'f0d, if9”",
		
		...testFalsePositives,
	};

	let unitTestCase = {
		"\" quoted material \"":
		"“ quoted material ”",

		"\"quoted material \"":
		"“quoted material ”",

		"\" quoted material\"":
		"“ quoted material”",		

		...testCase,
	};

	Object.keys(unitTestCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleDoubleQuotes(
					identifyDoubleQuotePairs(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				unitTestCase[key]);
		});
	});

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});

});



describe('Identify standalone left double quote (en-us):\n', () => {
	let testCase = {
		"\"There is a standalone left quote.":
		"“There is a standalone left quote.",

		"There is a \"standalone left quote.":
		"There is a “standalone left quote.",

		"There is a «standalone left quote.":
		"There is a “standalone left quote.",
		
		"There is a „standalone left quote.":
		"There is a “standalone left quote.",

		"There is a ,,standalone left quote.":
		"There is a “standalone left quote.",

		"There is a ‹‹standalone left quote.":
		"There is a “standalone left quote.",

		"There is a ‘‘standalone left quote.":
		"There is a “standalone left quote.",		

		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleDoubleQuotes(
					identifyStandaloneLeftDoubleQuote(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});

		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});


});



describe('Identify standalone right double quote (en-us):\n', () => {
	let testCase = {
		"There is a standalone\" right quote.":
		"There is a standalone” right quote.",

		"There is a standalone« right quote.":
		"There is a standalone” right quote.",
		
		"There is a standalone„ right quote.":
		"There is a standalone” right quote.",

		"There is a standalone,, right quote.":
		"There is a standalone” right quote.",

		"There is a standalone›› right quote.":
		"There is a standalone” right quote.",

		"There is a standalone‘‘ right quote.":
		"There is a standalone” right quote.",	
		
		"There is a STANDALONE\" right quote.":
		"There is a STANDALONE” right quote.",
		
		"There is a standalone right quote.\"":
		"There is a standalone right quote.”",	

		"There is a standalone right quote…\"":
		"There is a standalone right quote…”",			
		
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleDoubleQuotes(
					identifyStandaloneRightDoubleQuote(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});

		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});

});



describe('Remove unidentified double quotes (en-us):\n', () => {
	let testCase = {
		"word \" word":
		"word word",

		"word « word":
		"word word",
		
		"word „ word":
		"word word",

		"word ,, word":
		"word word",

		"word ›› word":
		"word word",

		"word ‘‘ word":
		"word word",	
				
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				placeLocaleDoubleQuotes(
					removeUnidentifiedDoubleQuote(
						key, 
						new Locale("en-us")
					), 
					new Locale("en-us")
				),
				testCase[key]);
		});

		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(
				key, 
				new Locale("en-us")), 
				testCase[key]);
		});
	});

});




describe('Replace a double qoute & a double prime with a double quote pair (en-us):\n', () => {
	let unitTestCase = {
		"{{typopo__left-double-quote--standalone}}word{{typopo__double-prime}}":
		"{{typopo__left-double-quote}}word{{typopo__right-double-quote}}",

		"{{typopo__double-prime}}word{{typopo__right-double-quote--standalone}}":
		"{{typopo__left-double-quote}}word{{typopo__right-double-quote}}",		


				
		...testFalsePositives,
	};

	let moduleTestCase = {
		"It’s called \"Localhost 3000\" and it’s pretty fast.":
		"It’s called “Localhost 3000” and it’s pretty fast.",

		"Here are 30 \"bucks\"":
		"Here are 30 “bucks”",
				
		...testFalsePositives,
	};	

	Object.keys(unitTestCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				replaceDoublePrimeWDoubleQuote(
					key, 
					new Locale("en-us")
					),
					unitTestCase[key]);
		});
	});
			
	Object.keys(moduleTestCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(
				key, 
				new Locale("en-us")), 
				moduleTestCase[key]);
		});
	});

});



describe('Swap quotes and terminal punctuation for a quoted part (en-us):\n', () => {
	let testCase = {
		"Sometimes it can be only a “quoted part.”":
		"Sometimes it can be only a “quoted part”.",

		"Sometimes it can be only a “quoted” “part.”":
		"Sometimes it can be only a “quoted” “part”.",

		"a “quoted part.” a “quoted part.”":
		"a “quoted part”. a “quoted part”.",

		"“A whole sentence.” Only a “quoted part.”":
		"“A whole sentence.” Only a “quoted part”.",

		"Only a “quoted part.” “A whole sentence.”":
		"Only a “quoted part”. “A whole sentence.”",

		"Only a “quoted part” in a sentence. “A whole sentence.”":
		"Only a “quoted part” in a sentence. “A whole sentence.”",

		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				swapQuotesAndTerminalPunctuationForQuotedPart(
					key, 
					new Locale("en-us")
				),
				testCase[key]
			);
		});
		it("module test", () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
	});
});



describe('Remove extra comma after sentence punctuation in direct speech (en-us):\n', () => {
	let testCase = {
		"“Hey!,” she said":
		"“Hey!” she said",

		"“Hey?,” she said":
		"“Hey?” she said",

		"“Hey.,” she said":
		"“Hey.” she said",	
		
		"“Hey,,” she said":
		"“Hey,” she said",
		
		"“Hey:,” she said":
		"“Hey:” she said",	
		
		"“Hey;,” she said":
		"“Hey;” she said",	

		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(removeExtraCommaAfterSentencePunctuation(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Remove extra spaces around quotes and primes (en-us):\n', () => {
	let testCase = {

		"“ Ups, an extra space at the beginning”": 
		"“Ups, an extra space at the beginning”",

		"“Ups, an extra space at the end ”": 
		"“Ups, an extra space at the end”",

		"“Sentence and… ”": "“Sentence and…”",

		"12′ 45 ″": 
		"12′ 45″", 

		"3° 5′ 30 ″": 
		"3° 5′ 30″",

		"3° 5′ 30 ″ and": 
		"3° 5′ 30″ and",

		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				removeExtraSpacesAroundQuotes(
					key, 
					new Locale("en-us")
				),
				testCase[key]
			);
		});
		it("module test", () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
	});
});



describe('Add a missing space before a left double quote (en-us):\n', () => {
	let testCase = {
		"It’s a“nice” saying.":
		"It’s a “nice” saying.",

		"An unquoted sentence.“And a quoted one.”":
		"An unquoted sentence. “And a quoted one.”",
		
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				addSpaceBeforeLeftDoubleQuote(
					key, 
					new Locale("en-us")
				),
				testCase[key]
			);
		});
		it("module test", () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
	});
});


describe('Add a missing space after a left double quote (en-us):\n', () => {
	let testCase = {
		"It’s a “nice”saying.":
		"It’s a “nice” saying.",

		"“A quoted sentence.”And an unquoted one.":
		"“A quoted sentence.” And an unquoted one.",

		"“A quoted sentence!”And an unquoted one.":
		"“A quoted sentence!” And an unquoted one.",
	
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(
				addSpaceAfterRightDoubleQuote(
					key, 
					new Locale("en-us")
				),
				testCase[key]
			);
		});
		it("module test", () => {
			assert.strictEqual(
				fixDoubleQuotesAndPrimes(
					key, 
					new Locale("en-us")), 
				testCase[key]
			);
		});
	});
});








describe('Double quotes in default language (en-us)\n', () => {
	let testCase = {
		...testModule,
		...testFalsePositives,
	};

	Object.keys(testCase).forEach((key) => {
		it("module test", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Double quotes in Slovak, Czech and German language (sk, cs, de-de)\n', () => {
	let testCase = {
		...testModuleSk,
	};

	Object.keys(testCase).forEach((key) => {
		it("module test (sk)", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("sk")), testCase[key]);
		});

		it("module test (cs)", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("cs")), testCase[key]);
		});

		it("module test (de-de)", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("de-de")), testCase[key]);
		});		
	});
});


describe('Double quotes in Rusyn language (rue)\n', () => {
	let testCase = {
		...testModuleRue,
	};

	Object.keys(testCase).forEach((key) => {
		it("module test (rue)", () => {
			assert.strictEqual(fixDoubleQuotesAndPrimes(key, new Locale("rue")), testCase[key]);
		});	
	});
});