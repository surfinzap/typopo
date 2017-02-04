import {correct_typos} from '../typopo.js';
import assert from 'assert';

describe('Remove empty lines\n', () => {
	let testCase = {
		// Remove excessive empty lines between paragraphs
		"something here\nand over there\n\nand over there\n\n\nand over there":
		"something here\nand over there\nand over there\nand over there",
	};

	Object.keys(testCase).forEach((key) => {
		it("should remove excessive empty lines", () => {
			assert.equal(correct_typos(key), testCase[key]);
		});
	});
});
