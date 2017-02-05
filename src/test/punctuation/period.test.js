import {fixPeriod} from "../../lib/punctuation/period";
import assert from 'assert';

describe('Replace 2 periods at the end of the sentecne with a single period\n', () => {
	let testCase = {
		"Sentence ending..": "Sentence ending.",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixPeriod(key, "en"), testCase[key]);
		});
	});
});
