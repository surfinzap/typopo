import {fixMultiplicationSign} from "../../lib/symbols/multiplication-sign";
import assert from 'assert';
import Constants from "../../lib/constants";

describe('Fix multiplication sign\n', () => {
	let testCase = {
		"5 mm x 5 mm": "5 mm × 5 mm",
		"5cm x 5cm": "5cm × 5cm",
		"5 x 4": "5 × 4",
		"12x3": "12 × 3",
		"12×3": "12 × 3",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixMultiplicationSign(key, new Constants("en")), testCase[key]);
		});
	});
});
