import {removeEmptyLines} from "../../lib/whitespace/lines";
import assert from 'assert';

describe('Remove empty lines\n', () => {
	let testCase = {
		// Remove excessive empty lines between paragraphs
		// Comment: Thinking a bit in LaTeX/markdown conventions, for me it would make sense to normalize two or more to two \n{2,} to \n\n. 
		// Moreover, how does that \n test deal with the different newlines (\r|\l)? 
		"something here\nand over there\n\nand over there\n\n\nand over there":
		"something here\nand over there\nand over there\nand over there",
	};

	Object.keys(testCase).forEach((key) => {
		it("should remove excessive empty lines", () => {
			assert.equal(removeEmptyLines(key), testCase[key]);
		});
	});
});
