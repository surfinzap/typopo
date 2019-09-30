import {replaceThreeHyphensWithEmDash,
				replaceTwoHyphensWithEnDash,
				replaceSpacedHyphenWithDash,
				consolidateSpacedDashes,
				fixDashSpacesBetweenWords,
				fixDashBetweenCardinalNumbers,
				fixDashBetweenPercentageRange,
				fixDashBetweenOrdinalNumbers,
				fixDash} from "../../lib/punctuation/dash";
import assert from 'assert';
import Locale from "../../locale/locale";

describe('Replace 3 hyphens with an em dash\n', () => {
	let testCase = {
		"and --- she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceThreeHyphensWithEmDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Replace 2 hyphens with an en dash\n', () => {
	let testCase = {
		"and -- she said": "and – she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceTwoHyphensWithEnDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Replace spaced hyphen with an em dash (en-us, sk, cs, rue)\n', () => {
	let testCase = {
		"and - she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceSpacedHyphenWithDash(key, new Locale("en-us")), testCase[key]);
			assert.equal(replaceSpacedHyphenWithDash(key, new Locale("cs")), testCase[key]);
		});
	});
});

describe('Replace spaced hyphen with an en dash (de-de)\n', () => {
	let testCase = {
		"und - er sagte": "und – er sagte",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceSpacedHyphenWithDash(key, new Locale("de-de")), testCase[key]);
		});
	});
});

describe('Replace spaced en dash with an em dash (en-us, sk, cs, rue)\n', () => {
	let testCase = {
		"and – she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(consolidateSpacedDashes(key, new Locale("en-us")), testCase[key]);
			assert.equal(consolidateSpacedDashes(key, new Locale("sk")), testCase[key]);
		});
	});
});

describe('Replace spaced em dash with an en dash (de-de)\n', () => {
	let testCase = {
		"und — sie sagte": "und – sie sagte",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(consolidateSpacedDashes(key, new Locale("de-de")), testCase[key]);
		});
	});
});

describe('Fix dash spaces between words (en-us)\n', () => {
	let testCase = {
		"and — she said": "and—she said",
		"and — she said": "and—she said", //mixed spaces
		"and— she said": "and—she said",
		"and —she said": "and—she said",
		"and—she said": "and—she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashSpacesBetweenWords(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Fix dash spaces between words (rue, sk)\n', () => {
	let testCase = {
		"and — she said": "and — she said",
		"and—she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashSpacesBetweenWords(key, new Locale("rue")), testCase[key]);
			assert.equal(fixDashSpacesBetweenWords(key, new Locale("sk")), testCase[key]);
		});
	});
});

describe('Fix dash spaces between words (cs)\n', () => {
	let testCase = {
		"and — she said": "and – she said",
		"and—she said": "and – she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashSpacesBetweenWords(key, new Locale("cs")), testCase[key]);
		});
	});
});

describe('Fix dash spaces between words (de-de) \n', () => {
	let testCase = {
		"und –sie sagte": "und – sie sagte",
		"und– sie sagte": "und – sie sagte",
		"und – sie sagte": "und – sie sagte", //mixed spaces
		"und–sie sagte": "und – sie sagte",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashSpacesBetweenWords(key, new Locale("de-de")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("de-de")), testCase[key]);
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

		//date formats
		"2019-02-03" : "2019–02–03",
		"2019 - 02 - 03" : "2019–02–03",
		"2019- 02 -03" : "2019–02–03",
		"2019-02" : "2019–02",
		"2019 -02" : "2019–02",
		"2019 - 02" : "2019–02",
		"2019- 02" : "2019–02",
		"19 - 02 - 03" : "19–02–03",
		"19- 02 -03" : "19–02–03",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashBetweenCardinalNumbers(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});



describe('Fix dash between percentage range\n', () => {
	let testCase = {
		"20%-30%" : "20%–30%",
		"20% -30%" : "20%–30%",
		"20% - 30%" : "20%–30%",
		"20% -30%" : "20%–30%",

		"20%–30%" : "20%–30%",
		"20%—30%" : "20%–30%",

		"20 %-30 %" : "20 %–30 %",
		"20 % -30 %" : "20 %–30 %",
		"20 % - 30 %" : "20 %–30 %",
		"20 %- 30 %" : "20 %–30 %",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixDashBetweenPercentageRange(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("en-us")), testCase[key]);
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
			assert.equal(fixDashBetweenOrdinalNumbers(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("en-us")), testCase[key]);
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
			assert.equal(fixDashBetweenOrdinalNumbers(key, new Locale("rue")), testCase[key]);
			assert.equal(fixDashBetweenOrdinalNumbers(key, new Locale("sk")), testCase[key]);
			assert.equal(fixDashBetweenOrdinalNumbers(key, new Locale("cs")), testCase[key]);
			assert.equal(fixDashBetweenOrdinalNumbers(key, new Locale("de-de")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("rue")), testCase[key]);
			assert.equal(fixDash(key, new Locale("sk")), testCase[key]);
			assert.equal(fixDash(key, new Locale("cs")), testCase[key]);
			assert.equal(fixDash(key, new Locale("de-de")), testCase[key]);
		});
	});
});
