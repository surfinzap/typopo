import {fixHyphen} from "../../lib/punctuation/hyphen";
import assert from 'assert';
import Constants from "../../lib/constants";


describe('Replace dashes with hyphen, where applicable\n', () => {
	let testCase = {
		"two—year—old child": "two-year-old child",
		"two–year–old child": "two-year-old child",
		"zeleno–žltá": "zeleno-žltá",
		};

	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixHyphen(key, new Constants("en")), testCase[key]);
		});
	});
});
