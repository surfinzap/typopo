import {fixCase} from "../../lib/words/case";
import assert from 'assert';

describe('Corrects accidental uPPERCASE\n', () => {
	let testCase = {
		"HEy, JEnnifer!": "Hey, Jennifer!",
		"How about ABC?": "How about ABC?",
		"cAPSLOCK": "capslock",
		"iPhone": "iPhone",
		"iT": "it",
		"Central Europe and Cyrillic tests: aĎIÉUБUГ": "Central Europe and Cyrillic tests: aďiéuбuг",
	};


	Object.keys(testCase).forEach((key) => {
		it("", () => {
			assert.equal(fixCase(key, "en"), testCase[key]);
		});
	});
});
