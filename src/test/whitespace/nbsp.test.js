import {removeNbspBetweenMultiCharWords,
				addNbspAfterPreposition,
				addNbspAfterAmpersand,
				addNbspAroundMultiplicationSign,
				addNbspAfterCardinalNumber,
				addNbspAfterOrdinalNumber,
				addNbspAfterRomanNumeral,
				addNbspAfterInitial,
				fixNbsp} from "../../lib/whitespace/nbsp";
import assert from 'assert';
import Constants from "../../lib/constants";

describe('Remove non-breaking space between multi-letter words\n', () => {
	let testCase = {
		"vo dvore": "vo dvore",
		"Ku komore": "Ku komore",
		"vo vo vo vo": "vo vo vo vo",
		"ňa moja": "ňa moja",
		"Ťa tvoja": "Ťa tvoja",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(removeNbspBetweenMultiCharWords(key, new Constants("en")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});

describe('Add non-breaking spaces after single-character prepositions\n', () => {
	let testCase = {
		"Koniec. V potoku": "Koniec. V potoku",
		"Skáče o tyči": "Skáče o tyči",
		"v obchode a v hospode": "v obchode a v hospode",
		"v a v a v": "v a v a v",
		"a з коминів": "a з коминів",
		"a я іду здоїти": "a я іду здоїти",
		"a в хырбетї": "a в хырбетї",
		"што є му вытыкане": "што є му вытыкане",
		"ся ї не": "ся ї не",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterPreposition(key, new Constants("en")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after ampersand\n', () => {
	let testCase = {
		"Bed & Breakfast": "Bed & Breakfast",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterAmpersand(key, new Constants("en")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});

describe('Add non-breaking space around ×\n', () => {
	let testCase = {
		"5 × 5": "5 × 5",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAroundMultiplicationSign(key, new Constants("en")), testCase[key]);
		});
		it("module test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after cardinal number\n', () => {
	let testCase = {
		"5 mm": "5 mm",
		"5 Kč": "5 Kč",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterCardinalNumber(key, new Constants("en")), testCase[key]);
		});
		it("moduel test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});


describe('Add non-breaking space after ordinal number (en)\n', () => {
	let testCase = {
		"1st amendment": "1st amendment",
		"2nd amendment": "2nd amendment",
		"3rd amendment": "3rd amendment",
		"4th amendment": "4th amendment",
		"18th amendment": "18th amendment",
		"15th March": "15th March",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterOrdinalNumber(key, new Constants("en")), testCase[key]);
		});
		it("moduel test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after ordinal number (sk, cs, rue)\n', () => {
	let testCase = {
		"1. dodatok": "1. dodatok",
		"12. dodatok": "12. dodatok",
		"12. január": "12. január",
		"12. 1. 2017": "12. 1. 2017",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterOrdinalNumber(key, new Constants("sk")), testCase[key]);
			assert.equal(addNbspAfterOrdinalNumber(key, new Constants("cs")), testCase[key]);
			assert.equal(addNbspAfterOrdinalNumber(key, new Constants("rue")), testCase[key]);
		});
		it("moduel test", () => {
			assert.equal(fixNbsp(key, new Constants("sk")), testCase[key]);
			assert.equal(fixNbsp(key, new Constants("cs")), testCase[key]);
			assert.equal(fixNbsp(key, new Constants("rue")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after roman numeral (sk, cs, rue)\n', () => {
	let testCase = {
		"III. kapitola": "III. kapitola",
		"X. ročník": "X. ročník",
		"V. ročník": "V. ročník",
		"L. ročník": "L. ročník",
		"D. ročník": "D. ročník",
		"8. V. 1945": "8. V. 1945",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterRomanNumeral(key, new Constants("sk")), testCase[key]);
			assert.equal(addNbspAfterRomanNumeral(key, new Constants("cs")), testCase[key]);
			assert.equal(addNbspAfterRomanNumeral(key, new Constants("rue")), testCase[key]);
		});
		it("moduel test", () => {
			assert.equal(fixNbsp(key, new Constants("sk")), testCase[key]);
			assert.equal(fixNbsp(key, new Constants("cs")), testCase[key]);
			assert.equal(fixNbsp(key, new Constants("rue")), testCase[key]);
		});
	});
});

describe('Add non-breaking space after initial\n', () => {
	let testCase = {
		"Philip K. Dick": "Philip K. Dick",
		"F. X. Šalda": "F. X. Šalda",
	};

	Object.keys(testCase).forEach((key) => {
		it("unit test", () => {
			assert.equal(addNbspAfterInitial(key, new Constants("en")), testCase[key]);
		});
		it("moduel test", () => {
			assert.equal(fixNbsp(key, new Constants("en")), testCase[key]);
		});
	});
});
