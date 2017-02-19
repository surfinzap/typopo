import {fixHyphen,
				replaceDashWithHyphen,
				fixSpaceAroundHyphen} from "../../lib/punctuation/hyphen";
import assert from 'assert';
import Locale from "../../locale/locale";


describe('Replace dashes with hyphen, where applicable\n', () => {
	let testCase = {
		"two—year—old child": "two-year-old child",
		"two–year–old child": "two-year-old child",
		"zeleno–žltá": "zeleno-žltá",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.equal(replaceDashWithHyphen(key, new Locale("en-us")), testCase[key]);
		});
		it("module tests", () => {
			assert.equal(fixHyphen(key, new Locale("en-us")), testCase[key]);
		});
	});
});


describe('Fix spaces around hyphen\n', () => {
	let testCase = {
		"e- shop": "e-shop",
		"e- shop": "e-shop", // nbsp
		"e- shop": "e-shop", // hairSpace
		"e- shop": "e-shop", // narrowNbsp
		"e -shop": "e-shop",
		};

	Object.keys(testCase).forEach((key) => {
		it("unit tests", () => {
			assert.equal(fixSpaceAroundHyphen(key, new Locale("en-us")), testCase[key]);
		});
		it("module tests", () => {
			assert.equal(fixHyphen(key, new Locale("en-us")), testCase[key]);
		});
	});
});
