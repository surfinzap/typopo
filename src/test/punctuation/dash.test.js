import {replaceThreeHyphensWithEmDash,
				replaceTwoHyphensWithEnDash,
				replaceSpacedHyphenWithEmDash,
				replaceSpacedEnDashWithEmDash,
				fixSpacesAroundEmDash,
				fixDashBetweenCardinalNumbers,
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
		"Brno--Praha": "Brno–Praha",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceTwoHyphensWithEnDash(key, new Locale("en-us")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Replace spaced hyphen with an em dash\n', () => {
	let testCase = {
		"and - she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceSpacedHyphenWithEmDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Replace spaced en dash with an em dash\n', () => {
	let testCase = {
		"and – she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(replaceSpacedEnDashWithEmDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Fix spaces around em dash in English\n', () => {
	let testCase = {
		"and — she said": "and—she said",
		"and — she said": "and—she said", //mixed spaces
		"and—she said": "and—she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixSpacesAroundEmDash(key, new Locale("en-us")), testCase[key]);
		});
	});
});

describe('Fix spaces around em dash in Rusyn, Slovak, Czech\n', () => {
	let testCase = {
		"and — she said": "and — she said",
		"and—she said": "and — she said",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(fixSpacesAroundEmDash(key, new Locale("rue")), testCase[key]);
			assert.equal(fixSpacesAroundEmDash(key, new Locale("sk")), testCase[key]);
			assert.equal(fixSpacesAroundEmDash(key, new Locale("cs")), testCase[key]);
		});
	});
});

describe('Fix dash between cardinal numbers\n', () => {
	let testCase = {
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

describe('Fix dash between ordinal numbers in English\n', () => {
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

describe('Fix dash between ordinal numbers in Rusyn, Slovak, Czech\n', () => {
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
		});
		it("module test", () => {
			assert.equal(fixDash(key, new Locale("rue")), testCase[key]);
			assert.equal(fixDash(key, new Locale("sk")), testCase[key]);
			assert.equal(fixDash(key, new Locale("cs")), testCase[key]);
		});
	});
});
