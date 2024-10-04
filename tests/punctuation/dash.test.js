import {replaceThreeHyphensWithEmDash,
				replaceTwoHyphensWithEnDash,
				identifySpacedHyphen,
				fixDashesBetweenWords,
				fixHyphenBetweenWordAndPunctuation,
				fixDashBetweenCardinalNumbers,
				fixDashBetweenPercentageRange,
				fixDashBetweenOrdinalNumbers,
				fixDash} from "../../src/lib/punctuation/dash";
import assert from 'assert';
import Locale from "../../src/locale/locale";

describe('Replace 3 hyphens with an em dash\n', () => {
	let testCase = {
		"and --- she said": "and — she said",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(replaceThreeHyphensWithEmDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Replace 2 hyphens with an en dash\n', () => {
	let testCase = {
		"and -- she said": "and – she said",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(replaceTwoHyphensWithEnDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});





describe('Identify a spaced hyphen between words (en-us, sk, cs, rue, de-de)\n', () => {
	let testCase = {

		"word - word" : "word {{typopo__spacedHyphen}} word",
		"word   -   word" : "word {{typopo__spacedHyphen}} word",
		"word - word" : "word {{typopo__spacedHyphen}} word", //nbsp
		"word - word" : "word {{typopo__spacedHyphen}} word", //hairSpace
		"word - word" : "word {{typopo__spacedHyphen}} word", //narrowNbsp
		"ptaškŷ -  čadič" : "ptaškŷ {{typopo__spacedHyphen}} čadič",  // non-latin chars
		"хотїв - нияке" : "хотїв {{typopo__spacedHyphen}} нияке", // non-latin chars

		/*
			False positive: compound words
		*/
		"e -shop" : "e -shop",
		"e- shop" : "e- shop",
		"e- shop" : "e- shop", //nbsp
		"e- shop" : "e- shop", //hairSpace
		"e- shop" : "e- shop", //narrowNbsp


		/*
			False positive: hyphen at the beginning of the paragraph
		*/ 
    "- she said": "- she said",
    " - she said": " - she said",
    "  - she said": "  - she said",
    "\t- she said": "\t- she said",
    "\t\t- she said": "\t\t- she said",
    
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test (en-us)", () => {
			assert.strictEqual(identifySpacedHyphen(key, new Locale("en-us")), testCase[key]);
		});	
	});
});




describe('Fix a dash, an en dash, an em dash and spacing between words (en-us)\n', () => {
	let testCase = {
    "and {{typopo__spacedHyphen}} she said": "and—she said",
		"and – she said": "and—she said",
		"and  –  she said": "and—she said",
		"and — she said": "and—she said",
		"and  —  she said": "and—she said",
		"and — she said": "and—she said", //mixed spaces
		"and— she said": "and—she said", //mixed spaces
		"and —she said": "and—she said",
		"and—she said": "and—she said",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixDashesBetweenWords(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Fix a dash, an en dash, an em dash and spacing between words (rue, sk)\n', () => {
	let testCase = {
    "ptaškŷ {{typopo__spacedHyphen}} čadič": "ptaškŷ — čadič",
    "ptaškŷ {{typopo__spacedHyphen}} čadič": "ptaškŷ — čadič",
		"ptaškŷ – čadič": "ptaškŷ — čadič",
		"ptaškŷ  –  čadič": "ptaškŷ — čadič",
		"ptaškŷ — čadič": "ptaškŷ — čadič",
		"ptaškŷ  —  čadič": "ptaškŷ — čadič",
		"ptaškŷ — čadič": "ptaškŷ — čadič", //mixed spaces
		"ptaškŷ— čadič": "ptaškŷ — čadič", //mixed spaces
		"ptaškŷ —čadič": "ptaškŷ — čadič",
		"ptaškŷ—čadič": "ptaškŷ — čadič",

    "хотїв {{typopo__spacedHyphen}} нияке": "хотїв — нияке",
    "хотїв {{typopo__spacedHyphen}} нияке": "хотїв — нияке",
		"хотїв – нияке": "хотїв — нияке",
		"хотїв  –  нияке": "хотїв — нияке",
		"хотїв — нияке": "хотїв — нияке",
		"хотїв  —  нияке": "хотїв — нияке",
		"хотїв — нияке": "хотїв — нияке", //mixed spaces
		"хотїв— нияке": "хотїв — нияке", //mixed spaces
		"хотїв —нияке": "хотїв — нияке",
		"хотїв—нияке": "хотїв — нияке",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test (rue)", () => {
			assert.strictEqual(fixDashesBetweenWords(key, new Locale("rue")), testCase[key]);
		});
		it("unit test (sk)", () => {
			assert.strictEqual(fixDashesBetweenWords(key, new Locale("sk")), testCase[key]);
		});
		it("module test (rue)", () => {
			assert.strictEqual(fixDash(key, new Locale("rue")), testCase[key]);
		});
		it("module test (sk)", () => {
			assert.strictEqual(fixDash(key, new Locale("sk")), testCase[key]);
		});
	});
});



describe('Fix a dash, an en dash, an em dash and spacing between words (cs)\n', () => {
	let testCase = {
    "domů {{typopo__spacedHyphen}} čadič": "domů – čadič",
    "domů {{typopo__spacedHyphen}} čadič": "domů – čadič",
		"domů – čadič": "domů – čadič",
		"domů  –  čadič": "domů – čadič",
		"domů — čadič": "domů – čadič",
		"domů  —  čadič": "domů – čadič",
		"domů — čadič": "domů – čadič", //mixed spaces
		"domů— čadič": "domů – čadič", //mixed spaces
		"domů —čadič": "domů – čadič",
		"domů—čadič": "domů – čadič",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test (cs)", () => {
			assert.strictEqual(fixDashesBetweenWords(key, new Locale("cs")), testCase[key]);
		});
		it("module test (cs)", () => {
			assert.strictEqual(fixDash(key, new Locale("cs")), testCase[key]);
		});
	});
});


describe('Fix a dash, an en dash, an em dash and spacing between words (de-de)\n', () => {
	let testCase = {
    "und {{typopo__spacedHyphen}} sie sagte": "und – sie sagte",
    "und {{typopo__spacedHyphen}} sie sagte": "und – sie sagte",
		"und – sie sagte": "und – sie sagte",
		"und  –  sie sagte": "und – sie sagte",
		"und — sie sagte": "und – sie sagte",
		"und  —  sie sagte": "und – sie sagte",
		"und — sie sagte": "und – sie sagte", //mixed spaces
		"und— sie sagte": "und – sie sagte", //mixed spaces
		"und —sie sagte": "und – sie sagte",
		"und—sie sagte": "und – sie sagte",

	};


	Object.keys(testCase).forEach((key) => {
		it("unit test (de-de)", () => {
			assert.strictEqual(fixDashesBetweenWords(key, new Locale("de-de")), testCase[key]);
		});
		it("module test (de-de)", () => {
			assert.strictEqual(fixDash(key, new Locale("de-de")), testCase[key]);
		});
	});
});




describe('Fix hyphen between word and punctuation (en-us)\n', () => {
	let testCase = {
		"so there is a dash -," : "so there is a dash—,",
		"so there is a dash-," : "so there is a dash—,",
		"so there is a dash -:" : "so there is a dash—:",
		"so there is a dash -;" : "so there is a dash—;",
		"so there is a dash -." : "so there is a dash—.",
		"so there is a dash -?" : "so there is a dash—?",
		"so there is a dash -!" : "so there is a dash—!",
		"so there is a dash -\n" : "so there is a dash—\n",

		//false positives
		"e-shop" : "e-shop",
		"e- shop" : "e- shop", // this individual method shouldn't catch that
		"+-" : "+-",
		"{{test-variable}}" : "{{test-variable}}"
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixHyphenBetweenWordAndPunctuation(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Fix hyphen between word and punctuation (sk, rue)\n', () => {
	let testCase = {
		"so there is a dash -," : "so there is a dash —,", //hairSpace
		"so there is a dash -." : "so there is a dash —.",
		"so there is a dash -\n" : "so there is a dash —\n",

		//false positives
		"e-shop" : "e-shop",
		"e- shop" : "e- shop", // this individual method shouldn't catch that
		"+-" : "+-",
		"{{test-variable}}" : "{{test-variable}}"
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixHyphenBetweenWordAndPunctuation(key, new Locale("sk")), testCase[key]);
			assert.strictEqual(fixHyphenBetweenWordAndPunctuation(key, new Locale("rue")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("sk")), testCase[key]);
			assert.strictEqual(fixDash(key, new Locale("rue")), testCase[key]);
		});
	});
});

describe('Fix hyphen between word and punctuation (cs)\n', () => {
	let testCase = {
		"so there is a dash -," : "so there is a dash –,", //nbsp + enDash
		"so there is a dash -." : "so there is a dash –.",
		"so there is a dash -\n" : "so there is a dash –\n",

		//false positives
		"e-shop" : "e-shop",
		"e- shop" : "e- shop", // this individual method shouldn't catch that
		"+-" : "+-",
		"{{test-variable}}" : "{{test-variable}}"
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixHyphenBetweenWordAndPunctuation(key, new Locale("cs")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("cs")), testCase[key]);
		});
	});
});

describe('Fix hyphen between word and punctuation (de-de)\n', () => {
	let testCase = {
		"so there is a dash -," : "so there is a dash –,", //hairSpace + enDash
		"so there is a dash -." : "so there is a dash –.",
		"so there is a dash -\n" : "so there is a dash –\n",

		//false positives
		"e-shop" : "e-shop",
		"e- shop" : "e- shop", // this individual method shouldn't catch that
		"+-" : "+-",
		"{{test-variable}}" : "{{test-variable}}"
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixHyphenBetweenWordAndPunctuation(key, new Locale("de-de")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("de-de")), testCase[key]);
		});
	});
});





describe('Fix dash between cardinal numbers\n', () => {
	let testCase = {
		"5-6 eggs": "5–6 eggs",
		"15-16 eggs": "15–16 eggs",
		"5 -6 eggs": "5–6 eggs",
		"5- 6 eggs": "5–6 eggs",
		"5 - 6 eggs": "5–6 eggs",
		"5—6 eggs": "5–6 eggs",
		"5-12″ long": "5–12″ long",
		"In 5.25-10.75 range": "In 5.25–10.75 range",
		"In 5,000.25-10,000.75 range": "In 5,000.25–10,000.75 range",
		"v rozmedzí 5,25-10,75": "v rozmedzí 5,25–10,75",
		"v rozmedzí 5 000,25-10 000,75": "v rozmedzí 5 000,25–10 000,75",
		"2-3 Eier": "2–3 Eier",
		"2 -3 Eier": "2–3 Eier",
		"2- 3 Eier": "2–3 Eier",
		"2 - 3 Eier": "2–3 Eier",
		"2—3 Eier": "2–3 Eier",
		"im Bereich von 5.000,25-10.000,75": "im Bereich von 5.000,25–10.000,75",

		// date formats
		"2019-02-03" : "2019–02–03",
		"2019 - 02 - 03" : "2019–02–03",
		"2019- 02 -03" : "2019–02–03",
		"2019-02" : "2019–02",
		"2019 -02" : "2019–02",
		"2019 - 02" : "2019–02",
		"2019- 02" : "2019–02",
		"19 - 02 - 03" : "19–02–03",
		"19- 02 -03" : "19–02–03",

		//telephone numbers
		"1–2–3" : "1–2–3", // correct
		"1 – 2 – 3" : "1–2–3",
		"1– 2 –3" : "1–2–3",

		"1-2-3" : "1–2–3",
		"1 - 2 - 3" : "1–2–3",
		"1- 2 -3" : "1–2–3",

		"1—2—3" : "1–2–3",
		"1 — 2 — 3" : "1–2–3",
		"1— 2 —3" : "1–2–3",

		"154-123-4567" : "154–123–4567"
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixDashBetweenCardinalNumbers(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Fix dash between percentage range\n', () => {
	let testCase = {
		"20%-30%" : "20%–30%",
		"20% -30%" : "20%–30%",
		"20% - 30%": "20%–30%",
		"20%- 30%": "20%–30%",

		"20%–30%" : "20%–30%",
		"20%—30%" : "20%–30%",

		"20 %-30 %" : "20 %–30 %",
		"20 % -30 %" : "20 %–30 %",
		"20 % - 30 %" : "20 %–30 %",
		"20 %- 30 %" : "20 %–30 %",

		"20 ‰ - 30 ‰" : "20 ‰–30 ‰",
		"20 ‱ - 30 ‱" : "20 ‱–30 ‱",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixDashBetweenPercentageRange(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Fix dash between ordinal numbers (en-us)\n', () => {
	let testCase = {
		"1st-5th August": "1st–5th August",
		"1st -5th August": "1st–5th August",
		"1st- 5th August": "1st–5th August",
		"1st - 5th August": "1st–5th August",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixDashBetweenOrdinalNumbers(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Fix dash between ordinal numbers (rue, sk, cs, de)\n', () => {
	let testCase = {
		"1.-5. augusta": "1.–5. augusta",
    "1. -5. augusta": "1.–5. augusta",
    "1.- 5. augusta": "1.–5. augusta",
    "1. - 5. augusta": "1.–5. augusta",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.strictEqual(fixDashBetweenOrdinalNumbers(key, new Locale("rue")), testCase[key]);
			assert.strictEqual(fixDashBetweenOrdinalNumbers(key, new Locale("sk")), testCase[key]);
			assert.strictEqual(fixDashBetweenOrdinalNumbers(key, new Locale("cs")), testCase[key]);
			assert.strictEqual(fixDashBetweenOrdinalNumbers(key, new Locale("de-de")), testCase[key]);
		});
		it("module test", () => {
			assert.strictEqual(fixDash(key, new Locale("rue")), testCase[key]);
			assert.strictEqual(fixDash(key, new Locale("sk")), testCase[key]);
			assert.strictEqual(fixDash(key, new Locale("cs")), testCase[key]);
			assert.strictEqual(fixDash(key, new Locale("de-de")), testCase[key]);
		});
	});
});
