import {removeNbspBetweenMultiCharWords,
				addNbspAfterPreposition,
				addNbspAfterAmpersand,
				addNbspAroundMultiplicationSign,
				addNbspAfterCardinalNumber,
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
